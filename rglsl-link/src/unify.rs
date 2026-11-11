use rglsl::object::PathStep;
use rglsl::{ArraySize, Expression, Handle, Module, Span, Type, TypeInner};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum Mismatch {
    Types,
    ImplicitSize,
}

pub(crate) struct Implicit<'a> {
    pub a: &'a [Vec<PathStep>],
    pub b: &'a [Vec<PathStep>],
}

impl Implicit<'_> {
    fn at(&self, path: &[PathStep]) -> (bool, bool) {
        (
            self.a.iter().any(|candidate| candidate == path),
            self.b.iter().any(|candidate| candidate == path),
        )
    }
}

pub(crate) fn common_paths(a: &[Vec<PathStep>], b: &[Vec<PathStep>]) -> Vec<Vec<PathStep>> {
    a.iter().filter(|path| b.contains(path)).cloned().collect()
}

const fn rank(size: ArraySize) -> Option<u32> {
    match size {
        ArraySize::Dynamic => Some(0),
        ArraySize::Constant(length) => Some(length.get()),
        ArraySize::Pending(_) => None,
    }
}

fn merge_size(a: ArraySize, b: ArraySize, implicit: (bool, bool)) -> Result<ArraySize, Mismatch> {
    if a == b {
        return Ok(a);
    }
    let (Some(rank_a), Some(rank_b)) = (rank(a), rank(b)) else {
        return Err(Mismatch::Types);
    };
    match implicit {
        (true, true) => Ok(if rank_a >= rank_b { a } else { b }),
        (true, false) if rank_a <= rank_b => Ok(b),
        (false, true) if rank_b <= rank_a => Ok(a),
        (true, false) | (false, true) => Err(Mismatch::ImplicitSize),
        (false, false) => Err(Mismatch::Types),
    }
}

pub(crate) fn unify(
    module: &mut Module,
    a: Handle<Type>,
    b: Handle<Type>,
    implicit: &Implicit,
    path: &mut Vec<PathStep>,
) -> Result<Handle<Type>, Mismatch> {
    if a == b {
        return Ok(a);
    }
    let type_a = module.types[a].clone();
    let type_b = module.types[b].clone();
    if type_a.name != type_b.name {
        return Err(Mismatch::Types);
    }
    let inner = match (type_a.inner, type_b.inner) {
        (
            TypeInner::Array {
                base: base_a,
                size: size_a,
                stride: stride_a,
            },
            TypeInner::Array {
                base: base_b,
                size: size_b,
                stride: stride_b,
            },
        ) => {
            let size = merge_size(size_a, size_b, implicit.at(path))?;
            path.push(PathStep::Element);
            let base = unify(module, base_a, base_b, implicit, path);
            path.pop();
            let base = base?;
            let stride = if stride_a == stride_b || base != base_a || base != base_b {
                stride_a.max(stride_b)
            } else {
                return Err(Mismatch::Types);
            };
            TypeInner::Array { base, size, stride }
        }
        (
            TypeInner::BindingArray {
                base: base_a,
                size: size_a,
            },
            TypeInner::BindingArray {
                base: base_b,
                size: size_b,
            },
        ) => {
            let size = merge_size(size_a, size_b, implicit.at(path))?;
            path.push(PathStep::Element);
            let base = unify(module, base_a, base_b, implicit, path);
            path.pop();
            TypeInner::BindingArray { base: base?, size }
        }
        (
            TypeInner::Struct {
                members: members_a,
                span: span_a,
            },
            TypeInner::Struct {
                members: members_b,
                span: span_b,
            },
        ) => {
            if members_a.len() != members_b.len() {
                return Err(Mismatch::Types);
            }
            let mut members = Vec::with_capacity(members_a.len());
            for (index, (member_a, member_b)) in (0_u32..).zip(members_a.iter().zip(&members_b)) {
                let same_declaration = member_a.name == member_b.name
                    && member_a.binding == member_b.binding
                    && member_a.offset == member_b.offset
                    && member_a.matrix_layout == member_b.matrix_layout
                    && member_a.xfb_offset == member_b.xfb_offset
                    && member_a.heap == member_b.heap;
                if !same_declaration {
                    return Err(Mismatch::Types);
                }
                path.push(PathStep::Member(index));
                let ty = unify(module, member_a.ty, member_b.ty, implicit, path);
                path.pop();
                members.push(rglsl::StructMember {
                    ty: ty?,
                    ..member_a.clone()
                });
            }
            TypeInner::Struct {
                members,
                span: span_a.max(span_b),
            }
        }
        _ => return Err(Mismatch::Types),
    };
    Ok(module.types.insert(
        Type {
            name: type_a.name,
            inner,
        },
        Span::UNDEFINED,
    ))
}

pub(crate) fn same_expression(
    module: &Module,
    a: Handle<Expression>,
    b: Handle<Expression>,
) -> bool {
    if a == b {
        return true;
    }
    let (Ok(left), Ok(right)) = (
        module.global_expressions.try_get(a),
        module.global_expressions.try_get(b),
    ) else {
        return false;
    };
    match (left, right) {
        (Expression::Literal(x), Expression::Literal(y)) => x == y,
        (Expression::ZeroValue(x), Expression::ZeroValue(y)) => x == y,
        (Expression::Constant(x), Expression::Constant(y)) => {
            match (module.constants.try_get(*x), module.constants.try_get(*y)) {
                (Ok(x), Ok(y)) => x.ty == y.ty && same_expression(module, x.init, y.init),
                _ => false,
            }
        }
        (
            Expression::Compose {
                ty: ty_a,
                components: components_a,
            },
            Expression::Compose {
                ty: ty_b,
                components: components_b,
            },
        ) => {
            ty_a == ty_b
                && components_a.len() == components_b.len()
                && components_a
                    .iter()
                    .zip(components_b)
                    .all(|(&x, &y)| same_expression(module, x, y))
        }
        (
            Expression::Splat {
                size: size_a,
                value: value_a,
            },
            Expression::Splat {
                size: size_b,
                value: value_b,
            },
        ) => size_a == size_b && same_expression(module, *value_a, *value_b),
        _ => left == right,
    }
}
