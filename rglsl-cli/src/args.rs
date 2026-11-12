use rglsl::proc::ResourceClass;
use rglsl::ShaderStage;

pub const EXIT_SUCCESS: i32 = 0;
pub const EXIT_USAGE: i32 = 1;
pub const EXIT_COMPILE: i32 = 2;
pub const EXIT_LINK: i32 = 3;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Debug {
    Lines,
    NonSemantic,
    NonSemanticSource,
    Strip,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum VersionDump {
    Full,
    Bare,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Macro {
    Define(String),
    Undefine(String),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Shift {
    pub class: ResourceClass,
    pub stage: Option<ShaderStage>,
    pub base: Option<u32>,
    pub per_set: Vec<(u32, u32)>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ResourceSet {
    pub stage: Option<ShaderStage>,
    pub values: Vec<String>,
}

#[derive(Debug, Default)]
pub struct Options {
    pub spirv: bool,
    pub link: bool,
    pub object: bool,
    pub preprocess: bool,
    pub disassemble: bool,
    pub hex: bool,
    pub variable_name: Option<String>,
    pub output: Option<String>,
    pub stage: Option<String>,
    pub entry_point: Option<String>,
    pub source_entry_point: Option<String>,
    pub macros: Vec<Macro>,
    pub include_dirs: Vec<String>,
    pub vulkan: Option<(u8, u8)>,
    pub spirv_version: Option<(u8, u8)>,
    pub debug: Option<Debug>,
    pub auto_map_bindings: bool,
    pub auto_map_locations: bool,
    pub keep_uncalled: bool,
    pub hlsl_offsets: bool,
    pub shifts: Vec<Shift>,
    pub resource_sets: Vec<ResourceSet>,
    pub quiet: bool,
    pub suppress_info: bool,
    pub suppress_warnings: bool,
    pub relaxed_errors: bool,
    pub relax_set_binding_limits: bool,
    pub error_column: bool,
    pub absolute_path: bool,
    pub stdin: bool,
    pub depfile: Option<String>,
    pub version: Option<VersionDump>,
    pub dump_config: bool,
    pub config_file: Option<String>,
    pub files: Vec<String>,
    pub command_line: String,
}

impl Options {
    pub const fn target_spirv(&self) -> (u8, u8) {
        match (self.spirv_version, self.vulkan) {
            (Some(version), _) => version,
            (None, Some((1, 1))) => (1, 3),
            (None, Some((1, 2))) => (1, 5),
            (None, Some((1, 3) | (1, 4))) => (1, 6),
            (None, _) => (1, 0),
        }
    }

    pub const fn vulkan_version(&self) -> (u8, u8) {
        match self.vulkan {
            Some(version) => version,
            None => (1, 0),
        }
    }
}

#[derive(Debug)]
pub enum Exit {
    Usage,
    Error {
        detail: Option<String>,
        message: String,
    },
    Printed(String),
}

impl Exit {
    pub fn error(message: impl Into<String>) -> Self {
        Self::Error {
            detail: None,
            message: message.into(),
        }
    }

    pub fn detailed(message: impl Into<String>, detail: impl Into<String>) -> Self {
        Self::Error {
            detail: Some(detail.into()),
            message: message.into(),
        }
    }

    fn unsupported(option: &str, what: &str) -> Self {
        Self::detailed(format!("{what} is not supported by rglsl"), option)
    }

    pub fn out_of_scope(option: &str) -> Self {
        Self::detailed(
            "rglsl compiles Vulkan GLSL 450 and 460 to SPIR-V only; OpenGL, HLSL and other GLSL versions are not supported",
            option,
        )
    }
}

pub fn stage_from_name(name: &str) -> Option<ShaderStage> {
    Some(match name {
        "vert" => ShaderStage::Vertex,
        "tesc" => ShaderStage::TessControl,
        "tese" => ShaderStage::TessEvaluation,
        "geom" => ShaderStage::Geometry,
        "frag" => ShaderStage::Fragment,
        "comp" => ShaderStage::Compute,
        "rgen" => ShaderStage::RayGeneration,
        "rint" => ShaderStage::Intersection,
        "rahit" => ShaderStage::AnyHit,
        "rchit" => ShaderStage::ClosestHit,
        "rmiss" => ShaderStage::Miss,
        "rcall" => ShaderStage::Callable,
        "mesh" => ShaderStage::Mesh,
        "task" => ShaderStage::Task,
        _ => return None,
    })
}

struct Cursor {
    arguments: Vec<String>,
    index: usize,
}

impl Cursor {
    fn current(&self) -> &str {
        self.arguments.get(self.index).map_or("", String::as_str)
    }

    fn next(&self) -> Option<&str> {
        self.arguments.get(self.index + 1).map(String::as_str)
    }

    fn take_next(&mut self) -> Option<String> {
        let value = self.arguments.get(self.index + 1).cloned();
        if value.is_some() {
            self.index += 1;
        }
        value
    }

    fn remaining(&self) -> usize {
        self.arguments.len().saturating_sub(self.index)
    }

    fn peek(&self, offset: usize) -> Option<&str> {
        self.arguments.get(self.index + offset).map(String::as_str)
    }
}

fn starts_with_digit(text: &str) -> bool {
    text.chars()
        .next()
        .is_some_and(|first| first.is_ascii_digit())
}

fn leading_number(text: &str) -> u32 {
    let digits: String = text.chars().take_while(char::is_ascii_digit).collect();
    digits.parse().unwrap_or(0)
}

fn attached_number(text: &str) -> i64 {
    let digits: String = text
        .chars()
        .enumerate()
        .take_while(|&(index, character)| {
            character.is_ascii_digit() || (index == 0 && (character == '-' || character == '+'))
        })
        .map(|(_, character)| character)
        .collect();
    digits.parse().unwrap_or(0)
}

fn shift_class(word: &str) -> Option<ResourceClass> {
    Some(match word {
        "shift-image-bindings" | "shift-image-binding" | "sib" => ResourceClass::Image,
        "shift-sampler-bindings" | "shift-sampler-binding" | "ssb" => ResourceClass::Sampler,
        "shift-uav-bindings" | "shift-uav-binding" | "suavb" => ResourceClass::UnorderedAccess,
        "shift-texture-bindings" | "shift-texture-binding" | "stb" => ResourceClass::Texture,
        "shift-ubo-bindings"
        | "shift-ubo-binding"
        | "shift-cbuffer-bindings"
        | "shift-cbuffer-binding"
        | "sub"
        | "scb" => ResourceClass::UniformBuffer,
        "shift-ssbo-bindings" | "shift-ssbo-binding" | "sbb" => ResourceClass::StorageBuffer,
        "shift-combined-sampler-bindings" | "shift-combined-sampler-binding" | "scsb" => {
            ResourceClass::CombinedSampler
        }
        "shift-as-bindings" | "shift-as-binding" | "sab" => ResourceClass::AccelerationStructure,
        _ => return None,
    })
}

fn binding_base(cursor: &mut Cursor, class: ResourceClass) -> Result<Shift, Exit> {
    if cursor.remaining() < 2 {
        return Err(Exit::Usage);
    }
    let mut offset = 1;
    let mut stage = None;
    if !starts_with_digit(cursor.peek(offset).unwrap_or_default()) {
        if cursor.remaining() < 3 {
            return Err(Exit::Usage);
        }
        stage = Some(stage_from_name(cursor.peek(offset).unwrap_or_default()).ok_or(Exit::Usage)?);
        offset += 1;
    }
    let pair_follows = |cursor: &Cursor, offset: usize| {
        cursor.remaining() >= offset + 2
            && starts_with_digit(cursor.peek(offset).unwrap_or_default())
            && starts_with_digit(cursor.peek(offset + 1).unwrap_or_default())
    };
    let mut shift = Shift {
        class,
        stage,
        base: None,
        per_set: Vec::new(),
    };
    if pair_follows(cursor, offset) {
        while pair_follows(cursor, offset) {
            let base = leading_number(cursor.peek(offset).unwrap_or_default());
            let set = leading_number(cursor.peek(offset + 1).unwrap_or_default());
            shift.per_set.retain(|&(existing, _)| existing != set);
            shift.per_set.push((set, base));
            offset += 2;
        }
    } else {
        shift.base = Some(leading_number(cursor.peek(offset).unwrap_or_default()));
        offset += 1;
    }
    cursor.index += offset - 1;
    Ok(shift)
}

fn resource_set_binding(cursor: &mut Cursor) -> Result<ResourceSet, Exit> {
    if cursor.remaining() < 2 {
        return Err(Exit::Usage);
    }
    let first = cursor.next().unwrap_or_default().to_owned();
    if starts_with_digit(&first) {
        cursor.index += 1;
        return Ok(ResourceSet {
            stage: None,
            values: vec![first],
        });
    }
    if cursor.remaining() < 3 {
        return Err(Exit::Usage);
    }
    let stage = stage_from_name(&first).ok_or(Exit::Usage)?;
    cursor.index += 1;
    let mut values = Vec::new();
    while let Some(value) = cursor.next() {
        if value.starts_with('-') {
            break;
        }
        values.push(value.to_owned());
        cursor.index += 1;
    }
    if values.len() != 1 && values.len() % 3 != 0 {
        return Err(Exit::Usage);
    }
    Ok(ResourceSet {
        stage: Some(stage),
        values,
    })
}

const TARGET_ENV_EXPECTED: &str = "--target-env expected one of: vulkan1.0, vulkan1.1, vulkan1.2,\nvulkan1.3, vulkan1.4, opengl, spirv1.0, spirv1.1, spirv1.2, spirv1.3,\nspirv1.4, spirv1.5 or spirv1.6";

fn set_vulkan(options: &mut Options) {
    options.spirv = true;
    options.link = true;
}

fn long_option(cursor: &mut Cursor, options: &mut Options) -> Result<(), Exit> {
    let argument = cursor.current().to_owned();
    let word = argument.get(2..).unwrap_or_default().to_ascii_lowercase();
    if let Some(class) = shift_class(&word) {
        let shift = binding_base(cursor, class)?;
        options.shifts.push(shift);
        return Ok(());
    }
    match word.as_str() {
        "auto-map-bindings" | "auto-map-binding" | "amb" => options.auto_map_bindings = true,
        "auto-map-locations" | "aml" => options.auto_map_locations = true,
        "relax-set-binding-limits" => options.relax_set_binding_limits = true,
        "client" => match cursor.take_next().as_deref() {
            Some("vulkan100") => set_vulkan(options),
            Some("opengl100") => return Err(Exit::out_of_scope(&word)),
            _ => return Err(Exit::detailed("expects vulkan100 or opengl100", word)),
        },
        "define-macro" | "d" => match cursor.take_next() {
            Some(definition) => options.macros.push(Macro::Define(first_line(&definition))),
            None => return Err(Exit::detailed("expects <name[=def]>", argument)),
        },
        "undef-macro" | "u" => match cursor.take_next() {
            Some(name) => options.macros.push(Macro::Undefine(first_line(&name))),
            None => return Err(Exit::detailed("expects <name>", argument)),
        },
        "entry-point" => match cursor.take_next() {
            Some(name) => options.entry_point = Some(name),
            None => return Err(Exit::detailed("no <name> provided", word)),
        },
        "source-entrypoint" | "sep" => match cursor.take_next() {
            Some(name) => options.source_entry_point = Some(name),
            None => return Err(Exit::detailed("no <entry-point> provided", word)),
        },
        "hlsl-offsets" => options.hlsl_offsets = true,
        "keep-uncalled" | "ku" => options.keep_uncalled = true,
        "relaxed-errors" => options.relaxed_errors = true,
        "resource-set-bindings" | "resource-set-binding" | "rsb" => {
            let set = resource_set_binding(cursor)?;
            options.resource_sets.push(set);
        }
        "spirv-dis" => options.disassemble = true,
        "spirv-val" => {}
        "stdin" => options.stdin = true,
        "suppress-warnings" => options.suppress_warnings = true,
        "target-env" => {
            if let Some(target) = cursor.take_next() {
                match target.as_str() {
                    "vulkan1.0" => options.vulkan = Some((1, 0)),
                    "vulkan1.1" => options.vulkan = Some((1, 1)),
                    "vulkan1.2" => options.vulkan = Some((1, 2)),
                    "vulkan1.3" => options.vulkan = Some((1, 3)),
                    "vulkan1.4" => options.vulkan = Some((1, 4)),
                    "spirv1.0" => options.spirv_version = Some((1, 0)),
                    "spirv1.1" => options.spirv_version = Some((1, 1)),
                    "spirv1.2" => options.spirv_version = Some((1, 2)),
                    "spirv1.3" => options.spirv_version = Some((1, 3)),
                    "spirv1.4" => options.spirv_version = Some((1, 4)),
                    "spirv1.5" => options.spirv_version = Some((1, 5)),
                    "spirv1.6" => options.spirv_version = Some((1, 6)),
                    "opengl" => return Err(Exit::out_of_scope("--target-env opengl")),
                    _ => return Err(Exit::error(TARGET_ENV_EXPECTED)),
                }
                if target.starts_with("vulkan") {
                    set_vulkan(options);
                }
            }
        }
        "variable-name" | "vn" => {
            options.hex = true;
            match cursor.take_next() {
                Some(name) => options.variable_name = Some(name),
                None => return Err(Exit::detailed("no <C-variable-name> provided", word)),
            }
        }
        "quiet" => options.quiet = true,
        "depfile" => match cursor.take_next() {
            Some(name) => options.depfile = Some(name),
            None => return Err(Exit::detailed("no <depfile-name> provided", word)),
        },
        "version" => options.version = Some(VersionDump::Full),
        "error-column" => options.error_column = true,
        "absolute-path" => options.absolute_path = true,
        "help" => return Err(Exit::Usage),
        "object" => options.object = true,
        "link" => set_vulkan(options),
        "glsl-version"
        | "hlsl-iomap"
        | "hlsl-iomapper"
        | "hlsl-iomapping"
        | "hlsl-enable-16bit-types"
        | "hlsl-dx9-compatible"
        | "hlsl-dx-position-w"
        | "flatten-uniform-arrays"
        | "flatten-uniform-array"
        | "fua"
        | "uniform-base"
        | "set-block-storage"
        | "sbs"
        | "set-atomic-counter-block"
        | "sacb"
        | "set-default-uniform-block"
        | "sdub" => return Err(Exit::out_of_scope(&argument)),
        "preamble-text" | "p" => return Err(Exit::unsupported(&argument, "preamble text")),
        "no-link" => {
            return Err(Exit::unsupported(
                &argument,
                "SPIR-V with linkage (use `--object` for rglsl object modules)",
            ))
        }
        "lto" => return Err(Exit::unsupported(&argument, "link time optimization")),
        "validate-io" => return Err(Exit::unsupported(&argument, "cross stage IO validation")),
        "bindings-per-resource-type" => {
            return Err(Exit::unsupported(
                &argument,
                "a binding space per resource type",
            ))
        }
        "invert-y" | "iy" => return Err(Exit::unsupported(&argument, "inverting position.y")),
        "nan-clamp" => return Err(Exit::unsupported(&argument, "NaN clamping")),
        "auto-sampled-textures" => {
            return Err(Exit::unsupported(
                &argument,
                "converting textures to sampled textures",
            ))
        }
        "no-storage-format" | "nsf" => {
            return Err(Exit::unsupported(&argument, "the Unknown image format"))
        }
        "discard-is-terminate" => {
            return Err(Exit::unsupported(
                &argument,
                "discard as OpTerminateInvocation",
            ))
        }
        "enhanced-msgs" => return Err(Exit::unsupported(&argument, "enhanced messages")),
        "dump-builtin-symbols" => {
            return Err(Exit::unsupported(
                &argument,
                "dumping the built-in symbol table",
            ))
        }
        reflection if reflection.starts_with("reflect-") => {
            return Err(Exit::unsupported(&argument, "reflection"))
        }
        _ => return Err(Exit::detailed("unrecognized command-line option", argument)),
    }
    Ok(())
}

fn first_line(text: &str) -> String {
    text.split('\n').next().unwrap_or_default().to_owned()
}

fn attached<'a>(argument: &'a str, description: &str) -> Result<&'a str, Exit> {
    match argument.get(2..) {
        Some(operand) if !operand.is_empty() => Ok(operand),
        _ => Err(Exit::Printed(format!(
            "{description} must immediately follow option (no spaces)\n"
        ))),
    }
}

fn short_option(cursor: &mut Cursor, options: &mut Options) -> Result<(), Exit> {
    let argument = cursor.current().to_owned();
    let mut characters = argument.chars().skip(1);
    let option = characters.next().unwrap_or_default();
    let rest: String = characters.collect();
    match option {
        'C' | 't' | 'd' if argument != "-dumpversion" && argument != "-dumpfullversion" => {}
        'd' => options.version = Some(VersionDump::Bare),
        'D' if rest.is_empty() => return Err(Exit::out_of_scope("-D")),
        'D' => {
            let definition = attached(&argument, "-D<name[=def]>")?;
            options.macros.push(Macro::Define(first_line(definition)));
        }
        'U' => {
            let name = attached(&argument, "-U<name>")?;
            options.macros.push(Macro::Undefine(first_line(name)));
        }
        'E' => options.preprocess = true,
        'G' | 'u' | 'R' | 'f' => return Err(Exit::out_of_scope(&argument)),
        'H' => {
            options.disassemble = true;
            if !options.spirv {
                set_vulkan(options);
            }
        }
        'I' => {
            let directory = attached(&argument, "-I<dir> include path")?;
            options.include_dirs.push(directory.to_owned());
        }
        'O' => match rest.chars().next() {
            Some('d' | 's') | None => {}
            Some(_) => return Err(Exit::error("unknown -O option")),
        },
        'P' => return Err(Exit::unsupported(&argument, "preamble text")),
        'S' => match cursor.take_next() {
            Some(stage) => options.stage = Some(stage),
            None => return Err(Exit::error("no <stage> specified for -S")),
        },
        'V' => {
            set_vulkan(options);
            if !rest.is_empty() {
                let version = attached_number(&rest);
                if version == 0 {
                    return Err(Exit::Printed(String::from(
                        "-V<num> client input semantics: expected attached non-0 number\n",
                    )));
                }
                if version != 100 {
                    return Err(Exit::error("unknown client version for -V, should be 100"));
                }
            }
        }
        'c' => options.dump_config = true,
        'e' => match cursor.take_next() {
            Some(name) => options.entry_point = Some(name),
            None => return Err(Exit::error("no <name> provided for -e")),
        },
        'g' => {
            options.debug = match rest.chars().next() {
                Some('0') => Some(Debug::Strip),
                Some('N') => {
                    return Err(Exit::unsupported(
                        &argument,
                        "debug information with the source file name only",
                    ))
                }
                Some('V') if rest.chars().nth(1) == Some('S') => Some(Debug::NonSemanticSource),
                Some('V') => Some(Debug::NonSemantic),
                _ => Some(Debug::Lines),
            };
        }
        'h' => return Err(Exit::Usage),
        'i' => {}
        'l' => options.link = true,
        'm' => return Err(Exit::unsupported(&argument, "memory leak mode")),
        'o' => match cursor.take_next() {
            Some(output) => options.output = Some(output),
            None => return Err(Exit::error("no <file> provided for -o")),
        },
        'q' => {
            return Err(Exit::unsupported(
                &argument,
                "the reflection query database",
            ))
        }
        'r' => options.relaxed_errors = true,
        's' => options.suppress_info = true,
        'v' => options.version = Some(VersionDump::Full),
        'w' => options.suppress_warnings = true,
        'x' => options.hex = true,
        _ => return Err(Exit::detailed("unrecognized command-line option", argument)),
    }
    Ok(())
}

pub fn parse(arguments: Vec<String>) -> Result<Options, Exit> {
    let mut options = Options {
        command_line: arguments.join(" "),
        ..Options::default()
    };
    let mut cursor = Cursor {
        arguments,
        index: 0,
    };
    while cursor.index < cursor.arguments.len() {
        let argument = cursor.current().to_owned();
        if argument.starts_with("--") {
            long_option(&mut cursor, &mut options)?;
        } else if argument.starts_with('-') {
            short_option(&mut cursor, &mut options)?;
        } else if argument.len() >= 5 && argument.ends_with(".conf") {
            options.config_file = Some(argument);
        } else {
            options.files.push(argument);
        }
        cursor.index += 1;
    }
    if options.stdin && options.stage.is_none() {
        return Err(Exit::error("must provide -S when --stdin is given"));
    }
    if options.preprocess && options.link {
        return Err(Exit::error("can't use -E when linking is selected"));
    }
    if options.output.is_some() && !options.spirv && !options.object {
        return Err(Exit::error("no binary generation requested (e.g., -V)"));
    }
    if options.spirv_version.is_some() && !options.spirv {
        return Err(Exit::error(
            "To generate SPIR-V, also specify client semantics. See -G and -V.",
        ));
    }
    if options.object && options.link {
        return Err(Exit::error(
            "`--object` writes object modules and cannot be combined with linking (-l, -V, -H, --target-env vulkan..., --link)",
        ));
    }
    Ok(options)
}
