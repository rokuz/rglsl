use std::cell::RefCell;
use std::collections::{BTreeMap, BTreeSet};
use std::rc::Rc;

use rglsl_ast::ast::{
    CaseLabel, Condition, Declaration, DeclarationKind, ExternalDeclaration, FunctionDefinition,
    Initializer, JumpStatement, Node, NodeId, Statement, StatementKind, TranslationUnit,
};
use rglsl_sema::Analysis;

use rglsl_types::stack::run;

use crate::basic;
use crate::build::Builder;
use crate::random::Random;
use crate::scope::{declared_variable, Variable};
use crate::stack::{take_statement, Cx};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum BlockId {
    Function(usize),
    Statement(NodeId),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Location {
    Block {
        block: BlockId,
        index: usize,
    },
    Branch {
        statement: NodeId,
        else_branch: bool,
    },
    Body {
        statement: NodeId,
    },
}

#[derive(Debug, Clone)]
pub struct InjectionPoint<'a> {
    pub location: Location,
    pub next: Option<&'a Statement>,
    pub scope: Rc<[Variable]>,
    pub in_loop: bool,
    pub in_switch: bool,
    pub function: &'a Node<FunctionDefinition>,
}

pub fn injection_points<'a>(
    unit: &'a TranslationUnit,
    analysis: &Analysis,
) -> Vec<InjectionPoint<'a>> {
    let mut walker = Walker {
        analysis,
        scopes: vec![Vec::new()],
        flattened: None,
        points: Vec::new(),
        loops: 0,
        switches: 0,
        function: None,
    };
    for (index, external) in unit.external_declarations.iter().enumerate() {
        match external {
            ExternalDeclaration::FunctionDefinition(definition) => {
                walker.function = Some(definition);
                walker.scopes.push(Vec::new());
                for parameter in &definition.prototype.parameters {
                    if let Some(name) = &parameter.name {
                        let variable = declared_variable(analysis, parameter.id, &name.node);
                        walker.add(variable);
                    }
                }
                let state = RefCell::new(walker);
                let _ = run(|stack| {
                    Cx::new(&state, stack)
                        .block(BlockId::Function(index), &definition.body.statements)
                });
                walker = state.into_inner();
                walker.pop();
                walker.function = None;
            }
            ExternalDeclaration::Declaration(declaration) => walker.declaration(declaration),
            ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
        }
    }
    walker.points
}

pub fn choose<T>(items: Vec<T>, probability: u32, random: &mut Random) -> Vec<T> {
    items
        .into_iter()
        .filter(|_| random.next_int(100) < probability)
        .collect()
}

struct Walker<'a, 'u> {
    analysis: &'a Analysis,
    scopes: Vec<Vec<Variable>>,
    flattened: Option<Rc<[Variable]>>,
    points: Vec<InjectionPoint<'u>>,
    loops: u32,
    switches: u32,
    function: Option<&'u Node<FunctionDefinition>>,
}

impl<'u> Walker<'_, 'u> {
    fn pop(&mut self) {
        self.scopes.pop();
        self.flattened = None;
    }

    fn push(&mut self) {
        self.scopes.push(Vec::new());
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
        let flattened: Rc<[Variable]> = flatten(&self.scopes).into();
        self.flattened = Some(Rc::clone(&flattened));
        flattened
    }

    fn point(&mut self, location: Location, next: Option<&'u Statement>, in_loop: bool) {
        let Some(function) = self.function else {
            return;
        };
        let scope = self.visible();
        self.points.push(InjectionPoint {
            location,
            next,
            scope,
            in_loop,
            in_switch: self.switches > 0,
            function,
        });
    }

    fn declaration(&mut self, declaration: &Declaration) {
        for variable in declared_variables(self.analysis, declaration) {
            self.add(variable);
        }
    }

    fn loop_body(&mut self, statement: NodeId, body: &'u Statement) {
        if !matches!(body.kind, StatementKind::Compound(_)) {
            self.point(Location::Body { statement }, Some(body), true);
        }
    }
}

