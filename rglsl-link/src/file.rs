use rglsl::object::{CompiledUnit, FORMAT_VERSION, ObjectModule, ObjectTarget};
use rglsl::valid::{ValidationFlags, ValidationMode, Validator};

#[derive(Debug, thiserror::Error)]
pub enum FileError {
    #[error("cannot write the object module: {0}")]
    Encode(String),
    #[error("not an rglsl object module: {0}")]
    Decode(String),
    #[error("object module format version {found} is not supported (expected {expected})")]
    Version { found: u32, expected: u32 },
    #[error("invalid object module: {0}")]
    Invalid(String),
    #[error(
        "invalid object module: {message}{at}",
        at = crate::error::position_suffix(.at.as_ref())
    )]
    Validation {
        message: String,
        at: Option<crate::SourcePosition>,
    },
}

#[derive(serde::Serialize, serde::Deserialize)]
#[serde(deny_unknown_fields)]
struct File {
    format_version: u32,
    object: ObjectModule,
    specialized: Vec<Option<CompiledUnit>>,
    modules: Vec<rglsl::Module>,
    functions: Vec<rglsl::Function>,
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    spans: Vec<rglsl::ModuleSpans>,
}

pub fn encode(object: &ObjectModule) -> Result<String, FileError> {
    let mut object = object.clone();
    let spans = module_slots(&mut object)
        .into_iter()
        .map(rglsl::collect_spans)
        .collect();
    let functions = function_slots(&mut object)
        .into_iter()
        .map(core::mem::take)
        .collect();
    let modules = module_slots(&mut object)
        .into_iter()
        .map(core::mem::take)
        .collect();
    let specialized = units(&mut object)
        .into_iter()
        .map(|unit| unit.specialized.take().map(|specialized| *specialized))
        .collect();
    let file = File {
        format_version: FORMAT_VERSION,
        object,
        specialized,
        modules,
        functions,
        spans,
    };
    ron::ser::to_string(&file).map_err(|error| FileError::Encode(error.to_string()))
}

pub fn decode(text: &str) -> Result<ObjectModule, FileError> {
    let File {
        format_version,
        mut object,
        specialized,
        modules,
        functions,
        spans,
    } = ron::de::from_str(text).map_err(|error| undecodable(text, &error))?;
    if format_version != FORMAT_VERSION {
        return Err(FileError::Version {
            found: format_version,
            expected: FORMAT_VERSION,
        });
    }
    let slots = units(&mut object);
    if slots.len() != specialized.len() {
        return Err(decode_error(
            "the number of specialized units does not match",
        ));
    }
    for (slot, unit) in slots.into_iter().zip(specialized) {
        slot.specialized = unit.map(Box::new);
    }
    let slots = module_slots(&mut object);
    if slots.len() != modules.len() {
        return Err(decode_error("the number of modules does not match"));
    }
    for (slot, module) in slots.into_iter().zip(modules) {
        *slot = module;
    }
    let slots = function_slots(&mut object);
    if slots.len() != functions.len() {
        return Err(decode_error("the number of functions does not match"));
    }
    for (slot, function) in slots.into_iter().zip(functions) {
        *slot = function;
    }
    if !spans.is_empty() {
        let modules = module_slots(&mut object);
        if modules.len() != spans.len() {
            return Err(decode_error("the number of span tables does not match"));
        }
        for (module, spans) in modules.into_iter().zip(&spans) {
            if !rglsl::apply_spans(module, spans) {
                return Err(decode_error("a span table does not match its module"));
            }
        }
    }
    validate(&object)?;
    Ok(object)
}

fn undecodable(text: &str, error: &ron::error::SpannedError) -> FileError {
    match format_version(text) {
        Some(found) if found != FORMAT_VERSION => FileError::Version {
            found,
            expected: FORMAT_VERSION,
        },
        _ => FileError::Decode(error.to_string()),
    }
}

fn format_version(text: &str) -> Option<u32> {
    let rest = skip_blank(text);
    let rest = rest.strip_prefix("File").unwrap_or(rest);
    let rest = skip_blank(skip_blank(rest).strip_prefix('(')?);
    let rest = skip_blank(rest.strip_prefix("format_version")?);
    let rest = skip_blank(rest.strip_prefix(':')?);
    let end = rest
        .find(|c: char| !c.is_ascii_digit())
        .unwrap_or(rest.len());
    rest.get(..end)?.parse().ok()
}

