use alloc::format;
use alloc::string::String;
use core::fmt;

use rglsl_types::stack::recurse;

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

pub fn print(unit: &TranslationUnit) -> Result<String, fmt::Error> {
    let mut printer = Printer::default();
    printer.translation_unit(unit);
    printer.finish()
}

impl fmt::Display for TranslationUnit {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(&print(self)?)
    }
}

impl fmt::Display for Expression {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut printer = Printer::default();
        printer.expression(self);
        formatter.write_str(&printer.finish()?)
    }
}

impl fmt::Display for Statement {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut printer = Printer::default();
        printer.statement(self);
        formatter.write_str(&printer.finish()?)
    }
}

impl fmt::Display for Declaration {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mut printer = Printer::default();
        printer.declaration(self);
        formatter.write_str(&printer.finish()?)
    }
}

#[derive(Debug, Default)]
struct Printer {
    output: String,
    depth: usize,
    failed: bool,
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
    fn finish(self) -> Result<String, fmt::Error> {
        if self.failed {
            Err(fmt::Error)
        } else {
            Ok(self.output)
        }
    }

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

    const fn deeper(&mut self) {
        self.depth = self.depth.saturating_add(1);
    }

    const fn shallower(&mut self) {
        self.depth = self.depth.saturating_sub(1);
    }

