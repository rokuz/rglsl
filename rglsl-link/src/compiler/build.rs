use std::collections::BTreeSet;
use std::path::Path;
use std::sync::Arc;

use rglsl::front::glsl;
use rglsl::object::ObjectModule;
use rglsl::valid::ModuleInfo;
use rglsl::{Module, ShaderStage};

use super::include::{Includes, Resolve};
use super::{
    CompileOptions, Compiler, Diagnostic, Diagnostics, Origin, ProgramOptions, STAGE_ORDER,
    Severity, glslang_stage_name, link_diagnostic, link_stages, link_warnings, write_spirv,
};
use crate::{CompileError, InvalidModule, message, reflect, rename_entry_point};

#[derive(Debug, Clone, Copy)]
pub enum Source<'a> {
    Glsl(&'a str),
    Object(&'a [u8]),
}

#[derive(Debug, Clone)]
pub struct Input<'a> {
    pub source: Source<'a>,
    pub options: CompileOptions,
}

#[derive(Debug)]
pub struct Compiled {
    pub result: Result<ObjectModule, Diagnostics>,
    pub files_read: Vec<String>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Preprocessed {
    pub text: String,
    pub diagnostics: Diagnostics,
    pub files_read: Vec<String>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct UnitReport {
    pub name: String,
    pub diagnostics: Diagnostics,
    pub compiled: bool,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct StageOutput {
    pub stage: ShaderStage,
    pub name: String,
    pub entry_point: String,
    pub result: Result<Vec<u32>, Diagnostic>,
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct Build {
    pub units: Vec<UnitReport>,
    pub link: Diagnostics,
    pub stages: Vec<StageOutput>,
    pub reflection: Option<String>,
    pub files_read: Vec<String>,
}

impl Build {
    pub fn compile_failed(&self) -> bool {
        self.units.iter().any(|unit| !unit.compiled)
    }

    pub fn link_failed(&self) -> bool {
        self.link.has_errors()
    }
}

struct Unit<'a> {
    name: String,
    text: Option<&'a str>,
    options: &'a CompileOptions,
    object: Option<ObjectModule>,
    info: Option<ModuleInfo>,
    compiled: bool,
}

impl Compiler {
    pub fn compile_unit(
        &self,
        source: &str,
        options: &CompileOptions,
        resolve: &mut Resolve<'_>,
    ) -> Compiled {
        let (result, files_read) = self.compile_object(source, options, resolve);
        Compiled {
            result: result.map(|(object, _)| object),
            files_read,
        }
    }

    fn compile_object(
        &self,
        source: &str,
        options: &CompileOptions,
        resolve: &mut Resolve<'_>,
    ) -> (Result<(ObjectModule, ModuleInfo), Diagnostics>, Vec<String>) {
        let frontend = options.frontend(Arc::clone(&self.builtins));
        let (mut includer, root) = Includes::new(options, source, resolve);
        let result = crate::compile_object(&frontend, source, root, &mut includer);
        let files_read = includer.files_read(root);
        let result = match result {
            Ok(crate::CompiledObject { mut object, info }) => {
                stamp(&mut object, options);
                Ok((object, info))
            }
            Err(error) => Err(object_diagnostics(&error, source, options)),
        };
        (result, files_read)
    }

    pub fn preprocess(
        &self,
        source: &str,
        options: &CompileOptions,
        resolve: &mut Resolve<'_>,
    ) -> Preprocessed {
        let preprocessor = rglsl_pp::Options {
            preamble: Some(options.preamble()),
            vulkan_client_version: Some(100),
            stage: options.stage,
            source_name: Some(options.name.clone()),
            listing: true,
            ..rglsl_pp::Options::default()
        };
        let (mut includer, root) = Includes::new(options, source, resolve);
        let result = rglsl_pp::preprocess(source, root, &preprocessor, &mut includer);
        let files_read = includer.files_read(root);
        let diagnostics = Diagnostics {
            list: result
                .errors()
                .map(|diagnostic| {
                    let included = diagnostic.location.file != root;
                    let file = if included {
                        result
                            .source_map
                            .file_name(diagnostic.location.file)
                            .map_or_else(|| options.name.clone(), str::to_owned)
                    } else {
                        options.name.clone()
                    };
                    Diagnostic {
                        included,
                        line: Some(diagnostic.line),
                        ..Diagnostic::source(&file, diagnostic.kind.to_string())
                    }
                })
                .collect(),
        };
        Preprocessed {
            text: result.text,
            diagnostics,
            files_read,
        }
    }

    pub fn build(
        &self,
        inputs: &[Input<'_>],
        options: &ProgramOptions,
        resolve: &mut Resolve<'_>,
    ) -> Build {
        let mut build = Build::default();
        let single = match *inputs {
            [ref input] if options.link => match input.source {
                Source::Glsl(text) => input.options.stage.map(|stage| (input, text, stage)),
                Source::Object(_) => None,
            },
            _ => None,
        };
        if let Some((input, text, stage)) = single {
            self.program(input, text, stage, options, resolve, &mut build);
        } else {
            let mut units = Vec::with_capacity(inputs.len());
            for input in inputs {
                let unit = self.unit(input, resolve, &mut build);
                units.push(unit);
            }
            if options.link {
                self.link(&units, options, resolve, &mut build);
            } else {
                unlinked(units, options, &mut build);
            }
        }
        let files_read: BTreeSet<String> = build.files_read.drain(..).collect();
        build.files_read = files_read.into_iter().collect();
        build
    }

    fn unit<'a>(
        &self,
        input: &'a Input<'_>,
        resolve: &mut Resolve<'_>,
        build: &mut Build,
    ) -> Unit<'a> {
        let name = input.options.name.clone();
        let (result, text) = match input.source {
            Source::Object(bytes) => (
                super::read_object(bytes)
                    .map(|object| (object, None))
                    .map_err(|diagnostics| Diagnostics {
                        list: diagnostics
                            .list
                            .into_iter()
                            .map(|diagnostic| Diagnostic {
                                file: Some(name.clone()),
                                ..diagnostic
                            })
                            .collect(),
                    }),
                None,
            ),
            Source::Glsl(text) => {
                let (result, read) = self.compile_object(text, &input.options, resolve);
                build.files_read.extend(read);
                (
                    result.map(|(object, info)| (object, Some(info))),
                    Some(text),
                )
            }
        };
        let (object, info, diagnostics) = match result {
            Ok((object, info)) => (Some(object), info, Diagnostics::default()),
            Err(diagnostics) => (None, None, diagnostics),
        };
        let compiled = object.is_some();
        build.units.push(UnitReport {
            name: name.clone(),
            diagnostics,
            compiled,
        });
        Unit {
            name,
            text,
            options: &input.options,
            object,
            info,
            compiled,
        }
    }

    fn program(
        &self,
        input: &Input<'_>,
        text: &str,
        stage: ShaderStage,
        options: &ProgramOptions,
        resolve: &mut Resolve<'_>,
        build: &mut Build,
    ) {
        let compile_options = &input.options;
        let frontend = compile_options.frontend(Arc::clone(&self.builtins));
        let (mut includer, root) = Includes::new(compile_options, text, resolve);
        let compiled = glsl::Frontend::default()
            .compile_program(&frontend, text, root, &mut includer)
            .map_err(CompileError::Frontend)
            .and_then(|mut object| {
                stamp(&mut object, compile_options);
                crate::check_program(object)
            });
        build.files_read.extend(includer.files_read(root));
        let unit = |compiled| ReflectUnit {
            text,
            options: compile_options,
            compiled,
        };
        let mut report = UnitReport {
            name: compile_options.name.clone(),
            diagnostics: Diagnostics::default(),
            compiled: true,
        };
        let linked = match compiled {
            Ok(linked) => linked,
            Err(CompileError::Frontend(errors)) => {
                for diagnostic in parse_diagnostics(&errors, text, &compile_options.name) {
                    if diagnostic.origin == Origin::Source {
                        report.diagnostics.list.push(diagnostic);
                    } else {
                        build.link.list.push(Diagnostic {
                            file: None,
                            origin: Origin::Stage(stage),
                            ..diagnostic
                        });
                    }
                }
                report.compiled = report.diagnostics.is_empty();
                let compiled = report.compiled;
                build.units.push(report);
                build.reflection = self.reflect(&[unit(compiled)], &[], options, resolve);
                return;
            }
            Err(CompileError::Invalid(invalid)) => {
                report
                    .diagnostics
                    .list
                    .push(validation_diagnostic(&invalid, &compile_options.name));
                report.compiled = false;
                build.units.push(report);
                build.reflection =
                    self.reflect(&[unit(true)], &[(stage, &invalid.module)], options, resolve);
                return;
            }
            Err(CompileError::Object(errors) | CompileError::Link(errors)) => {
                build.units.push(report);
                build.link.list.extend(
                    errors
                        .iter()
                        .map(|error| link_diagnostic(Some(stage), error)),
                );
                build.reflection = self.reflect(&[unit(true)], &[], options, resolve);
                return;
            }
        };
        build.units.push(report);
        build.reflection =
            self.reflect(&[unit(true)], &[(stage, &linked.module)], options, resolve);
        if options.generate_spirv {
            build.stages.push(stage_output(
                stage,
                &compile_options.name,
                &linked.module,
                &linked.info,
                &linked.processes,
                options,
            ));
        }
    }

    fn link(
        &self,
        units: &[Unit<'_>],
        options: &ProgramOptions,
        resolve: &mut Resolve<'_>,
        build: &mut Build,
    ) {
        let reflected: Vec<ReflectUnit<'_>> = units
            .iter()
            .filter_map(|unit| {
                Some(ReflectUnit {
                    text: unit.text?,
                    options: unit.options,
                    compiled: unit.compiled,
                })
            })
            .collect();
        if units.iter().any(|unit| !unit.compiled) {
            build.reflection = self.reflect(&reflected, &[], options, resolve);
            return;
        }
        let objects: Vec<ObjectModule> = units
            .iter()
            .filter_map(|unit| unit.object.clone())
            .collect();
        let linked = match link_stages(crate::group_objects_by_stage(objects), options) {
            Ok(linked) => linked,
            Err(errors) => {
                build.link.list.extend(errors.list);
                build.reflection = self.reflect(&reflected, &[], options, resolve);
                return;
            }
        };
        build.link.list.extend(link_warnings(&linked, options).list);
        let modules: Vec<(ShaderStage, &Module)> = linked
            .iter()
            .map(|stage| (stage.stage, &stage.module))
            .collect();
        build.reflection = self.reflect(&reflected, &modules, options, resolve);
        if !options.generate_spirv {
            return;
        }
        let name = units
            .first()
            .map(|unit| unit.name.clone())
            .unwrap_or_default();
        for stage in &linked {
            build.stages.push(stage_output(
                stage.stage,
                &name,
                &stage.module,
                &stage.info,
                &stage.processes,
                options,
            ));
        }
    }

    fn reflect(
        &self,
        units: &[ReflectUnit<'_>],
        modules: &[(ShaderStage, &Module)],
        options: &ProgramOptions,
        resolve: &mut Resolve<'_>,
    ) -> Option<String> {
        let reflection = options.reflection?;
        let mut analyzed: Vec<(ShaderStage, Vec<(glsl::Analyzed, bool)>)> = Vec::new();
        for stage in STAGE_ORDER {
            if !units.iter().any(|unit| unit.options.stage == Some(stage)) {
                continue;
            }
            let mut stage_units = Vec::new();
            for unit in units {
                let wanted = match unit.options.stage {
                    Some(own) => own == stage,
                    None => true,
                };
                if !wanted {
                    continue;
                }
                if let Some(result) = self.analyze(unit, stage, resolve) {
                    stage_units.push((result, unit.compiled));
                }
            }
            analyzed.push((stage, stage_units));
        }
        let inputs: Vec<reflect::StageInput<'_>> = analyzed
            .iter()
            .map(|(stage, units)| reflect::StageInput {
                stage: *stage,
                units: units
                    .iter()
                    .map(|(analyzed, compiled)| reflect::Unit {
                        analyzed,
                        compiled: *compiled,
                    })
                    .collect(),
                module: modules
                    .iter()
                    .find(|(candidate, _)| candidate == stage)
                    .map(|&(_, module)| module),
            })
            .collect();
        let settings = reflect::Settings {
            options: reflection,
            spirv: options.generate_spirv,
            keep_uncalled: options.keep_uncalled,
            auto_map_bindings: options.auto_map_bindings,
        };
        Some(
            reflect::reflect(settings, &inputs)
                .unwrap_or_else(|stalled| format!("internal error: {stalled}\n")),
        )
    }

    fn analyze(
        &self,
        unit: &ReflectUnit<'_>,
        stage: ShaderStage,
        resolve: &mut Resolve<'_>,
    ) -> Option<glsl::Analyzed> {
        let mut frontend = unit.options.frontend(Arc::clone(&self.builtins));
        frontend.stage = stage;
        frontend.library = false;
        let (mut includer, root) = Includes::new(unit.options, unit.text, resolve);
        glsl::Frontend::default().analyze_with_includer(&frontend, unit.text, root, &mut includer)
    }
}

struct ReflectUnit<'a> {
    text: &'a str,
    options: &'a CompileOptions,
    compiled: bool,
}

fn unlinked(units: Vec<Unit<'_>>, options: &ProgramOptions, build: &mut Build) {
    if units.iter().any(|unit| !unit.compiled) || !options.generate_spirv {
        return;
    }
    for unit in units {
        let (Some(mut object), Some(stage)) = (unit.object, unit.options.stage) else {
            continue;
        };
        let info = match unit.info {
            Some(info) => Ok(info),
            None => crate::validate_object(&object).map_err(|errors| {
                Diagnostic::source(
                    &unit.name,
                    format!("cannot validate the module of {}: {errors}", unit.name),
                )
            }),
        };
        let info = match info {
            Ok(info) => info,
            Err(diagnostic) => {
                build.stages.push(StageOutput {
                    stage,
                    name: unit.name,
                    entry_point: String::new(),
                    result: Err(diagnostic),
                });
                continue;
            }
        };
        rename_entry_point(&mut object.unit.module, object.entry_point.as_deref());
        build.stages.push(stage_output(
            stage,
            &unit.name,
            &object.unit.module,
            &info,
            &object.processes,
            options,
        ));
    }
}

fn stage_output(
    stage: ShaderStage,
    name: &str,
    module: &Module,
    info: &ModuleInfo,
    processes: &[String],
    options: &ProgramOptions,
) -> StageOutput {
    StageOutput {
        stage,
        name: name.to_owned(),
        entry_point: module
            .entry_points
            .first()
            .map(|entry| entry.name.clone())
            .unwrap_or_default(),
        result: write_spirv(module, info, processes, options).map_err(|error| {
            Diagnostic::source(
                name,
                format!(
                    "cannot generate SPIR-V for the {} stage: {}",
                    glslang_stage_name(stage),
                    message(&error)
                ),
            )
        }),
    }
}

fn stamp(object: &mut ObjectModule, options: &CompileOptions) {
    object.name = Path::new(&options.name)
        .file_name()
        .map(|name| name.to_string_lossy().into_owned());
    object.processes = options.processes();
    object.entry_point.clone_from(&options.entry_point);
}

fn object_diagnostics(error: &CompileError, source: &str, options: &CompileOptions) -> Diagnostics {
    let name = options.name.as_str();
    match *error {
        CompileError::Frontend(ref errors) => {
            let (compile, link): (Vec<Diagnostic>, Vec<Diagnostic>) =
                parse_diagnostics(errors, source, name)
                    .into_iter()
                    .partition(|diagnostic| diagnostic.origin == Origin::Source);
            Diagnostics {
                list: compile
                    .into_iter()
                    .chain(link.into_iter().map(|diagnostic| Diagnostic {
                        origin: Origin::Source,
                        file: Some(name.to_owned()),
                        ..diagnostic
                    }))
                    .collect(),
            }
        }
        CompileError::Object(ref errors) | CompileError::Link(ref errors) => Diagnostics {
            list: errors
                .iter()
                .map(|error| Diagnostic::source(name, error.to_string()))
                .collect(),
        },
        CompileError::Invalid(ref invalid) => {
            Diagnostic::source(name, message(invalid.error.as_inner())).into()
        }
    }
}

fn parse_diagnostics(errors: &glsl::ParseErrors, source: &str, name: &str) -> Vec<Diagnostic> {
    errors
        .errors
        .iter()
        .enumerate()
        .map(|(index, error)| {
            if let glsl::ErrorKind::Link(ref message) = error.kind {
                return Diagnostic::linking(Severity::Error, Origin::Program, message.clone());
            }
            let mut diagnostic = Diagnostic::source(name, error.kind.to_string());
            if let Some(included) = errors.include_location(index) {
                diagnostic.file = Some(included.file.clone());
                diagnostic.included = true;
                diagnostic.line = Some(included.line);
            } else if error.meta.is_defined() {
                let location = error.meta.location(source);
                diagnostic.line = Some(location.line_number);
                diagnostic.column = Some(location.line_position);
            }
            diagnostic
        })
        .collect()
}

fn validation_diagnostic(invalid: &InvalidModule, name: &str) -> Diagnostic {
    let mut diagnostic = Diagnostic::source(name, message(invalid.error.as_inner()));
    if let Some(location) = invalid
        .error
        .spans()
        .next()
        .and_then(|&(span, _)| invalid.module.span_sources.locate(span))
    {
        diagnostic.line = Some(location.line);
        match location.file.filter(|_| location.included) {
            Some(file) => {
                diagnostic.file = Some(file.to_owned());
                diagnostic.included = true;
            }
            None => diagnostic.column = Some(location.column),
        }
    }
    diagnostic
}
