#![forbid(unsafe_code)]

mod calls;
mod entry;
mod error;
mod file;
mod interface;
mod layout;
mod merge;
mod program;
mod unify;

use rglsl::compact::{compact, KeepUnused};
use rglsl::valid::{Capabilities, ModuleInfo, ValidationFlags, ValidationMode, Validator};
use rglsl::{
    AddressSpace, ArraySize, Binding, Expression, Function, GeometryInputPrimitive, Handle, Module,
    SampleLevel, ShaderStage, TypeInner,
};

pub use error::{LinkError, LinkErrors};
pub use file::{decode, encode, FileError};
pub use program::{group_by_stage, link_objects, link_program};
pub use rglsl::object::ObjectModule;

use calls::SymbolTable;
use merge::{Builder, MergedGlobal};

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct Options {
    pub auto_map_locations: bool,
    pub auto_map_bindings: bool,
}

#[derive(Debug)]
pub struct Linked {
    pub stage: ShaderStage,
    pub module: Module,
    pub info: ModuleInfo,
    pub warnings: Vec<String>,
}

#[derive(Debug)]
pub(crate) struct Merged {
    pub stage: ShaderStage,
    pub module: Module,
    pub globals: Vec<MergedGlobal>,
    pub warnings: Vec<String>,
}

pub fn link(objects: &[ObjectModule], options: &Options) -> Result<Linked, LinkErrors> {
    finish(merge(objects, options)?)
}

pub fn validate_object(object: &ObjectModule) -> Result<ModuleInfo, LinkErrors> {
    let mut validator = Validator::new(ValidationFlags::all(), Capabilities::all());
    validator.mode(ValidationMode::Object);
    for variant in &object.variants {
        validator
            .validate(&variant.module)
            .map_err(|error| LinkError::Validation(message(error.as_inner())))?;
    }
    validator
        .validate(&object.module)
        .map_err(|error| LinkError::Validation(message(error.as_inner())).into())
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

pub(crate) fn merge(objects: &[ObjectModule], options: &Options) -> Result<Merged, LinkErrors> {
    let mut errors = Vec::new();
    for object in objects {
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
    for object_stage in objects.iter().filter_map(|object| object.stage) {
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
            .iter()
            .filter_map(|object| {
                if !object.is_library() {
                    return Some(object.clone());
                }
                match object.for_stage(stage) {
                    Ok(specialized) => Some(specialized),
                    Err(rejection) => {
                        errors.push(LinkError::LibraryStage {
                            library: object.name.as_ref().map_or_else(
                                || String::from("(unnamed)"),
                                |name| format!("`{name}`"),
                            ),
                            stage,
                            line: rejection.line,
                            message: rejection.message,
                        });
                        None
                    }
                }
            })
            .collect(),
        None => objects.to_vec(),
    };
    if errors
        .iter()
        .any(|error| matches!(*error, LinkError::LibraryStage { .. }))
    {
        return Err(errors.into());
    }
    let objects = specialized.as_slice();
    let mains: Vec<usize> = objects
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
    let table = SymbolTable::build(objects, &mut errors);
    let order = match main {
        Some(main) => calls::order(objects, main, &table, &mut errors),
        None => Vec::new(),
    };
    let (Some(main), Some(stage), true) = (main, stage, errors.is_empty()) else {
        return Err(errors.into());
    };
    let mut builder = Builder::new(objects);
    builder.add_objects()?;
    builder.add_functions(&table, &order)?;
    let mut entry = builder.add_entry_point(&table, main)?;
    builder.merge_module_flags()?;
    let layout = layout::apply(
        stage,
        objects,
        &mut builder.module,
        &mut entry,
        &mut builder.errors,
    );
    if let Some(primitive) = layout
        .input_primitive
        .filter(|_| stage == ShaderStage::Geometry)
    {
        check_geometry_inputs(objects, primitive, &mut builder.errors);
    }
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
    if objects.len() > 1 {
        if options.auto_map_locations {
            interface::assign_locations(&mut module, &globals, stage);
        }
        if options.auto_map_bindings {
            interface::assign_bindings(&mut module, &globals);
        }
    }
    fix_up_library_functions(&mut module, &library_functions, stage);
    Ok(Merged {
        stage,
        module,
        globals,
        warnings,
    })
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
        for (handle, global) in object.module.global_variables.iter() {
            if global.space != AddressSpace::Input
                || !matches!(global.io, Some(Binding::Location { .. }))
            {
                continue;
            }
            let size = match object.module.types[global.ty].inner {
                TypeInner::Array {
                    size: ArraySize::Constant(size),
                    ..
                } => size.get(),
                TypeInner::Array { .. } => 0,
                _ => continue,
            };
            if size != expected {
                let name = object
                    .global_symbol(handle)
                    .map(|symbol| symbol.name.clone())
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
            if let Expression::ImageSample { ref mut level, .. } = *expression {
                if matches!(*level, SampleLevel::Auto) {
                    *level = SampleLevel::Zero;
                }
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
    } = merged;
    compact(&mut module, KeepUnused::Declarations)
        .map_err(|error| LinkError::Internal(message(&error)))?;
    let mut validator = Validator::new(ValidationFlags::all(), Capabilities::all());
    validator.mode(ValidationMode::Executable);
    let info = validator
        .validate(&module)
        .map_err(|error| LinkError::Validation(message(error.as_inner())))?;
    Ok(Linked {
        stage,
        module,
        info,
        warnings,
    })
}
