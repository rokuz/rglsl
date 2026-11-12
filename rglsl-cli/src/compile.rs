use std::collections::BTreeSet;
use std::fs;
use std::io::Read as _;
use std::path::{Path, PathBuf};

use rglsl::back::spv;
use rglsl::front::glsl;
use rglsl::object::ObjectModule;
use rglsl::proc::{BindingShifts, ResourceClass};
use rglsl::valid::{Capabilities, ModuleInfo, ValidationFlags, Validator};
use rglsl::{FastHashMap, Module, ShaderStage};

use crate::args::{
    self, Debug, Exit, Macro, Options, VersionDump, EXIT_COMPILE, EXIT_LINK, EXIT_SUCCESS,
};
use crate::output;
use crate::reflect;

pub const OBJECT_EXTENSION: &str = "rglo";

const STAGE_ORDER: [ShaderStage; 14] = [
    ShaderStage::Vertex,
    ShaderStage::TessControl,
    ShaderStage::TessEvaluation,
    ShaderStage::Geometry,
    ShaderStage::Fragment,
    ShaderStage::Compute,
    ShaderStage::RayGeneration,
    ShaderStage::Intersection,
    ShaderStage::AnyHit,
    ShaderStage::ClosestHit,
    ShaderStage::Miss,
    ShaderStage::Callable,
    ShaderStage::Task,
    ShaderStage::Mesh,
];

pub const fn stage_extension(stage: ShaderStage) -> &'static str {
    match stage {
        ShaderStage::Vertex => "vert",
        ShaderStage::TessControl => "tesc",
        ShaderStage::TessEvaluation => "tese",
        ShaderStage::Geometry => "geom",
        ShaderStage::Fragment => "frag",
        ShaderStage::Compute => "comp",
        ShaderStage::Task => "task",
        ShaderStage::Mesh => "mesh",
        ShaderStage::RayGeneration => "rgen",
        ShaderStage::Miss => "rmiss",
        ShaderStage::AnyHit => "rahit",
        ShaderStage::ClosestHit => "rchit",
        ShaderStage::Intersection => "rint",
        ShaderStage::Callable => "rcall",
    }
}

const fn glslang_stage_name(stage: ShaderStage) -> &'static str {
    match stage {
        ShaderStage::Vertex => "vertex",
        ShaderStage::TessControl => "tessellation control",
        ShaderStage::TessEvaluation => "tessellation evaluation",
        ShaderStage::Geometry => "geometry",
        ShaderStage::Fragment => "fragment",
        ShaderStage::Compute => "compute",
        ShaderStage::Task => "task",
        ShaderStage::Mesh => "mesh",
        ShaderStage::RayGeneration => "ray-generation",
        ShaderStage::Miss => "miss",
        ShaderStage::AnyHit => "any-hit",
        ShaderStage::ClosestHit => "closest-hit",
        ShaderStage::Intersection => "intersection",
        ShaderStage::Callable => "callable",
    }
}

const fn resource_name(class: ResourceClass) -> &'static str {
    match class {
        ResourceClass::Sampler => "shift-sampler-binding",
        ResourceClass::Texture => "shift-texture-binding",
        ResourceClass::Image => "shift-image-binding",
        ResourceClass::UniformBuffer => "shift-ubo-binding",
        ResourceClass::StorageBuffer => "shift-ssbo-binding",
        ResourceClass::UnorderedAccess => "shift-uav-binding",
        ResourceClass::CombinedSampler => "shift-combined-sampler-binding",
        ResourceClass::AccelerationStructure => "shift-as-binding",
    }
}

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
    text: String,
}

impl Unit {
    const fn stage(&self) -> Option<ShaderStage> {
        match self.class {
            Class::Stage(stage) => Some(stage),
            Class::Library | Class::Object => None,
        }
    }
}

#[derive(Debug, Default)]
struct Log {
    compile: Vec<String>,
    notes: Vec<String>,
    link: Vec<String>,
}

struct Compiled {
    object: Option<ObjectModule>,
    log: Log,
}

pub struct Session<'a> {
    options: &'a Options,
    defines: FastHashMap<String, String>,
    directory: Option<String>,
    included: BTreeSet<String>,
    outputs: Vec<String>,
    validation_mode: bool,
}

