use std::collections::BTreeSet;
use std::fs;
use std::io::Read as _;
use std::path::{Path, PathBuf};

use rglsl_link::{
    BindingShifts, Build, CompileOptions, Compiler, DiagnosticFormat, Diagnostics, Input,
    ObjectModule, ProgramOptions, ResourceLimits, ShaderStage, Source,
};

use crate::args::{EXIT_COMPILE, EXIT_LINK, EXIT_SUCCESS, EXIT_USAGE, Exit, Options, VersionDump};
use crate::output;

pub const OBJECT_EXTENSION: &str = "rglo";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Class {
    Stage(ShaderStage),
    Library,
    Object,
}

#[derive(Debug)]
struct Unit {
    name: String,
    class: Class,
    bytes: Vec<u8>,
    text: String,
}

impl Unit {
    fn new(name: String, class: Class, bytes: Vec<u8>) -> Self {
        let text = if class == Class::Object {
            String::new()
        } else {
            String::from_utf8_lossy(&bytes).into_owned()
        };
        Self {
            name,
            class,
            bytes,
            text,
        }
    }

    const fn stage(&self) -> Option<ShaderStage> {
        match self.class {
            Class::Stage(stage) => Some(stage),
            Class::Library | Class::Object => None,
        }
    }
}

pub struct Session<'a> {
    options: &'a Options,
    compiler: Compiler,
    limits: ResourceLimits,
    directory: Option<String>,
    included: BTreeSet<String>,
    outputs: Vec<String>,
}

fn print_version(dump: VersionDump) {
    let version = env!("CARGO_PKG_VERSION");
    match dump {
        VersionDump::Bare => output::out!("{version}"),
        VersionDump::Full => {
            output::out!("rglsl Version: {version}");
            output::out!("GLSL Version: 4.60 (Vulkan GLSL 450 and 460) rglsl {version}");
            output::out!("SPIR-V Version 0x00010600, Revision 1");
            output::out!("GLSL.std.450 Version 100, Revision 1");
            output::out!("SPIR-V Generator Version 28");
            output::out!("GL_KHR_vulkan_glsl version 100");
        }
    }
}

fn resource_limits(options: &Options) -> Result<ResourceLimits, Exit> {
    let Some(ref name) = options.config_file else {
        return Ok(ResourceLimits::default());
    };
    let bytes = fs::read(name).map_err(|_| Exit::error("unable to open input file"))?;
    let decoded = ResourceLimits::decode_configuration(&bytes);
    for message in &decoded.messages {
        output::stdout(message);
    }
    Ok(decoded.limits)
}

pub fn run(options: &Options) -> Result<i32, Exit> {
    if options.dump_config {
        output::stdout(&ResourceLimits::default().configuration());
        if options.files.is_empty() {
            return Ok(EXIT_SUCCESS);
        }
    }
    if let Some(dump) = options.version {
        print_version(dump);
        if options.files.is_empty() && !options.stdin {
            return Ok(EXIT_SUCCESS);
        }
    }
    if options.files.is_empty() && !options.stdin {
        return Err(Exit::Usage);
    }
    let limits = resource_limits(options)?;
    let mut session = Session::new(options, limits);
    if options.object {
        return session.objects();
    }
    if options.no_link && !options.preprocess && (options.spirv || options.link) {
        return session.compile_only();
    }
    if options.preprocess || options.link {
        return session.compile_and_link();
    }
    session.validate_each()
}

impl<'a> Session<'a> {
    fn new(options: &'a Options, limits: ResourceLimits) -> Self {
        Self {
            options,
            compiler: Compiler::new(),
            limits,
            directory: std::env::current_dir()
                .ok()
                .map(|directory| directory.to_string_lossy().into_owned()),
            included: BTreeSet::new(),
            outputs: Vec::new(),
        }
    }

