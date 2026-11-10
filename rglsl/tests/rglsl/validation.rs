//! Tests of the module validator.
//!

use rglsl::{
    ir::{self, Expression, Function, Module, Scalar},
    valid::{self, Capabilities, ModuleInfo, ValidationFlags},
};

#[derive(Default)]
struct TestSpanGenerator(u32);

impl TestSpanGenerator {
    fn next(&mut self) -> rglsl::Span {
        let span = rglsl::Span::new(self.0, self.0 + 1);
        self.0 += 1;
        span
    }
}

#[track_caller]
fn expect_validation_error_impl<I: IntoIterator<Item = rglsl::Span>>(
    module: &Module,
    validation_flags: valid::ValidationFlags,
    capabilities: valid::Capabilities,
    spans: Option<I>,
) -> rglsl::valid::ValidationError {
    let err = valid::Validator::new(validation_flags, capabilities)
        .validate(module)
        .expect_err("module should be invalid");

    if let Some(expected_spans_iter) = spans {
        let actual_spans = err.spans().map(|sctx| sctx.0).collect::<Vec<_>>();
        let expected_spans = expected_spans_iter.into_iter().collect::<Vec<_>>();
        assert_eq!(
            actual_spans, expected_spans,
            "expected error spans to be {expected_spans:?}, got {actual_spans:?}",
        );
    }

    err.into_inner()
}

/// Validate `module` with the given `validation_flags` and `capabilities`.
///
/// Panics if validation succeeds or fails with an error not associated with
/// `span`. Otherwise, returns the validation error.
///
/// Note that only the span is checked, not the associated context string.
#[track_caller]
fn expect_validation_error_with_span(
    module: &Module,
    validation_flags: valid::ValidationFlags,
    capabilities: valid::Capabilities,
    span: rglsl::Span,
) -> rglsl::valid::ValidationError {
    expect_validation_error_impl(
        module,
        validation_flags,
        capabilities,
        Some(core::iter::once(span)),
    )
}

/// Validation should fail if `AtomicResult` expressions are not
/// populated by `Atomic` statements.
#[test]
fn populate_atomic_result() {
    use rglsl::{Module, Type, TypeInner};

    /// Different variants of the test case that we want to exercise.
    enum Variant {
        /// An `AtomicResult` expression with an `Atomic` statement
        /// that populates it: valid.
        Atomic,

        /// An `AtomicResult` expression visited by an `Emit`
        /// statement: invalid.
        Emit,

        /// An `AtomicResult` expression visited by no statement at
        /// all: invalid
        None,
    }

    // Looking at uses of `variant` should make it easy to identify
    // the differences between the test cases.
    fn try_variant(
        variant: Variant,
    ) -> Result<ModuleInfo, rglsl::WithSpan<rglsl::valid::ValidationError>> {
        let span = rglsl::Span::default();
        let mut module = Module::default();
        let ty_u32 = module.types.insert(
            Type {
                name: Some("u32".into()),
                inner: TypeInner::Scalar(Scalar::U32),
            },
            span,
        );
        let ty_atomic_u32 = module.types.insert(
            Type {
                name: Some("atomic<u32>".into()),
                inner: TypeInner::Atomic(Scalar::U32),
            },
            span,
        );
        let var_atomic = module.global_variables.append(
            rglsl::GlobalVariable {
                name: Some("atomic_global".into()),
                space: rglsl::AddressSpace::WorkGroup,
                binding: None,
                ty: ty_atomic_u32,
                init: None,
                memory_decorations: rglsl::MemoryDecorations::empty(),
                io: None,
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
            },
            span,
        );

        let mut fun = Function::default();
        let ex_global = fun
            .expressions
            .append(Expression::GlobalVariable(var_atomic), span);
        let ex_42 = fun
            .expressions
            .append(Expression::Literal(rglsl::Literal::U32(42)), span);
        let ex_result = fun.expressions.append(
            Expression::AtomicResult {
                ty: ty_u32,
                comparison: false,
            },
            span,
        );

        match variant {
            Variant::Atomic => {
                fun.body.push(
                    rglsl::Statement::Atomic {
                        pointer: ex_global,
                        fun: rglsl::AtomicFunction::Add,
                        value: ex_42,
                        result: Some(ex_result),
                        order: None,
                    },
                    span,
                );
            }
            Variant::Emit => {
                fun.body.push(
                    rglsl::Statement::Emit(rglsl::Range::new_from_bounds(ex_result, ex_result)),
                    span,
                );
            }
            Variant::None => {}
        }

        module.functions.append(fun, span);

        valid::Validator::new(
            valid::ValidationFlags::default(),
            valid::Capabilities::all(),
        )
        .validate(&module)
    }

    try_variant(Variant::Atomic).expect("module should validate");
    assert!(try_variant(Variant::Emit).is_err());
    assert!(try_variant(Variant::None).is_err());
}

