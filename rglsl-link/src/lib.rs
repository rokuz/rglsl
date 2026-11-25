#![forbid(unsafe_code)]

mod build;
mod cache;
mod calls;
mod compiler;
mod entry;
mod error;
mod file;
mod interface;
mod layout;
mod merge;
mod program;
mod ray_location;
pub mod reflect;
mod stage_io;
mod unify;
mod workgroup;

use rglsl::compact::{KeepUnused, compact};
use rglsl::valid::{ModuleInfo, ValidationFlags, ValidationMode, Validator};
use rglsl::{
    AddressSpace, ArraySize, Binding, Expression, Function, GeometryInputPrimitive, Handle, Module,
    SampleLevel, TypeInner,
};

pub use build::{
    CompileError, CompiledObject, InvalidModule, check_program, compile_object, compile_program,
    finish_program,
};
pub use cache::BuiltinCache;
pub use compiler::{
    Build, CompileOptions, Compiled, Compiler, DebugInfo, Diagnostic, DiagnosticFormat,
    Diagnostics, Input, Macro, Origin, Preprocessed, Program, ProgramOptions, Resolve, STAGE_ORDER,
    Severity, Source, StageBinary, StageOutput, UnitReport, compile, compile_and_link,
    compile_with_includer, depfile, glslang_stage_name, link_spirv, optimize, read_object,
    spirv_version_of_vulkan, write_object,
};
pub use error::{LinkError, LinkErrors, SourcePosition};
pub use file::{FileError, decode, encode};
pub use program::{
    StagedErrors, group_by_stage, group_objects_by_stage, link_objects, link_objects_staged,
    link_program, link_program_staged,
};
pub use rglsl::ShaderStage;
pub use rglsl::object::ObjectModule;
pub use rglsl_dis::spirv_reflection;
pub use rglsl_opt::{OptError, OptLevel, OptOptions, Specialization, TargetGpu};
pub use rglsl_pp::{IncludeKind, IncludeRequest, ResolvedInclude};
pub use rglsl_sema::{Configuration, ResourceLimits};

use calls::SymbolTable;
use merge::{Builder, MergedGlobal};

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct Options {
    pub limits: rglsl_sema::ResourceLimits,
    pub validate_io: bool,
}

#[derive(Debug)]
pub struct Linked {
    pub stage: ShaderStage,
    pub module: Module,
    pub info: ModuleInfo,
    pub warnings: Vec<String>,
    pub processes: Vec<String>,
    pub source_name: Option<String>,
    pub glsl_version: u32,
}

#[derive(Debug)]
pub(crate) struct Merged {
    pub stage: ShaderStage,
    pub module: Module,
    pub globals: Vec<MergedGlobal>,
    pub warnings: Vec<String>,
    pub processes: Vec<String>,
    pub entry_point: Option<String>,
    pub source_name: Option<String>,
    pub glsl_version: u32,
}

pub fn link(objects: &[ObjectModule], options: &Options) -> Result<Linked, LinkErrors> {
    link_owned(objects.to_vec(), options)
}

pub fn link_owned(objects: Vec<ObjectModule>, options: &Options) -> Result<Linked, LinkErrors> {
    finish(merge(objects, options)?)
}

pub fn validate_object(object: &ObjectModule) -> Result<ModuleInfo, LinkErrors> {
    let mut validator = Validator::new(ValidationFlags::all());
    validator.mode(ValidationMode::Object);
    for variant in object
        .library()
        .into_iter()
        .flat_map(|library| &library.variants)
    {
        validator
            .validate(&variant.unit.module)
            .map_err(|error| invalid(&variant.unit.module, &error, object.name.as_deref()))?;
    }
    validator
        .validate(&object.unit.module)
        .map_err(|error| invalid(&object.unit.module, &error, object.name.as_deref()).into())
}

pub(crate) fn invalid(
    module: &Module,
    error: &rglsl::WithSpan<rglsl::valid::ValidationError>,
    root: Option<&str>,
) -> LinkError {
    LinkError::Validation {
        message: message(error.as_inner()),
        at: SourcePosition::of_error(module, error, root),
    }
}

fn message(error: &dyn std::error::Error) -> String {
    let mut text = error.to_string();
    let mut source = error.source();
    while let Some(inner) = source {
        text.push_str(": ");
        text.push_str(&inner.to_string());
        source = inner.source();
    }
    text
}