    fn classify(&self, name: &str) -> Result<Class, Exit> {
        if let Some(ref stage) = self.options.stage {
            return ShaderStage::from_extension(stage)
                .map(Class::Stage)
                .ok_or(Exit::Usage);
        }
        let Some((stem, extension)) = name.rsplit_once('.') else {
            return Err(Exit::Usage);
        };
        match extension {
            "hlsl" => Err(Exit::out_of_scope(name)),
            "glsl" => match stem.rsplit_once('.') {
                Some((_, inner)) => ShaderStage::from_extension(inner)
                    .map(Class::Stage)
                    .ok_or(Exit::Usage),
                None => Ok(Class::Library),
            },
            OBJECT_EXTENSION => Ok(Class::Object),
            other => ShaderStage::from_extension(other)
                .map(Class::Stage)
                .ok_or(Exit::Usage),
        }
    }

    fn load(&self, name: &str) -> Result<Unit, Exit> {
        let class = self.classify(name)?;
        let bytes = fs::read(name).map_err(|_| Exit::error("unable to open input file"))?;
        Ok(Unit::new(name.to_owned(), class, bytes))
    }

    fn load_all(&self) -> Result<Vec<Unit>, Exit> {
        if self.options.stdin {
            let class = self.classify("stdin")?;
            let mut bytes = Vec::new();
            std::io::stdin()
                .read_to_end(&mut bytes)
                .map_err(|_| Exit::error("unable to read the standard input"))?;
            return Ok(vec![Unit::new(String::from("stdin"), class, bytes)]);
        }
        self.options
            .files
            .iter()
            .map(|name| self.load(name))
            .collect()
    }

    fn shifts(&self, stage: Option<ShaderStage>) -> BindingShifts {
        let mut shifts = BindingShifts::default();
        for shift in &self.options.shifts {
            if shift.stage.is_some() && shift.stage != stage {
                continue;
            }
            let index = shift.class.index();
            if let Some(base) = shift.base
                && let Some(slot) = shifts.base.get_mut(index)
            {
                *slot = base;
            }
            if let Some(per_set) = shifts.per_set.get_mut(index) {
                for &(set, base) in &shift.per_set {
                    per_set.entry(set).or_insert(base);
                }
            }
        }
        shifts
    }

    fn resource_set_values(&self, stage: Option<ShaderStage>) -> Vec<String> {
        self.options
            .resource_sets
            .iter()
            .filter(|set| set.stage.is_none() || set.stage == stage)
            .flat_map(|set| set.values.iter().cloned())
            .collect()
    }

    fn compile_options(&self, unit: &Unit) -> CompileOptions {
        let options = self.options;
        let stage = unit.stage();
        let mut compile = match stage {
            Some(stage) => CompileOptions::new(unit.name.clone(), stage),
            None => CompileOptions::library(unit.name.clone()),
        };
        compile.macros.clone_from(&options.macros);
        compile.include_dirs.clone_from(&options.include_dirs);
        compile.file_system_includes = true;
        compile.entry_point.clone_from(&options.entry_point);
        compile.vulkan_version = options.vulkan_version();
        compile.spirv_version = options.target_spirv();
        compile.auto_map_bindings = options.auto_map_bindings;
        compile.auto_map_locations = options.auto_map_locations;
        compile.binding_shifts = self.shifts(stage);
        compile.resource_set_binding = self.resource_set_values(stage);
        compile.keep_uncalled = options.keep_uncalled;
        compile.hlsl_offsets = options.hlsl_offsets;
        compile.export_functions = options.no_link && options.spirv;
        compile.suppress_warnings = options.suppress_warnings;
        compile.debug_info = options.debug;
        compile.limits = self.limits;
        compile.invert_y = options.invert_y;
        compile.nan_clamp = options.nan_clamp;
        compile.discard_is_terminate = options.discard_is_terminate;
        compile.no_storage_format = options.no_storage_format;
        compile
    }

    fn program_options(&self) -> ProgramOptions {
        let options = self.options;
        ProgramOptions {
            link: !options.no_link,
            generate_spirv: options.spirv,
            auto_map_bindings: options.auto_map_bindings,
            auto_map_locations: options.auto_map_locations,
            binding_shifts: ShaderStage::ALL
                .iter()
                .map(|&stage| (stage, self.shifts(Some(stage))))
                .collect(),
            keep_uncalled: options.keep_uncalled,
            export_functions: options.no_link,
            suppress_warnings: options.suppress_warnings || options.suppress_info,
            debug_info: options.debug,
            spirv_version: options.target_spirv(),
            command_line: Some(options.command_line.clone()),
            working_directory: self.directory.clone(),
            limits: self.limits,
            reflection: options.reflect.then_some(options.reflect_options),
        }
    }

