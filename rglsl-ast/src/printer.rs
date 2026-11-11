use alloc::format;
use alloc::string::String;
use alloc::vec::Vec;
use core::cell::{Cell, RefCell};
use core::fmt;
use core::future::Future;
use core::ops::Deref;

use rglsl_types::stack::{run, Call, Stack};

use crate::ast::{
    ArrayDimension, ArraySpecifier, Attribute, CaseLabel, CompoundStatement, Condition,
    Declaration, DeclarationKind, Expression, ExpressionKind, ExternalDeclaration,
    FullySpecifiedType, FunctionIdentifier, FunctionPrototype, InitDeclaratorList, Initializer,
    JumpStatement, SingleTypeQualifier, Spanned, SpirvDecorate, SpirvInstructionQualifier,
    SpirvRequirement, SpirvTypeParameter, SpirvTypeSpecifier, Statement, StatementKind,
    StructDeclaration, TranslationUnit, TypeQualifier, TypeSpecifier, TypeSpecifierNonArray,
    UnaryOperator,
};

const INDENT: &str = "    ";

pub fn print(unit: &TranslationUnit) -> String {
    let printer = Printer::default();
    let finished = run(|stack| printer.cx(stack).translation_unit(unit));
    printer.finish(finished)
}

impl fmt::Display for TranslationUnit {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(&print(self))
    }
}

impl fmt::Display for Expression {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let printer = Printer::default();
        let finished = run(|stack| printer.cx(stack).expression(self));
        formatter.write_str(&printer.finish(finished))
    }
}

impl fmt::Display for Statement {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let printer = Printer::default();
        let finished = run(|stack| printer.cx(stack).statement(self));
        formatter.write_str(&printer.finish(finished))
    }
}

impl fmt::Display for Declaration {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let printer = Printer::default();
        let finished = run(|stack| printer.cx(stack).declaration(self));
        formatter.write_str(&printer.finish(finished))
    }
}

#[derive(Debug, Default)]
struct Printer {
    output: RefCell<String>,
    depth: Cell<usize>,
}

#[derive(Clone)]
struct Cx<'b> {
    printer: &'b Printer,
    stack: Stack<'b>,
}

impl Deref for Cx<'_> {
    type Target = Printer;

    fn deref(&self) -> &Printer {
        self.printer
    }
}

impl<'b> Cx<'b> {
    fn call<T: 'b>(&self, frame: impl Future<Output = T> + 'b) -> Call<'b, T> {
        self.stack.call(frame)
    }
}

const fn is_single_line(external: &ExternalDeclaration) -> bool {
    match external {
        ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => true,
        ExternalDeclaration::FunctionDefinition(_) => false,
        ExternalDeclaration::Declaration(declaration) => match &declaration.kind {
            DeclarationKind::Block { .. } => false,
            DeclarationKind::InitDeclaratorList(list) => !matches!(
                list.ty.node.specifier.node.non_array,
                TypeSpecifierNonArray::Struct(_)
            ),
            DeclarationKind::FunctionPrototype(_)
            | DeclarationKind::Precision { .. }
            | DeclarationKind::Qualifier(_)
            | DeclarationKind::QualifiedIdentifiers { .. }
            | DeclarationKind::SpirvInstruction { .. }
            | DeclarationKind::SpirvExecutionMode(_) => true,
        },
    }
}

const fn is_directive(external: &ExternalDeclaration) -> bool {
    matches!(external, ExternalDeclaration::Directive(_))
}

impl Printer {
    const fn cx<'b>(&'b self, stack: Stack<'b>) -> Cx<'b> {
        Cx {
            printer: self,
            stack,
        }
    }

    fn finish(self, finished: Option<()>) -> String {
        match finished {
            Some(()) => self.output.into_inner(),
            None => String::new(),
        }
    }

    fn write(&self, text: &str) {
        self.output.borrow_mut().push_str(text);
    }

    fn indent(&self) {
        let mut output = self.output.borrow_mut();
        for _ in 0..self.depth.get() {
            output.push_str(INDENT);
        }
    }

    fn line_end(&self) {
        self.output.borrow_mut().push('\n');
    }

    fn deeper(&self) {
        self.depth.set(self.depth.get().saturating_add(1));
    }

