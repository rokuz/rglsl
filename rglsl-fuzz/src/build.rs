use rglsl_ast::ast::{
    ArrayDimension, ArraySpecifier, AssignmentOperator, BasicType, BinaryOperator, CaseLabel,
    CompoundStatement, Condition, Declaration, DeclarationKind, Expression, ExpressionKind,
    ForStatement, FullySpecifiedType, FunctionCall, FunctionIdentifier, Identifier, InitDeclarator,
    InitDeclaratorList, Initializer, JumpStatement, Node, NodeId, NumericKind, NumericLiteral,
    PostfixOperator, Spanned, Statement, StatementKind, TypeSpecifier, TypeSpecifierNonArray,
    UnaryOperator,
};
use rglsl_ast::Span;

use crate::basic;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Builder {
    next_id: u32,
}

impl Builder {
    pub const fn new(first: NodeId) -> Self {
        Self {
            next_id: first.index(),
        }
    }

    pub const fn next_id(&self) -> NodeId {
        NodeId::new(self.next_id)
    }

    pub const fn id(&mut self) -> NodeId {
        let id = NodeId::new(self.next_id);
        self.next_id = self.next_id.saturating_add(1);
        id
    }

    pub const fn reserve(&mut self, count: u32) -> Self {
        let reserved = *self;
        self.next_id = self.next_id.saturating_add(count);
        reserved
    }

    pub const fn node(&mut self, kind: ExpressionKind) -> Expression {
        Node::new(self.id(), Span::new(0, 0), kind)
    }

    pub fn variable(&mut self, name: &str) -> Expression {
        self.node(ExpressionKind::Variable(name.to_owned()))
    }

    pub fn boolean(&mut self, value: bool) -> Expression {
        self.node(ExpressionKind::Bool(value))
    }

    pub fn literal(&mut self, kind: NumericKind, text: String) -> Expression {
        self.node(ExpressionKind::Number(NumericLiteral { kind, text }))
    }

    pub fn int(&mut self, value: i64) -> Expression {
        let literal = self.literal(NumericKind::Int, value.unsigned_abs().to_string());
        if value < 0 {
            self.unary(UnaryOperator::Minus, literal)
        } else {
            literal
        }
    }

    pub fn uint(&mut self, value: u64) -> Expression {
        self.literal(NumericKind::Uint, format!("{value}u"))
    }

    pub fn float(&mut self, text: &str) -> Expression {
        match text.strip_prefix('-') {
            Some(magnitude) => {
                let literal = self.literal(NumericKind::Float, magnitude.to_owned());
                self.unary(UnaryOperator::Minus, literal)
            }
            None => self.literal(NumericKind::Float, text.to_owned()),
        }
    }

    pub fn paren(&mut self, inner: Expression) -> Expression {
        self.node(ExpressionKind::Parenthesized(Box::new(inner)))
    }

    pub fn operand(&mut self, inner: Expression) -> Expression {
        if is_primary(&inner) {
            inner
        } else {
            self.paren(inner)
        }
    }

    pub fn argument(&mut self, inner: Expression) -> Expression {
        if matches!(inner.kind, ExpressionKind::Sequence(_)) {
            self.paren(inner)
        } else {
            inner
        }
    }

    pub fn binary(
        &mut self,
        operator: BinaryOperator,
        left: Expression,
        right: Expression,
    ) -> Expression {
        let left = self.operand(left);
        let right = self.operand(right);
        self.node(ExpressionKind::Binary {
            operator,
            left: Box::new(left),
            right: Box::new(right),
        })
    }

    pub fn unary(&mut self, operator: UnaryOperator, operand: Expression) -> Expression {
        let operand = self.operand(operand);
        self.node(ExpressionKind::Unary {
            operator,
            operand: Box::new(operand),
        })
    }

    pub fn ternary(
        &mut self,
        condition: Expression,
        then_expression: Expression,
        else_expression: Expression,
    ) -> Expression {
        let condition = self.operand(condition);
        let then_expression = self.operand(then_expression);
        let else_expression = self.operand(else_expression);
        self.node(ExpressionKind::Conditional {
            condition: Box::new(condition),
            then_expression: Box::new(then_expression),
            else_expression: Box::new(else_expression),
        })
    }

    pub fn sequence(&mut self, first: Expression, second: Expression) -> Expression {
        let first = self.argument(first);
        let second = self.argument(second);
        self.node(ExpressionKind::Sequence(vec![first, second]))
    }

    pub fn field(&mut self, base: Expression, name: &str) -> Expression {
        let base = self.operand(base);
        self.node(ExpressionKind::FieldSelection {
            base: Box::new(base),
            field: Identifier::new(Span::new(0, 0), name.to_owned()),
        })
    }

    pub fn index(&mut self, base: Expression, index: u32) -> Expression {
        let base = self.operand(base);
        let index = self.int(i64::from(index));
        self.node(ExpressionKind::Subscript {
            base: Box::new(base),
            index: Box::new(index),
        })
    }

    fn call_with(
        &mut self,
        function: FunctionIdentifier,
        arguments: Vec<Expression>,
    ) -> Expression {
        let arguments = arguments
            .into_iter()
            .map(|argument| self.argument(argument))
            .collect();
        self.node(ExpressionKind::FunctionCall(Box::new(FunctionCall {
            function: Spanned::new(Span::new(0, 0), function),
            arguments,
        })))
    }

    pub fn call(&mut self, name: &str, arguments: Vec<Expression>) -> Expression {
        self.call_with(FunctionIdentifier::Function(name.to_owned()), arguments)
    }