    const fn format(&self, unnamed_source: bool) -> DiagnosticFormat {
        DiagnosticFormat {
            error_column: self.options.error_column,
            absolute_path: self.options.absolute_path,
            unnamed_source,
        }
    }

    fn report_unit(&self, name: &str, diagnostics: &Diagnostics) {
        if self.options.suppress_info {
            return;
        }
        if !self.options.quiet {
            output::err!("{name}");
        }
        let text = diagnostics.info_log(self.format(false));
        if !text.is_empty() {
            output::err!("{text}");
        }
    }

    fn report_link(&self, diagnostics: &Diagnostics) {
        if self.options.suppress_info || diagnostics.is_empty() {
            return;
        }
        output::err!("{}", diagnostics.format(self.format(false)));
    }

    fn compile_unit(&mut self, unit: &Unit) -> Result<ObjectModule, Diagnostics> {
        if unit.class == Class::Object {
            return rglsl_link::read_object(&unit.bytes).map_err(|diagnostics| Diagnostics {
                list: diagnostics
                    .list
                    .into_iter()
                    .map(|diagnostic| rglsl_link::Diagnostic {
                        file: Some(unit.name.clone()),
                        ..diagnostic
                    })
                    .collect(),
            });
        }
        let compiled =
            self.compiler
                .compile_unit(&unit.text, &self.compile_options(unit), &mut |_| None);
        self.included.extend(compiled.files_read);
        compiled.result
    }

    fn validate_each(&mut self) -> Result<i32, Exit> {
        let several = self.options.files.len() > 1;
        let mut failed = false;
        let names = if self.options.stdin {
            vec![String::from("stdin")]
        } else {
            self.options.files.clone()
        };
        for name in &names {
            let unit = if self.options.stdin {
                self.load_all()?.into_iter().next().ok_or(Exit::Usage)?
            } else {
                self.load(name)?
            };
            let diagnostics = self.compile_unit(&unit).err().unwrap_or_default();
            failed |= diagnostics.has_errors();
            let results = if self.options.suppress_info {
                String::new()
            } else {
                diagnostics.info_log(self.format(true))
            };
            if several || !results.is_empty() {
                output::out!("{}", unit.name);
            }
            if !results.is_empty() {
                output::out!("{results}");
            }
        }
        Ok(if failed { EXIT_COMPILE } else { EXIT_SUCCESS })
    }

    fn objects(&mut self) -> Result<i32, Exit> {
        let units = self.load_all()?;
        let single = units.len() == 1;
        let mut failed = false;
        for unit in &units {
            let object = match self.compile_unit(unit) {
                Ok(object) => {
                    self.report_unit(&unit.name, &Diagnostics::default());
                    object
                }
                Err(diagnostics) => {
                    self.report_unit(&unit.name, &diagnostics);
                    failed = true;
                    continue;
                }
            };
            let output = match self.options.output {
                Some(ref output) if single => PathBuf::from(output),
                _ => Path::new(&unit.name).with_extension(OBJECT_EXTENSION),
            };
            let encoded = rglsl_link::write_object(&object).map_err(|error| {
                Exit::error(format!(
                    "cannot encode the object module of {}: {error}",
                    unit.name
                ))
            })?;
            if fs::write(&output, encoded).is_err() {
                return Err(Exit::Printed(format!(
                    "ERROR: Failed to open file: {}\n",
                    output.display()
                )));
            }
        }
        Ok(if failed { EXIT_COMPILE } else { EXIT_SUCCESS })
    }

    fn preprocess(&mut self, units: &[Unit]) -> i32 {
        let mut failed = false;
        for unit in units {
            let result =
                self.compiler
                    .preprocess(&unit.text, &self.compile_options(unit), &mut |_| None);
            self.included.extend(result.files_read);
            if result.diagnostics.is_empty() {
                if !result.text.is_empty() {
                    output::out!("{}", result.text);
                }
            } else {
                failed = true;
                if !self.options.suppress_info {
                    output::err!("{}", result.diagnostics.info_log(self.format(false)));
                }
            }
        }
        if failed { EXIT_COMPILE } else { EXIT_SUCCESS }
    }

