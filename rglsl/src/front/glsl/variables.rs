use alloc::{format, string::String, vec::Vec};

use super::{
    ast::*,
    context::{Context, ExprPos},
    error::{Error, ErrorKind},
    Frontend, Result, Span,
};
use crate::{
    AddressSpace, Binding, BuiltIn, Constant, Expression, GlobalVariable, Handle, LocalVariable,
    Override, ResourceBinding, Scalar, ShaderStage, SwizzleComponent, Type, TypeInner, VectorSize,
};

pub struct VarDeclaration<'a, 'key> {
    pub qualifiers: &'a mut TypeQualifiers<'key>,
    pub ty: Handle<Type>,
    pub name: Option<String>,
    pub init: Option<Handle<Expression>>,
    /// The declaration is an interface block (`uniform Name { ... } instance;`).
    pub is_block: bool,
    pub meta: Span,
}

/// Information about a builtin used in [`add_builtin`](Frontend::add_builtin).
struct BuiltInData {
    /// The type of the builtin.
    inner: TypeInner,
    /// The associated builtin class.
    builtin: BuiltIn,
    /// Whether the builtin can be written to or not.
    mutable: bool,
    /// The storage used for the builtin.
    storage: StorageQualifier,
}

pub enum GlobalOrConstant {
    Global(Handle<GlobalVariable>),
    Constant(Handle<Constant>),
    Override(Handle<Override>),
}

/// A resource declared without a `binding`, waiting for an automatic one.
#[derive(Debug)]
struct UnboundResource {
    handle: Handle<GlobalVariable>,
    /// The `set` layout qualifier, if the declaration has one.
    set: Option<u32>,
}

/// State of the automatic assignment of bindings and locations.
///
/// See [`Options::auto_map_bindings`] and [`Options::auto_map_locations`].
///
/// [`Options::auto_map_bindings`]: super::Options::auto_map_bindings
/// [`Options::auto_map_locations`]: super::Options::auto_map_locations
#[derive(Debug, Default)]
pub(super) struct AutoMap {
    pub bindings: bool,
    pub locations: bool,
    /// The next automatic location for inputs and for outputs.
    next_input_location: u32,
    next_output_location: u32,
    /// Resources that need a binding, in declaration order.
    unbound: Vec<UnboundResource>,
}

impl AutoMap {
    /// Takes `count` consecutive locations and returns the first one.
    const fn next_location(&mut self, input: bool, count: u32) -> u32 {
        let next = if input {
            &mut self.next_input_location
        } else {
            &mut self.next_output_location
        };
        let location = *next;
        *next = next.saturating_add(count);
        location
    }
}

/// The number of consecutive locations a stage input or output of type `ty`
/// occupies (GLSL 4.60, section 4.4.1 "Input Layout Qualifiers").
fn location_count(types: &crate::UniqueArena<Type>, ty: Handle<Type>) -> u32 {
    /// A `dvec3` or `dvec4` takes two locations, any other vector one.
    const fn vector_locations(size: VectorSize, scalar: Scalar) -> u32 {
        match (size, scalar.width) {
            (VectorSize::Tri | VectorSize::Quad, 8) => 2,
            _ => 1,
        }
    }

    match types[ty].inner {
        TypeInner::Vector { size, scalar } => vector_locations(size, scalar),
        TypeInner::Matrix {
            columns,
            rows,
            scalar,
        } => (columns as u32).saturating_mul(vector_locations(rows, scalar)),
        TypeInner::Array {
            base,
            size: crate::ArraySize::Constant(length),
            ..
        } => length.get().saturating_mul(location_count(types, base)),
        TypeInner::Struct { ref members, .. } => members
            .iter()
            .map(|member| location_count(types, member.ty))
            .fold(0, u32::saturating_add),
        _ => 1,
    }
}

/// Makes `global` invariant if it is a user-defined output. Returns whether
/// it was one.
fn mark_output_invariant(global: &mut GlobalVariable) -> bool {
    if global.space != AddressSpace::Output {
        return false;
    }
    match global.io {
        Some(Binding::Location {
            ref mut invariant, ..
        }) => {
            *invariant = true;
            true
        }
        _ => false,
    }
}