#[test]
fn populate_call_result() {
    use rglsl::{Module, Type, TypeInner};

    /// Different variants of the test case that we want to exercise.
    enum Variant {
        /// A `CallResult` expression with an `Call` statement that
        /// populates it: valid.
        Call,

        /// A `CallResult` expression visited by an `Emit` statement:
        /// invalid.
        Emit,

        /// A `CallResult` expression visited by no statement at all:
        /// invalid
        None,
    }

    // Looking at uses of `variant` should make it easy to identify
    // the differences between the test cases.
    fn try_variant(
        variant: Variant,
    ) -> Result<ModuleInfo, rglsl::WithSpan<rglsl::valid::ValidationError>> {
        let span = rglsl::Span::default();
        let mut module = Module::default();
        let ty_u32 = module.types.insert(
            Type {
                name: Some("u32".into()),
                inner: TypeInner::Scalar(Scalar::U32),
            },
            span,
        );

        let mut fun_callee = Function {
            result: Some(rglsl::FunctionResult {
                ty: ty_u32,
                binding: None,
            }),
            ..Function::default()
        };
        let ex_42 = fun_callee
            .expressions
            .append(Expression::Literal(rglsl::Literal::U32(42)), span);
        fun_callee
            .body
            .push(rglsl::Statement::Return { value: Some(ex_42) }, span);
        let fun_callee = module.functions.append(fun_callee, span);

        let mut fun_caller = Function::default();
        let ex_result = fun_caller
            .expressions
            .append(Expression::CallResult(fun_callee), span);

        match variant {
            Variant::Call => {
                fun_caller.body.push(
                    rglsl::Statement::Call {
                        function: fun_callee,
                        arguments: vec![],
                        result: Some(ex_result),
                    },
                    span,
                );
            }
            Variant::Emit => {
                fun_caller.body.push(
                    rglsl::Statement::Emit(rglsl::Range::new_from_bounds(ex_result, ex_result)),
                    span,
                );
            }
            Variant::None => {}
        }

        module.functions.append(fun_caller, span);

        valid::Validator::new(
            valid::ValidationFlags::default(),
            valid::Capabilities::all(),
        )
        .validate(&module)
    }

    try_variant(Variant::Call).expect("should validate");
    assert!(try_variant(Variant::Emit).is_err());
    assert!(try_variant(Variant::None).is_err());
}