impl<'b, 'a: 'b, 'u: 'b> Cx<'b, Walker<'a, 'u>> {
    async fn block(self, block: BlockId, statements: &'u [Statement]) {
        self.state().push();
        for (index, statement) in statements.iter().enumerate() {
            let label = matches!(statement.kind, StatementKind::CaseLabel(_));
            if !(index == 0 && label) {
                let mut state = self.state();
                let in_loop = state.loops > 0;
                state.point(Location::Block { block, index }, Some(statement), in_loop);
            }
            self.call(self.clone().statement(statement)).await;
        }
        let mut state = self.state();
        let in_loop = state.loops > 0;
        state.point(
            Location::Block {
                block,
                index: statements.len(),
            },
            None,
            in_loop,
        );
        state.pop();
    }

    async fn nested(self, statement: &'u Statement) {
        self.state().push();
        self.call(self.clone().statement(statement)).await;
        self.state().pop();
    }

    async fn statement(self, statement: &'u Statement) {
        match &statement.kind {
            StatementKind::Compound(compound) => {
                self.call(
                    self.clone()
                        .block(BlockId::Statement(statement.id), &compound.statements),
                )
                .await;
            }
            StatementKind::Declaration(declaration) => self.state().declaration(declaration),
            StatementKind::Selection {
                then_branch,
                else_branch,
                ..
            } => {
                {
                    let mut state = self.state();
                    let in_loop = state.loops > 0;
                    if !matches!(then_branch.kind, StatementKind::Compound(_)) {
                        state.point(
                            Location::Branch {
                                statement: statement.id,
                                else_branch: false,
                            },
                            Some(then_branch),
                            in_loop,
                        );
                    }
                    if let Some(else_branch) = else_branch {
                        if !matches!(else_branch.kind, StatementKind::Compound(_)) {
                            state.point(
                                Location::Branch {
                                    statement: statement.id,
                                    else_branch: true,
                                },
                                Some(else_branch),
                                in_loop,
                            );
                        }
                    }
                }
                self.clone().nested(then_branch).await;
                if let Some(else_branch) = else_branch {
                    self.clone().nested(else_branch).await;
                }
            }
            StatementKind::Switch { statements, .. } => {
                self.state().switches += 1;
                self.call(
                    self.clone()
                        .block(BlockId::Statement(statement.id), statements),
                )
                .await;
                self.state().switches -= 1;
            }
            StatementKind::While { condition, body } => {
                {
                    let mut state = self.state();
                    state.loop_body(statement.id, body);
                    state.loops += 1;
                    state.push();
                    if let Condition::Declaration(declaration) = condition {
                        let variable = declared_variable(
                            state.analysis,
                            declaration.id,
                            &declaration.name.node,
                        );
                        state.add(variable);
                    }
                }
                self.call(self.clone().statement(body)).await;
                let mut state = self.state();
                state.pop();
                state.loops -= 1;
            }
            StatementKind::DoWhile { body, .. } => {
                {
                    let mut state = self.state();
                    state.loop_body(statement.id, body);
                    state.loops += 1;
                }
                self.clone().nested(body).await;
                self.state().loops -= 1;
            }
            StatementKind::For(for_statement) => {
                {
                    let mut state = self.state();
                    state.loop_body(statement.id, &for_statement.body);
                    state.loops += 1;
                    state.push();
                }
                self.call(self.clone().statement(&for_statement.init)).await;
                if let Some(Condition::Declaration(declaration)) = &for_statement.condition {
                    let mut state = self.state();
                    let variable =
                        declared_variable(state.analysis, declaration.id, &declaration.name.node);
                    state.add(variable);
                }
                self.call(self.clone().statement(&for_statement.body)).await;
                let mut state = self.state();
                state.pop();
                state.loops -= 1;
            }
            StatementKind::Attributed { statement, .. } => {
                self.call(self.clone().statement(statement)).await;
            }
            StatementKind::Expression(_) | StatementKind::CaseLabel(_) | StatementKind::Jump(_) => {
            }
        }
    }
}

