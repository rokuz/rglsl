use alloc::borrow::ToOwned;
use alloc::boxed::Box;
use alloc::collections::BTreeSet;
use alloc::format;
use alloc::string::String;
use alloc::vec::Vec;

use crate::ast::{
    ArrayDimension, ArraySpecifier, AssignmentOperator, BasicType, BinaryOperator, BlockInstance,
    BlockStructure, CaseLabel, CompoundStatement, Condition, ConditionDeclaration, Declaration,
    DeclarationKind, Directive, Expression, ExpressionKind, ExternalDeclaration, ForStatement,
    FullySpecifiedType, FunctionCall, FunctionDefinition, FunctionIdentifier, FunctionPrototype,
    Identifier, InitDeclarator, InitDeclaratorList, Initializer, JumpStatement, LayoutQualifier,
    LayoutQualifierId, Node, NodeId, NumericLiteral, ParameterDeclaration, PostfixOperator,
    PrecisionQualifier, SingleTypeQualifier, Spanned, Statement, StatementKind, StructDeclaration,
    StructDeclarator, StructSpecifier, TranslationUnit, TypeQualifier, TypeSpecifier,
    TypeSpecifierNonArray, UnaryOperator,
};
use crate::error::{ParseError, ParseErrorKind};
use crate::keywords::{
    is_opaque_type_keyword, is_reserved_word, is_type_keyword, is_unavailable_word,
};
use crate::lexer::{tokenize, Token, TokenKind};
use crate::span::Span;

pub const MAX_NESTING_DEPTH: u32 = 256;
pub const MAX_EXPRESSION_HEIGHT: u32 = 512;

type Result<T> = core::result::Result<T, Box<ParseError>>;

struct Measured {
    expression: Expression,
    height: u32,
}

struct PendingBinary {
    operands: Vec<(u32, Measured)>,
    operators: Vec<BinaryOperator>,
}

enum AfterQualifier {
    Declaration(Box<ExternalDeclaration>),
    Type(Spanned<TypeQualifier>),
}

struct Parser<'a> {
    source: &'a str,
    tokens: Vec<Token<'a>>,
    directives: Vec<Directive>,
    end: Token<'a>,
    cursor: usize,
    previous_end: u32,
    next_id: u32,
    depth: u32,
    struct_scopes: Vec<BTreeSet<&'a str>>,
}