#[test]
fn emit_workgroup_uniform_load_result() {
    use rglsl::{Module, Type, TypeInner};

    // We want to ensure that the *only* problem with the code is the
    // use of an `Emit` statement instead of an `Atomic` statement. So
    // validate two versions of the module varying only in that
    // aspect.
    //
    // Looking at uses of the `wg_load` makes it easy to identify the
    // differences between the two variants.
    fn variant(
        wg_load: bool,
    ) -> Result<ModuleInfo, rglsl::WithSpan<rglsl::valid::ValidationError>> {
        let span = rglsl::Span::default();
        let mut module = Module::default();
        let ty_u32 = module.types.insert(
            Type {
                name: Some("u32".into()),
                inner: TypeInner::Scalar(Scalar::U32),
            },
            span,
        );
        let var_workgroup = module.global_variables.append(
            rglsl::GlobalVariable {
                name: Some("workgroup_global".into()),
                space: rglsl::AddressSpace::WorkGroup,
                binding: None,
                ty: ty_u32,
                init: None,
                memory_decorations: rglsl::MemoryDecorations::empty(),
                io: None,
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
            },
            span,
        );

        let mut fun = Function::default();
        let ex_global = fun
            .expressions
            .append(Expression::GlobalVariable(var_workgroup), span);
        let ex_result = fun
            .expressions
            .append(Expression::WorkGroupUniformLoadResult { ty: ty_u32 }, span);

        if wg_load {
            fun.body.push(
                rglsl::Statement::WorkGroupUniformLoad {
                    pointer: ex_global,
                    result: ex_result,
                },
                span,
            );
        } else {
            fun.body.push(
                rglsl::Statement::Emit(rglsl::Range::new_from_bounds(ex_result, ex_result)),
                span,
            );
        }

        module.functions.append(fun, span);

        valid::Validator::new(
            valid::ValidationFlags::default(),
            valid::Capabilities::all(),
        )
        .validate(&module)
    }

    variant(true).expect("module should validate");
    assert!(variant(false).is_err());
}

#[test]
fn builtin_cross_product_args() {
    use rglsl::{MathFunction, Module, Type, TypeInner, VectorSize};

    // We want to ensure that the *only* problem with the code is the
    // arity of the call, or the size of the vectors passed to
    // `cross`. So validate different versions of the module varying
    // only in those aspects.
    //
    // Looking at uses of `size` and `arity` makes it easy to identify
    // the differences between the variants.
    fn variant(
        size: VectorSize,
        arity: usize,
    ) -> Result<ModuleInfo, rglsl::WithSpan<rglsl::valid::ValidationError>> {
        let span = rglsl::Span::default();
        let mut module = Module::default();
        let ty_vec3f = module.types.insert(
            Type {
                name: Some("vecnf".into()),
                inner: TypeInner::Vector {
                    size: VectorSize::Tri,
                    scalar: Scalar::F32,
                },
            },
            span,
        );
        let ty_vecnf = module.types.insert(
            Type {
                name: Some("vecnf".into()),
                inner: TypeInner::Vector {
                    size,
                    scalar: Scalar::F32,
                },
            },
            span,
        );

        let mut fun = Function {
            result: Some(rglsl::ir::FunctionResult {
                ty: ty_vec3f,
                binding: None,
            }),
            ..Function::default()
        };
        let ex_zero = fun
            .expressions
            .append(Expression::ZeroValue(ty_vecnf), span);
        let ex_cross = fun.expressions.append(
            Expression::Math {
                fun: MathFunction::Cross,
                arg: ex_zero,
                arg1: (arity >= 2).then_some(ex_zero),
                arg2: (arity >= 3).then_some(ex_zero),
                arg3: (arity >= 4).then_some(ex_zero),
            },
            span,
        );

        fun.body.push(
            rglsl::Statement::Emit(rglsl::Range::new_from_bounds(ex_cross, ex_cross)),
            span,
        );
        fun.body.push(
            rglsl::Statement::Return {
                value: Some(ex_cross),
            },
            span,
        );

        module.functions.append(fun, span);

        valid::Validator::new(
            valid::ValidationFlags::default(),
            valid::Capabilities::all(),
        )
        .validate(&module)
    }

    assert!(variant(VectorSize::Bi, 2).is_err());

    assert!(variant(VectorSize::Tri, 1).is_err());
    variant(VectorSize::Tri, 2).expect("module should validate");
    assert!(variant(VectorSize::Tri, 3).is_err());
    assert!(variant(VectorSize::Tri, 4).is_err());

    assert!(variant(VectorSize::Quad, 2).is_err());
}

struct BindingArrayFixture {
    module: Module,
    span: rglsl::Span,
    ty_u32: rglsl::Handle<rglsl::Type>,
    ty_array: rglsl::Handle<rglsl::Type>,
    ty_struct: rglsl::Handle<rglsl::Type>,
    validator: rglsl::valid::Validator,
}