/// Whether a value of type `ty` has a floating-point part, which is
/// interpolated between vertices unless it is qualified otherwise.
fn contains_float(types: &crate::UniqueArena<Type>, ty: Handle<Type>) -> bool {
    match types[ty].inner {
        TypeInner::Scalar(scalar)
        | TypeInner::Vector { scalar, .. }
        | TypeInner::Matrix { scalar, .. } => scalar.kind == crate::ScalarKind::Float,
        TypeInner::Array { base, .. } => contains_float(types, base),
        TypeInner::Struct { ref members, .. } => members
            .iter()
            .any(|member| contains_float(types, member.ty)),
        _ => false,
    }
}

/// Whether `ty` is an opaque type (a texture, a sampler, an acceleration
/// structure) or an array of one.
fn is_opaque(types: &crate::UniqueArena<Type>, ty: Handle<Type>) -> bool {
    match types[ty].inner {
        TypeInner::Image { .. }
        | TypeInner::Sampler { .. }
        | TypeInner::AccelerationStructure { .. } => true,
        TypeInner::Array { base, .. } | TypeInner::BindingArray { base, .. } => {
            is_opaque(types, base)
        }
        _ => false,
    }
}

impl Frontend {
    /// Gives every resource that was declared without a `binding` one, as
    /// [`Options::auto_map_bindings`] describes.
    ///
    /// This runs once the whole shader is parsed, because the binding of a
    /// resource depends on whether the shader uses it.
    ///
    /// [`Options::auto_map_bindings`]: super::Options::auto_map_bindings
    pub(super) fn assign_automatic_bindings(&mut self, module: &mut crate::Module) {
        let mut unbound = core::mem::take(&mut self.auto_map.unbound);
        if unbound.is_empty() {
            return;
        }

        // glslang resolves resources with an explicit `set` before the ones
        // without, and in declaration order within each group.
        unbound.sort_by_key(|resource| resource.set.is_none());

        let live = crate::compact::live_global_variables(module);

        // The bindings taken in each set. Explicit bindings are reserved
        // before any automatic one is chosen.
        let mut taken: crate::FastHashMap<u32, alloc::collections::BTreeSet<u32>> =
            crate::FastHashMap::default();
        for (_, global) in module.global_variables.iter() {
            if let Some(ref binding) = global.binding {
                taken
                    .entry(binding.group)
                    .or_default()
                    .insert(binding.binding);
            }
        }

        for resource in unbound {
            let group = resource.set.unwrap_or(0);
            let binding = if live.contains(resource.handle) {
                let taken = taken.entry(group).or_default();
                let free = (0..=u32::MAX)
                    .find(|binding| !taken.contains(binding))
                    .unwrap_or(u32::MAX);
                taken.insert(free);
                free
            } else {
                // A resource the shader does not use takes no binding of its
                // own; glslang leaves it at binding 0.
                0
            };
            module.global_variables[resource.handle].binding =
                Some(ResourceBinding { group, binding });
        }
    }

    /// Adds a builtin and returns a variable reference to it
    fn add_builtin(
        &mut self,
        ctx: &mut Context,
        name: &str,
        data: BuiltInData,
        meta: Span,
    ) -> Result<Option<VariableReference>> {
        let ty = ctx.module.types.insert(
            Type {
                name: None,
                inner: data.inner,
            },
            meta,
        );

        let handle = ctx.module.global_variables.append(
            GlobalVariable {
                name: Some(name.into()),
                space: AddressSpace::Private,
                binding: None,
                ty,
                init: None,
                memory_decorations: crate::MemoryDecorations::empty(),
                io: None,
            },
            meta,
        );

        let idx = self.entry_args.len();
        self.entry_args.push(EntryArg {
            name: Some(name.into()),
            binding: Binding::BuiltIn(data.builtin),
            handle,
            storage: data.storage,
        });

        self.global_variables.push((
            name.into(),
            GlobalLookup {
                kind: GlobalLookupKind::Variable(handle),
                entry_arg: Some(idx),
                mutable: data.mutable,
            },
        ));

        let expr = ctx.add_expression(Expression::GlobalVariable(handle), meta)?;

        let var = VariableReference {
            expr,
            load: true,
            mutable: data.mutable,
            constant: None,
            entry_arg: Some(idx),
        };

        ctx.symbol_table.add_root(name.into(), var.clone());

        Ok(Some(var))
    }