fn skip_blank(mut text: &str) -> &str {
    loop {
        let trimmed = text.trim_start();
        if let Some(comment) = trimmed.strip_prefix("//") {
            text = comment
                .find('\n')
                .and_then(|end| comment.get(end..))
                .unwrap_or_default();
        } else if let Some(comment) = trimmed.strip_prefix("/*") {
            text = comment
                .find("*/")
                .and_then(|end| comment.get(end + 2..))
                .unwrap_or_default();
        } else {
            return trimmed;
        }
    }
}

fn validate(object: &ObjectModule) -> Result<(), FileError> {
    if object.format_version != FORMAT_VERSION {
        return Err(FileError::Version {
            found: object.format_version,
            expected: FORMAT_VERSION,
        });
    }
    let mut pending = Vec::from([&object.unit]);
    let mut variants = object
        .library()
        .map(|library| library.variants.as_slice())
        .unwrap_or_default();
    while let Some(unit) = pending.pop() {
        let module = &unit.module;
        let mut validator = Validator::new(ValidationFlags::all());
        validator.mode(ValidationMode::Object);
        validator
            .validate(module)
            .map_err(|error| FileError::Validation {
                message: crate::message(error.as_inner()),
                at: crate::SourcePosition::of_error(module, &error, object.name.as_deref()),
            })?;
        if unit
            .functions
            .iter()
            .map(|symbol| symbol.function)
            .chain(
                unit.dead_calls
                    .iter()
                    .flat_map(|call| call.caller.into_iter().chain([call.callee])),
            )
            .any(|function| module.functions.try_get(function).is_err())
        {
            return Err(FileError::Invalid(String::from(
                "a function symbol names a missing function",
            )));
        }
        let layout = &unit.layout;
        if unit
            .globals
            .iter()
            .map(|symbol| symbol.global)
            .chain(layout.streams.iter().map(|&(global, _)| global))
            .chain(layout.passthrough.iter().copied())
            .any(|global| module.global_variables.try_get(global).is_err())
        {
            return Err(FileError::Invalid(String::from(
                "a global symbol names a missing global variable",
            )));
        }
        if unit
            .globals
            .iter()
            .filter_map(|symbol| symbol.initializer)
            .any(|initializer| module.global_expressions.try_get(initializer).is_err())
        {
            return Err(FileError::Invalid(String::from(
                "a global symbol names a missing initializer",
            )));
        }
        if unit
            .work_group_size_placeholders
            .iter()
            .flatten()
            .any(|&handle| module.overrides.try_get(handle).is_err())
        {
            return Err(FileError::Invalid(String::from(
                "a work group size placeholder names a missing specialization constant",
            )));
        }
        if let Some(ref specialized) = unit.specialized {
            if specialized.specialized.is_some() {
                return Err(FileError::Invalid(String::from(
                    "a specialized object module has its own variants",
                )));
            }
            pending.push(specialized);
        }
        pending.extend(variants.iter().map(|variant| &variant.unit));
        variants = &[];
    }
    Ok(())
}

fn decode_error(message: &str) -> FileError {
    FileError::Decode(String::from(message))
}

fn units(object: &mut ObjectModule) -> Vec<&mut CompiledUnit> {
    let ObjectModule {
        ref mut unit,
        ref mut target,
        ..
    } = *object;
    let mut units = Vec::from([&mut **unit]);
    if let ObjectTarget::Library(ref mut library) = *target {
        units.extend(
            library
                .variants
                .iter_mut()
                .map(|variant| &mut *variant.unit),
        );
    }
    units
}

fn module_slots(object: &mut ObjectModule) -> Vec<&mut rglsl::Module> {
    let mut modules = Vec::new();
    for unit in units(object) {
        let mut next = Some(unit);
        while let Some(unit) = next {
            let CompiledUnit {
                ref mut module,
                ref mut specialized,
                ..
            } = *unit;
            modules.push(&mut **module);
            next = specialized.as_deref_mut();
        }
    }
    modules
}

fn function_slots(object: &mut ObjectModule) -> Vec<&mut rglsl::Function> {
    let mut slots = Vec::new();
    for module in module_slots(object) {
        let rglsl::Module {
            ref mut functions,
            ref mut entry_points,
            ..
        } = *module;
        slots.extend(functions.iter_mut().map(|(_, function)| function));
        slots.extend(entry_points.iter_mut().map(|entry| &mut entry.function));
    }
    slots
}