impl BindingArrayFixture {
    fn new() -> Self {
        let mut module = Module::default();
        let span = rglsl::Span::default();
        let ty_u32 = module.types.insert(
            rglsl::Type {
                name: Some("u32".into()),
                inner: rglsl::TypeInner::Scalar(rglsl::Scalar::U32),
            },
            span,
        );
        let ty_array = module.types.insert(
            rglsl::Type {
                name: Some("array<u32, 10>".into()),
                inner: rglsl::TypeInner::Array {
                    base: ty_u32,
                    size: rglsl::ArraySize::Constant(core::num::NonZeroU32::new(10).unwrap()),
                    stride: 4,
                },
            },
            span,
        );
        let ty_struct = module.types.insert(
            rglsl::Type {
                name: Some("S".into()),
                inner: rglsl::TypeInner::Struct {
                    members: vec![rglsl::StructMember {
                        name: Some("m".into()),
                        ty: ty_u32,
                        binding: None,
                        offset: 0,
                        matrix_layout: None,
                        xfb_offset: None,
                        heap: None,
                    }],
                    span: 4,
                },
            },
            span,
        );
        let validator = rglsl::valid::Validator::new(Default::default(), Default::default());
        BindingArrayFixture {
            module,
            span,
            ty_u32,
            ty_array,
            ty_struct,
            validator,
        }
    }
}

#[test]
fn binding_arrays_hold_structs() {
    let mut t = BindingArrayFixture::new();
    let _binding_array = t.module.types.insert(
        rglsl::Type {
            name: Some("binding_array_of_struct".into()),
            inner: rglsl::TypeInner::BindingArray {
                base: t.ty_struct,
                size: rglsl::ArraySize::Dynamic,
            },
        },
        t.span,
    );

    assert!(t.validator.validate(&t.module).is_ok());
}

#[test]
fn binding_arrays_cannot_hold_arrays() {
    let mut t = BindingArrayFixture::new();
    let _binding_array = t.module.types.insert(
        rglsl::Type {
            name: Some("binding_array_of_array".into()),
            inner: rglsl::TypeInner::BindingArray {
                base: t.ty_array,
                size: rglsl::ArraySize::Dynamic,
            },
        },
        t.span,
    );

    assert!(t.validator.validate(&t.module).is_err());
}

#[test]
fn binding_arrays_cannot_hold_scalars() {
    let mut t = BindingArrayFixture::new();
    let _binding_array = t.module.types.insert(
        rglsl::Type {
            name: Some("binding_array_of_scalar".into()),
            inner: rglsl::TypeInner::BindingArray {
                base: t.ty_u32,
                size: rglsl::ArraySize::Dynamic,
            },
        },
        t.span,
    );

    assert!(t.validator.validate(&t.module).is_err());
}

// Adds IR for `override len: u32` and the type `array<u32, len>`.
fn make_override_array(module: &mut ir::Module) -> rglsl::Handle<ir::Type> {
    let span = rglsl::Span::default();

    let ty_u32 = module.types.insert(
        ir::Type {
            name: Some("u32".into()),
            inner: ir::TypeInner::Scalar(Scalar::U32),
        },
        span,
    );

    let len = module.overrides.append(
        ir::Override {
            name: Some("len".into()),
            id: None,
            ty: ty_u32,
            init: None,
        },
        span,
    );

    module.types.insert(
        ir::Type {
            name: Some("array<u32, len>".into()),
            inner: ir::TypeInner::Array {
                base: ty_u32,
                size: ir::ArraySize::Pending(len),
                stride: 4,
            },
        },
        span,
    )
}

// Adds IR for type `array<u32>`.
fn make_runtime_array(module: &mut ir::Module) -> rglsl::Handle<ir::Type> {
    let span = rglsl::Span::default();

    let ty_u32 = module.types.insert(
        ir::Type {
            name: Some("u32".into()),
            inner: ir::TypeInner::Scalar(Scalar::U32),
        },
        span,
    );

    module.types.insert(
        ir::Type {
            name: Some("array<u32>".into()),
            inner: ir::TypeInner::Array {
                base: ty_u32,
                size: ir::ArraySize::Dynamic,
                stride: 4,
            },
        },
        span,
    )
}

