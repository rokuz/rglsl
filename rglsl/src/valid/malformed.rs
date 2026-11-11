use alloc::vec::Vec;

use super::{Capabilities, ValidationFlags, Validator};
use crate::{
    Block, Expression, Function, FunctionResult, Handle, Module, Scalar, Span, Statement, Type,
    TypeInner,
};

fn handle<T>(index: u32) -> crate::TestResult<Handle<T>> {
    Ok(Handle::new(
        crate::non_max_u32::NonMaxU32::new(index).ok_or("the index is u32::MAX")?,
    ))
}

fn assert_rejected(module: &Module) {
    for capabilities in [Capabilities::default(), Capabilities::all()] {
        let mut validator = Validator::new(ValidationFlags::all(), capabilities);
        assert!(validator.validate(module).is_err());
    }
}

fn scalar_type(module: &mut Module, scalar: Scalar) -> Handle<Type> {
    module.types.insert(
        Type {
            name: None,
            inner: TypeInner::Scalar(scalar),
        },
        Span::default(),
    )
}

fn emit_all(function: &mut Function) {
    let range = function.expressions.range_from(0);
    function.body.push(Statement::Emit(range), Span::default());
}

#[test]
fn function_argument_index_is_checked_before_analysis() -> crate::TestResult {
    let mut module = Module::default();
    let mut function = Function::default();
    function
        .expressions
        .append(Expression::FunctionArgument(1), Span::default());
    emit_all(&mut function);
    module.functions.append(function, Span::default());
    assert_rejected(&module);
    Ok(())
}

#[test]
fn result_expression_types_are_handle_checked() -> crate::TestResult {
    let missing = handle::<Type>(141)?;
    for expression in [
        Expression::WorkGroupUniformLoadResult { ty: missing },
        Expression::AtomicResult {
            ty: missing,
            comparison: false,
        },
        Expression::SubgroupOperationResult { ty: missing },
        Expression::SpirvInstructionResult { ty: missing },
    ] {
        let mut module = Module::default();
        scalar_type(&mut module, Scalar::U32);
        let mut function = Function::default();
        function.expressions.append(expression, Span::default());
        module.functions.append(function, Span::default());
        assert_rejected(&module);
    }
    Ok(())
}

#[test]
fn calls_must_name_earlier_functions() -> crate::TestResult {
    let mut module = Module::default();
    let ty = scalar_type(&mut module, Scalar::U32);
    let later = handle::<Function>(1)?;

    let mut caller = Function {
        result: Some(FunctionResult {
            ty,
            binding: None,
            relaxed_precision: false,
        }),
        ..Function::default()
    };
    let result = caller
        .expressions
        .append(Expression::CallResult(later), Span::default());
    caller.body = Block::from_vec(Vec::from([
        Statement::Call {
            function: later,
            arguments: Vec::new(),
            result: Some(result),
        },
        Statement::Return {
            value: Some(result),
        },
    ]));
    module.functions.append(caller, Span::default());

    let callee = Function {
        body: Block::from_vec(Vec::from([Statement::Call {
            function: later,
            arguments: Vec::new(),
            result: None,
        }])),
        ..Function::default()
    };
    module.functions.append(callee, Span::default());
    assert_rejected(&module);

    module.functions = crate::Arena::new();
    let caller = Function {
        body: Block::from_vec(Vec::from([Statement::Call {
            function: handle::<Function>(0)?,
            arguments: Vec::new(),
            result: None,
        }])),
        ..Function::default()
    };
    module.functions.append(caller, Span::default());
    assert_rejected(&module);
    Ok(())
}
