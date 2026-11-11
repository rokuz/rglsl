use std::cell::RefCell;
use std::collections::BTreeSet;
use std::rc::Rc;

use rglsl_ast::ast::{
    BasicType, CaseLabel, Condition, Declaration, DeclarationKind, Expression, ExpressionKind,
    ExternalDeclaration, FunctionIdentifier, Initializer, JumpStatement, NodeId,
    SingleTypeQualifier, Spanned, Statement, StatementKind, StorageQualifier, TranslationUnit,
    TypeQualifier,
};
use rglsl_sema::analyze::Callee;
use rglsl_sema::scope::{Direction, Origin, Storage, SymbolKind};
use rglsl_sema::Analysis;

use rglsl_types::stack::run;

use crate::basic;
use crate::stack::Cx;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Variable {
    pub name: String,
    pub ty: Option<BasicType>,
    pub constant: bool,
    pub parameter: bool,
    pub output: bool,
    pub assignable: bool,
}

impl Variable {
    pub fn new(name: &str, ty: Option<BasicType>) -> Self {
        Self {
            name: name.to_owned(),
            ty,
            constant: false,
            parameter: false,
            output: false,
            assignable: false,
        }
    }
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
                let state = RefCell::new(finder);
                let _ = run(|stack| Cx::new(&state, stack).statements(&definition.body.statements));
                finder = state.into_inner();
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

pub fn declared_variable(analysis: &Analysis, id: NodeId, name: &str) -> Variable {
    let mut variable = Variable::new(name, None);
    let Some(symbol_id) = analysis.declarations.get(&id) else {
        return variable;
    };
    variable.ty = analysis
        .symbol_type(*symbol_id)
        .and_then(|ty| basic::from_sema(&ty));
    if let Some(symbol) = analysis.symbol(*symbol_id) {
        if let SymbolKind::Variable(details) = &symbol.kind {
            variable.parameter = details.origin == Origin::Parameter;
            variable.constant = details.qualifiers.constant
                && details.value.is_some()
                && details.origin != Origin::Parameter;
            variable.output =
                details.origin == Origin::Global && details.qualifiers.storage == Storage::Out;
            variable.assignable = !details.qualifiers.constant
                && details.origin != Origin::BuiltIn
                && (matches!(
                    details.qualifiers.storage,
                    Storage::None | Storage::Out | Storage::Inout
                ) || (details.origin == Origin::Parameter
                    && details.qualifiers.storage == Storage::In));
        }
    }
    variable
}

pub fn output_parameters(analysis: &Analysis, call: NodeId, count: usize) -> Vec<bool> {
    let directions: Vec<Direction> = match analysis.calls.get(&call) {
        Some(Callee::Function(id)) => analysis
            .function(*id)
            .map(|function| {
                function
                    .parameters
                    .iter()
                    .map(|parameter| parameter.direction)
                    .collect()
            })
            .unwrap_or_default(),
        Some(Callee::Builtin(id)) => analysis
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
        Some(Callee::Cooperative(
            rglsl_sema::CooperativeCall::Load { .. }
            | rglsl_sema::CooperativeCall::VectorLoad
            | rglsl_sema::CooperativeCall::SaturatedConvert,
        )) => {
            vec![Direction::Out]
        }
        Some(Callee::TensorArm(rglsl_sema::TensorArmCall::Read { .. })) => {
            vec![Direction::In, Direction::In, Direction::Out]
        }
        Some(
            Callee::Constructor(_)
            | Callee::TensorArm(_)
            | Callee::Cooperative(_)
            | Callee::Tensor(_)
            | Callee::Matrix(_)
            | Callee::Length
            | Callee::NonUniform
            | Callee::DebugPrintf
            | Callee::Abort,
        )
        | None => Vec::new(),
    };
    (0..count)
        .map(|index| directions.get(index).is_some_and(|d| d.is_output()))
        .collect()
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
        declared_variable(self.analysis, id, name)
    }