pub(crate) fn merge(objects: Vec<ObjectModule>, options: &Options) -> Result<Merged, LinkErrors> {
    let mut errors = Vec::new();
    for object in &objects {
        if object.format_version != rglsl::object::FORMAT_VERSION {
            errors.push(LinkError::Format {
                found: object.format_version,
                expected: rglsl::object::FORMAT_VERSION,
            });
        }
    }
    if !errors.is_empty() {
        return Err(errors.into());
    }
    let mut stage: Option<ShaderStage> = None;
    for object_stage in objects.iter().filter_map(ObjectModule::stage) {
        match stage {
            None => stage = Some(object_stage),
            Some(previous) if previous != object_stage => {
                let error = LinkError::StageMismatch(previous, object_stage);
                if !errors.contains(&error) {
                    errors.push(error);
                }
            }
            Some(_) => {}
        }
    }
    let specialized: Vec<ObjectModule> = match stage {
        Some(stage) => objects
            .into_iter()
            .filter_map(|object| {
                if !object.is_library() {
                    return Some(object);
                }
                let library = object
                    .name
                    .as_deref()
                    .map_or_else(|| String::from("(unnamed)"), |name| format!("`{name}`"));
                match object.into_stage(stage) {
                    Ok(specialized) => Some(specialized),
                    Err(rejection) => {
                        errors.push(LinkError::LibraryStage {
                            library,
                            stage,
                            file: rejection.file,
                            line: rejection.line,
                            message: rejection.message,
                        });
                        None
                    }
                }
            })
            .collect(),
        None => objects,
    };
    if errors
        .iter()
        .any(|error| matches!(*error, LinkError::LibraryStage { .. }))
    {
        return Err(errors.into());
    }
    let mut specialized = workgroup::specialize(specialized, &mut errors);
    if !errors.is_empty() {
        return Err(errors.into());
    }
    let (debug_info, span_sources) = merge_sources(&mut specialized);
    let mains: Vec<usize> = specialized
        .iter()
        .enumerate()
        .filter(|(_, object)| object.has_entry_point())
        .map(|(index, _)| index)
        .collect();
    let main = match *mains.as_slice() {
        [] => {
            errors.push(LinkError::MissingEntryPoint);
            None
        }
        [main] => Some(main),
        _ => {
            errors.push(LinkError::MultipleEntryPoints);
            None
        }
    };
    let table = SymbolTable::build(&specialized, &mut errors);
    let order = match main {
        Some(main) => calls::order(&specialized, main, &table, &mut errors),
        None => Vec::new(),
    };
    let (Some(main), Some(stage), true) = (main, stage, errors.is_empty()) else {
        return Err(errors.into());
    };
    let mut geometry_errors = Vec::new();
    if stage == ShaderStage::Geometry
        && let Some(primitive) = specialized
            .iter()
            .find_map(|object| object.unit.layout.input_primitive)
    {
        check_geometry_inputs(&specialized, primitive, &mut geometry_errors);
    }
    let (processes, entry_point, source_name, glsl_version) = specialized
        .get(main)
        .map(|object| {
            (
                object.processes.clone(),
                object.entry_point.clone(),
                object.name.clone(),
                object.unit.glsl_version,
            )
        })
        .unwrap_or_default();
    let unused = merge::unused_on_use_globals(&specialized, &order, main);
    let mut builder = Builder::new(specialized, unused);
    builder.add_objects()?;
    builder.add_functions(&table, &order)?;
    let mut entry = builder.add_entry_point(&table, main)?;
    builder.merge_module_flags()?;
    let layout = layout::apply(
        stage,
        &builder.objects,
        &mut builder.module,
        &mut entry,
        options.limits.max_transform_feedback_interleaved_components,
        &mut builder.errors,
    );
    geometry_interface(&builder, &layout, &mut entry)?;
    builder.errors.extend(geometry_errors);
    let push_constants: Vec<_> = builder
        .module
        .global_variables
        .iter()
        .filter(|&(_, global)| global.space == AddressSpace::Immediate)
        .map(|(_, global)| global.immediate_bank)
        .collect();
    if push_constants.len() > 1 && push_constants.iter().all(Option::is_none) {
        builder.errors.push(LinkError::PushConstants);
    }
    for (_, conflict) in
        rglsl::proc::SharedBlocks::of(&builder.module.global_variables, true).conflicts()
    {
        let error = match conflict {
            rglsl::proc::SharedBlockConflict::Mixed => LinkError::SharedBlockMixing,
            rglsl::proc::SharedBlockConflict::RestrictAliased => {
                LinkError::SharedBlockRestrictAliased
            }
        };
        if !builder.errors.contains(&error) {
            builder.errors.push(error);
        }
    }
    let Builder {
        mut module,
        globals,
        library_functions,
        warnings,
        errors: builder_errors,
        ..
    } = builder;
    errors.extend(builder_errors);
    if !errors.is_empty() {
        return Err(errors.into());
    }
    module.entry_points.push(entry);
    module.debug_info = debug_info;
    module.span_sources = span_sources;
    fix_up_library_functions(&mut module, &library_functions, stage);
    ray_location::resolve(&mut module)?;
    Ok(Merged {
        stage,
        module,
        globals,
        warnings,
        processes,
        entry_point,
        source_name,
        glsl_version,
    })
}

