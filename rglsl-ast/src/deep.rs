use alloc::boxed::Box;
use alloc::vec::Vec;
use core::mem;

use crate::ast::{
    ArrayDimension, CompoundStatement, Expression, ExpressionKind, ForStatement,
    FullySpecifiedType, FunctionIdentifier, Initializer, LayoutQualifierId, NodeId,
    SingleTypeQualifier, Spanned, SpirvTypeParameter, SpirvTypeSpecifier, Statement, StatementKind,
    StructDeclaration, StructSpecifier, TypeParameters, TypeQualifier, TypeSpecifier,
    TypeSpecifierNonArray,
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
    Expression(Expression),
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

fn take_expression(expression: &mut Expression, into: &mut Vec<Owned>) {
    if expression.kind.exceeds_inline_depth() {
        into.push(Owned::Expression(mem::replace(expression, placeholder())));
    }
}

fn take_type(specifier: &mut TypeSpecifier, into: &mut Vec<Owned>) {
    if !specifier.is_leaf_type() {
        into.push(Owned::Type(mem::replace(specifier, empty_type())));
    }
}

fn take_qualifier(qualifier: &mut Option<Spanned<TypeQualifier>>, into: &mut Vec<Owned>) {
    let Some(qualifier) = qualifier else {
        return;
    };
    for single in &mut qualifier.node.qualifiers {
        match &mut single.node {
            SingleTypeQualifier::Layout(layout) => {
                for LayoutQualifierId { value, .. } in layout.ids.iter_mut().map(|id| &mut id.node)
                {
                    if let Some(value) = value {
                        take_expression(value, into);
                    }
                }
            }
            SingleTypeQualifier::SpirvDecorate(decorate) => {
                for operand in &mut decorate.operands {
                    take_expression(operand, into);
                }
            }
            _ => {}
        }
    }
}

fn take_array(array: &mut Option<Spanned<crate::ast::ArraySpecifier>>, into: &mut Vec<Owned>) {
    let Some(array) = array else {
        return;
    };
    for dimension in &mut array.node.dimensions {
        if let ArrayDimension::Sized(size) = &mut dimension.node {
            take_expression(size, into);
        }
    }
}

fn take_members(members: &mut [Spanned<StructDeclaration>], into: &mut Vec<Owned>) {
    for member in members {
        take_qualifier(&mut member.node.ty.node.qualifier, into);
        take_type(&mut member.node.ty.node.specifier.node, into);
        for declarator in &mut member.node.declarators {
            take_array(&mut declarator.node.array, into);
        }
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
        match &mut self.non_array {
            TypeSpecifierNonArray::Struct(structure) => {
                take_members(&mut structure.declarations, into);
            }
            TypeSpecifierNonArray::InlineBlock(members) => take_members(members, into),
            TypeSpecifierNonArray::Spirv(spirv) => {
                for parameter in &mut spirv.parameters {
                    match parameter {
                        SpirvTypeParameter::Constant(value) => take_expression(value, into),
                        SpirvTypeParameter::Type(ty) => take_type(&mut ty.node, into),
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
                take_type(&mut element.node, into);
            }
            for value in &mut parameters.node.values {
                take_expression(value, into);
            }
        }
        take_array(&mut self.array, into);
    }
}

impl Initializer {
    pub(crate) fn take_owned(&mut self, into: &mut Vec<Owned>) {
        match self {
            Self::Expression(expression) => take_expression(expression, into),
            Self::List(items) => {
                for item in items {
                    let leaf = match &item.node {
                        Self::Expression(expression) => expression.kind.is_leaf(),
                        Self::List(items) => items.is_empty(),
                    };
                    if !leaf {
                        into.push(Owned::Initializer(mem::replace(
                            &mut item.node,
                            Self::List(Vec::new()),
                        )));
                    }
                }
            }
        }
    }
}

impl ExpressionKind {
    pub(crate) fn take_owned(&mut self, into: &mut Vec<Owned>) {
        if let Self::FunctionCall(call) = self
            && let FunctionIdentifier::Constructor(ty) | FunctionIdentifier::Cast(ty) =
                &mut call.function.node
        {
            take_type(ty, into);
        }
        self.for_each_child_mut(|child| take_expression(child, into));
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
            Self::Expression(expression) => expression.kind.take_owned(into),
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
        let leaf = match self {
            Self::Expression(expression) => expression.kind.is_leaf(),
            Self::List(items) => items.is_empty(),
        };
        if leaf {
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

fn member_shell(member: &Spanned<StructDeclaration>) -> Spanned<StructDeclaration> {
    Spanned::new(
        member.span,
        StructDeclaration {
            ty: Spanned::new(
                member.node.ty.span,
                FullySpecifiedType {
                    qualifier: member.node.ty.node.qualifier.clone(),
                    specifier: Spanned::new(member.node.ty.node.specifier.span, empty_type()),
                },
            ),
            declarators: member.node.declarators.clone(),
        },
    )
}

fn same_members(left: &[Spanned<StructDeclaration>], right: &[Spanned<StructDeclaration>]) -> bool {
    left.len() == right.len()
        && left.iter().zip(right).all(|(left, right)| {
            left.node.ty.node.qualifier == right.node.ty.node.qualifier
                && left.node.declarators == right.node.declarators
        })
}

impl Nested for TypeSpecifier {
    type Node = Spanned<Self>;

    fn kind(node: &Spanned<Self>) -> &Self {
        &node.node
    }

    fn rebuild(node: &Spanned<Self>, kind: Self) -> Spanned<Self> {
        Spanned::new(node.span, kind)
    }

    fn has_children(&self) -> bool {
        self.child_count() != 0
    }

    fn child_count(&self) -> usize {
        let non_array = match &self.non_array {
            TypeSpecifierNonArray::Struct(StructSpecifier { declarations, .. })
            | TypeSpecifierNonArray::InlineBlock(declarations) => declarations.len(),
            TypeSpecifierNonArray::Spirv(spirv) => spirv
                .parameters
                .iter()
                .filter(|parameter| matches!(parameter, SpirvTypeParameter::Type(_)))
                .count(),
            TypeSpecifierNonArray::Void
            | TypeSpecifierNonArray::Basic(_)
            | TypeSpecifierNonArray::Opaque(_)
            | TypeSpecifierNonArray::Parameterized(_)
            | TypeSpecifierNonArray::TypeName(_) => 0,
        };
        let element = usize::from(
            self.parameters
                .as_ref()
                .is_some_and(|parameters| parameters.node.element.is_some()),
        );
        non_array + element
    }

    fn for_each_child<'a>(&'a self, mut f: impl FnMut(&'a Spanned<Self>)) {
        match &self.non_array {
            TypeSpecifierNonArray::Struct(StructSpecifier { declarations, .. })
            | TypeSpecifierNonArray::InlineBlock(declarations) => {
                for member in declarations {
                    f(&member.node.ty.node.specifier);
                }
            }
            TypeSpecifierNonArray::Spirv(spirv) => {
                for parameter in &spirv.parameters {
                    if let SpirvTypeParameter::Type(ty) = parameter {
                        f(ty);
                    }
                }
            }
            TypeSpecifierNonArray::Void
            | TypeSpecifierNonArray::Basic(_)
            | TypeSpecifierNonArray::Opaque(_)
            | TypeSpecifierNonArray::Parameterized(_)
            | TypeSpecifierNonArray::TypeName(_) => {}
        }
        if let Some(element) = self
            .parameters
            .as_ref()
            .and_then(|parameters| parameters.node.element.as_deref())
        {
            f(element);
        }
    }

    fn for_each_child_mut<'a>(&'a mut self, mut f: impl FnMut(&'a mut Spanned<Self>)) {
        match &mut self.non_array {
            TypeSpecifierNonArray::Struct(StructSpecifier { declarations, .. })
            | TypeSpecifierNonArray::InlineBlock(declarations) => {
                for member in declarations {
                    f(&mut member.node.ty.node.specifier);
                }
            }
            TypeSpecifierNonArray::Spirv(spirv) => {
                for parameter in &mut spirv.parameters {
                    if let SpirvTypeParameter::Type(ty) = parameter {
                        f(ty);
                    }
                }
            }
            TypeSpecifierNonArray::Void
            | TypeSpecifierNonArray::Basic(_)
            | TypeSpecifierNonArray::Opaque(_)
            | TypeSpecifierNonArray::Parameterized(_)
            | TypeSpecifierNonArray::TypeName(_) => {}
        }
        if let Some(element) = self
            .parameters
            .as_mut()
            .and_then(|parameters| parameters.node.element.as_deref_mut())
        {
            f(element);
        }
    }

    fn shell(&self) -> Self {
        let non_array = match &self.non_array {
            TypeSpecifierNonArray::Struct(structure) => {
                TypeSpecifierNonArray::Struct(StructSpecifier {
                    name: structure.name.clone(),
                    declarations: structure.declarations.iter().map(member_shell).collect(),
                })
            }
            TypeSpecifierNonArray::InlineBlock(members) => {
                TypeSpecifierNonArray::InlineBlock(members.iter().map(member_shell).collect())
            }
            TypeSpecifierNonArray::Spirv(spirv) => {
                TypeSpecifierNonArray::Spirv(Box::new(SpirvTypeSpecifier {
                    requirements: spirv.requirements.clone(),
                    instruction: spirv.instruction.clone(),
                    parameters: spirv
                        .parameters
                        .iter()
                        .map(|parameter| match parameter {
                            SpirvTypeParameter::Constant(value) => {
                                SpirvTypeParameter::Constant(value.clone())
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
                    values: parameters.node.values.clone(),
                },
            )
        });
        Self {
            non_array,
            parameters,
            array: self.array.clone(),
        }
    }

    fn same_shell(&self, other: &Self) -> bool {
        let same_non_array =
            match (&self.non_array, &other.non_array) {
                (TypeSpecifierNonArray::Struct(left), TypeSpecifierNonArray::Struct(right)) => {
                    left.name == right.name && same_members(&left.declarations, &right.declarations)
                }
                (
                    TypeSpecifierNonArray::InlineBlock(left),
                    TypeSpecifierNonArray::InlineBlock(right),
                ) => same_members(left, right),
                (TypeSpecifierNonArray::Spirv(left), TypeSpecifierNonArray::Spirv(right)) => {
                    left.requirements == right.requirements
                        && left.instruction == right.instruction
                        && left.parameters.len() == right.parameters.len()
                        && left.parameters.iter().zip(&right.parameters).all(
                            |(left, right)| match (left, right) {
                                (
                                    SpirvTypeParameter::Constant(left),
                                    SpirvTypeParameter::Constant(right),
                                ) => left == right,
                                (SpirvTypeParameter::Type(_), SpirvTypeParameter::Type(_)) => true,
                                _ => false,
                            },
                        )
                }
                (TypeSpecifierNonArray::Void, TypeSpecifierNonArray::Void) => true,
                (TypeSpecifierNonArray::Basic(left), TypeSpecifierNonArray::Basic(right)) => {
                    left == right
                }
                (TypeSpecifierNonArray::Opaque(left), TypeSpecifierNonArray::Opaque(right)) => {
                    left == right
                }
                (TypeSpecifierNonArray::TypeName(left), TypeSpecifierNonArray::TypeName(right)) => {
                    left == right
                }
                (
                    TypeSpecifierNonArray::Parameterized(left),
                    TypeSpecifierNonArray::Parameterized(right),
                ) => left == right,
                _ => false,
            };
        let same_parameters = match (&self.parameters, &other.parameters) {
            (None, None) => true,
            (Some(left), Some(right)) => {
                left.node.element.is_some() == right.node.element.is_some()
                    && left.node.values == right.node.values
            }
            _ => false,
        };
        same_non_array && same_parameters && self.array == other.array
    }
}

impl Clone for TypeSpecifier {
    fn clone(&self) -> Self {
        deep_clone(self)
    }
}

impl PartialEq for TypeSpecifier {
    fn eq(&self, other: &Self) -> bool {
        deep_eq(self, other)
    }
}

impl Eq for TypeSpecifier {}
