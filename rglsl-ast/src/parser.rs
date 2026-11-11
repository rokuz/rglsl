use alloc::borrow::ToOwned;
use alloc::boxed::Box;
use alloc::collections::BTreeSet;
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
use crate::keywords::{
    is_opaque_type_keyword, is_reserved_word, is_type_keyword, is_unavailable_word,
};
use crate::lexer::{tokenize, Token, TokenKind};
use crate::span::Span;

pub const MAX_NESTING_DEPTH: u32 = 128;
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

struct Measured {
    expression: Expression,
    height: u32,
}

struct ForHeader {
    init: Statement,
    condition: Option<Condition>,
    increment: Option<Expression>,
}

struct PendingBinary {
    operands: Vec<(u32, Measured)>,
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

struct Parser<'a> {
    source: &'a str,
    tokens: Vec<Token<'a>>,
    directives: Vec<Directive>,
    strings: Vec<String>,
    end: Token<'a>,
    cursor: usize,
    previous_end: u32,
    next_id: u32,
    depth: u32,
    expression_depth: u32,
    struct_scopes: Vec<BTreeSet<&'a str>>,
    extensions: ExtensionState,
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
    let mut parser = Parser {
        source,
        tokens: lexed.tokens,
        directives: lexed.directives,
        strings: lexed.strings,
        end: lexed.end,
        cursor: 0,
        previous_end: 0,
        next_id: 0,
        depth: 0,
        expression_depth: 0,
        struct_scopes: Vec::from([BTreeSet::from([
            "gl_TextureFootprint2DNV",
            "gl_TextureFootprint3DNV",
        ])]),
        extensions: ExtensionState::new(),
    };
    let mut external_declarations = Vec::new();
    let mut failure = None;
    while parser.peek().kind != TokenKind::End {
        match parser.parse_external_declaration() {
            Ok(external) => external_declarations.push(external),
            Err(error) => {
                failure = Some(*error);
                break;
            }
        }
    }
    let unit = TranslationUnit::new(external_declarations, NodeId::new(parser.next_id));
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
        if self.cursor < self.tokens.len() {
            self.cursor += 1;
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
        matches!(self.peek().kind, TokenKind::Word(found) if found == word)
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
        Span::new(start, self.previous_end.max(start))
    }

    fn spanned<T>(&self, start: u32, value: T) -> Spanned<T> {
        Spanned::new(self.span_from(start), value)
    }

    fn node<K>(&mut self, start: u32, kind: K) -> Result<Node<K>> {
        let span = self.span_from(start);
        let id = NodeId::new(self.next_id);
        self.next_id = self
            .next_id
            .checked_add(1)
            .ok_or_else(|| self.error(ParseErrorKind::TooManyNodes, span))?;
        Ok(Node::new(id, span, kind))
    }

    fn enter(&mut self) -> Result<()> {
        if self.depth >= MAX_NESTING_DEPTH {
            return Err(self.error(ParseErrorKind::NestingTooDeep, self.peek().span));
        }
        self.depth += 1;
        Ok(())
    }

    const fn leave(&mut self) {
        self.depth = self.depth.saturating_sub(1);
    }

    fn enter_expression(&mut self) -> Result<()> {
        self.enter()?;
        self.expression_depth += 1;
        Ok(())
    }

    const fn leave_expression(&mut self) {
        self.expression_depth = self.expression_depth.saturating_sub(1);
        self.leave();
    }

    fn nested<T>(&mut self, parse: impl FnOnce(&mut Self) -> Result<T>) -> Result<T> {
        self.enter()?;
        let result = parse(self);
        self.leave();
        result
    }

    fn measured(
        &mut self,
        start: u32,
        kind: ExpressionKind,
        child_height: u32,
    ) -> Result<Measured> {
        let height = child_height.saturating_add(1);
        let enclosing = self.depth.saturating_sub(self.expression_depth);
        if enclosing.saturating_add(height) > MAX_NESTING_DEPTH {
            return Err(self.error(ParseErrorKind::NestingTooDeep, self.span_from(start)));
        }
        Ok(Measured {
            expression: self.node(start, kind)?,
            height,
        })
    }