// Adds a local variable `var x: ty = ty();`.
fn make_zero_value_local_variable(fun: &mut Function, ty: rglsl::Handle<ir::Type>) {
    let span = rglsl::Span::default();

    let ex_zero = fun.expressions.append(Expression::ZeroValue(ty), span);

    fun.local_variables.append(
        rglsl::LocalVariable {
            name: Some("x".into()),
            ty,
            init: Some(ex_zero),
        },
        span,
    );
}

#[test]
fn local_var_override_sized_array() {
    // Similar to a test in wgsl_errors::invalid_local_vars.
    // ```
    // override len: u32;
    // var<workgroup> arr: array<u32, len>;
    // fn f() {
    //     var x: array<u32, len> = arr;
    // }
    // ```
    let span = rglsl::Span::default();
    let mut module = ir::Module::default();

    let ty_array = make_override_array(&mut module);

    let var_arr = module.global_variables.append(
        rglsl::GlobalVariable {
            name: Some("arr".into()),
            space: rglsl::AddressSpace::WorkGroup,
            binding: None,
            ty: ty_array,
            init: None,
            memory_decorations: rglsl::MemoryDecorations::empty(),
            io: None,
            xfb: None,
            input_attachment_index: None,
            heap_offset: None,
        },
        span,
    );

    let mut fun = Function {
        name: Some("f".into()),
        ..Default::default()
    };

    let ex_global = fun
        .expressions
        .append(Expression::GlobalVariable(var_arr), span);
    let ex_load = fun
        .expressions
        .append(Expression::Load { pointer: ex_global }, span);

    fun.local_variables.append(
        rglsl::LocalVariable {
            name: Some("x".into()),
            ty: ty_array,
            init: Some(ex_load),
        },
        span,
    );

    module.functions.append(fun, span);

    let err = valid::Validator::new(Default::default(), valid::Capabilities::all())
        .validate(&module)
        .expect_err("module should be invalid")
        .into_inner();

    assert!(matches!(
        err,
        valid::ValidationError::Function {
            source: valid::FunctionError::LocalVariable {
                name: local_var_name,
                source: valid::LocalVariableError::NonConstOrOverrideInitializer,
                ..
            },
            ..
        } if local_var_name == "x"
    ));
}

#[test]
fn invalid_zero_value_runtime_array() {
    // Similar to a test in wgsl_errors::invalid_zero_value_constructors.
    // ```
    // fn main() {
    //     var x = array<u32>();
    // }
    // ```
    let span = rglsl::Span::default();
    let mut module = ir::Module::default();

    let ty_array = make_runtime_array(&mut module);

    let mut fun = Function {
        name: Some("f".into()),
        ..Default::default()
    };

    make_zero_value_local_variable(&mut fun, ty_array);

    module.functions.append(fun, span);

    let err = valid::Validator::new(Default::default(), valid::Capabilities::all())
        .validate(&module)
        .expect_err("module should be invalid")
        .into_inner();

    assert!(matches!(
        err,
        valid::ValidationError::Function {
            source: valid::FunctionError::LocalVariable {
                name: local_var_name,
                source: valid::LocalVariableError::InvalidType(_),
                ..
            },
            ..
        } if local_var_name == "x"
    ));
}

#[test]
fn zero_value_override_array() {
    // Similar to a test in wgsl_errors::invalid_zero_value_constructors.
    // ```
    // override len: u32;
    // fn main() {
    //     var x = array<u32, len>();
    // }
    // ```
    let span = rglsl::Span::default();
    let mut module = ir::Module::default();

    let ty_array = make_override_array(&mut module);

    let mut fun = Function {
        name: Some("f".into()),
        ..Default::default()
    };

    make_zero_value_local_variable(&mut fun, ty_array);

    module.functions.append(fun, span);

    valid::Validator::new(Default::default(), valid::Capabilities::all())
        .validate(&module)
        .expect("SPIR-V accepts arrays sized by specialization constants here");
}

