use std::collections::{BTreeMap, BTreeSet};

use rglsl_ast::ast::{BasicType, BinaryOperator, Expression, ScalarType, UnaryOperator};
use rglsl_sema::scope::Direction;
use rglsl_sema::Builtins;

use crate::basic::{self, BOOL, FLOAT};
use crate::build::Builder;
use crate::random::Random;
use crate::scope::Variable;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct GenerationParams {
    pub max_depth: u32,
    pub fragment: bool,
}

impl GenerationParams {
    pub const fn normal(fragment: bool) -> Self {
        Self {
            max_depth: 3,
            fragment,
        }
    }

    pub const fn small(fragment: bool) -> Self {
        Self {
            max_depth: 2,
            fragment,
        }
    }
}

pub fn is_too_deep(depth: u32, params: &GenerationParams, random: &mut Random) -> bool {
    if depth >= params.max_depth {
        return true;
    }
    for _ in 0..=depth {
        if random.next_int(2) == 0 {
            return true;
        }
    }
    false
}

#[derive(Debug, Clone, PartialEq, Eq)]
enum Shape {
    Constant,
    Paren,
    Constructor,
    Binary(BinaryOperator),
    Comma,
    Unary(UnaryOperator),
    Ternary,
    Index,
    Swizzle,
    Builtin(String),
}

#[derive(Debug, Clone, PartialEq, Eq)]
struct Template {
    shape: Shape,
    result: BasicType,
    arguments: Vec<Vec<BasicType>>,
    constant: bool,
}

impl Template {
    fn new(shape: Shape, result: BasicType, arguments: &[BasicType], constant: bool) -> Self {
        Self {
            shape,
            result,
            arguments: arguments.iter().map(|ty| vec![*ty]).collect(),
            constant,
        }
    }
}

#[derive(Debug, Clone)]
pub struct Templates {
    by_result: BTreeMap<BasicType, Vec<Template>>,
}

const SCALAR_NUMERIC: [ScalarType; 3] = [ScalarType::Float, ScalarType::Uint, ScalarType::Int];
const INTEGERS: [ScalarType; 2] = [ScalarType::Uint, ScalarType::Int];
const EXCLUDED_BUILTIN_PREFIXES: [&str; 18] = [
    "expectEXT",
    "assumeEXT",
    "interpolateAt",
    "atomic",
    "anyInvocation",
    "allInvocations",
    "barrier",
    "memoryBarrier",
    "subgroup",
    "ballot",
    "readInvocation",
    "readFirstInvocation",
    "minInvocations",
    "maxInvocations",
    "addInvocations",
    "swizzleInvocations",
    "writeInvocation",
    "mbcnt",
];

impl Templates {
    pub fn new(builtins: &Builtins, hidden: &BTreeSet<String>) -> Self {
        let mut list = Vec::new();
        add_builtins(&mut list, builtins, hidden);
        let all = basic::all_basic_types();
        for ty in &all {
            list.push(Template::new(Shape::Constant, *ty, &[], true));
        }
        for ty in &all {
            list.push(Template::new(Shape::Paren, *ty, &[*ty], true));
        }
        add_casts(&mut list);
        add_vector_constructors(&mut list);
        add_matrix_constructors(&mut list);
        add_arithmetic(&mut list);
        add_integer_operators(&mut list);
        add_unary(&mut list);
        for scalar in SCALAR_NUMERIC {
            for operator in [
                BinaryOperator::Greater,
                BinaryOperator::GreaterEqual,
                BinaryOperator::Less,
                BinaryOperator::LessEqual,
            ] {
                let ty = BasicType::Scalar(scalar);
                list.push(Template::new(
                    Shape::Binary(operator),
                    BOOL,
                    &[ty, ty],
                    true,
                ));
            }
        }
        for ty in &all {
            for operator in [BinaryOperator::Equal, BinaryOperator::NotEqual] {
                list.push(Template::new(
                    Shape::Binary(operator),
                    BOOL,
                    &[*ty, *ty],
                    true,
                ));
            }
        }
        for operator in [
            BinaryOperator::LogicalAnd,
            BinaryOperator::LogicalOr,
            BinaryOperator::LogicalXor,
        ] {
            list.push(Template::new(
                Shape::Binary(operator),
                BOOL,
                &[BOOL, BOOL],
                true,
            ));
        }
        list.push(Template::new(
            Shape::Unary(UnaryOperator::LogicalNot),
            BOOL,
            &[BOOL],
            true,
        ));
        for ty in &all {
            list.push(Template {
                shape: Shape::Comma,
                result: *ty,
                arguments: vec![all.clone(), vec![*ty]],
                constant: false,
            });
            list.push(Template::new(Shape::Ternary, *ty, &[BOOL, *ty, *ty], true));
        }
        for ty in &all {
            if basic::is_vector(*ty) {
                list.push(Template::new(
                    Shape::Index,
                    basic::element_type(*ty),
                    &[*ty],
                    false,
                ));
                for size in 1..=4 {
                    list.push(Template::new(
                        Shape::Swizzle,
                        basic::vector(basic::element(*ty), size),
                        &[*ty],
                        true,
                    ));
                }
            } else if basic::is_matrix(*ty) {
                list.push(Template::new(
                    Shape::Index,
                    basic::column_type(*ty),
                    &[*ty],
                    false,
                ));
            }
        }
        let mut by_result: BTreeMap<BasicType, Vec<Template>> = BTreeMap::new();
        for template in list {
            by_result.entry(template.result).or_default().push(template);
        }
        Self { by_result }
    }

