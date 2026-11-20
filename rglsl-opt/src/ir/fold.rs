use rglsl::proc::{ConstantEvaluator, Emitter, ExpressionKindTracker, Layouter, TypeResolution};
use rglsl::{
    Arena, ArraySize, BinaryOperator, Block, Expression, FastHashMap, Function, Handle, Literal,
    MathFunction, Module, Precision, ScalarKind, Span, Type, TypeInner, UnaryOperator,
};

use crate::analysis::resolve_types;
use crate::float::{self, Class, Domain, Number, Operation, Pattern, UndefinedUse, Yields};
use crate::ir::rebuild::{Policy, Rebuild, statements};
use crate::ir::rewrite_functions;
use crate::{Changed, OptError, Session};

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    session.rewrite(fold)
}

fn fold(module: &mut Module) -> Result<bool, String> {
    let floats = module
        .entry_points
        .iter()
        .all(|entry| entry.spirv_execution_modes.is_empty());
    rewrite_functions(module, |module, function| rewrite(module, function, floats))
}

fn constant_parts(expression: &Expression) -> Option<&[Handle<Expression>]> {
    match *expression {
        Expression::Literal(_) | Expression::ZeroValue(_) | Expression::Constant(_) => Some(&[]),
        Expression::Compose { ref components, .. } => Some(components),
        Expression::Splat { ref value, .. } => Some(core::slice::from_ref(value)),
        _ => None,
    }
}

fn extend_constant_flags(flags: &mut Vec<bool>, expressions: &Arena<Expression>) {
    for handle in expressions.range_from(flags.len()) {
        let flag = expressions
            .try_get(handle)
            .ok()
            .and_then(constant_parts)
            .is_some_and(|parts| {
                parts
                    .iter()
                    .all(|part| flags.get(part.index()) == Some(&true))
            });
        flags.push(flag);
    }
}

fn constant_flags(expressions: &Arena<Expression>) -> Vec<bool> {
    let mut flags = Vec::with_capacity(expressions.len());
    extend_constant_flags(&mut flags, expressions);
    flags
}

fn candidate(expressions: &Arena<Expression>, expression: &Expression, flags: &[bool]) -> bool {
    let is = |handle: Handle<Expression>| flags.get(handle.index()) == Some(&true);
    let undefined = |handle: Handle<Expression>| {
        matches!(expressions.try_get(handle), Ok(Expression::Undef(_)))
            && float::folds_undefined(UndefinedUse::Extract)
    };
    match *expression {
        Expression::Access { base, index } => is(index) || undefined(base),
        Expression::AccessIndex { base, .. } => {
            is(base)
                || undefined(base)
                || matches!(expressions.try_get(base), Ok(Expression::Binary { .. }))
        }
        Expression::Swizzle { vector: base, .. } => is(base) || undefined(base),
        Expression::Unary { expr, .. } => {
            is(expr) || matches!(expressions.try_get(expr), Ok(Expression::Unary { .. }))
        }
        Expression::Binary { left, right, .. } => is(left) || is(right),
        Expression::Math {
            fun: MathFunction::ExtractBits,
            arg2: Some(count),
            ..
        }
        | Expression::Math {
            fun: MathFunction::InsertBits,
            arg3: Some(count),
            ..
        } if is(count) => true,
        Expression::Math { .. } | Expression::Relational { .. } => {
            let mut all = true;
            expression.for_each_operand(|operand| all &= is(operand));
            all
        }
        Expression::As {
            expr,
            convert: Some(_),
            ..
        } => is(expr),
        Expression::Select {
            condition,
            accept,
            reject,
        } => is(condition) || accept == reject,
        _ => false,
    }
}

