use alloc::borrow::ToOwned;
use alloc::boxed::Box;
use alloc::collections::{BTreeMap, BTreeSet};
use alloc::format;
use alloc::string::String;
use alloc::vec::Vec;
use core::cell::{Cell, RefCell};
use core::future::Future;
use core::ops::Deref;

use crate::ast::NumericKind;
use crate::ast::{
    ArrayDimension, ArraySpecifier, AssignmentOperator, Attribute, BasicType, BinaryOperator,
    BlockInstance, BlockStructure, CaseLabel, CompoundStatement, Condition, ConditionDeclaration,
    Declaration, DeclarationKind, Directive, DirectiveKind, Expression, ExpressionKind,
    ExternalDeclaration, ForStatement, FullySpecifiedType, FunctionCall, FunctionDefinition,
    FunctionIdentifier, FunctionPrototype, Identifier, InitDeclarator, InitDeclaratorList,
    Initializer, JumpStatement, LayoutQualifier, LayoutQualifierId, Node, NodeId, NumericLiteral,
    ParameterDeclaration, ParameterizedType, PostfixOperator, PrecisionQualifier,
    SingleTypeQualifier, Spanned, SpirvDecorate, SpirvDecorateKind, SpirvExecutionMode,
    SpirvExecutionModeKind, SpirvInstruction, SpirvInstructionQualifier, SpirvRequirement,
    SpirvStorageClass, SpirvTypeParameter, SpirvTypeSpecifier, Statement, StatementKind,
    StructDeclaration, StructDeclarator, StructSpecifier, TranslationUnit, TypeParameters,
    TypeQualifier, TypeSpecifier, TypeSpecifierNonArray, UnaryOperator,
};
use crate::error::{ParseError, ParseErrorKind};
use crate::extensions::{ExtensionState, Feature};
use crate::keywords::{
    is_opaque_type_keyword, is_reserved_word, is_type_keyword, is_unavailable_word,
};
use crate::lexer::{tokenize, Token, TokenKind};
use crate::span::Span;
use rglsl_types::stack::{run, Call, Stack};

pub const NON_UNIFORM: &str = "nonuniformEXT";
const NON_UNIFORM_EXTENSION: &str = "GL_EXT_nonuniform_qualifier";
const SPIRV_INTRINSICS: &str = "GL_EXT_spirv_intrinsics";
const EXPLICIT_TYPECAST: &str = "GL_NV_explicit_typecast";
const SPIRV_TYPE: &str = "spirv_type";
const SPIRV_QUALIFIERS: [&str; 6] = [
    "spirv_storage_class",
    "spirv_decorate",
    "spirv_decorate_id",
    "spirv_decorate_string",
    "spirv_by_reference",
    "spirv_literal",
];
const SPIRV_DECLARATIONS: [&str; 3] = [
    "spirv_instruction",
    "spirv_execution_mode",
    "spirv_execution_mode_id",
];

type Result<T> = core::result::Result<T, Box<ParseError>>;

struct Parsed {
    expression: Expression,
}

enum PendingRight {
    Assignment {
        start: u32,
        target: Parsed,
        operator: AssignmentOperator,
    },
    Conditional {
        start: u32,
        condition: Parsed,
        then_expression: Parsed,
    },
}

struct ForHeader {
    init: Statement,
    condition: Option<Condition>,
    increment: Option<Expression>,
}

struct PendingBinary {
    operands: Vec<(u32, Parsed)>,
    operators: Vec<BinaryOperator>,
}

enum AfterQualifier {
    Declaration(Box<ExternalDeclaration>),
    Type(Spanned<TypeQualifier>),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum SpirvToken {
    Int,
    String,
    Scalar,
    ScalarOrName,
    Any,
}

impl SpirvToken {
    const fn expected(self) -> &'static str {
        match self {
            Self::Int => "an integer constant",
            Self::String => "a string literal",
            Self::Scalar => "a scalar constant",
            Self::ScalarOrName => "a scalar constant or a variable",
            Self::Any => "a scalar constant or a string literal",
        }
    }
}

struct StructScopes<'a> {
    scopes: Vec<BTreeSet<&'a str>>,
    visible: BTreeMap<&'a str, usize>,
}

impl<'a> StructScopes<'a> {
    fn new(names: &[&'a str]) -> Self {
        let mut scopes = Self {
            scopes: Vec::from([BTreeSet::new()]),
            visible: BTreeMap::new(),
        };
        for name in names {
            scopes.declare(name);
        }
        scopes
    }

    fn push(&mut self) {
        self.scopes.push(BTreeSet::new());
    }

    fn pop(&mut self) {
        let Some(scope) = self.scopes.pop() else {
            return;
        };
        for name in scope {
            if let Some(count) = self.visible.get_mut(name) {
                *count = count.saturating_sub(1);
                if *count == 0 {
                    self.visible.remove(name);
                }
            }
        }
    }

    fn contains(&self, name: &str) -> bool {
        self.visible.contains_key(name)
    }

    fn declare(&mut self, name: &'a str) {
        if let Some(scope) = self.scopes.last_mut() {
            if scope.insert(name) {
                *self.visible.entry(name).or_default() += 1;
            }
        }
    }
}

struct Parser<'a> {
    source: &'a str,
    tokens: Vec<Token<'a>>,
    directives: Vec<Directive>,
    strings: Vec<String>,
    end: Token<'a>,
    cursor: Cell<usize>,
    previous_end: Cell<u32>,
    next_id: Cell<u32>,
    struct_scopes: RefCell<StructScopes<'a>>,
    extensions: RefCell<ExtensionState>,
    partial_function: RefCell<Option<PartialFunction>>,
}

struct PartialFunction {
    start: u32,
    definition: FunctionDefinition,
}

#[derive(Clone)]
struct Cx<'b, 'a> {
    parser: &'b Parser<'a>,
    stack: Stack<'b>,
}

impl<'a> Deref for Cx<'_, 'a> {
    type Target = Parser<'a>;

    fn deref(&self) -> &Parser<'a> {
        self.parser
    }
}

impl<'b> Cx<'b, '_> {
    fn call<T: 'b>(&self, frame: impl Future<Output = T> + 'b) -> Call<'b, T> {
        self.stack.call(frame)
    }
}

pub fn parse(source: &str) -> core::result::Result<TranslationUnit, ParseError> {
    match parse_prefix(source) {
        (unit, None) => Ok(unit),
        (_, Some(error)) => Err(error),
    }
}

pub fn parse_prefix(source: &str) -> (TranslationUnit, Option<ParseError>) {
    let lexed = match tokenize(source) {
        Ok(lexed) => lexed,
        Err(error) => {
            return (
                TranslationUnit::new(Vec::new(), NodeId::new(0)),
                Some(error),
            )
        }
    };
    let parser = Parser {
        source,
        tokens: lexed.tokens,
        directives: lexed.directives,
        strings: lexed.strings,
        end: lexed.end,
        cursor: Cell::new(0),
        previous_end: Cell::new(0),
        next_id: Cell::new(0),
        struct_scopes: RefCell::new(StructScopes::new(&[
            "gl_TextureFootprint2DNV",
            "gl_TextureFootprint3DNV",
        ])),
        extensions: RefCell::new(ExtensionState::new()),
        partial_function: RefCell::new(None),
    };
    let mut external_declarations = Vec::new();
    let mut failure = None;
    while parser.peek().kind != TokenKind::End {
        let parsed = run(|stack| {
            Cx {
                parser: &parser,
                stack,
            }
            .parse_external_declaration()
        });
        match parsed {
            Some(Ok(external)) => external_declarations.push(external),
            Some(Err(error)) => {
                if let Some(partial) = parser.partial_function.borrow_mut().take() {
                    let end = partial.definition.body.span.end;
                    let id = NodeId::new(parser.next_id.get());
                    external_declarations.push(ExternalDeclaration::FunctionDefinition(Node::new(
                        id,
                        Span::new(partial.start, end),
                        partial.definition,
                    )));
                    parser.next_id.set(parser.next_id.get().saturating_add(1));
                }
                failure = Some(*error);
                break;
            }
            None => {
                failure = Some(*parser.error(ParseErrorKind::Internal, parser.peek().span));
                break;
            }
        }
    }
    let unit = TranslationUnit::new(external_declarations, NodeId::new(parser.next_id.get()));
    (unit, failure)
}