    fn identifier(&mut self) -> Result<Identifier> {
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
        if self.extensions.keyword_enabled(word) {
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
        if self.extensions.is_on(NON_UNIFORM_EXTENSION) {
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
        self.struct_scopes.iter().any(|scope| scope.contains(word))
    }

    fn is_type_name(&self, word: &str) -> bool {
        is_type_keyword(word)
            || self.is_struct_name(word)
            || self.is_spirv_word(word, &[SPIRV_TYPE])
    }

    fn is_spirv_word(&self, word: &str, words: &[&str]) -> bool {
        words.contains(&word) && self.extensions.is_on(SPIRV_INTRINSICS)
    }

    fn declare_struct(&mut self, name: &'a str) {
        if let Some(scope) = self.struct_scopes.last_mut() {
            scope.insert(name);
        }
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

    fn declaration(&mut self, start: u32, kind: DeclarationKind) -> Result<ExternalDeclaration> {
        Ok(ExternalDeclaration::Declaration(self.node(start, kind)?))
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
        let qualifier = self.parse_type_qualifier()?;
        let qualifier = match qualifier {
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
        let mut declarators = Vec::new();
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
        let TokenKind::Word(word) = self.peek().kind else {
            return Ok(AfterQualifier::Type(qualifier));
        };
        if self.at_nth(1, "{") && word != "struct" {
            let reference =
                qualifier.has_layout("buffer_reference") || qualifier.has_layout("buffer_type");
            let kind = self.parse_block(qualifier)?;
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

    fn parse_block(&mut self, qualifier: Spanned<TypeQualifier>) -> Result<DeclarationKind> {
        let name = self.identifier()?;
        let members = self.parse_struct_declaration_list()?;
        let instance_start = self.start();
        let instance = if self.at(";") {
            None
        } else {
            let name = self.identifier()?;
            let array = self.parse_array_specifier()?.0;
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
        prototype.attributes = attributes;
        if self.at_attribute_list() {
            prototype.trailing_attributes = self.parse_attribute_list()?;
        }
        if self.eat(";") {
            return self.declaration(start, DeclarationKind::FunctionPrototype(prototype));
        }
        if !allow_definition || !self.at("{") {
            return Err(self.unexpected("`;`"));
        }
        let body = self.parse_compound_statement()?;
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

    fn is_spirv_word_here(&self, words: &[&str]) -> bool {
        matches!(self.peek().kind, TokenKind::Word(word) if self.is_spirv_word(word, words))
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

    fn at_spirv_requirement(&self) -> bool {
        matches!(self.peek().kind, TokenKind::Word(_)) && self.at_nth(1, "=") && self.at_nth(2, "[")
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
                && matches!(self.peek_nth(1).kind, TokenKind::Word(_))
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
                operands.push(self.parse_conditional()?.expression);
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

    fn parse_spirv_type_specifier(&mut self) -> Result<SpirvTypeSpecifier> {
        self.advance();
        self.expect("(")?;
        let requirements = self.parse_spirv_requirements()?;
        let instruction = self.parse_spirv_instruction_qualifiers()?;
        let mut parameters = Vec::new();
        while self.eat(",") {
            let parameter = match self.peek().kind {
                TokenKind::Word(word) if word == "struct" || self.is_type_name(word) => {
                    SpirvTypeParameter::Type(Box::new(self.parse_type_specifier()?))
                }
                _ => SpirvTypeParameter::Constant(self.parse_conditional()?.expression),
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
        let (name, array) = if matches!(self.peek().kind, TokenKind::Word(_)) {
            (Some(self.identifier()?), self.parse_array_specifier()?.0)
        } else {
            (None, None)
        };
        self.node(start, ParameterDeclaration { ty, name, array })
    }

    fn parse_init_declarator(&mut self, name: Identifier) -> Result<Node<InitDeclarator>> {
        let start = name.span.start;
        let array = self.parse_array_specifier()?.0;
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
        self.nested(|parser| {
            let start = parser.start();
            if !parser.eat("{") {
                let expression = parser.parse_assignment()?.expression;
                return Ok(parser.spanned(start, Initializer::Expression(expression)));
            }
            let mut elements = Vec::new();
            while !parser.at("}") {
                elements.push(parser.parse_initializer()?);
                if !parser.eat(",") {
                    break;
                }
            }
            parser.expect("}")?;
            Ok(parser.spanned(start, Initializer::List(elements)))
        })
    }

    fn parse_precision_qualifier(&mut self) -> Result<Spanned<PrecisionQualifier>> {
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

    fn parse_type_qualifier(&mut self) -> Result<Option<Spanned<TypeQualifier>>> {
        let start = self.start();
        let mut qualifiers = Vec::new();
        while let TokenKind::Word(word) = self.peek().kind {
            let single_start = self.start();
            let single = if word == "layout" {
                self.advance();
                SingleTypeQualifier::Layout(self.parse_layout_qualifier()?)
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

    fn parse_layout_qualifier(&mut self) -> Result<LayoutQualifier> {
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
                Some(self.parse_assignment()?.expression)
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
        Ok(self.parse_measured_type_specifier()?.0)
    }

    fn parse_measured_type_specifier(&mut self) -> Result<(Spanned<TypeSpecifier>, u32)> {
        self.nested(|parser| {
            let token = parser.peek();
            let TokenKind::Word(word) = token.kind else {
                return Err(parser.unexpected("a type"));
            };
            let non_array = parser.parse_type_specifier_non_array(token, word)?;
            parser.finish_type_specifier(token, word, non_array)
        })
    }

    fn parse_type_specifier_non_array(
        &mut self,
        token: Token<'a>,
        word: &'a str,
    ) -> Result<TypeSpecifierNonArray> {
        if word == "struct" {
            self.parse_struct_specifier()
                .map(TypeSpecifierNonArray::Struct)
        } else if self.is_spirv_word(word, &[SPIRV_TYPE]) {
            self.parse_spirv_type_specifier()
                .map(|spirv| TypeSpecifierNonArray::Spirv(Box::new(spirv)))
        } else {
            self.parse_simple_type_specifier(token, word)
        }
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

    fn finish_type_specifier(
        &mut self,
        token: Token<'a>,
        word: &'a str,
        non_array: TypeSpecifierNonArray,
    ) -> Result<(Spanned<TypeSpecifier>, u32)> {
        let (parameters, parameter_height) = if self.at("<")
            && !matches!(
                non_array,
                TypeSpecifierNonArray::TypeName(_)
                    | TypeSpecifierNonArray::Struct(_)
                    | TypeSpecifierNonArray::Spirv(_)
            ) {
            if !matches!(non_array, TypeSpecifierNonArray::Parameterized(_)) {
                return Err(self.error(
                    ParseErrorKind::UnexpectedTypeParameters(word.to_owned()),
                    token.span,
                ));
            }
            let (parameters, height) = self.parse_type_parameters()?;
            (Some(parameters), height)
        } else {
            (None, 0)
        };
        let (array, height) = self.parse_array_specifier()?;
        let specifier = TypeSpecifier {
            non_array,
            parameters,
            array,
        };
        Ok((
            self.spanned(token.span.start, specifier),
            height.max(parameter_height),
        ))
    }

    fn parse_type_parameters(&mut self) -> Result<(Spanned<TypeParameters>, u32)> {
        let start = self.start();
        self.expect("<")?;
        let mut height = 0;
        let element = match self.peek().kind {
            TokenKind::Word(word) if word == "struct" || self.is_type_name(word) => {
                let (element, element_height) = self.parse_measured_type_specifier()?;
                height = element_height;
                Some(Box::new(element))
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
                height = height.max(value.height);
                values.push(value.expression);
                if !self.eat(",") {
                    break;
                }
            }
        }
        self.expect(">")?;
        Ok((
            self.spanned(start, TypeParameters { element, values }),
            height,
        ))
    }

    fn parse_array_specifier(&mut self) -> Result<(Option<Spanned<ArraySpecifier>>, u32)> {
        let start = self.start();
        let mut dimensions = Vec::new();
        let mut height = 0;
        while self.at("[") {
            let dimension_start = self.start();
            self.advance();
            let dimension = if self.at("]") {
                ArrayDimension::Unsized
            } else {
                let size = self.parse_conditional()?;
                height = height.max(size.height);
                ArrayDimension::Sized(size.expression)
            };
            self.expect("]")?;
            dimensions.push(self.spanned(dimension_start, dimension));
        }
        if dimensions.is_empty() {
            Ok((None, 0))
        } else {
            Ok((
                Some(self.spanned(start, ArraySpecifier { dimensions })),
                height,
            ))
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
        if let (Some(_), TokenKind::Word(word)) = (&name, name_token.kind) {
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
        let start = self.start();
        let qualifier = self.parse_type_qualifier()?;
        let specifier = if qualifier.is_some() && self.at("{") {
            self.parse_inline_block()?
        } else {
            self.parse_type_specifier()?
        };
        self.finish_struct_declaration(start, qualifier, specifier)
    }

    fn parse_inline_block(&mut self) -> Result<Spanned<TypeSpecifier>> {
        let block_start = self.start();
        let members = self.nested(Self::parse_struct_declaration_list)?;
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

    fn finish_struct_declaration(
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
            let array = self.parse_array_specifier()?.0;
            declarators.push(self.spanned(name.span.start, StructDeclarator { name, array }));
            if !self.eat(",") {
                break;
            }
        }
        self.expect(";")?;
        Ok(self.spanned(start, StructDeclaration { ty, declarators }))
    }

    fn parse_compound_statement(&mut self) -> Result<Spanned<CompoundStatement>> {
        let start = self.start();
        self.expect("{")?;
        self.struct_scopes.push(BTreeSet::new());
        let statements = self.parse_statement_list();
        self.struct_scopes.pop();
        let statements = statements?;
        self.expect("}")?;
        Ok(self.spanned(start, CompoundStatement { statements }))
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
        self.enter()?;
        let statement = self.parse_unguarded_statement();
        self.leave();
        statement
    }

    fn parse_unguarded_statement(&mut self) -> Result<Statement> {
        match self.peek().kind {
            TokenKind::Punctuator("{") => self.parse_compound_as_statement(),
            TokenKind::Word("if") => self.parse_selection(),
            TokenKind::Word("switch") => self.parse_switch(),
            TokenKind::Word("case") => self.parse_case_label(),
            TokenKind::Word("default") => self.parse_default_label(),
            TokenKind::Word("while") => self.parse_while(),
            TokenKind::Word("do") => self.parse_do_while(),
            TokenKind::Word("for") => self.parse_for(),
            TokenKind::Word("continue") => self.parse_jump(JumpStatement::Continue),
            TokenKind::Word("break") => self.parse_jump(JumpStatement::Break),
            TokenKind::Word("discard") => self.parse_jump(JumpStatement::Discard),
            TokenKind::Word("demote") => self.parse_jump(JumpStatement::Demote),
            TokenKind::Word("terminateRayEXT") => self.parse_jump(JumpStatement::TerminateRay),
            TokenKind::Word("ignoreIntersectionEXT") => {
                self.parse_jump(JumpStatement::IgnoreIntersection)
            }
            TokenKind::Word("return") => self.parse_return(),
            TokenKind::Punctuator("[") if self.at_attribute_list() => self.parse_attributed(),
            _ => self.parse_simple_statement(),
        }
    }

    fn parse_attributed(&mut self) -> Result<Statement> {
        let start = self.start();
        let attributes = self.parse_attribute_list()?;
        if !matches!(
            self.peek().kind,
            TokenKind::Word("if" | "switch" | "while" | "do" | "for")
        ) {
            return Err(self.unexpected("a selection, switch or iteration statement"));
        }
        let statement = Box::new(self.parse_unguarded_statement()?);
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
            let TokenKind::Word(word) = token.kind else {
                return Err(self.unexpected("an attribute"));
            };
            self.advance();
            let name = Spanned::new(token.span, word.to_owned());
            let argument = if self.eat("(") {
                let argument = self.parse_conditional()?.expression;
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

    fn at_attribute_list(&self) -> bool {
        self.at("[") && self.at_nth(1, "[")
    }

    fn parse_compound_as_statement(&mut self) -> Result<Statement> {
        let start = self.start();
        let compound = self.parse_compound_statement()?.node;
        self.node(start, StatementKind::Compound(compound))
    }

    fn parse_simple_statement(&mut self) -> Result<Statement> {
        let start = self.start();
        let kind = if self.eat(";") {
            StatementKind::Expression(None)
        } else if self.starts_declaration() {
            StatementKind::Declaration(Box::new(self.parse_declaration()?))
        } else {
            let expression = self.parse_expression()?.expression;
            self.expect(";")?;
            StatementKind::Expression(Some(expression))
        };
        self.node(start, kind)
    }

    fn parse_case_label(&mut self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("case")?;
        let label = self.parse_expression()?.expression;
        self.expect(":")?;
        self.node(start, StatementKind::CaseLabel(CaseLabel::Case(label)))
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

    fn parse_return(&mut self) -> Result<Statement> {
        let start = self.start();
        self.expect_word("return")?;
        let value = if self.at(";") {
            None
        } else {
            Some(self.parse_expression()?.expression)
        };
        self.expect(";")?;
        self.node(start, StatementKind::Jump(JumpStatement::Return(value)))
    }

    fn parse_parenthesized_expression(&mut self) -> Result<Expression> {
        self.expect("(")?;
        let expression = self.parse_expression()?.expression;
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
        self.struct_scopes.push(BTreeSet::new());
        let statements = self.parse_statement_list();
        self.struct_scopes.pop();
        let statements = statements?;
        self.expect("}")?;
        let kind = StatementKind::Switch {
            selector,
            statements,
        };
        self.node(start, kind)
    }

    fn parse_condition(&mut self) -> Result<Condition> {
        if !self.starts_declaration() {
            return Ok(Condition::Expression(self.parse_expression()?.expression));
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
        self.struct_scopes.push(BTreeSet::new());
        let statement = self.parse_unscoped_while();
        self.struct_scopes.pop();
        statement
    }

    fn parse_unscoped_while(&mut self) -> Result<Statement> {
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
        self.struct_scopes.push(BTreeSet::new());
        let statement = self.parse_unscoped_for();
        self.struct_scopes.pop();
        statement
    }

    fn parse_unscoped_for(&mut self) -> Result<Statement> {
        let start = self.start();
        let header = self.parse_for_header()?;
        let body = self.parse_statement()?;
        self.finish_for(start, header, body)
    }

    fn parse_for_header(&mut self) -> Result<Box<ForHeader>> {
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
            Some(self.parse_expression()?.expression)
        };
        self.expect(")")?;
        Ok(Box::new(ForHeader {
            init,
            condition,
            increment,
        }))
    }

    fn finish_for(
        &mut self,
        start: u32,
        header: Box<ForHeader>,
        body: Statement,
    ) -> Result<Statement> {
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

    fn parse_expression(&mut self) -> Result<Measured> {
        let start = self.start();
        let first = self.parse_assignment()?;
        if self.at(",") {
            self.parse_sequence(start, first)
        } else {
            Ok(first)
        }
    }

    fn parse_sequence(&mut self, start: u32, first: Measured) -> Result<Measured> {
        let mut height = first.height;
        let mut expressions = Vec::from([first.expression]);
        while self.eat(",") {
            let next = self.parse_assignment()?;
            height = height.max(next.height);
            expressions.push(next.expression);
        }
        self.measured(start, ExpressionKind::Sequence(expressions), height)
    }

    fn parse_assignment(&mut self) -> Result<Measured> {
        self.enter_expression()?;
        let expression = self.parse_unguarded_assignment();
        self.leave_expression();
        expression
    }

    fn parse_unguarded_assignment(&mut self) -> Result<Measured> {
        let start = self.start();
        let target = self.parse_conditional()?;
        let operator = match self.peek().kind {
            TokenKind::Punctuator(symbol) => AssignmentOperator::from_symbol(symbol),
            _ => None,
        };
        match operator {
            Some(operator) => self.parse_assigned_value(start, target, operator),
            None => Ok(target),
        }
    }

    fn parse_assigned_value(
        &mut self,
        start: u32,
        target: Measured,
        operator: AssignmentOperator,
    ) -> Result<Measured> {
        let is_unary_expression = !matches!(
            target.expression.kind,
            ExpressionKind::Binary { .. } | ExpressionKind::Conditional { .. }
        );
        if !is_unary_expression {
            return Err(self.unexpected("the end of the expression"));
        }
        self.advance();
        let value = self.parse_assignment()?;
        let height = target.height.max(value.height);
        let kind = ExpressionKind::Assignment {
            operator,
            target: Box::new(target.expression),
            value: Box::new(value.expression),
        };
        self.measured(start, kind, height)
    }

    fn parse_conditional(&mut self) -> Result<Measured> {
        let start = self.start();
        let condition = self.parse_binary()?;
        if self.at("?") {
            self.parse_conditional_branches(start, condition)
        } else {
            Ok(condition)
        }
    }

    fn parse_conditional_branches(&mut self, start: u32, condition: Measured) -> Result<Measured> {
        self.expect("?")?;
        let then_expression = self.parse_expression()?;
        self.expect(":")?;
        let else_expression = self.parse_assignment()?;
        let height = condition
            .height
            .max(then_expression.height)
            .max(else_expression.height);
        let kind = ExpressionKind::Conditional {
            condition: Box::new(condition.expression),
            then_expression: Box::new(then_expression.expression),
            else_expression: Box::new(else_expression.expression),
        };
        self.measured(start, kind, height)
    }

    fn peek_binary_operator(&self) -> Option<BinaryOperator> {
        match self.peek().kind {
            TokenKind::Punctuator(symbol) => BinaryOperator::from_symbol(symbol),
            _ => None,
        }
    }

    fn parse_binary(&mut self) -> Result<Measured> {
        let start = self.start();
        let first = self.parse_unary()?;
        if self.peek_binary_operator().is_some() {
            self.parse_binary_operands(start, first)
        } else {
            Ok(first)
        }
    }

    fn parse_binary_operands(&mut self, start: u32, first: Measured) -> Result<Measured> {
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
            let operand = self.parse_unary()?;
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

    fn reduce_binary(&mut self, pending: &mut PendingBinary) -> Result<()> {
        let operator = pending.operators.pop();
        let right = pending.operands.pop();
        let left = pending.operands.pop();
        let (Some(operator), Some((_, right)), Some((start, left))) = (operator, right, left)
        else {
            return Err(self.unexpected("an expression"));
        };
        let height = left.height.max(right.height);
        let kind = ExpressionKind::Binary {
            operator,
            left: Box::new(left.expression),
            right: Box::new(right.expression),
        };
        let reduced = self.measured(start, kind, height)?;
        pending.operands.push((start, reduced));
        Ok(())
    }

    fn parse_unary(&mut self) -> Result<Measured> {
        self.enter_expression()?;
        let operator = match self.peek().kind {
            TokenKind::Punctuator(symbol) => UnaryOperator::from_symbol(symbol),
            _ => None,
        };
        let expression = match operator {
            Some(operator) => self.parse_unary_operand(operator),
            None if self.starts_cast() => self.parse_cast(),
            None => self.parse_postfix(),
        };
        self.leave_expression();
        expression
    }

    fn starts_cast(&self) -> bool {
        if !self.at("(") || !self.extensions.is_on(EXPLICIT_TYPECAST) {
            return false;
        }
        match self.token_at(self.cursor.saturating_add(1)).kind {
            TokenKind::Word(word) if self.is_type_name(word) => true,
            TokenKind::Word(word) => self.casts_to_name(word),
            _ => false,
        }
    }

    fn casts_to_name(&self, word: &str) -> bool {
        if is_reserved_word(word)
            || self.token_at(self.cursor.saturating_add(2)).kind != TokenKind::Punctuator(")")
        {
            return false;
        }
        match self.token_at(self.cursor.saturating_add(3)).kind {
            TokenKind::Word(next) => !is_reserved_word(next) || matches!(next, "true" | "false"),
            TokenKind::Number { .. } => true,
            _ => false,
        }
    }

    fn parse_cast(&mut self) -> Result<Measured> {
        let start = self.start();
        self.expect("(")?;
        let name = match self.peek().kind {
            TokenKind::Word(word) if !self.is_type_name(word) => Some(word),
            _ => None,
        };
        let (specifier, height) = match name {
            Some(word) => {
                let span = self.peek().span;
                self.advance();
                let specifier = TypeSpecifier {
                    non_array: TypeSpecifierNonArray::TypeName(word.to_owned()),
                    parameters: None,
                    array: None,
                };
                (Spanned::new(span, specifier), 0)
            }
            None => self.parse_measured_type_specifier()?,
        };
        self.expect(")")?;
        let operand = self.parse_unary()?;
        let function = Spanned::new(
            specifier.span,
            FunctionIdentifier::Cast(Box::new(specifier.node)),
        );
        let kind = ExpressionKind::FunctionCall(Box::new(FunctionCall {
            function,
            arguments: alloc::vec![operand.expression],
        }));
        self.measured(start, kind, height.max(operand.height))
    }

    fn parse_unary_operand(&mut self, operator: UnaryOperator) -> Result<Measured> {
        let start = self.start();
        self.advance();
        let operand = self.parse_unary()?;
        let kind = ExpressionKind::Unary {
            operator,
            operand: Box::new(operand.expression),
        };
        self.measured(start, kind, operand.height)
    }

    fn parse_postfix(&mut self) -> Result<Measured> {
        let start = self.start();
        let mut base = self.parse_primary()?;
        while self.at_postfix() {
            base = self.parse_postfix_step(start, base)?;
        }
        Ok(base)
    }

    fn at_postfix(&self) -> bool {
        matches!(
            self.peek().kind,
            TokenKind::Punctuator("[" | "." | "(" | "++" | "--")
        )
    }

    fn parse_postfix_step(&mut self, start: u32, base: Measured) -> Result<Measured> {
        match self.peek().kind {
            TokenKind::Punctuator("[") => self.parse_subscript(start, base),
            TokenKind::Punctuator(".") => self.parse_field_selection(start, base),
            TokenKind::Punctuator("(") => self.parse_expression_call(start, base),
            TokenKind::Punctuator("++") => {
                self.parse_postfix_operator(start, base, PostfixOperator::Increment)
            }
            _ => self.parse_postfix_operator(start, base, PostfixOperator::Decrement),
        }
    }

    fn parse_expression_call(&mut self, start: u32, base: Measured) -> Result<Measured> {
        let callee = FunctionIdentifier::Expression(Box::new(base.expression));
        let function = self.spanned(start, callee);
        self.parse_call(start, function, base.height)
    }

    fn parse_subscript(&mut self, start: u32, base: Measured) -> Result<Measured> {
        self.expect("[")?;
        let index = self.parse_expression()?;
        self.expect("]")?;
        let kind = ExpressionKind::Subscript {
            base: Box::new(base.expression),
            index: Box::new(index.expression),
        };
        self.measured(start, kind, base.height.max(index.height))
    }

    fn parse_field_selection(&mut self, start: u32, base: Measured) -> Result<Measured> {
        self.expect(".")?;
        let field = self.identifier()?;
        if self.at("(") {
            let method = FunctionIdentifier::Method {
                object: Box::new(base.expression),
                name: field,
            };
            let function = self.spanned(start, method);
            return self.parse_call(start, function, base.height);
        }
        let kind = ExpressionKind::FieldSelection {
            base: Box::new(base.expression),
            field,
        };
        self.measured(start, kind, base.height)
    }

    fn parse_postfix_operator(
        &mut self,
        start: u32,
        operand: Measured,
        operator: PostfixOperator,
    ) -> Result<Measured> {
        self.advance();
        let kind = ExpressionKind::Postfix {
            operand: Box::new(operand.expression),
            operator,
        };
        self.measured(start, kind, operand.height)
    }

    fn parse_call(
        &mut self,
        start: u32,
        function: Spanned<FunctionIdentifier>,
        function_height: u32,
    ) -> Result<Measured> {
        self.expect("(")?;
        let mut arguments = Vec::new();
        let mut height = function_height;
        let is_void_list = self.at_word("void") && self.at_nth(1, ")");
        if is_void_list {
            self.advance();
        } else if !self.at(")") {
            loop {
                let argument = self.parse_assignment()?;
                height = height.max(argument.height);
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
        self.measured(start, ExpressionKind::FunctionCall(Box::new(call)), height)
    }

    fn parse_primary(&mut self) -> Result<Measured> {
        let token = self.peek();
        match token.kind {
            TokenKind::Number { .. } | TokenKind::String(_) | TokenKind::Word("true" | "false") => {
                self.parse_literal(token)
            }
            TokenKind::Punctuator("(") => self.parse_parenthesized(),
            TokenKind::Word(NON_UNIFORM) if self.at_nth(1, "(") => self.parse_non_uniform(token),
            TokenKind::Word(word) if self.starts_constructor(word) => self.parse_constructor(),
            TokenKind::Word(word) if !is_reserved_word(word) => self.parse_name(token, word),
            TokenKind::Word(word) if is_unavailable_word(word) => {
                Err(self.error(ParseErrorKind::ReservedWord(word.to_owned()), token.span))
            }
            _ => Err(self.unexpected("an expression")),
        }
    }

    fn parse_literal(&mut self, token: Token<'a>) -> Result<Measured> {
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
        self.measured(start, kind, 0)
    }

    fn parse_non_uniform(&mut self, token: Token<'a>) -> Result<Measured> {
        self.require_non_uniform(token.span)?;
        self.advance();
        let function = Spanned::new(
            token.span,
            FunctionIdentifier::Function(NON_UNIFORM.to_owned()),
        );
        self.parse_call(token.span.start, function, 0)
    }

    fn parse_name(&mut self, token: Token<'a>, word: &str) -> Result<Measured> {
        let start = token.span.start;
        self.advance();
        if self.at("(") {
            let function = Spanned::new(token.span, FunctionIdentifier::Function(word.to_owned()));
            self.parse_call(start, function, 0)
        } else {
            self.measured(start, ExpressionKind::Variable(word.to_owned()), 0)
        }
    }

    fn parse_parenthesized(&mut self) -> Result<Measured> {
        let start = self.start();
        self.expect("(")?;
        let inner = self.parse_expression()?;
        self.expect(")")?;
        let kind = ExpressionKind::Parenthesized(Box::new(inner.expression));
        self.measured(start, kind, inner.height)
    }

    fn parse_constructor(&mut self) -> Result<Measured> {
        let start = self.start();
        let (specifier, height) = self.parse_measured_type_specifier()?;
        let function = Spanned::new(
            specifier.span,
            FunctionIdentifier::Constructor(Box::new(specifier.node)),
        );
        self.parse_call(start, function, height)
    }
}