    fn compile_and_link(&mut self) -> Result<i32, Exit> {
        let units = self.load_all()?;
        if self.options.preprocess {
            return Ok(self.preprocess(&units));
        }
        if let [ref unit] = *units.as_slice()
            && unit.class == Class::Library
        {
            return Err(Exit::detailed(
                "a library (a .glsl file without a stage) has no entry point; link it with a program, or compile it with --object",
                unit.name.clone(),
            ));
        }
        let code = self.build(&units)?;
        if code == EXIT_SUCCESS {
            self.write_depfile(&units)?;
        }
        Ok(code)
    }

    fn compile_only(&mut self) -> Result<i32, Exit> {
        let units = self.load_all()?;
        if let Some(unit) = units
            .iter()
            .find(|unit| !matches!(unit.class, Class::Stage(_)))
        {
            return Err(Exit::detailed(
                "--no-link compiles shaders of a stage; a library or an object module has none",
                unit.name.clone(),
            ));
        }
        let code = self.build(&units)?;
        if code == EXIT_SUCCESS {
            self.write_depfile(&units)?;
        }
        Ok(code)
    }

    fn not_generated(&self) {
        if self.options.spirv {
            output::out!("SPIR-V is not generated for failed compile or link");
        }
    }

    fn build(&mut self, units: &[Unit]) -> Result<i32, Exit> {
        let inputs: Vec<Input<'_>> = units
            .iter()
            .map(|unit| Input {
                source: match unit.class {
                    Class::Object => Source::Object(&unit.bytes),
                    Class::Stage(_) | Class::Library => Source::Glsl(&unit.text),
                },
                options: self.compile_options(unit),
            })
            .collect();
        let build = self
            .compiler
            .build(&inputs, &self.program_options(), &mut |_| None);
        self.included.extend(build.files_read.iter().cloned());
        for unit in &build.units {
            self.report_unit(&unit.name, &unit.diagnostics);
        }
        self.report_link(&build.link);
        if let Some(ref reflection) = build.reflection {
            output::stdout(reflection);
        }
        if build.compile_failed() {
            self.not_generated();
            return Ok(EXIT_COMPILE);
        }
        if build.link_failed() {
            self.not_generated();
            return Ok(EXIT_LINK);
        }
        self.emit(&build)
    }

    fn emit(&mut self, build: &Build) -> Result<i32, Exit> {
        for stage in &build.stages {
            let words = match stage.result {
                Ok(ref words) => words,
                Err(ref diagnostic) => {
                    if !self.options.suppress_info {
                        output::err!("{}\n", diagnostic.format(DiagnosticFormat::default()));
                    }
                    self.not_generated();
                    return Ok(EXIT_COMPILE);
                }
            };
            let path = self
                .options
                .output
                .clone()
                .unwrap_or_else(|| format!("{}.spv", stage.stage.extension()));
            if !output::write(
                &path,
                words,
                self.options.hex,
                self.options.variable_name.as_deref(),
            ) {
                return Err(Exit::Printed(format!(
                    "ERROR: Failed to open file: {path}\n"
                )));
            }
            self.outputs.push(path);
            if self.options.disassemble && !self.options.spirv_tools_disassembler {
                let disassembly = rglsl_dis::disassemble(words, rglsl_dis::Form::Glslang);
                output::stdout_bytes(&disassembly.text);
                if disassembly.failed {
                    return Ok(EXIT_USAGE);
                }
            }
        }
        Ok(EXIT_SUCCESS)
    }

    fn write_depfile(&self, units: &[Unit]) -> Result<(), Exit> {
        let Some(ref depfile) = self.options.depfile else {
            return Ok(());
        };
        let mut sources: Vec<String> = units.iter().map(|unit| unit.name.clone()).collect();
        sources.extend(self.included.iter().cloned());
        if fs::write(depfile, rglsl_link::depfile(&self.outputs, &sources)).is_ok() {
            Ok(())
        } else {
            Err(Exit::Printed(format!(
                "ERROR: Failed to open file: {depfile}\n"
            )))
        }
    }
}
