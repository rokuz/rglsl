mod common;

use common::{Stage, TestResult, decorations, program_with};
use rglsl::{ArraySize, Expression, Module, ShaderStage, Statement, TypeInner};
use rglsl_opt::{Context, OptError, OptLevel, OptOptions, Specialization};

fn specialized(
    stage: ShaderStage,
    source: &str,
    level: OptLevel,
    values: &[(u32, &str)],
) -> Result<Stage, Box<dyn std::error::Error>> {
    let options = OptOptions {
        level,
        validate_each: true,
        specialization: values
            .iter()
            .map(|&(id, value)| Specialization::new(id, value))
            .collect(),
        ..OptOptions::default()
    };
    program_with(&[(stage, source)], &options, Context::default())?
        .into_iter()
        .next()
        .ok_or_else(|| "no stage".into())
}

fn spec_ids(module: &Module) -> Vec<u32> {
    let mut ids: Vec<u32> = module
        .overrides
        .iter()
        .filter_map(|(_, item)| item.id)
        .collect();
    ids.sort_unstable();
    ids
}

fn ifs(module: &Module) -> TestResult<usize> {
    Ok(module
        .entry_points
        .first()
        .ok_or("no entry point")?
        .function
        .body
        .walk()
        .filter(|statement| matches!(**statement, Statement::If { .. }))
        .count())
}

fn opcodes(words: &[u32], op: spirv::Op) -> usize {
    let mut count = 0;
    let mut at = 5;
    while let Some(&first) = words.get(at) {
        let length = (first >> 16) as usize;
        if length == 0 {
            break;
        }
        if first & 0xffff == op as u32 {
            count += 1;
        }
        at += length;
    }
    count
}

const FRAGMENT: &str = "#version 450
layout(constant_id = 1) const bool ON = true;
layout(constant_id = 2) const int MODE = 3;
layout(constant_id = 3) const float SCALE = 1.5;
const int DERIVED = MODE * 4 + 1;
layout(location = 0) out vec4 color;
void main() {
    color = vec4(SCALE, float(DERIVED), 0.0, 1.0);
    if (ON) color.z = 2.0;
    if (MODE > 5) color.w = 0.5;
}
";

#[test]
fn without_values_overrides_stay_and_never_prune() -> TestResult {
    let stage = specialized(ShaderStage::Fragment, FRAGMENT, OptLevel::Performance, &[])?;
    assert_eq!(spec_ids(&stage.module), [1, 2, 3]);
    assert_eq!(ifs(&stage.module)?, 2);
    assert_eq!(opcodes(&stage.words, spirv::Op::SpecConstantOp), 3);
    Ok(())
}

#[test]
fn values_become_constants_and_fold() -> TestResult {
    let stage = specialized(
        ShaderStage::Fragment,
        FRAGMENT,
        OptLevel::Performance,
        &[(1, "false"), (2, "7"), (3, "0.25")],
    )?;
    assert!(spec_ids(&stage.module).is_empty());
    assert_eq!(ifs(&stage.module)?, 0);
    assert_eq!(opcodes(&stage.words, spirv::Op::SpecConstant), 0);
    assert_eq!(opcodes(&stage.words, spirv::Op::SpecConstantOp), 0);
    assert_eq!(opcodes(&stage.words, spirv::Op::SpecConstantFalse), 0);
    Ok(())
}

#[test]
fn only_the_given_constants_are_specialized() -> TestResult {
    let stage = specialized(
        ShaderStage::Fragment,
        FRAGMENT,
        OptLevel::Performance,
        &[(1, "true")],
    )?;
    assert_eq!(spec_ids(&stage.module), [2, 3]);
    assert_eq!(ifs(&stage.module)?, 1);
    assert_eq!(opcodes(&stage.words, spirv::Op::SpecConstantOp), 3);
    Ok(())
}

#[test]
fn specialization_works_without_optimization() -> TestResult {
    let stage = specialized(
        ShaderStage::Fragment,
        FRAGMENT,
        OptLevel::Disabled,
        &[(2, "-4")],
    )?;
    assert_eq!(spec_ids(&stage.module), [1, 3]);
    assert_eq!(decorations(&stage.words, spirv::Decoration::SpecId), 2);
    assert_eq!(ifs(&stage.module)?, 2);
    Ok(())
}

#[test]
fn local_size_ids_become_the_local_size() -> TestResult {
    let source = "#version 450
layout(local_size_x_id = 4, local_size_y_id = 5) in;
layout(std430, binding = 0) buffer Out { uvec3 size; };
void main() {
    size = gl_WorkGroupSize;
}
";
    let stage = specialized(
        ShaderStage::Compute,
        source,
        OptLevel::Performance,
        &[(4, "8"), (5, "2")],
    )?;
    let entry = stage.module.entry_points.first().ok_or("no entry point")?;
    assert_eq!(entry.workgroup_size, [8, 2, 1]);
    assert!(entry.workgroup_size_overrides.is_none());
    assert_eq!(opcodes(&stage.words, spirv::Op::SpecConstant), 0);
    Ok(())
}