    pub(crate) fn lookup_variable(
        &mut self,
        ctx: &mut Context,
        name: &str,
        meta: Span,
    ) -> Result<Option<VariableReference>> {
        if let Some(var) = ctx.symbol_table.lookup(name).cloned() {
            return Ok(Some(var));
        }

        let data = match name {
            "gl_Position" => BuiltInData {
                inner: TypeInner::Vector {
                    size: VectorSize::Quad,
                    scalar: Scalar::F32,
                },
                builtin: BuiltIn::Position {
                    invariant: self.invariant_all,
                },
                mutable: true,
                storage: StorageQualifier::Output,
            },
            "gl_FragCoord" => BuiltInData {
                inner: TypeInner::Vector {
                    size: VectorSize::Quad,
                    scalar: Scalar::F32,
                },
                builtin: BuiltIn::Position { invariant: false },
                mutable: false,
                storage: StorageQualifier::Input,
            },
            "gl_PointCoord" => BuiltInData {
                inner: TypeInner::Vector {
                    size: VectorSize::Bi,
                    scalar: Scalar::F32,
                },
                builtin: BuiltIn::PointCoord,
                mutable: false,
                storage: StorageQualifier::Input,
            },
            "gl_GlobalInvocationID"
            | "gl_NumWorkGroups"
            | "gl_WorkGroupSize"
            | "gl_WorkGroupID"
            | "gl_LocalInvocationID" => BuiltInData {
                inner: TypeInner::Vector {
                    size: VectorSize::Tri,
                    scalar: Scalar::U32,
                },
                builtin: match name {
                    "gl_GlobalInvocationID" => BuiltIn::GlobalInvocationId,
                    "gl_NumWorkGroups" => BuiltIn::NumWorkGroups,
                    "gl_WorkGroupSize" => BuiltIn::WorkGroupSize,
                    "gl_WorkGroupID" => BuiltIn::WorkGroupId,
                    "gl_LocalInvocationID" => BuiltIn::LocalInvocationId,
                    _ => unreachable!(),
                },
                mutable: false,
                storage: StorageQualifier::Input,
            },
            "gl_FrontFacing" => BuiltInData {
                inner: TypeInner::Scalar(Scalar::BOOL),
                builtin: BuiltIn::FrontFacing,
                mutable: false,
                storage: StorageQualifier::Input,
            },
            "gl_PointSize" | "gl_FragDepth" => BuiltInData {
                inner: TypeInner::Scalar(Scalar::F32),
                builtin: match name {
                    "gl_PointSize" => BuiltIn::PointSize,
                    "gl_FragDepth" => BuiltIn::FragDepth,
                    _ => unreachable!(),
                },
                mutable: true,
                storage: StorageQualifier::Output,
            },
            "gl_ClipDistance" | "gl_CullDistance" => {
                let base = ctx.module.types.insert(
                    Type {
                        name: None,
                        inner: TypeInner::Scalar(Scalar::F32),
                    },
                    meta,
                );

                BuiltInData {
                    inner: TypeInner::Array {
                        base,
                        size: crate::ArraySize::Dynamic,
                        stride: 4,
                    },
                    builtin: match name {
                        "gl_ClipDistance" => BuiltIn::ClipDistances,
                        "gl_CullDistance" => BuiltIn::CullDistance,
                        _ => unreachable!(),
                    },
                    mutable: self.meta.stage == ShaderStage::Vertex,
                    storage: StorageQualifier::Output,
                }
            }
            _ => {
                let builtin = match name {
                    "gl_BaseVertex" => BuiltIn::BaseVertex,
                    "gl_BaseInstance" => BuiltIn::BaseInstance,
                    "gl_PrimitiveID" => BuiltIn::PrimitiveIndex,
                    "gl_BaryCoordEXT" => BuiltIn::Barycentric { perspective: true },
                    "gl_BaryCoordNoPerspEXT" => BuiltIn::Barycentric { perspective: false },
                    "gl_InstanceIndex" => BuiltIn::InstanceIndex,
                    "gl_VertexIndex" => BuiltIn::VertexIndex,
                    "gl_SampleID" => BuiltIn::SampleIndex,
                    "gl_LocalInvocationIndex" => BuiltIn::LocalInvocationIndex,
                    "gl_DrawID" => BuiltIn::DrawIndex,
                    _ => return Ok(None),
                };

                // GLSL declares the index built-ins as `int`; only
                // `gl_LocalInvocationIndex` is `uint`.
                let inner = match builtin {
                    BuiltIn::LocalInvocationIndex => TypeInner::Scalar(Scalar::U32),
                    BuiltIn::Barycentric { .. } => TypeInner::Vector {
                        size: VectorSize::Tri,
                        scalar: Scalar::F32,
                    },
                    _ => TypeInner::Scalar(Scalar::I32),
                };

                BuiltInData {
                    inner,
                    builtin,
                    mutable: false,
                    storage: StorageQualifier::Input,
                }
            }
        };

        self.add_builtin(ctx, name, data, meta)
    }

