use rglsl_link::{DebugInfo, Macro, OptLevel, OptOptions, Specialization, TargetGpu};

pub const EXIT_SUCCESS: i32 = 0;
pub const EXIT_USAGE: i32 = 1;
pub const EXIT_COMPILE: i32 = 2;
pub const EXIT_LINK: i32 = 3;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum VersionDump {
    Full,
    Bare,
}

#[derive(Debug, Default)]
pub struct Options {
    pub spirv: bool,
    pub link: bool,
    pub object: bool,
    pub preprocess: bool,
    pub disassemble: bool,
    pub spirv_tools_disassembler: bool,
    pub hex: bool,
    pub variable_name: Option<String>,
    pub output: Option<String>,
    pub stage: Option<String>,
    pub entry_point: Option<String>,
    pub macros: Vec<Macro>,
    pub include_dirs: Vec<String>,
    pub vulkan: Option<(u8, u8)>,
    pub spirv_version: Option<(u8, u8)>,
    pub debug: DebugInfo,
    pub invert_y: bool,
    pub nan_clamp: bool,
    pub discard_is_terminate: bool,
    pub enhanced_messages: bool,
    pub validate_io: bool,
    pub quiet: bool,
    pub suppress_info: bool,
    pub suppress_warnings: bool,
    pub error_column: bool,
    pub absolute_path: bool,
    pub stdin: bool,
    pub depfile: Option<String>,
    pub version: Option<VersionDump>,
    pub dump_config: bool,
    pub config_file: Option<String>,
    pub reflect: bool,
    pub reflect_options: rglsl_link::reflect::Options,
    pub optimization: Optimization,
    pub files: Vec<String>,
    pub command_line: String,
}

#[derive(Debug, Default)]
pub struct Optimization {
    pub level: Option<OptLevel>,
    pub disabled: bool,
    pub target_gpu: Option<TargetGpu>,
    pub passes: Option<Vec<String>>,
    pub validate_each: bool,
    pub specialization: Vec<Specialization>,
}

impl Optimization {
    pub fn options(&self) -> OptOptions {
        let defaults = OptOptions::default();
        OptOptions {
            level: if self.disabled {
                OptLevel::Disabled
            } else {
                self.level.unwrap_or(defaults.level)
            },
            target_gpu: self.target_gpu.unwrap_or(defaults.target_gpu),
            passes: self.passes.clone(),
            validate_each: self.validate_each || defaults.validate_each,
            specialization: self.specialization.clone(),
        }
    }

    const fn requested(&self) -> bool {
        matches!(self.level, Some(OptLevel::Performance | OptLevel::Size))
            || self.passes.is_some()
            || !self.specialization.is_empty()
    }
}

