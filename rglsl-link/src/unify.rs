use rglsl::object::PathStep;
use rglsl::{ArraySize, Expression, Handle, Module, Span, StructMember, Type, TypeInner};

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
    let start = path.len();
    let result = unify_types(module, a, b, implicit, path);
    path.truncate(start);
    result
}

enum Unifying {
    Array {
        name: Option<String>,
        bases: (Handle<Type>, Handle<Type>),
        size: ArraySize,
        strides: (u32, u32),
    },
    BindingArray {
        name: Option<String>,
        size: ArraySize,
    },
    Struct {
        name: Option<String>,
        members_a: Vec<StructMember>,
        members_b: Vec<StructMember>,
        span: u32,
        members: Vec<StructMember>,
    },
}

enum Entered {
    Done(Handle<Type>),
    Child(Handle<Type>, Handle<Type>),
    Frame,
}

fn unify_types(
    module: &mut Module,
    a: Handle<Type>,
    b: Handle<Type>,
    implicit: &Implicit,
    path: &mut Vec<PathStep>,
) -> Result<Handle<Type>, Mismatch> {
    let mut frames = Vec::new();
    let mut next = Some((a, b));
    let mut finished = None;
    loop {
        if let Some((a, b)) = next.take() {
            match enter(module, a, b, implicit, path, &mut frames)? {
                Entered::Done(ty) => finished = Some(ty),
                Entered::Child(a, b) => {
                    next = Some((a, b));
                    continue;
                }
                Entered::Frame => {}
            }
        }
        let Some(frame) = frames.pop() else {
            return finished.ok_or(Mismatch::Types);
        };
        let (name, inner) = match frame {
            Unifying::Array {
                name,
                bases: (base_a, base_b),
                size,
                strides: (stride_a, stride_b),
            } => {
                path.pop();
                let base = finished.take().ok_or(Mismatch::Types)?;
                let stride = if stride_a == stride_b || base != base_a || base != base_b {
                    stride_a.max(stride_b)
                } else {
                    return Err(Mismatch::Types);
                };
                (name, TypeInner::Array { base, size, stride })
            }
            Unifying::BindingArray { name, size } => {
                path.pop();
                let base = finished.take().ok_or(Mismatch::Types)?;
                (name, TypeInner::BindingArray { base, size })
            }
            Unifying::Struct {
                name,
                members_a,
                members_b,
                span,
                mut members,
            } => {
                if let Some(ty) = finished.take() {
                    path.pop();
                    let member = members_a.get(members.len()).ok_or(Mismatch::Types)?;
                    members.push(StructMember {
                        ty,
                        ..member.clone()
                    });
                }
                let index = members.len();
                if let (Some(member_a), Some(member_b)) =
                    (members_a.get(index), members_b.get(index))
                {
                    let same_declaration = member_a.name == member_b.name
                        && member_a.binding == member_b.binding
                        && member_a.offset == member_b.offset
                        && member_a.matrix_layout == member_b.matrix_layout
                        && member_a.xfb_offset == member_b.xfb_offset
                        && member_a.heap == member_b.heap
                        && member_a.memory_decorations == member_b.memory_decorations;
                    if !same_declaration {
                        return Err(Mismatch::Types);
                    }
                    let step = u32::try_from(index).map_err(|_| Mismatch::Types)?;
                    path.push(PathStep::Member(step));
                    next = Some((member_a.ty, member_b.ty));
                    frames.push(Unifying::Struct {
                        name,
                        members_a,
                        members_b,
                        span,
                        members,
                    });
                    continue;
                }
                (name, TypeInner::Struct { members, span })
            }
        };
        finished = Some(module.types.insert(Type { name, inner }, Span::UNDEFINED));
    }
}

fn enter(
    module: &Module,
    a: Handle<Type>,
    b: Handle<Type>,
    implicit: &Implicit,
    path: &mut Vec<PathStep>,
    frames: &mut Vec<Unifying>,
) -> Result<Entered, Mismatch> {
    if a == b {
        return Ok(Entered::Done(a));
    }
    let type_a = module.types[a].clone();
    let type_b = module.types[b].clone();
    if type_a.name != type_b.name {
        return Err(Mismatch::Types);
    }
    match (type_a.inner, type_b.inner) {
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
            frames.push(Unifying::Array {
                name: type_a.name,
                bases: (base_a, base_b),
                size,
                strides: (stride_a, stride_b),
            });
            Ok(Entered::Child(base_a, base_b))
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
            frames.push(Unifying::BindingArray {
                name: type_a.name,
                size,
            });
            Ok(Entered::Child(base_a, base_b))
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
            frames.push(Unifying::Struct {
                name: type_a.name,
                members: Vec::with_capacity(members_a.len()),
                members_a,
                members_b,
                span: span_a.max(span_b),
            });
            Ok(Entered::Frame)
        }
        _ => Err(Mismatch::Types),
    }
}

pub(crate) fn same_expression(
    module: &Module,
    a: Handle<Expression>,
    b: Handle<Expression>,
) -> bool {
    let mut pending = Vec::from([(a, b)]);
    while let Some((a, b)) = pending.pop() {
        if !same_expression_shallow(module, a, b, &mut pending) {
            return false;
        }
    }
    true
}

fn same_expression_shallow(
    module: &Module,
    a: Handle<Expression>,
    b: Handle<Expression>,
    pending: &mut Vec<(Handle<Expression>, Handle<Expression>)>,
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
                (Ok(x), Ok(y)) if x.ty == y.ty => {
                    pending.push((x.init, y.init));
                    true
                }
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
            if ty_a != ty_b || components_a.len() != components_b.len() {
                return false;
            }
            pending.extend(
                components_a
                    .iter()
                    .copied()
                    .zip(components_b.iter().copied())
                    .rev(),
            );
            true
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
        ) => {
            if size_a != size_b {
                return false;
            }
            pending.push((*value_a, *value_b));
            true
        }
        _ => left == right,
    }
}