    pub(crate) fn make_variable_invariant(
        &mut self,
        ctx: &mut Context,
        name: &str,
        meta: Span,
    ) -> Result<()> {
        let var = self
            .lookup_variable(ctx, name, meta)?
            .ok_or_else(|| Error {
                kind: ErrorKind::UnknownVariable(name.into()),
                meta,
            })?;

        // A user-defined output.
        if let Expression::GlobalVariable(handle) = ctx.expressions[var.expr] {
            if mark_output_invariant(&mut ctx.module.global_variables[handle]) {
                return Ok(());
            }
        }

        match var.entry_arg.map(|index| &mut self.entry_args[index]) {
            Some(&mut EntryArg {
                binding: Binding::BuiltIn(BuiltIn::Position { ref mut invariant }),
                storage: StorageQualifier::Output,
                ..
            }) => {
                *invariant = true;
                Ok(())
            }
            // Of the built-in outputs, the IR can only mark the position as
            // invariant. Dropping the qualifier would silently change the
            // meaning of the shader.
            Some(&mut EntryArg {
                storage: StorageQualifier::Output,
                ..
            }) => Err(Error {
                kind: ErrorKind::NotImplemented(
                    "invariant on built-in outputs other than gl_Position",
                ),
                meta,
            }),
            _ => Err(Error {
                kind: ErrorKind::SemanticError("invariant can only apply to an output".into()),
                meta,
            }),
        }
    }

    /// Handles `#pragma STDGL invariant(all)`: every output is invariant.
    pub(crate) fn set_invariant_all(&mut self, meta: Span) {
        self.invariant_all = true;
        for arg in &mut self.entry_args {
            if arg.storage != StorageQualifier::Output {
                continue;
            }
            match arg.binding {
                Binding::BuiltIn(BuiltIn::Position { ref mut invariant }) => *invariant = true,
                _ => self.errors.push(Error {
                    kind: ErrorKind::NotImplemented(
                        "invariant on built-in outputs other than gl_Position",
                    ),
                    meta,
                }),
            }
        }
    }

    /// Applies `#pragma STDGL invariant(all)` to the user-defined outputs.
    ///
    /// This runs once the whole shader is parsed, so that it covers outputs
    /// declared before the pragma as well as after it.
    pub(super) fn apply_invariant_all(&self, module: &mut crate::Module) {
        if !self.invariant_all {
            return;
        }
        for &handle in &self.interface {
            mark_output_invariant(&mut module.global_variables[handle]);
        }
    }