    fn initializer(&mut self, initializer: &Initializer) {
        let mut pending = vec![initializer];
        while let Some(initializer) = pending.pop() {
            match initializer {
                Initializer::Expression(expression) => self.expression(expression),
                Initializer::List(items) => {
                    pending.extend(items.iter().map(|item| &item.node).rev())
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
                Some(instance) => self.add(Variable::new(&instance.name.node, None)),
                None => {
                    for member in &structure.members {
                        let ty = basic::from_specifier(&member.ty.specifier);
                        for declarator in &member.declarators {
                            self.add(Variable::new(
                                &declarator.name.node,
                                ty.filter(|_| declarator.array.is_none()),
                            ));
                        }
                    }
                }
            },
            DeclarationKind::QualifiedIdentifiers { .. }
            | DeclarationKind::FunctionPrototype(_)
            | DeclarationKind::Precision { .. }
            | DeclarationKind::SpirvInstruction { .. }
            | DeclarationKind::SpirvExecutionMode(_)
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

    fn expression(&mut self, expression: &Expression) {
        let mut pending = Vec::from([expression]);
        while let Some(expression) = pending.pop() {
            self.point(expression);
            let start = pending.len();
            match &expression.kind {
                ExpressionKind::Variable(_)
                | ExpressionKind::Number(_)
                | ExpressionKind::Bool(_)
                | ExpressionKind::String(_)
                | ExpressionKind::Postfix { .. } => {}
                ExpressionKind::Parenthesized(inner)
                | ExpressionKind::FieldSelection { base: inner, .. }
                | ExpressionKind::Assignment { value: inner, .. } => pending.push(inner),
                ExpressionKind::Subscript { base, index } => {
                    pending.push(base);
                    pending.push(index);
                }
                ExpressionKind::FunctionCall(call) => {
                    let skip_all = match &call.function.node {
                        FunctionIdentifier::Function(name) => {
                            name.contains("Offset")
                                || name.starts_with("textureGather")
                                || name.starts_with("interpolateAt")
                        }
                        FunctionIdentifier::Constructor(_) | FunctionIdentifier::Cast(_) => false,
                        FunctionIdentifier::Expression(_) | FunctionIdentifier::Method { .. } => {
                            true
                        }
                    };
                    if !skip_all {
                        let outputs =
                            output_parameters(self.analysis, expression.id, call.arguments.len());
                        for (argument, output) in call.arguments.iter().zip(outputs) {
                            if !output {
                                pending.push(argument);
                            }
                        }
                    }
                }
                ExpressionKind::Unary { operator, operand } => {
                    if !matches!(
                        operator,
                        rglsl_ast::ast::UnaryOperator::Increment
                            | rglsl_ast::ast::UnaryOperator::Decrement
                    ) {
                        pending.push(operand);
                    }
                }
                ExpressionKind::Binary { left, right, .. } => {
                    pending.push(left);
                    pending.push(right);
                }
                ExpressionKind::Conditional {
                    condition,
                    then_expression,
                    else_expression,
                } => {
                    pending.push(condition);
                    pending.push(then_expression);
                    pending.push(else_expression);
                }
                ExpressionKind::Sequence(expressions) => pending.extend(expressions.iter()),
            }
            if let Some(added) = pending.get_mut(start..) {
                added.reverse();
            }
        }
    }
}

impl<'b, 'a: 'b> Cx<'b, Finder<'a>> {
    async fn statements(self, statements: &'b [Statement]) {
        for statement in statements {
            self.call(self.clone().statement(statement)).await;
        }
    }

    async fn nested(self, statement: &'b Statement) {
        self.with(|state| state.scopes.push(Vec::new()));
        self.call(self.clone().statement(statement)).await;
        self.with(|state| state.pop());
    }

    async fn statement(self, statement: &'b Statement) {
        match &statement.kind {
            StatementKind::Compound(compound) => {
                self.with(|state| state.scopes.push(Vec::new()));
                self.clone().statements(&compound.statements).await;
                self.with(|state| state.pop());
            }
            StatementKind::Declaration(declaration) => {
                self.with(|state| state.declaration(declaration))
            }
            StatementKind::Expression(expression) => {
                if let Some(expression) = expression {
                    self.with(|state| state.expression(expression));
                }
            }
            StatementKind::Selection {
                condition,
                then_branch,
                else_branch,
            } => {
                self.with(|state| state.expression(condition));
                self.clone().nested(then_branch).await;
                if let Some(else_branch) = else_branch {
                    self.clone().nested(else_branch).await;
                }
            }
            StatementKind::Switch {
                selector,
                statements,
            } => {
                self.with(|state| state.expression(selector));
                self.with(|state| state.scopes.push(Vec::new()));
                self.clone().statements(statements).await;
                self.with(|state| state.pop());
            }
            StatementKind::CaseLabel(CaseLabel::Case(_) | CaseLabel::Default) => {}
            StatementKind::While { condition, body } => {
                self.with(|state| state.scopes.push(Vec::new()));
                self.with(|state| state.condition(condition));
                self.call(self.clone().statement(body)).await;
                self.with(|state| state.pop());
            }
            StatementKind::DoWhile { body, condition } => {
                self.clone().nested(body).await;
                self.with(|state| state.expression(condition));
            }
            StatementKind::For(statement) => {
                self.with(|state| state.scopes.push(Vec::new()));
                self.call(self.clone().statement(&statement.init)).await;
                if let Some(condition) = &statement.condition {
                    self.with(|state| state.condition(condition));
                }
                if let Some(increment) = &statement.increment {
                    self.with(|state| state.expression(increment));
                }
                self.call(self.clone().statement(&statement.body)).await;
                self.with(|state| state.pop());
            }
            StatementKind::Jump(JumpStatement::Return(Some(value))) => {
                self.with(|state| state.expression(value));
            }
            StatementKind::Jump(_) => {}
            StatementKind::Attributed { statement, .. } => {
                self.call(self.clone().statement(statement)).await;
            }
        }
    }
}
