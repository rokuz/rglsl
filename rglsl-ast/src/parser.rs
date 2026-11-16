use alloc::borrow::ToOwned;
use alloc::boxed::Box;
use alloc::collections::{BTreeMap, BTreeSet};
use alloc::format;
use alloc::string::String;
use alloc::vec::Vec;

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
use crate::keywords::{WordClass, is_reserved_word, is_unavailable_word};
use crate::lexer::{Token, TokenKind, tokenize};
use crate::opaque::OpaqueKeyword;
use crate::span::Span;
use rglsl_types::extension::Extension;
use rglsl_types::stack::recurse;

pub const NON_UNIFORM: &str = "nonuniformEXT";
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

enum QualifierStart<'a> {
    Layout,
    Subroutine,
    Spirv(&'a str),
    Single(SingleTypeQualifier),
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
        if let Some(scope) = self.scopes.last_mut()
            && scope.insert(name)
        {
            *self.visible.entry(name).or_default() += 1;
        }
    }
}

struct Parser<'a> {
    source: &'a str,
    tokens: Vec<Token<'a>>,
    directives: Vec<Directive>,
    strings: Vec<String>,
    end: Token<'a>,
    cursor: usize,
    previous_end: u32,
    next_id: u32,
    struct_scopes: StructScopes<'a>,
    extensions: ExtensionState,
    partial_function: Option<PartialFunction>,
}

struct PartialFunction {
    start: u32,
    definition: FunctionDefinition,
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
        Err(error) => return (TranslationUnit::new(Vec::new(), 0), Some(error)),
    };
    let mut parser = Parser {
        source,
        tokens: lexed.tokens,
        directives: lexed.directives,
        strings: lexed.strings,
        end: lexed.end,
        cursor: 0,
        previous_end: 0,
        next_id: 0,
        struct_scopes: StructScopes::new(&["gl_TextureFootprint2DNV", "gl_TextureFootprint3DNV"]),
        extensions: ExtensionState::new(),
        partial_function: None,
    };
    let mut external_declarations = Vec::new();
    let mut failure = None;
    while parser.peek().kind != TokenKind::End {
        match parser.parse_external_declaration() {
            Ok(external) => external_declarations.push(external),
            Err(error) => {
                if let Some(partial) = parser.partial_function.take() {
                    let end = partial.definition.body.span.end;
                    let id = NodeId::saturating(parser.next_id);
                    external_declarations.push(ExternalDeclaration::FunctionDefinition(Node::new(
                        id,
                        Span::new(partial.start, end),
                        partial.definition,
                    )));
                    parser.next_id = parser.next_id.saturating_add(1);
                }
                failure = Some(*error);
                break;
            }
        }
    }
    let unit = TranslationUnit::new(external_declarations, parser.next_id);
    (unit, failure)
}