    /// Rejects declarations of names that GLSL reserves.
    ///
    /// Identifiers starting with `gl_` are reserved. GLSL allows a few built-in
    /// variables to be redeclared (`out float gl_ClipDistance[4];`,
    /// `layout(depth_less) out float gl_FragDepth;`), which is not supported
    /// yet; treating such a declaration as a new user variable would silently
    /// give it a location instead of its built-in meaning.
    fn check_declared_name(&mut self, name: Option<&str>, meta: Span) -> Result<()> {
        match name {
            Some(name) if name.starts_with("gl_") => Err(Error {
                kind: ErrorKind::SemanticError(
                    format!(
                        "'{name}': identifiers starting with \"gl_\" are reserved (redeclaring built-in variables is not supported yet)"
                    )
                    .into(),
                ),
                meta,
            }),
            _ => Ok(()),
        }
    }

    pub(crate) fn field_selection(
        &mut self,
        ctx: &mut Context,
        pos: ExprPos,
        expression: Handle<Expression>,
        name: &str,
        meta: Span,
    ) -> Result<Handle<Expression>> {
        // A pointer to a column of a matrix, or to another vector that is not
        // a variable of its own, is a `ValuePointer`.
        let pointee_vector;
        let (ty, is_pointer) = match *ctx.resolve_type(expression, meta)? {
            TypeInner::Pointer { base, .. } => (&ctx.module.types[base].inner, true),
            TypeInner::ValuePointer {
                size: Some(size),
                scalar,
                ..
            } => {
                pointee_vector = TypeInner::Vector { size, scalar };
                (&pointee_vector, true)
            }
            ref ty => (ty, false),
        };
        match *ty {
            TypeInner::Struct { ref members, .. } => {
                let index = members
                    .iter()
                    .position(|m| m.name == Some(name.into()))
                    .ok_or_else(|| Error {
                        kind: ErrorKind::UnknownField(name.into()),
                        meta,
                    })?;
                // A runtime-sized array has no value to load; it can only be
                // indexed or asked for its length, through the pointer.
                let member_ty = members[index].ty;
                let runtime_sized = matches!(
                    ctx.module.types[member_ty].inner,
                    TypeInner::Array {
                        size: crate::ArraySize::Dynamic,
                        ..
                    }
                );
                let pointer = ctx.add_expression(
                    Expression::AccessIndex {
                        base: expression,
                        index: index as u32,
                    },
                    meta,
                )?;

                Ok(match pos {
                    ExprPos::Rhs if is_pointer && !runtime_sized => {
                        ctx.add_expression(Expression::Load { pointer }, meta)?
                    }
                    _ => pointer,
                })
            }
            // swizzles (xyzw, rgba, stpq)
            TypeInner::Vector { size, .. } => {
                let check_swizzle_components = |comps: &str| {
                    name.chars()
                        .map(|c| {
                            comps
                                .find(c)
                                .filter(|i| *i < size as usize)
                                .map(|i| SwizzleComponent::from_index(i as u32))
                        })
                        .collect::<Option<Vec<SwizzleComponent>>>()
                };

                let components = check_swizzle_components("xyzw")
                    .or_else(|| check_swizzle_components("rgba"))
                    .or_else(|| check_swizzle_components("stpq"));

                if let Some(components) = components {
                    if let ExprPos::Lhs = pos {
                        let not_unique = (1..components.len())
                            .any(|i| components[i..].contains(&components[i - 1]));
                        if not_unique {
                            self.errors.push(Error {
                                kind: ErrorKind::SemanticError(
                                    format!(
                                        concat!(
                                            "swizzle cannot have duplicate components in ",
                                            "left-hand-side expression for \"{:?}\""
                                        ),
                                        name
                                    )
                                    .into(),
                                ),
                                meta,
                            })
                        }
                    }

                    let mut pattern = [SwizzleComponent::X; 4];
                    for (pat, component) in pattern.iter_mut().zip(&components) {
                        *pat = *component;
                    }

                    // flatten nested swizzles (vec.zyx.xy.x => vec.z)
                    let mut expression = expression;
                    if let Expression::Swizzle {
                        size: _,
                        vector,
                        pattern: ref src_pattern,
                    } = ctx[expression]
                    {
                        expression = vector;
                        for pat in &mut pattern {
                            *pat = src_pattern[pat.index() as usize];
                        }
                    }

                    let size = match components.len() {
                        // Swizzles with just one component are accesses and not swizzles
                        1 => {
                            match pos {
                                // If the position is in the right hand side and the base
                                // vector is a pointer, load it, otherwise the swizzle would
                                // produce a pointer
                                ExprPos::Rhs if is_pointer => {
                                    expression = ctx.add_expression(
                                        Expression::Load {
                                            pointer: expression,
                                        },
                                        meta,
                                    )?;
                                }
                                _ => {}
                            };
                            return ctx.add_expression(
                                Expression::AccessIndex {
                                    base: expression,
                                    index: pattern[0].index(),
                                },
                                meta,
                            );
                        }
                        2 => VectorSize::Bi,
                        3 => VectorSize::Tri,
                        4 => VectorSize::Quad,
                        _ => {
                            self.errors.push(Error {
                                kind: ErrorKind::SemanticError(
                                    format!("Bad swizzle size for \"{name:?}\"").into(),
                                ),
                                meta,
                            });

                            VectorSize::Quad
                        }
                    };

                    if is_pointer {
                        // NOTE: for lhs expression, this extra load ends up as an unused expr, because the
                        // assignment will extract the pointer and use it directly anyway. Unfortunately we
                        // need it for validation to pass, as swizzles cannot operate on pointer values.
                        expression = ctx.add_expression(
                            Expression::Load {
                                pointer: expression,
                            },
                            meta,
                        )?;
                    }

                    Ok(ctx.add_expression(
                        Expression::Swizzle {
                            size,
                            vector: expression,
                            pattern,
                        },
                        meta,
                    )?)
                } else {
                    Err(Error {
                        kind: ErrorKind::SemanticError(
                            format!("Invalid swizzle for vector \"{name}\"").into(),
                        ),
                        meta,
                    })
                }
            }
            _ => Err(Error {
                kind: ErrorKind::SemanticError(
                    format!("Can't lookup field on this type \"{name}\"").into(),
                ),
                meta,
            }),
        }
    }

