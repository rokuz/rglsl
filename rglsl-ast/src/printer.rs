use alloc::format;
use alloc::string::String;
use core::fmt;

use crate::ast::{
    ArrayDimension, ArraySpecifier, CaseLabel, CompoundStatement, Condition, Declaration,
    DeclarationKind, Expression, ExpressionKind, ExternalDeclaration, FullySpecifiedType,
    FunctionIdentifier, FunctionPrototype, InitDeclaratorList, Initializer, JumpStatement,
    SingleTypeQualifier, Spanned, Statement, StatementKind, StructDeclaration, TranslationUnit,
    TypeQualifier, TypeSpecifier, TypeSpecifierNonArray, UnaryOperator,
};

const INDENT: &str = "    ";

pub fn print(unit: &TranslationUnit) -> String {
    let mut printer = Printer::default();
    printer.translation_unit(unit);
    printer.output
}

impl fmt::Display for TranslationUnit {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(&print(self))
    }
}

impl fmt::Display for Expression {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut printer = Printer::default();
        printer.expression(self);
        formatter.write_str(&printer.output)
    }
}

impl fmt::Display for Statement {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut printer = Printer::default();
        printer.statement(self);
        formatter.write_str(&printer.output)
    }
}

impl fmt::Display for Declaration {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut printer = Printer::default();
        printer.declaration(self);
        formatter.write_str(&printer.output)
    }
}

#[derive(Debug, Default)]
struct Printer {
    output: String,
    depth: usize,
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
            | DeclarationKind::QualifiedIdentifiers { .. } => true,
        },
    }
}

const fn is_directive(external: &ExternalDeclaration) -> bool {
    matches!(external, ExternalDeclaration::Directive(_))
}

impl Printer {
    fn write(&mut self, text: &str) {
        self.output.push_str(text);
    }

    fn indent(&mut self) {
        for _ in 0..self.depth {
            self.output.push_str(INDENT);
        }
    }

    fn line_end(&mut self) {
        self.output.push('\n');
    }

    fn indented(&mut self, print: impl FnOnce(&mut Self)) {
        self.depth += 1;
        print(self);
        self.depth = self.depth.saturating_sub(1);
    }

    fn separated<T>(&mut self, items: &[T], mut print: impl FnMut(&mut Self, &T)) {
        for (index, item) in items.iter().enumerate() {
            if index > 0 {
                self.write(", ");
            }
            print(self, item);
        }
    }

