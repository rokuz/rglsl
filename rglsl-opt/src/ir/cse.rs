use core::mem::Discriminant;

use rglsl::proc::HashableLiteral;
use rglsl::{
    Block, Expression, FastHashMap, Function, Handle, Module, NonUniform, Precision, Span,
    Statement, Type, TypeInner,
};
use rglsl_types::stack::recurse;

use crate::analysis::resolve_types;
use crate::ir::rebuild::{Policy, Rebuild, statements};
use crate::{Changed, OptError, Reuse, Session};

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    let reuse = session.profile.parameters.reuse;
    session.rewrite(|module| cse(module, reuse))
}

fn cse(module: &mut Module, reuse: Reuse) -> Result<bool, String> {
    let values = module
        .all_functions()
        .map(|function| value_flags(module, function))
        .collect::<Result<Vec<_>, _>>()?;
    let mut changed = false;
    for (function, values) in module.all_functions_mut().zip(&values) {
        if let Some(rewritten) = rewrite(function, reuse, values)? {
            *function = rewritten;
            changed = true;
        }
    }
    Ok(changed)
}

fn value_flags(module: &Module, function: &Function) -> Result<Vec<bool>, String> {
    let accesses = function.expressions.iter().any(|(_, expression)| {
        matches!(
            *expression,
            Expression::Access { .. } | Expression::AccessIndex { .. }
        )
    });
    if !accesses {
        return Ok(vec![true; function.expressions.len()]);
    }
    Ok(resolve_types(module, function)?
        .iter()
        .map(|resolution| {
            !matches!(
                *resolution.inner_with(&module.types),
                TypeInner::Pointer { .. } | TypeInner::ValuePointer { .. }
            )
        })
        .collect())
}

const KEY_OPERANDS: usize = 4;

#[derive(Clone, Copy, PartialEq, Eq, Hash)]
struct Key {
    kind: Discriminant<Expression>,
    operands: [u32; KEY_OPERANDS],
    count: usize,
}

struct Entry {
    handle: Handle<Expression>,
    canonical: Expression,
    precision: Option<Precision>,
    non_uniform: Option<NonUniform>,
    depth: u32,
}

struct Scan<'f> {
    function: &'f Function,
    values: &'f [bool],
    reuse: Reuse,
    representative: Vec<Handle<Expression>>,
    table: FastHashMap<Key, Vec<usize>>,
    entries: Vec<Entry>,
    scopes: Vec<Vec<Key>>,
    changed: bool,
}

const fn eligible(expression: &Expression) -> bool {
    matches!(
        *expression,
        Expression::Compose { .. }
            | Expression::Access { .. }
            | Expression::AccessIndex { .. }
            | Expression::Splat { .. }
            | Expression::Swizzle { .. }
            | Expression::Unary { .. }
            | Expression::Binary { .. }
            | Expression::Select { .. }
            | Expression::Relational { .. }
            | Expression::Math { .. }
            | Expression::As { .. }
    )
}

#[derive(Clone, Copy, PartialEq, Eq, Hash)]
enum Value {
    Literal(HashableLiteral),
    Zero(Handle<Type>),
    Undef(Handle<Type>),
}

fn constants(function: &Function) -> Vec<Handle<Expression>> {
    let mut first: FastHashMap<Value, Handle<Expression>> = FastHashMap::default();
    function
        .expressions
        .iter()
        .map(|(handle, expression)| {
            let value = match *expression {
                Expression::Literal(literal) => Value::Literal(literal.into()),
                Expression::ZeroValue(ty) => Value::Zero(ty),
                Expression::Undef(ty) => Value::Undef(ty),
                _ => return handle,
            };
            *first.entry(value).or_insert(handle)
        })
        .collect()
}

fn rewrite(function: &Function, reuse: Reuse, values: &[bool]) -> Result<Option<Function>, String> {
    let mut scan = Scan {
        function,
        values,
        reuse,
        representative: constants(function),
        table: FastHashMap::default(),
        entries: Vec::new(),
        scopes: Vec::new(),
        changed: false,
    };
    scan.block(&function.body)?;
    if !scan.changed {
        return Ok(None);
    }
    let count = statements(function);
    let mut rebuild = Rebuild::new(function);
    rebuild.body(
        &mut Apply {
            representative: &scan.representative,
        },
        count,
    )?;
    Ok(Some(rebuild.finish()))
}