    fn shallower(&self) {
        self.depth.set(self.depth.get().saturating_sub(1));
    }

    fn comma(&self, index: usize) {
        if index > 0 {
            self.write(", ");
        }
    }

    fn string(&self, value: &str) {
        let mut escaped = String::from("\"");
        for character in value.chars() {
            match character {
                '"' => escaped.push_str("\\\""),
                '\\' => escaped.push_str("\\\\"),
                '\u{7}' => escaped.push_str("\\a"),
                '\u{8}' => escaped.push_str("\\b"),
                '\u{c}' => escaped.push_str("\\f"),
                '\n' => escaped.push_str("\\n"),
                '\r' => escaped.push_str("\\r"),
                '\t' => escaped.push_str("\\t"),
                '\u{b}' => escaped.push_str("\\v"),
                _ if character.is_ascii_control() => {
                    escaped.push_str(&format!("\\{:03o}", u32::from(character)));
                }
                _ => escaped.push(character),
            }
        }
        escaped.push('"');
        self.write(&escaped);
    }
}

impl<'b> Cx<'b> {
    async fn translation_unit(self, unit: &'b TranslationUnit) {
        let mut previous: Option<&ExternalDeclaration> = None;
        for external in &unit.external_declarations {
            if let Some(previous) = previous {
                let stay_together = is_single_line(previous)
                    && is_single_line(external)
                    && is_directive(previous) == is_directive(external);
                if !stay_together {
                    self.line_end();
                }
            }
            self.call(self.clone().external_declaration(external)).await;
            self.line_end();
            previous = Some(external);
        }
    }

    async fn external_declaration(self, external: &'b ExternalDeclaration) {
        match external {
            ExternalDeclaration::Directive(directive) => self.write(&directive.raw),
            ExternalDeclaration::Semicolon(_) => self.write(";"),
            ExternalDeclaration::Declaration(declaration) => {
                self.call(self.clone().declaration(declaration)).await
            }
            ExternalDeclaration::FunctionDefinition(definition) => {
                self.call(self.clone().function_prototype(&definition.prototype))
                    .await;
                self.write(" ");
                self.call(self.clone().compound(&definition.body)).await;
            }
        }
    }

    async fn declaration(self, declaration: &'b Declaration) {
        match &declaration.kind {
            DeclarationKind::FunctionPrototype(prototype) => {
                self.call(self.clone().function_prototype(prototype)).await
            }
            DeclarationKind::InitDeclaratorList(list) => {
                self.call(self.clone().init_declarator_list(list)).await
            }
            DeclarationKind::Precision { qualifier, ty } => {
                self.write("precision ");
                self.write(qualifier.keyword());
                self.write(" ");
                self.call(self.clone().type_specifier(ty)).await;
            }
            DeclarationKind::Block {
                structure,
                instance,
            } => {
                self.call(self.clone().type_qualifier(&structure.qualifier))
                    .await;
                self.write(" ");
                self.write(&structure.name);
                self.write(" ");
                self.call(self.clone().struct_declaration_list(&structure.members))
                    .await;
                if let Some(instance) = instance {
                    self.write(" ");
                    self.write(&instance.name);
                    self.call(
                        self.clone()
                            .optional_array_specifier(instance.array.as_deref()),
                    )
                    .await;
                }
            }
            DeclarationKind::Qualifier(qualifier) => {
                self.call(self.clone().type_qualifier(qualifier)).await
            }
            DeclarationKind::QualifiedIdentifiers {
                qualifier,
                identifiers,
            } => {
                self.call(self.clone().type_qualifier(qualifier)).await;
                self.write(" ");
                for (index, identifier) in identifiers.iter().enumerate() {
                    self.comma(index);
                    self.write(identifier);
                }
            }
            DeclarationKind::SpirvInstruction {
                instruction,
                prototype,
            } => {
                self.write("spirv_instruction(");
                self.call(self.clone().spirv_requirements(&instruction.requirements))
                    .await;
                if !instruction.requirements.is_empty() {
                    self.write(", ");
                }
                self.call(
                    self.clone()
                        .spirv_instruction_qualifiers(&instruction.qualifiers),
                )
                .await;
                self.write(") ");
                self.call(self.clone().function_prototype(prototype)).await;
            }
            DeclarationKind::SpirvExecutionMode(mode) => {
                self.write(mode.kind.keyword());
                self.write("(");
                self.call(self.clone().spirv_requirements(&mode.requirements))
                    .await;
                if !mode.requirements.is_empty() {
                    self.write(", ");
                }
                self.call(self.clone().expression(&mode.mode)).await;
                for operand in &mode.operands {
                    self.write(", ");
                    self.call(self.clone().expression(operand)).await;
                }
                self.write(")");
            }
        }
        self.write(";");
    }

