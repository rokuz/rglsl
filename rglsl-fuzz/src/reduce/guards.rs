use rglsl_ast::Span;
use rglsl_ast::ast::{
    ArrayDimension, ArraySpecifier, BasicType, BinaryOperator, Condition, Declaration,
    DeclarationKind, Dimension, Expression, ExpressionKind, ExternalDeclaration, Initializer,
    NodeId, PostfixOperator, Scalar, Spanned, Statement, StatementKind, TranslationUnit,
    TypeSpecifier, TypeSpecifierNonArray,
};
use rglsl_sema::scope::{Origin, Storage};
use rglsl_sema::types::ArraySize;
use rglsl_sema::{Analysis, Type, TypeKind};
use rglsl_types::ShaderStage;
use rglsl_types::stack::recurse;

use crate::basic;
use crate::build::Builder;
use crate::constants::{GLF_GLOBAL_LOOP_BOUND, GLF_GLOBAL_LOOP_COUNT};
use crate::donate::in_bounds;
use crate::error::Error;
use crate::fuzzer::literal_zero_or_one;
use crate::generate::analyze_shader;
use crate::job::parse_unit;
use crate::macros::emit;
use crate::rewrite::rewrite_statements;

const MAX_INITIALISER_VALUES: u32 = 4096;

fn counted(body: &Statement) -> bool {
    let StatementKind::Compound(compound) = &body.kind else {
        return false;
    };
    compound.statements.first().is_some_and(|first| match &first.kind {
        StatementKind::Expression(Some(expression)) => matches!(
            &expression.kind,
            ExpressionKind::Postfix { operand, .. }
                if matches!(&operand.kind, ExpressionKind::Variable(name) if name == GLF_GLOBAL_LOOP_COUNT)
        ),
        _ => false,
    })
}

fn bounded(builder: &mut Builder, condition: Option<Expression>) -> Expression {
    let count = builder.variable(GLF_GLOBAL_LOOP_COUNT);
    let bound = builder.variable(GLF_GLOBAL_LOOP_BOUND);
    let test = builder.binary(BinaryOperator::Less, count, bound);
    match condition {
        Some(condition) => {
            let condition = builder.paren(condition);
            let test = builder.paren(test);
            builder.binary(BinaryOperator::LogicalAnd, condition, test)
        }
        None => test,
    }
}

fn count_in(builder: &mut Builder, body: &mut Statement) {
    let count = builder.variable(GLF_GLOBAL_LOOP_COUNT);
    let increment = builder.postfix(count, PostfixOperator::Increment);
    let increment = builder.expression_statement(increment);
    let placeholder = builder.null_statement();
    let original = core::mem::replace(body, placeholder);
    *body = builder.block(vec![increment, original]);
}

fn truncate_loops(unit: &mut TranslationUnit, builder: &mut Builder) -> bool {
    let mut any = false;
    rewrite_statements(unit, &mut |statement| match &mut statement.kind {
        StatementKind::While {
            condition: Condition::Expression(condition),
            body,
        } => {
            if counted(body) {
                return;
            }
            let original = crate::rewrite::take_expression(condition);
            *condition = bounded(builder, Some(original));
            count_in(builder, body);
            any = true;
        }
        StatementKind::DoWhile { body, condition } => {
            if counted(body) {
                return;
            }
            let original = crate::rewrite::take_expression(condition);
            *condition = bounded(builder, Some(original));
            count_in(builder, body);
            any = true;
        }
        StatementKind::For(for_statement) => {
            if counted(&for_statement.body) {
                return;
            }
            match &mut for_statement.condition {
                Some(Condition::Expression(condition)) => {
                    let original = crate::rewrite::take_expression(condition);
                    *condition = bounded(builder, Some(original));
                }
                Some(Condition::Declaration(_)) => return,
                None => {
                    for_statement.condition = Some(Condition::Expression(bounded(builder, None)));
                }
            }
            count_in(builder, &mut for_statement.body);
            any = true;
        }
        _ => {}
    });
    any
}

fn dimension(size: u8) -> Option<Dimension> {
    match size {
        2 => Some(Dimension::Two),
        3 => Some(Dimension::Three),
        4 => Some(Dimension::Four),
        _ => None,
    }
}

fn basic_type(kind: TypeKind) -> Option<BasicType> {
    match kind {
        TypeKind::Scalar(scalar) => Some(BasicType::Scalar(scalar)),
        TypeKind::Vector { scalar, size } => Some(BasicType::Vector {
            scalar,
            size: dimension(size)?,
        }),
        TypeKind::Matrix {
            scalar,
            columns,
            rows,
        } => Some(BasicType::Matrix {
            scalar,
            columns: dimension(columns)?,
            rows: dimension(rows)?,
        }),
        _ => None,
    }
}

const fn plain_scalar(ty: BasicType) -> bool {
    matches!(
        ty,
        BasicType::Scalar(Scalar::Int | Scalar::Uint | Scalar::Float | Scalar::Bool)
    )
}

struct Zeroes<'a> {
    analysis: &'a Analysis,
    builder: &'a mut Builder,
    budget: u32,
}