    pub fn count(&self) -> usize {
        self.by_result.values().map(Vec::len).sum()
    }
}

fn add_builtins(list: &mut Vec<Template>, builtins: &Builtins, hidden: &BTreeSet<String>) {
    for function in builtins.functions() {
        if hidden.contains(&function.name)
            || EXCLUDED_BUILTIN_PREFIXES
                .iter()
                .any(|prefix| function.name.starts_with(prefix))
        {
            continue;
        }
        let Some(result) = basic::from_sema(&function.return_type) else {
            continue;
        };
        let mut arguments = Vec::new();
        for parameter in &function.parameters {
            if parameter.direction != Direction::In {
                arguments.clear();
                break;
            }
            match basic::from_sema(&parameter.ty) {
                Some(ty) => arguments.push(ty),
                None => {
                    arguments.clear();
                    break;
                }
            }
        }
        if arguments.len() != function.parameters.len() {
            continue;
        }
        list.push(Template::new(
            Shape::Builtin(function.name.clone()),
            result,
            &arguments,
            false,
        ));
    }
}

fn add_casts(list: &mut Vec<Template>) {
    let scalars = [
        ScalarType::Float,
        ScalarType::Uint,
        ScalarType::Int,
        ScalarType::Bool,
    ];
    for target in scalars {
        for source in scalars {
            if target != source {
                let constant = !(source == ScalarType::Float && target != ScalarType::Bool);
                list.push(Template::new(
                    Shape::Constructor,
                    BasicType::Scalar(target),
                    &[BasicType::Scalar(source)],
                    constant,
                ));
            }
        }
    }
}

fn add_vector_constructors(list: &mut Vec<Template>) {
    for scalar in [
        ScalarType::Float,
        ScalarType::Uint,
        ScalarType::Int,
        ScalarType::Bool,
    ] {
        let width = |size: u32| basic::vector(scalar, size);
        let shapes: [(u32, &[u32]); 17] = [
            (2, &[1]),
            (2, &[1, 1]),
            (2, &[3]),
            (2, &[4]),
            (3, &[1]),
            (3, &[1, 1, 1]),
            (3, &[1, 2]),
            (3, &[2, 1]),
            (3, &[4]),
            (4, &[1]),
            (4, &[1, 1, 1, 1]),
            (4, &[1, 1, 2]),
            (4, &[1, 2, 1]),
            (4, &[2, 1, 1]),
            (4, &[2, 2]),
            (4, &[1, 3]),
            (4, &[3, 1]),
        ];
        for (result, arguments) in shapes {
            let arguments: Vec<BasicType> = arguments.iter().map(|size| width(*size)).collect();
            list.push(Template::new(
                Shape::Constructor,
                width(result),
                &arguments,
                true,
            ));
        }
    }
}