    async fn spirv_requirements(self, requirements: &'b [Spanned<SpirvRequirement>]) {
        for (index, requirement) in requirements.iter().enumerate() {
            self.comma(index);
            self.write(&requirement.name);
            self.write(" = [");
            for (index, value) in requirement.values.iter().enumerate() {
                self.comma(index);
                self.call(self.clone().expression(value)).await;
            }
            self.write("]");
        }
    }

    async fn spirv_instruction_qualifiers(
        self,
        qualifiers: &'b [Spanned<SpirvInstructionQualifier>],
    ) {
        for (index, qualifier) in qualifiers.iter().enumerate() {
            self.comma(index);
            self.write(&qualifier.name);
            self.write(" = ");
            self.call(self.clone().expression(&qualifier.value)).await;
        }
    }

    async fn spirv_decorate(self, decorate: &'b SpirvDecorate) {
        self.write(decorate.kind.keyword());
        self.write("(");
        self.call(self.clone().spirv_requirements(&decorate.requirements))
            .await;
        if !decorate.requirements.is_empty() {
            self.write(", ");
        }
        self.call(self.clone().expression(&decorate.decoration))
            .await;
        for operand in &decorate.operands {
            self.write(", ");
            self.call(self.clone().expression(operand)).await;
        }
        self.write(")");
    }

    async fn spirv_type(self, specifier: &'b SpirvTypeSpecifier) {
        self.write("spirv_type(");
        self.call(self.clone().spirv_requirements(&specifier.requirements))
            .await;
        if !specifier.requirements.is_empty() {
            self.write(", ");
        }
        self.call(
            self.clone()
                .spirv_instruction_qualifiers(&specifier.instruction),
        )
        .await;
        for parameter in &specifier.parameters {
            self.write(", ");
            match parameter {
                SpirvTypeParameter::Constant(value) => {
                    self.call(self.clone().expression(value)).await
                }
                SpirvTypeParameter::Type(ty) => self.call(self.clone().type_specifier(ty)).await,
            }
        }
        self.write(")");
    }

    async fn attribute_list(self, attributes: &'b [Attribute]) {
        self.write("[[");
        for (index, attribute) in attributes.iter().enumerate() {
            if index > 0 {
                self.write(", ");
            }
            self.write(&attribute.name.node);
            if let Some(argument) = &attribute.argument {
                self.write("(");
                self.call(self.clone().expression(argument)).await;
                self.write(")");
            }
        }
        self.write("]]");
    }

    async fn function_prototype(self, prototype: &'b FunctionPrototype) {
        if !prototype.attributes.is_empty() {
            self.call(self.clone().attribute_list(&prototype.attributes))
                .await;
            self.write(" ");
        }
        self.call(self.clone().fully_specified_type(&prototype.return_type))
            .await;
        self.write(" ");
        self.write(&prototype.name);
        self.write("(");
        for (index, parameter) in prototype.parameters.iter().enumerate() {
            self.comma(index);
            self.call(self.clone().fully_specified_type(&parameter.ty))
                .await;
            if let Some(name) = &parameter.name {
                self.write(" ");
                self.write(name);
            }
            self.call(
                self.clone()
                    .optional_array_specifier(parameter.array.as_deref()),
            )
            .await;
        }
        self.write(")");
        if !prototype.trailing_attributes.is_empty() {
            self.write(" ");
            self.call(self.clone().attribute_list(&prototype.trailing_attributes))
                .await;
        }
    }