impl<'a> Parser<'a> {
    fn token_at(&self, index: usize) -> Token<'a> {
        self.tokens.get(index).copied().unwrap_or(self.end)
    }

    fn peek(&self) -> Token<'a> {
        self.token_at(self.cursor)
    }

    fn peek_nth(&self, distance: usize) -> Token<'a> {
        self.token_at(self.cursor.saturating_add(distance))
    }

    fn advance(&mut self) -> Token<'a> {
        let token = self.peek();
        let cursor = self.cursor;
        if cursor < self.tokens.len() {
            self.cursor = cursor + 1;
            self.previous_end = token.span.end;
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
        matches!(self.peek().kind, TokenKind::Word(found, _) if found == word)
    }

    fn eat(&mut self, punctuator: &str) -> bool {
        let found = self.at(punctuator);
        if found {
            self.advance();
        }
        found
    }

    fn eat_word(&mut self, word: &str) -> bool {
        let found = self.at_word(word);
        if found {
            self.advance();
        }
        found
    }

    fn expect(&mut self, punctuator: &str) -> Result<Span> {
        if self.at(punctuator) {
            Ok(self.advance().span)
        } else {
            Err(self.unexpected(&format!("`{punctuator}`")))
        }
    }

    fn expect_word(&mut self, word: &str) -> Result<Span> {
        if self.at_word(word) {
            Ok(self.advance().span)
        } else {
            Err(self.unexpected(&format!("`{word}`")))
        }
    }

    fn error(&self, kind: ParseErrorKind, span: Span) -> Box<ParseError> {
        Box::new(ParseError::new(kind, span, self.source))
    }

    fn string_literal(&self, index: usize, span: Span) -> Result<String> {
        self.strings
            .get(index)
            .cloned()
            .ok_or_else(|| self.error(ParseErrorKind::Internal, span))
    }

    fn unexpected(&self, expected: &str) -> Box<ParseError> {
        let token = self.peek();
        let found = match token.kind {
            TokenKind::Word(text, _) | TokenKind::Number { text, .. } => format!("`{text}`"),
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
        Span::new(start, self.previous_end.max(start))
    }

    fn spanned<T>(&self, start: u32, value: T) -> Spanned<T> {
        Spanned::new(self.span_from(start), value)
    }

    fn node<K>(&mut self, start: u32, kind: K) -> Result<Node<K>> {
        let span = self.span_from(start);
        let current = self.next_id;
        let (Some(id), Some(next)) = (NodeId::new(current), current.checked_add(1)) else {
            return Err(self.error(ParseErrorKind::TooManyNodes, span));
        };
        self.next_id = next;
        Ok(Node::new(id, span, kind))
    }

    fn identifier(&mut self) -> Result<Identifier> {
        let token = self.peek();
        match token.kind {
            TokenKind::Word(word, class) if class.is_reserved() => {
                Err(self.error(ParseErrorKind::ReservedWord(word.to_owned()), token.span))
            }
            TokenKind::Word(word, _) => {
                self.advance();
                Ok(Spanned::new(token.span, word.to_owned()))
            }
            _ => Err(self.unexpected("an identifier")),
        }
    }

    fn require_type_extension(&self, word: &str, span: Span) -> Result<()> {
        if self.extensions.keyword_enabled(word) {
            return Ok(());
        }
        let extensions = Feature::of_type_keyword(word).map_or(&[][..], Feature::extensions);
        Err(self.error(
            ParseErrorKind::ExtensionRequired {
                word: word.to_owned(),
                extensions,
            },
            span,
        ))
    }

    fn require_non_uniform(&self, span: Span) -> Result<()> {
        if self.extensions.is_on(Extension::ExtNonuniformQualifier) {
            return Ok(());
        }
        Err(self.error(
            ParseErrorKind::ExtensionRequired {
                word: NON_UNIFORM.to_owned(),
                extensions: &[Extension::ExtNonuniformQualifier],
            },
            span,
        ))
    }

    fn is_struct_name(&self, word: &str) -> bool {
        self.struct_scopes.contains(word)
    }

    fn is_type_name(&self, word: &str, class: WordClass) -> bool {
        class.is_type_keyword()
            || self.is_struct_name(word)
            || self.is_spirv_word(word, &[SPIRV_TYPE])
    }

    fn is_spirv_word(&self, word: &str, words: &[&str]) -> bool {
        words.contains(&word) && self.extensions.is_on(Extension::ExtSpirvIntrinsics)
    }

    fn declare_struct(&mut self, name: &'a str) {
        self.struct_scopes.declare(name);
    }

    fn token_after_array_specifier(&self) -> TokenKind<'a> {
        let mut index = self.cursor.saturating_add(1);
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
        let TokenKind::Word(word, class) = self.peek().kind else {
            return false;
        };
        if word == NON_UNIFORM && self.at_nth(1, "(") {
            return false;
        }
        if matches!(word, "precision" | "struct" | "layout" | "subroutine")
            || (class.is_keyword() && SingleTypeQualifier::from_keyword(word).is_some())
            || self.is_spirv_word(word, &SPIRV_QUALIFIERS)
            || self.is_spirv_word(word, &SPIRV_DECLARATIONS)
            || self.is_spirv_word(word, &[SPIRV_TYPE])
        {
            return true;
        }
        self.is_type_name(word, class)
            && matches!(self.token_after_array_specifier(), TokenKind::Word(..))
    }

    fn starts_constructor(&self, word: &str, class: WordClass) -> bool {
        if class.is_type_keyword() {
            return word != "void";
        }
        self.is_struct_name(word)
            && matches!(
                self.token_after_array_specifier(),
                TokenKind::Punctuator("(")
            )
    }

    fn declaration(&mut self, start: u32, kind: DeclarationKind) -> Result<ExternalDeclaration> {
        Ok(ExternalDeclaration::Declaration(self.node(start, kind)?))
    }

    fn is_spirv_word_here(&self, words: &[&str]) -> bool {
        matches!(self.peek().kind, TokenKind::Word(word, _) if self.is_spirv_word(word, words))
    }

    fn at_spirv_requirement(&self) -> bool {
        matches!(self.peek().kind, TokenKind::Word(..))
            && self.at_nth(1, "=")
            && self.at_nth(2, "[")
    }

    fn parse_spirv_requirements(&mut self) -> Result<Vec<Spanned<SpirvRequirement>>> {
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
        &mut self,
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
                && matches!(self.peek_nth(1).kind, TokenKind::Word(..))
                && self.at_nth(2, "=");
            if !another {
                break;
            }
            self.advance();
        }
        Ok(qualifiers)
    }

    fn parse_spirv_token(&mut self, accepted: SpirvToken) -> Result<Expression> {
        let token = self.peek();
        let start = token.span.start;
        let kind = match (token.kind, accepted) {
            (TokenKind::String(index), SpirvToken::String | SpirvToken::Any) => {
                ExpressionKind::String(self.string_literal(index, token.span)?)
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
                TokenKind::Word(word @ ("true" | "false"), _),
                SpirvToken::Scalar | SpirvToken::Any | SpirvToken::ScalarOrName,
            ) => ExpressionKind::Bool(word == "true"),
            (TokenKind::Word(word, class), SpirvToken::ScalarOrName) if !class.is_reserved() => {
                ExpressionKind::Variable(word.to_owned())
            }
            _ => return Err(self.unexpected(accepted.expected())),
        };
        self.advance();
        self.node(start, kind)
    }

    fn parse_spirv_qualifier(&mut self, word: &str) -> Result<SingleTypeQualifier> {
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

    fn parse_precision_qualifier(&mut self) -> Result<Spanned<PrecisionQualifier>> {
        let token = self.peek();
        let qualifier = match token.kind {
            TokenKind::Word(word, _) => PrecisionQualifier::from_keyword(word),
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

    fn parse_type_name_list(&mut self) -> Result<Vec<Identifier>> {
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
        &mut self,
        token: Token<'a>,
        word: &'a str,
    ) -> Result<TypeSpecifierNonArray> {
        let non_array = if word == "void" {
            TypeSpecifierNonArray::Void
        } else if let Some(basic) = BasicType::from_keyword(word) {
            self.require_type_extension(word, token.span)?;
            TypeSpecifierNonArray::Basic(basic)
        } else if let Some(keyword) = OpaqueKeyword::parse(word) {
            self.require_type_extension(word, token.span)?;
            TypeSpecifierNonArray::Opaque(keyword)
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

    fn parse_default_label(&mut self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("default")?;
        self.expect(":")?;
        self.node(start, StatementKind::CaseLabel(CaseLabel::Default))
    }

    fn parse_jump(&mut self, jump: JumpStatement) -> Result<Statement> {
        let start = self.start();
        self.advance();
        self.expect(";")?;
        self.node(start, StatementKind::Jump(jump))
    }

    fn peek_binary_operator(&self) -> Option<BinaryOperator> {
        match self.peek().kind {
            TokenKind::Punctuator(symbol) => BinaryOperator::from_symbol(symbol),
            _ => None,
        }
    }

    fn qualifier_start(&self) -> Option<QualifierStart<'a>> {
        let TokenKind::Word(word, _) = self.peek().kind else {
            return None;
        };
        if word == "layout" {
            Some(QualifierStart::Layout)
        } else if word == "subroutine" {
            Some(QualifierStart::Subroutine)
        } else if word == NON_UNIFORM && self.at_nth(1, "(") {
            None
        } else if self.is_spirv_word(word, &SPIRV_QUALIFIERS) {
            Some(QualifierStart::Spirv(word))
        } else {
            SingleTypeQualifier::from_keyword(word).map(QualifierStart::Single)
        }
    }

    fn peek_unary_operator(&self) -> Option<UnaryOperator> {
        match self.peek().kind {
            TokenKind::Punctuator(symbol) => UnaryOperator::from_symbol(symbol),
            _ => None,
        }
    }

    fn peek_assignment_operator(&self, active: bool) -> Option<AssignmentOperator> {
        if !active {
            return None;
        }
        match self.peek().kind {
            TokenKind::Punctuator(symbol) => AssignmentOperator::from_symbol(symbol),
            _ => None,
        }
    }

    fn starts_cast(&self) -> bool {
        if !self.at("(") || !self.extensions.is_on(Extension::NvExplicitTypecast) {
            return false;
        }
        match self.token_at(self.cursor.saturating_add(1)).kind {
            TokenKind::Word(word, class) if self.is_type_name(word, class) => true,
            TokenKind::Word(_, class) => self.casts_to_name(class),
            _ => false,
        }
    }

    fn casts_to_name(&self, class: WordClass) -> bool {
        if class.is_reserved()
            || self.token_at(self.cursor.saturating_add(2)).kind != TokenKind::Punctuator(")")
        {
            return false;
        }
        match self.token_at(self.cursor.saturating_add(3)).kind {
            TokenKind::Word(next, class) => {
                !class.is_reserved() || matches!(next, "true" | "false")
            }
            TokenKind::Number { .. } => true,
            _ => false,
        }
    }
}

impl<'a> Parser<'a> {
    fn parse_external_declaration(&mut self) -> Result<ExternalDeclaration> {
        let token = self.peek();
        match token.kind {
            TokenKind::Directive(index) => {
                let directive = self
                    .directives
                    .get(index)
                    .cloned()
                    .ok_or_else(|| self.unexpected("a declaration"))?;
                if let DirectiveKind::Extension { name, behavior } = &directive.kind {
                    self.extensions.apply(name, *behavior);
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
            _ => self.parse_declaration_or_definition(true),
        }
    }

    fn parse_declaration(&mut self) -> Result<Declaration> {
        match self.parse_declaration_or_definition(false)? {
            ExternalDeclaration::Declaration(declaration) => Ok(declaration),
            ExternalDeclaration::Directive(_)
            | ExternalDeclaration::FunctionDefinition(_)
            | ExternalDeclaration::Semicolon(_) => Err(self.unexpected("a declaration")),
        }
    }

    fn parse_declaration_or_definition(
        &mut self,
        allow_definition: bool,
    ) -> Result<ExternalDeclaration> {
        let start = self.start();
        if allow_definition && self.at_attribute_list() {
            return self.parse_attributed_function(start);
        }
        if self.eat_word("precision") {
            let qualifier = self.parse_precision_qualifier()?;
            let ty = self.parse_type_specifier()?;
            self.expect(";")?;
            return self.declaration(start, DeclarationKind::Precision { qualifier, ty });
        }
        if self.is_spirv_word_here(&["spirv_instruction"]) {
            return self.parse_spirv_instruction_declaration(start);
        }
        if self.is_spirv_word_here(&["spirv_execution_mode", "spirv_execution_mode_id"]) {
            let mode = self.parse_spirv_execution_mode()?;
            self.expect(";")?;
            return self.declaration(start, DeclarationKind::SpirvExecutionMode(mode));
        }
        let qualifier = match self.parse_type_qualifier()? {
            Some(qualifier) => match self.parse_qualifier_declaration(start, qualifier)? {
                AfterQualifier::Declaration(declaration) => return Ok(*declaration),
                AfterQualifier::Type(qualifier) => Some(qualifier),
            },
            None => None,
        };
        let specifier = self.parse_type_specifier()?;
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
            return self.parse_function(start, ty, name, Vec::new(), allow_definition);
        }
        let mut declarators = Vec::with_capacity(1);
        declarators.push(self.parse_init_declarator(name)?);
        while self.eat(",") {
            let name = self.identifier()?;
            declarators.push(self.parse_init_declarator(name)?);
        }
        self.expect(";")?;
        let list = InitDeclaratorList { ty, declarators };
        self.declaration(start, DeclarationKind::InitDeclaratorList(list))
    }

    fn parse_attributed_function(&mut self, start: u32) -> Result<ExternalDeclaration> {
        let attributes = self.parse_attribute_list()?;
        let qualifier = self.parse_type_qualifier()?;
        let specifier = self.parse_type_specifier()?;
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
        self.parse_function(start, return_type, name, attributes, true)
    }

    fn parse_qualifier_declaration(
        &mut self,
        start: u32,
        qualifier: Spanned<TypeQualifier>,
    ) -> Result<AfterQualifier> {
        if self.eat(";") {
            return self
                .declaration(start, DeclarationKind::Qualifier(qualifier))
                .map(|declaration| AfterQualifier::Declaration(Box::new(declaration)));
        }
        let TokenKind::Word(word, class) = self.peek().kind else {
            return Ok(AfterQualifier::Type(qualifier));
        };
        if self.at_nth(1, "{") && word != "struct" {
            let reference = qualifier.node.has_layout("buffer_reference")
                || qualifier.node.has_layout("buffer_type");
            let kind = self.parse_block(qualifier)?;
            if reference {
                self.declare_struct(word);
            }
            return self
                .declaration(start, kind)
                .map(|declaration| AfterQualifier::Declaration(Box::new(declaration)));
        }
        let names_follow = self.at_nth(1, ";") || self.at_nth(1, ",");
        if names_follow && !self.is_type_name(word, class) {
            let mut identifiers = Vec::from([self.identifier()?]);
            while self.eat(",") {
                identifiers.push(self.identifier()?);
            }
            self.expect(";")?;
            if qualifier.node.has_layout("buffer_reference") {
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

    fn parse_block(&mut self, qualifier: Spanned<TypeQualifier>) -> Result<DeclarationKind> {
        let name = self.identifier()?;
        let members = self.parse_struct_declaration_list()?;
        let instance_start = self.start();
        let instance = if self.at(";") {
            None
        } else {
            let name = self.identifier()?;
            let array = self.parse_array_specifier()?;
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

    fn parse_function(
        &mut self,
        start: u32,
        return_type: Spanned<FullySpecifiedType>,
        name: Identifier,
        attributes: Vec<Attribute>,
        allow_definition: bool,
    ) -> Result<ExternalDeclaration> {
        let mut prototype = self.parse_prototype(start, return_type, name)?;
        prototype.node.attributes = attributes;
        if self.at_attribute_list() {
            prototype.node.trailing_attributes = self.parse_attribute_list()?;
        }
        if self.eat(";") {
            return self.declaration(start, DeclarationKind::FunctionPrototype(prototype));
        }
        if !allow_definition || !self.at("{") {
            return Err(self.unexpected("`;`"));
        }
        let body_start = self.start();
        self.expect("{")?;
        self.struct_scopes.push();
        let mut statements = Vec::new();
        let mut failure = None;
        while !self.at("}") {
            if self.peek().kind == TokenKind::End {
                failure = Some(self.unexpected("`}`"));
                break;
            }
            match self.parse_statement() {
                Ok(statement) => statements.push(statement),
                Err(error) => {
                    failure = Some(error);
                    break;
                }
            }
        }
        self.struct_scopes.pop();
        if let Some(error) = failure {
            let end = statements
                .last()
                .map_or(body_start, |statement| statement.span.end);
            let body = Spanned::new(Span::new(body_start, end), CompoundStatement { statements });
            self.partial_function = Some(PartialFunction {
                start,
                definition: FunctionDefinition { prototype, body },
            });
            return Err(error);
        }
        self.expect("}")?;
        let body = self.spanned(body_start, CompoundStatement { statements });
        let definition = FunctionDefinition { prototype, body };
        Ok(ExternalDeclaration::FunctionDefinition(
            self.node(start, definition)?,
        ))
    }

    fn parse_prototype(
        &mut self,
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
            parameters.push(self.parse_parameter_declaration()?);
            while self.eat(",") {
                parameters.push(self.parse_parameter_declaration()?);
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

    fn parse_spirv_instruction_declaration(&mut self, start: u32) -> Result<ExternalDeclaration> {
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
        let qualifier = self.parse_type_qualifier()?;
        let specifier = self.parse_type_specifier()?;
        let return_type = self.spanned(
            prototype_start,
            FullySpecifiedType {
                qualifier,
                specifier,
            },
        );
        let name = self.identifier()?;
        let prototype = self.parse_prototype(prototype_start, return_type, name)?;
        self.expect(";")?;
        self.declaration(
            start,
            DeclarationKind::SpirvInstruction {
                instruction,
                prototype,
            },
        )
    }

    fn parse_spirv_execution_mode(&mut self) -> Result<Spanned<SpirvExecutionMode>> {
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
                operands.push(self.parse_conditional()?);
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

    fn parse_spirv_type_specifier(&mut self) -> Result<SpirvTypeSpecifier> {
        self.advance();
        self.expect("(")?;
        let requirements = self.parse_spirv_requirements()?;
        let instruction = self.parse_spirv_instruction_qualifiers()?;
        let mut parameters = Vec::new();
        while self.eat(",") {
            let parameter = match self.peek().kind {
                TokenKind::Word(word, class)
                    if word == "struct" || self.is_type_name(word, class) =>
                {
                    SpirvTypeParameter::Type(Box::new(self.parse_type_specifier()?))
                }
                _ => SpirvTypeParameter::Constant(self.parse_conditional()?),
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

    fn parse_parameter_declaration(&mut self) -> Result<Node<ParameterDeclaration>> {
        let start = self.start();
        let qualifier = self.parse_type_qualifier()?;
        let specifier = self.parse_type_specifier()?;
        let ty = self.spanned(
            start,
            FullySpecifiedType {
                qualifier,
                specifier,
            },
        );
        let (name, array) = if matches!(self.peek().kind, TokenKind::Word(..)) {
            (Some(self.identifier()?), self.parse_array_specifier()?)
        } else {
            (None, None)
        };
        self.node(start, ParameterDeclaration { ty, name, array })
    }

    fn parse_init_declarator(&mut self, name: Identifier) -> Result<Node<InitDeclarator>> {
        let start = name.span.start;
        let array = self.parse_array_specifier()?;
        let initializer = if self.eat("=") {
            Some(self.parse_initializer()?)
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

    fn parse_initializer(&mut self) -> Result<Spanned<Initializer>> {
        recurse(|| {
            let start = self.start();
            if !self.eat("{") {
                let expression = self.parse_assignment()?;
                return Ok(self.spanned(start, Initializer::Expression(expression)));
            }
            let mut elements = Vec::new();
            while !self.at("}") {
                elements.push(self.parse_initializer()?);
                if !self.eat(",") {
                    break;
                }
            }
            self.expect("}")?;
            Ok(self.spanned(start, Initializer::List(elements)))
        })
    }

    fn parse_type_qualifier(&mut self) -> Result<Option<Spanned<TypeQualifier>>> {
        let start = self.start();
        let mut qualifiers = Vec::new();
        while let Some(next) = self.qualifier_start() {
            let single_start = self.start();
            let single = match next {
                QualifierStart::Layout => {
                    self.advance();
                    SingleTypeQualifier::Layout(self.parse_layout_qualifier()?)
                }
                QualifierStart::Subroutine => {
                    self.advance();
                    SingleTypeQualifier::Subroutine(self.parse_type_name_list()?)
                }
                QualifierStart::Spirv(word) => self.parse_spirv_qualifier(word)?,
                QualifierStart::Single(single) => {
                    if single == SingleTypeQualifier::NonUniform {
                        self.require_non_uniform(self.peek().span)?;
                    }
                    self.advance();
                    single
                }
            };
            qualifiers.push(self.spanned(single_start, single));
        }
        if qualifiers.is_empty() {
            Ok(None)
        } else {
            Ok(Some(self.spanned(start, TypeQualifier { qualifiers })))
        }
    }

    fn parse_layout_qualifier(&mut self) -> Result<LayoutQualifier> {
        self.expect("(")?;
        let mut ids = Vec::new();
        loop {
            let start = self.start();
            let name = if self.at_word("shared") {
                let token = self.advance();
                Spanned::new(token.span, String::from("shared"))
            } else {
                let identifier = self.identifier()?;
                Spanned::new(identifier.span, identifier.node.to_ascii_lowercase())
            };
            let value = if self.eat("=") {
                Some(self.parse_assignment()?)
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

    fn parse_type_specifier(&mut self) -> Result<Spanned<TypeSpecifier>> {
        recurse(|| {
            let token = self.peek();
            let TokenKind::Word(word, _) = token.kind else {
                return Err(self.unexpected("a type"));
            };
            let non_array = if word == "struct" {
                TypeSpecifierNonArray::Struct(self.parse_struct_specifier()?)
            } else if self.is_spirv_word(word, &[SPIRV_TYPE]) {
                let spirv = self.parse_spirv_type_specifier()?;
                TypeSpecifierNonArray::Spirv(Box::new(spirv))
            } else {
                self.parse_simple_type_specifier(token, word)?
            };
            let parameters = if self.at("<")
                && !matches!(
                    non_array,
                    TypeSpecifierNonArray::Struct(_) | TypeSpecifierNonArray::Spirv(_)
                ) {
                Some(self.parse_type_parameters()?)
            } else {
                None
            };
            let array = self.parse_array_specifier()?;
            let specifier = TypeSpecifier {
                non_array,
                parameters,
                array,
            };
            Ok(self.spanned(token.span.start, specifier))
        })
    }

    fn parse_type_parameters(&mut self) -> Result<Spanned<TypeParameters>> {
        let start = self.start();
        self.expect("<")?;
        let element = match self.peek().kind {
            TokenKind::Word(word, class) if word == "struct" || self.is_type_name(word, class) => {
                Some(Box::new(self.parse_type_specifier()?))
            }
            _ => None,
        };
        let mut values = Vec::new();
        if element.is_none() || self.at(",") {
            if element.is_some() {
                self.advance();
            }
            loop {
                let value = self.parse_unary()?;
                values.push(value);
                if !self.eat(",") {
                    break;
                }
            }
        }
        self.expect(">")?;
        Ok(self.spanned(start, TypeParameters { element, values }))
    }

    fn parse_array_specifier(&mut self) -> Result<Option<Spanned<ArraySpecifier>>> {
        let start = self.start();
        let mut dimensions = Vec::new();
        while self.at("[") {
            let dimension_start = self.start();
            self.advance();
            let dimension = if self.at("]") {
                ArrayDimension::Unsized
            } else {
                let size = self.parse_conditional()?;
                ArrayDimension::Sized(size)
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

    fn parse_struct_specifier(&mut self) -> Result<StructSpecifier> {
        self.expect_word("struct")?;
        let name_token = self.peek();
        let name = if self.at("{") {
            None
        } else {
            Some(self.identifier()?)
        };
        let declarations = self.parse_struct_declaration_list()?;
        if let (Some(_), TokenKind::Word(word, _)) = (&name, name_token.kind) {
            self.declare_struct(word);
        }
        Ok(StructSpecifier { name, declarations })
    }

    fn parse_struct_declaration_list(&mut self) -> Result<Vec<Spanned<StructDeclaration>>> {
        self.expect("{")?;
        let mut declarations = Vec::new();
        loop {
            declarations.push(self.parse_struct_declaration()?);
            if self.eat("}") {
                return Ok(declarations);
            }
        }
    }

    fn parse_struct_declaration(&mut self) -> Result<Spanned<StructDeclaration>> {
        recurse(|| {
            let start = self.start();
            let qualifier = self.parse_type_qualifier()?;
            let specifier = if qualifier.is_some() && self.at("{") {
                self.parse_inline_block()?
            } else {
                self.parse_type_specifier()?
            };
            self.parse_struct_declarators(start, qualifier, specifier)
        })
    }

    fn parse_inline_block(&mut self) -> Result<Spanned<TypeSpecifier>> {
        let block_start = self.start();
        let members = self.parse_struct_declaration_list()?;
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

    fn parse_struct_declarators(
        &mut self,
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
            let array = self.parse_array_specifier()?;
            declarators.push(self.spanned(name.span.start, StructDeclarator { name, array }));
            if !self.eat(",") {
                break;
            }
        }
        self.expect(";")?;
        Ok(self.spanned(start, StructDeclaration { ty, declarators }))
    }

    fn scoped<T>(&mut self, parse: impl FnOnce(&mut Self) -> Result<T>) -> Result<T> {
        self.struct_scopes.push();
        let parsed = parse(self);
        self.struct_scopes.pop();
        parsed
    }

    fn parse_statement_list(&mut self) -> Result<Vec<Statement>> {
        let mut statements = Vec::new();
        while !self.at("}") {
            if self.peek().kind == TokenKind::End {
                return Err(self.unexpected("`}`"));
            }
            statements.push(self.parse_statement()?);
        }
        Ok(statements)
    }

    fn parse_statement(&mut self) -> Result<Statement> {
        recurse(|| match self.peek().kind {
            TokenKind::Punctuator("{") => self.parse_compound(),
            TokenKind::Word("if", _) => self.parse_selection(),
            TokenKind::Word("switch", _) => self.parse_switch(),
            TokenKind::Word("case", _) => self.parse_case_label(),
            TokenKind::Word("default", _) => self.parse_default_label(),
            TokenKind::Word("while", _) => self.scoped(Self::parse_while),
            TokenKind::Word("do", _) => self.parse_do_while(),
            TokenKind::Word("for", _) => self.scoped(Self::parse_for),
            TokenKind::Word("continue", _) => self.parse_jump(JumpStatement::Continue),
            TokenKind::Word("break", _) => self.parse_jump(JumpStatement::Break),
            TokenKind::Word("discard", _) => self.parse_jump(JumpStatement::Discard),
            TokenKind::Word("demote", _) => self.parse_jump(JumpStatement::Demote),
            TokenKind::Word("terminateInvocation", _) => {
                self.parse_jump(JumpStatement::TerminateInvocation)
            }
            TokenKind::Word("terminateRayEXT", _) => self.parse_jump(JumpStatement::TerminateRay),
            TokenKind::Word("ignoreIntersectionEXT", _) => {
                self.parse_jump(JumpStatement::IgnoreIntersection)
            }
            TokenKind::Word("return", _) => self.parse_return(),
            TokenKind::Punctuator("[") if self.at_attribute_list() => self.parse_attributed(),
            _ => self.parse_simple_statement(),
        })
    }

    fn parse_compound(&mut self) -> Result<Statement> {
        let start = self.start();
        self.expect("{")?;
        let statements = self.scoped(Self::parse_statement_list)?;
        self.expect("}")?;
        self.node(
            start,
            StatementKind::Compound(CompoundStatement { statements }),
        )
    }

    fn parse_attributed(&mut self) -> Result<Statement> {
        let start = self.start();
        let attributes = self.parse_attribute_list()?;
        if !matches!(
            self.peek().kind,
            TokenKind::Word("if" | "switch" | "while" | "do" | "for", _)
        ) {
            return Err(self.unexpected("a selection, switch or iteration statement"));
        }
        let statement = Box::new(self.parse_statement()?);
        self.node(
            start,
            StatementKind::Attributed {
                attributes,
                statement,
            },
        )
    }

    fn parse_attribute_list(&mut self) -> Result<Vec<Attribute>> {
        self.expect("[")?;
        self.expect("[")?;
        let mut attributes = Vec::new();
        loop {
            let token = self.peek();
            let TokenKind::Word(word, _) = token.kind else {
                return Err(self.unexpected("an attribute"));
            };
            self.advance();
            let name = Spanned::new(token.span, word.to_owned());
            let argument = if self.eat("(") {
                let argument = self.parse_conditional()?;
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

    fn parse_simple_statement(&mut self) -> Result<Statement> {
        let start = self.start();
        let kind = if self.eat(";") {
            StatementKind::Expression(None)
        } else if self.starts_declaration() {
            StatementKind::Declaration(Box::new(self.parse_declaration()?))
        } else {
            let expression = self.parse_expression()?;
            self.expect(";")?;
            StatementKind::Expression(Some(expression))
        };
        self.node(start, kind)
    }

    fn parse_case_label(&mut self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("case")?;
        let label = self.parse_expression()?;
        self.expect(":")?;
        self.node(start, StatementKind::CaseLabel(CaseLabel::Case(label)))
    }

    fn parse_return(&mut self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("return")?;
        let value = if self.at(";") {
            None
        } else {
            Some(self.parse_expression()?)
        };
        self.expect(";")?;
        self.node(start, StatementKind::Jump(JumpStatement::Return(value)))
    }

    fn parse_parenthesized_expression(&mut self) -> Result<Expression> {
        self.expect("(")?;
        let expression = self.parse_expression()?;
        self.expect(")")?;
        Ok(expression)
    }

    fn parse_selection(&mut self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("if")?;
        let condition = self.parse_parenthesized_expression()?;
        let then_branch = Box::new(self.parse_statement()?);
        let else_branch = if self.eat_word("else") {
            Some(Box::new(self.parse_statement()?))
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

    fn parse_switch(&mut self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("switch")?;
        let selector = self.parse_parenthesized_expression()?;
        self.expect("{")?;
        let statements = self.scoped(Self::parse_statement_list)?;
        self.expect("}")?;
        let kind = StatementKind::Switch {
            selector,
            statements,
        };
        self.node(start, kind)
    }

    fn parse_condition(&mut self) -> Result<Condition> {
        if !self.starts_declaration() {
            return Ok(Condition::Expression(self.parse_expression()?));
        }
        let start = self.start();
        let qualifier = self.parse_type_qualifier()?;
        let specifier = self.parse_type_specifier()?;
        let ty = self.spanned(
            start,
            FullySpecifiedType {
                qualifier,
                specifier,
            },
        );
        let name = self.identifier()?;
        self.expect("=")?;
        let initializer = self.parse_initializer()?;
        let declaration = ConditionDeclaration {
            ty,
            name,
            initializer,
        };
        Ok(Condition::Declaration(Box::new(
            self.node(start, declaration)?,
        )))
    }

    fn parse_while(&mut self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("while")?;
        self.expect("(")?;
        let condition = self.parse_condition()?;
        self.expect(")")?;
        let body = Box::new(self.parse_statement()?);
        self.node(start, StatementKind::While { condition, body })
    }

    fn parse_do_while(&mut self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("do")?;
        let body = Box::new(self.parse_statement()?);
        self.expect_word("while")?;
        let condition = self.parse_parenthesized_expression()?;
        self.expect(";")?;
        self.node(start, StatementKind::DoWhile { body, condition })
    }

    fn parse_for(&mut self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("for")?;
        self.expect("(")?;
        let init = self.parse_simple_statement()?;
        let condition = if self.at(";") {
            None
        } else {
            Some(self.parse_condition()?)
        };
        self.expect(";")?;
        let increment = if self.at(")") {
            None
        } else {
            Some(self.parse_expression()?)
        };
        self.expect(")")?;
        let body = self.parse_statement()?;
        let statement = ForStatement {
            init,
            condition,
            increment,
            body,
        };
        self.node(start, StatementKind::For(Box::new(statement)))
    }

    fn parse_expression(&mut self) -> Result<Expression> {
        let start = self.start();
        let first = self.parse_assignment()?;
        if !self.at(",") {
            return Ok(first);
        }
        let mut expressions = Vec::from([first]);
        while self.eat(",") {
            expressions.push(self.parse_assignment()?);
        }
        self.node(start, ExpressionKind::Sequence(expressions))
    }

    fn parse_assignment(&mut self) -> Result<Expression> {
        self.parse_right_chain(true)
    }

    fn parse_conditional(&mut self) -> Result<Expression> {
        self.parse_right_chain(false)
    }

    fn parse_right_chain(&mut self, assigning: bool) -> Result<Expression> {
        recurse(|| {
            let start = self.start();
            let operand = self.parse_binary(0)?;
            if self.eat("?") {
                let then_expression = self.parse_expression()?;
                self.expect(":")?;
                let else_expression = self.parse_right_chain(true)?;
                let kind = ExpressionKind::Conditional {
                    condition: Box::new(operand),
                    then_expression: Box::new(then_expression),
                    else_expression: Box::new(else_expression),
                };
                return self.node(start, kind);
            }
            let Some(operator) = self.peek_assignment_operator(assigning) else {
                return Ok(operand);
            };
            if matches!(operand.kind, ExpressionKind::Binary { .. }) {
                return Err(self.unexpected("the end of the expression"));
            }
            self.advance();
            let value = self.parse_right_chain(true)?;
            let kind = ExpressionKind::Assignment {
                operator,
                target: Box::new(operand),
                value: Box::new(value),
            };
            self.node(start, kind)
        })
    }

    fn parse_binary(&mut self, lowest: u8) -> Result<Expression> {
        let start = self.start();
        let mut left = self.parse_unary()?;
        while let Some(operator) = self.peek_binary_operator()
            && operator.precedence() >= lowest
        {
            self.advance();
            let tighter = operator.precedence().saturating_add(1);
            let right = recurse(|| self.parse_binary(tighter))?;
            let kind = ExpressionKind::Binary {
                operator,
                left: Box::new(left),
                right: Box::new(right),
            };
            left = self.node(start, kind)?;
        }
        Ok(left)
    }

    fn parse_unary(&mut self) -> Result<Expression> {
        recurse(|| {
            let start = self.start();
            if let Some(operator) = self.peek_unary_operator() {
                self.advance();
                let operand = self.parse_unary()?;
                let kind = ExpressionKind::Unary {
                    operator,
                    operand: Box::new(operand),
                };
                return self.node(start, kind);
            }
            if self.starts_cast() {
                return self.parse_cast();
            }
            self.parse_postfix()
        })
    }

    fn parse_cast(&mut self) -> Result<Expression> {
        let start = self.start();
        self.expect("(")?;
        let name = match self.peek().kind {
            TokenKind::Word(word, class) if !self.is_type_name(word, class) => Some(word),
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
            None => self.parse_type_specifier()?,
        };
        self.expect(")")?;
        let operand = self.parse_unary()?;
        let function = Spanned::new(
            specifier.span,
            FunctionIdentifier::Cast(Box::new(specifier.node)),
        );
        let kind = ExpressionKind::FunctionCall(Box::new(FunctionCall {
            function,
            arguments: alloc::vec![operand],
        }));
        self.node(start, kind)
    }

    fn parse_postfix(&mut self) -> Result<Expression> {
        let start = self.start();
        let mut base = self.parse_primary()?;
        loop {
            base = match self.peek().kind {
                TokenKind::Punctuator("[") => {
                    self.advance();
                    let index = self.parse_expression()?;
                    self.expect("]")?;
                    let kind = ExpressionKind::Subscript {
                        base: Box::new(base),
                        index: Box::new(index),
                    };
                    self.node(start, kind)?
                }
                TokenKind::Punctuator(".") => self.parse_field_selection(start, base)?,
                TokenKind::Punctuator("(") => {
                    let callee = FunctionIdentifier::Expression(Box::new(base));
                    let function = self.spanned(start, callee);
                    self.parse_call(start, function)?
                }
                TokenKind::Punctuator("++") => {
                    self.parse_postfix_operator(start, base, PostfixOperator::Increment)?
                }
                TokenKind::Punctuator("--") => {
                    self.parse_postfix_operator(start, base, PostfixOperator::Decrement)?
                }
                _ => return Ok(base),
            };
        }
    }

    fn parse_postfix_operator(
        &mut self,
        start: u32,
        operand: Expression,
        operator: PostfixOperator,
    ) -> Result<Expression> {
        self.advance();
        let kind = ExpressionKind::Postfix {
            operand: Box::new(operand),
            operator,
        };
        self.node(start, kind)
    }

    fn parse_field_selection(&mut self, start: u32, base: Expression) -> Result<Expression> {
        self.expect(".")?;
        let field = self.identifier()?;
        if self.at("(") {
            let method = FunctionIdentifier::Method {
                object: Box::new(base),
                name: field,
            };
            let function = self.spanned(start, method);
            return self.parse_call(start, function);
        }
        let kind = ExpressionKind::FieldSelection {
            base: Box::new(base),
            field,
        };
        self.node(start, kind)
    }

    fn parse_call(
        &mut self,
        start: u32,
        function: Spanned<FunctionIdentifier>,
    ) -> Result<Expression> {
        self.expect("(")?;
        let mut arguments = Vec::new();
        let is_void_list = self.at_word("void") && self.at_nth(1, ")");
        if is_void_list {
            self.advance();
        } else if !self.at(")") {
            loop {
                arguments.push(self.parse_assignment()?);
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
        self.node(start, ExpressionKind::FunctionCall(Box::new(call)))
    }

    fn parse_primary(&mut self) -> Result<Expression> {
        let token = self.peek();
        match token.kind {
            TokenKind::Number { .. }
            | TokenKind::String(_)
            | TokenKind::Word("true" | "false", _) => self.parse_literal(token),
            TokenKind::Punctuator("(") => self.parse_parenthesized(),
            TokenKind::Word(NON_UNIFORM, _) if self.at_nth(1, "(") => self.parse_non_uniform(token),
            TokenKind::Word(word, class) if self.starts_constructor(word, class) => {
                self.parse_constructor()
            }
            TokenKind::Word(word, class) if !class.is_reserved() => self.parse_name(token, word),
            TokenKind::Word(word, class) if class.is_unavailable() => {
                Err(self.error(ParseErrorKind::ReservedWord(word.to_owned()), token.span))
            }
            _ => Err(self.unexpected("an expression")),
        }
    }

    fn parse_literal(&mut self, token: Token<'a>) -> Result<Expression> {
        let start = token.span.start;
        self.advance();
        let kind = match token.kind {
            TokenKind::Number { kind, text } => ExpressionKind::Number(NumericLiteral {
                kind,
                text: text.to_owned(),
            }),
            TokenKind::String(index) => {
                ExpressionKind::String(self.string_literal(index, token.span)?)
            }
            TokenKind::Word(word, _) => ExpressionKind::Bool(word == "true"),
            _ => return Err(self.unexpected("an expression")),
        };
        self.node(start, kind)
    }

    fn parse_non_uniform(&mut self, token: Token<'a>) -> Result<Expression> {
        self.require_non_uniform(token.span)?;
        self.advance();
        let function = Spanned::new(
            token.span,
            FunctionIdentifier::Function(NON_UNIFORM.to_owned()),
        );
        self.parse_call(token.span.start, function)
    }

    fn parse_name(&mut self, token: Token<'a>, word: &str) -> Result<Expression> {
        let start = token.span.start;
        self.advance();
        if self.at("(") {
            let function = Spanned::new(token.span, FunctionIdentifier::Function(word.to_owned()));
            self.parse_call(start, function)
        } else {
            self.node(start, ExpressionKind::Variable(word.to_owned()))
        }
    }

    fn parse_parenthesized(&mut self) -> Result<Expression> {
        let start = self.start();
        self.expect("(")?;
        let inner = self.parse_expression()?;
        self.expect(")")?;
        self.node(start, ExpressionKind::Parenthesized(Box::new(inner)))
    }

    fn parse_constructor(&mut self) -> Result<Expression> {
        let start = self.start();
        let specifier = self.parse_type_specifier()?;
        let function = Spanned::new(
            specifier.span,
            FunctionIdentifier::Constructor(Box::new(specifier.node)),
        );
        self.parse_call(start, function)
    }
}