fn merge_sources(
    objects: &mut [ObjectModule],
) -> (Option<Box<rglsl::DebugInfo>>, rglsl::SpanSources) {
    let mut debug_info: Option<rglsl::DebugInfo> = None;
    let mut sources = rglsl::SpanSources::default();
    let mut base = 0_u32;
    for object in objects.iter_mut() {
        let module = &mut object.unit.module;
        let info = module.debug_info.take();
        let length = module
            .span_sources
            .length()
            .max(info.as_deref().map_or(0, rglsl::DebugInfo::end));
        rglsl::shift_module_spans(module, base);
        sources.append(
            core::mem::take(&mut module.span_sources),
            base,
            object.name.as_deref(),
        );
        if let Some(info) = info {
            debug_info.get_or_insert_default().append(*info, base);
        }
        base = base.saturating_add(length).saturating_add(1);
    }
    (debug_info.map(Box::new), sources)
}

fn geometry_interface(
    builder: &Builder,
    layout: &rglsl::object::StageLayout,
    entry: &mut rglsl::EntryPoint,
) -> Result<(), LinkError> {
    let Some(ref mut info) = entry.geometry else {
        return Ok(());
    };
    let mut streams: Vec<(Handle<rglsl::GlobalVariable>, u32)> = Vec::new();
    let mut passthrough: Vec<Handle<rglsl::GlobalVariable>> = Vec::new();
    for (index, object) in builder.objects.iter().enumerate() {
        let remap = builder.remap(index)?;
        for &(handle, stream) in &object.unit.layout.streams {
            if builder.is_unused(index, handle) {
                continue;
            }
            let mapped = remap.global(handle).map_err(error::internal)?;
            if !streams.iter().any(|&(known, _)| known == mapped) {
                streams.push((mapped, stream));
            }
        }
        for &handle in &object.unit.layout.passthrough {
            if builder.is_unused(index, handle) {
                continue;
            }
            let mapped = remap.global(handle).map_err(error::internal)?;
            if !passthrough.contains(&mapped) {
                passthrough.push(mapped);
            }
        }
    }
    info.streams = if layout.multi_stream {
        entry
            .interface
            .iter()
            .filter(|&&handle| {
                builder.module.global_variables[handle].space == AddressSpace::Output
            })
            .map(|&handle| {
                let stream = streams
                    .iter()
                    .find(|&&(known, _)| known == handle)
                    .map_or(0, |&(_, stream)| stream);
                (handle, stream)
            })
            .collect()
    } else {
        Vec::new()
    };
    info.passthrough = passthrough;
    Ok(())
}

const fn primitive_vertices(primitive: GeometryInputPrimitive) -> u32 {
    match primitive {
        GeometryInputPrimitive::Points => 1,
        GeometryInputPrimitive::Lines => 2,
        GeometryInputPrimitive::LinesAdjacency => 4,
        GeometryInputPrimitive::Triangles => 3,
        GeometryInputPrimitive::TrianglesAdjacency => 6,
    }
}

fn check_geometry_inputs(
    objects: &[ObjectModule],
    primitive: GeometryInputPrimitive,
    errors: &mut Vec<LinkError>,
) {
    let expected = primitive_vertices(primitive);
    for object in objects {
        let names: std::collections::BTreeMap<Handle<rglsl::GlobalVariable>, &str> = object
            .unit
            .globals
            .iter()
            .rev()
            .map(|symbol| (symbol.global, symbol.name.as_str()))
            .collect();
        for (handle, global) in object.unit.module.global_variables.iter() {
            if global.space != AddressSpace::Input
                || !matches!(global.io, Some(Binding::Location { .. }))
            {
                continue;
            }
            let size = match object.unit.module.types[global.ty].inner {
                TypeInner::Array {
                    size: ArraySize::Constant(size),
                    ..
                } => size.get(),
                TypeInner::Array { .. } => 0,
                _ => continue,
            };
            if size != expected {
                let name = names
                    .get(&handle)
                    .map(|&name| String::from(name))
                    .or_else(|| global.name.clone())
                    .unwrap_or_default();
                errors.push(LinkError::GeometryInputSize(name));
            }
        }
    }
}