fn add_matrix_constructors(list: &mut Vec<Template>) {
    let matrices = basic::all_matrix_types();
    for matrix in &matrices {
        list.push(Template::new(Shape::Constructor, *matrix, &[FLOAT], true));
        let floats: Vec<BasicType> = (0..basic::num_elements(*matrix)).map(|_| FLOAT).collect();
        list.push(Template::new(Shape::Constructor, *matrix, &floats, true));
        for other in &matrices {
            if other != matrix {
                list.push(Template::new(Shape::Constructor, *matrix, &[*other], true));
            }
        }
        let columns: Vec<BasicType> = (0..basic::columns(*matrix))
            .map(|_| basic::column_type(*matrix))
            .collect();
        list.push(Template::new(Shape::Constructor, *matrix, &columns, true));
    }
}

fn add_arithmetic(list: &mut Vec<Template>) {
    for operator in [
        BinaryOperator::Add,
        BinaryOperator::Subtract,
        BinaryOperator::Divide,
        BinaryOperator::Multiply,
    ] {
        let constant = operator != BinaryOperator::Divide;
        for scalar in SCALAR_NUMERIC {
            let base = BasicType::Scalar(scalar);
            for size in 1..=4 {
                let ty = basic::vector(scalar, size);
                list.push(Template::new(
                    Shape::Binary(operator),
                    ty,
                    &[ty, ty],
                    constant,
                ));
                if size > 1 {
                    list.push(Template::new(
                        Shape::Binary(operator),
                        ty,
                        &[base, ty],
                        constant,
                    ));
                    list.push(Template::new(
                        Shape::Binary(operator),
                        ty,
                        &[ty, base],
                        constant,
                    ));
                }
            }
        }
        for matrix in basic::all_matrix_types() {
            if operator == BinaryOperator::Multiply {
                let columns = basic::columns(matrix);
                let rows = basic::rows(matrix);
                let right_vector = basic::vector(ScalarType::Float, columns);
                let left_vector = basic::vector(ScalarType::Float, rows);
                list.push(Template::new(
                    Shape::Binary(operator),
                    left_vector,
                    &[matrix, right_vector],
                    true,
                ));
                list.push(Template::new(
                    Shape::Binary(operator),
                    right_vector,
                    &[left_vector, matrix],
                    true,
                ));
                for other in basic::all_matrix_types() {
                    if basic::rows(other) == columns {
                        let Some(other_columns) = basic::dimension(basic::columns(other)) else {
                            continue;
                        };
                        let Some(result_rows) = basic::dimension(rows) else {
                            continue;
                        };
                        list.push(Template::new(
                            Shape::Binary(operator),
                            basic::matrix(other_columns, result_rows),
                            &[matrix, other],
                            true,
                        ));
                    }
                }
            } else {
                list.push(Template::new(
                    Shape::Binary(operator),
                    matrix,
                    &[matrix, matrix],
                    constant,
                ));
            }
            list.push(Template::new(
                Shape::Binary(operator),
                matrix,
                &[FLOAT, matrix],
                constant,
            ));
            list.push(Template::new(
                Shape::Binary(operator),
                matrix,
                &[matrix, FLOAT],
                constant,
            ));
        }
    }
}

fn add_integer_operators(list: &mut Vec<Template>) {
    for operator in [
        BinaryOperator::Modulo,
        BinaryOperator::BitAnd,
        BinaryOperator::BitOr,
        BinaryOperator::BitXor,
        BinaryOperator::ShiftLeft,
        BinaryOperator::ShiftRight,
    ] {
        let constant = matches!(
            operator,
            BinaryOperator::BitAnd | BinaryOperator::BitOr | BinaryOperator::BitXor
        );
        let shift = matches!(
            operator,
            BinaryOperator::ShiftLeft | BinaryOperator::ShiftRight
        );
        for scalar in INTEGERS {
            let base = BasicType::Scalar(scalar);
            for size in 1..=4 {
                let ty = basic::vector(scalar, size);
                list.push(Template::new(
                    Shape::Binary(operator),
                    ty,
                    &[ty, ty],
                    constant,
                ));
                if size > 1 {
                    list.push(Template::new(
                        Shape::Binary(operator),
                        ty,
                        &[ty, base],
                        constant,
                    ));
                    if !shift {
                        list.push(Template::new(
                            Shape::Binary(operator),
                            ty,
                            &[base, ty],
                            constant,
                        ));
                    }
                }
            }
        }
    }
}

