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
    fn children(&self) -> Vec<&Self::Node>;
    fn children_mut(&mut self) -> Vec<&mut Self::Node>;
    fn shell(&self) -> Self;
    fn same_shell(&self, other: &Self) -> bool;
}

enum CloneTask<'a, K: Nested> {
    Visit(&'a K::Node),
    Build(&'a K::Node),
}

fn fill<K: Nested>(kind: &mut K, built: &mut Vec<K::Node>) {
    let mut slots = kind.children_mut();
    let start = built.len().saturating_sub(slots.len());
    for (slot, child) in slots.iter_mut().zip(built.drain(start..)) {
        **slot = child;
    }
}

pub(crate) fn deep_clone<K: Nested>(root: &K) -> K {
    let mut shell = root.shell();
    let mut built: Vec<K::Node> = Vec::new();
    let mut tasks: Vec<CloneTask<'_, K>> = root
        .children()
        .into_iter()
        .rev()
        .map(CloneTask::Visit)
        .collect();
    while let Some(task) = tasks.pop() {
        match task {
            CloneTask::Visit(node) => {
                let children = K::kind(node).children();
                if children.is_empty() {
                    built.push(K::rebuild(node, K::kind(node).shell()));
                } else {
                    tasks.push(CloneTask::Build(node));
                    tasks.extend(children.into_iter().rev().map(CloneTask::Visit));
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
    let mut pairs = Vec::from([(left, right)]);
    while let Some((left, right)) = pairs.pop() {
        if !left.same_shell(right) {
            return false;
        }
        let left_children = left.children();
        let right_children = right.children();
        if left_children.len() != right_children.len() {
            return false;
        }
        pairs.extend(
            left_children
                .into_iter()
                .zip(right_children)
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
        NodeId::new(0),
        Span::default(),
        StatementKind::Expression(None),
    )
}

fn take_expression(expression: &mut Expression, into: &mut Vec<Owned>) {
    if !expression.kind.is_leaf() {
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
    for single in &mut qualifier.qualifiers {
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
    for dimension in &mut array.dimensions {
        if let ArrayDimension::Sized(size) = &mut dimension.node {
            take_expression(size, into);
        }
    }
}

fn take_members(members: &mut [Spanned<StructDeclaration>], into: &mut Vec<Owned>) {
    for member in members {
        take_qualifier(&mut member.ty.qualifier, into);
        take_type(&mut member.ty.specifier.node, into);
        for declarator in &mut member.declarators {
            take_array(&mut declarator.array, into);
        }
    }
}

impl TypeSpecifier {
    const fn is_leaf_type(&self) -> bool {
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
            if let Some(element) = &mut parameters.element {
                take_type(&mut element.node, into);
            }
            for value in &mut parameters.values {
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
        if let Self::FunctionCall(call) = self {
            if let FunctionIdentifier::Constructor(ty) | FunctionIdentifier::Cast(ty) =
                &mut call.function.node
            {
                take_type(ty, into);
            }
        }
        for child in self.children_mut() {
            take_expression(child, into);
        }
    }
}

impl StatementKind {
    pub(crate) fn take_owned(&mut self, into: &mut Vec<Owned>) {
        for child in self.children_mut() {
            if !child.kind.children().is_empty() {
                into.push(Owned::Statement(mem::replace(child, empty_statement())));
            }
        }
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

    fn children(&self) -> Vec<&Statement> {
        match self {
            Self::Compound(compound) => compound.statements.iter().collect(),
            Self::Switch { statements, .. } => statements.iter().collect(),
            Self::Selection {
                then_branch,
                else_branch,
                ..
            } => {
                let mut children = Vec::from([&**then_branch]);
                children.extend(else_branch.as_deref());
                children
            }
            Self::While { body, .. } | Self::DoWhile { body, .. } => Vec::from([&**body]),
            Self::For(statement) => Vec::from([&statement.init, &statement.body]),
            Self::Attributed { statement, .. } => Vec::from([&**statement]),
            Self::Declaration(_) | Self::Expression(_) | Self::CaseLabel(_) | Self::Jump(_) => {
                Vec::new()
            }
        }
    }

    fn children_mut(&mut self) -> Vec<&mut Statement> {
        match self {
            Self::Compound(compound) => compound.statements.iter_mut().collect(),
            Self::Switch { statements, .. } => statements.iter_mut().collect(),
            Self::Selection {
                then_branch,
                else_branch,
                ..
            } => {
                let mut children = Vec::from([&mut **then_branch]);
                children.extend(else_branch.as_deref_mut());
                children
            }
            Self::While { body, .. } | Self::DoWhile { body, .. } => Vec::from([&mut **body]),
            Self::For(statement) => {
                let ForStatement { init, body, .. } = &mut **statement;
                Vec::from([init, body])
            }
            Self::Attributed { statement, .. } => Vec::from([&mut **statement]),
            Self::Declaration(_) | Self::Expression(_) | Self::CaseLabel(_) | Self::Jump(_) => {
                Vec::new()
            }
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

    fn children(&self) -> Vec<&Spanned<Self>> {
        match self {
            Self::Expression(_) => Vec::new(),
            Self::List(items) => items.iter().collect(),
        }
    }

    fn children_mut(&mut self) -> Vec<&mut Spanned<Self>> {
        match self {
            Self::Expression(_) => Vec::new(),
            Self::List(items) => items.iter_mut().collect(),
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
                member.ty.span,
                FullySpecifiedType {
                    qualifier: member.ty.qualifier.clone(),
                    specifier: Spanned::new(member.ty.specifier.span, empty_type()),
                },
            ),
            declarators: member.declarators.clone(),
        },
    )
}

fn same_members(left: &[Spanned<StructDeclaration>], right: &[Spanned<StructDeclaration>]) -> bool {
    left.len() == right.len()
        && left.iter().zip(right).all(|(left, right)| {
            left.ty.qualifier == right.ty.qualifier && left.declarators == right.declarators
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

    fn children(&self) -> Vec<&Spanned<Self>> {
        let mut children = Vec::new();
        match &self.non_array {
            TypeSpecifierNonArray::Struct(StructSpecifier { declarations, .. })
            | TypeSpecifierNonArray::InlineBlock(declarations) => {
                children.extend(declarations.iter().map(|member| &member.ty.specifier));
            }
            TypeSpecifierNonArray::Spirv(spirv) => {
                for parameter in &spirv.parameters {
                    if let SpirvTypeParameter::Type(ty) = parameter {
                        children.push(&**ty);
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
            .and_then(|parameters| parameters.element.as_deref())
        {
            children.push(element);
        }
        children
    }

    fn children_mut(&mut self) -> Vec<&mut Spanned<Self>> {
        let mut children = Vec::new();
        match &mut self.non_array {
            TypeSpecifierNonArray::Struct(StructSpecifier { declarations, .. })
            | TypeSpecifierNonArray::InlineBlock(declarations) => {
                children.extend(
                    declarations
                        .iter_mut()
                        .map(|member| &mut member.ty.specifier),
                );
            }
            TypeSpecifierNonArray::Spirv(spirv) => {
                for parameter in &mut spirv.parameters {
                    if let SpirvTypeParameter::Type(ty) = parameter {
                        children.push(&mut **ty);
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
            .and_then(|parameters| parameters.element.as_deref_mut())
        {
            children.push(element);
        }
        children
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
            TypeSpecifierNonArray::Opaque(name) => TypeSpecifierNonArray::Opaque(name.clone()),
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
                        .element
                        .as_ref()
                        .map(|element| Box::new(Spanned::new(element.span, empty_type()))),
                    values: parameters.values.clone(),
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
        let same_non_array = match (&self.non_array, &other.non_array) {
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
                    && left
                        .parameters
                        .iter()
                        .zip(&right.parameters)
                        .all(|(left, right)| match (left, right) {
                            (
                                SpirvTypeParameter::Constant(left),
                                SpirvTypeParameter::Constant(right),
                            ) => left == right,
                            (SpirvTypeParameter::Type(_), SpirvTypeParameter::Type(_)) => true,
                            _ => false,
                        })
            }
            (TypeSpecifierNonArray::Void, TypeSpecifierNonArray::Void) => true,
            (TypeSpecifierNonArray::Basic(left), TypeSpecifierNonArray::Basic(right)) => {
                left == right
            }
            (TypeSpecifierNonArray::Opaque(left), TypeSpecifierNonArray::Opaque(right))
            | (TypeSpecifierNonArray::TypeName(left), TypeSpecifierNonArray::TypeName(right)) => {
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
                left.element.is_some() == right.element.is_some() && left.values == right.values
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