impl Options {
    pub const fn target_spirv(&self) -> (u8, u8) {
        match (self.spirv_version, self.vulkan) {
            (Some(version), _) => version,
            (None, Some((1, 1))) => (1, 3),
            (None, Some((1, 2))) => (1, 5),
            (None, Some((1, 3 | 4))) => (1, 6),
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
}

struct Cursor {
    arguments: Vec<String>,
    index: usize,
}

impl Cursor {
    fn current(&self) -> &str {
        self.arguments.get(self.index).map_or("", String::as_str)
    }

    fn take_next(&mut self) -> Option<String> {
        let value = self.arguments.get(self.index + 1).cloned();
        if value.is_some() {
            self.index += 1;
        }
        value
    }
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

const TARGET_ENV_EXPECTED: &str = "--target-env expected one of: vulkan1.0, vulkan1.1, vulkan1.2,\nvulkan1.3, vulkan1.4, spirv1.0, spirv1.1, spirv1.2, spirv1.3,\nspirv1.4, spirv1.5 or spirv1.6";

fn set_vulkan(options: &mut Options) {
    options.spirv = true;
    options.link = true;
}

fn long_option(cursor: &mut Cursor, options: &mut Options) -> Result<(), Exit> {
    let argument = cursor.current().to_owned();
    let word = argument.get(2..).unwrap_or_default().to_ascii_lowercase();
    match word.as_str() {
        "client" => match cursor.take_next().as_deref() {
            Some("vulkan100") => set_vulkan(options),
            _ => return Err(Exit::detailed("expects vulkan100", word)),
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
        "spirv-dis" => options.spirv_tools_disassembler = true,
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
        "preamble-text" | "p" => match cursor.take_next() {
            Some(text) => options.macros.push(Macro::Text(first_line(&text))),
            None => return Err(Exit::detailed("expects <text>", argument)),
        },
        "validate-io" => options.validate_io = true,
        "target-gpu" => match cursor.take_next() {
            Some(name) => match TargetGpu::from_name(&name) {
                Some(gpu) => options.optimization.target_gpu = Some(gpu),
                None => {
                    return Err(Exit::detailed(
                        format!(
                            "expects one of: {}",
                            TargetGpu::names().collect::<Vec<_>>().join(", ")
                        ),
                        word,
                    ));
                }
            },
            None => return Err(Exit::detailed("no <gpu> provided", word)),
        },
        "opt-passes" => match cursor.take_next() {
            Some(list) => {
                options.optimization.passes = Some(
                    list.split(',')
                        .filter(|name| !name.is_empty())
                        .map(str::to_owned)
                        .collect(),
                );
            }
            None => return Err(Exit::detailed("no <pass,...> provided", word)),
        },
        "opt-validate-each" => options.optimization.validate_each = true,
        "specialize" => match cursor.take_next() {
            Some(list) => match Specialization::parse_list(&list) {
                Ok(values) if !values.is_empty() => {
                    options.optimization.specialization.extend(values);
                }
                Ok(_) => return Err(Exit::detailed("no <id>:<value> provided", word)),
                Err(error) => return Err(Exit::detailed(error, word)),
            },
            None => return Err(Exit::detailed("no <id>:<value> provided", word)),
        },
        "invert-y" | "iy" => options.invert_y = true,
        "nan-clamp" => options.nan_clamp = true,
        "discard-is-terminate" => options.discard_is_terminate = true,
        "enhanced-msgs" => options.enhanced_messages = true,
        "reflect-strict-array-suffix" => options.reflect_options.strict_array_suffix = true,
        "reflect-basic-array-suffix" => options.reflect_options.basic_array_suffix = true,
        "reflect-intermediate-io" => options.reflect_options.intermediate_io = true,
        "reflect-separate-buffers" => options.reflect_options.separate_buffers = true,
        "reflect-all-block-variables" => options.reflect_options.all_block_variables = true,
        "reflect-unwrap-io-blocks" => options.reflect_options.unwrap_io_blocks = true,
        "reflect-all-io-variables" => options.reflect_options.all_io_variables = true,
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
        'd' if argument == "-dumpversion" || argument == "-dumpfullversion" => {
            options.version = Some(VersionDump::Bare);
        }
        'D' => {
            let definition = attached(&argument, "-D<name[=def]>")?;
            options.macros.push(Macro::Define(first_line(definition)));
        }
        'U' => {
            let name = attached(&argument, "-U<name>")?;
            options.macros.push(Macro::Undefine(first_line(name)));
        }
        'E' => options.preprocess = true,
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
            None => options.optimization.level = Some(OptLevel::Performance),
            Some('s') => options.optimization.level = Some(OptLevel::Size),
            Some('d') => options.optimization.disabled = true,
            Some(_) => return Err(Exit::error("unknown -O option")),
        },
        'P' => {
            let text = attached(&argument, "-P<text>")?;
            options.macros.push(Macro::Text(first_line(text)));
        }
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
                Some('0') => DebugInfo::Stripped,
                Some('N') => DebugInfo::FileName,
                Some('V') if rest.chars().nth(1) == Some('S') => DebugInfo::NonSemanticWithSource,
                Some('V') => DebugInfo::NonSemantic,
                _ => DebugInfo::Lines,
            };
        }
        'h' => return Err(Exit::Usage),
        'l' => options.link = true,
        'o' => match cursor.take_next() {
            Some(output) => options.output = Some(output),
            None => return Err(Exit::error("no <file> provided for -o")),
        },
        'q' => options.reflect = true,
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
    if options.preprocess && options.reflect {
        return Err(Exit::error(
            "reflection requires linking, which can't be used when -E when is selected",
        ));
    }
    if options.reflect && !options.link {
        return Err(Exit::error("reflection requires -l for linking"));
    }
    if options.validate_io && !options.link {
        return Err(Exit::error(
            "cross stage IO validation requires -l for linking",
        ));
    }
    if options.output.is_some() && !options.spirv && !options.object {
        return Err(Exit::error("no binary generation requested (e.g., -V)"));
    }
    if options.spirv_version.is_some() && !options.spirv {
        return Err(Exit::error(
            "To generate SPIR-V, also specify client semantics. See -G and -V.",
        ));
    }
    if let Err(error) = options.optimization.options().check() {
        return Err(Exit::detailed(error.to_string(), "--opt-passes"));
    }
    if options.object && options.optimization.requested() {
        return Err(Exit::error(
            "`--object` writes object modules, which are never optimized; -O, -Os, --opt-passes and --specialize apply when they are linked",
        ));
    }
    if options.object && options.link {
        return Err(Exit::error(
            "`--object` writes object modules and cannot be combined with linking (-l, -V, -H, --target-env vulkan...)",
        ));
    }
    Ok(options)
}