fn add_unary(list: &mut Vec<Template>) {
    let mut numeric = Vec::new();
    for scalar in SCALAR_NUMERIC {
        numeric.extend(basic::all_vectors_of(scalar));
    }
    numeric.extend(basic::all_matrix_types());
    for ty in numeric {
        list.push(Template::new(
            Shape::Unary(UnaryOperator::Plus),
            ty,
            &[ty],
            true,
        ));
        if basic::element(ty) != ScalarType::Uint {
            list.push(Template::new(
                Shape::Unary(UnaryOperator::Minus),
                ty,
                &[ty],
                true,
            ));
        }
        if basic::is_integer(ty) {
            list.push(Template::new(
                Shape::Unary(UnaryOperator::BitNot),
                ty,
                &[ty],
                true,
            ));
        }
    }
}

#[derive(Debug, Clone, Copy)]
pub struct Fuzzer<'a> {
    templates: &'a Templates,
    scope: &'a [Variable],
    params: GenerationParams,
}

impl<'a> Fuzzer<'a> {
    pub const fn new(
        templates: &'a Templates,
        scope: &'a [Variable],
        params: GenerationParams,
    ) -> Self {
        Self {
            templates,
            scope,
            params,
        }
    }

    pub const fn params(&self) -> &GenerationParams {
        &self.params
    }

    pub fn fuzz_expression(
        &self,
        random: &mut Random,
        builder: &mut Builder,
        target: BasicType,
        constant_context: bool,
        depth: u32,
    ) -> Option<Expression> {
        for _ in 0..50 {
            if let Some(expression) =
                self.make_expression(random, builder, target, constant_context, depth)
            {
                return Some(expression);
            }
        }
        None
    }

    fn make_expression(
        &self,
        random: &mut Random,
        builder: &mut Builder,
        target: BasicType,
        constant_context: bool,
        depth: u32,
    ) -> Option<Expression> {
        let too_deep = is_too_deep(depth, &self.params, random);
        let variables: Vec<&Variable> = self
            .scope
            .iter()
            .filter(|variable| variable.ty == Some(target))
            .filter(|variable| !constant_context || (variable.constant && !variable.parameter))
            .collect();
        let templates: Vec<&Template> = self
            .templates
            .by_result
            .get(&target)
            .map(|list| {
                list.iter()
                    .filter(|template| !constant_context || template.constant)
                    .filter(|template| !too_deep || template.arguments.is_empty())
                    .collect()
            })
            .unwrap_or_default();
        let total = templates.len() + variables.len();
        if total == 0 {
            return None;
        }
        let choice = random.next_index(total);
        if let Some(template) = templates.get(choice) {
            let mut arguments = Vec::with_capacity(template.arguments.len());
            for choices in &template.arguments {
                let ty = *choices.get(random.next_index(choices.len()))?;
                arguments.push(self.make_expression(
                    random,
                    builder,
                    ty,
                    constant_context,
                    depth + 1,
                )?);
            }
            return Some(instantiate(template, random, builder, arguments));
        }
        let variable = variables.get(choice - templates.len())?;
        Some(builder.variable(&variable.name))
    }
}