    async fn init_declarator_list(self, list: &'b InitDeclaratorList) {
        self.call(self.clone().fully_specified_type(&list.ty)).await;
        if !list.declarators.is_empty() {
            self.write(" ");
        }
        for (index, declarator) in list.declarators.iter().enumerate() {
            self.comma(index);
            self.write(&declarator.name);
            self.call(
                self.clone()
                    .optional_array_specifier(declarator.array.as_deref()),
            )
            .await;
            if let Some(initializer) = &declarator.initializer {
                self.write(" = ");
                self.call(self.clone().initializer(initializer)).await;
            }
        }
    }

    async fn initializer(self, initializer: &'b Initializer) {
        match initializer {
            Initializer::Expression(expression) => {
                self.call(self.clone().expression(expression)).await
            }
            Initializer::List(elements) => {
                self.write("{");
                for (index, element) in elements.iter().enumerate() {
                    self.comma(index);
                    self.call(self.clone().initializer(element)).await;
                }
                self.write("}");
            }
        }
    }

    async fn struct_declaration_list(self, declarations: &'b [Spanned<StructDeclaration>]) {
        self.write("{");
        self.line_end();
        self.deeper();
        for declaration in declarations {
            self.indent();
            self.call(self.clone().fully_specified_type(&declaration.ty))
                .await;
            self.write(" ");
            for (index, declarator) in declaration.declarators.iter().enumerate() {
                self.comma(index);
                self.write(&declarator.name);
                self.call(
                    self.clone()
                        .optional_array_specifier(declarator.array.as_deref()),
                )
                .await;
            }
            self.write(";");
            self.line_end();
        }
        self.shallower();
        self.indent();
        self.write("}");
    }

    async fn fully_specified_type(self, ty: &'b FullySpecifiedType) {
        if let Some(qualifier) = &ty.qualifier {
            self.call(self.clone().type_qualifier(qualifier)).await;
            self.write(" ");
        }
        self.call(self.clone().type_specifier(&ty.specifier)).await;
    }

    async fn type_qualifier(self, qualifier: &'b TypeQualifier) {
        for (index, single) in qualifier.qualifiers.iter().enumerate() {
            if index > 0 {
                self.write(" ");
            }
            match &single.node {
                SingleTypeQualifier::Storage(storage) => self.write(storage.keyword()),
                SingleTypeQualifier::Precision(precision) => self.write(precision.keyword()),
                SingleTypeQualifier::Interpolation(interpolation) => {
                    self.write(interpolation.keyword());
                }
                SingleTypeQualifier::Subroutine(type_names) => {
                    self.write("subroutine");
                    if !type_names.is_empty() {
                        self.write("(");
                        for (index, name) in type_names.iter().enumerate() {
                            self.comma(index);
                            self.write(name);
                        }
                        self.write(")");
                    }
                }
                SingleTypeQualifier::Invariant => self.write("invariant"),
                SingleTypeQualifier::Precise => self.write("precise"),
                SingleTypeQualifier::NonUniform => self.write("nonuniformEXT"),
                SingleTypeQualifier::SpirvStorageClass(class) => {
                    self.write("spirv_storage_class(");
                    self.call(self.clone().spirv_requirements(&class.requirements))
                        .await;
                    if !class.requirements.is_empty() {
                        self.write(", ");
                    }
                    self.call(self.clone().expression(&class.class)).await;
                    self.write(")");
                }
                SingleTypeQualifier::SpirvDecorate(decorate) => {
                    self.call(self.clone().spirv_decorate(decorate)).await
                }
                SingleTypeQualifier::SpirvByReference => self.write("spirv_by_reference"),
                SingleTypeQualifier::SpirvLiteral => self.write("spirv_literal"),
                SingleTypeQualifier::Layout(layout) => {
                    self.write("layout(");
                    for (index, id) in layout.ids.iter().enumerate() {
                        self.comma(index);
                        self.write(&id.name);
                        if let Some(value) = &id.value {
                            self.write(" = ");
                            self.call(self.clone().expression(value)).await;
                        }
                    }
                    self.write(")");
                }
            }
        }
    }