#[test]
fn invalid_zero_value_texture() {
    // Similar to a test in wgsl_errors::invalid_zero_value_constructors.
    // ```
    // fn main() {
    //     var x = texture_2d<f32>();
    // }
    // ```
    use rglsl::{ImageClass, ImageDimension, Module, Type, TypeInner};

    let span = rglsl::Span::default();
    let mut module = Module::default();

    let ty_texture = module.types.insert(
        Type {
            name: Some("texture_2d<f32>".into()),
            inner: TypeInner::Image {
                dim: ImageDimension::D2,
                arrayed: false,
                class: ImageClass::Sampled {
                    kind: rglsl::ScalarKind::Float,
                    multi: false,
                },
            },
        },
        span,
    );

    let mut fun = Function {
        name: Some("f".into()),
        ..Default::default()
    };

    make_zero_value_local_variable(&mut fun, ty_texture);

    module.functions.append(fun, span);

    let err = valid::Validator::new(Default::default(), valid::Capabilities::all())
        .validate(&module)
        .expect_err("module should be invalid")
        .into_inner();

    assert!(matches!(
        err,
        valid::ValidationError::Function {
            source: valid::FunctionError::LocalVariable {
                name: local_var_name,
                source: valid::LocalVariableError::InvalidType(_),
                ..
            },
            ..
        } if local_var_name == "x"
    ));
}

/// Test for non-zero-value runtime-sized array constructor.
#[test]
fn invalid_constructor_runtime_array() {
    // Similar to a test in wgsl_errors::invalid_zero_value_constructors.
    // ```
    // fn main() {
    //     var x = array<u32>(0, 1, 2);
    // }
    // ```
    let span = rglsl::Span::default();
    let mut module = ir::Module::default();

    let ty_array = make_runtime_array(&mut module);

    let mut fun = Function {
        name: Some("f".into()),
        ..Default::default()
    };

    // Create component expressions
    let ex_0 = fun
        .expressions
        .append(Expression::Literal(rglsl::Literal::U32(0)), span);
    let ex_1 = fun
        .expressions
        .append(Expression::Literal(rglsl::Literal::U32(1)), span);
    let ex_2 = fun
        .expressions
        .append(Expression::Literal(rglsl::Literal::U32(2)), span);

    // Create a Compose expression to construct the array
    let ex_compose = fun.expressions.append(
        Expression::Compose {
            ty: ty_array,
            components: vec![ex_0, ex_1, ex_2],
        },
        span,
    );

    fun.local_variables.append(
        rglsl::LocalVariable {
            name: Some("x".into()),
            ty: ty_array,
            init: Some(ex_compose),
        },
        span,
    );

    module.functions.append(fun, span);

    let err = valid::Validator::new(Default::default(), valid::Capabilities::all())
        .validate(&module)
        .expect_err("module should be invalid")
        .into_inner();

    assert!(matches!(
        err,
        valid::ValidationError::Function {
            source: valid::FunctionError::LocalVariable {
                name: local_var_name,
                source: valid::LocalVariableError::InvalidType(_),
                ..
            },
            ..
        } if local_var_name == "x"
    ));
}

#[test]
fn invalid_constructor_unsized_struct() {
    // Similar to a test in wgsl_errors::invalid_zero_value_constructors:
    // ```
    // struct Unsized { data: array<f32> }
    // fn main() {
    //     var x: Unsized = Unsized();
    // }
    // ```
    use rglsl::{Module, StructMember, Type, TypeInner};

    let span = rglsl::Span::default();
    let mut module = Module::default();

    let ty_array = make_runtime_array(&mut module);

    let ty_unsized = module.types.insert(
        Type {
            name: Some("Unsized".into()),
            inner: TypeInner::Struct {
                members: vec![StructMember {
                    name: Some("data".into()),
                    ty: ty_array,
                    binding: None,
                    offset: 0,
                    matrix_layout: None,
                    xfb_offset: None,
                    heap: None,
                }],
                span: 4,
            },
        },
        span,
    );

    let mut fun = Function {
        name: Some("main".into()),
        ..Default::default()
    };

    make_zero_value_local_variable(&mut fun, ty_unsized);

    module.functions.append(fun, span);

    let err = valid::Validator::new(Default::default(), valid::Capabilities::all())
        .validate(&module)
        .expect_err("module should be invalid")
        .into_inner();

    assert!(matches!(
        err,
        valid::ValidationError::Function {
            source: valid::FunctionError::LocalVariable {
                source: valid::LocalVariableError::InvalidType(_),
                ..
            },
            ..
        },
    ));
}

