#![allow(clippy::panic)]

use rglsl::front::glsl::{Frontend, Options};
use rglsl::object::ObjectModule;
use rglsl::ShaderStage;

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

fn object(stage: ShaderStage, library: bool, source: &str) -> TestResult<ObjectModule> {
    let options = Options {
        library,
        ..Options::from(stage)
    };
    Ok(Frontend::default().compile(&options, source)?)
}

fn names(functions: &rglsl::Arena<rglsl::Function>) -> Vec<String> {
    let mut names: Vec<String> = functions
        .iter()
        .filter_map(|(_, function)| function.name.clone())
        .collect();
    names.sort();
    names
}

const UNCALLED: &str = "#version 450
layout(location = 0) out vec4 color;
float helper(float x);
float called(float x) { return helper(x); }
float uncalled(float x) { return x * 3.0; }
void main() { color = vec4(called(1.0)); }
";

const HELPER: &str = "#version 450
float helper(float x) { return x * 2.0; }
float spare(float x) { return x; }
";

#[test]
fn programs_drop_uncalled_functions() -> TestResult {
    let module = Frontend::default().parse(
        &Options::from(ShaderStage::Fragment),
        "#version 450
layout(location = 0) out vec4 color;
float called(float x) { return x; }
float uncalled(float x) { return x * 3.0; }
void main() { color = vec4(called(1.0)); }
",
    )?;
    assert_eq!(names(&module.functions), ["called"]);
    Ok(())
}

#[test]
fn object_modules_keep_every_function_and_linking_prunes() -> TestResult {
    let main = object(ShaderStage::Fragment, false, UNCALLED)?;
    assert_eq!(
        names(&main.module.functions),
        ["called", "helper", "uncalled"]
    );
    let library = object(ShaderStage::Compute, true, HELPER)?;
    assert_eq!(names(&library.module.functions), ["helper", "spare"]);
    let linked = rglsl_link::link(&[main, library], &rglsl_link::Options::default())?;
    assert_eq!(names(&linked.module.functions), ["called", "helper"]);
    Ok(())
}

#[test]
fn functions_of_the_main_module_can_be_called_from_other_modules() -> TestResult {
    let main = object(
        ShaderStage::Fragment,
        false,
        "#version 450
layout(location = 0) out vec4 color;
float helper(float x);
float scale(float x) { return x * 2.0; }
void main() { color = vec4(helper(1.0)); }
",
    )?;
    let library = object(
        ShaderStage::Compute,
        true,
        "#version 450\nfloat scale(float x);\nfloat helper(float x) { return scale(x); }\n",
    )?;
    let linked = rglsl_link::link(&[main, library], &rglsl_link::Options::default())?;
    assert_eq!(names(&linked.module.functions), ["helper", "scale"]);
    Ok(())
}