impl Scan<'_> {
    fn depth(&self) -> u32 {
        u32::try_from(self.scopes.len()).unwrap_or(u32::MAX)
    }

    fn block(&mut self, block: &Block) -> Result<(), String> {
        self.scopes.push(Vec::new());
        for statement in block.iter() {
            match *statement {
                Statement::Emit(ref range) => {
                    for handle in range.clone() {
                        self.emitted(handle)?;
                    }
                }
                Statement::Block(ref inner) => recurse(|| self.block(inner))?,
                Statement::If {
                    ref accept,
                    ref reject,
                    ..
                } => {
                    recurse(|| self.block(accept))?;
                    recurse(|| self.block(reject))?;
                }
                Statement::Switch { ref cases, .. } => {
                    for case in cases {
                        recurse(|| self.block(&case.body))?;
                    }
                }
                Statement::Loop {
                    ref body,
                    ref continuing,
                    ..
                } => {
                    recurse(|| self.block(body))?;
                    recurse(|| self.block(continuing))?;
                }
                _ => {}
            }
        }
        let keys = self.scopes.pop().unwrap_or_default();
        for key in keys.into_iter().rev() {
            if let Some(bucket) = self.table.get_mut(&key) {
                bucket.pop();
                if bucket.is_empty() {
                    self.table.remove(&key);
                }
            }
        }
        Ok(())
    }

    fn emitted(&mut self, handle: Handle<Expression>) -> Result<(), String> {
        let expression = self
            .function
            .expressions
            .try_get(handle)
            .map_err(|error| error.to_string())?;
        if !eligible(expression) || self.values.get(handle.index()) != Some(&true) {
            return Ok(());
        }
        let mut canonical = expression.clone();
        let representative = &self.representative;
        canonical.for_each_operand_mut(|operand| {
            if let Some(&value) = representative.get(operand.index()) {
                *operand = value;
            }
        });
        let mut operands = [u32::MAX; KEY_OPERANDS];
        let mut count = 0;
        canonical.for_each_operand(|operand| {
            if let Some(slot) = operands.get_mut(count) {
                *slot = u32::try_from(operand.index()).unwrap_or(u32::MAX);
            }
            count += 1;
        });
        let key = Key {
            kind: core::mem::discriminant(&canonical),
            operands,
            count,
        };
        let precision = self.function.precision.get(&handle).copied();
        let non_uniform = self.function.non_uniform.get(&handle).copied();
        let depth = self.depth();
        let found = self.table.get(&key).and_then(|bucket| {
            bucket.iter().rev().find_map(|&index| {
                let entry = self.entries.get(index)?;
                (entry.canonical == canonical
                    && entry.precision == precision
                    && entry.non_uniform == non_uniform
                    && (self.reuse == Reuse::Nested || entry.depth == depth))
                    .then_some(entry.handle)
            })
        });
        if let Some(earlier) = found {
            if let Some(slot) = self.representative.get_mut(handle.index()) {
                *slot = earlier;
                self.changed = true;
            }
            return Ok(());
        }
        let index = self.entries.len();
        self.entries.push(Entry {
            handle,
            canonical,
            precision,
            non_uniform,
            depth,
        });
        self.table.entry(key).or_default().push(index);
        if let Some(scope) = self.scopes.last_mut() {
            scope.push(key);
        }
        Ok(())
    }
}

struct Apply<'s> {
    representative: &'s [Handle<Expression>],
}

impl Policy for Apply<'_> {
    fn expression(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        handle: Handle<Expression>,
        _: &mut Block,
    ) -> Result<bool, String> {
        match self.representative.get(handle.index()).copied() {
            Some(earlier) if earlier != handle => {
                let new = rebuild.value(earlier)?;
                rebuild.set(handle, new)?;
                Ok(true)
            }
            _ => Ok(false),
        }
    }

    fn statement(
        &mut self,
        _: &mut Rebuild<'_>,
        _: &Statement,
        _: Span,
        _: u32,
        _: &mut Block,
    ) -> Result<bool, String> {
        Ok(false)
    }
}
