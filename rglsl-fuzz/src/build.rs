use rglsl_ast::ast::{
    BasicType, BinaryOperator, Expression, ExpressionKind, FunctionCall, FunctionIdentifier,
    Identifier, Node, NodeId, NumericKind, NumericLiteral, Spanned, TypeSpecifier, UnaryOperator,
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

pub const fn is_primary(expression: &Expression) -> bool {
    matches!(
        expression.kind,
        ExpressionKind::Variable(_)
            | ExpressionKind::Number(_)
            | ExpressionKind::Bool(_)
            | ExpressionKind::Parenthesized(_)
            | ExpressionKind::FunctionCall(_)
            | ExpressionKind::Subscript { .. }
            | ExpressionKind::FieldSelection { .. }
    )
}