    fn translation_unit(&mut self, unit: &TranslationUnit) {
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
            self.external_declaration(external);
            self.line_end();
            previous = Some(external);
        }
    }

    fn external_declaration(&mut self, external: &ExternalDeclaration) {
        match external {
            ExternalDeclaration::Directive(directive) => self.write(&directive.raw),
            ExternalDeclaration::Semicolon(_) => self.write(";"),
            ExternalDeclaration::Declaration(declaration) => self.declaration(declaration),
            ExternalDeclaration::FunctionDefinition(definition) => {
                self.function_prototype(&definition.prototype);
                self.write(" ");
                self.compound(&definition.body);
            }
        }
    }

    fn declaration(&mut self, declaration: &Declaration) {
        match &declaration.kind {
            DeclarationKind::FunctionPrototype(prototype) => self.function_prototype(prototype),
            DeclarationKind::InitDeclaratorList(list) => self.init_declarator_list(list),
            DeclarationKind::Precision { qualifier, ty } => {
                self.write("precision ");
                self.write(qualifier.keyword());
                self.write(" ");
                self.type_specifier(ty);
            }
            DeclarationKind::Block {
                structure,
                instance,
            } => {
                self.type_qualifier(&structure.qualifier);
                self.write(" ");
                self.write(&structure.name);
                self.write(" ");
                self.struct_declaration_list(&structure.members);
                if let Some(instance) = instance {
                    self.write(" ");
                    self.write(&instance.name);
                    self.optional_array_specifier(instance.array.as_deref());
                }
            }
            DeclarationKind::Qualifier(qualifier) => self.type_qualifier(qualifier),
            DeclarationKind::QualifiedIdentifiers {
                qualifier,
                identifiers,
            } => {
                self.type_qualifier(qualifier);
                self.write(" ");
                self.separated(identifiers, |printer, identifier| printer.write(identifier));
            }
        }
        self.write(";");
    }

    fn function_prototype(&mut self, prototype: &FunctionPrototype) {
        self.fully_specified_type(&prototype.return_type);
        self.write(" ");
        self.write(&prototype.name);
        self.write("(");
        self.separated(&prototype.parameters, |printer, parameter| {
            printer.fully_specified_type(&parameter.ty);
            if let Some(name) = &parameter.name {
                printer.write(" ");
                printer.write(name);
            }
            printer.optional_array_specifier(parameter.array.as_deref());
        });
        self.write(")");
    }

    fn init_declarator_list(&mut self, list: &InitDeclaratorList) {
        self.fully_specified_type(&list.ty);
        if !list.declarators.is_empty() {
            self.write(" ");
        }
        self.separated(&list.declarators, |printer, declarator| {
            printer.write(&declarator.name);
            printer.optional_array_specifier(declarator.array.as_deref());
            if let Some(initializer) = &declarator.initializer {
                printer.write(" = ");
                printer.initializer(initializer);
            }
        });
    }

    fn initializer(&mut self, initializer: &Initializer) {
        match initializer {
            Initializer::Expression(expression) => self.expression(expression),
            Initializer::List(elements) => {
                self.write("{");
                self.separated(elements, |printer, element| printer.initializer(element));
                self.write("}");
            }
        }
    }

    fn struct_declaration_list(&mut self, declarations: &[Spanned<StructDeclaration>]) {
        self.write("{");
        self.line_end();
        self.indented(|printer| {
            for declaration in declarations {
                printer.indent();
                printer.fully_specified_type(&declaration.ty);
                printer.write(" ");
                printer.separated(&declaration.declarators, |printer, declarator| {
                    printer.write(&declarator.name);
                    printer.optional_array_specifier(declarator.array.as_deref());
                });
                printer.write(";");
                printer.line_end();
            }
        });
        self.indent();
        self.write("}");
    }

    fn fully_specified_type(&mut self, ty: &FullySpecifiedType) {
        if let Some(qualifier) = &ty.qualifier {
            self.type_qualifier(qualifier);
            self.write(" ");
        }
        self.type_specifier(&ty.specifier);
    }

    fn type_qualifier(&mut self, qualifier: &TypeQualifier) {
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
                        self.separated(type_names, |printer, name| printer.write(name));
                        self.write(")");
                    }
                }
                SingleTypeQualifier::Invariant => self.write("invariant"),
                SingleTypeQualifier::Precise => self.write("precise"),
                SingleTypeQualifier::NonUniform => self.write("nonuniformEXT"),
                SingleTypeQualifier::Layout(layout) => {
                    self.write("layout(");
                    self.separated(&layout.ids, |printer, id| {
                        printer.write(&id.name);
                        if let Some(value) = &id.value {
                            printer.write(" = ");
                            printer.expression(value);
                        }
                    });
                    self.write(")");
                }
            }
        }
    }

    fn type_specifier(&mut self, specifier: &TypeSpecifier) {
        match &specifier.non_array {
            TypeSpecifierNonArray::Void => self.write("void"),
            TypeSpecifierNonArray::Basic(basic) => {
                use fmt::Write as _;
                let _ = write!(self.output, "{basic}");
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
                self.struct_declaration_list(&specifier.declarations);
            }
            TypeSpecifierNonArray::InlineBlock(declarations) => {
                self.struct_declaration_list(declarations);
            }
        }
        if let Some(parameters) = &specifier.parameters {
            self.write("<");
            let mut first = true;
            if let Some(element) = &parameters.element {
                self.type_specifier(element);
                first = false;
            }
            for value in &parameters.values {
                if !first {
                    self.write(", ");
                }
                first = false;
                self.expression(value);
            }
            self.write(">");
        }
        self.optional_array_specifier(specifier.array.as_deref());
    }

    fn optional_array_specifier(&mut self, specifier: Option<&ArraySpecifier>) {
        let Some(specifier) = specifier else {
            return;
        };
        for dimension in &specifier.dimensions {
            self.write("[");
            if let ArrayDimension::Sized(size) = &dimension.node {
                self.expression(size);
            }
            self.write("]");
        }
    }

    fn compound(&mut self, compound: &CompoundStatement) {
        self.write("{");
        self.line_end();
        self.indented(|printer| {
            for statement in &compound.statements {
                printer.statement(statement);
            }
        });
        self.indent();
        self.write("}");
    }

    fn statement(&mut self, statement: &Statement) {
        self.indent();
        self.statement_content(statement);
        self.line_end();
    }

    fn statement_content(&mut self, statement: &Statement) {
        match &statement.kind {
            StatementKind::Compound(compound) => self.compound(compound),
            StatementKind::Declaration(declaration) => self.declaration(declaration),
            StatementKind::Expression(expression) => {
                if let Some(expression) = expression {
                    self.expression(expression);
                }
                self.write(";");
            }
            StatementKind::Selection {
                condition,
                then_branch,
                else_branch,
            } => self.selection(condition, then_branch, else_branch.as_deref()),
            StatementKind::Switch {
                selector,
                statements,
            } => self.switch(selector, statements),
            StatementKind::CaseLabel(label) => self.case_label(label),
            StatementKind::While { condition, body } => {
                self.write("while (");
                self.condition(condition);
                self.write(")");
                self.body(body);
            }
            StatementKind::DoWhile { body, condition } => {
                self.write("do");
                if self.body(body) {
                    self.write(" ");
                } else {
                    self.line_end();
                    self.indent();
                }
                self.write("while (");
                self.expression(condition);
                self.write(");");
            }
            StatementKind::For(statement) => {
                self.write("for (");
                self.statement_content(&statement.init);
                if let Some(condition) = &statement.condition {
                    self.write(" ");
                    self.condition(condition);
                }
                self.write(";");
                if let Some(increment) = &statement.increment {
                    self.write(" ");
                    self.expression(increment);
                }
                self.write(")");
                self.body(&statement.body);
            }
            StatementKind::Jump(jump) => self.jump(jump),
        }
    }

    fn body(&mut self, body: &Statement) -> bool {
        if let StatementKind::Compound(compound) = &body.kind {
            self.write(" ");
            self.compound(compound);
            return true;
        }
        self.line_end();
        self.indented(|printer| {
            printer.indent();
            printer.statement_content(body);
        });
        false
    }

    fn selection(
        &mut self,
        condition: &Expression,
        then_branch: &Statement,
        else_branch: Option<&Statement>,
    ) {
        self.write("if (");
        self.expression(condition);
        self.write(")");
        let then_is_compound = self.body(then_branch);
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
            self.statement_content(else_branch);
        } else {
            self.body(else_branch);
        }
    }

    fn switch(&mut self, selector: &Expression, statements: &[Statement]) {
        self.write("switch (");
        self.expression(selector);
        self.write(") {");
        self.line_end();
        self.indented(|printer| {
            for statement in statements {
                if matches!(statement.kind, StatementKind::CaseLabel(_)) {
                    printer.statement(statement);
                } else {
                    printer.indented(|printer| printer.statement(statement));
                }
            }
        });
        self.indent();
        self.write("}");
    }

    fn case_label(&mut self, label: &CaseLabel) {
        match label {
            CaseLabel::Case(value) => {
                self.write("case ");
                self.expression(value);
                self.write(":");
            }
            CaseLabel::Default => self.write("default:"),
        }
    }

    fn condition(&mut self, condition: &Condition) {
        match condition {
            Condition::Expression(expression) => self.expression(expression),
            Condition::Declaration(declaration) => {
                self.fully_specified_type(&declaration.ty);
                self.write(" ");
                self.write(&declaration.name);
                self.write(" = ");
                self.initializer(&declaration.initializer);
            }
        }
    }

    fn jump(&mut self, jump: &JumpStatement) {
        match jump {
            JumpStatement::Continue => self.write("continue;"),
            JumpStatement::Break => self.write("break;"),
            JumpStatement::Discard => self.write("discard;"),
            JumpStatement::TerminateRay => self.write("terminateRayEXT;"),
            JumpStatement::IgnoreIntersection => self.write("ignoreIntersectionEXT;"),
            JumpStatement::Return(None) => self.write("return;"),
            JumpStatement::Return(Some(value)) => {
                self.write("return ");
                self.expression(value);
                self.write(";");
            }
        }
    }

    fn arguments(&mut self, arguments: &[Expression]) {
        self.write("(");
        self.separated(arguments, |printer, argument| printer.expression(argument));
        self.write(")");
    }

    fn string(&mut self, value: &str) {
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

    fn expression(&mut self, expression: &Expression) {
        match &expression.kind {
            ExpressionKind::Variable(name) => self.write(name),
            ExpressionKind::Number(literal) => self.write(&literal.text),
            ExpressionKind::Bool(value) => self.write(if *value { "true" } else { "false" }),
            ExpressionKind::String(value) => self.string(value),
            ExpressionKind::Parenthesized(inner) => {
                self.write("(");
                self.expression(inner);
                self.write(")");
            }
            ExpressionKind::Subscript { base, index } => {
                self.expression(base);
                self.write("[");
                self.expression(index);
                self.write("]");
            }
            ExpressionKind::FunctionCall(call) => {
                match &call.function.node {
                    FunctionIdentifier::Constructor(specifier) => self.type_specifier(specifier),
                    FunctionIdentifier::Function(name) => self.write(name),
                    FunctionIdentifier::Expression(callee) => self.expression(callee),
                    FunctionIdentifier::Method { object, name } => {
                        self.expression(object);
                        self.write(".");
                        self.write(name);
                    }
                }
                self.arguments(&call.arguments);
            }
            ExpressionKind::FieldSelection { base, field } => {
                self.expression(base);
                self.write(".");
                self.write(field);
            }
            ExpressionKind::Postfix { operand, operator } => {
                self.expression(operand);
                self.write(operator.symbol());
            }
            ExpressionKind::Unary { operator, operand } => {
                self.write(operator.symbol());
                if is_sign(*operator) && starts_with_sign(operand) {
                    self.write(" ");
                }
                self.expression(operand);
            }
            ExpressionKind::Binary {
                operator,
                left,
                right,
            } => {
                self.expression(left);
                self.write(" ");
                self.write(operator.symbol());
                self.write(" ");
                self.expression(right);
            }
            ExpressionKind::Conditional {
                condition,
                then_expression,
                else_expression,
            } => {
                self.expression(condition);
                self.write(" ? ");
                self.expression(then_expression);
                self.write(" : ");
                self.expression(else_expression);
            }
            ExpressionKind::Assignment {
                operator,
                target,
                value,
            } => {
                self.expression(target);
                self.write(" ");
                self.write(operator.symbol());
                self.write(" ");
                self.expression(value);
            }
            ExpressionKind::Sequence(expressions) => {
                self.separated(expressions, |printer, element| {
                    printer.expression(element);
                });
            }
        }
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
