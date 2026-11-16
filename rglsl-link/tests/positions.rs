use rglsl::object::ObjectModule;
use rglsl::{BinaryOperator, Expression, ShaderStage};
use rglsl_link::{
    CompileOptions, LinkError, Options as LinkOptions, SourcePosition, compile, decode, encode,
    link, read_object, validate_object, write_object,
};

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const MAIN: &str = "#version 460
#extension GL_GOOGLE_include_directive : require
#include \"lib.glsl\"
#define TWICE(v) ((v) + (v) + 0.0)
layout(local_size_x = 1) in;
layout(std430, binding = 0) buffer Data { float values[]; };
const float K = TWICE(1.0); float local_fn(float x) { return x * K; }
void main() { values[0] = shared_fn(values[1]) + local_fn(values[2]); }
";

const LIB: &str = "
float shared_fn(float x)
{
    return x - 1.0;
}
";

fn compiled() -> TestResult<ObjectModule> {
    let options = CompileOptions::new("main.comp", ShaderStage::Compute).include("lib.glsl", LIB);
    compile(MAIN, &options).map_err(|errors| format!("{errors}").into())
}

fn break_function(object: &mut ObjectModule, name: &str, op: BinaryOperator) -> TestResult {
    let function = object
        .unit
        .module
        .functions
        .iter_mut()
        .map(|(_, function)| function)
        .find(|function| function.name.as_deref() == Some(name))
        .ok_or_else(|| format!("no function {name}"))?;
    let binary = function
        .expressions
        .iter_mut()
        .find_map(|(_, expression)| match *expression {
            Expression::Binary {
                op: ref mut found, ..
            } if *found == op => Some(found),
            _ => None,
        })
        .ok_or_else(|| format!("no {op:?} in {name}"))?;
    *binary = BinaryOperator::LogicalAnd;
    Ok(())
}

fn position(error: &LinkError) -> TestResult<SourcePosition> {
    match *error {
        LinkError::Validation {
            at: Some(ref at), ..
        } => Ok(at.clone()),
        ref other => Err(format!("not a located validation error: {other}").into()),
    }
}

fn expected(file: &str, text: &str, needle: &str) -> TestResult<SourcePosition> {
    let (index, line) = text
        .lines()
        .enumerate()
        .find(|(_, line)| line.contains(needle))
        .ok_or_else(|| format!("no {needle:?}"))?;
    let column = line.find(needle).ok_or("no column")?;
    Ok(SourcePosition {
        file: Some(String::from(file)),
        line: u32::try_from(index + 1)?,
        column: u32::try_from(column + 1)?,
    })
}

fn round_trip(object: &ObjectModule) -> TestResult<ObjectModule> {
    let bytes = write_object(object).map_err(|errors| format!("{errors}"))?;
    read_object(&bytes).map_err(|errors| format!("{errors}").into())
}

fn link_error(object: ObjectModule) -> TestResult<LinkError> {
    let Err(errors) = link(&[object], &LinkOptions::default()) else {
        return Err("the broken module linked".into());
    };
    errors
        .iter()
        .next()
        .cloned()
        .ok_or_else(|| "no link error".into())
}

#[test]
fn object_errors_point_into_included_files() -> TestResult {
    let mut object = round_trip(&compiled()?)?;
    break_function(&mut object, "shared_fn", BinaryOperator::Subtract)?;
    let want = expected("./lib.glsl", LIB, "float shared_fn")?;
    let error = validate_object(&object)
        .err()
        .and_then(|errors| errors.iter().next().cloned())
        .ok_or("the broken object is valid")?;
    assert_eq!(position(&error)?, want);
    assert!(
        error
            .to_string()
            .contains("(`./lib.glsl`, line 2, column 1)"),
        "{error}"
    );
    assert_eq!(position(&link_error(object)?)?, want);
    Ok(())
}

#[test]
fn link_errors_after_a_macro_keep_original_columns() -> TestResult {
    let want = expected("main.comp", MAIN, "float local_fn")?;
    let mut object = compiled()?;
    let mut read = round_trip(&object)?;
    break_function(&mut object, "local_fn", BinaryOperator::Multiply)?;
    break_function(&mut read, "local_fn", BinaryOperator::Multiply)?;
    assert_eq!(position(&link_error(read)?)?, want);
    assert_eq!(position(&link_error(object)?)?, want);
    Ok(())
}

#[test]
fn decoding_reports_the_original_position() -> TestResult {
    let mut object = compiled()?;
    break_function(&mut object, "shared_fn", BinaryOperator::Subtract)?;
    let Err(error) = decode(&encode(&object)?) else {
        return Err("the broken object decoded".into());
    };
    let error = error.to_string();
    assert!(
        error.contains("(`./lib.glsl`, line 2, column 1)"),
        "{error}"
    );
    Ok(())
}

#[test]
fn linking_two_objects_keeps_each_source() -> TestResult {
    let mut library = compile(
        "#version 460\n#define ONE 1.0\nfloat helper(float x) { return x + ONE; }\n",
        &CompileOptions::library("helper.glsl"),
    )
    .map_err(|errors| format!("{errors}"))
    .and_then(|library| round_trip(&library).map_err(|error| error.to_string()))?;
    break_function(&mut library, "helper", BinaryOperator::Add)?;
    let main_source = "#version 460\nfloat helper(float x);\nlayout(local_size_x = 1) in;\nlayout(std430, binding = 0) buffer Data { float values[]; };\nvoid main() { values[0] = helper(values[1]); }\n";
    let caller = compile(
        main_source,
        &CompileOptions::new("caller.comp", ShaderStage::Compute),
    )
    .map_err(|errors| format!("{errors}"))?;
    let Err(errors) = link(&[caller, library], &LinkOptions::default()) else {
        return Err("the broken program linked".into());
    };
    let error = errors.iter().next().ok_or("no link error")?;
    assert_eq!(
        position(error)?,
        SourcePosition {
            file: Some(String::from("helper.glsl")),
            line: 3,
            column: 1,
        }
    );
    Ok(())
}