pub fn parse(source: &str) -> core::result::Result<TranslationUnit, ParseError> {
    let lexed = tokenize(source)?;
    let mut parser = Parser {
        source,
        tokens: lexed.tokens,
        directives: lexed.directives,
        end: lexed.end,
        cursor: 0,
        previous_end: 0,
        next_id: 0,
        depth: 0,
        struct_scopes: Vec::from([BTreeSet::new()]),
    };
    let mut external_declarations = Vec::new();
    while parser.peek().kind != TokenKind::End {
        let external = parser
            .parse_external_declaration()
            .map_err(|error| *error)?;
        external_declarations.push(external);
    }
    Ok(TranslationUnit::new(
        external_declarations,
        NodeId::new(parser.next_id),
    ))
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
        if height > MAX_EXPRESSION_HEIGHT {
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

    fn is_struct_name(&self, word: &str) -> bool {
        self.struct_scopes.iter().any(|scope| scope.contains(word))
    }

    fn is_type_name(&self, word: &str) -> bool {
        is_type_keyword(word) || self.is_struct_name(word)
    }

    fn declare_struct(&mut self, name: &'a str) {
        if let Some(scope) = self.struct_scopes.last_mut() {
            scope.insert(name);
        }
    }

    fn token_after_array_specifier(&self) -> TokenKind<'a> {
        let mut index = self.cursor.saturating_add(1);
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
        if matches!(word, "precision" | "struct" | "layout" | "subroutine")
            || SingleTypeQualifier::from_keyword(word).is_some()
        {
            return true;
        }
        self.is_type_name(word) && matches!(self.token_after_array_specifier(), TokenKind::Word(_))
    }

    fn starts_constructor(&self, word: &str) -> bool {
        if BasicType::from_keyword(word).is_some() || is_opaque_type_keyword(word) {
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
        if self.eat_word("precision") {
            let qualifier = self.parse_precision_qualifier()?;
            let ty = self.parse_type_specifier()?;
            self.expect(";")?;
            return self.declaration(start, DeclarationKind::Precision { qualifier, ty });
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
            return self.parse_function(start, ty, name, allow_definition);
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
            let kind = self.parse_block(qualifier)?;
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
        allow_definition: bool,
    ) -> Result<ExternalDeclaration> {
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
        let prototype = self.spanned(
            start,
            FunctionPrototype {
                return_type,
                name,
                parameters,
            },
        );
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
            } else if let Some(single) = SingleTypeQualifier::from_keyword(word) {
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
            let non_array = if word == "struct" {
                TypeSpecifierNonArray::Struct(parser.parse_struct_specifier()?)
            } else {
                let non_array = if word == "void" {
                    TypeSpecifierNonArray::Void
                } else if let Some(basic) = BasicType::from_keyword(word) {
                    TypeSpecifierNonArray::Basic(basic)
                } else if is_opaque_type_keyword(word) {
                    TypeSpecifierNonArray::Opaque(word.to_owned())
                } else if parser.is_struct_name(word) {
                    TypeSpecifierNonArray::TypeName(word.to_owned())
                } else if is_unavailable_word(word) {
                    return Err(
                        parser.error(ParseErrorKind::ReservedWord(word.to_owned()), token.span)
                    );
                } else if is_reserved_word(word) {
                    return Err(parser.unexpected("a type"));
                } else {
                    return Err(
                        parser.error(ParseErrorKind::UnknownType(word.to_owned()), token.span)
                    );
                };
                parser.advance();
                non_array
            };
            let (array, height) = parser.parse_array_specifier()?;
            let specifier = TypeSpecifier { non_array, array };
            Ok((parser.spanned(token.span.start, specifier), height))
        })
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
            declarations.push(self.spanned(start, StructDeclaration { ty, declarators }));
            if self.eat("}") {
                return Ok(declarations);
            }
        }
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
            TokenKind::Word("return") => self.parse_return(),
            _ => self.parse_simple_statement(),
        }
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
        let body = self.parse_statement()?;
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
        self.enter()?;
        let expression = self.parse_unguarded_assignment();
        self.leave();
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
        self.enter()?;
        let operator = match self.peek().kind {
            TokenKind::Punctuator(symbol) => UnaryOperator::from_symbol(symbol),
            _ => None,
        };
        let expression = match operator {
            Some(operator) => self.parse_unary_operand(operator),
            None => self.parse_postfix(),
        };
        self.leave();
        expression
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
        loop {
            base = match self.peek().kind {
                TokenKind::Punctuator("[") => self.parse_subscript(start, base)?,
                TokenKind::Punctuator(".") => self.parse_field_selection(start, base)?,
                TokenKind::Punctuator("(") => {
                    let callee = FunctionIdentifier::Expression(Box::new(base.expression));
                    let function = self.spanned(start, callee);
                    self.parse_call(start, function, base.height)?
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
        let start = token.span.start;
        match token.kind {
            TokenKind::Number { kind, text } => {
                self.advance();
                let literal = NumericLiteral {
                    kind,
                    text: text.to_owned(),
                };
                self.measured(start, ExpressionKind::Number(literal), 0)
            }
            TokenKind::Punctuator("(") => self.parse_parenthesized(),
            TokenKind::Word("true") => {
                self.advance();
                self.measured(start, ExpressionKind::Bool(true), 0)
            }
            TokenKind::Word("false") => {
                self.advance();
                self.measured(start, ExpressionKind::Bool(false), 0)
            }
            TokenKind::Word(word) if self.starts_constructor(word) => self.parse_constructor(),
            TokenKind::Word(word) if !is_reserved_word(word) => {
                self.advance();
                if self.at("(") {
                    let function =
                        Spanned::new(token.span, FunctionIdentifier::Function(word.to_owned()));
                    self.parse_call(start, function, 0)
                } else {
                    self.measured(start, ExpressionKind::Variable(word.to_owned()), 0)
                }
            }
            TokenKind::Word(word) if is_unavailable_word(word) => {
                Err(self.error(ParseErrorKind::ReservedWord(word.to_owned()), token.span))
            }
            _ => Err(self.unexpected("an expression")),
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
