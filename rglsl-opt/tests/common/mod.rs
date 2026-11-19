#![allow(dead_code)]

use rglsl::back::spv;
use rglsl::front::glsl::{Frontend, Options};
use rglsl::valid::{ValidationFlags, Validator};
use rglsl::{Expression, Function, Handle, LocalVariable, Module, ShaderStage, Statement};
use rglsl_opt::{Context, OptLevel, OptOptions, StageModule, TargetGpu, optimize};

pub type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

pub struct Compiled {
    pub module: Module,
    pub words: Vec<u32>,
}

pub fn compiled(
    stage: ShaderStage,
    source: &str,
    passes: &[&str],
    target_gpu: TargetGpu,
    context: Context,
) -> TestResult<Compiled> {
    compiled_at(
        OptLevel::Disabled,
        stage,
        source,
        passes,
        target_gpu,
        context,
    )
}

pub fn compiled_at(
    level: OptLevel,
    stage: ShaderStage,
    source: &str,
    passes: &[&str],
    target_gpu: TargetGpu,
    context: Context,
) -> TestResult<Compiled> {
    let mut module = Frontend::default()
        .parse(&Options::from(stage), source)
        .map_err(|errors| format!("{errors:?}"))?;
    let mut info = Validator::new(ValidationFlags::all()).validate(&module)?;
    let options = OptOptions {
        level,
        passes: Some(passes.iter().map(|&name| name.to_owned()).collect()),
        target_gpu,
        validate_each: true,
    };
    optimize(
        &mut [StageModule {
            stage,
            module: &mut module,
            info: &mut info,
        }],
        &options,
        context,
    )?;
    let words = spv::write_vec(&module, &info, &spv::Options::default(), None)?;
    Ok(Compiled { module, words })
}

pub fn optimized(
    stage: ShaderStage,
    source: &str,
    passes: &[&str],
    target_gpu: TargetGpu,
    context: Context,
) -> TestResult<Module> {
    Ok(compiled(stage, source, passes, target_gpu, context)?.module)
}

pub fn fragment(source: &str, passes: &[&str]) -> TestResult<Module> {
    optimized(
        ShaderStage::Fragment,
        source,
        passes,
        TargetGpu::default(),
        Context::default(),
    )
}

pub fn entry(module: &Module) -> TestResult<&Function> {
    Ok(&module
        .entry_points
        .first()
        .ok_or("no entry point")?
        .function)
}

pub fn local(function: &Function, name: &str) -> Option<Handle<LocalVariable>> {
    function
        .local_variables
        .iter()
        .find(|(_, local)| local.name.as_deref() == Some(name))
        .map(|(handle, _)| handle)
}

fn rooted_at(
    function: &Function,
    pointer: Handle<Expression>,
    target: Handle<LocalVariable>,
) -> bool {
    let mut current = pointer;
    loop {
        match function.expressions[current] {
            Expression::LocalVariable(local) => return local == target,
            Expression::Access { base, .. } | Expression::AccessIndex { base, .. } => {
                current = base;
            }
            _ => return false,
        }
    }
}

pub fn emitted(function: &Function) -> Vec<Handle<Expression>> {
    function
        .body
        .walk()
        .filter_map(|statement| match *statement {
            Statement::Emit(ref range) => Some(range.clone()),
            _ => None,
        })
        .flatten()
        .collect()
}

pub fn loads(function: &Function, name: &str) -> usize {
    let Some(target) = local(function, name) else {
        return 0;
    };
    emitted(function)
        .into_iter()
        .filter(|&handle| match function.expressions[handle] {
            Expression::Load { pointer } => rooted_at(function, pointer, target),
            _ => false,
        })
        .count()
}

pub fn stores(function: &Function, name: &str) -> usize {
    let Some(target) = local(function, name) else {
        return 0;
    };
    function
        .body
        .walk()
        .filter(|statement| match **statement {
            Statement::Store { pointer, .. } => rooted_at(function, pointer, target),
            _ => false,
        })
        .count()
}

pub fn decorations(words: &[u32], decoration: spirv::Decoration) -> usize {
    let mut count = 0;
    let mut at = 5;
    while let Some(&first) = words.get(at) {
        let length = (first >> 16) as usize;
        if length == 0 {
            break;
        }
        if first & 0xffff == spirv::Op::Decorate as u32
            && words.get(at + 2) == Some(&(decoration as u32))
        {
            count += 1;
        }
        at += length;
    }
    count
}