    async fn type_specifier(self, specifier: &'b TypeSpecifier) {
        match &specifier.non_array {
            TypeSpecifierNonArray::Void => self.write("void"),
            TypeSpecifierNonArray::Basic(basic) => {
                use fmt::Write as _;
                let _ = write!(self.output.borrow_mut(), "{basic}");
            }
            TypeSpecifierNonArray::Opaque(name) | TypeSpecifierNonArray::TypeName(name) => {
                self.write(name);
            }
            TypeSpecifierNonArray::Parameterized(kind) => self.write(kind.keyword()),
            TypeSpecifierNonArray::Struct(specifier) => {
                self.write("struct ");
                if let Some(name) = &specifier.name {
                    self.write(name);
                    self.write(" ");
                }
                self.call(
                    self.clone()
                        .struct_declaration_list(&specifier.declarations),
                )
                .await;
            }
            TypeSpecifierNonArray::InlineBlock(declarations) => {
                self.call(self.clone().struct_declaration_list(declarations))
                    .await;
            }
            TypeSpecifierNonArray::Spirv(specifier) => {
                self.call(self.clone().spirv_type(specifier)).await
            }
        }
        if let Some(parameters) = &specifier.parameters {
            self.write("<");
            let mut first = true;
            if let Some(element) = &parameters.element {
                self.call(self.clone().type_specifier(element)).await;
                first = false;
            }
            for value in &parameters.values {
                if !first {
                    self.write(", ");
                }
                first = false;
                self.call(self.clone().expression(value)).await;
            }
            self.write(">");
        }
        self.call(
            self.clone()
                .optional_array_specifier(specifier.array.as_deref()),
        )
        .await;
    }

    async fn optional_array_specifier(self, specifier: Option<&'b ArraySpecifier>) {
        let Some(specifier) = specifier else {
            return;
        };
        for dimension in &specifier.dimensions {
            self.write("[");
            if let ArrayDimension::Sized(size) = &dimension.node {
                self.call(self.clone().expression(size)).await;
            }
            self.write("]");
        }
    }

    async fn compound(self, compound: &'b CompoundStatement) {
        self.write("{");
        self.line_end();
        self.deeper();
        for statement in &compound.statements {
            self.call(self.clone().statement(statement)).await;
        }
        self.shallower();
        self.indent();
        self.write("}");
    }

    async fn statement(self, statement: &'b Statement) {
        self.indent();
        self.call(self.clone().statement_content(statement)).await;
        self.line_end();
    }

    async fn statement_content(self, statement: &'b Statement) {
        match &statement.kind {
            StatementKind::Compound(compound) => self.call(self.clone().compound(compound)).await,
            StatementKind::Declaration(declaration) => {
                self.call(self.clone().declaration(declaration)).await
            }
            StatementKind::Expression(expression) => {
                if let Some(expression) = expression {
                    self.call(self.clone().expression(expression)).await;
                }
                self.write(";");
            }
            StatementKind::Selection {
                condition,
                then_branch,
                else_branch,
            } => {
                self.call(
                    self.clone()
                        .selection(condition, then_branch, else_branch.as_deref()),
                )
                .await
            }
            StatementKind::Switch {
                selector,
                statements,
            } => self.call(self.clone().switch(selector, statements)).await,
            StatementKind::CaseLabel(label) => self.call(self.clone().case_label(label)).await,
            StatementKind::While { condition, body } => {
                self.write("while (");
                self.call(self.clone().condition(condition)).await;
                self.write(")");
                self.call(self.clone().body(body)).await;
            }
            StatementKind::DoWhile { body, condition } => {
                self.write("do");
                if self.call(self.clone().body(body)).await {
                    self.write(" ");
                } else {
                    self.line_end();
                    self.indent();
                }
                self.write("while (");
                self.call(self.clone().expression(condition)).await;
                self.write(");");
            }
            StatementKind::For(statement) => {
                self.write("for (");
                self.call(self.clone().statement_content(&statement.init))
                    .await;
                if let Some(condition) = &statement.condition {
                    self.write(" ");
                    self.call(self.clone().condition(condition)).await;
                }
                self.write(";");
                if let Some(increment) = &statement.increment {
                    self.write(" ");
                    self.call(self.clone().expression(increment)).await;
                }
                self.write(")");
                self.call(self.clone().body(&statement.body)).await;
            }
            StatementKind::Jump(jump) => self.call(self.clone().jump(jump)).await,
            StatementKind::Attributed {
                attributes,
                statement,
            } => {
                self.call(self.clone().attribute_list(attributes)).await;
                self.write(" ");
                self.call(self.clone().statement_content(statement)).await;
            }
        }
    }