    pub fn construct(&mut self, ty: BasicType, arguments: Vec<Expression>) -> Expression {
        self.construct_specifier(basic::specifier(ty), arguments)
    }

    pub fn construct_specifier(
        &mut self,
        specifier: TypeSpecifier,
        arguments: Vec<Expression>,
    ) -> Expression {
        self.call_with(
            FunctionIdentifier::Constructor(Box::new(specifier)),
            arguments,
        )
    }
}

impl Builder {
    pub const fn statement(&mut self, kind: StatementKind) -> Statement {
        Node::new(self.id(), Span::new(0, 0), kind)
    }

    pub const fn block(&mut self, statements: Vec<Statement>) -> Statement {
        self.statement(StatementKind::Compound(CompoundStatement { statements }))
    }

    pub const fn expression_statement(&mut self, expression: Expression) -> Statement {
        self.statement(StatementKind::Expression(Some(expression)))
    }

    pub const fn null_statement(&mut self) -> Statement {
        self.statement(StatementKind::Expression(None))
    }

    pub const fn jump(&mut self, jump: JumpStatement) -> Statement {
        self.statement(StatementKind::Jump(jump))
    }

    pub fn if_statement(
        &mut self,
        condition: Expression,
        then_branch: Statement,
        else_branch: Option<Statement>,
    ) -> Statement {
        self.statement(StatementKind::Selection {
            condition,
            then_branch: Box::new(then_branch),
            else_branch: else_branch.map(Box::new),
        })
    }

    pub fn while_statement(&mut self, condition: Expression, body: Statement) -> Statement {
        self.statement(StatementKind::While {
            condition: Condition::Expression(condition),
            body: Box::new(body),
        })
    }

    pub fn do_while(&mut self, body: Statement, condition: Expression) -> Statement {
        self.statement(StatementKind::DoWhile {
            body: Box::new(body),
            condition,
        })
    }

    pub fn for_statement(
        &mut self,
        init: Statement,
        condition: Option<Expression>,
        increment: Option<Expression>,
        body: Statement,
    ) -> Statement {
        self.statement(StatementKind::For(Box::new(ForStatement {
            init,
            condition: condition.map(Condition::Expression),
            increment,
            body,
        })))
    }

    pub const fn switch(&mut self, selector: Expression, statements: Vec<Statement>) -> Statement {
        self.statement(StatementKind::Switch {
            selector,
            statements,
        })
    }

    pub fn case(&mut self, value: i64) -> Statement {
        let label = self.int(value);
        self.statement(StatementKind::CaseLabel(CaseLabel::Case(label)))
    }

    pub const fn default_label(&mut self) -> Statement {
        self.statement(StatementKind::CaseLabel(CaseLabel::Default))
    }

    pub fn assign(&mut self, target: Expression, value: Expression) -> Expression {
        let value = self.argument(value);
        self.node(ExpressionKind::Assignment {
            operator: AssignmentOperator::Assign,
            target: Box::new(target),
            value: Box::new(value),
        })
    }

    pub fn postfix(&mut self, operand: Expression, operator: PostfixOperator) -> Expression {
        let operand = self.operand(operand);
        self.node(ExpressionKind::Postfix {
            operand: Box::new(operand),
            operator,
        })
    }

    pub fn declaration_with(
        &mut self,
        ty: FullySpecifiedType,
        declarators: Vec<(String, Option<u32>, Option<Expression>)>,
    ) -> Declaration {
        let declarators = declarators
            .into_iter()
            .map(|(name, size, initializer)| {
                let array = size.map(|size| {
                    let size = self.int(i64::from(size));
                    Spanned::new(
                        Span::new(0, 0),
                        ArraySpecifier {
                            dimensions: vec![Spanned::new(
                                Span::new(0, 0),
                                ArrayDimension::Sized(size),
                            )],
                        },
                    )
                });
                let initializer = initializer.map(|value| {
                    let value = self.argument(value);
                    Spanned::new(Span::new(0, 0), Initializer::Expression(value))
                });
                Node::new(
                    self.id(),
                    Span::new(0, 0),
                    InitDeclarator {
                        name: Identifier::new(Span::new(0, 0), name),
                        array,
                        initializer,
                    },
                )
            })
            .collect();
        Node::new(
            self.id(),
            Span::new(0, 0),
            DeclarationKind::InitDeclaratorList(InitDeclaratorList {
                ty: Spanned::new(Span::new(0, 0), ty),
                declarators,
            }),
        )
    }

    pub fn declare(
        &mut self,
        specifier: TypeSpecifier,
        name: &str,
        initializer: Option<Expression>,
    ) -> Statement {
        let declaration = self.declaration_with(
            unqualified(specifier),
            vec![(name.to_owned(), None, initializer)],
        );
        self.statement(StatementKind::Declaration(Box::new(declaration)))
    }
}

pub const fn unqualified(specifier: TypeSpecifier) -> FullySpecifiedType {
    FullySpecifiedType {
        qualifier: None,
        specifier: Spanned::new(Span::new(0, 0), specifier),
    }
}

pub const fn named_type(name: String) -> TypeSpecifier {
    TypeSpecifier {
        non_array: TypeSpecifierNonArray::TypeName(name),
        parameters: None,
        array: None,
    }
}

pub const fn is_primary(expression: &Expression) -> bool {
    matches!(
        expression.kind,
        ExpressionKind::Variable(_)
            | ExpressionKind::Number(_)
            | ExpressionKind::Bool(_)
            | ExpressionKind::String(_)
            | ExpressionKind::Parenthesized(_)
            | ExpressionKind::FunctionCall(_)
            | ExpressionKind::Subscript { .. }
            | ExpressionKind::FieldSelection { .. }
    )
}