impl<'a> Parser<'a> {
    fn token_at(&self, index: usize) -> Token<'a> {
        self.tokens.get(index).copied().unwrap_or(self.end)
    }

    fn peek(&self) -> Token<'a> {
        self.token_at(self.cursor.get())
    }

    fn peek_nth(&self, distance: usize) -> Token<'a> {
        self.token_at(self.cursor.get().saturating_add(distance))
    }

    fn advance(&self) -> Token<'a> {
        let token = self.peek();
        let cursor = self.cursor.get();
        if cursor < self.tokens.len() {
            self.cursor.set(cursor + 1);
            self.previous_end.set(token.span.end);
        }
        token
    }

    fn at(&self, punctuator: &str) -> bool {
        self.at_nth(0, punctuator)
    }

    fn at_nth(&self, distance: usize, punctuator: &str) -> bool {
        matches!(self.peek_nth(distance).kind, TokenKind::Punctuator(found) if found == punctuator)
    }

    fn at_word(&self, word: &str) -> bool {
        matches!(self.peek().kind, TokenKind::Word(found) if found == word)
    }

    fn eat(&self, punctuator: &str) -> bool {
        let found = self.at(punctuator);
        if found {
            self.advance();
        }
        found
    }

    fn eat_word(&self, word: &str) -> bool {
        let found = self.at_word(word);
        if found {
            self.advance();
        }
        found
    }

    fn expect(&self, punctuator: &str) -> Result<Span> {
        if self.at(punctuator) {
            Ok(self.advance().span)
        } else {
            Err(self.unexpected(&format!("`{punctuator}`")))
        }
    }

    fn expect_word(&self, word: &str) -> Result<Span> {
        if self.at_word(word) {
            Ok(self.advance().span)
        } else {
            Err(self.unexpected(&format!("`{word}`")))
        }
    }

    fn error(&self, kind: ParseErrorKind, span: Span) -> Box<ParseError> {
        Box::new(ParseError::new(kind, span, self.source))
    }

    fn unexpected(&self, expected: &str) -> Box<ParseError> {
        let token = self.peek();
        let found = match token.kind {
            TokenKind::Word(text) | TokenKind::Number { text, .. } => format!("`{text}`"),
            TokenKind::Punctuator(text) => format!("`{text}`"),
            TokenKind::Directive(_) => String::from("a preprocessor directive"),
            TokenKind::String(_) => String::from("a string literal"),
            TokenKind::End => String::from("the end of the source"),
        };
        self.error(
            ParseErrorKind::UnexpectedToken {
                expected: expected.to_owned(),
                found,
            },
            token.span,
        )
    }

    fn start(&self) -> u32 {
        self.peek().span.start
    }

    fn span_from(&self, start: u32) -> Span {
        Span::new(start, self.previous_end.get().max(start))
    }

    fn spanned<T>(&self, start: u32, value: T) -> Spanned<T> {
        Spanned::new(self.span_from(start), value)
    }

    fn node<K>(&self, start: u32, kind: K) -> Result<Node<K>> {
        let span = self.span_from(start);
        let id = NodeId::new(self.next_id.get());
        let next = self
            .next_id
            .get()
            .checked_add(1)
            .ok_or_else(|| self.error(ParseErrorKind::TooManyNodes, span))?;
        self.next_id.set(next);
        Ok(Node::new(id, span, kind))
    }

    fn parsed(&self, start: u32, kind: ExpressionKind) -> Result<Parsed> {
        Ok(Parsed {
            expression: self.node(start, kind)?,
        })
    }

    fn identifier(&self) -> Result<Identifier> {
        let token = self.peek();
        match token.kind {
            TokenKind::Word(word) if is_reserved_word(word) => {
                Err(self.error(ParseErrorKind::ReservedWord(word.to_owned()), token.span))
            }
            TokenKind::Word(word) => {
                self.advance();
                Ok(Spanned::new(token.span, word.to_owned()))
            }
            _ => Err(self.unexpected("an identifier")),
        }
    }

    fn require_type_extension(&self, word: &str, span: Span) -> Result<()> {
        if self.extensions.borrow().keyword_enabled(word) {
            return Ok(());
        }
        let extensions = Feature::of_type_keyword(word)
            .map(|feature| feature.extensions().join(", "))
            .unwrap_or_default();
        Err(self.error(
            ParseErrorKind::ExtensionRequired {
                word: word.to_owned(),
                extensions,
            },
            span,
        ))
    }

    fn require_non_uniform(&self, span: Span) -> Result<()> {
        if self.extensions.borrow().is_on(NON_UNIFORM_EXTENSION) {
            return Ok(());
        }
        Err(self.error(
            ParseErrorKind::ExtensionRequired {
                word: NON_UNIFORM.to_owned(),
                extensions: NON_UNIFORM_EXTENSION.to_owned(),
            },
            span,
        ))
    }

    fn is_struct_name(&self, word: &str) -> bool {
        self.struct_scopes.borrow().contains(word)
    }

    fn is_type_name(&self, word: &str) -> bool {
        is_type_keyword(word)
            || self.is_struct_name(word)
            || self.is_spirv_word(word, &[SPIRV_TYPE])
    }

    fn is_spirv_word(&self, word: &str, words: &[&str]) -> bool {
        words.contains(&word) && self.extensions.borrow().is_on(SPIRV_INTRINSICS)
    }

    fn declare_struct(&self, name: &'a str) {
        self.struct_scopes.borrow_mut().declare(name);
    }

    fn token_after_array_specifier(&self) -> TokenKind<'a> {
        let mut index = self.cursor.get().saturating_add(1);
        if self.token_at(index).kind == TokenKind::Punctuator("<") {
            let mut angles = 0_u32;
            let mut parentheses = 0_u32;
            loop {
                match self.token_at(index).kind {
                    TokenKind::End => return TokenKind::End,
                    TokenKind::Punctuator("(") => parentheses = parentheses.saturating_add(1),
                    TokenKind::Punctuator(")") => parentheses = parentheses.saturating_sub(1),
                    TokenKind::Punctuator("<") if parentheses == 0 => {
                        angles = angles.saturating_add(1);
                    }
                    TokenKind::Punctuator(">") if parentheses == 0 => {
                        angles = angles.saturating_sub(1);
                        if angles == 0 {
                            index = index.saturating_add(1);
                            break;
                        }
                    }
                    _ => {}
                }
                index = index.saturating_add(1);
            }
        }
        let mut open_brackets = 0_u32;
        loop {
            let kind = self.token_at(index).kind;
            match kind {
                TokenKind::End => return kind,
                TokenKind::Punctuator("[") => open_brackets = open_brackets.saturating_add(1),
                TokenKind::Punctuator("]") if open_brackets > 0 => open_brackets -= 1,
                _ if open_brackets == 0 => return kind,
                _ => {}
            }
            index = index.saturating_add(1);
        }
    }

    fn starts_declaration(&self) -> bool {
        let TokenKind::Word(word) = self.peek().kind else {
            return false;
        };
        if word == NON_UNIFORM && self.at_nth(1, "(") {
            return false;
        }
        if matches!(word, "precision" | "struct" | "layout" | "subroutine")
            || SingleTypeQualifier::from_keyword(word).is_some()
            || self.is_spirv_word(word, &SPIRV_QUALIFIERS)
            || self.is_spirv_word(word, &SPIRV_DECLARATIONS)
            || self.is_spirv_word(word, &[SPIRV_TYPE])
        {
            return true;
        }
        self.is_type_name(word) && matches!(self.token_after_array_specifier(), TokenKind::Word(_))
    }

    fn starts_constructor(&self, word: &str) -> bool {
        if BasicType::from_keyword(word).is_some()
            || is_opaque_type_keyword(word)
            || ParameterizedType::from_keyword(word).is_some()
        {
            return true;
        }
        self.is_struct_name(word)
            && matches!(
                self.token_after_array_specifier(),
                TokenKind::Punctuator("(")
            )
    }

    fn declaration(&self, start: u32, kind: DeclarationKind) -> Result<ExternalDeclaration> {
        Ok(ExternalDeclaration::Declaration(self.node(start, kind)?))
    }

    fn is_spirv_word_here(&self, words: &[&str]) -> bool {
        matches!(self.peek().kind, TokenKind::Word(word) if self.is_spirv_word(word, words))
    }

    fn at_spirv_requirement(&self) -> bool {
        matches!(self.peek().kind, TokenKind::Word(_)) && self.at_nth(1, "=") && self.at_nth(2, "[")
    }

    fn parse_spirv_requirements(&self) -> Result<Vec<Spanned<SpirvRequirement>>> {
        let mut requirements = Vec::new();
        while self.at_spirv_requirement() {
            let start = self.start();
            let name = self.identifier()?;
            self.expect("=")?;
            self.expect("[")?;
            let accepted = if matches!(self.peek().kind, TokenKind::String(_)) {
                SpirvToken::String
            } else {
                SpirvToken::Int
            };
            let mut values = Vec::new();
            loop {
                values.push(self.parse_spirv_token(accepted)?);
                if !self.eat(",") {
                    break;
                }
            }
            self.expect("]")?;
            requirements.push(self.spanned(start, SpirvRequirement { name, values }));
            self.expect(",")?;
        }
        Ok(requirements)
    }

    fn parse_spirv_instruction_qualifiers(
        &self,
    ) -> Result<Vec<Spanned<SpirvInstructionQualifier>>> {
        let mut qualifiers = Vec::new();
        loop {
            let start = self.start();
            let name = self.identifier()?;
            self.expect("=")?;
            let accepted = if matches!(self.peek().kind, TokenKind::String(_)) {
                SpirvToken::String
            } else {
                SpirvToken::Int
            };
            let value = self.parse_spirv_token(accepted)?;
            qualifiers.push(self.spanned(start, SpirvInstructionQualifier { name, value }));
            let another = self.at(",")
                && matches!(self.peek_nth(1).kind, TokenKind::Word(_))
                && self.at_nth(2, "=");
            if !another {
                break;
            }
            self.advance();
        }
        Ok(qualifiers)
    }

    fn parse_spirv_token(&self, accepted: SpirvToken) -> Result<Expression> {
        let token = self.peek();
        let start = token.span.start;
        let kind = match (token.kind, accepted) {
            (TokenKind::String(index), SpirvToken::String | SpirvToken::Any) => {
                ExpressionKind::String(self.strings.get(index).cloned().unwrap_or_default())
            }
            (TokenKind::Number { kind, text }, SpirvToken::Int) if kind == NumericKind::Int => {
                ExpressionKind::Number(NumericLiteral {
                    kind,
                    text: text.to_owned(),
                })
            }
            (
                TokenKind::Number { kind, text },
                SpirvToken::Scalar | SpirvToken::Any | SpirvToken::ScalarOrName,
            ) if matches!(
                kind,
                NumericKind::Int | NumericKind::Uint | NumericKind::Float
            ) =>
            {
                ExpressionKind::Number(NumericLiteral {
                    kind,
                    text: text.to_owned(),
                })
            }
            (
                TokenKind::Word(word @ ("true" | "false")),
                SpirvToken::Scalar | SpirvToken::Any | SpirvToken::ScalarOrName,
            ) => ExpressionKind::Bool(word == "true"),
            (TokenKind::Word(word), SpirvToken::ScalarOrName) if !is_reserved_word(word) => {
                ExpressionKind::Variable(word.to_owned())
            }
            _ => return Err(self.unexpected(accepted.expected())),
        };
        self.advance();
        self.node(start, kind)
    }

    fn parse_spirv_qualifier(&self, word: &str) -> Result<SingleTypeQualifier> {
        self.advance();
        let kind = match word {
            "spirv_by_reference" => return Ok(SingleTypeQualifier::SpirvByReference),
            "spirv_literal" => return Ok(SingleTypeQualifier::SpirvLiteral),
            "spirv_storage_class" => {
                self.expect("(")?;
                let requirements = self.parse_spirv_requirements()?;
                let class = self.parse_spirv_token(SpirvToken::Int)?;
                self.expect(")")?;
                return Ok(SingleTypeQualifier::SpirvStorageClass(SpirvStorageClass {
                    requirements,
                    class,
                }));
            }
            "spirv_decorate_id" => SpirvDecorateKind::Id,
            "spirv_decorate_string" => SpirvDecorateKind::String,
            _ => SpirvDecorateKind::Literal,
        };
        self.expect("(")?;
        let requirements = self.parse_spirv_requirements()?;
        let decoration = self.parse_spirv_token(SpirvToken::Int)?;
        let operand = match kind {
            SpirvDecorateKind::Literal => SpirvToken::Scalar,
            SpirvDecorateKind::Id => SpirvToken::ScalarOrName,
            SpirvDecorateKind::String => SpirvToken::String,
        };
        let mut operands = Vec::new();
        if kind != SpirvDecorateKind::Literal {
            self.expect(",")?;
            operands.push(self.parse_spirv_token(operand)?);
        }
        while self.eat(",") {
            operands.push(self.parse_spirv_token(operand)?);
        }
        self.expect(")")?;
        Ok(SingleTypeQualifier::SpirvDecorate(SpirvDecorate {
            kind,
            requirements,
            decoration,
            operands,
        }))
    }

    fn parse_precision_qualifier(&self) -> Result<Spanned<PrecisionQualifier>> {
        let token = self.peek();
        let qualifier = match token.kind {
            TokenKind::Word(word) => PrecisionQualifier::from_keyword(word),
            _ => None,
        };
        match qualifier {
            Some(qualifier) => {
                self.advance();
                Ok(Spanned::new(token.span, qualifier))
            }
            None => Err(self.unexpected("a precision qualifier")),
        }
    }

    fn parse_type_name_list(&self) -> Result<Vec<Identifier>> {
        let mut type_names = Vec::new();
        if self.eat("(") {
            type_names.push(self.identifier()?);
            while self.eat(",") {
                type_names.push(self.identifier()?);
            }
            self.expect(")")?;
        }
        Ok(type_names)
    }

    fn parse_simple_type_specifier(
        &self,
        token: Token<'a>,
        word: &'a str,
    ) -> Result<TypeSpecifierNonArray> {
        let non_array = if word == "void" {
            TypeSpecifierNonArray::Void
        } else if let Some(basic) = BasicType::from_keyword(word) {
            self.require_type_extension(word, token.span)?;
            TypeSpecifierNonArray::Basic(basic)
        } else if is_opaque_type_keyword(word) {
            self.require_type_extension(word, token.span)?;
            TypeSpecifierNonArray::Opaque(word.to_owned())
        } else if let Some(kind) = ParameterizedType::from_keyword(word) {
            self.require_type_extension(word, token.span)?;
            TypeSpecifierNonArray::Parameterized(kind)
        } else if self.is_struct_name(word) {
            TypeSpecifierNonArray::TypeName(word.to_owned())
        } else if is_unavailable_word(word) {
            return Err(self.error(ParseErrorKind::ReservedWord(word.to_owned()), token.span));
        } else if is_reserved_word(word) {
            return Err(self.unexpected("a type"));
        } else {
            return Err(self.error(ParseErrorKind::UnknownType(word.to_owned()), token.span));
        };
        self.advance();
        Ok(non_array)
    }

    fn at_attribute_list(&self) -> bool {
        self.at("[") && self.at_nth(1, "[")
    }

    fn parse_default_label(&self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("default")?;
        self.expect(":")?;
        self.node(start, StatementKind::CaseLabel(CaseLabel::Default))
    }

    fn parse_jump(&self, jump: JumpStatement) -> Result<Statement> {
        let start = self.start();
        self.advance();
        self.expect(";")?;
        self.node(start, StatementKind::Jump(jump))
    }

    fn finish_for(&self, start: u32, header: Box<ForHeader>, body: Statement) -> Result<Statement> {
        let ForHeader {
            init,
            condition,
            increment,
        } = *header;
        let statement = ForStatement {
            init,
            condition,
            increment,
            body,
        };
        self.node(start, StatementKind::For(Box::new(statement)))
    }

    fn reduce_right(&self, right: PendingRight, inner: Parsed) -> Result<Parsed> {
        match right {
            PendingRight::Assignment {
                start,
                target,
                operator,
            } => {
                let kind = ExpressionKind::Assignment {
                    operator,
                    target: Box::new(target.expression),
                    value: Box::new(inner.expression),
                };
                self.parsed(start, kind)
            }
            PendingRight::Conditional {
                start,
                condition,
                then_expression,
            } => {
                let kind = ExpressionKind::Conditional {
                    condition: Box::new(condition.expression),
                    then_expression: Box::new(then_expression.expression),
                    else_expression: Box::new(inner.expression),
                };
                self.parsed(start, kind)
            }
        }
    }

    fn peek_binary_operator(&self) -> Option<BinaryOperator> {
        match self.peek().kind {
            TokenKind::Punctuator(symbol) => BinaryOperator::from_symbol(symbol),
            _ => None,
        }
    }

    fn reduce_binary(&self, pending: &mut PendingBinary) -> Result<()> {
        let operator = pending.operators.pop();
        let right = pending.operands.pop();
        let left = pending.operands.pop();
        let (Some(operator), Some((_, right)), Some((start, left))) = (operator, right, left)
        else {
            return Err(self.unexpected("an expression"));
        };
        let kind = ExpressionKind::Binary {
            operator,
            left: Box::new(left.expression),
            right: Box::new(right.expression),
        };
        let reduced = self.parsed(start, kind)?;
        pending.operands.push((start, reduced));
        Ok(())
    }

    fn starts_cast(&self) -> bool {
        if !self.at("(") || !self.extensions.borrow().is_on(EXPLICIT_TYPECAST) {
            return false;
        }
        match self.token_at(self.cursor.get().saturating_add(1)).kind {
            TokenKind::Word(word) if self.is_type_name(word) => true,
            TokenKind::Word(word) => self.casts_to_name(word),
            _ => false,
        }
    }

    fn casts_to_name(&self, word: &str) -> bool {
        if is_reserved_word(word)
            || self.token_at(self.cursor.get().saturating_add(2)).kind != TokenKind::Punctuator(")")
        {
            return false;
        }
        match self.token_at(self.cursor.get().saturating_add(3)).kind {
            TokenKind::Word(next) => !is_reserved_word(next) || matches!(next, "true" | "false"),
            TokenKind::Number { .. } => true,
            _ => false,
        }
    }

    fn at_postfix(&self) -> bool {
        matches!(
            self.peek().kind,
            TokenKind::Punctuator("[" | "." | "(" | "++" | "--")
        )
    }

    fn parse_postfix_operator(
        &self,
        start: u32,
        operand: Parsed,
        operator: PostfixOperator,
    ) -> Result<Parsed> {
        self.advance();
        let kind = ExpressionKind::Postfix {
            operand: Box::new(operand.expression),
            operator,
        };
        self.parsed(start, kind)
    }

    fn parse_literal(&self, token: Token<'a>) -> Result<Parsed> {
        let start = token.span.start;
        self.advance();
        let kind = match token.kind {
            TokenKind::Number { kind, text } => ExpressionKind::Number(NumericLiteral {
                kind,
                text: text.to_owned(),
            }),
            TokenKind::String(index) => {
                ExpressionKind::String(self.strings.get(index).cloned().unwrap_or_default())
            }
            TokenKind::Word(word) => ExpressionKind::Bool(word == "true"),
            _ => return Err(self.unexpected("an expression")),
        };
        self.parsed(start, kind)
    }
}