#[test]
fn one_local_size_id_of_two_keeps_the_other_specializable() -> TestResult {
    let source = "#version 450
layout(local_size_x_id = 4, local_size_y_id = 5) in;
layout(std430, binding = 0) buffer Out { uvec3 size; };
void main() {
    size = gl_WorkGroupSize;
}
";
    let stage = specialized(
        ShaderStage::Compute,
        source,
        OptLevel::Performance,
        &[(4, "16")],
    )?;
    let entry = stage.module.entry_points.first().ok_or("no entry point")?;
    assert_eq!(entry.workgroup_size.first(), Some(&16));
    assert!(entry.workgroup_size_overrides.is_some());
    assert_eq!(spec_ids(&stage.module), [5]);
    Ok(())
}

#[test]
fn an_array_sized_by_a_constant_gets_its_value() -> TestResult {
    let source = "#version 450
layout(constant_id = 0) const int COUNT = 2;
layout(location = 0) out vec4 color;
float values[COUNT];
void main() {
    for (int i = 0; i < COUNT; ++i) values[i] = float(i);
    color = vec4(values[COUNT - 1]);
}
";
    let stage = specialized(
        ShaderStage::Fragment,
        source,
        OptLevel::Disabled,
        &[(0, "5")],
    )?;
    assert!(spec_ids(&stage.module).is_empty());
    let pending = stage.module.types.iter().any(|(_, ty)| {
        matches!(
            ty.inner,
            TypeInner::Array {
                size: ArraySize::Pending(_),
                ..
            }
        )
    });
    assert!(pending);
    assert_eq!(opcodes(&stage.words, spirv::Op::SpecConstant), 0);
    let literal_five = stage
        .module
        .global_expressions
        .iter()
        .any(|(_, expression)| matches!(*expression, Expression::Literal(rglsl::Literal::I32(5))));
    assert!(literal_five);
    Ok(())
}

fn error(values: &[(u32, &str)]) -> TestResult<String> {
    match specialized(
        ShaderStage::Fragment,
        FRAGMENT,
        OptLevel::Performance,
        values,
    ) {
        Ok(_) => Err("specialization succeeded".into()),
        Err(error) => match error.downcast::<OptError>() {
            Ok(error) => Ok(error.to_string()),
            Err(other) => Err(other),
        },
    }
}

#[test]
fn an_unknown_id_is_an_error() -> TestResult {
    assert_eq!(
        error(&[(9, "1")])?,
        "specialization constant 9 is not declared in the program"
    );
    Ok(())
}

#[test]
fn a_value_for_a_program_without_constants_is_an_error() -> TestResult {
    let source = "#version 450
layout(location = 0) out vec4 color;
void main() {
    color = vec4(1.0);
}
";
    let Err(error) = specialized(ShaderStage::Fragment, source, OptLevel::Performance, &[(0, "1")])
    else {
        return Err("specialization succeeded".into());
    };
    assert_eq!(
        error.to_string(),
        "specialization constant 0 is not declared in the program"
    );
    Ok(())
}

#[test]
fn a_value_of_the_wrong_type_is_an_error() -> TestResult {
    assert_eq!(
        error(&[(2, "1.5")])?,
        "specialization constant 2 is a signed 32-bit integer, `1.5` is not such a value"
    );
    assert_eq!(
        error(&[(1, "1")])?,
        "specialization constant 1 is a bool, `1` is not such a value"
    );
    assert_eq!(
        error(&[(2, "4294967296")])?,
        "specialization constant 2 is a signed 32-bit integer, `4294967296` is not such a value"
    );
    Ok(())
}

#[test]
fn two_values_for_one_id_are_an_error() -> TestResult {
    assert_eq!(
        error(&[(2, "1"), (2, "2")])?,
        "specialization constant 2 has more than one value"
    );
    Ok(())
}

#[test]
fn pairs_parse_like_spirv_opt() -> TestResult {
    assert_eq!(
        Specialization::parse_list("1:100 2:-4,3:0x10  4:true")?,
        [
            Specialization::new(1, "100"),
            Specialization::new(2, "-4"),
            Specialization::new(3, "0x10"),
            Specialization::new(4, "true"),
        ]
    );
    assert!(Specialization::parse_list("1=100").is_err());
    assert!(Specialization::parse_list("x:1").is_err());
    assert!(Specialization::parse_list("1:").is_err());
    Ok(())
}
