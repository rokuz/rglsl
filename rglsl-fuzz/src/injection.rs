use std::collections::{BTreeMap, BTreeSet};
use std::rc::Rc;

use rglsl_ast::ast::{
    CaseLabel, Condition, Declaration, DeclarationKind, ExternalDeclaration, FunctionDefinition,
    Initializer, JumpStatement, Node, NodeId, Statement, StatementKind, TranslationUnit,
};
use rglsl_sema::Analysis;

use crate::basic;
use crate::build::Builder;
use crate::random::Random;
use crate::scope::{declared_variable, Variable};

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
                walker.block(BlockId::Function(index), &definition.body.statements);
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

    fn block(&mut self, block: BlockId, statements: &'u [Statement]) {
        self.push();
        for (index, statement) in statements.iter().enumerate() {
            let label = matches!(statement.kind, StatementKind::CaseLabel(_));
            if !(index == 0 && label) {
                self.point(
                    Location::Block { block, index },
                    Some(statement),
                    self.loops > 0,
                );
            }
            self.statement(statement);
        }
        self.point(
            Location::Block {
                block,
                index: statements.len(),
            },
            None,
            self.loops > 0,
        );
        self.pop();
    }

    fn loop_body(&mut self, statement: NodeId, body: &'u Statement) {
        if !matches!(body.kind, StatementKind::Compound(_)) {
            self.point(Location::Body { statement }, Some(body), true);
        }
    }

    fn statement(&mut self, statement: &'u Statement) {
        match &statement.kind {
            StatementKind::Compound(compound) => {
                self.block(BlockId::Statement(statement.id), &compound.statements);
            }
            StatementKind::Declaration(declaration) => self.declaration(declaration),
            StatementKind::Selection {
                then_branch,
                else_branch,
                ..
            } => {
                if !matches!(then_branch.kind, StatementKind::Compound(_)) {
                    self.point(
                        Location::Branch {
                            statement: statement.id,
                            else_branch: false,
                        },
                        Some(then_branch),
                        self.loops > 0,
                    );
                }
                if let Some(else_branch) = else_branch {
                    if !matches!(else_branch.kind, StatementKind::Compound(_)) {
                        self.point(
                            Location::Branch {
                                statement: statement.id,
                                else_branch: true,
                            },
                            Some(else_branch),
                            self.loops > 0,
                        );
                    }
                }
                self.nested(then_branch);
                if let Some(else_branch) = else_branch {
                    self.nested(else_branch);
                }
            }
            StatementKind::Switch { statements, .. } => {
                self.switches += 1;
                self.block(BlockId::Statement(statement.id), statements);
                self.switches -= 1;
            }
            StatementKind::While { condition, body } => {
                self.loop_body(statement.id, body);
                self.loops += 1;
                self.push();
                if let Condition::Declaration(declaration) = condition {
                    let variable =
                        declared_variable(self.analysis, declaration.id, &declaration.name.node);
                    self.add(variable);
                }
                self.statement(body);
                self.pop();
                self.loops -= 1;
            }
            StatementKind::DoWhile { body, .. } => {
                self.loop_body(statement.id, body);
                self.loops += 1;
                self.nested(body);
                self.loops -= 1;
            }
            StatementKind::For(for_statement) => {
                self.loop_body(statement.id, &for_statement.body);
                self.loops += 1;
                self.push();
                self.statement(&for_statement.init);
                if let Some(Condition::Declaration(declaration)) = &for_statement.condition {
                    let variable =
                        declared_variable(self.analysis, declaration.id, &declaration.name.node);
                    self.add(variable);
                }
                self.statement(&for_statement.body);
                self.pop();
                self.loops -= 1;
            }
            StatementKind::Attributed { statement, .. } => self.statement(statement),
            StatementKind::Expression(_) | StatementKind::CaseLabel(_) | StatementKind::Jump(_) => {
            }
        }
    }

    fn nested(&mut self, statement: &'u Statement) {
        self.push();
        self.statement(statement);
        self.pop();
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
    match &statement.kind {
        StatementKind::Jump(JumpStatement::Break) => break_statement,
        StatementKind::Jump(JumpStatement::Continue) => !break_statement,
        StatementKind::Compound(compound) => compound
            .statements
            .iter()
            .any(|inner| contains_top_level(inner, break_statement)),
        StatementKind::Selection {
            then_branch,
            else_branch,
            ..
        } => {
            contains_top_level(then_branch, break_statement)
                || else_branch
                    .as_deref()
                    .is_some_and(|inner| contains_top_level(inner, break_statement))
        }
        StatementKind::Switch { statements, .. } => {
            !break_statement
                && statements
                    .iter()
                    .any(|inner| contains_top_level(inner, break_statement))
        }
        StatementKind::Attributed { statement, .. } => {
            contains_top_level(statement, break_statement)
        }
        StatementKind::While { .. }
        | StatementKind::DoWhile { .. }
        | StatementKind::For(_)
        | StatementKind::Declaration(_)
        | StatementKind::Expression(_)
        | StatementKind::CaseLabel(_)
        | StatementKind::Jump(_) => false,
    }
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
    let mut applier = Applier {
        edits: grouped,
        builder,
    };
    for (index, external) in unit.external_declarations.iter_mut().enumerate() {
        if let ExternalDeclaration::FunctionDefinition(definition) = external {
            applier.block(BlockId::Function(index), &mut definition.body.statements);
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
    fn block(&mut self, block: BlockId, statements: &mut Vec<Statement>) {
        for statement in statements.iter_mut() {
            self.statement(statement);
        }
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

    fn statement(&mut self, statement: &mut Statement) {
        let id = statement.id;
        match &mut statement.kind {
            StatementKind::Compound(compound) => {
                self.block(BlockId::Statement(id), &mut compound.statements);
            }
            StatementKind::Selection {
                then_branch,
                else_branch,
                ..
            } => {
                self.statement(then_branch);
                self.branch(
                    Location::Branch {
                        statement: id,
                        else_branch: false,
                    },
                    then_branch,
                );
                if let Some(else_branch) = else_branch {
                    self.statement(else_branch);
                    self.branch(
                        Location::Branch {
                            statement: id,
                            else_branch: true,
                        },
                        else_branch,
                    );
                }
            }
            StatementKind::Switch { statements, .. } => {
                self.block(BlockId::Statement(id), statements);
            }
            StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => {
                self.statement(body);
                self.branch(Location::Body { statement: id }, body);
            }
            StatementKind::For(for_statement) => {
                self.statement(&mut for_statement.body);
                self.branch(Location::Body { statement: id }, &mut for_statement.body);
            }
            StatementKind::Attributed { statement, .. } => self.statement(statement),
            StatementKind::Declaration(_)
            | StatementKind::Expression(_)
            | StatementKind::CaseLabel(_)
            | StatementKind::Jump(_) => {}
        }
    }
}

pub fn initializer_expressions(initializer: &Initializer) -> Vec<&rglsl_ast::ast::Expression> {
    match initializer {
        Initializer::Expression(expression) => vec![expression],
        Initializer::List(items) => items
            .iter()
            .flat_map(|item| initializer_expressions(item))
            .collect(),
    }
}
