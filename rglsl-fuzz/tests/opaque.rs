mod support;

use std::collections::BTreeSet;
use std::sync::Arc;

use rglsl_fuzz::ast::{BasicType, Expression, ExternalDeclaration, ScalarType, StatementKind};
use rglsl_fuzz::basic::{self, BOOL};
use rglsl_fuzz::build::Builder;
use rglsl_fuzz::fuzzer::{Fuzzer, GenerationParams, Templates};
use rglsl_fuzz::opaque::{Identity, OpaqueGenerator};
use rglsl_fuzz::scope::Variable;
use rglsl_fuzz::{analyze_shader, parse_shader, Random};
use rglsl_sema::{Builtins, ResourceLimits, Stage};

use support::eval::{Evaluator, Value};

struct Setup {
    builtins: Arc<Builtins>,
    templates: Templates,
    hidden: BTreeSet<String>,
}

impl Setup {
    fn new() -> Self {
        let builtins = Arc::new(Builtins::new(
            450,
            Stage::Fragment,
            &ResourceLimits::default(),
        ));
        let hidden = BTreeSet::new();
        let templates = Templates::new(&builtins, &hidden);
        Self {
            builtins,
            templates,
            hidden,
        }
    }

    fn generate(
        &self,
        seed: u64,
        scope: &[Variable],
        constant: bool,
        make: impl FnOnce(&mut OpaqueGenerator<'_>) -> Expression,
    ) -> Expression {
        let mut random = Random::new(seed);
        let mut builder = Builder::new(rglsl_fuzz::ast::NodeId::new(1_000_000));
        let mut generator = OpaqueGenerator {
            random: &mut random,
            builder: &mut builder,
            fuzzer: Fuzzer::new(&self.templates, scope, GenerationParams::normal(true)),
            builtins: &self.builtins,
            hidden: &self.hidden,
            injection_switch: !constant,
            frag_coord: !constant,
        };
        make(&mut generator)
    }
}

fn numeric_types() -> Vec<BasicType> {
    let mut types = Vec::new();
    for scalar in [ScalarType::Float, ScalarType::Int, ScalarType::Uint] {
        types.extend(basic::all_vectors_of(scalar));
    }
    types.extend(basic::all_matrix_types());
    types
}

fn sample_value(ty: BasicType) -> Value {
    let count = basic::num_elements(ty) as usize;
    let data = (0..count)
        .map(|index| match basic::element(ty) {
            ScalarType::Float | ScalarType::Double => 0.25 * (index as f64 + 1.0) - 0.5,
            ScalarType::Int => index as f64 * 3.0 - 2.0,
            ScalarType::Uint => index as f64 * 5.0 + 1.0,
            ScalarType::Bool => (index % 2) as f64,
            other => panic!("the fuzzer does not generate {other:?}"),
        })
        .collect();
    Value::new(ty, data)
}

fn literal_text(value: &Value, ty: BasicType) -> String {
    let parts: Vec<String> = value
        .data
        .iter()
        .map(|x| match value.scalar {
            ScalarType::Float | ScalarType::Double => format!("{x:?}"),
            ScalarType::Int => format!("{}", *x as i64),
            ScalarType::Uint => format!("{}u", *x as u64),
            ScalarType::Bool => String::from(if *x != 0.0 { "true" } else { "false" }),
            other => panic!("the fuzzer does not generate {other:?}"),
        })
        .collect();
    format!("{ty}({})", parts.join(", "))
}

struct Checked {
    ty: BasicType,
    constant: bool,
}

fn check_in_shader(
    expression: &Expression,
    variable: Option<(BasicType, &Value)>,
    global_constant: bool,
) -> Checked {
    let declaration = variable
        .map(|(ty, value)| format!("    {ty} v = {};\n", literal_text(value, ty)))
        .unwrap_or_default();
    let source = if global_constant {
        format!(
            "#version 450\nlayout(location = 0) out vec4 _GLF_color;\nconst bool probe = true;\nvoid main() {{\n    {expression};\n}}\n"
        )
    } else {
        format!(
            "#version 450\nlayout(set = 0, binding = 0) uniform buf0 {{ vec2 injectionSwitch; }};\nlayout(location = 0) out vec4 _GLF_color;\nvoid main() {{\n{declaration}    {expression};\n}}\n"
        )
    };
    let unit = parse_shader(&source).unwrap_or_else(|error| panic!("{error}\n{source}"));
    let analysis = analyze_shader(&unit, Stage::Fragment, false, None);
    assert!(
        analysis.diagnostics.is_empty(),
        "{:?}\n{source}",
        analysis.diagnostics
    );
    let main = unit
        .external_declarations
        .iter()
        .find_map(|external| match external {
            ExternalDeclaration::FunctionDefinition(definition) => Some(definition),
            _ => None,
        })
        .expect("main");
    let last = main.body.statements.last().expect("a statement");
    let StatementKind::Expression(Some(probe)) = &last.kind else {
        panic!("not an expression statement");
    };
    let info = analysis.expression(probe.id).expect("a typed expression");
    Checked {
        ty: basic::from_sema(&info.ty).expect("a basic type"),
        constant: info.is_constant,
    }
}

fn evaluate(expression: &Expression, variable: Option<&Value>) -> (Value, usize) {
    let mut evaluator = Evaluator::with_injection_switch();
    if let Some(value) = variable {
        evaluator.variables.insert(String::from("v"), value.clone());
    }
    let value = evaluator.eval(expression);
    (value, evaluator.checked_identities)
}

#[test]
fn random_numbers_are_fixed_for_a_seed() {
    let mut random = Random::new(42);
    let first: Vec<u64> = (0..4).map(|_| random.next_u64()).collect();
    let mut again = Random::new(42);
    let second: Vec<u64> = (0..4).map(|_| again.next_u64()).collect();
    assert_eq!(first, second);
    assert_eq!(
        first,
        [
            1_546_998_764_402_558_742,
            6_990_951_692_964_543_102,
            12_544_586_762_248_559_009,
            17_057_574_109_182_124_193
        ]
    );
    let mut bounded = Random::new(7);
    let draws: Vec<u32> = (0..8).map(|_| bounded.next_int(10)).collect();
    assert_eq!(draws, [7, 2, 8, 9, 9, 8, 0, 1]);
    assert!((0..1000).all(|_| bounded.next_int(3) < 3));
    assert!((0..1000).all(|_| (0.0..1.0).contains(&bounded.next_float())));
    let mut parent = Random::new(9);
    let mut child = parent.spawn_child();
    let mut parent_again = Random::new(9);
    let mut child_again = parent_again.spawn_child();
    assert_eq!(child.next_u64(), child_again.next_u64());
    assert_eq!(Random::new(0).next_int(1), 0);
}

#[test]
fn opaque_zeros_and_ones_have_the_requested_type_and_value() {
    let setup = Setup::new();
    let mut identities = 0;
    for ty in numeric_types() {
        for seed in 0..12 {
            for zero in [true, false] {
                if !zero && basic::is_matrix(ty) && !basic::is_square_matrix(ty) {
                    continue;
                }
                let expression = setup.generate(seed, &[], false, |generator| {
                    generator.make_opaque_zero_or_one(zero, ty, false, 0)
                });
                let checked = check_in_shader(&expression, None, false);
                assert_eq!(checked.ty, ty, "{expression}");
                let (value, checked_identities) = evaluate(&expression, None);
                identities += checked_identities;
                let expected = if zero { 0.0 } else { 1.0 };
                assert!(
                    value.data.iter().all(|x| (x - expected).abs() < 1e-4),
                    "{ty} {zero}: {value:?} from {expression}"
                );
            }
        }
    }
    assert!(identities > 100, "{identities}");
}

#[test]
fn opaque_identity_matrices_are_identities() {
    let setup = Setup::new();
    for ty in basic::all_square_matrix_types() {
        for seed in 0..12 {
            let expression = setup.generate(seed, &[], false, |generator| {
                generator.make_opaque_identity_matrix(ty, false, 0)
            });
            assert_eq!(check_in_shader(&expression, None, false).ty, ty);
            let (value, _) = evaluate(&expression, None);
            let size = basic::columns(ty) as usize;
            for column in 0..size {
                for row in 0..size {
                    let expected = if column == row { 1.0 } else { 0.0 };
                    assert!((value.data[column * size + row] - expected).abs() < 1e-4);
                }
            }
        }
    }
}

#[test]
fn opaque_booleans_have_the_requested_type_and_value() {
    let setup = Setup::new();
    for ty in basic::all_vectors_of(ScalarType::Bool) {
        for seed in 0..16 {
            for value in [true, false] {
                let expression = setup.generate(seed, &[], false, |generator| {
                    generator.make_opaque_boolean(value, ty, false, 0)
                });
                assert_eq!(check_in_shader(&expression, None, false).ty, ty);
                let (result, _) = evaluate(&expression, None);
                let expected = f64::from(u8::from(value));
                assert!(result.data.iter().all(|x| *x == expected), "{expression}");
            }
        }
    }
}

#[test]
fn opaque_values_in_constant_contexts_are_constant() {
    let setup = Setup::new();
    for ty in [basic::FLOAT, basic::INT, basic::UINT, basic::VEC2, BOOL] {
        for seed in 0..12 {
            let expression = setup.generate(seed, &[], true, |generator| {
                if ty == BOOL {
                    generator.make_opaque_boolean(true, ty, true, 0)
                } else {
                    generator.make_opaque_one(ty, true, 0)
                }
            });
            let text = expression.to_string();
            assert!(!text.contains("injectionSwitch"), "{text}");
            assert!(!text.contains("gl_FragCoord"), "{text}");
            let checked = check_in_shader(&expression, None, true);
            assert_eq!(checked.ty, ty);
            assert!(checked.constant, "{text}");
            let (value, _) = evaluate(&expression, None);
            assert!(value.data.iter().all(|x| (x - 1.0).abs() < 1e-4), "{text}");
        }
    }
}

#[test]
fn every_identity_preserves_type_and_value() {
    let setup = Setup::new();
    let mut applied = BTreeSet::new();
    let mut all_types = basic::all_basic_types();
    all_types.sort();
    for identity in Identity::ALL {
        for ty in &all_types {
            if !identity.accepts(*ty) {
                continue;
            }
            let value = sample_value(*ty);
            let scope = [Variable {
                name: String::from("v"),
                ty: Some(*ty),
                constant: false,
                parameter: false,
            }];
            for seed in 0..6 {
                let expression = setup.generate(seed, &scope, false, |generator| {
                    let variable = generator.builder.variable("v");
                    generator.apply(identity, variable, *ty, false, 1)
                });
                let checked = check_in_shader(&expression, Some((*ty, &value)), false);
                assert_eq!(checked.ty, *ty, "{identity:?}: {expression}");
                let (result, _) = evaluate(&expression, Some(&value));
                assert!(
                    result.approx_eq(&value),
                    "{identity:?} on {ty}: {result:?} from {expression}"
                );
                applied.insert(identity);
            }
        }
    }
    assert_eq!(applied.len(), Identity::ALL.len());
}