    async fn body(self, body: &'b Statement) -> bool {
        if let StatementKind::Compound(compound) = &body.kind {
            self.write(" ");
            self.call(self.clone().compound(compound)).await;
            return true;
        }
        self.line_end();
        self.deeper();
        self.indent();
        self.call(self.clone().statement_content(body)).await;
        self.shallower();
        false
    }

    async fn selection(
        self,
        condition: &'b Expression,
        then_branch: &'b Statement,
        else_branch: Option<&'b Statement>,
    ) {
        self.write("if (");
        self.call(self.clone().expression(condition)).await;
        self.write(")");
        let then_is_compound = self.call(self.clone().body(then_branch)).await;
        let Some(else_branch) = else_branch else {
            return;
        };
        if then_is_compound {
            self.write(" ");
        } else {
            self.line_end();
            self.indent();
        }
        self.write("else");
        if matches!(else_branch.kind, StatementKind::Selection { .. }) {
            self.write(" ");
            self.call(self.clone().statement_content(else_branch)).await;
        } else {
            self.call(self.clone().body(else_branch)).await;
        }
    }

    async fn switch(self, selector: &'b Expression, statements: &'b [Statement]) {
        self.write("switch (");
        self.call(self.clone().expression(selector)).await;
        self.write(") {");
        self.line_end();
        self.deeper();
        for statement in statements {
            if matches!(statement.kind, StatementKind::CaseLabel(_)) {
                self.call(self.clone().statement(statement)).await;
            } else {
                self.deeper();
                self.call(self.clone().statement(statement)).await;
                self.shallower();
            }
        }
        self.shallower();
        self.indent();
        self.write("}");
    }

    async fn case_label(self, label: &'b CaseLabel) {
        match label {
            CaseLabel::Case(value) => {
                self.write("case ");
                self.call(self.clone().expression(value)).await;
                self.write(":");
            }
            CaseLabel::Default => self.write("default:"),
        }
    }

    async fn condition(self, condition: &'b Condition) {
        match condition {
            Condition::Expression(expression) => {
                self.call(self.clone().expression(expression)).await
            }
            Condition::Declaration(declaration) => {
                self.call(self.clone().fully_specified_type(&declaration.ty))
                    .await;
                self.write(" ");
                self.write(&declaration.name);
                self.write(" = ");
                self.call(self.clone().initializer(&declaration.initializer))
                    .await;
            }
        }
    }

    async fn jump(self, jump: &'b JumpStatement) {
        match jump {
            JumpStatement::Continue => self.write("continue;"),
            JumpStatement::Break => self.write("break;"),
            JumpStatement::Discard => self.write("discard;"),
            JumpStatement::Demote => self.write("demote;"),
            JumpStatement::TerminateRay => self.write("terminateRayEXT;"),
            JumpStatement::IgnoreIntersection => self.write("ignoreIntersectionEXT;"),
            JumpStatement::Return(None) => self.write("return;"),
            JumpStatement::Return(Some(value)) => {
                self.write("return ");
                self.call(self.clone().expression(value)).await;
                self.write(";");
            }
        }
    }

    async fn expression(self, expression: &'b Expression) {
        let mut pieces = Vec::from([Piece::Expression(expression)]);
        while let Some(piece) = pieces.pop() {
            match piece {
                Piece::Text(text) => self.write(text),
                Piece::String(value) => self.string(value),
                Piece::Type(specifier) => self.call(self.clone().type_specifier(specifier)).await,
                Piece::Expression(expression) => {
                    let start = pieces.len();
                    expression_pieces(expression, &mut pieces);
                    if let Some(added) = pieces.get_mut(start..) {
                        added.reverse();
                    }
                }
            }
        }
    }
}

