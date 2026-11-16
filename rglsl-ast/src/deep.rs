use alloc::boxed::Box;
use alloc::vec::Vec;
use core::fmt;
use core::mem;

use crate::ast::{
    ArrayDimension, ArraySpecifier, CompoundStatement, Expression, ExpressionKind, ForStatement,
    FullySpecifiedType, FunctionIdentifier, Initializer, LayoutQualifier, LayoutQualifierId,
    NodeId, SingleTypeQualifier, Spanned, SpirvDecorate, SpirvInstructionQualifier,
    SpirvRequirement, SpirvStorageClass, SpirvTypeParameter, SpirvTypeSpecifier, Statement,
    StatementKind, StructDeclaration, StructDeclarator, StructSpecifier, TypeParameters,
    TypeQualifier, TypeSpecifier, TypeSpecifierNonArray,
};
use crate::chain::placeholder;
use crate::span::Span;

pub(crate) trait Nested: Sized {
    type Node;

    fn kind(node: &Self::Node) -> &Self;
    fn rebuild(node: &Self::Node, kind: Self) -> Self::Node;
    fn has_children(&self) -> bool;
    fn child_count(&self) -> usize;
    fn for_each_child<'a>(&'a self, f: impl FnMut(&'a Self::Node));
    fn for_each_child_mut<'a>(&'a mut self, f: impl FnMut(&'a mut Self::Node));
    fn shell(&self) -> Self;
    fn same_shell(&self, other: &Self) -> bool;
}

enum CloneTask<'a, K: Nested> {
    Visit(&'a K::Node),
    Build(&'a K::Node),
}

fn fill<K: Nested>(kind: &mut K, built: &mut Vec<K::Node>) {
    let count = kind.child_count();
    let start = built.len().saturating_sub(count);
    let mut iter = built.drain(start..);
    kind.for_each_child_mut(|slot| {
        if let Some(child) = iter.next() {
            *slot = child;
        }
    });
}

pub(crate) fn deep_clone<K: Nested>(root: &K) -> K {
    let mut shell = root.shell();
    if !root.has_children() {
        return shell;
    }
    let mut built: Vec<K::Node> = Vec::new();
    let mut tasks: Vec<CloneTask<'_, K>> = Vec::with_capacity(root.child_count());
    root.for_each_child(|child| tasks.push(CloneTask::Visit(child)));
    tasks.reverse();
    while let Some(task) = tasks.pop() {
        match task {
            CloneTask::Visit(node) => {
                let kind = K::kind(node);
                if !kind.has_children() {
                    built.push(K::rebuild(node, kind.shell()));
                } else {
                    tasks.push(CloneTask::Build(node));
                    let mark = tasks.len();
                    kind.for_each_child(|child| tasks.push(CloneTask::Visit(child)));
                    if let Some(added) = tasks.get_mut(mark..) {
                        added.reverse();
                    }
                }
            }
            CloneTask::Build(node) => {
                let mut kind = K::kind(node).shell();
                fill(&mut kind, &mut built);
                built.push(K::rebuild(node, kind));
            }
        }
    }
    fill(&mut shell, &mut built);
    shell
}

pub(crate) fn deep_eq<K: Nested>(left: &K, right: &K) -> bool {
    if !left.same_shell(right) {
        return false;
    }
    if !left.has_children() && !right.has_children() {
        return true;
    }
    let mut pairs = Vec::from([(left, right)]);
    let mut left_children: Vec<&K::Node> = Vec::new();
    let mut right_children: Vec<&K::Node> = Vec::new();
    while let Some((left, right)) = pairs.pop() {
        if !left.same_shell(right) {
            return false;
        }
        left_children.clear();
        right_children.clear();
        left.for_each_child(|child| left_children.push(child));
        right.for_each_child(|child| right_children.push(child));
        if left_children.len() != right_children.len() {
            return false;
        }
        pairs.extend(
            left_children
                .iter()
                .zip(&right_children)
                .map(|(left, right)| (K::kind(left), K::kind(right))),
        );
    }
    true
}

pub(crate) enum Owned {
    Type(TypeSpecifier),
    Initializer(Initializer),
    Statement(Statement),
}

pub(crate) const fn empty_type() -> TypeSpecifier {
    TypeSpecifier {
        non_array: TypeSpecifierNonArray::Void,
        parameters: None,
        array: None,
    }
}

pub(crate) fn empty_statement() -> Statement {
    Statement::new(
        NodeId::FIRST,
        Span::default(),
        StatementKind::Expression(None),
    )
}

fn take_type(specifier: &mut TypeSpecifier, into: &mut Vec<Owned>) {
    if !specifier.is_leaf_type() {
        into.push(Owned::Type(mem::replace(specifier, empty_type())));
    }
}

impl TypeSpecifier {
    pub(crate) const fn is_leaf_type(&self) -> bool {
        self.parameters.is_none()
            && self.array.is_none()
            && !matches!(
                self.non_array,
                TypeSpecifierNonArray::Struct(_)
                    | TypeSpecifierNonArray::InlineBlock(_)
                    | TypeSpecifierNonArray::Spirv(_)
            )
    }

    pub(crate) fn take_owned(&mut self, into: &mut Vec<Owned>) {
        self.parts_mut(&mut |part| {
            if let PartMut::Type(specifier) = part {
                take_type(specifier, into);
            }
        });
    }
}

impl Initializer {
    const fn is_nonempty_list(&self) -> bool {
        matches!(self, Self::List(items) if !items.is_empty())
    }

    pub(crate) fn take_owned(&mut self, into: &mut Vec<Owned>) {
        if let Self::List(items) = self {
            for item in items {
                if item.node.is_nonempty_list() {
                    into.push(Owned::Initializer(mem::replace(
                        &mut item.node,
                        Self::List(Vec::new()),
                    )));
                }
            }
        }
    }
}

impl StatementKind {
    pub(crate) const fn has_children(&self) -> bool {
        match self {
            Self::Compound(compound) => !compound.statements.is_empty(),
            Self::Switch { statements, .. } => !statements.is_empty(),
            Self::Selection { .. }
            | Self::While { .. }
            | Self::DoWhile { .. }
            | Self::For(_)
            | Self::Attributed { .. } => true,
            Self::Declaration(_) | Self::Expression(_) | Self::CaseLabel(_) | Self::Jump(_) => {
                false
            }
        }
    }

    pub(crate) fn take_owned(&mut self, into: &mut Vec<Owned>) {
        self.for_each_child_mut(|child| {
            if child.kind.has_children() {
                into.push(Owned::Statement(mem::replace(child, empty_statement())));
            }
        });
    }
}

impl Owned {
    fn take_owned(&mut self, into: &mut Vec<Self>) {
        match self {
            Self::Type(specifier) => specifier.take_owned(into),
            Self::Initializer(initializer) => initializer.take_owned(into),
            Self::Statement(statement) => statement.kind.take_owned(into),
        }
    }
}

pub(crate) fn drop_owned(mut pending: Vec<Owned>) {
    while let Some(mut owned) = pending.pop() {
        owned.take_owned(&mut pending);
    }
}

impl Drop for StatementKind {
    fn drop(&mut self) {
        if !self.has_children() {
            return;
        }
        let mut pending = Vec::new();
        self.take_owned(&mut pending);
        drop_owned(pending);
    }
}

impl Drop for TypeSpecifier {
    fn drop(&mut self) {
        if self.is_leaf_type() {
            return;
        }
        let mut pending = Vec::new();
        self.take_owned(&mut pending);
        drop_owned(pending);
    }
}

impl Drop for Initializer {
    fn drop(&mut self) {
        if !self.is_nonempty_list() {
            return;
        }
        let mut pending = Vec::new();
        self.take_owned(&mut pending);
        drop_owned(pending);
    }
}

fn statement_shell() -> Statement {
    empty_statement()
}

impl Nested for StatementKind {
    type Node = Statement;

    fn kind(node: &Statement) -> &Self {
        &node.kind
    }

    fn rebuild(node: &Statement, kind: Self) -> Statement {
        Statement::new(node.id, node.span, kind)
    }

    fn has_children(&self) -> bool {
        Self::has_children(self)
    }

    fn child_count(&self) -> usize {
        match self {
            Self::Compound(compound) => compound.statements.len(),
            Self::Switch { statements, .. } => statements.len(),
            Self::Selection { else_branch, .. } => 1 + usize::from(else_branch.is_some()),
            Self::While { .. } | Self::DoWhile { .. } | Self::Attributed { .. } => 1,
            Self::For(_) => 2,
            Self::Declaration(_) | Self::Expression(_) | Self::CaseLabel(_) | Self::Jump(_) => 0,
        }
    }

    fn for_each_child<'a>(&'a self, mut f: impl FnMut(&'a Statement)) {
        match self {
            Self::Compound(compound) => {
                for statement in &compound.statements {
                    f(statement);
                }
            }
            Self::Switch { statements, .. } => {
                for statement in statements {
                    f(statement);
                }
            }
            Self::Selection {
                then_branch,
                else_branch,
                ..
            } => {
                f(then_branch);
                if let Some(else_branch) = else_branch {
                    f(else_branch);
                }
            }
            Self::While { body, .. } | Self::DoWhile { body, .. } => f(body),
            Self::For(statement) => {
                f(&statement.init);
                f(&statement.body);
            }
            Self::Attributed { statement, .. } => f(statement),
            Self::Declaration(_) | Self::Expression(_) | Self::CaseLabel(_) | Self::Jump(_) => {}
        }
    }

    fn for_each_child_mut<'a>(&'a mut self, mut f: impl FnMut(&'a mut Statement)) {
        match self {
            Self::Compound(compound) => {
                for statement in &mut compound.statements {
                    f(statement);
                }
            }
            Self::Switch { statements, .. } => {
                for statement in statements {
                    f(statement);
                }
            }
            Self::Selection {
                then_branch,
                else_branch,
                ..
            } => {
                f(then_branch);
                if let Some(else_branch) = else_branch {
                    f(else_branch);
                }
            }
            Self::While { body, .. } | Self::DoWhile { body, .. } => f(body),
            Self::For(statement) => {
                let ForStatement { init, body, .. } = &mut **statement;
                f(init);
                f(body);
            }
            Self::Attributed { statement, .. } => f(statement),
            Self::Declaration(_) | Self::Expression(_) | Self::CaseLabel(_) | Self::Jump(_) => {}
        }
    }

    fn shell(&self) -> Self {
        let hole = || Box::new(statement_shell());
        match self {
            Self::Compound(compound) => Self::Compound(CompoundStatement {
                statements: compound
                    .statements
                    .iter()
                    .map(|_| statement_shell())
                    .collect(),
            }),
            Self::Declaration(declaration) => Self::Declaration(declaration.clone()),
            Self::Expression(expression) => Self::Expression(expression.clone()),
            Self::Selection {
                condition,
                else_branch,
                ..
            } => Self::Selection {
                condition: condition.clone(),
                then_branch: hole(),
                else_branch: else_branch.as_ref().map(|_| hole()),
            },
            Self::Switch {
                selector,
                statements,
            } => Self::Switch {
                selector: selector.clone(),
                statements: statements.iter().map(|_| statement_shell()).collect(),
            },
            Self::CaseLabel(label) => Self::CaseLabel(label.clone()),
            Self::While { condition, .. } => Self::While {
                condition: condition.clone(),
                body: hole(),
            },
            Self::DoWhile { condition, .. } => Self::DoWhile {
                body: hole(),
                condition: condition.clone(),
            },
            Self::For(statement) => Self::For(Box::new(ForStatement {
                init: statement_shell(),
                condition: statement.condition.clone(),
                increment: statement.increment.clone(),
                body: statement_shell(),
            })),
            Self::Jump(jump) => Self::Jump(jump.clone()),
            Self::Attributed { attributes, .. } => Self::Attributed {
                attributes: attributes.clone(),
                statement: hole(),
            },
        }
    }

    fn same_shell(&self, other: &Self) -> bool {
        match (self, other) {
            (Self::Compound(left), Self::Compound(right)) => {
                left.statements.len() == right.statements.len()
            }
            (Self::Declaration(left), Self::Declaration(right)) => left == right,
            (Self::Expression(left), Self::Expression(right)) => left == right,
            (
                Self::Selection {
                    condition: left,
                    else_branch: left_else,
                    ..
                },
                Self::Selection {
                    condition: right,
                    else_branch: right_else,
                    ..
                },
            ) => left == right && left_else.is_some() == right_else.is_some(),
            (
                Self::Switch {
                    selector: left,
                    statements: left_statements,
                },
                Self::Switch {
                    selector: right,
                    statements: right_statements,
                },
            ) => left == right && left_statements.len() == right_statements.len(),
            (Self::CaseLabel(left), Self::CaseLabel(right)) => left == right,
            (
                Self::While {
                    condition: left, ..
                },
                Self::While {
                    condition: right, ..
                },
            ) => left == right,
            (
                Self::DoWhile {
                    condition: left, ..
                },
                Self::DoWhile {
                    condition: right, ..
                },
            ) => left == right,
            (Self::For(left), Self::For(right)) => {
                left.condition == right.condition && left.increment == right.increment
            }
            (Self::Jump(left), Self::Jump(right)) => left == right,
            (
                Self::Attributed {
                    attributes: left, ..
                },
                Self::Attributed {
                    attributes: right, ..
                },
            ) => left == right,
            _ => false,
        }
    }
}

impl Clone for StatementKind {
    fn clone(&self) -> Self {
        deep_clone(self)
    }
}

impl PartialEq for StatementKind {
    fn eq(&self, other: &Self) -> bool {
        deep_eq(self, other)
    }
}

impl Eq for StatementKind {}

fn initializer_shell() -> Spanned<Initializer> {
    Spanned::new(Span::default(), Initializer::List(Vec::new()))
}

impl Nested for Initializer {
    type Node = Spanned<Self>;

    fn kind(node: &Spanned<Self>) -> &Self {
        &node.node
    }

    fn rebuild(node: &Spanned<Self>, kind: Self) -> Spanned<Self> {
        Spanned::new(node.span, kind)
    }

    fn has_children(&self) -> bool {
        matches!(self, Self::List(items) if !items.is_empty())
    }

    fn child_count(&self) -> usize {
        match self {
            Self::Expression(_) => 0,
            Self::List(items) => items.len(),
        }
    }

    fn for_each_child<'a>(&'a self, mut f: impl FnMut(&'a Spanned<Self>)) {
        if let Self::List(items) = self {
            for item in items {
                f(item);
            }
        }
    }

    fn for_each_child_mut<'a>(&'a mut self, mut f: impl FnMut(&'a mut Spanned<Self>)) {
        if let Self::List(items) = self {
            for item in items {
                f(item);
            }
        }
    }

    fn shell(&self) -> Self {
        match self {
            Self::Expression(expression) => Self::Expression(expression.clone()),
            Self::List(items) => Self::List(items.iter().map(|_| initializer_shell()).collect()),
        }
    }

    fn same_shell(&self, other: &Self) -> bool {
        match (self, other) {
            (Self::Expression(left), Self::Expression(right)) => left == right,
            (Self::List(left), Self::List(right)) => left.len() == right.len(),
            _ => false,
        }
    }
}

impl Clone for Initializer {
    fn clone(&self) -> Self {
        deep_clone(self)
    }
}

impl PartialEq for Initializer {
    fn eq(&self, other: &Self) -> bool {
        deep_eq(self, other)
    }
}

impl Eq for Initializer {}

#[derive(Clone, Copy)]
pub(crate) enum Part<'a> {
    Expression(&'a Expression),
    Type(&'a TypeSpecifier),
}

pub(crate) enum PartMut<'a> {
    Expression(&'a mut Expression),
    Type(&'a mut TypeSpecifier),
}

enum Built {
    Expression(Expression),
    Type(TypeSpecifier),
}

pub(crate) trait Composite: Sized {
    fn parts<'a>(&'a self, f: &mut dyn FnMut(Part<'a>));
    fn parts_mut(&mut self, f: &mut dyn FnMut(PartMut<'_>));
    fn hollow(&self) -> Self;
    fn same_hollow(&self, other: &Self) -> bool;
}

impl<'a> Part<'a> {
    fn parts(self, f: &mut dyn FnMut(Part<'a>)) {
        match self {
            Self::Expression(expression) => expression.kind.parts(f),
            Self::Type(specifier) => specifier.parts(f),
        }
    }

    fn count(self) -> usize {
        let mut count = 0;
        self.parts(&mut |_| count += 1);
        count
    }

    fn build(self, built: &mut Vec<Built>, count: usize) -> Built {
        match self {
            Self::Expression(expression) => {
                let mut kind = expression.kind.hollow();
                fill_parts(&mut kind, built, count);
                Built::Expression(Expression::new(expression.id, expression.span, kind))
            }
            Self::Type(specifier) => {
                let mut specifier = specifier.hollow();
                fill_parts(&mut specifier, built, count);
                Built::Type(specifier)
            }
        }
    }

    fn same_hollow(self, other: Self) -> bool {
        match (self, other) {
            (Self::Expression(left), Self::Expression(right)) => left.kind.same_hollow(&right.kind),
            (Self::Type(left), Self::Type(right)) => left.same_hollow(right),
            _ => false,
        }
    }
}

fn fill_parts<C: Composite>(shell: &mut C, built: &mut Vec<Built>, count: usize) {
    let start = built.len().saturating_sub(count);
    let mut items = built.split_off(start).into_iter();
    shell.parts_mut(&mut |slot| match (slot, items.next()) {
        (PartMut::Expression(slot), Some(Built::Expression(value))) => *slot = value,
        (PartMut::Type(slot), Some(Built::Type(value))) => *slot = value,
        _ => {}
    });
}

pub(crate) fn clone_composite<C: Composite>(root: &C) -> C {
    let mut shell = root.hollow();
    let mut tasks: Vec<(Part<'_>, bool)> = Vec::new();
    root.parts(&mut |part| tasks.push((part, false)));
    let count = tasks.len();
    if count == 0 {
        return shell;
    }
    tasks.reverse();
    let mut built = Vec::with_capacity(count);
    while let Some((part, expanded)) = tasks.pop() {
        if expanded {
            let children = part.count();
            let value = part.build(&mut built, children);
            built.push(value);
            continue;
        }
        let mark = tasks.len();
        tasks.push((part, true));
        part.parts(&mut |child| tasks.push((child, false)));
        match tasks.get_mut(mark + 1..) {
            Some(added) if !added.is_empty() => added.reverse(),
            _ => {
                tasks.truncate(mark);
                let value = part.build(&mut built, 0);
                built.push(value);
            }
        }
    }
    fill_parts(&mut shell, &mut built, count);
    shell
}

pub(crate) fn eq_composite<C: Composite>(left: &C, right: &C) -> bool {
    if !left.same_hollow(right) {
        return false;
    }
    let mut left_parts: Vec<Part<'_>> = Vec::new();
    let mut right_parts: Vec<Part<'_>> = Vec::new();
    left.parts(&mut |part| left_parts.push(part));
    right.parts(&mut |part| right_parts.push(part));
    let mut pending: Vec<(Part<'_>, Part<'_>)> = Vec::new();
    loop {
        if left_parts.len() != right_parts.len() {
            return false;
        }
        pending.extend(left_parts.drain(..).zip(right_parts.drain(..)));
        let Some((left, right)) = pending.pop() else {
            return true;
        };
        if !left.same_hollow(right) {
            return false;
        }
        left.parts(&mut |part| left_parts.push(part));
        right.parts(&mut |part| right_parts.push(part));
    }
}

fn requirement_parts<'a>(
    requirements: &'a [Spanned<SpirvRequirement>],
    f: &mut dyn FnMut(Part<'a>),
) {
    for requirement in requirements {
        for value in &requirement.node.values {
            f(Part::Expression(value));
        }
    }
}

fn requirement_parts_mut(
    requirements: &mut [Spanned<SpirvRequirement>],
    f: &mut dyn FnMut(PartMut<'_>),
) {
    for requirement in requirements {
        for value in &mut requirement.node.values {
            f(PartMut::Expression(value));
        }
    }
}

fn qualifier_parts<'a>(qualifier: &'a Option<Spanned<TypeQualifier>>, f: &mut dyn FnMut(Part<'a>)) {
    let Some(qualifier) = qualifier else {
        return;
    };
    for single in &qualifier.node.qualifiers {
        match &single.node {
            SingleTypeQualifier::Layout(layout) => {
                for id in &layout.ids {
                    if let Some(value) = &id.node.value {
                        f(Part::Expression(value));
                    }
                }
            }
            SingleTypeQualifier::SpirvStorageClass(class) => {
                requirement_parts(&class.requirements, f);
                f(Part::Expression(&class.class));
            }
            SingleTypeQualifier::SpirvDecorate(decorate) => {
                requirement_parts(&decorate.requirements, f);
                f(Part::Expression(&decorate.decoration));
                for operand in &decorate.operands {
                    f(Part::Expression(operand));
                }
            }
            _ => {}
        }
    }
}

fn qualifier_parts_mut(
    qualifier: &mut Option<Spanned<TypeQualifier>>,
    f: &mut dyn FnMut(PartMut<'_>),
) {
    let Some(qualifier) = qualifier else {
        return;
    };
    for single in &mut qualifier.node.qualifiers {
        match &mut single.node {
            SingleTypeQualifier::Layout(layout) => {
                for id in &mut layout.ids {
                    if let Some(value) = &mut id.node.value {
                        f(PartMut::Expression(value));
                    }
                }
            }
            SingleTypeQualifier::SpirvStorageClass(class) => {
                requirement_parts_mut(&mut class.requirements, f);
                f(PartMut::Expression(&mut class.class));
            }
            SingleTypeQualifier::SpirvDecorate(decorate) => {
                requirement_parts_mut(&mut decorate.requirements, f);
                f(PartMut::Expression(&mut decorate.decoration));
                for operand in &mut decorate.operands {
                    f(PartMut::Expression(operand));
                }
            }
            _ => {}
        }
    }
}

fn array_parts<'a>(array: &'a Option<Spanned<ArraySpecifier>>, f: &mut dyn FnMut(Part<'a>)) {
    let Some(array) = array else {
        return;
    };
    for dimension in &array.node.dimensions {
        if let ArrayDimension::Sized(size) = &dimension.node {
            f(Part::Expression(size));
        }
    }
}

fn array_parts_mut(array: &mut Option<Spanned<ArraySpecifier>>, f: &mut dyn FnMut(PartMut<'_>)) {
    let Some(array) = array else {
        return;
    };
    for dimension in &mut array.node.dimensions {
        if let ArrayDimension::Sized(size) = &mut dimension.node {
            f(PartMut::Expression(size));
        }
    }
}

fn member_parts<'a>(members: &'a [Spanned<StructDeclaration>], f: &mut dyn FnMut(Part<'a>)) {
    for member in members {
        qualifier_parts(&member.node.ty.node.qualifier, f);
        f(Part::Type(&member.node.ty.node.specifier.node));
        for declarator in &member.node.declarators {
            array_parts(&declarator.node.array, f);
        }
    }
}

fn member_parts_mut(members: &mut [Spanned<StructDeclaration>], f: &mut dyn FnMut(PartMut<'_>)) {
    for member in members {
        qualifier_parts_mut(&mut member.node.ty.node.qualifier, f);
        f(PartMut::Type(&mut member.node.ty.node.specifier.node));
        for declarator in &mut member.node.declarators {
            array_parts_mut(&mut declarator.node.array, f);
        }
    }
}

fn requirements_hollow(
    requirements: &[Spanned<SpirvRequirement>],
) -> Vec<Spanned<SpirvRequirement>> {
    requirements
        .iter()
        .map(|requirement| {
            Spanned::new(
                requirement.span,
                SpirvRequirement {
                    name: requirement.node.name.clone(),
                    values: requirement
                        .node
                        .values
                        .iter()
                        .map(|_| placeholder())
                        .collect(),
                },
            )
        })
        .collect()
}

fn qualifier_hollow(qualifier: &Option<Spanned<TypeQualifier>>) -> Option<Spanned<TypeQualifier>> {
    let qualifier = qualifier.as_ref()?;
    let qualifiers = qualifier
        .node
        .qualifiers
        .iter()
        .map(|single| {
            let node = match &single.node {
                SingleTypeQualifier::Layout(layout) => {
                    SingleTypeQualifier::Layout(LayoutQualifier {
                        ids: layout
                            .ids
                            .iter()
                            .map(|id| {
                                Spanned::new(
                                    id.span,
                                    LayoutQualifierId {
                                        name: id.node.name.clone(),
                                        value: id.node.value.as_ref().map(|_| placeholder()),
                                    },
                                )
                            })
                            .collect(),
                    })
                }
                SingleTypeQualifier::SpirvStorageClass(class) => {
                    SingleTypeQualifier::SpirvStorageClass(SpirvStorageClass {
                        requirements: requirements_hollow(&class.requirements),
                        class: placeholder(),
                    })
                }
                SingleTypeQualifier::SpirvDecorate(decorate) => {
                    SingleTypeQualifier::SpirvDecorate(SpirvDecorate {
                        kind: decorate.kind,
                        requirements: requirements_hollow(&decorate.requirements),
                        decoration: placeholder(),
                        operands: decorate.operands.iter().map(|_| placeholder()).collect(),
                    })
                }
                other => other.clone(),
            };
            Spanned::new(single.span, node)
        })
        .collect();
    Some(Spanned::new(qualifier.span, TypeQualifier { qualifiers }))
}

fn array_hollow(array: &Option<Spanned<ArraySpecifier>>) -> Option<Spanned<ArraySpecifier>> {
    let array = array.as_ref()?;
    Some(Spanned::new(
        array.span,
        ArraySpecifier {
            dimensions: array
                .node
                .dimensions
                .iter()
                .map(|dimension| {
                    Spanned::new(
                        dimension.span,
                        match dimension.node {
                            ArrayDimension::Unsized => ArrayDimension::Unsized,
                            ArrayDimension::Sized(_) => ArrayDimension::Sized(placeholder()),
                        },
                    )
                })
                .collect(),
        },
    ))
}

fn member_hollow(member: &Spanned<StructDeclaration>) -> Spanned<StructDeclaration> {
    Spanned::new(
        member.span,
        StructDeclaration {
            ty: Spanned::new(
                member.node.ty.span,
                FullySpecifiedType {
                    qualifier: qualifier_hollow(&member.node.ty.node.qualifier),
                    specifier: Spanned::new(member.node.ty.node.specifier.span, empty_type()),
                },
            ),
            declarators: member
                .node
                .declarators
                .iter()
                .map(|declarator| {
                    Spanned::new(
                        declarator.span,
                        StructDeclarator {
                            name: declarator.node.name.clone(),
                            array: array_hollow(&declarator.node.array),
                        },
                    )
                })
                .collect(),
        },
    )
}

impl Composite for TypeSpecifier {
    fn parts<'a>(&'a self, f: &mut dyn FnMut(Part<'a>)) {
        match &self.non_array {
            TypeSpecifierNonArray::Struct(structure) => member_parts(&structure.declarations, f),
            TypeSpecifierNonArray::InlineBlock(members) => member_parts(members, f),
            TypeSpecifierNonArray::Spirv(spirv) => {
                requirement_parts(&spirv.requirements, f);
                for qualifier in &spirv.instruction {
                    f(Part::Expression(&qualifier.node.value));
                }
                for parameter in &spirv.parameters {
                    match parameter {
                        SpirvTypeParameter::Constant(value) => f(Part::Expression(value)),
                        SpirvTypeParameter::Type(ty) => f(Part::Type(&ty.node)),
                    }
                }
            }
            TypeSpecifierNonArray::Void
            | TypeSpecifierNonArray::Basic(_)
            | TypeSpecifierNonArray::Opaque(_)
            | TypeSpecifierNonArray::Parameterized(_)
            | TypeSpecifierNonArray::TypeName(_) => {}
        }
        if let Some(parameters) = &self.parameters {
            if let Some(element) = &parameters.node.element {
                f(Part::Type(&element.node));
            }
            for value in &parameters.node.values {
                f(Part::Expression(value));
            }
        }
        array_parts(&self.array, f);
    }

    fn parts_mut(&mut self, f: &mut dyn FnMut(PartMut<'_>)) {
        match &mut self.non_array {
            TypeSpecifierNonArray::Struct(structure) => {
                member_parts_mut(&mut structure.declarations, f);
            }
            TypeSpecifierNonArray::InlineBlock(members) => member_parts_mut(members, f),
            TypeSpecifierNonArray::Spirv(spirv) => {
                requirement_parts_mut(&mut spirv.requirements, f);
                for qualifier in &mut spirv.instruction {
                    f(PartMut::Expression(&mut qualifier.node.value));
                }
                for parameter in &mut spirv.parameters {
                    match parameter {
                        SpirvTypeParameter::Constant(value) => f(PartMut::Expression(value)),
                        SpirvTypeParameter::Type(ty) => f(PartMut::Type(&mut ty.node)),
                    }
                }
            }
            TypeSpecifierNonArray::Void
            | TypeSpecifierNonArray::Basic(_)
            | TypeSpecifierNonArray::Opaque(_)
            | TypeSpecifierNonArray::Parameterized(_)
            | TypeSpecifierNonArray::TypeName(_) => {}
        }
        if let Some(parameters) = &mut self.parameters {
            if let Some(element) = &mut parameters.node.element {
                f(PartMut::Type(&mut element.node));
            }
            for value in &mut parameters.node.values {
                f(PartMut::Expression(value));
            }
        }
        array_parts_mut(&mut self.array, f);
    }

    fn hollow(&self) -> Self {
        let non_array = match &self.non_array {
            TypeSpecifierNonArray::Struct(structure) => {
                TypeSpecifierNonArray::Struct(StructSpecifier {
                    name: structure.name.clone(),
                    declarations: structure.declarations.iter().map(member_hollow).collect(),
                })
            }
            TypeSpecifierNonArray::InlineBlock(members) => {
                TypeSpecifierNonArray::InlineBlock(members.iter().map(member_hollow).collect())
            }
            TypeSpecifierNonArray::Spirv(spirv) => {
                TypeSpecifierNonArray::Spirv(Box::new(SpirvTypeSpecifier {
                    requirements: requirements_hollow(&spirv.requirements),
                    instruction: spirv
                        .instruction
                        .iter()
                        .map(|qualifier| {
                            Spanned::new(
                                qualifier.span,
                                SpirvInstructionQualifier {
                                    name: qualifier.node.name.clone(),
                                    value: placeholder(),
                                },
                            )
                        })
                        .collect(),
                    parameters: spirv
                        .parameters
                        .iter()
                        .map(|parameter| match parameter {
                            SpirvTypeParameter::Constant(_) => {
                                SpirvTypeParameter::Constant(placeholder())
                            }
                            SpirvTypeParameter::Type(ty) => SpirvTypeParameter::Type(Box::new(
                                Spanned::new(ty.span, empty_type()),
                            )),
                        })
                        .collect(),
                }))
            }
            TypeSpecifierNonArray::Void => TypeSpecifierNonArray::Void,
            TypeSpecifierNonArray::Basic(basic) => TypeSpecifierNonArray::Basic(*basic),
            TypeSpecifierNonArray::Opaque(keyword) => TypeSpecifierNonArray::Opaque(*keyword),
            TypeSpecifierNonArray::Parameterized(kind) => {
                TypeSpecifierNonArray::Parameterized(*kind)
            }
            TypeSpecifierNonArray::TypeName(name) => TypeSpecifierNonArray::TypeName(name.clone()),
        };
        let parameters = self.parameters.as_ref().map(|parameters| {
            Spanned::new(
                parameters.span,
                TypeParameters {
                    element: parameters
                        .node
                        .element
                        .as_ref()
                        .map(|element| Box::new(Spanned::new(element.span, empty_type()))),
                    values: parameters
                        .node
                        .values
                        .iter()
                        .map(|_| placeholder())
                        .collect(),
                },
            )
        });
        Self {
            non_array,
            parameters,
            array: array_hollow(&self.array),
        }
    }

    fn same_hollow(&self, other: &Self) -> bool {
        if self.is_leaf_type() && other.is_leaf_type() {
            return self.non_array == other.non_array;
        }
        let (left, right) = (self.hollow(), other.hollow());
        left.non_array == right.non_array
            && left.parameters == right.parameters
            && left.array == right.array
    }
}

impl Clone for TypeSpecifier {
    fn clone(&self) -> Self {
        clone_composite(self)
    }
}

impl PartialEq for TypeSpecifier {
    fn eq(&self, other: &Self) -> bool {
        eq_composite(self, other)
    }
}

impl Eq for TypeSpecifier {}

enum Printed<T> {
    Item(T),
    Close,
}

fn print_tree<T: Copy>(
    formatter: &mut fmt::Formatter<'_>,
    roots: Vec<T>,
    children: impl Fn(T, &mut Vec<T>),
    head: impl Fn(T, &mut fmt::Formatter<'_>) -> fmt::Result,
) -> fmt::Result {
    if roots.is_empty() {
        return Ok(());
    }
    formatter.write_str(" [")?;
    let mut steps = Vec::from([Printed::Close]);
    steps.extend(roots.into_iter().rev().map(Printed::Item));
    let mut nested = Vec::new();
    while let Some(step) = steps.pop() {
        match step {
            Printed::Close => formatter.write_str("]; ")?,
            Printed::Item(item) => {
                head(item, formatter)?;
                nested.clear();
                children(item, &mut nested);
                if nested.is_empty() {
                    formatter.write_str("; ")?;
                } else {
                    formatter.write_str(" [")?;
                    steps.push(Printed::Close);
                    steps.extend(nested.drain(..).rev().map(Printed::Item));
                }
            }
        }
    }
    Ok(())
}

fn print_parts(formatter: &mut fmt::Formatter<'_>, roots: Vec<Part<'_>>) -> fmt::Result {
    print_tree(
        formatter,
        roots,
        |part, into| part.parts(&mut |child| into.push(child)),
        |part, formatter| match part {
            Part::Expression(expression) => {
                write!(formatter, "{:?} {:?} ", expression.id, expression.span)?;
                shallow_expression(&expression.kind, formatter)
            }
            Part::Type(specifier) => shallow_type(specifier, formatter),
        },
    )
}

fn shallow_expression(kind: &ExpressionKind, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
    match kind {
        ExpressionKind::Variable(name) => formatter.debug_tuple("Variable").field(name).finish(),
        ExpressionKind::Number(number) => formatter.debug_tuple("Number").field(number).finish(),
        ExpressionKind::Bool(value) => formatter.debug_tuple("Bool").field(value).finish(),
        ExpressionKind::String(text) => formatter.debug_tuple("String").field(text).finish(),
        ExpressionKind::Parenthesized(_) => formatter.write_str("Parenthesized"),
        ExpressionKind::Subscript { .. } => formatter.write_str("Subscript"),
        ExpressionKind::FunctionCall(call) => match &call.function.node {
            FunctionIdentifier::Constructor(_) => formatter.write_str("Constructor"),
            FunctionIdentifier::Cast(_) => formatter.write_str("Cast"),
            FunctionIdentifier::Function(name) => {
                formatter.debug_tuple("Function").field(name).finish()
            }
            FunctionIdentifier::Expression(_) => formatter.write_str("Call"),
            FunctionIdentifier::Method { name, .. } => {
                formatter.debug_tuple("Method").field(name).finish()
            }
        },
        ExpressionKind::FieldSelection { field, .. } => formatter
            .debug_tuple("FieldSelection")
            .field(field)
            .finish(),
        ExpressionKind::Postfix { operator, .. } => {
            formatter.debug_tuple("Postfix").field(operator).finish()
        }
        ExpressionKind::Unary { operator, .. } => {
            formatter.debug_tuple("Unary").field(operator).finish()
        }
        ExpressionKind::Binary { operator, .. } => {
            formatter.debug_tuple("Binary").field(operator).finish()
        }
        ExpressionKind::Conditional { .. } => formatter.write_str("Conditional"),
        ExpressionKind::Assignment { operator, .. } => {
            formatter.debug_tuple("Assignment").field(operator).finish()
        }
        ExpressionKind::Sequence(_) => formatter.write_str("Sequence"),
    }
}

fn member_names(members: &[Spanned<StructDeclaration>]) -> Vec<&str> {
    members
        .iter()
        .flat_map(|member| &member.node.declarators)
        .map(|declarator| declarator.node.name.node.as_str())
        .collect()
}

fn shallow_type(specifier: &TypeSpecifier, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
    let mut debug = formatter.debug_struct("TypeSpecifier");
    match &specifier.non_array {
        TypeSpecifierNonArray::Struct(structure) => debug
            .field(
                "struct",
                &structure.name.as_ref().map(|name| name.node.as_str()),
            )
            .field("members", &member_names(&structure.declarations)),
        TypeSpecifierNonArray::InlineBlock(members) => debug.field("block", &member_names(members)),
        TypeSpecifierNonArray::Spirv(spirv) => {
            debug.field("spirv_parameters", &spirv.parameters.len())
        }
        leaf => debug.field("non_array", leaf),
    };
    if let Some(parameters) = &specifier.parameters {
        debug
            .field("element", &parameters.node.element.is_some())
            .field("values", &parameters.node.values.len());
    }
    if let Some(array) = &specifier.array {
        debug.field("dimensions", &array.node.dimensions.len());
    }
    debug.finish()
}

fn shallow_statement(kind: &StatementKind, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
    match kind {
        StatementKind::Compound(_) => formatter.write_str("Compound"),
        StatementKind::Declaration(declaration) => formatter
            .debug_tuple("Declaration")
            .field(declaration)
            .finish(),
        StatementKind::Expression(expression) => formatter
            .debug_tuple("Expression")
            .field(expression)
            .finish(),
        StatementKind::Selection { condition, .. } => formatter
            .debug_struct("Selection")
            .field("condition", condition)
            .finish_non_exhaustive(),
        StatementKind::Switch { selector, .. } => formatter
            .debug_struct("Switch")
            .field("selector", selector)
            .finish_non_exhaustive(),
        StatementKind::CaseLabel(label) => formatter.debug_tuple("CaseLabel").field(label).finish(),
        StatementKind::While { condition, .. } => formatter
            .debug_struct("While")
            .field("condition", condition)
            .finish_non_exhaustive(),
        StatementKind::DoWhile { condition, .. } => formatter
            .debug_struct("DoWhile")
            .field("condition", condition)
            .finish_non_exhaustive(),
        StatementKind::For(statement) => formatter
            .debug_struct("For")
            .field("condition", &statement.condition)
            .field("increment", &statement.increment)
            .finish_non_exhaustive(),
        StatementKind::Jump(jump) => formatter.debug_tuple("Jump").field(jump).finish(),
        StatementKind::Attributed { attributes, .. } => formatter
            .debug_struct("Attributed")
            .field("attributes", attributes)
            .finish_non_exhaustive(),
    }
}

impl fmt::Debug for ExpressionKind {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        shallow_expression(self, formatter)?;
        let mut parts = Vec::new();
        self.parts(&mut |part| parts.push(part));
        print_parts(formatter, parts)
    }
}

impl fmt::Debug for TypeSpecifier {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        shallow_type(self, formatter)?;
        let mut parts = Vec::new();
        self.parts(&mut |part| parts.push(part));
        print_parts(formatter, parts)
    }
}

impl fmt::Debug for StatementKind {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        shallow_statement(self, formatter)?;
        let mut roots = Vec::new();
        Nested::for_each_child(self, |child| roots.push(child));
        print_tree(
            formatter,
            roots,
            |statement: &Statement, into| {
                Nested::for_each_child(&statement.kind, |child| into.push(child));
            },
            |statement, formatter| {
                write!(formatter, "{:?} {:?} ", statement.id, statement.span)?;
                shallow_statement(&statement.kind, formatter)
            },
        )
    }
}

impl fmt::Debug for Initializer {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let shallow = |initializer: &Self, formatter: &mut fmt::Formatter<'_>| match initializer {
            Self::Expression(expression) => formatter
                .debug_tuple("Expression")
                .field(expression)
                .finish(),
            Self::List(_) => formatter.write_str("List"),
        };
        shallow(self, formatter)?;
        let mut roots = Vec::new();
        Nested::for_each_child(self, |child| roots.push(child));
        print_tree(
            formatter,
            roots,
            |item: &Spanned<Self>, into| {
                Nested::for_each_child(&item.node, |child| into.push(child));
            },
            |item, formatter| shallow(&item.node, formatter),
        )
    }
}