fn rewrite(
    module: &mut Module,
    function: &Function,
    floats: bool,
) -> Result<Option<Function>, String> {
    let flags = constant_flags(&function.expressions);
    let any = function.body.walk().any(|statement| match *statement {
        rglsl::Statement::Emit(ref range) => range.clone().any(|handle| {
            function
                .expressions
                .try_get(handle)
                .is_ok_and(|expression| candidate(&function.expressions, expression, &flags))
        }),
        _ => false,
    });
    if !any {
        return Ok(None);
    }
    let count = statements(function);
    let mut policy = Fold {
        module,
        floats,
        types: None,
        out_constant: Vec::new(),
        changed: false,
    };
    let mut rebuild = Rebuild::new(function);
    rebuild.body(&mut policy, count)?;
    Ok(policy.changed.then(|| rebuild.finish()))
}

struct Fold<'m> {
    module: &'m mut Module,
    floats: bool,
    types: Option<Vec<TypeResolution>>,
    out_constant: Vec<bool>,
    changed: bool,
}

#[derive(Clone, Copy, PartialEq, Eq)]
enum Shape {
    Scalar,
    Vector,
    Matrix,
    Other,
}

struct Flat {
    values: Vec<Literal>,
    shape: Shape,
}

impl Policy for Fold<'_> {
    fn expression(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        handle: Handle<Expression>,
        block: &mut Block,
    ) -> Result<bool, String> {
        let expression = rebuild.expression(handle)?;
        if !foldable(expression) {
            return Ok(false);
        }
        let mut sources = Vec::new();
        expression.for_each_operand(|operand| sources.push(operand));
        let mut operands = Vec::with_capacity(sources.len());
        for &source in &sources {
            operands.push(rebuild.value(source)?);
        }
        let precision = rebuild
            .source
            .precision
            .get(&handle)
            .copied()
            .unwrap_or_default();
        if let Some(new) = self.simplify(rebuild, handle, expression, precision, block)? {
            rebuild.share_non_uniform(handle, new)?;
            rebuild.set(handle, new)?;
            self.changed = true;
            return Ok(true);
        }
        let all = operands
            .iter()
            .all(|&operand| self.is_constant(&rebuild.out.expressions, operand));
        if !all {
            return Ok(false);
        }
        let Some(new) = self.evaluate(rebuild, handle, expression, &operands, precision, block)?
        else {
            return Ok(false);
        };
        rebuild.set(handle, new)?;
        self.changed = true;
        Ok(true)
    }

    fn statement(
        &mut self,
        _: &mut Rebuild<'_>,
        _: &rglsl::Statement,
        _: Span,
        _: u32,
        _: &mut Block,
    ) -> Result<bool, String> {
        Ok(false)
    }
}

#[derive(Debug, Clone, Copy)]
struct Outer {
    op: BinaryOperator,
    constant: Handle<Expression>,
    constant_right: bool,
    width: usize,
}

const fn foldable(expression: &Expression) -> bool {
    matches!(
        *expression,
        Expression::Access { .. }
            | Expression::AccessIndex { .. }
            | Expression::Swizzle { .. }
            | Expression::Unary { .. }
            | Expression::Binary { .. }
            | Expression::Math { .. }
            | Expression::Relational { .. }
            | Expression::As {
                convert: Some(_),
                ..
            }
            | Expression::Select { .. }
    )
}

const fn domain_of(kind: ScalarKind) -> Option<Domain> {
    match kind {
        ScalarKind::Float => Some(Domain::Float),
        ScalarKind::Sint => Some(Domain::Signed),
        ScalarKind::Uint => Some(Domain::Unsigned),
        ScalarKind::Bool => Some(Domain::Bool),
        _ => None,
    }
}

fn mapped(rebuild: &Rebuild<'_>, handle: Handle<Expression>) -> Result<Handle<Expression>, String> {
    rebuild
        .mapped(handle)
        .ok_or_else(|| format!("{handle:?} is used before it is defined"))
}