    pub(crate) fn add_global_var(
        &mut self,
        ctx: &mut Context,
        VarDeclaration {
            qualifiers,
            mut ty,
            name,
            init,
            is_block,
            meta,
        }: VarDeclaration,
    ) -> Result<GlobalOrConstant> {
        self.check_declared_name(name.as_deref(), meta)?;

        let storage = qualifiers.storage.0;
        let (ret, lookup) = match storage {
            StorageQualifier::Input | StorageQualifier::Output => {
                let input = storage == StorageQualifier::Input;
                let location = match qualifiers.uint_layout_qualifier("location", &mut self.errors)
                {
                    Some(location) => location,
                    None if self.auto_map.locations => {
                        let count = location_count(&ctx.module.types, ty);
                        self.auto_map.next_location(input, count)
                    }
                    None => {
                        self.errors.push(Error {
                            kind: ErrorKind::SemanticError(
                                "SPIR-V requires location for user input/output".into(),
                            ),
                            meta,
                        });
                        0
                    }
                };

                let mut interpolation = qualifiers.interpolation.take().map(|(i, _)| i);
                let mut sampling = qualifiers.sampling.take().map(|(s, _)| s);
                // Perspective-correct interpolation at the pixel centre is
                // the default for anything that can be interpolated.
                if interpolation.is_none() && contains_float(&ctx.module.types, ty) {
                    interpolation = Some(crate::Interpolation::Perspective);
                    sampling.get_or_insert(crate::Sampling::Center);
                }

                let component = qualifiers.uint_layout_qualifier("component", &mut self.errors);

                let blend_src = qualifiers
                    .layout_qualifiers
                    .remove(&QualifierKey::Index)
                    .and_then(|(value, _span)| match value {
                        QualifierValue::Uint(index) => Some(index),
                        _ => None,
                    });

                let invariant = match qualifiers.invariant.take() {
                    Some(invariant_meta) if input => {
                        self.errors.push(Error {
                            kind: ErrorKind::SemanticError(
                                "invariant can only apply to an output".into(),
                            ),
                            meta: invariant_meta,
                        });
                        false
                    }
                    Some(_) => true,
                    None => false,
                };

                if input && init.is_some() {
                    self.errors.push(Error {
                        kind: ErrorKind::SemanticError(
                            "a stage input cannot have an initializer".into(),
                        ),
                        meta,
                    });
                }

                // The variable is the stage input or output itself: it is
                // declared in the `Input` or `Output` address space, bound to
                // its location, and listed in the entry point's interface.
                let handle = ctx.module.global_variables.append(
                    GlobalVariable {
                        name: name.clone(),
                        space: if input {
                            AddressSpace::Input
                        } else {
                            AddressSpace::Output
                        },
                        binding: None,
                        ty,
                        init: init.filter(|_| !input),
                        memory_decorations: crate::MemoryDecorations::empty(),
                        io: Some(Binding::Location {
                            location,
                            interpolation,
                            sampling,
                            blend_src,
                            per_primitive: false,
                            component,
                            invariant,
                            patch: false,
                        }),
                    },
                    meta,
                );
                self.interface.push(handle);

                let lookup = GlobalLookup {
                    kind: GlobalLookupKind::Variable(handle),
                    entry_arg: None,
                    mutable: !input,
                };

                (GlobalOrConstant::Global(handle), lookup)
            }
            StorageQualifier::Const => {
                // Check if this is a specialization constant with constant_id
                let constant_id = qualifiers.uint_layout_qualifier("constant_id", &mut self.errors);

                if let Some(id) = constant_id {
                    // This is a specialization constant - convert to Override
                    let id: Option<u16> = match id.try_into() {
                        Ok(v) => Some(v),
                        Err(_) => {
                            self.errors.push(Error {
                                kind: ErrorKind::SemanticError(
                                    format!(
                                        "constant_id value {id} is too high (maximum is {})",
                                        u16::MAX
                                    )
                                    .into(),
                                ),
                                meta,
                            });
                            None
                        }
                    };

                    let override_handle = ctx.module.overrides.append(
                        Override {
                            name: name.clone(),
                            id,
                            ty,
                            init,
                        },
                        meta,
                    );

                    let lookup = GlobalLookup {
                        kind: GlobalLookupKind::Override(override_handle, ty),
                        entry_arg: None,
                        mutable: false,
                    };

                    (GlobalOrConstant::Override(override_handle), lookup)
                } else {
                    // Regular constant
                    let init = init.ok_or_else(|| Error {
                        kind: ErrorKind::SemanticError(
                            "const values must have an initializer".into(),
                        ),
                        meta,
                    })?;

                    let constant = Constant {
                        name: name.clone(),
                        ty,
                        init,
                    };
                    let handle = ctx.module.constants.append(constant, meta);

                    let lookup = GlobalLookup {
                        kind: GlobalLookupKind::Constant(handle, ty),
                        entry_arg: None,
                        mutable: false,
                    };

                    (GlobalOrConstant::Constant(handle), lookup)
                }
            }
            StorageQualifier::AddressSpace(mut space) => {
                match space {
                    AddressSpace::Storage { ref mut access } => {
                        if let Some((allowed_access, _)) = qualifiers.storage_access.take() {
                            *access = allowed_access;
                        }
                    }
                    AddressSpace::Uniform => match ctx.module.types[ty].inner {
                        TypeInner::Image {
                            class,
                            dim,
                            arrayed,
                        } => {
                            if let crate::ImageClass::Storage {
                                mut access,
                                mut format,
                            } = class
                            {
                                if let Some((allowed_access, _)) = qualifiers.storage_access.take()
                                {
                                    access = allowed_access;
                                }

                                match qualifiers.layout_qualifiers.remove(&QualifierKey::Format) {
                                    Some((QualifierValue::Format(f), _)) => format = f,
                                    // TODO: glsl supports images without format qualifier
                                    // if they are `writeonly`
                                    None => self.errors.push(Error {
                                        kind: ErrorKind::SemanticError(
                                            "image types require a format layout qualifier".into(),
                                        ),
                                        meta,
                                    }),
                                    _ => unreachable!(),
                                }

                                ty = ctx.module.types.insert(
                                    Type {
                                        name: None,
                                        inner: TypeInner::Image {
                                            dim,
                                            arrayed,
                                            class: crate::ImageClass::Storage { format, access },
                                        },
                                    },
                                    meta,
                                );
                            }

                            space = AddressSpace::Handle
                        }
                        TypeInner::Sampler { .. } => space = AddressSpace::Handle,
                        _ => {
                            if !is_block && !is_opaque(&ctx.module.types, ty) {
                                // Vulkan has no default uniform block
                                // (GL_KHR_vulkan_glsl).
                                self.errors.push(Error {
                                    kind: ErrorKind::SemanticError(
                                        "non-opaque uniforms outside a block are not allowed \
                                         when using GLSL for Vulkan"
                                            .into(),
                                    ),
                                    meta,
                                });
                            }
                            if qualifiers.none_layout_qualifier("push_constant", &mut self.errors) {
                                space = AddressSpace::Immediate
                            }
                        }
                    },
                    AddressSpace::Function => space = AddressSpace::Private,
                    _ => {}
                };

                // `Some(set)` if the resource needs a binding and has none.
                let mut unbound_set = None;
                let binding = match space {
                    AddressSpace::Uniform | AddressSpace::Storage { .. } | AddressSpace::Handle => {
                        let binding = qualifiers.uint_layout_qualifier("binding", &mut self.errors);
                        let set = qualifiers.uint_layout_qualifier("set", &mut self.errors);
                        if binding.is_none() {
                            if self.auto_map.bindings {
                                unbound_set = Some(set);
                            } else {
                                self.errors.push(Error {
                                    kind: ErrorKind::SemanticError(
                                        "uniform/buffer blocks require layout(binding=X)".into(),
                                    ),
                                    meta,
                                });
                            }
                        }
                        binding.map(|binding| ResourceBinding {
                            group: set.unwrap_or(0),
                            binding,
                        })
                    }
                    _ => None,
                };

                let handle = ctx.module.global_variables.append(
                    GlobalVariable {
                        name: name.clone(),
                        space,
                        binding,
                        ty,
                        init,
                        memory_decorations: crate::MemoryDecorations::empty(),
                        io: None,
                    },
                    meta,
                );

                if let Some(set) = unbound_set {
                    self.auto_map.unbound.push(UnboundResource { handle, set });
                }

                let lookup = GlobalLookup {
                    kind: GlobalLookupKind::Variable(handle),
                    entry_arg: None,
                    mutable: true,
                };

                (GlobalOrConstant::Global(handle), lookup)
            }
        };

        if let Some(name) = name {
            ctx.add_global(&name, lookup)?;

            self.global_variables.push((name, lookup));
        }

        qualifiers.unused_errors(&mut self.errors);

        Ok(ret)
    }