pub fn flatten(scopes: &[Vec<Variable>]) -> Vec<Variable> {
    let mut seen = BTreeSet::new();
    let mut visible = Vec::new();
    for scope in scopes.iter().rev() {
        for variable in scope.iter().rev() {
            if seen.insert(variable.name.clone()) {
                visible.push(variable.clone());
            }
        }
    }
    visible.reverse();
    visible
}

pub fn declared_variables(analysis: &Analysis, declaration: &Declaration) -> Vec<Variable> {
    match &declaration.kind {
        DeclarationKind::InitDeclaratorList(list) => list
            .declarators
            .iter()
            .map(|declarator| declared_variable(analysis, declarator.id, &declarator.name.node))
            .collect(),
        DeclarationKind::Block {
            structure,
            instance,
        } => match instance {
            Some(instance) => vec![Variable::new(&instance.name.node, None)],
            None => structure
                .members
                .iter()
                .flat_map(|member| {
                    let ty = basic::from_specifier(&member.ty.specifier);
                    member.declarators.iter().map(move |declarator| {
                        Variable::new(
                            &declarator.name.node,
                            ty.filter(|_| declarator.array.is_none()),
                        )
                    })
                })
                .collect(),
        },
        _ => Vec::new(),
    }
}

pub fn declared_names(declaration: &Declaration) -> Vec<String> {
    match &declaration.kind {
        DeclarationKind::InitDeclaratorList(list) => list
            .declarators
            .iter()
            .map(|declarator| declarator.name.node.clone())
            .collect(),
        _ => Vec::new(),
    }
}

pub fn contains_top_level_break(statement: &Statement) -> bool {
    contains_top_level(statement, true)
}

pub fn contains_top_level_continue(statement: &Statement) -> bool {
    contains_top_level(statement, false)
}

fn contains_top_level(statement: &Statement, break_statement: bool) -> bool {
    let mut pending = vec![statement];
    while let Some(statement) = pending.pop() {
        match &statement.kind {
            StatementKind::Jump(JumpStatement::Break) if break_statement => return true,
            StatementKind::Jump(JumpStatement::Continue) if !break_statement => return true,
            StatementKind::Compound(compound) => {
                pending.extend(compound.statements.iter().rev());
            }
            StatementKind::Selection {
                then_branch,
                else_branch,
                ..
            } => {
                pending.extend(else_branch.as_deref());
                pending.push(then_branch);
            }
            StatementKind::Switch { statements, .. } => {
                if !break_statement {
                    pending.extend(statements.iter().rev());
                }
            }
            StatementKind::Attributed { statement, .. } => pending.push(statement),
            StatementKind::While { .. }
            | StatementKind::DoWhile { .. }
            | StatementKind::For(_)
            | StatementKind::Declaration(_)
            | StatementKind::Expression(_)
            | StatementKind::CaseLabel(_)
            | StatementKind::Jump(_) => {}
        }
    }
    false
}

pub fn contains_case_label(statement: &Statement) -> bool {
    matches!(
        statement.kind,
        StatementKind::CaseLabel(CaseLabel::Case(_) | CaseLabel::Default)
    )
}

pub type Replacement = Box<dyn FnOnce(Statement) -> Statement>;

pub enum Edit {
    Inject(Statement),
    Replace(Replacement),
}

impl core::fmt::Debug for Edit {
    fn fmt(&self, formatter: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        match self {
            Self::Inject(statement) => formatter.debug_tuple("Inject").field(statement).finish(),
            Self::Replace(_) => formatter.write_str("Replace"),
        }
    }
}

#[derive(Default)]
struct Edits {
    blocks: BTreeMap<BlockId, BTreeMap<usize, Vec<Edit>>>,
    branches: BTreeMap<Location, Vec<Edit>>,
}

pub fn apply_edits(
    unit: &mut TranslationUnit,
    edits: Vec<(Location, Edit)>,
    builder: &mut Builder,
) {
    let mut grouped = Edits::default();
    for (location, edit) in edits {
        match location {
            Location::Block { block, index } => grouped
                .blocks
                .entry(block)
                .or_default()
                .entry(index)
                .or_default()
                .push(edit),
            Location::Branch { .. } | Location::Body { .. } => {
                grouped.branches.entry(location).or_default().push(edit);
            }
        }
    }
    let state = RefCell::new(Applier {
        edits: grouped,
        builder,
    });
    for (index, external) in unit.external_declarations.iter_mut().enumerate() {
        if let ExternalDeclaration::FunctionDefinition(definition) = external {
            let statements = &mut definition.body.statements;
            let _ = run(|stack| Cx::new(&state, stack).block(BlockId::Function(index), statements));
        }
    }
}