impl Fold<'_> {
    fn is_constant(&mut self, arena: &Arena<Expression>, handle: Handle<Expression>) -> bool {
        if self.out_constant.len() < arena.len() {
            extend_constant_flags(&mut self.out_constant, arena);
        }
        self.out_constant.get(handle.index()) == Some(&true)
    }

    fn types(&mut self, function: &Function) -> Result<&[TypeResolution], String> {
        if self.types.is_none() {
            self.types = Some(resolve_types(self.module, function)?);
        }
        Ok(self.types.as_deref().unwrap_or_default())
    }

    fn type_inner(
        &mut self,
        function: &Function,
        handle: Handle<Expression>,
    ) -> Result<Option<TypeInner>, String> {
        let resolution = self.types(function)?.get(handle.index()).cloned();
        Ok(resolution.map(|resolution| resolution.inner_with(&self.module.types).clone()))
    }

    fn same_type(
        &mut self,
        function: &Function,
        a: Handle<Expression>,
        b: Handle<Expression>,
    ) -> Result<bool, String> {
        let a = self.type_inner(function, a)?;
        let b = self.type_inner(function, b)?;
        Ok(a.is_some() && a == b)
    }

    fn flatten(&self, arena: &Arena<Expression>, root: Handle<Expression>) -> Option<Flat> {
        let module = &*self.module;
        let shape_of = |ty| match module.types.get_handle(ty).ok()?.inner {
            TypeInner::Scalar(_) => Some(Shape::Scalar),
            TypeInner::Vector { .. } => Some(Shape::Vector),
            TypeInner::Matrix { .. } => Some(Shape::Matrix),
            _ => Some(Shape::Other),
        };
        let shape = match *arena.try_get(root).ok()? {
            Expression::Literal(_) => Shape::Scalar,
            Expression::Splat { .. } => Shape::Vector,
            Expression::Compose { ty, .. } | Expression::ZeroValue(ty) => shape_of(ty)?,
            Expression::Constant(constant) => {
                shape_of(module.constants.try_get(constant).ok()?.ty)?
            }
            _ => return None,
        };
        let mut values = Vec::new();
        let mut pending = vec![(false, root, 1_usize)];
        while let Some((global, handle, repeat)) = pending.pop() {
            let source = if global {
                &module.global_expressions
            } else {
                arena
            };
            match *source.try_get(handle).ok()? {
                Expression::Literal(literal) => {
                    values.extend(core::iter::repeat_n(literal, repeat));
                }
                Expression::ZeroValue(ty) => {
                    let (scalar, count) = match module.types.get_handle(ty).ok()?.inner {
                        TypeInner::Scalar(scalar) => (scalar, 1),
                        TypeInner::Vector { size, scalar } => (scalar, size as usize),
                        TypeInner::Matrix {
                            columns,
                            rows,
                            scalar,
                        } => (scalar, columns as usize * rows as usize),
                        _ => return None,
                    };
                    let zero = Literal::zero(scalar)?;
                    values.extend(core::iter::repeat_n(zero, count * repeat));
                }
                Expression::Compose { ref components, .. } => {
                    for _ in 0..repeat {
                        for &component in components.iter().rev() {
                            pending.push((global, component, 1));
                        }
                    }
                }
                Expression::Splat { size, value } => {
                    pending.push((global, value, repeat * size as usize));
                }
                Expression::Constant(constant) => {
                    let init = module.constants.try_get(constant).ok()?.init;
                    pending.push((true, init, repeat));
                }
                _ => return None,
            }
        }
        Some(Flat { values, shape })
    }

    fn numbers(
        &self,
        arena: &Arena<Expression>,
        handle: Handle<Expression>,
    ) -> Option<Vec<Number>> {
        self.flatten(arena, handle)?
            .values
            .into_iter()
            .map(Number::of)
            .collect()
    }

    fn simplify(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        handle: Handle<Expression>,
        expression: &Expression,
        precision: Precision,
        block: &mut Block,
    ) -> Result<Option<Handle<Expression>>, String> {
        match *expression {
            Expression::Access { base, index } => {
                if let Some(new) = self.extract_undefined(rebuild, handle, base)? {
                    return Ok(Some(new));
                }
                self.constant_index(rebuild, handle, base, index, block)
            }
            Expression::AccessIndex { base, index } => {
                if let Some(new) = self.extract_undefined(rebuild, handle, base)? {
                    return Ok(Some(new));
                }
                self.extract_component(rebuild, handle, base, index, block)
            }
            Expression::Swizzle { vector: base, .. } => {
                self.extract_undefined(rebuild, handle, base)
            }
            Expression::Select {
                condition,
                accept,
                reject,
            } => self.select(rebuild, condition, accept, reject),
            Expression::Unary { op, expr } if precision.is_empty() => {
                self.involution(rebuild, op, expr)
            }
            Expression::Binary { op, left, right } if precision.is_empty() => {
                self.binary(rebuild, handle, op, left, right, block)
            }
            Expression::Math {
                fun: MathFunction::ExtractBits,
                arg,
                arg2: Some(count),
                ..
            } => {
                if !self.zero_count(rebuild, count)? {
                    return Ok(None);
                }
                let Some(inner) = self.type_inner(rebuild.source, arg)? else {
                    return Ok(None);
                };
                let ty = self
                    .module
                    .types
                    .insert(Type { name: None, inner }, Span::UNDEFINED);
                let span = rebuild.span(handle);
                Ok(Some(rebuild.constant(Expression::ZeroValue(ty), span)))
            }
            Expression::Math {
                fun: MathFunction::InsertBits,
                arg,
                arg3: Some(count),
                ..
            } => {
                if !self.zero_count(rebuild, count)? {
                    return Ok(None);
                }
                Ok(Some(mapped(rebuild, arg)?))
            }
            _ => Ok(None),
        }
    }

    fn select(
        &mut self,
        rebuild: &Rebuild<'_>,
        condition: Handle<Expression>,
        accept: Handle<Expression>,
        reject: Handle<Expression>,
    ) -> Result<Option<Handle<Expression>>, String> {
        let accept = mapped(rebuild, accept)?;
        let reject = mapped(rebuild, reject)?;
        if accept == reject {
            return Ok(Some(accept));
        }
        let condition = mapped(rebuild, condition)?;
        if !self.is_constant(&rebuild.out.expressions, condition) {
            return Ok(None);
        }
        let Some(values) = self.numbers(&rebuild.out.expressions, condition) else {
            return Ok(None);
        };
        if float::rule(Operation::Select, Domain::Any).map(|rule| rule.class) != Some(Class::Exact)
        {
            return Ok(None);
        }
        Ok(if values.iter().all(|&value| value == Number::Bool(true)) {
            Some(accept)
        } else if values.iter().all(|&value| value == Number::Bool(false)) {
            Some(reject)
        } else {
            None
        })
    }

    fn involution(
        &mut self,
        rebuild: &Rebuild<'_>,
        op: UnaryOperator,
        expr: Handle<Expression>,
    ) -> Result<Option<Handle<Expression>>, String> {
        let inner = mapped(rebuild, expr)?;
        let Ok(&Expression::Unary {
            op: inner_op,
            expr: value,
        }) = rebuild.out.expressions.try_get(inner)
        else {
            return Ok(None);
        };
        if inner_op != op || rebuild.out.precision.contains_key(&inner) {
            return Ok(None);
        }
        let domain = self
            .type_inner(rebuild.source, expr)?
            .and_then(|inner| inner.scalar_kind())
            .and_then(domain_of);
        Ok(domain
            .filter(|&domain| float::involution(op, domain))
            .map(|_| value))
    }

    fn component(
        &self,
        arena: &Arena<Expression>,
        operand: Handle<Expression>,
        (index, size): (u32, usize),
    ) -> Option<Literal> {
        if let Ok(Expression::Compose { components, .. }) = arena.try_get(operand) {
            if components.len() != size {
                return None;
            }
            let &component = components.get(index as usize)?;
            let flat = self.flatten(arena, component)?;
            return match flat.values.as_slice() {
                &[value] => Some(value),
                _ => None,
            };
        }
        let flat = self.flatten(arena, operand)?;
        match (flat.shape, flat.values.as_slice()) {
            (Shape::Scalar, &[value]) => Some(value),
            (Shape::Vector, values) => values.get(index as usize).copied(),
            _ => None,
        }
    }

    fn extract_component(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        handle: Handle<Expression>,
        base: Handle<Expression>,
        index: u32,
        block: &mut Block,
    ) -> Result<Option<Handle<Expression>>, String> {
        let Ok(&Expression::Binary { op, left, right }) = rebuild.source.expressions.try_get(base)
        else {
            return Ok(None);
        };
        if !matches!(
            op,
            BinaryOperator::Add
                | BinaryOperator::Subtract
                | BinaryOperator::Multiply
                | BinaryOperator::Divide
        ) || rebuild.source.precision.contains_key(&base)
        {
            return Ok(None);
        }
        let Some(TypeInner::Vector { size, .. }) = self.type_inner(rebuild.source, base)? else {
            return Ok(None);
        };
        let at = (index, size as usize);
        let out = &rebuild.out.expressions;
        let (Some(left), Some(right)) = (
            self.component(out, mapped(rebuild, left)?, at),
            self.component(out, mapped(rebuild, right)?, at),
        ) else {
            return Ok(None);
        };
        let span = rebuild.span(handle);
        let left = rebuild.constant(Expression::Literal(left), span);
        let right = rebuild.constant(Expression::Literal(right), span);
        let expression = Expression::Binary { op, left, right };
        self.evaluate_expression(rebuild, &expression, &[left, right], span, block)
    }

    fn extract_undefined(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        handle: Handle<Expression>,
        base: Handle<Expression>,
    ) -> Result<Option<Handle<Expression>>, String> {
        let base = mapped(rebuild, base)?;
        if !matches!(
            rebuild.out.expressions.try_get(base),
            Ok(Expression::Undef(_))
        ) || !float::folds_undefined(UndefinedUse::Extract)
        {
            return Ok(None);
        }
        let Some(inner) = self.type_inner(rebuild.source, handle)? else {
            return Ok(None);
        };
        if inner.pointer_space().is_some() {
            return Ok(None);
        }
        let ty = self
            .module
            .types
            .insert(Type { name: None, inner }, Span::UNDEFINED);
        let span = rebuild.span(handle);
        Ok(Some(rebuild.undefined(ty, span)))
    }

    fn constant_index(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        handle: Handle<Expression>,
        base: Handle<Expression>,
        index: Handle<Expression>,
        block: &mut Block,
    ) -> Result<Option<Handle<Expression>>, String> {
        let index = mapped(rebuild, index)?;
        if !self.is_constant(&rebuild.out.expressions, index) {
            return Ok(None);
        }
        let Some(flat) = self.flatten(&rebuild.out.expressions, index) else {
            return Ok(None);
        };
        let value = match *flat.values.as_slice() {
            [Literal::I32(value)] => i64::from(value),
            [Literal::U32(value)] => i64::from(value),
            [Literal::I64(value)] => value,
            [Literal::U64(value)] => i64::try_from(value).unwrap_or(i64::MAX),
            _ => return Ok(None),
        };
        let Some(inner) = self.type_inner(rebuild.source, base)? else {
            return Ok(None);
        };
        let types = &self.module.types;
        let target = match inner {
            TypeInner::Pointer { base, .. } => match types.get_handle(base) {
                Ok(ty) => ty.inner.clone(),
                Err(_) => return Ok(None),
            },
            TypeInner::ValuePointer {
                size: Some(size),
                scalar,
                ..
            } => TypeInner::Vector { size, scalar },
            other => other,
        };
        let length = match target {
            TypeInner::Vector { size, .. } => size as i64,
            TypeInner::Matrix { columns, .. } => columns as i64,
            TypeInner::Array {
                size: ArraySize::Constant(size),
                ..
            } => i64::from(size.get()),
            _ => return Ok(None),
        };
        if value < 0 || value >= length {
            return Ok(None);
        }
        let Ok(index) = u32::try_from(value) else {
            return Ok(None);
        };
        let base = mapped(rebuild, base)?;
        let span = rebuild.span(handle);
        Ok(Some(rebuild.emit(
            Expression::AccessIndex { base, index },
            span,
            block,
        )))
    }

    fn zero_count(
        &mut self,
        rebuild: &Rebuild<'_>,
        count: Handle<Expression>,
    ) -> Result<bool, String> {
        let count = mapped(rebuild, count)?;
        if !self.is_constant(&rebuild.out.expressions, count) {
            return Ok(false);
        }
        Ok(self
            .numbers(&rebuild.out.expressions, count)
            .is_some_and(|values| {
                !values.is_empty() && values.iter().all(|value| value.matches(Pattern::Zero))
            }))
    }

    fn binary(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        handle: Handle<Expression>,
        op: BinaryOperator,
        left: Handle<Expression>,
        right: Handle<Expression>,
        block: &mut Block,
    ) -> Result<Option<Handle<Expression>>, String> {
        let new_left = mapped(rebuild, left)?;
        let new_right = mapped(rebuild, right)?;
        let left_constant = self.is_constant(&rebuild.out.expressions, new_left);
        let right_constant = self.is_constant(&rebuild.out.expressions, new_right);
        if left_constant == right_constant {
            return Ok(None);
        }
        let (constant, constant_source, other, other_source) = if right_constant {
            (new_right, right, new_left, left)
        } else {
            (new_left, left, new_right, right)
        };
        let Some(values) = self.numbers(&rebuild.out.expressions, constant) else {
            return Ok(None);
        };
        let Some(&first) = values.first() else {
            return Ok(None);
        };
        let domain = first.domain();
        let patterns = [
            Pattern::Zero,
            Pattern::One,
            Pattern::AllOnes,
            Pattern::True,
            Pattern::False,
        ];
        for pattern in patterns {
            if !values.iter().all(|&value| value.matches(pattern)) {
                continue;
            }
            let Some(identity) = float::identity_rule(op, domain, pattern, right_constant) else {
                continue;
            };
            let (result, source) = match identity.yields {
                Yields::Other => (other, other_source),
                Yields::Constant => (constant, constant_source),
            };
            if self.same_type(rebuild.source, source, handle)? {
                return Ok(Some(result));
            }
        }
        if !float::reassociates(op, domain)
            || !self.same_type(rebuild.source, other_source, handle)?
        {
            return Ok(None);
        }
        let outer = Outer {
            op,
            constant,
            constant_right: right_constant,
            width: values.len(),
        };
        self.reassociate(rebuild, handle, outer, other, block)
    }

    fn reassociate(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        handle: Handle<Expression>,
        outer: Outer,
        inner: Handle<Expression>,
        block: &mut Block,
    ) -> Result<Option<Handle<Expression>>, String> {
        let Outer {
            op,
            constant: outer_constant,
            constant_right,
            width,
        } = outer;
        let Ok(&Expression::Binary {
            op: inner_op,
            left,
            right,
        }) = rebuild.out.expressions.try_get(inner)
        else {
            return Ok(None);
        };
        let additive = |op| matches!(op, BinaryOperator::Add | BinaryOperator::Subtract);
        let mixed = additive(op) && additive(inner_op);
        if (inner_op != op && !mixed)
            || (op == BinaryOperator::Subtract && !constant_right)
            || rebuild.out.precision.contains_key(&inner)
        {
            return Ok(None);
        }
        let (value, inner_constant) = match (
            self.is_constant(&rebuild.out.expressions, left),
            self.is_constant(&rebuild.out.expressions, right),
        ) {
            (false, true) => (left, right),
            (true, false) if inner_op != BinaryOperator::Subtract => (right, left),
            _ => return Ok(None),
        };
        let combine = if mixed && op != inner_op {
            BinaryOperator::Subtract
        } else if mixed {
            BinaryOperator::Add
        } else {
            op
        };
        let components = match self.type_inner(rebuild.source, handle)? {
            Some(TypeInner::Scalar(_)) => 1,
            Some(TypeInner::Vector { size, .. }) => size as usize,
            _ => return Ok(None),
        };
        let inner_width = self
            .flatten(&rebuild.out.expressions, inner_constant)
            .map(|flat| flat.values.len());
        if width != components || inner_width != Some(components) {
            return Ok(None);
        }
        let combined = Expression::Binary {
            op: combine,
            left: inner_constant,
            right: outer_constant,
        };
        let span = rebuild.span(handle);
        let Some(constant) = self.evaluate_expression(
            rebuild,
            &combined,
            &[inner_constant, outer_constant],
            span,
            block,
        )?
        else {
            return Ok(None);
        };
        if mixed
            && self
                .numbers(&rebuild.out.expressions, constant)
                .is_some_and(|values| values.iter().all(|value| value.matches(Pattern::Zero)))
        {
            return Ok(Some(value));
        }
        let new = rebuild.emit(
            Expression::Binary {
                op: inner_op,
                left: value,
                right: constant,
            },
            span,
            block,
        );
        Ok(Some(new))
    }

    fn evaluate(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        handle: Handle<Expression>,
        expression: &Expression,
        operands: &[Handle<Expression>],
        precision: Precision,
        block: &mut Block,
    ) -> Result<Option<Handle<Expression>>, String> {
        let structural = matches!(
            *expression,
            Expression::Access { .. }
                | Expression::AccessIndex { .. }
                | Expression::Swizzle { .. }
                | Expression::Select { .. }
        );
        if !precision.is_empty() && !structural {
            return Ok(None);
        }
        let span = rebuild.span(handle);
        self.evaluate_expression(rebuild, expression, operands, span, block)
    }

    fn operation(
        &self,
        arena: &Arena<Expression>,
        expression: &Expression,
        operands: &[Handle<Expression>],
    ) -> Option<(Operation, Domain)> {
        let first = || {
            let flat = self.flatten(arena, *operands.first()?)?;
            Some(Number::of(*flat.values.first()?)?.domain())
        };
        Some(match *expression {
            Expression::Access { .. }
            | Expression::AccessIndex { .. }
            | Expression::Swizzle { .. } => (Operation::Extract, Domain::Any),
            Expression::Select { .. } => (Operation::Select, Domain::Any),
            Expression::Unary { op, .. } => (Operation::Unary(op), first()?),
            Expression::Binary { op, .. } => (Operation::Binary(op), first()?),
            Expression::Math { fun, .. } => (Operation::Math(fun), first()?),
            Expression::Relational { fun, .. } => (Operation::Relational(fun), first()?),
            Expression::As {
                kind,
                convert: Some(_),
                ..
            } => (Operation::Convert(domain_of(kind)?), first()?),
            _ => return None,
        })
    }

    fn evaluate_expression(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        expression: &Expression,
        operands: &[Handle<Expression>],
        span: Span,
        block: &mut Block,
    ) -> Result<Option<Handle<Expression>>, String> {
        let out = &rebuild.out.expressions;
        let Some((operation, domain)) = self.operation(out, expression, operands) else {
            return Ok(None);
        };
        let Some(rule) = float::rule(operation, domain) else {
            return Ok(None);
        };
        if rule.class != Class::Exact || (domain == Domain::Float && !self.floats) {
            return Ok(None);
        }
        let mut flats = Vec::with_capacity(operands.len());
        if rule.guard != float::Guard::Bits {
            for &operand in operands {
                let Some(flat) = self.flatten(out, operand) else {
                    return Ok(None);
                };
                flats.push(flat);
            }
            if matches!(
                *expression,
                Expression::Binary {
                    op: BinaryOperator::Multiply,
                    ..
                }
            ) && flats.iter().any(|flat| flat.shape == Shape::Matrix)
                && flats.iter().all(|flat| flat.values.len() > 1)
            {
                return Ok(None);
            }
            if flats.iter().any(|flat| flat.shape == Shape::Other) {
                return Ok(None);
            }
        }
        let mut scratch = Arena::new();
        let mut copied = Vec::with_capacity(operands.len());
        for &operand in operands {
            let Some(copy) = copy_tree(out, operand, &mut scratch) else {
                return Ok(None);
            };
            copied.push(copy);
        }
        let mut expression = expression.clone();
        let mut next = copied.iter();
        expression.for_each_operand_mut(|operand| {
            if let Some(&copy) = next.next() {
                *operand = copy;
            }
        });
        let mut tracker = ExpressionKindTracker::from_arena(&scratch);
        let mut layouter = Layouter::default();
        let mut emitter = Emitter::default();
        let mut scratch_block = Block::new();
        let result = ConstantEvaluator::for_glsl_function(
            self.module,
            &mut scratch,
            &mut tracker,
            &mut layouter,
            &mut emitter,
            &mut scratch_block,
        )
        .try_eval_and_append(expression, span);
        let Ok(result) = result else {
            return Ok(None);
        };
        if !constant_tree(&scratch, result) {
            return Ok(None);
        }
        if rule.guard != float::Guard::Bits {
            let mut numbers = Vec::with_capacity(flats.len());
            for flat in flats {
                let Some(values) = flat.values.into_iter().map(Number::of).collect() else {
                    return Ok(None);
                };
                numbers.push(values);
            }
            let Some(result_numbers) = self.numbers(&scratch, result) else {
                return Ok(None);
            };
            if !float::admits(rule, operation, &numbers, &result_numbers) {
                return Ok(None);
            }
        }
        copy_back(rebuild, &scratch, result, span, block).map(Some)
    }
}