    pub(crate) fn add_local_var(
        &mut self,
        ctx: &mut Context,
        decl: VarDeclaration,
    ) -> Result<Handle<Expression>> {
        self.check_declared_name(decl.name.as_deref(), decl.meta)?;

        let storage = decl.qualifiers.storage;
        let mutable = match storage.0 {
            StorageQualifier::AddressSpace(AddressSpace::Function) => true,
            StorageQualifier::Const => false,
            _ => {
                self.errors.push(Error {
                    kind: ErrorKind::SemanticError("Locals cannot have a storage qualifier".into()),
                    meta: storage.1,
                });
                true
            }
        };

        let handle = ctx.locals.append(
            LocalVariable {
                name: decl.name.clone(),
                ty: decl.ty,
                init: decl.init,
            },
            decl.meta,
        );
        let expr = ctx.add_expression(Expression::LocalVariable(handle), decl.meta)?;

        if let Some(name) = decl.name {
            let maybe_var = ctx.add_local_var(name.clone(), expr, mutable);

            if maybe_var.is_some() {
                self.errors.push(Error {
                    kind: ErrorKind::VariableAlreadyDeclared(name),
                    meta: decl.meta,
                })
            }
        }

        decl.qualifiers.unused_errors(&mut self.errors);

        Ok(expr)
    }
}