impl Zeroes<'_> {
    fn spend(&mut self, count: u32) -> Option<()> {
        self.budget = self.budget.checked_sub(count)?;
        Some(())
    }

    fn non_array(&self, kind: TypeKind) -> Option<TypeSpecifierNonArray> {
        if let Some(ty) = basic_type(kind) {
            return Some(TypeSpecifierNonArray::Basic(ty));
        }
        let TypeKind::Struct(id) = kind else {
            return None;
        };
        let name = self.analysis.types.structure(id)?.name.clone()?;
        Some(TypeSpecifierNonArray::TypeName(name))
    }

    fn specifier(&mut self, ty: &Type) -> Option<TypeSpecifier> {
        let non_array = self.non_array(ty.kind)?;
        let mut dimensions = Vec::new();
        for size in ty.dimensions() {
            let ArraySize::Sized(count) = size else {
                return None;
            };
            let count = self.builder.int(i64::from(*count));
            dimensions.push(Spanned::new(Span::new(0, 0), ArrayDimension::Sized(count)));
        }
        let array = (!dimensions.is_empty())
            .then(|| Spanned::new(Span::new(0, 0), ArraySpecifier { dimensions }));
        Some(TypeSpecifier {
            non_array,
            parameters: None,
            array,
        })
    }

    fn zero(&mut self, ty: &Type) -> Option<Expression> {
        recurse(|| {
            if let Some(size) = ty.outer_size() {
                let ArraySize::Sized(count) = size else {
                    return None;
                };
                self.spend(count)?;
                let element = ty.element_type()?;
                let elements = (0..count)
                    .map(|_| self.zero(&element))
                    .collect::<Option<Vec<_>>>()?;
                let specifier = self.specifier(ty)?;
                return Some(self.builder.construct_specifier(specifier, elements));
            }
            if let Some(basic) = basic_type(ty.kind) {
                self.spend(1)?;
                let value = literal_zero_or_one(self.builder, true, basic);
                if basic::is_scalar(basic) && !plain_scalar(basic) {
                    return Some(self.builder.construct(basic, vec![value]));
                }
                return Some(value);
            }
            let TypeKind::Struct(id) = ty.kind else {
                return None;
            };
            let structure = self.analysis.types.structure(id)?;
            if structure.contains_opaque
                || structure.contains_unsized_array
                || structure.contains_reference
            {
                return None;
            }
            let members: Vec<Type> = structure
                .members
                .iter()
                .map(|member| member.ty.clone())
                .collect();
            self.spend(1)?;
            let values = members
                .iter()
                .map(|member| self.zero(member))
                .collect::<Option<Vec<_>>>()?;
            let specifier = self.specifier(ty)?;
            Some(self.builder.construct_specifier(specifier, values))
        })
    }
}

fn uninitialised_variable(analysis: &Analysis, declarator: NodeId) -> Option<Type> {
    let symbol = analysis.declarations.get(&declarator)?;
    let variable = analysis.symbol(*symbol)?.variable()?;
    let plain = variable.qualifiers.storage == Storage::None
        && variable.value.is_none()
        && matches!(variable.origin, Origin::Global | Origin::Local);
    plain.then(|| variable.ty.clone())
}

fn initialise_declaration(
    analysis: &Analysis,
    builder: &mut Builder,
    declaration: &mut Declaration,
) {
    let DeclarationKind::InitDeclaratorList(list) = &mut declaration.kind else {
        return;
    };
    for declarator in &mut list.declarators {
        if declarator.kind.initializer.is_some() {
            continue;
        }
        let Some(ty) = uninitialised_variable(analysis, declarator.id) else {
            continue;
        };
        let mut zeroes = Zeroes {
            analysis,
            builder: &mut *builder,
            budget: MAX_INITIALISER_VALUES,
        };
        let Some(value) = zeroes.zero(&ty) else {
            continue;
        };
        declarator.kind.initializer = Some(Spanned::new(
            Span::new(0, 0),
            Initializer::Expression(value),
        ));
    }
}

pub(crate) fn initialise(unit: &mut TranslationUnit, analysis: &Analysis, builder: &mut Builder) {
    for external in &mut unit.external_declarations {
        if let ExternalDeclaration::Declaration(declaration) = external {
            initialise_declaration(analysis, builder, declaration);
        }
    }
    rewrite_statements(unit, &mut |statement| {
        if let StatementKind::Declaration(declaration) = &mut statement.kind {
            initialise_declaration(analysis, builder, declaration);
        }
    });
}

fn declares_counter(unit: &TranslationUnit) -> bool {
    unit.external_declarations
        .iter()
        .any(|external| match external {
            ExternalDeclaration::Declaration(declaration) => {
                crate::injection::declared_names(declaration)
                    .iter()
                    .any(|name| name == GLF_GLOBAL_LOOP_COUNT)
            }
            _ => false,
        })
}

pub fn add_guards(
    unit: &TranslationUnit,
    stage: ShaderStage,
    bound: Option<u32>,
) -> Result<Option<TranslationUnit>, Error> {
    let analysis = analyze_shader(unit, stage, true, None);
    let mut result = in_bounds(unit, &analysis);
    let mut builder = Builder::new(result.next_id());
    initialise(&mut result, &analysis, &mut builder);
    let Some(bound) = bound else {
        return Ok(parse_unit("guards", &emit(&result)?).ok());
    };
    let looped = truncate_loops(&mut result, &mut builder);
    if looped && !declares_counter(&result) {
        let declarations = parse_unit(
            "guards",
            &format!(
                "const int {GLF_GLOBAL_LOOP_BOUND} = {bound};\nint {GLF_GLOBAL_LOOP_COUNT} = 0;\n"
            ),
        );
        let Ok(declarations) = declarations else {
            return Ok(None);
        };
        let position = result
            .external_declarations
            .iter()
            .position(|external| match external {
                ExternalDeclaration::Directive(_) => false,
                ExternalDeclaration::Declaration(declaration) => {
                    !matches!(declaration.kind, DeclarationKind::Precision { .. })
                }
                _ => true,
            })
            .unwrap_or(result.external_declarations.len());
        let tail = result.external_declarations.split_off(position);
        result
            .external_declarations
            .extend(declarations.external_declarations);
        result.external_declarations.extend(tail);
    }
    Ok(parse_unit("guards", &emit(&result)?).ok())
}
