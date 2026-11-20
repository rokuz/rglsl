use std::collections::BTreeSet;
use std::sync::atomic::{AtomicUsize, Ordering};

use rglsl::valid::{ModuleInfo, ValidationFlags, Validator};
use rglsl::{Expression, Function, Literal, Module, ShaderStage, Span, Statement};

use super::{Planned, execute, run};
use crate::{
    Changed, Context, OptError, OptLevel, OptOptions, PASSES, PRESETS, PROFILES, Pass, Scope,
    Session, StageModule, Step, TargetGpu,
};

type TestResult = Result<(), Box<dyn std::error::Error>>;

fn everywhere(_: &crate::Summary) -> bool {
    true
}

fn nowhere(_: &crate::Summary) -> bool {
    false
}

fn add_function(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    session
        .module()?
        .functions
        .append(Function::default(), Span::UNDEFINED);
    Ok(Changed::Yes)
}

fn break_ir(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    let mut function = Function::default();
    let value = function
        .expressions
        .append(Expression::Literal(Literal::F32(1.0)), Span::UNDEFINED);
    function
        .body
        .push(Statement::Return { value: Some(value) }, Span::UNDEFINED);
    session
        .module()?
        .functions
        .append(function, Span::UNDEFINED);
    Ok(Changed::Yes)
}

fn keep(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    session.module()?;
    Ok(Changed::No)
}

const fn pass(
    name: &'static str,
    run: fn(&mut Session<'_, '_>) -> Result<Changed, OptError>,
) -> Pass {
    Pass {
        name,
        scope: Scope::Function,
        applies: everywhere,
        run,
        counterpart: &[],
    }
}

static TABLE: &[Pass] = &[
    pass("add", add_function),
    pass("break", break_ir),
    pass("keep", keep),
    Pass {
        applies: nowhere,
        ..pass("never", break_ir)
    },
    Pass {
        scope: Scope::Program,
        ..pass("program", add_function)
    },
];

struct Fixture {
    module: Module,
    info: ModuleInfo,
}

impl Fixture {
    fn new() -> Result<Self, Box<dyn std::error::Error>> {
        let module = Module::default();
        let info = Validator::new(ValidationFlags::all()).validate(&module)?;
        Ok(Self { module, info })
    }

    fn stages(&mut self) -> [StageModule<'_>; 1] {
        [StageModule {
            stage: ShaderStage::Compute,
            module: &mut self.module,
            info: &mut self.info,
        }]
    }
}

fn options(passes: &[&str], validate_each: bool) -> OptOptions {
    OptOptions {
        passes: Some(passes.iter().map(|&name| name.to_owned()).collect()),
        validate_each,
        ..OptOptions::default()
    }
}

#[test]
fn every_preset_step_names_a_pass() -> TestResult {
    for preset in PRESETS {
        for step in preset.steps {
            match *step {
                Step::Run(name) => {
                    super::find(PASSES, name)?;
                }
                Step::Repeat { passes, .. } => {
                    for name in passes {
                        super::find(PASSES, name)?;
                    }
                }
            }
        }
    }
    Ok(())
}

#[test]
fn every_level_has_one_preset() -> TestResult {
    for level in OptLevel::ALL {
        level.preset()?;
        assert_eq!(
            PRESETS
                .iter()
                .filter(|preset| preset.level == level)
                .count(),
            1
        );
    }
    assert_eq!(PRESETS.len(), OptLevel::ALL.len());
    Ok(())
}

#[test]
fn every_target_gpu_has_one_profile() -> TestResult {
    for gpu in TargetGpu::ALL {
        let profile = gpu.profile()?;
        assert_eq!(TargetGpu::from_name(profile.name), Some(gpu));
    }
    let names: BTreeSet<&str> = TargetGpu::names().collect();
    assert_eq!(names.len(), PROFILES.len());
    assert_eq!(PROFILES.len(), TargetGpu::ALL.len());
    Ok(())
}

#[test]
fn pass_names_are_unique() {
    let names: BTreeSet<&str> = PASSES.iter().map(|pass| pass.name).collect();
    assert_eq!(names.len(), PASSES.len());
}

#[test]
fn presets_run_on_an_empty_module() -> TestResult {
    for level in OptLevel::ALL {
        let mut fixture = Fixture::new()?;
        let options = OptOptions {
            level,
            ..OptOptions::default()
        };
        crate::optimize(&mut fixture.stages(), &options, Context::default())?;
        assert!(fixture.module.functions.is_empty());
    }
    Ok(())
}