enum Piece<'a> {
    Text(&'a str),
    String(&'a str),
    Type(&'a TypeSpecifier),
    Expression(&'a Expression),
}

fn separated_pieces<'a>(items: &'a [Expression], pieces: &mut Vec<Piece<'a>>) {
    for (index, item) in items.iter().enumerate() {
        if index > 0 {
            pieces.push(Piece::Text(", "));
        }
        pieces.push(Piece::Expression(item));
    }
}

fn expression_pieces<'a>(expression: &'a Expression, pieces: &mut Vec<Piece<'a>>) {
    match &expression.kind {
        ExpressionKind::Variable(name) => pieces.push(Piece::Text(name)),
        ExpressionKind::Number(literal) => pieces.push(Piece::Text(&literal.text)),
        ExpressionKind::Bool(value) => {
            pieces.push(Piece::Text(if *value { "true" } else { "false" }))
        }
        ExpressionKind::String(value) => pieces.push(Piece::String(value)),
        ExpressionKind::Parenthesized(inner) => {
            pieces.push(Piece::Text("("));
            pieces.push(Piece::Expression(inner));
            pieces.push(Piece::Text(")"));
        }
        ExpressionKind::Subscript { base, index } => {
            pieces.push(Piece::Expression(base));
            pieces.push(Piece::Text("["));
            pieces.push(Piece::Expression(index));
            pieces.push(Piece::Text("]"));
        }
        ExpressionKind::FunctionCall(call) => {
            match &call.function.node {
                FunctionIdentifier::Constructor(specifier)
                | FunctionIdentifier::Cast(specifier) => {
                    pieces.push(Piece::Type(specifier));
                }
                FunctionIdentifier::Function(name) => pieces.push(Piece::Text(name)),
                FunctionIdentifier::Expression(callee) => pieces.push(Piece::Expression(callee)),
                FunctionIdentifier::Method { object, name } => {
                    pieces.push(Piece::Expression(object));
                    pieces.push(Piece::Text("."));
                    pieces.push(Piece::Text(name));
                }
            }
            pieces.push(Piece::Text("("));
            separated_pieces(&call.arguments, pieces);
            pieces.push(Piece::Text(")"));
        }
        ExpressionKind::FieldSelection { base, field } => {
            pieces.push(Piece::Expression(base));
            pieces.push(Piece::Text("."));
            pieces.push(Piece::Text(field));
        }
        ExpressionKind::Postfix { operand, operator } => {
            pieces.push(Piece::Expression(operand));
            pieces.push(Piece::Text(operator.symbol()));
        }
        ExpressionKind::Unary { operator, operand } => {
            pieces.push(Piece::Text(operator.symbol()));
            if is_sign(*operator) && starts_with_sign(operand) {
                pieces.push(Piece::Text(" "));
            }
            pieces.push(Piece::Expression(operand));
        }
        ExpressionKind::Binary {
            operator,
            left,
            right,
        } => {
            pieces.push(Piece::Expression(left));
            pieces.push(Piece::Text(" "));
            pieces.push(Piece::Text(operator.symbol()));
            pieces.push(Piece::Text(" "));
            pieces.push(Piece::Expression(right));
        }
        ExpressionKind::Conditional {
            condition,
            then_expression,
            else_expression,
        } => {
            pieces.push(Piece::Expression(condition));
            pieces.push(Piece::Text(" ? "));
            pieces.push(Piece::Expression(then_expression));
            pieces.push(Piece::Text(" : "));
            pieces.push(Piece::Expression(else_expression));
        }
        ExpressionKind::Assignment {
            operator,
            target,
            value,
        } => {
            pieces.push(Piece::Expression(target));
            pieces.push(Piece::Text(" "));
            pieces.push(Piece::Text(operator.symbol()));
            pieces.push(Piece::Text(" "));
            pieces.push(Piece::Expression(value));
        }
        ExpressionKind::Sequence(expressions) => separated_pieces(expressions, pieces),
    }
}

const fn is_sign(operator: UnaryOperator) -> bool {
    matches!(
        operator,
        UnaryOperator::Plus
            | UnaryOperator::Minus
            | UnaryOperator::Increment
            | UnaryOperator::Decrement
    )
}

const fn starts_with_sign(expression: &Expression) -> bool {
    matches!(expression.kind, ExpressionKind::Unary { operator, .. } if is_sign(operator))
}
