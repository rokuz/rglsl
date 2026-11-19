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
        specialization: Vec::new(),
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

pub fn debug_values(function: &Function, name: &str) -> usize {
    let Some(target) = local(function, name) else {
        return 0;
    };
    function
        .body
        .walk()
        .filter(|statement| {
            matches!(**statement, Statement::DebugValue { variable, .. } if variable == target)
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

pub struct Stage {
    pub stage: ShaderStage,
    pub module: Module,
    pub words: Vec<u32>,
}

pub fn program_with(
    sources: &[(ShaderStage, &str)],
    options: &OptOptions,
    context: Context,
) -> TestResult<Vec<Stage>> {
    let mut modules = Vec::with_capacity(sources.len());
    for &(stage, source) in sources {
        let module = Frontend::default()
            .parse(&Options::from(stage), source)
            .map_err(|errors| format!("{errors:?}"))?;
        let info = Validator::new(ValidationFlags::all()).validate(&module)?;
        modules.push((stage, module, info));
    }
    let mut stages: Vec<StageModule<'_>> = modules
        .iter_mut()
        .map(|&mut (stage, ref mut module, ref mut info)| StageModule {
            stage,
            module,
            info,
        })
        .collect();
    optimize(&mut stages, options, context)?;
    drop(stages);
    let mut result = Vec::with_capacity(modules.len());
    for (stage, module, info) in modules {
        let options = spv::Options {
            lang_version: if stage == ShaderStage::Mesh {
                (1, 4)
            } else {
                spv::Options::default().lang_version
            },
            ..spv::Options::default()
        };
        let words = spv::write_vec(&module, &info, &options, None)?;
        result.push(Stage {
            stage,
            module,
            words,
        });
    }
    Ok(result)
}

pub fn program(sources: &[(ShaderStage, &str)], passes: &[&str]) -> TestResult<Vec<Stage>> {
    let options = OptOptions {
        passes: Some(passes.iter().map(|&name| name.to_owned()).collect()),
        validate_each: true,
        ..OptOptions::default()
    };
    program_with(sources, &options, Context::default())
}

pub fn interface(module: &Module, space: rglsl::AddressSpace) -> Vec<String> {
    let mut names: Vec<String> = module
        .entry_points
        .iter()
        .flat_map(|entry| entry.interface.iter())
        .filter_map(|&handle| module.global_variables.try_get(handle).ok())
        .filter(|global| global.space == space)
        .map(|global| global.name.clone().unwrap_or_default())
        .collect();
    names.sort();
    names
}