fn apply_at(statements: &mut Vec<Statement>, current: Option<Statement>, edits: Vec<Edit>) {
    let mut current = current;
    for edit in edits {
        match edit {
            Edit::Inject(statement) => statements.push(statement),
            Edit::Replace(replace) => current = current.map(replace),
        }
    }
    statements.extend(current);
}

struct Applier<'b> {
    edits: Edits,
    builder: &'b mut Builder,
}

impl Applier<'_> {
    fn finish_block(&mut self, block: BlockId, statements: &mut Vec<Statement>) {
        let Some(mut edits) = self.edits.blocks.remove(&block) else {
            return;
        };
        let old = core::mem::take(statements);
        let length = old.len();
        let mut old = old.into_iter();
        for index in 0..=length {
            let current = old.next();
            let at = edits.remove(&index).unwrap_or_default();
            apply_at(statements, current, at);
        }
    }

    fn branch(&mut self, location: Location, slot: &mut Statement) {
        let Some(edits) = self.edits.branches.remove(&location) else {
            return;
        };
        let placeholder = self.builder.block(Vec::new());
        let original = core::mem::replace(slot, placeholder);
        let mut statements = Vec::new();
        apply_at(&mut statements, Some(original), edits);
        *slot = self.builder.block(statements);
    }
}

impl<'b, 'c: 'b> Cx<'b, Applier<'c>> {
    async fn block(self, block: BlockId, statements: &mut Vec<Statement>) {
        for statement in statements.iter_mut() {
            self.statement_in(statement).await;
        }
        self.state().finish_block(block, statements);
    }

    async fn statement_in(&self, slot: &mut Statement) {
        let statement = take_statement(slot);
        *slot = self.call(self.clone().statement(statement)).await;
    }

    async fn statement(self, mut statement: Statement) -> Statement {
        let id = statement.id;
        match &mut statement.kind {
            StatementKind::Compound(compound) => {
                self.clone()
                    .block(BlockId::Statement(id), &mut compound.statements)
                    .await;
            }
            StatementKind::Selection {
                then_branch,
                else_branch,
                ..
            } => {
                self.statement_in(then_branch).await;
                self.state().branch(
                    Location::Branch {
                        statement: id,
                        else_branch: false,
                    },
                    then_branch,
                );
                if let Some(else_branch) = else_branch {
                    self.statement_in(else_branch).await;
                    self.state().branch(
                        Location::Branch {
                            statement: id,
                            else_branch: true,
                        },
                        else_branch,
                    );
                }
            }
            StatementKind::Switch { statements, .. } => {
                self.clone().block(BlockId::Statement(id), statements).await;
            }
            StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => {
                self.statement_in(body).await;
                self.state().branch(Location::Body { statement: id }, body);
            }
            StatementKind::For(for_statement) => {
                self.statement_in(&mut for_statement.body).await;
                self.state()
                    .branch(Location::Body { statement: id }, &mut for_statement.body);
            }
            StatementKind::Attributed { statement, .. } => self.statement_in(statement).await,
            StatementKind::Declaration(_)
            | StatementKind::Expression(_)
            | StatementKind::CaseLabel(_)
            | StatementKind::Jump(_) => {}
        }
        statement
    }
}

pub fn initializer_expressions(initializer: &Initializer) -> Vec<&rglsl_ast::ast::Expression> {
    let mut found = Vec::new();
    let mut pending = vec![initializer];
    while let Some(initializer) = pending.pop() {
        match initializer {
            Initializer::Expression(expression) => found.push(expression),
            Initializer::List(items) => pending.extend(items.iter().map(|item| &item.node).rev()),
        }
    }
    found
}