    fn comma(&mut self, index: usize) {
        if index > 0 {
            self.write(", ");
        }
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
}

impl Printer {
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
            ExternalDeclaration::Directive(directive) => self.write(&directive.node.raw),
            ExternalDeclaration::Semicolon(_) => self.write(";"),
            ExternalDeclaration::Declaration(declaration) => {
                self.declaration(declaration);
            }
            ExternalDeclaration::FunctionDefinition(definition) => {
                self.function_prototype(&definition.kind.prototype.node);
                self.write(" ");
                self.compound(&definition.kind.body.node);
            }
        }
    }

    fn declaration(&mut self, declaration: &Declaration) {
        match &declaration.kind {
            DeclarationKind::FunctionPrototype(prototype) => {
                self.function_prototype(&prototype.node);
            }
            DeclarationKind::InitDeclaratorList(list) => {
                self.init_declarator_list(list);
            }
            DeclarationKind::Precision { qualifier, ty } => {
                self.write("precision ");
                self.write(qualifier.node.keyword());
                self.write(" ");
                self.type_specifier(&ty.node);
            }
            DeclarationKind::Block {
                structure,
                instance,
            } => {
                self.type_qualifier(&structure.qualifier.node);
                self.write(" ");
                self.write(&structure.name.node);
                self.write(" ");
                self.struct_declaration_list(&structure.members);
                if let Some(instance) = instance {
                    self.write(" ");
                    self.write(&instance.node.name.node);
                    self.optional_array_specifier(
                        instance.node.array.as_ref().map(|inner| &inner.node),
                    );
                }
            }
            DeclarationKind::Qualifier(qualifier) => {
                self.type_qualifier(&qualifier.node);
            }
            DeclarationKind::QualifiedIdentifiers {
                qualifier,
                identifiers,
            } => {
                self.type_qualifier(&qualifier.node);
                self.write(" ");
                for (index, identifier) in identifiers.iter().enumerate() {
                    self.comma(index);
                    self.write(&identifier.node);
                }
            }
            DeclarationKind::SpirvInstruction {
                instruction,
                prototype,
            } => {
                self.write("spirv_instruction(");
                self.spirv_requirements(&instruction.node.requirements);
                if !instruction.node.requirements.is_empty() {
                    self.write(", ");
                }
                self.spirv_instruction_qualifiers(&instruction.node.qualifiers);
                self.write(") ");
                self.function_prototype(&prototype.node);
            }
            DeclarationKind::SpirvExecutionMode(mode) => {
                self.write(mode.node.kind.keyword());
                self.write("(");
                self.spirv_requirements(&mode.node.requirements);
                if !mode.node.requirements.is_empty() {
                    self.write(", ");
                }
                self.expression(&mode.node.mode);
                for operand in &mode.node.operands {
                    self.write(", ");
                    self.expression(operand);
                }
                self.write(")");
            }
        }
        self.write(";");
    }

    fn spirv_requirements(&mut self, requirements: &[Spanned<SpirvRequirement>]) {
        for (index, requirement) in requirements.iter().enumerate() {
            self.comma(index);
            self.write(&requirement.node.name.node);
            self.write(" = [");
            for (index, value) in requirement.node.values.iter().enumerate() {
                self.comma(index);
                self.expression(value);
            }
            self.write("]");
        }
    }

    fn spirv_instruction_qualifiers(&mut self, qualifiers: &[Spanned<SpirvInstructionQualifier>]) {
        for (index, qualifier) in qualifiers.iter().enumerate() {
            self.comma(index);
            self.write(&qualifier.node.name.node);
            self.write(" = ");
            self.expression(&qualifier.node.value);
        }
    }

    fn spirv_decorate(&mut self, decorate: &SpirvDecorate) {
        self.write(decorate.kind.keyword());
        self.write("(");
        self.spirv_requirements(&decorate.requirements);
        if !decorate.requirements.is_empty() {
            self.write(", ");
        }
        self.expression(&decorate.decoration);
        for operand in &decorate.operands {
            self.write(", ");
            self.expression(operand);
        }
        self.write(")");
    }

    fn spirv_type(&mut self, specifier: &SpirvTypeSpecifier) {
        self.write("spirv_type(");
        self.spirv_requirements(&specifier.requirements);
        if !specifier.requirements.is_empty() {
            self.write(", ");
        }
        self.spirv_instruction_qualifiers(&specifier.instruction);
        for parameter in &specifier.parameters {
            self.write(", ");
            match parameter {
                SpirvTypeParameter::Constant(value) => {
                    self.expression(value);
                }
                SpirvTypeParameter::Type(ty) => {
                    self.type_specifier(&ty.node);
                }
            }
        }
        self.write(")");
    }

    fn attribute_list(&mut self, attributes: &[Attribute]) {
        self.write("[[");
        for (index, attribute) in attributes.iter().enumerate() {
            if index > 0 {
                self.write(", ");
            }
            self.write(&attribute.name.node);
            if let Some(argument) = &attribute.argument {
                self.write("(");
                self.expression(argument);
                self.write(")");
            }
        }
        self.write("]]");
    }

    fn function_prototype(&mut self, prototype: &FunctionPrototype) {
        if !prototype.attributes.is_empty() {
            self.attribute_list(&prototype.attributes);
            self.write(" ");
        }
        self.fully_specified_type(&prototype.return_type.node);
        self.write(" ");
        self.write(&prototype.name.node);
        self.write("(");
        for (index, parameter) in prototype.parameters.iter().enumerate() {
            self.comma(index);
            self.fully_specified_type(&parameter.kind.ty.node);
            if let Some(name) = &parameter.kind.name {
                self.write(" ");
                self.write(&name.node);
            }
            self.optional_array_specifier(parameter.kind.array.as_ref().map(|inner| &inner.node));
        }
        self.write(")");
        if !prototype.trailing_attributes.is_empty() {
            self.write(" ");
            self.attribute_list(&prototype.trailing_attributes);
        }
    }

    fn init_declarator_list(&mut self, list: &InitDeclaratorList) {
        self.fully_specified_type(&list.ty.node);
        if !list.declarators.is_empty() {
            self.write(" ");
        }
        for (index, declarator) in list.declarators.iter().enumerate() {
            self.comma(index);
            self.write(&declarator.kind.name.node);
            self.optional_array_specifier(declarator.kind.array.as_ref().map(|inner| &inner.node));
            if let Some(initializer) = &declarator.kind.initializer {
                self.write(" = ");
                self.initializer(&initializer.node);
            }
        }
    }

    fn initializer(&mut self, initializer: &Initializer) {
        recurse(|| match initializer {
            Initializer::Expression(expression) => self.expression(expression),
            Initializer::List(elements) => {
                self.write("{");
                for (index, element) in elements.iter().enumerate() {
                    self.comma(index);
                    self.initializer(&element.node);
                }
                self.write("}");
            }
        });
    }

    fn struct_declaration_list(&mut self, declarations: &[Spanned<StructDeclaration>]) {
        self.write("{");
        self.line_end();
        self.deeper();
        for declaration in declarations {
            self.indent();
            self.fully_specified_type(&declaration.node.ty.node);
            self.write(" ");
            for (index, declarator) in declaration.node.declarators.iter().enumerate() {
                self.comma(index);
                self.write(&declarator.node.name.node);
                self.optional_array_specifier(
                    declarator.node.array.as_ref().map(|inner| &inner.node),
                );
            }
            self.write(";");
            self.line_end();
        }
        self.shallower();
        self.indent();
        self.write("}");
    }

    fn fully_specified_type(&mut self, ty: &FullySpecifiedType) {
        if let Some(qualifier) = &ty.qualifier {
            self.type_qualifier(&qualifier.node);
            self.write(" ");
        }
        self.type_specifier(&ty.specifier.node);
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
                        for (index, name) in type_names.iter().enumerate() {
                            self.comma(index);
                            self.write(&name.node);
                        }
                        self.write(")");
                    }
                }
                SingleTypeQualifier::Invariant => self.write("invariant"),
                SingleTypeQualifier::Precise => self.write("precise"),
                SingleTypeQualifier::NonUniform => self.write("nonuniformEXT"),
                SingleTypeQualifier::SpirvStorageClass(class) => {
                    self.write("spirv_storage_class(");
                    self.spirv_requirements(&class.requirements);
                    if !class.requirements.is_empty() {
                        self.write(", ");
                    }
                    self.expression(&class.class);
                    self.write(")");
                }
                SingleTypeQualifier::SpirvDecorate(decorate) => {
                    self.spirv_decorate(decorate);
                }
                SingleTypeQualifier::SpirvByReference => self.write("spirv_by_reference"),
                SingleTypeQualifier::SpirvLiteral => self.write("spirv_literal"),
                SingleTypeQualifier::Layout(layout) => {
                    self.write("layout(");
                    for (index, id) in layout.ids.iter().enumerate() {
                        self.comma(index);
                        self.write(&id.node.name.node);
                        if let Some(value) = &id.node.value {
                            self.write(" = ");
                            self.expression(value);
                        }
                    }
                    self.write(")");
                }
            }
        }
    }

    fn type_specifier(&mut self, specifier: &TypeSpecifier) {
        recurse(|| {
            match &specifier.non_array {
                TypeSpecifierNonArray::Void => self.write("void"),
                TypeSpecifierNonArray::Basic(basic) => {
                    use fmt::Write as _;
                    if write!(self.output, "{basic}").is_err() {
                        self.failed = true;
                    }
                }
                TypeSpecifierNonArray::Opaque(keyword) => {
                    use fmt::Write as _;
                    if write!(self.output, "{keyword}").is_err() {
                        self.failed = true;
                    }
                }
                TypeSpecifierNonArray::TypeName(name) => self.write(name),
                TypeSpecifierNonArray::Parameterized(kind) => self.write(kind.keyword()),
                TypeSpecifierNonArray::Struct(specifier) => {
                    self.write("struct ");
                    if let Some(name) = &specifier.name {
                        self.write(&name.node);
                        self.write(" ");
                    }
                    self.struct_declaration_list(&specifier.declarations);
                }
                TypeSpecifierNonArray::InlineBlock(declarations) => {
                    self.struct_declaration_list(declarations);
                }
                TypeSpecifierNonArray::Spirv(specifier) => {
                    self.spirv_type(specifier);
                }
            }
            if let Some(parameters) = &specifier.parameters {
                self.write("<");
                let mut first = true;
                if let Some(element) = &parameters.node.element {
                    self.type_specifier(&element.node);
                    first = false;
                }
                for value in &parameters.node.values {
                    if !first {
                        self.write(", ");
                    }
                    first = false;
                    self.expression(value);
                }
                self.write(">");
            }
            self.optional_array_specifier(specifier.array.as_ref().map(|inner| &inner.node));
        });
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
        self.deeper();
        for statement in &compound.statements {
            self.statement(statement);
        }
        self.shallower();
        self.indent();
        self.write("}");
    }

    fn statement(&mut self, statement: &Statement) {
        self.indent();
        self.statement_content(statement);
        self.line_end();
    }

    fn statement_content(&mut self, statement: &Statement) {
        recurse(|| match &statement.kind {
            StatementKind::Compound(compound) => self.compound(compound),
            StatementKind::Declaration(declaration) => {
                self.declaration(declaration);
            }
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
            } => {
                self.selection(condition, then_branch, else_branch.as_deref());
            }
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
            StatementKind::Attributed {
                attributes,
                statement,
            } => {
                self.attribute_list(attributes);
                self.write(" ");
                self.statement_content(statement);
            }
        });
    }

    fn body(&mut self, body: &Statement) -> bool {
        if let StatementKind::Compound(compound) = &body.kind {
            self.write(" ");
            self.compound(compound);
            return true;
        }
        self.line_end();
        self.deeper();
        self.indent();
        self.statement_content(body);
        self.shallower();
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
        self.deeper();
        for statement in statements {
            if matches!(statement.kind, StatementKind::CaseLabel(_)) {
                self.statement(statement);
            } else {
                self.deeper();
                self.statement(statement);
                self.shallower();
            }
        }
        self.shallower();
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
            Condition::Expression(expression) => {
                self.expression(expression);
            }
            Condition::Declaration(declaration) => {
                self.fully_specified_type(&declaration.kind.ty.node);
                self.write(" ");
                self.write(&declaration.kind.name.node);
                self.write(" = ");
                self.initializer(&declaration.kind.initializer.node);
            }
        }
    }

    fn jump(&mut self, jump: &JumpStatement) {
        match jump {
            JumpStatement::Continue => self.write("continue;"),
            JumpStatement::Break => self.write("break;"),
            JumpStatement::Discard => self.write("discard;"),
            JumpStatement::Demote => self.write("demote;"),
            JumpStatement::TerminateInvocation => self.write("terminateInvocation;"),
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

    fn expression(&mut self, expression: &Expression) {
        recurse(|| match &expression.kind {
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
                    FunctionIdentifier::Constructor(specifier)
                    | FunctionIdentifier::Cast(specifier) => self.type_specifier(specifier),
                    FunctionIdentifier::Function(name) => self.write(name),
                    FunctionIdentifier::Expression(callee) => self.expression(callee),
                    FunctionIdentifier::Method { object, name } => {
                        self.expression(object);
                        self.write(".");
                        self.write(&name.node);
                    }
                }
                self.write("(");
                self.separated(&call.arguments);
                self.write(")");
            }
            ExpressionKind::FieldSelection { base, field } => {
                self.expression(base);
                self.write(".");
                self.write(&field.node);
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
            ExpressionKind::Sequence(expressions) => self.separated(expressions),
        });
    }

    fn separated(&mut self, items: &[Expression]) {
        for (index, item) in items.iter().enumerate() {
            self.comma(index);
            self.expression(item);
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

#[cfg(test)]
mod tests {
    use core::fmt;

    use super::Printer;

    #[test]
    fn a_failed_print_is_an_error() {
        let mut failed = Printer::default();
        failed.write("text");
        failed.failed = true;
        assert_eq!(failed.finish(), Err(fmt::Error));
        let mut printed = Printer::default();
        printed.write("text");
        assert_eq!(printed.finish().as_deref(), Ok("text"));
    }
}