impl<'b, 'a: 'b> Cx<'b, 'a> {
    async fn parse_external_declaration(self) -> Result<ExternalDeclaration> {
        let token = self.peek();
        match token.kind {
            TokenKind::Directive(index) => {
                let directive = self
                    .directives
                    .get(index)
                    .cloned()
                    .ok_or_else(|| self.unexpected("a declaration"))?;
                if let DirectiveKind::Extension { name, behavior } = &directive.kind {
                    self.extensions.borrow_mut().apply(name, *behavior);
                }
                self.advance();
                Ok(ExternalDeclaration::Directive(Spanned::new(
                    token.span, directive,
                )))
            }
            TokenKind::Punctuator(";") => {
                self.advance();
                Ok(ExternalDeclaration::Semicolon(Spanned::new(token.span, ())))
            }
            _ => {
                self.call(self.clone().parse_declaration_or_definition(true))
                    .await
            }
        }
    }

    async fn parse_declaration(self) -> Result<Declaration> {
        match self
            .call(self.clone().parse_declaration_or_definition(false))
            .await?
        {
            ExternalDeclaration::Declaration(declaration) => Ok(declaration),
            ExternalDeclaration::Directive(_)
            | ExternalDeclaration::FunctionDefinition(_)
            | ExternalDeclaration::Semicolon(_) => Err(self.unexpected("a declaration")),
        }
    }

    async fn parse_declaration_or_definition(
        self,
        allow_definition: bool,
    ) -> Result<ExternalDeclaration> {
        let start = self.start();
        if allow_definition && self.at_attribute_list() {
            return self
                .call(self.clone().parse_attributed_function(start))
                .await;
        }
        if self.eat_word("precision") {
            let qualifier = self.parse_precision_qualifier()?;
            let ty = self.call(self.clone().parse_type_specifier()).await?;
            self.expect(";")?;
            return self.declaration(start, DeclarationKind::Precision { qualifier, ty });
        }
        if self.is_spirv_word_here(&["spirv_instruction"]) {
            return self
                .call(self.clone().parse_spirv_instruction_declaration(start))
                .await;
        }
        if self.is_spirv_word_here(&["spirv_execution_mode", "spirv_execution_mode_id"]) {
            let mode = self.call(self.clone().parse_spirv_execution_mode()).await?;
            self.expect(";")?;
            return self.declaration(start, DeclarationKind::SpirvExecutionMode(mode));
        }
        let qualifier = self.call(self.clone().parse_type_qualifier()).await?;
        let qualifier = match qualifier {
            Some(qualifier) => match self
                .call(self.clone().parse_qualifier_declaration(start, qualifier))
                .await?
            {
                AfterQualifier::Declaration(declaration) => return Ok(*declaration),
                AfterQualifier::Type(qualifier) => Some(qualifier),
            },
            None => None,
        };
        let specifier = self.call(self.clone().parse_type_specifier()).await?;
        let ty = self.spanned(
            start,
            FullySpecifiedType {
                qualifier,
                specifier,
            },
        );
        if self.eat(";") {
            let list = InitDeclaratorList {
                ty,
                declarators: Vec::new(),
            };
            return self.declaration(start, DeclarationKind::InitDeclaratorList(list));
        }
        let name = self.identifier()?;
        if self.at("(") {
            return self
                .call(
                    self.clone()
                        .parse_function(start, ty, name, Vec::new(), allow_definition),
                )
                .await;
        }
        let mut declarators = Vec::new();
        declarators.push(self.call(self.clone().parse_init_declarator(name)).await?);
        while self.eat(",") {
            let name = self.identifier()?;
            declarators.push(self.call(self.clone().parse_init_declarator(name)).await?);
        }
        self.expect(";")?;
        let list = InitDeclaratorList { ty, declarators };
        self.declaration(start, DeclarationKind::InitDeclaratorList(list))
    }

    async fn parse_attributed_function(self, start: u32) -> Result<ExternalDeclaration> {
        let attributes = self.call(self.clone().parse_attribute_list()).await?;
        let qualifier = self.call(self.clone().parse_type_qualifier()).await?;
        let specifier = self.call(self.clone().parse_type_specifier()).await?;
        let return_type = self.spanned(
            start,
            FullySpecifiedType {
                qualifier,
                specifier,
            },
        );
        let name = self.identifier()?;
        if !self.at("(") {
            return Err(self.unexpected("`(`"));
        }
        self.call(
            self.clone()
                .parse_function(start, return_type, name, attributes, true),
        )
        .await
    }

    async fn parse_qualifier_declaration(
        self,
        start: u32,
        qualifier: Spanned<TypeQualifier>,
    ) -> Result<AfterQualifier> {
        if self.eat(";") {
            return self
                .declaration(start, DeclarationKind::Qualifier(qualifier))
                .map(|declaration| AfterQualifier::Declaration(Box::new(declaration)));
        }
        let TokenKind::Word(word) = self.peek().kind else {
            return Ok(AfterQualifier::Type(qualifier));
        };
        if self.at_nth(1, "{") && word != "struct" {
            let reference =
                qualifier.has_layout("buffer_reference") || qualifier.has_layout("buffer_type");
            let kind = self.call(self.clone().parse_block(qualifier)).await?;
            if reference {
                self.declare_struct(word);
            }
            return self
                .declaration(start, kind)
                .map(|declaration| AfterQualifier::Declaration(Box::new(declaration)));
        }
        let names_follow = self.at_nth(1, ";") || self.at_nth(1, ",");
        if names_follow && !self.is_type_name(word) {
            let mut identifiers = Vec::from([self.identifier()?]);
            while self.eat(",") {
                identifiers.push(self.identifier()?);
            }
            self.expect(";")?;
            if qualifier.has_layout("buffer_reference") {
                for identifier in &identifiers {
                    if let Some(name) = identifier.span.text(self.source) {
                        self.declare_struct(name);
                    }
                }
            }
            let kind = DeclarationKind::QualifiedIdentifiers {
                qualifier,
                identifiers,
            };
            return self
                .declaration(start, kind)
                .map(|declaration| AfterQualifier::Declaration(Box::new(declaration)));
        }
        Ok(AfterQualifier::Type(qualifier))
    }

    async fn parse_block(self, qualifier: Spanned<TypeQualifier>) -> Result<DeclarationKind> {
        let name = self.identifier()?;
        let members = self
            .call(self.clone().parse_struct_declaration_list())
            .await?;
        let instance_start = self.start();
        let instance = if self.at(";") {
            None
        } else {
            let name = self.identifier()?;
            let array = self.call(self.clone().parse_array_specifier()).await?;
            Some(self.spanned(instance_start, BlockInstance { name, array }))
        };
        self.expect(";")?;
        let structure = BlockStructure {
            qualifier,
            name,
            members,
        };
        Ok(DeclarationKind::Block {
            structure,
            instance,
        })
    }

    async fn parse_function(
        self,
        start: u32,
        return_type: Spanned<FullySpecifiedType>,
        name: Identifier,
        attributes: Vec<Attribute>,
        allow_definition: bool,
    ) -> Result<ExternalDeclaration> {
        let mut prototype = self
            .call(self.clone().parse_prototype(start, return_type, name))
            .await?;
        prototype.attributes = attributes;
        if self.at_attribute_list() {
            prototype.trailing_attributes = self.call(self.clone().parse_attribute_list()).await?;
        }
        if self.eat(";") {
            return self.declaration(start, DeclarationKind::FunctionPrototype(prototype));
        }
        if !allow_definition || !self.at("{") {
            return Err(self.unexpected("`;`"));
        }
        let body_start = self.start();
        self.expect("{")?;
        self.struct_scopes.borrow_mut().push();
        let mut statements = Vec::new();
        let mut failure = None;
        while !self.at("}") {
            if self.peek().kind == TokenKind::End {
                failure = Some(self.unexpected("`}`"));
                break;
            }
            match self.call(self.clone().parse_statement()).await {
                Ok(statement) => statements.push(statement),
                Err(error) => {
                    failure = Some(error);
                    break;
                }
            }
        }
        self.struct_scopes.borrow_mut().pop();
        if let Some(error) = failure {
            let end = statements
                .last()
                .map_or(body_start, |statement| statement.span.end);
            let body = Spanned::new(Span::new(body_start, end), CompoundStatement { statements });
            self.partial_function.replace(Some(PartialFunction {
                start,
                definition: FunctionDefinition { prototype, body },
            }));
            return Err(error);
        }
        self.expect("}")?;
        let body = self.spanned(body_start, CompoundStatement { statements });
        let definition = FunctionDefinition { prototype, body };
        Ok(ExternalDeclaration::FunctionDefinition(
            self.node(start, definition)?,
        ))
    }

    async fn parse_prototype(
        self,
        start: u32,
        return_type: Spanned<FullySpecifiedType>,
        name: Identifier,
    ) -> Result<Spanned<FunctionPrototype>> {
        self.expect("(")?;
        let mut parameters = Vec::new();
        let is_void_list = self.at_word("void") && self.at_nth(1, ")");
        if is_void_list {
            self.advance();
        } else if !self.at(")") {
            parameters.push(
                self.call(self.clone().parse_parameter_declaration())
                    .await?,
            );
            while self.eat(",") {
                parameters.push(
                    self.call(self.clone().parse_parameter_declaration())
                        .await?,
                );
            }
        }
        self.expect(")")?;
        Ok(self.spanned(
            start,
            FunctionPrototype {
                return_type,
                name,
                parameters,
                attributes: Vec::new(),
                trailing_attributes: Vec::new(),
            },
        ))
    }

    async fn parse_spirv_instruction_declaration(self, start: u32) -> Result<ExternalDeclaration> {
        let instruction_start = self.start();
        self.advance();
        self.expect("(")?;
        let requirements = self.parse_spirv_requirements()?;
        let qualifiers = self.parse_spirv_instruction_qualifiers()?;
        self.expect(")")?;
        let instruction = self.spanned(
            instruction_start,
            SpirvInstruction {
                requirements,
                qualifiers,
            },
        );
        let prototype_start = self.start();
        let qualifier = self.call(self.clone().parse_type_qualifier()).await?;
        let specifier = self.call(self.clone().parse_type_specifier()).await?;
        let return_type = self.spanned(
            prototype_start,
            FullySpecifiedType {
                qualifier,
                specifier,
            },
        );
        let name = self.identifier()?;
        let prototype = self
            .call(
                self.clone()
                    .parse_prototype(prototype_start, return_type, name),
            )
            .await?;
        self.expect(";")?;
        self.declaration(
            start,
            DeclarationKind::SpirvInstruction {
                instruction,
                prototype,
            },
        )
    }

    async fn parse_spirv_execution_mode(self) -> Result<Spanned<SpirvExecutionMode>> {
        let start = self.start();
        let kind = if self.eat_word("spirv_execution_mode_id") {
            SpirvExecutionModeKind::Id
        } else {
            self.advance();
            SpirvExecutionModeKind::Literal
        };
        self.expect("(")?;
        let requirements = self.parse_spirv_requirements()?;
        let mode = self.parse_spirv_token(SpirvToken::Int)?;
        let mut operands = Vec::new();
        if kind == SpirvExecutionModeKind::Id {
            self.expect(",")?;
            loop {
                operands.push(
                    self.call(self.clone().parse_conditional())
                        .await?
                        .expression,
                );
                if !self.eat(",") {
                    break;
                }
            }
        } else {
            while self.eat(",") {
                operands.push(self.parse_spirv_token(SpirvToken::Any)?);
            }
        }
        self.expect(")")?;
        Ok(self.spanned(
            start,
            SpirvExecutionMode {
                kind,
                requirements,
                mode,
                operands,
            },
        ))
    }

    async fn parse_spirv_type_specifier(self) -> Result<SpirvTypeSpecifier> {
        self.advance();
        self.expect("(")?;
        let requirements = self.parse_spirv_requirements()?;
        let instruction = self.parse_spirv_instruction_qualifiers()?;
        let mut parameters = Vec::new();
        while self.eat(",") {
            let parameter = match self.peek().kind {
                TokenKind::Word(word) if word == "struct" || self.is_type_name(word) => {
                    SpirvTypeParameter::Type(Box::new(
                        self.call(self.clone().parse_type_specifier()).await?,
                    ))
                }
                _ => SpirvTypeParameter::Constant(
                    self.call(self.clone().parse_conditional())
                        .await?
                        .expression,
                ),
            };
            parameters.push(parameter);
        }
        self.expect(")")?;
        Ok(SpirvTypeSpecifier {
            requirements,
            instruction,
            parameters,
        })
    }

    async fn parse_parameter_declaration(self) -> Result<Node<ParameterDeclaration>> {
        let start = self.start();
        let qualifier = self.call(self.clone().parse_type_qualifier()).await?;
        let specifier = self.call(self.clone().parse_type_specifier()).await?;
        let ty = self.spanned(
            start,
            FullySpecifiedType {
                qualifier,
                specifier,
            },
        );
        let (name, array) = if matches!(self.peek().kind, TokenKind::Word(_)) {
            (
                Some(self.identifier()?),
                self.call(self.clone().parse_array_specifier()).await?,
            )
        } else {
            (None, None)
        };
        self.node(start, ParameterDeclaration { ty, name, array })
    }

    async fn parse_init_declarator(self, name: Identifier) -> Result<Node<InitDeclarator>> {
        let start = name.span.start;
        let array = self.call(self.clone().parse_array_specifier()).await?;
        let initializer = if self.eat("=") {
            Some(self.call(self.clone().parse_initializer()).await?)
        } else {
            None
        };
        self.node(
            start,
            InitDeclarator {
                name,
                array,
                initializer,
            },
        )
    }

    async fn parse_initializer(self) -> Result<Spanned<Initializer>> {
        let start = self.start();
        if !self.eat("{") {
            let expression = self.call(self.clone().parse_assignment()).await?.expression;
            return Ok(self.spanned(start, Initializer::Expression(expression)));
        }
        let mut elements = Vec::new();
        while !self.at("}") {
            elements.push(self.call(self.clone().parse_initializer()).await?);
            if !self.eat(",") {
                break;
            }
        }
        self.expect("}")?;
        Ok(self.spanned(start, Initializer::List(elements)))
    }

    async fn parse_type_qualifier(self) -> Result<Option<Spanned<TypeQualifier>>> {
        let start = self.start();
        let mut qualifiers = Vec::new();
        while let TokenKind::Word(word) = self.peek().kind {
            let single_start = self.start();
            let single = if word == "layout" {
                self.advance();
                SingleTypeQualifier::Layout(self.call(self.clone().parse_layout_qualifier()).await?)
            } else if word == "subroutine" {
                self.advance();
                SingleTypeQualifier::Subroutine(self.parse_type_name_list()?)
            } else if word == NON_UNIFORM && self.at_nth(1, "(") {
                break;
            } else if self.is_spirv_word(word, &SPIRV_QUALIFIERS) {
                self.parse_spirv_qualifier(word)?
            } else if let Some(single) = SingleTypeQualifier::from_keyword(word) {
                if single == SingleTypeQualifier::NonUniform {
                    self.require_non_uniform(self.peek().span)?;
                }
                self.advance();
                single
            } else {
                break;
            };
            qualifiers.push(self.spanned(single_start, single));
        }
        if qualifiers.is_empty() {
            Ok(None)
        } else {
            Ok(Some(self.spanned(start, TypeQualifier { qualifiers })))
        }
    }

    async fn parse_layout_qualifier(self) -> Result<LayoutQualifier> {
        self.expect("(")?;
        let mut ids = Vec::new();
        loop {
            let start = self.start();
            let name = if self.at_word("shared") {
                let token = self.advance();
                Spanned::new(token.span, String::from("shared"))
            } else {
                self.identifier()?
            };
            let value = if self.eat("=") {
                Some(self.call(self.clone().parse_assignment()).await?.expression)
            } else {
                None
            };
            ids.push(self.spanned(start, LayoutQualifierId { name, value }));
            if !self.eat(",") {
                break;
            }
        }
        self.expect(")")?;
        Ok(LayoutQualifier { ids })
    }

    async fn parse_type_specifier(self) -> Result<Spanned<TypeSpecifier>> {
        let token = self.peek();
        let TokenKind::Word(word) = token.kind else {
            return Err(self.unexpected("a type"));
        };
        let non_array = self
            .call(self.clone().parse_type_specifier_non_array(token, word))
            .await?;
        self.call(self.clone().finish_type_specifier(token, non_array))
            .await
    }

    async fn parse_type_specifier_non_array(
        self,
        token: Token<'a>,
        word: &'a str,
    ) -> Result<TypeSpecifierNonArray> {
        if word == "struct" {
            self.call(self.clone().parse_struct_specifier())
                .await
                .map(TypeSpecifierNonArray::Struct)
        } else if self.is_spirv_word(word, &[SPIRV_TYPE]) {
            self.call(self.clone().parse_spirv_type_specifier())
                .await
                .map(|spirv| TypeSpecifierNonArray::Spirv(Box::new(spirv)))
        } else {
            self.parse_simple_type_specifier(token, word)
        }
    }

    async fn finish_type_specifier(
        self,
        token: Token<'a>,
        non_array: TypeSpecifierNonArray,
    ) -> Result<Spanned<TypeSpecifier>> {
        let parameters = if self.at("<")
            && !matches!(
                non_array,
                TypeSpecifierNonArray::Struct(_) | TypeSpecifierNonArray::Spirv(_)
            ) {
            Some(self.call(self.clone().parse_type_parameters()).await?)
        } else {
            None
        };
        let array = self.call(self.clone().parse_array_specifier()).await?;
        let specifier = TypeSpecifier {
            non_array,
            parameters,
            array,
        };
        Ok(self.spanned(token.span.start, specifier))
    }

    async fn parse_type_parameters(self) -> Result<Spanned<TypeParameters>> {
        let start = self.start();
        self.expect("<")?;
        let element = match self.peek().kind {
            TokenKind::Word(word) if word == "struct" || self.is_type_name(word) => Some(Box::new(
                self.call(self.clone().parse_type_specifier()).await?,
            )),
            _ => None,
        };
        let mut values = Vec::new();
        if element.is_none() || self.at(",") {
            if element.is_some() {
                self.advance();
            }
            loop {
                let value = self.call(self.clone().parse_unary()).await?;
                values.push(value.expression);
                if !self.eat(",") {
                    break;
                }
            }
        }
        self.expect(">")?;
        Ok(self.spanned(start, TypeParameters { element, values }))
    }

    async fn parse_array_specifier(self) -> Result<Option<Spanned<ArraySpecifier>>> {
        let start = self.start();
        let mut dimensions = Vec::new();
        while self.at("[") {
            let dimension_start = self.start();
            self.advance();
            let dimension = if self.at("]") {
                ArrayDimension::Unsized
            } else {
                let size = self.call(self.clone().parse_conditional()).await?;
                ArrayDimension::Sized(size.expression)
            };
            self.expect("]")?;
            dimensions.push(self.spanned(dimension_start, dimension));
        }
        if dimensions.is_empty() {
            Ok(None)
        } else {
            Ok(Some(self.spanned(start, ArraySpecifier { dimensions })))
        }
    }

    async fn parse_struct_specifier(self) -> Result<StructSpecifier> {
        self.expect_word("struct")?;
        let name_token = self.peek();
        let name = if self.at("{") {
            None
        } else {
            Some(self.identifier()?)
        };
        let declarations = self
            .call(self.clone().parse_struct_declaration_list())
            .await?;
        if let (Some(_), TokenKind::Word(word)) = (&name, name_token.kind) {
            self.declare_struct(word);
        }
        Ok(StructSpecifier { name, declarations })
    }

    async fn parse_struct_declaration_list(self) -> Result<Vec<Spanned<StructDeclaration>>> {
        self.expect("{")?;
        let mut declarations = Vec::new();
        loop {
            declarations.push(self.call(self.clone().parse_struct_declaration()).await?);
            if self.eat("}") {
                return Ok(declarations);
            }
        }
    }

    async fn parse_struct_declaration(self) -> Result<Spanned<StructDeclaration>> {
        let start = self.start();
        let qualifier = self.call(self.clone().parse_type_qualifier()).await?;
        let specifier = if qualifier.is_some() && self.at("{") {
            self.call(self.clone().parse_inline_block()).await?
        } else {
            self.call(self.clone().parse_type_specifier()).await?
        };
        self.call(
            self.clone()
                .finish_struct_declaration(start, qualifier, specifier),
        )
        .await
    }

    async fn parse_inline_block(self) -> Result<Spanned<TypeSpecifier>> {
        let block_start = self.start();
        let members = self
            .call(self.clone().parse_struct_declaration_list())
            .await?;
        let non_array = TypeSpecifierNonArray::InlineBlock(members);
        Ok(self.spanned(
            block_start,
            TypeSpecifier {
                non_array,
                parameters: None,
                array: None,
            },
        ))
    }

    async fn finish_struct_declaration(
        self,
        start: u32,
        qualifier: Option<Spanned<TypeQualifier>>,
        specifier: Spanned<TypeSpecifier>,
    ) -> Result<Spanned<StructDeclaration>> {
        let ty = self.spanned(
            start,
            FullySpecifiedType {
                qualifier,
                specifier,
            },
        );
        let mut declarators = Vec::new();
        loop {
            let name = self.identifier()?;
            let array = self.call(self.clone().parse_array_specifier()).await?;
            declarators.push(self.spanned(name.span.start, StructDeclarator { name, array }));
            if !self.eat(",") {
                break;
            }
        }
        self.expect(";")?;
        Ok(self.spanned(start, StructDeclaration { ty, declarators }))
    }

    async fn parse_compound_statement(self) -> Result<Spanned<CompoundStatement>> {
        let start = self.start();
        self.expect("{")?;
        self.struct_scopes.borrow_mut().push();
        let statements = self.call(self.clone().parse_statement_list()).await;
        self.struct_scopes.borrow_mut().pop();
        let statements = statements?;
        self.expect("}")?;
        Ok(self.spanned(start, CompoundStatement { statements }))
    }

    async fn parse_statement_list(self) -> Result<Vec<Statement>> {
        let mut statements = Vec::new();
        while !self.at("}") {
            if self.peek().kind == TokenKind::End {
                return Err(self.unexpected("`}`"));
            }
            statements.push(self.call(self.clone().parse_statement()).await?);
        }
        Ok(statements)
    }

    async fn parse_statement(self) -> Result<Statement> {
        match self.peek().kind {
            TokenKind::Punctuator("{") => {
                self.call(self.clone().parse_compound_as_statement()).await
            }
            TokenKind::Word("if") => self.call(self.clone().parse_selection()).await,
            TokenKind::Word("switch") => self.call(self.clone().parse_switch()).await,
            TokenKind::Word("case") => self.call(self.clone().parse_case_label()).await,
            TokenKind::Word("default") => self.parse_default_label(),
            TokenKind::Word("while") => self.call(self.clone().parse_while()).await,
            TokenKind::Word("do") => self.call(self.clone().parse_do_while()).await,
            TokenKind::Word("for") => self.call(self.clone().parse_for()).await,
            TokenKind::Word("continue") => self.parse_jump(JumpStatement::Continue),
            TokenKind::Word("break") => self.parse_jump(JumpStatement::Break),
            TokenKind::Word("discard") => self.parse_jump(JumpStatement::Discard),
            TokenKind::Word("demote") => self.parse_jump(JumpStatement::Demote),
            TokenKind::Word("terminateRayEXT") => self.parse_jump(JumpStatement::TerminateRay),
            TokenKind::Word("ignoreIntersectionEXT") => {
                self.parse_jump(JumpStatement::IgnoreIntersection)
            }
            TokenKind::Word("return") => self.call(self.clone().parse_return()).await,
            TokenKind::Punctuator("[") if self.at_attribute_list() => {
                self.call(self.clone().parse_attributed()).await
            }
            _ => self.call(self.clone().parse_simple_statement()).await,
        }
    }

    async fn parse_attributed(self) -> Result<Statement> {
        let start = self.start();
        let attributes = self.call(self.clone().parse_attribute_list()).await?;
        if !matches!(
            self.peek().kind,
            TokenKind::Word("if" | "switch" | "while" | "do" | "for")
        ) {
            return Err(self.unexpected("a selection, switch or iteration statement"));
        }
        let statement = Box::new(self.call(self.clone().parse_statement()).await?);
        self.node(
            start,
            StatementKind::Attributed {
                attributes,
                statement,
            },
        )
    }

    async fn parse_attribute_list(self) -> Result<Vec<Attribute>> {
        self.expect("[")?;
        self.expect("[")?;
        let mut attributes = Vec::new();
        loop {
            let token = self.peek();
            let TokenKind::Word(word) = token.kind else {
                return Err(self.unexpected("an attribute"));
            };
            self.advance();
            let name = Spanned::new(token.span, word.to_owned());
            let argument = if self.eat("(") {
                let argument = self
                    .call(self.clone().parse_conditional())
                    .await?
                    .expression;
                self.expect(")")?;
                Some(argument)
            } else {
                None
            };
            attributes.push(Attribute { name, argument });
            if !self.eat(",") {
                break;
            }
        }
        self.expect("]")?;
        self.expect("]")?;
        Ok(attributes)
    }

    async fn parse_compound_as_statement(self) -> Result<Statement> {
        let start = self.start();
        let compound = self
            .call(self.clone().parse_compound_statement())
            .await?
            .node;
        self.node(start, StatementKind::Compound(compound))
    }

    async fn parse_simple_statement(self) -> Result<Statement> {
        let start = self.start();
        let kind = if self.eat(";") {
            StatementKind::Expression(None)
        } else if self.starts_declaration() {
            StatementKind::Declaration(Box::new(self.call(self.clone().parse_declaration()).await?))
        } else {
            let expression = self.call(self.clone().parse_expression()).await?.expression;
            self.expect(";")?;
            StatementKind::Expression(Some(expression))
        };
        self.node(start, kind)
    }

    async fn parse_case_label(self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("case")?;
        let label = self.call(self.clone().parse_expression()).await?.expression;
        self.expect(":")?;
        self.node(start, StatementKind::CaseLabel(CaseLabel::Case(label)))
    }

    async fn parse_return(self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("return")?;
        let value = if self.at(";") {
            None
        } else {
            Some(self.call(self.clone().parse_expression()).await?.expression)
        };
        self.expect(";")?;
        self.node(start, StatementKind::Jump(JumpStatement::Return(value)))
    }

    async fn parse_parenthesized_expression(self) -> Result<Expression> {
        self.expect("(")?;
        let expression = self.call(self.clone().parse_expression()).await?.expression;
        self.expect(")")?;
        Ok(expression)
    }

    async fn parse_selection(self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("if")?;
        let condition = self
            .call(self.clone().parse_parenthesized_expression())
            .await?;
        let then_branch = Box::new(self.call(self.clone().parse_statement()).await?);
        let else_branch = if self.eat_word("else") {
            Some(Box::new(self.call(self.clone().parse_statement()).await?))
        } else {
            None
        };
        let kind = StatementKind::Selection {
            condition,
            then_branch,
            else_branch,
        };
        self.node(start, kind)
    }

    async fn parse_switch(self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("switch")?;
        let selector = self
            .call(self.clone().parse_parenthesized_expression())
            .await?;
        self.expect("{")?;
        self.struct_scopes.borrow_mut().push();
        let statements = self.call(self.clone().parse_statement_list()).await;
        self.struct_scopes.borrow_mut().pop();
        let statements = statements?;
        self.expect("}")?;
        let kind = StatementKind::Switch {
            selector,
            statements,
        };
        self.node(start, kind)
    }

    async fn parse_condition(self) -> Result<Condition> {
        if !self.starts_declaration() {
            return Ok(Condition::Expression(
                self.call(self.clone().parse_expression()).await?.expression,
            ));
        }
        let start = self.start();
        let qualifier = self.call(self.clone().parse_type_qualifier()).await?;
        let specifier = self.call(self.clone().parse_type_specifier()).await?;
        let ty = self.spanned(
            start,
            FullySpecifiedType {
                qualifier,
                specifier,
            },
        );
        let name = self.identifier()?;
        self.expect("=")?;
        let initializer = self.call(self.clone().parse_initializer()).await?;
        let declaration = ConditionDeclaration {
            ty,
            name,
            initializer,
        };
        Ok(Condition::Declaration(Box::new(
            self.node(start, declaration)?,
        )))
    }

    async fn parse_while(self) -> Result<Statement> {
        self.struct_scopes.borrow_mut().push();
        let statement = self.call(self.clone().parse_unscoped_while()).await;
        self.struct_scopes.borrow_mut().pop();
        statement
    }

    async fn parse_unscoped_while(self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("while")?;
        self.expect("(")?;
        let condition = self.call(self.clone().parse_condition()).await?;
        self.expect(")")?;
        let body = Box::new(self.call(self.clone().parse_statement()).await?);
        self.node(start, StatementKind::While { condition, body })
    }

    async fn parse_do_while(self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("do")?;
        let body = Box::new(self.call(self.clone().parse_statement()).await?);
        self.expect_word("while")?;
        let condition = self
            .call(self.clone().parse_parenthesized_expression())
            .await?;
        self.expect(";")?;
        self.node(start, StatementKind::DoWhile { body, condition })
    }

    async fn parse_for(self) -> Result<Statement> {
        self.struct_scopes.borrow_mut().push();
        let statement = self.call(self.clone().parse_unscoped_for()).await;
        self.struct_scopes.borrow_mut().pop();
        statement
    }

    async fn parse_unscoped_for(self) -> Result<Statement> {
        let start = self.start();
        let header = self.call(self.clone().parse_for_header()).await?;
        let body = self.call(self.clone().parse_statement()).await?;
        self.finish_for(start, header, body)
    }

    async fn parse_for_header(self) -> Result<Box<ForHeader>> {
        self.expect_word("for")?;
        self.expect("(")?;
        let init = self.call(self.clone().parse_simple_statement()).await?;
        let condition = if self.at(";") {
            None
        } else {
            Some(self.call(self.clone().parse_condition()).await?)
        };
        self.expect(";")?;
        let increment = if self.at(")") {
            None
        } else {
            Some(self.call(self.clone().parse_expression()).await?.expression)
        };
        self.expect(")")?;
        Ok(Box::new(ForHeader {
            init,
            condition,
            increment,
        }))
    }

    async fn parse_expression(self) -> Result<Parsed> {
        let start = self.start();
        let first = self.call(self.clone().parse_assignment()).await?;
        if self.at(",") {
            self.call(self.clone().parse_sequence(start, first)).await
        } else {
            Ok(first)
        }
    }

    async fn parse_sequence(self, start: u32, first: Parsed) -> Result<Parsed> {
        let mut expressions = Vec::from([first.expression]);
        while self.eat(",") {
            let next = self.call(self.clone().parse_assignment()).await?;
            expressions.push(next.expression);
        }
        self.parsed(start, ExpressionKind::Sequence(expressions))
    }

    async fn parse_assignment(self) -> Result<Parsed> {
        self.call(self.clone().parse_right_chain(true)).await
    }

    async fn parse_conditional(self) -> Result<Parsed> {
        self.call(self.clone().parse_right_chain(false)).await
    }

    async fn parse_right_chain(self, assigning: bool) -> Result<Parsed> {
        let mut pending = Vec::new();
        let innermost = loop {
            let start = self.start();
            let operand = self.call(self.clone().parse_binary()).await?;
            if self.eat("?") {
                let then_expression = self.call(self.clone().parse_expression()).await?;
                self.expect(":")?;
                pending.push(PendingRight::Conditional {
                    start,
                    condition: operand,
                    then_expression,
                });
                continue;
            }
            let operator = match self.peek().kind {
                TokenKind::Punctuator(symbol) if assigning || !pending.is_empty() => {
                    AssignmentOperator::from_symbol(symbol)
                }
                _ => None,
            };
            let Some(operator) = operator else {
                break operand;
            };
            if matches!(operand.expression.kind, ExpressionKind::Binary { .. }) {
                return Err(self.unexpected("the end of the expression"));
            }
            self.advance();
            pending.push(PendingRight::Assignment {
                start,
                target: operand,
                operator,
            });
        };
        let mut result = innermost;
        while let Some(right) = pending.pop() {
            result = self.reduce_right(right, result)?;
        }
        Ok(result)
    }

    async fn parse_binary(self) -> Result<Parsed> {
        let start = self.start();
        let first = self.call(self.clone().parse_unary()).await?;
        if self.peek_binary_operator().is_some() {
            self.call(self.clone().parse_binary_operands(start, first))
                .await
        } else {
            Ok(first)
        }
    }

    async fn parse_binary_operands(self, start: u32, first: Parsed) -> Result<Parsed> {
        let mut pending = PendingBinary {
            operands: Vec::from([(start, first)]),
            operators: Vec::new(),
        };
        while let Some(operator) = self.peek_binary_operator() {
            while pending
                .operators
                .last()
                .is_some_and(|waiting| waiting.precedence() >= operator.precedence())
            {
                self.reduce_binary(&mut pending)?;
            }
            self.advance();
            pending.operators.push(operator);
            let operand_start = self.start();
            let operand = self.call(self.clone().parse_unary()).await?;
            pending.operands.push((operand_start, operand));
        }
        while !pending.operators.is_empty() {
            self.reduce_binary(&mut pending)?;
        }
        match pending.operands.pop() {
            Some((_, expression)) if pending.operands.is_empty() => Ok(expression),
            _ => Err(self.unexpected("an expression")),
        }
    }

    async fn parse_unary(self) -> Result<Parsed> {
        self.call(self.clone().parse_unary_chain()).await
    }

    async fn parse_unary_chain(self) -> Result<Parsed> {
        let mut operators = Vec::new();
        while let TokenKind::Punctuator(symbol) = self.peek().kind {
            let Some(operator) = UnaryOperator::from_symbol(symbol) else {
                break;
            };
            operators.push((self.start(), operator));
            self.advance();
        }
        let mut result = if self.starts_cast() {
            self.call(self.clone().parse_cast()).await?
        } else {
            self.call(self.clone().parse_postfix()).await?
        };
        while let Some((start, operator)) = operators.pop() {
            let kind = ExpressionKind::Unary {
                operator,
                operand: Box::new(result.expression),
            };
            result = self.parsed(start, kind)?;
        }
        Ok(result)
    }

    async fn parse_cast(self) -> Result<Parsed> {
        let start = self.start();
        self.expect("(")?;
        let name = match self.peek().kind {
            TokenKind::Word(word) if !self.is_type_name(word) => Some(word),
            _ => None,
        };
        let specifier = match name {
            Some(word) => {
                let span = self.peek().span;
                self.advance();
                let specifier = TypeSpecifier {
                    non_array: TypeSpecifierNonArray::TypeName(word.to_owned()),
                    parameters: None,
                    array: None,
                };
                Spanned::new(span, specifier)
            }
            None => self.call(self.clone().parse_type_specifier()).await?,
        };
        self.expect(")")?;
        let operand = self.call(self.clone().parse_unary()).await?;
        let function = Spanned::new(
            specifier.span,
            FunctionIdentifier::Cast(Box::new(specifier.node)),
        );
        let kind = ExpressionKind::FunctionCall(Box::new(FunctionCall {
            function,
            arguments: alloc::vec![operand.expression],
        }));
        self.parsed(start, kind)
    }

    async fn parse_postfix(self) -> Result<Parsed> {
        let start = self.start();
        let mut base = self.call(self.clone().parse_primary()).await?;
        while self.at_postfix() {
            base = self
                .call(self.clone().parse_postfix_step(start, base))
                .await?;
        }
        Ok(base)
    }

    async fn parse_postfix_step(self, start: u32, base: Parsed) -> Result<Parsed> {
        match self.peek().kind {
            TokenKind::Punctuator("[") => {
                self.call(self.clone().parse_subscript(start, base)).await
            }
            TokenKind::Punctuator(".") => {
                self.call(self.clone().parse_field_selection(start, base))
                    .await
            }
            TokenKind::Punctuator("(") => {
                self.call(self.clone().parse_expression_call(start, base))
                    .await
            }
            TokenKind::Punctuator("++") => {
                self.parse_postfix_operator(start, base, PostfixOperator::Increment)
            }
            _ => self.parse_postfix_operator(start, base, PostfixOperator::Decrement),
        }
    }

    async fn parse_expression_call(self, start: u32, base: Parsed) -> Result<Parsed> {
        let callee = FunctionIdentifier::Expression(Box::new(base.expression));
        let function = self.spanned(start, callee);
        self.call(self.clone().parse_call(start, function)).await
    }

    async fn parse_subscript(self, start: u32, base: Parsed) -> Result<Parsed> {
        self.expect("[")?;
        let index = self.call(self.clone().parse_expression()).await?;
        self.expect("]")?;
        let kind = ExpressionKind::Subscript {
            base: Box::new(base.expression),
            index: Box::new(index.expression),
        };
        self.parsed(start, kind)
    }

    async fn parse_field_selection(self, start: u32, base: Parsed) -> Result<Parsed> {
        self.expect(".")?;
        let field = self.identifier()?;
        if self.at("(") {
            let method = FunctionIdentifier::Method {
                object: Box::new(base.expression),
                name: field,
            };
            let function = self.spanned(start, method);
            return self.call(self.clone().parse_call(start, function)).await;
        }
        let kind = ExpressionKind::FieldSelection {
            base: Box::new(base.expression),
            field,
        };
        self.parsed(start, kind)
    }

    async fn parse_call(self, start: u32, function: Spanned<FunctionIdentifier>) -> Result<Parsed> {
        self.expect("(")?;
        let mut arguments = Vec::new();
        let is_void_list = self.at_word("void") && self.at_nth(1, ")");
        if is_void_list {
            self.advance();
        } else if !self.at(")") {
            loop {
                let argument = self.call(self.clone().parse_assignment()).await?;
                arguments.push(argument.expression);
                if !self.eat(",") {
                    break;
                }
            }
        }
        self.expect(")")?;
        let call = FunctionCall {
            function,
            arguments,
        };
        self.parsed(start, ExpressionKind::FunctionCall(Box::new(call)))
    }

    async fn parse_primary(self) -> Result<Parsed> {
        let token = self.peek();
        match token.kind {
            TokenKind::Number { .. } | TokenKind::String(_) | TokenKind::Word("true" | "false") => {
                self.parse_literal(token)
            }
            TokenKind::Punctuator("(") => self.call(self.clone().parse_parenthesized()).await,
            TokenKind::Word(NON_UNIFORM) if self.at_nth(1, "(") => {
                self.call(self.clone().parse_non_uniform(token)).await
            }
            TokenKind::Word(word) if self.starts_constructor(word) => {
                self.call(self.clone().parse_constructor()).await
            }
            TokenKind::Word(word) if !is_reserved_word(word) => {
                self.call(self.clone().parse_name(token, word)).await
            }
            TokenKind::Word(word) if is_unavailable_word(word) => {
                Err(self.error(ParseErrorKind::ReservedWord(word.to_owned()), token.span))
            }
            _ => Err(self.unexpected("an expression")),
        }
    }

    async fn parse_non_uniform(self, token: Token<'a>) -> Result<Parsed> {
        self.require_non_uniform(token.span)?;
        self.advance();
        let function = Spanned::new(
            token.span,
            FunctionIdentifier::Function(NON_UNIFORM.to_owned()),
        );
        self.call(self.clone().parse_call(token.span.start, function))
            .await
    }

    async fn parse_name(self, token: Token<'a>, word: &str) -> Result<Parsed> {
        let start = token.span.start;
        self.advance();
        if self.at("(") {
            let function = Spanned::new(token.span, FunctionIdentifier::Function(word.to_owned()));
            self.call(self.clone().parse_call(start, function)).await
        } else {
            self.parsed(start, ExpressionKind::Variable(word.to_owned()))
        }
    }

    async fn parse_parenthesized(self) -> Result<Parsed> {
        let start = self.start();
        self.expect("(")?;
        let inner = self.call(self.clone().parse_expression()).await?;
        self.expect(")")?;
        let kind = ExpressionKind::Parenthesized(Box::new(inner.expression));
        self.parsed(start, kind)
    }

    async fn parse_constructor(self) -> Result<Parsed> {
        let start = self.start();
        let specifier = self.call(self.clone().parse_type_specifier()).await?;
        let function = Spanned::new(
            specifier.span,
            FunctionIdentifier::Constructor(Box::new(specifier.node)),
        );
        self.call(self.clone().parse_call(start, function)).await
    }
}