#[test]
fn an_unknown_pass_is_an_error() -> TestResult {
    let mut fixture = Fixture::new()?;
    let result = run(
        TABLE,
        &mut fixture.stages(),
        &options(&["add", "nothing"], true),
        Context::default(),
    );
    let Err(OptError::UnknownPass { name, known }) = result else {
        return Err(format!("expected an unknown pass, got {result:?}").into());
    };
    assert_eq!(name, "nothing");
    assert!(known.starts_with("add, break"));
    assert!(fixture.module.functions.is_empty());
    Ok(())
}

#[test]
fn a_changed_module_is_compacted_and_validated() -> TestResult {
    let mut fixture = Fixture::new()?;
    run(
        TABLE,
        &mut fixture.stages(),
        &options(&["add", "keep"], true),
        Context::default(),
    )?;
    assert_eq!(fixture.module.functions.len(), 1);
    let (handle, _) = fixture
        .module
        .functions
        .iter()
        .next()
        .ok_or("no function")?;
    let _ = &fixture.info[handle];
    Ok(())
}

#[test]
fn validate_each_names_the_pass_that_broke_the_ir() -> TestResult {
    let mut fixture = Fixture::new()?;
    let result = run(
        TABLE,
        &mut fixture.stages(),
        &options(&["add", "break", "add"], true),
        Context::default(),
    );
    let Err(OptError::InvalidIr { pass, stage, .. }) = result else {
        return Err(format!("expected invalid IR, got {result:?}").into());
    };
    assert_eq!(pass, "break");
    assert_eq!(stage, ShaderStage::Compute);
    assert_eq!(fixture.module.functions.len(), 2);
    Ok(())
}

#[test]
fn without_validate_each_invalid_ir_is_found_at_the_end() -> TestResult {
    let mut fixture = Fixture::new()?;
    let result = run(
        TABLE,
        &mut fixture.stages(),
        &options(&["break", "add"], false),
        Context::default(),
    );
    assert!(
        matches!(result, Err(OptError::Invalid { .. })),
        "{result:?}"
    );
    Ok(())
}

#[test]
fn passes_that_do_not_apply_are_skipped() -> TestResult {
    let mut fixture = Fixture::new()?;
    run(
        TABLE,
        &mut fixture.stages(),
        &options(&["never"], true),
        Context::default(),
    )?;
    assert!(fixture.module.functions.is_empty());
    Ok(())
}

#[test]
fn a_program_pass_has_no_module_of_its_own() -> TestResult {
    let mut fixture = Fixture::new()?;
    let result = run(
        TABLE,
        &mut fixture.stages(),
        &options(&["program"], true),
        Context::default(),
    );
    assert!(
        matches!(
            result,
            Err(OptError::Pass {
                pass: "program",
                ..
            })
        ),
        "{result:?}"
    );
    Ok(())
}

static COUNTED: AtomicUsize = AtomicUsize::new(0);

fn counted(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    let runs = COUNTED.fetch_add(1, Ordering::Relaxed);
    if runs < 2 {
        add_function(session)
    } else {
        Ok(Changed::No)
    }
}

static COUNTED_PASS: Pass = pass("counted", counted);

#[test]
fn repeat_stops_when_nothing_changes() -> TestResult {
    let mut fixture = Fixture::new()?;
    let plan = [Planned::Repeat {
        limit: 5,
        passes: vec![&COUNTED_PASS],
    }];
    execute(
        &plan,
        &mut fixture.stages(),
        &OptOptions::default(),
        Context::default(),
    )?;
    assert_eq!(COUNTED.load(Ordering::Relaxed), 3);
    assert_eq!(fixture.module.functions.len(), 2);
    Ok(())
}

static IDLE: AtomicUsize = AtomicUsize::new(0);

fn idle(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    IDLE.fetch_add(1, Ordering::Relaxed);
    keep(session)
}

static IDLE_PASS: Pass = pass("idle", idle);
static CHANGING_PASS: Pass = pass("add", add_function);

#[test]
fn a_pass_that_changed_nothing_is_not_rerun_until_the_module_changes() -> TestResult {
    let mut fixture = Fixture::new()?;
    let plan = [
        Planned::Run(&IDLE_PASS),
        Planned::Run(&IDLE_PASS),
        Planned::Repeat {
            limit: 3,
            passes: vec![&IDLE_PASS],
        },
        Planned::Run(&CHANGING_PASS),
        Planned::Run(&IDLE_PASS),
        Planned::Run(&IDLE_PASS),
    ];
    execute(
        &plan,
        &mut fixture.stages(),
        &OptOptions::default(),
        Context::default(),
    )?;
    assert_eq!(IDLE.load(Ordering::Relaxed), 2);
    assert_eq!(fixture.module.functions.len(), 1);
    Ok(())
}