fn constant_tree(arena: &Arena<Expression>, root: Handle<Expression>) -> bool {
    let mut pending = vec![root];
    while let Some(handle) = pending.pop() {
        match arena.try_get(handle).ok().and_then(constant_parts) {
            Some(parts) => pending.extend_from_slice(parts),
            None => return false,
        }
    }
    true
}

fn copy_tree(
    from: &Arena<Expression>,
    root: Handle<Expression>,
    to: &mut Arena<Expression>,
) -> Option<Handle<Expression>> {
    let mut map: FastHashMap<Handle<Expression>, Handle<Expression>> = FastHashMap::default();
    let mut pending = vec![(root, false)];
    while let Some((handle, ready)) = pending.pop() {
        if map.contains_key(&handle) {
            continue;
        }
        let expression = from.try_get(handle).ok()?;
        let operands = constant_parts(expression)?;
        if !ready {
            pending.push((handle, true));
            pending.extend(operands.iter().map(|&operand| (operand, false)));
            continue;
        }
        let mut copy = expression.clone();
        let mut failed = false;
        copy.for_each_operand_mut(|operand| match map.get(operand) {
            Some(&new) => *operand = new,
            None => failed = true,
        });
        if failed {
            return None;
        }
        let new = to.append(copy, Span::UNDEFINED);
        map.insert(handle, new);
    }
    map.get(&root).copied()
}

