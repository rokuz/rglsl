use std::collections::BTreeSet;
use std::rc::Rc;

use rglsl_ast::ast::{
    BasicType, CaseLabel, Condition, Declaration, DeclarationKind, Expression, ExpressionKind,
    ExternalDeclaration, FunctionIdentifier, Initializer, JumpStatement, NodeId,
    SingleTypeQualifier, Spanned, Statement, StatementKind, StorageQualifier, TranslationUnit,
    TypeQualifier,
};
use rglsl_sema::analyze::Callee;
use rglsl_sema::scope::{Direction, Origin, SymbolKind};
use rglsl_sema::Analysis;

use crate::basic;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Variable {
    pub name: String,
    pub ty: Option<BasicType>,
    pub constant: bool,
    pub parameter: bool,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Point {
    pub id: NodeId,
    pub ty: BasicType,
    pub constant_context: bool,
    pub scope: Rc<[Variable]>,
}

pub fn find_points(unit: &TranslationUnit, analysis: &Analysis) -> Vec<Point> {
    let mut finder = Finder {
        analysis,
        scopes: vec![Vec::new()],
        flattened: None,
        points: Vec::new(),
        constant_context: false,
    };
    for declaration in &unit.external_declarations {
        match declaration {
            ExternalDeclaration::FunctionDefinition(definition) => {
                finder.scopes.push(Vec::new());
                for parameter in &definition.prototype.parameters {
                    if let Some(name) = &parameter.name {
                        let variable = finder.declared(parameter.id, &name.node);
                        finder.add(variable);
                    }
                }
                for statement in &definition.body.statements {
                    finder.statement(statement);
                }
                finder.pop();
            }
            ExternalDeclaration::Declaration(declaration) => finder.declaration(declaration),
            ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
        }
    }
    finder.points
}

pub fn function_names(unit: &TranslationUnit) -> BTreeSet<String> {
    let mut names = BTreeSet::new();
    for declaration in &unit.external_declarations {
        match declaration {
            ExternalDeclaration::FunctionDefinition(definition) => {
                names.insert(definition.prototype.name.node.clone());
            }
            ExternalDeclaration::Declaration(declaration) => {
                if let DeclarationKind::FunctionPrototype(prototype) = &declaration.kind {
                    names.insert(prototype.name.node.clone());
                }
            }
            ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
        }
    }
    names
}

pub fn has_storage(qualifier: Option<&Spanned<TypeQualifier>>, storage: StorageQualifier) -> bool {
    qualifier.is_some_and(|qualifier| {
        qualifier
            .qualifiers
            .iter()
            .any(|single| single.node == SingleTypeQualifier::Storage(storage))
    })
}

struct Finder<'a> {
    analysis: &'a Analysis,
    scopes: Vec<Vec<Variable>>,
    flattened: Option<Rc<[Variable]>>,
    points: Vec<Point>,
    constant_context: bool,
}