fn fix_up_library_functions(
    module: &mut Module,
    functions: &[Handle<Function>],
    stage: ShaderStage,
) {
    let derivatives = stage == ShaderStage::Compute
        && module
            .entry_points
            .first()
            .is_some_and(|entry| entry.derivative_group.is_some());
    if stage == ShaderStage::Fragment || derivatives {
        return;
    }
    for &handle in functions {
        let function = module.functions.get_mut(handle);
        for (_, expression) in function.expressions.iter_mut() {
            if let Expression::ImageSample { ref mut level, .. } = *expression
                && matches!(*level, SampleLevel::Auto)
            {
                *level = SampleLevel::Zero;
            }
        }
    }
}

pub(crate) fn finish(merged: Merged) -> Result<Linked, LinkErrors> {
    let Merged {
        stage,
        mut module,
        globals: _,
        warnings,
        processes,
        entry_point,
        source_name,
        glsl_version,
    } = merged;
    let info = finish_module(&mut module, None)?;
    rename_entry_point(&mut module, entry_point.as_deref());
    Ok(Linked {
        stage,
        module,
        info,
        warnings,
        processes,
        source_name,
        glsl_version,
    })
}

pub fn rename_entry_point(module: &mut Module, name: Option<&str>) {
    let Some(name) = name else {
        return;
    };
    for entry in &mut module.entry_points {
        name.clone_into(&mut entry.name);
        entry.function.name = Some(name.to_owned());
    }
}

pub(crate) fn finish_module(
    module: &mut Module,
    validated: Option<ModuleInfo>,
) -> Result<ModuleInfo, LinkError> {
    let mut info = compact_and_validate(module, validated)?;
    let unused = unused_predeclared_types(module, &info);
    if !unused.is_empty() {
        module
            .special_types
            .predeclared_types
            .retain(|_, handle| !unused.contains(handle));
        info = compact_and_validate(module, None)?;
    }
    Ok(info)
}

fn compact_and_validate(
    module: &mut Module,
    validated: Option<ModuleInfo>,
) -> Result<ModuleInfo, LinkError> {
    let before = arena_sizes(module);
    compact(module, KeepUnused::Declarations)
        .map_err(|error| LinkError::Internal(message(&error)))?;
    match validated {
        Some(info) if arena_sizes(module) == before => Ok(info),
        Some(_) | None => {
            let mut validator = Validator::new(ValidationFlags::all());
            validator.mode(ValidationMode::Executable);
            validator
                .validate(module)
                .map_err(|error| invalid(module, &error, None))
        }
    }
}

fn arena_sizes(module: &Module) -> Vec<usize> {
    let mut sizes = Vec::from([
        module.types.len(),
        module.special_types.predeclared_types.len(),
        module.constants.len(),
        module.overrides.len(),
        module.global_expressions.len(),
        module.global_variables.len(),
        module.functions.len(),
    ]);
    let functions = module.all_functions();
    for function in functions {
        sizes.push(function.expressions.len());
        sizes.push(function.local_variables.len());
        sizes.push(function.named_expressions.len());
    }
    sizes
}

fn unused_predeclared_types(
    module: &Module,
    info: &ModuleInfo,
) -> std::collections::BTreeSet<Handle<rglsl::Type>> {
    let mut unused: std::collections::BTreeSet<Handle<rglsl::Type>> = module
        .special_types
        .predeclared_types
        .values()
        .copied()
        .collect();
    if unused.is_empty() {
        return unused;
    }
    let functions = module
        .functions
        .iter()
        .map(|(handle, function)| (function, &info[handle]))
        .chain(
            module
                .entry_points
                .iter()
                .enumerate()
                .map(|(index, entry)| (&entry.function, info.get_entry_point(index))),
        );
    for (function, function_info) in functions {
        for (handle, _) in function.expressions.iter() {
            if let rglsl::proc::TypeResolution::Handle(ty) = function_info[handle].ty {
                unused.remove(&ty);
            }
        }
    }
    unused
}