fn full_message(error: &dyn std::error::Error) -> String {
    let mut message = error.to_string();
    let mut source = error.source();
    while let Some(inner) = source {
        message.push_str(": ");
        message.push_str(&inner.to_string());
        source = inner.source();
    }
    message
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

pub fn run(options: &Options) -> Result<i32, Exit> {
    if let Some(dump) = options.version {
        print_version(dump);
        if options.files.is_empty() && !options.stdin {
            return Ok(EXIT_SUCCESS);
        }
    }
    if options.files.is_empty() && !options.stdin {
        return Err(Exit::Usage);
    }
    let mut session = Session::new(options);
    if options.object {
        return session.objects();
    }
    if options.preprocess || options.link {
        return session.compile_and_link();
    }
    session.validate_each()
}

impl<'a> Session<'a> {
    fn new(options: &'a Options) -> Self {
        let mut defines = FastHashMap::default();
        for edit in &options.macros {
            match *edit {
                Macro::Define(ref definition) => {
                    let (name, value) = definition
                        .split_once('=')
                        .unwrap_or((definition.as_str(), ""));
                    defines.insert(name.to_owned(), value.to_owned());
                }
                Macro::Undefine(ref name) => {
                    defines.remove(name);
                }
            }
        }
        Self {
            options,
            defines,
            directory: std::env::current_dir()
                .ok()
                .map(|directory| directory.to_string_lossy().into_owned()),
            included: BTreeSet::new(),
            outputs: Vec::new(),
            validation_mode: false,
        }
    }

    fn classify(&self, name: &str) -> Result<Class, Exit> {
        if let Some(ref stage) = self.options.stage {
            return args::stage_from_name(stage)
                .map(Class::Stage)
                .ok_or(Exit::Usage);
        }
        let Some((stem, extension)) = name.rsplit_once('.') else {
            return Err(Exit::Usage);
        };
        match extension {
            "hlsl" => Err(Exit::out_of_scope(name)),
            "glsl" => match stem.rsplit_once('.') {
                Some((_, inner)) => args::stage_from_name(inner)
                    .map(Class::Stage)
                    .ok_or(Exit::Usage),
                None => Ok(Class::Library),
            },
            OBJECT_EXTENSION => Ok(Class::Object),
            other => args::stage_from_name(other)
                .map(Class::Stage)
                .ok_or(Exit::Usage),
        }
    }

    fn load(&self, name: &str) -> Result<Unit, Exit> {
        let class = self.classify(name)?;
        let bytes = fs::read(name).map_err(|_| Exit::error("unable to open input file"))?;
        Ok(Unit {
            name: name.to_owned(),
            class,
            text: String::from_utf8_lossy(&bytes).into_owned(),
        })
    }

    fn load_all(&self) -> Result<Vec<Unit>, Exit> {
        if self.options.stdin {
            let class = self.classify("stdin")?;
            let mut text = String::new();
            std::io::stdin()
                .read_to_string(&mut text)
                .map_err(|_| Exit::error("unable to read the standard input"))?;
            return Ok(vec![Unit {
                name: String::from("stdin"),
                class,
                text,
            }]);
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
            if let Some(base) = shift.base {
                if let Some(slot) = shifts.base.get_mut(index) {
                    *slot = base;
                }
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

    fn resource_set(&self, stage: Option<ShaderStage>) -> Option<u32> {
        match self.resource_set_values(stage).as_slice() {
            [single] => Some(
                single
                    .chars()
                    .take_while(char::is_ascii_digit)
                    .collect::<String>()
                    .parse()
                    .unwrap_or(0),
            ),
            _ => None,
        }
    }

    const fn wants_debug(&self) -> bool {
        matches!(
            self.options.debug,
            Some(Debug::Lines | Debug::NonSemantic | Debug::NonSemanticSource)
        )
    }

    fn frontend_options(&self, unit: &Unit) -> glsl::Options {
        let stage = unit.stage();
        glsl::Options {
            defines: self.defines.clone(),
            auto_map_bindings: self.options.auto_map_bindings,
            auto_map_locations: self.options.auto_map_locations,
            spirv_version: Some(self.options.target_spirv()),
            library: unit.class == Class::Library,
            hlsl_offsets: self.options.hlsl_offsets,
            debug_info: self.wants_debug(),
            source_name: Some(unit.name.clone()),
            keep_uncalled: self.options.keep_uncalled,
            resource_set: self.resource_set(stage),
            binding_shifts: self.shifts(stage),
            ..glsl::Options::from(stage.unwrap_or(ShaderStage::Compute))
        }
    }

    fn processes(&self, stage: ShaderStage) -> Vec<String> {
        let options = self.options;
        let mut processes = Vec::new();
        if let Some(ref name) = options.entry_point {
            processes.push(format!("entry-point {name}"));
        }
        for edit in &options.macros {
            processes.push(match *edit {
                Macro::Define(ref definition) => format!("define-macro {definition}"),
                Macro::Undefine(ref name) => format!("undef-macro {name}"),
            });
        }
        let shifts = self.shifts(Some(stage));
        for class in ResourceClass::ALL {
            let index = class.index();
            if let Some(&base) = shifts.base.get(index) {
                if base != 0 {
                    processes.push(format!("{} {base}", resource_name(class)));
                }
            }
            for (set, base) in shifts.per_set.get(index).into_iter().flatten() {
                if *base != 0 {
                    processes.push(format!("{} {base} {set}", resource_name(class)));
                }
            }
        }
        let sets = self.resource_set_values(Some(stage));
        if !sets.is_empty() {
            processes.push(format!("resource-set-binding {}", sets.join(" ")));
        }
        if options.auto_map_bindings {
            processes.push(String::from("auto-map-bindings"));
        }
        if options.auto_map_locations {
            processes.push(String::from("auto-map-locations"));
        }
        processes.push(String::from("client vulkan100"));
        let (major, minor) = options.target_spirv();
        if (major, minor) != (1, 0) {
            processes.push(format!("target-env spirv{major}.{minor}"));
        }
        let (major, minor) = options.vulkan_version();
        processes.push(format!("target-env vulkan{major}.{minor}"));
        if options.relaxed_errors {
            processes.push(String::from("relaxed-errors"));
        }
        if options.suppress_warnings {
            processes.push(String::from("suppress-warnings"));
        }
        if options.keep_uncalled {
            processes.push(String::from("keep-uncalled"));
        }
        if options.relax_set_binding_limits {
            processes.push(String::from("relax-set-binding-limits"));
        }
        if let Some(ref name) = options.source_entry_point {
            processes.push(format!("source-entrypoint {name}"));
        }
        if options.hlsl_offsets {
            processes.push(String::from("hlsl-offsets"));
        }
        if options.entry_point.is_none() {
            processes.push(String::from("entry-point main"));
        }
        processes
    }

    fn place(&self, file: &str, line: u32, column: Option<u32>) -> String {
        let file = if self.options.absolute_path && file != "0" {
            fs::canonicalize(file).map_or_else(
                |_| file.to_owned(),
                |path| path.to_string_lossy().into_owned(),
            )
        } else {
            file.to_owned()
        };
        match column.filter(|_| self.options.error_column) {
            Some(column) => format!("{file}:{line}:{column}"),
            None => format!("{file}:{line}"),
        }
    }

    fn root_name<'u>(&self, unit: &'u Unit) -> &'u str {
        if self.validation_mode {
            "0"
        } else {
            unit.name.as_str()
        }
    }

    fn parse_log(&self, unit: &Unit, errors: &glsl::ParseErrors) -> Log {
        let mut log = Log::default();
        let root = self.root_name(unit);
        for (index, error) in errors.errors.iter().enumerate() {
            if let glsl::ErrorKind::Link(ref message) = error.kind {
                log.link.push(message.clone());
                continue;
            }
            let location = match errors.include_location(index) {
                Some(included) => self.place(&included.file, included.line, None),
                None if error.meta.is_defined() => {
                    let location = error.meta.location(&unit.text);
                    self.place(root, location.line_number, Some(location.line_position))
                }
                None => root.to_owned(),
            };
            log.compile
                .push(format!("ERROR: {location}: {}", error.kind));
        }
        log
    }

    fn validation_log(
        &self,
        unit: &Unit,
        error: &rglsl::WithSpan<rglsl::valid::ValidationError>,
    ) -> Log {
        let root = self.root_name(unit);
        let location = error
            .spans()
            .next()
            .filter(|&&(span, _)| span.is_defined())
            .map_or_else(
                || root.to_owned(),
                |&(span, _)| {
                    let location = span.location(&unit.text);
                    self.place(root, location.line_number, Some(location.line_position))
                },
            );
        Log {
            compile: vec![format!(
                "ERROR: {location}: {}",
                full_message(error.as_inner())
            )],
            ..Log::default()
        }
    }

    fn infolog(&self, log: &Log) -> String {
        let mut text = String::new();
        for line in &log.notes {
            text.push_str(line);
            text.push('\n');
        }
        for line in &log.compile {
            text.push_str(line);
            text.push('\n');
        }
        if !log.compile.is_empty() {
            text.push_str(&format!(
                "ERROR: {} compilation errors.  No code generated.\n\n",
                log.compile.len()
            ));
        }
        text
    }

    fn report_unit(&self, unit: &Unit, log: &Log) {
        if self.options.suppress_info {
            return;
        }
        if !self.options.quiet {
            output::err!("{}", unit.name);
        }
        let text = self.infolog(log);
        if !text.is_empty() {
            output::err!("{text}");
        }
    }

    fn report_link(&self, lines: &[String]) {
        if self.options.suppress_info || lines.is_empty() {
            return;
        }
        let mut text = String::new();
        for line in lines {
            text.push_str(line);
            text.push('\n');
        }
        output::err!("{text}");
    }

    fn source_entry_point_notes(&self) -> Vec<String> {
        match self.options.source_entry_point {
            Some(ref name) if name != "main" => {
                vec![String::from("ERROR: Source entry point must be \"main\"")]
            }
            _ => Vec::new(),
        }
    }

    fn warn_source_entry_point(&self) {
        if self.options.source_entry_point.is_some() && self.options.entry_point.is_none() {
            output::out!(
                "Warning: Changing source entry point name without setting an entry-point name.\nUse '-e <name>'."
            );
        }
    }

    fn includer(&self) -> rglsl_pp::FileSystemIncluder {
        rglsl_pp::FileSystemIncluder::new(&self.options.include_dirs)
    }

    fn remember_includes(
        &mut self,
        includer: &rglsl_pp::FileSystemIncluder,
        root: rglsl_pp::FileId,
    ) {
        for (file, name) in includer.files() {
            if file != root {
                self.included.insert(name.to_owned());
            }
        }
    }

    fn compile_object(&mut self, unit: &Unit) -> Compiled {
        let mut log = Log {
            notes: self.source_entry_point_notes(),
            ..Log::default()
        };
        if unit.class == Class::Object {
            return match rglsl_link::decode(&unit.text) {
                Ok(object) => Compiled {
                    object: Some(object),
                    log,
                },
                Err(error) => {
                    log.compile.push(format!("ERROR: {}: {error}", unit.name));
                    Compiled { object: None, log }
                }
            };
        }
        let options = self.frontend_options(unit);
        let mut includer = self.includer();
        let root = includer.add_root(&unit.name);
        let result = glsl::Frontend::default().compile_with_includer(
            &options,
            &unit.text,
            root,
            &mut includer,
        );
        self.remember_includes(&includer, root);
        match result {
            Ok(mut object) => {
                object.name = Path::new(&unit.name)
                    .file_name()
                    .map(|name| name.to_string_lossy().into_owned());
                match rglsl_link::validate_object(&object) {
                    Ok(_) => Compiled {
                        object: Some(object),
                        log,
                    },
                    Err(errors) => {
                        let root = self.root_name(unit).to_owned();
                        log.compile
                            .extend(errors.iter().map(|error| format!("ERROR: {root}: {error}")));
                        Compiled { object: None, log }
                    }
                }
            }
            Err(errors) => {
                let parsed = self.parse_log(unit, &errors);
                log.compile.extend(parsed.compile);
                log.compile.extend(
                    parsed
                        .link
                        .into_iter()
                        .map(|message| format!("ERROR: {}: {message}", self.root_name(unit))),
                );
                Compiled { object: None, log }
            }
        }
    }

    fn validate_each(&mut self) -> Result<i32, Exit> {
        self.validation_mode = true;
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
            let compiled = self.compile_object(&unit);
            failed |= compiled.object.is_none();
            let results = if self.options.suppress_info {
                String::new()
            } else {
                self.infolog(&compiled.log)
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
            let compiled = self.compile_object(unit);
            self.report_unit(unit, &compiled.log);
            let Some(object) = compiled.object else {
                failed = true;
                continue;
            };
            let output = match self.options.output {
                Some(ref output) if single => PathBuf::from(output),
                _ => Path::new(&unit.name).with_extension(OBJECT_EXTENSION),
            };
            let encoded = rglsl_link::encode(&object).map_err(|error| {
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
        let defines: Vec<rglsl_pp::Define> = self
            .defines
            .iter()
            .map(|(name, value)| rglsl_pp::Define::new(name.clone(), Some(value.as_str())))
            .collect();
        let mut failed = false;
        for unit in units {
            let options = rglsl_pp::Options {
                defines: defines.clone(),
                vulkan_client_version: Some(100),
                stage: unit
                    .stage()
                    .and_then(|stage| rglsl_pp::Stage::from_extension(stage_extension(stage))),
                ..rglsl_pp::Options::default()
            };
            let mut includer = self.includer();
            let root = includer.add_root(&unit.name);
            let result = rglsl_pp::preprocess(&unit.text, root, &options, &mut includer);
            self.remember_includes(&includer, root);
            let mut log = Log::default();
            for diagnostic in result.errors() {
                let file = if diagnostic.location.file == root {
                    unit.name.clone()
                } else {
                    result
                        .source_map
                        .file_name(diagnostic.location.file)
                        .map_or_else(|| unit.name.clone(), str::to_owned)
                };
                log.compile.push(format!(
                    "ERROR: {}: {}",
                    self.place(&file, diagnostic.line, None),
                    diagnostic.kind
                ));
            }
            if log.compile.is_empty() {
                if !result.text.is_empty() {
                    output::out!("{}", result.text);
                }
            } else {
                failed = true;
                if !self.options.suppress_info {
                    output::err!("{}", self.infolog(&log));
                }
            }
        }
        if failed {
            EXIT_COMPILE
        } else {
            EXIT_SUCCESS
        }
    }

    fn compile_and_link(&mut self) -> Result<i32, Exit> {
        let units = self.load_all()?;
        if self.options.preprocess {
            return Ok(self.preprocess(&units));
        }
        self.warn_source_entry_point();
        let code = match units.as_slice() {
            [unit] if matches!(unit.class, Class::Stage(_)) => self.program(unit)?,
            [unit] if unit.class == Class::Library => {
                return Err(Exit::detailed(
                    "a library (a .glsl file without a stage) has no entry point; link it with a program, or compile it with --object",
                    unit.name.clone(),
                ))
            }
            _ => self.link(&units)?,
        };
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

    fn program(&mut self, unit: &Unit) -> Result<i32, Exit> {
        let Class::Stage(stage) = unit.class else {
            return Err(Exit::Usage);
        };
        let options = self.frontend_options(unit);
        let mut includer = self.includer();
        let root = includer.add_root(&unit.name);
        let parsed = glsl::Frontend::default().parse_with_includer(
            &options,
            &unit.text,
            root,
            &mut includer,
        );
        self.remember_includes(&includer, root);
        let notes = self.source_entry_point_notes();
        let mut module = match parsed {
            Ok(module) => module,
            Err(errors) => {
                let mut log = self.parse_log(unit, &errors);
                log.notes = notes;
                self.report_unit(unit, &log);
                let link: Vec<String> = log
                    .link
                    .iter()
                    .map(|message| {
                        format!(
                            "ERROR: Linking {} stage: {message}",
                            glslang_stage_name(stage)
                        )
                    })
                    .collect();
                self.report_link(&link);
                self.reflect(&[(unit, log.compile.is_empty())], &[]);
                self.not_generated();
                return Ok(if log.compile.is_empty() {
                    EXIT_LINK
                } else {
                    EXIT_COMPILE
                });
            }
        };
        let info =
            match Validator::new(ValidationFlags::all(), Capabilities::all()).validate(&module) {
                Ok(info) => info,
                Err(error) => {
                    let mut log = self.validation_log(unit, &error);
                    log.notes = notes;
                    self.report_unit(unit, &log);
                    self.reflect(&[(unit, true)], &[(stage, &module)]);
                    self.not_generated();
                    return Ok(EXIT_COMPILE);
                }
            };
        self.report_unit(
            unit,
            &Log {
                notes,
                ..Log::default()
            },
        );
        self.rename_entry_point(&mut module);
        self.reflect(&[(unit, true)], &[(stage, &module)]);
        if self.options.spirv {
            return self.emit(stage, &module, &info, &unit.name);
        }
        Ok(EXIT_SUCCESS)
    }

    fn analyze(&self, unit: &Unit, stage: ShaderStage) -> Option<glsl::Analyzed> {
        let mut options = self.frontend_options(unit);
        options.stage = stage;
        options.library = false;
        let mut includer = self.includer();
        let root = includer.add_root(&unit.name);
        glsl::Frontend::default().analyze_with_includer(&options, &unit.text, root, &mut includer)
    }

    fn reflect(&self, units: &[(&Unit, bool)], modules: &[(ShaderStage, &Module)]) {
        if !self.options.reflect {
            return;
        }
        let mut analyzed: Vec<(ShaderStage, Vec<(glsl::Analyzed, bool)>)> = Vec::new();
        for stage in STAGE_ORDER {
            if !units
                .iter()
                .any(|(unit, _)| unit.class == Class::Stage(stage))
            {
                continue;
            }
            let mut stage_units = Vec::new();
            for &(unit, compiled) in units {
                let wanted = match unit.class {
                    Class::Stage(own) => own == stage,
                    Class::Library => true,
                    Class::Object => false,
                };
                if !wanted {
                    continue;
                }
                if let Some(result) = self.analyze(unit, stage) {
                    stage_units.push((result, compiled));
                }
            }
            analyzed.push((stage, stage_units));
        }
        let inputs: Vec<reflect::StageInput> = analyzed
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
            options: self.options.reflect_options,
            spirv: self.options.spirv,
            keep_uncalled: self.options.keep_uncalled,
            auto_map_bindings: self.options.auto_map_bindings,
        };
        output::stdout(&reflect::reflect(settings, &inputs));
    }

    fn rename_entry_point(&self, module: &mut Module) {
        if let Some(ref name) = self.options.entry_point {
            for entry in &mut module.entry_points {
                entry.name.clone_from(name);
                entry.function.name = Some(name.clone());
            }
        }
    }

    fn link_options(&self) -> rglsl_link::Options {
        let binding_shifts = ShaderStage::ALL
            .iter()
            .map(|&stage| (stage, self.shifts(Some(stage))))
            .filter(|(_, shifts)| !shifts.is_empty())
            .collect();
        rglsl_link::Options {
            auto_map_locations: self.options.auto_map_locations,
            auto_map_bindings: self.options.auto_map_bindings,
            binding_shifts,
        }
    }

    fn link(&mut self, units: &[Unit]) -> Result<i32, Exit> {
        let mut objects = Vec::with_capacity(units.len());
        let mut failed = false;
        let mut outcomes = Vec::with_capacity(units.len());
        for unit in units {
            let compiled = self.compile_object(unit);
            self.report_unit(unit, &compiled.log);
            outcomes.push((unit, compiled.object.is_some()));
            match compiled.object {
                Some(object) => objects.push(object),
                None => failed = true,
            }
        }
        if failed {
            self.reflect(&outcomes, &[]);
            self.not_generated();
            return Ok(EXIT_COMPILE);
        }
        let mut linked = match rglsl_link::link_objects_staged(&objects, &self.link_options()) {
            Ok(linked) => linked,
            Err(errors) => {
                let lines: Vec<String> = errors
                    .iter()
                    .map(|&(stage, ref error)| link_line(stage, error))
                    .collect();
                self.report_link(&lines);
                self.reflect(&outcomes, &[]);
                self.not_generated();
                return Ok(EXIT_LINK);
            }
        };
        if !self.options.suppress_warnings && !self.options.suppress_info {
            let warnings: Vec<String> = linked
                .iter()
                .flat_map(|stage| {
                    stage.warnings.iter().map(move |warning| {
                        format!(
                            "WARNING: Linking {name} and {name} stages: {warning}",
                            name = glslang_stage_name(stage.stage)
                        )
                    })
                })
                .collect();
            self.report_link(&warnings);
        }
        linked.sort_by_key(|stage| {
            STAGE_ORDER
                .iter()
                .position(|&candidate| candidate == stage.stage)
        });
        let name = units
            .first()
            .map(|unit| unit.name.clone())
            .unwrap_or_default();
        for stage in &mut linked {
            self.rename_entry_point(&mut stage.module);
        }
        let modules: Vec<(ShaderStage, &Module)> = linked
            .iter()
            .map(|stage| (stage.stage, &stage.module))
            .collect();
        self.reflect(&outcomes, &modules);
        if self.options.spirv {
            for stage in &linked {
                let code = self.emit(stage.stage, &stage.module, &stage.info, &name)?;
                if code != EXIT_SUCCESS {
                    return Ok(code);
                }
            }
        }
        Ok(EXIT_SUCCESS)
    }

    fn emit(
        &mut self,
        stage: ShaderStage,
        module: &Module,
        info: &ModuleInfo,
        name: &str,
    ) -> Result<i32, Exit> {
        let processes = self.processes(stage);
        let debug_info = match self.options.debug {
            Some(Debug::Lines) => Some((spv::DebugLevel::Lines, true)),
            Some(Debug::NonSemantic) => Some((spv::DebugLevel::NonSemantic, false)),
            Some(Debug::NonSemanticSource) => Some((spv::DebugLevel::NonSemantic, true)),
            Some(Debug::Strip) | None => None,
        }
        .map(|(level, source_text)| spv::DebugInfo {
            level,
            source_text,
            processes: &processes,
            entry_point: Some(spv::DebugEntryPoint {
                signature: "rglsl",
                arguments: &self.options.command_line,
                directory: self.directory.as_deref(),
            }),
        });
        let mut flags =
            spv::WriterFlags::LABEL_VARYINGS | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE;
        if self.options.debug != Some(Debug::Strip) {
            flags |= spv::WriterFlags::DEBUG;
        }
        let spv_options = spv::Options {
            lang_version: self.options.target_spirv(),
            debug_info,
            flags,
            mesh_shader_primitive_indices_clamp: false,
            ..spv::Options::default()
        };
        let words = match spv::write_vec(module, info, &spv_options, None) {
            Ok(words) => words,
            Err(error) => {
                if !self.options.suppress_info {
                    output::err!(
                        "ERROR: {name}: cannot generate SPIR-V for the {} stage: {}\n",
                        glslang_stage_name(stage),
                        full_message(&error)
                    );
                }
                self.not_generated();
                return Ok(EXIT_COMPILE);
            }
        };
        let path = self
            .options
            .output
            .clone()
            .unwrap_or_else(|| format!("{}.spv", stage_extension(stage)));
        if !output::write(
            &path,
            &words,
            self.options.hex,
            self.options.variable_name.as_deref(),
        ) {
            return Err(Exit::Printed(format!(
                "ERROR: Failed to open file: {path}\n"
            )));
        }
        self.outputs.push(path);
        if self.options.disassemble {
            output::out!("{}", rglsl_cli::disassemble::disassemble(&words));
        }
        Ok(EXIT_SUCCESS)
    }

    fn write_depfile(&self, units: &[Unit]) -> Result<(), Exit> {
        let Some(ref depfile) = self.options.depfile else {
            return Ok(());
        };
        let mut sources: Vec<String> = units.iter().map(|unit| unit.name.clone()).collect();
        sources.extend(self.included.iter().cloned());
        if output::write_depfile(depfile, &self.outputs, &sources) {
            Ok(())
        } else {
            Err(Exit::Printed(format!(
                "ERROR: Failed to open file: {depfile}\n"
            )))
        }
    }
}

fn link_line(stage: Option<ShaderStage>, error: &rglsl_link::LinkError) -> String {
    match (stage, error) {
        (_, rglsl_link::LinkError::CrossStage { stages, name, what }) => format!(
            "ERROR: Linking {} stages: {what} of `{name}` must match between stages",
            stages.to_lowercase()
        ),
        (Some(stage), _) => format!(
            "ERROR: Linking {} stage: {error}",
            glslang_stage_name(stage)
        ),
        (None, _) => format!("ERROR: Linking: {error}"),
    }
}