impl Finder<'_> {
    fn pop(&mut self) {
        self.scopes.pop();
        self.flattened = None;
    }

    fn add(&mut self, variable: Variable) {
        if let Some(scope) = self.scopes.last_mut() {
            scope.retain(|existing| existing.name != variable.name);
            scope.push(variable);
        }
        self.flattened = None;
    }

    fn visible(&mut self) -> Rc<[Variable]> {
        if let Some(flattened) = &self.flattened {
            return Rc::clone(flattened);
        }
        let mut seen = BTreeSet::new();
        let mut visible = Vec::new();
        for scope in self.scopes.iter().rev() {
            for variable in scope.iter().rev() {
                if seen.insert(variable.name.clone()) {
                    visible.push(variable.clone());
                }
            }
        }
        visible.reverse();
        let flattened: Rc<[Variable]> = visible.into();
        self.flattened = Some(Rc::clone(&flattened));
        flattened
    }

    fn declared(&self, id: NodeId, name: &str) -> Variable {
        let mut variable = Variable {
            name: name.to_owned(),
            ty: None,
            constant: false,
            parameter: false,
        };
        let Some(symbol_id) = self.analysis.declarations.get(&id) else {
            return variable;
        };
        variable.ty = self
            .analysis
            .symbol_type(*symbol_id)
            .and_then(|ty| basic::from_sema(&ty));
        if let Some(symbol) = self.analysis.symbol(*symbol_id) {
            if let SymbolKind::Variable(details) = &symbol.kind {
                variable.parameter = details.origin == Origin::Parameter;
                variable.constant = details.qualifiers.constant
                    && details.value.is_some()
                    && details.origin != Origin::Parameter;
            }
        }
        variable
    }

    fn initializer(&mut self, initializer: &Initializer) {
        match initializer {
            Initializer::Expression(expression) => self.expression(expression),
            Initializer::List(items) => {
                for item in items {
                    self.initializer(item);
                }
            }
        }
    }

    fn declaration(&mut self, declaration: &Declaration) {
        match &declaration.kind {
            DeclarationKind::InitDeclaratorList(list) => {
                let constant = has_storage(list.ty.qualifier.as_ref(), StorageQualifier::Const)
                    || self.scopes.len() == 1;
                for declarator in &list.declarators {
                    if let Some(initializer) = &declarator.initializer {
                        let saved = self.constant_context;
                        self.constant_context = constant;
                        self.initializer(initializer);
                        self.constant_context = saved;
                    }
                    let variable = self.declared(declarator.id, &declarator.name.node);
                    self.add(variable);
                }
            }
            DeclarationKind::Block {
                structure,
                instance,
            } => match instance {
                Some(instance) => self.add(Variable {
                    name: instance.name.node.clone(),
                    ty: None,
                    constant: false,
                    parameter: false,
                }),
                None => {
                    for member in &structure.members {
                        let ty = basic::from_specifier(&member.ty.specifier);
                        for declarator in &member.declarators {
                            self.add(Variable {
                                name: declarator.name.node.clone(),
                                ty: ty.filter(|_| declarator.array.is_none()),
                                constant: false,
                                parameter: false,
                            });
                        }
                    }
                }
            },
            DeclarationKind::QualifiedIdentifiers { .. }
            | DeclarationKind::FunctionPrototype(_)
            | DeclarationKind::Precision { .. }
            | DeclarationKind::Qualifier(_) => {}
        }
    }

    fn condition(&mut self, condition: &Condition) {
        match condition {
            Condition::Expression(expression) => self.expression(expression),
            Condition::Declaration(declaration) => {
                self.initializer(&declaration.initializer);
                let variable = self.declared(declaration.id, &declaration.name.node);
                self.add(variable);
            }
        }
    }

    fn statement(&mut self, statement: &Statement) {
        match &statement.kind {
            StatementKind::Compound(compound) => {
                self.scopes.push(Vec::new());
                for statement in &compound.statements {
                    self.statement(statement);
                }
                self.pop();
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
                self.nested(then_branch);
                if let Some(else_branch) = else_branch {
                    self.nested(else_branch);
                }
            }
            StatementKind::Switch {
                selector,
                statements,
            } => {
                self.expression(selector);
                self.scopes.push(Vec::new());
                for statement in statements {
                    self.statement(statement);
                }
                self.pop();
            }
            StatementKind::CaseLabel(CaseLabel::Case(_) | CaseLabel::Default) => {}
            StatementKind::While { condition, body } => {
                self.scopes.push(Vec::new());
                self.condition(condition);
                self.statement(body);
                self.pop();
            }
            StatementKind::DoWhile { body, condition } => {
                self.nested(body);
                self.expression(condition);
            }
            StatementKind::For(statement) => {
                self.scopes.push(Vec::new());
                self.statement(&statement.init);
                if let Some(condition) = &statement.condition {
                    self.condition(condition);
                }
                if let Some(increment) = &statement.increment {
                    self.expression(increment);
                }
                self.statement(&statement.body);
                self.pop();
            }
            StatementKind::Jump(JumpStatement::Return(Some(value))) => self.expression(value),
            StatementKind::Jump(_) => {}
        }
    }

    fn nested(&mut self, statement: &Statement) {
        self.scopes.push(Vec::new());
        self.statement(statement);
        self.pop();
    }

    fn point(&mut self, expression: &Expression) {
        let Some(ty) = self
            .analysis
            .type_of(expression.id)
            .and_then(basic::from_sema)
        else {
            return;
        };
        if basic::is_matrix(ty) && !basic::is_square_matrix(ty) {
            return;
        }
        let scope = self.visible();
        self.points.push(Point {
            id: expression.id,
            ty,
            constant_context: self.constant_context,
            scope,
        });
    }

    fn output_parameters(&self, call: NodeId, count: usize) -> Vec<bool> {
        let directions: Vec<Direction> = match self.analysis.calls.get(&call) {
            Some(Callee::Function(id)) => self
                .analysis
                .function(*id)
                .map(|function| {
                    function
                        .parameters
                        .iter()
                        .map(|parameter| parameter.direction)
                        .collect()
                })
                .unwrap_or_default(),
            Some(Callee::Builtin(id)) => self
                .analysis
                .builtins
                .function(*id)
                .map(|function| {
                    function
                        .parameters
                        .iter()
                        .map(|parameter| parameter.direction)
                        .collect()
                })
                .unwrap_or_default(),
            Some(Callee::Constructor(_) | Callee::Length) | None => Vec::new(),
        };
        (0..count)
            .map(|index| directions.get(index).is_some_and(|d| d.is_output()))
            .collect()
    }

    fn expression(&mut self, expression: &Expression) {
        self.point(expression);
        match &expression.kind {
            ExpressionKind::Variable(_) | ExpressionKind::Number(_) | ExpressionKind::Bool(_) => {}
            ExpressionKind::Parenthesized(inner) => self.expression(inner),
            ExpressionKind::Subscript { base, index } => {
                self.expression(base);
                self.expression(index);
            }
            ExpressionKind::FunctionCall(call) => {
                let skip_all = match &call.function.node {
                    FunctionIdentifier::Function(name) => {
                        name.contains("Offset")
                            || name.starts_with("textureGather")
                            || name.starts_with("interpolateAt")
                    }
                    FunctionIdentifier::Constructor(_) => false,
                    FunctionIdentifier::Expression(_) | FunctionIdentifier::Method { .. } => true,
                };
                if skip_all {
                    return;
                }
                let outputs = self.output_parameters(expression.id, call.arguments.len());
                for (argument, output) in call.arguments.iter().zip(outputs) {
                    if !output {
                        self.expression(argument);
                    }
                }
            }
            ExpressionKind::FieldSelection { base, .. } => self.expression(base),
            ExpressionKind::Postfix { .. } => {}
            ExpressionKind::Unary { operator, operand } => {
                if !matches!(
                    operator,
                    rglsl_ast::ast::UnaryOperator::Increment
                        | rglsl_ast::ast::UnaryOperator::Decrement
                ) {
                    self.expression(operand);
                }
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
            ExpressionKind::Assignment { value, .. } => self.expression(value),
            ExpressionKind::Sequence(expressions) => {
                for expression in expressions {
                    self.expression(expression);
                }
            }
        }
    }
}