#[test]
fn arity_check() {
    use ir::MathFunction as Mf;
    use rglsl::Span;
    let _ = env_logger::builder().is_test(true).try_init();

    type Result = core::result::Result<ModuleInfo, rglsl::valid::ValidationError>;

    fn validate(fun: ir::MathFunction, args: &[usize]) -> Result {
        let nowhere = Span::default();
        let mut module = ir::Module::default();
        let ty_f32 = module.types.insert(
            ir::Type {
                name: Some("f32".to_string()),
                inner: ir::TypeInner::Scalar(ir::Scalar::F32),
            },
            nowhere,
        );
        let mut f = ir::Function {
            result: Some(ir::FunctionResult {
                ty: ty_f32,
                binding: None,
            }),
            ..ir::Function::default()
        };
        let ex_zero = f
            .expressions
            .append(ir::Expression::ZeroValue(ty_f32), nowhere);
        let ex_pow = f.expressions.append(
            dbg!(ir::Expression::Math {
                fun,
                arg: ex_zero,
                arg1: args.contains(&1).then_some(ex_zero),
                arg2: args.contains(&2).then_some(ex_zero),
                arg3: args.contains(&3).then_some(ex_zero),
            }),
            nowhere,
        );
        f.body = ir::Block::from_vec(vec![
            ir::Statement::Emit(rglsl::Range::new_from_bounds(ex_pow, ex_pow)),
            ir::Statement::Return {
                value: Some(ex_pow),
            },
        ]);
        module.functions.append(f, nowhere);
        valid::Validator::new(Default::default(), valid::Capabilities::all())
            .validate(&module)
            .map_err(|err| err.into_inner()) // discard spans
    }

    assert!(validate(Mf::Sin, &[]).is_ok());
    assert!(validate(Mf::Sin, &[1]).is_err());
    assert!(validate(Mf::Sin, &[3]).is_err());
    assert!(validate(Mf::Pow, &[1]).is_ok());
    assert!(validate(Mf::Pow, &[3]).is_err());
}

#[test]
fn unexpected_task_payload() {
    let mut test_spans = TestSpanGenerator::default();
    let mut module = Module::default();

    let ty_payload = module.types.insert(
        ir::Type {
            name: Some("u32".into()),
            inner: ir::TypeInner::Scalar(rglsl::Scalar::U32),
        },
        test_spans.next(),
    );

    let err_span = test_spans.next();
    let payload_handle = module.global_variables.append(
        ir::GlobalVariable {
            name: Some("task_payload".into()),
            space: ir::AddressSpace::TaskPayload,
            binding: None,
            ty: ty_payload,
            init: None,
            memory_decorations: ir::MemoryDecorations::empty(),
            io: None,
            xfb: None,
            input_attachment_index: None,
            heap_offset: None,
        },
        err_span,
    );

    let entry_point = ir::EntryPoint {
        name: "main".into(),
        stage: ir::ShaderStage::Compute,
        early_depth_test: None,
        workgroup_size: [1, 1, 1],
        workgroup_size_overrides: None,
        function: ir::Function::default(),
        mesh_info: None,
        task_payload: Some(payload_handle), // invalid for compute stage
        incoming_ray_payload: None,
        interface: Vec::new(),
        transform_feedback: false,
        opacity_micromap: None,
    };
    module.entry_points.push(entry_point);

    let err = expect_validation_error_with_span(
        &module,
        ValidationFlags::default(),
        Capabilities::MESH_SHADER,
        err_span,
    );

    assert!(matches!(
        err,
        valid::ValidationError::EntryPoint {
            source: valid::EntryPointError::UnexpectedTaskPayload,
            ..
        }
    ));
}