fn copy_back(
    rebuild: &mut Rebuild<'_>,
    scratch: &Arena<Expression>,
    root: Handle<Expression>,
    span: Span,
    block: &mut Block,
) -> Result<Handle<Expression>, String> {
    let mut map: Vec<Option<Handle<Expression>>> = vec![None; scratch.len()];
    let mut pending = vec![(root, false)];
    while let Some((handle, ready)) = pending.pop() {
        if map.get(handle.index()).copied().flatten().is_some() {
            continue;
        }
        let expression = scratch.try_get(handle).map_err(|error| error.to_string())?;
        if !ready {
            pending.push((handle, true));
            expression.for_each_operand(|operand| pending.push((operand, false)));
            continue;
        }
        let mut copy = expression.clone();
        let mut failed = None;
        copy.for_each_operand_mut(
            |operand| match map.get(operand.index()).copied().flatten() {
                Some(new) => *operand = new,
                None => failed = Some(*operand),
            },
        );
        if let Some(operand) = failed {
            return Err(format!("the folded operand {operand:?} was not copied"));
        }
        let new = if copy.needs_pre_emit() {
            rebuild.constant(copy, span)
        } else {
            rebuild.emit(copy, span, block)
        };
        if let Some(slot) = map.get_mut(handle.index()) {
            *slot = Some(new);
        }
    }
    map.get(root.index())
        .copied()
        .flatten()
        .ok_or_else(|| String::from("the folded value was not copied"))
}