fn instantiate(
    template: &Template,
    random: &mut Random,
    builder: &mut Builder,
    arguments: Vec<Expression>,
) -> Expression {
    let mut arguments = arguments.into_iter();
    let mut next = |builder: &mut Builder| {
        arguments
            .next()
            .unwrap_or_else(|| literal_zero_or_one(builder, true, FLOAT))
    };
    match &template.shape {
        Shape::Constant => random_constant(random, builder, template.result),
        Shape::Paren => {
            let inner = next(builder);
            builder.paren(inner)
        }
        Shape::Constructor => {
            let count = template.arguments.len();
            let collected: Vec<Expression> = (0..count).map(|_| next(builder)).collect();
            builder.construct(template.result, collected)
        }
        Shape::Builtin(name) => {
            let count = template.arguments.len();
            let collected: Vec<Expression> = (0..count).map(|_| next(builder)).collect();
            builder.call(name, collected)
        }
        Shape::Binary(operator) => {
            let left = next(builder);
            let right = next(builder);
            let binary = builder.binary(*operator, left, right);
            builder.paren(binary)
        }
        Shape::Comma => {
            let left = next(builder);
            let right = next(builder);
            let sequence = builder.sequence(left, right);
            builder.paren(sequence)
        }
        Shape::Unary(operator) => {
            let operand = next(builder);
            let unary = builder.unary(*operator, operand);
            builder.paren(unary)
        }
        Shape::Ternary => {
            let condition = next(builder);
            let then_expression = next(builder);
            let else_expression = next(builder);
            let ternary = builder.ternary(condition, then_expression, else_expression);
            builder.paren(ternary)
        }
        Shape::Index => {
            let base = next(builder);
            let argument = template
                .arguments
                .first()
                .and_then(|choices| choices.first());
            let bound = argument.map_or(1, |ty| basic::columns(*ty));
            let index = random.next_int(bound);
            builder.index(base, index)
        }
        Shape::Swizzle => {
            let base = next(builder);
            let argument = template
                .arguments
                .first()
                .and_then(|choices| choices.first());
            let width = argument.map_or(1, |ty| basic::columns(*ty));
            let naming: [&str; 4] = match random.next_int(3) {
                0 => ["r", "g", "b", "a"],
                1 => ["s", "t", "p", "q"],
                _ => ["x", "y", "z", "w"],
            };
            let mut components = String::new();
            for _ in 0..basic::columns(template.result) {
                let index = random.next_index(usize::try_from(width).unwrap_or(1));
                components.push_str(naming.get(index).copied().unwrap_or("x"));
            }
            builder.field(base, &components)
        }
    }
}

pub fn random_constant(random: &mut Random, builder: &mut Builder, ty: BasicType) -> Expression {
    let scalar = |random: &mut Random, builder: &mut Builder| match basic::element(ty) {
        ScalarType::Float | ScalarType::Double | ScalarType::Float16 => {
            let text = random_float_text(random);
            builder.float(&text)
        }
        ScalarType::Int | ScalarType::Int8 | ScalarType::Int16 | ScalarType::Int64 => {
            let value = i64::from(random.next_int(200_000)) - 100_000;
            builder.int(value)
        }
        ScalarType::Uint | ScalarType::Uint8 | ScalarType::Uint16 | ScalarType::Uint64 => {
            let value = u64::from(random.next_int(200_000));
            builder.uint(value)
        }
        ScalarType::Bool => {
            let value = random.next_bool();
            builder.boolean(value)
        }
    };
    if basic::is_scalar(ty) {
        return scalar(random, builder);
    }
    let arguments: Vec<Expression> = (0..basic::num_elements(ty))
        .map(|_| scalar(random, builder))
        .collect();
    builder.construct(ty, arguments)
}

fn random_float_text(random: &mut Random) -> String {
    let mut text = String::new();
    if random.next_bool() {
        text.push('-');
    }
    let digits = random.next_int(5).max(1);
    for position in 0..digits {
        let digit = loop {
            let candidate = random.next_int(10);
            if candidate == 0 && position == 0 && digits > 1 {
                continue;
            }
            break candidate;
        };
        text.push_str(&digit.to_string());
    }
    text.push('.');
    for _ in 0..digits {
        text.push_str(&random.next_int(10).to_string());
    }
    text
}

pub fn literal_zero_or_one(builder: &mut Builder, zero: bool, ty: BasicType) -> Expression {
    let digit = if zero { 0 } else { 1 };
    let scalar = |builder: &mut Builder, element: ScalarType| match element {
        ScalarType::Int | ScalarType::Int8 | ScalarType::Int16 | ScalarType::Int64 => {
            builder.int(digit)
        }
        ScalarType::Uint | ScalarType::Uint8 | ScalarType::Uint16 | ScalarType::Uint64 => {
            builder.uint(u64::from(!zero))
        }
        ScalarType::Bool => builder.boolean(!zero),
        ScalarType::Float | ScalarType::Double | ScalarType::Float16 => {
            builder.float(&format!("{digit}.0"))
        }
    };
    if basic::is_scalar(ty) {
        return scalar(builder, basic::element(ty));
    }
    let arguments: Vec<Expression> = (0..basic::num_elements(ty))
        .map(|_| scalar(builder, basic::element(ty)))
        .collect();
    builder.construct(ty, arguments)
}
