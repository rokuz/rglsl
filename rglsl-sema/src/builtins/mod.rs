mod functions;
mod limits;
pub(crate) mod ray;
pub(crate) mod subgroup;
mod textures;
mod variables;

pub use variables::view_extension;
pub(crate) use variables::{TENSOR_OPERAND_NONTEMPORAL, TENSOR_OPERAND_OUT_OF_BOUNDS_VALUE};

use alloc::collections::{BTreeMap, BTreeSet};
use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::BasicType;
use rglsl_ast::Span;

pub use limits::ResourceLimits;

use crate::scope::{Direction, Function, Parameter, Qualifiers, Symbol, SymbolId};
use crate::types::{ArraySize, Opaque, Type, TypeRegistry};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Stage {
    Vertex,
    TessControl,
    TessEvaluation,
    Geometry,
    Fragment,
    Compute,
    Task,
    Mesh,
    RayGeneration,
    Intersection,
    AnyHit,
    ClosestHit,
    Miss,
    Callable,
}

impl Stage {
    pub const ALL: [Self; 14] = [
        Self::Vertex,
        Self::TessControl,
        Self::TessEvaluation,
        Self::Geometry,
        Self::Fragment,
        Self::Compute,
        Self::Task,
        Self::Mesh,
        Self::RayGeneration,
        Self::Intersection,
        Self::AnyHit,
        Self::ClosestHit,
        Self::Miss,
        Self::Callable,
    ];

    pub fn from_extension(extension: &str) -> Option<Self> {
        Some(match extension {
            "vert" => Self::Vertex,
            "tesc" => Self::TessControl,
            "tese" => Self::TessEvaluation,
            "geom" => Self::Geometry,
            "frag" => Self::Fragment,
            "comp" => Self::Compute,
            "task" => Self::Task,
            "mesh" => Self::Mesh,
            "rgen" => Self::RayGeneration,
            "rint" => Self::Intersection,
            "rahit" => Self::AnyHit,
            "rchit" => Self::ClosestHit,
            "rmiss" => Self::Miss,
            "rcall" => Self::Callable,
            _ => return None,
        })
    }

    pub const fn name(self) -> &'static str {
        match self {
            Self::Vertex => "vertex",
            Self::TessControl => "tessellation control",
            Self::TessEvaluation => "tessellation evaluation",
            Self::Geometry => "geometry",
            Self::Fragment => "fragment",
            Self::Compute => "compute",
            Self::Task => "task",
            Self::Mesh => "mesh",
            Self::RayGeneration => "ray generation",
            Self::Intersection => "intersection",
            Self::AnyHit => "any-hit",
            Self::ClosestHit => "closest-hit",
            Self::Miss => "miss",
            Self::Callable => "callable",
        }
    }

    const fn mask(self) -> u16 {
        match self {
            Self::Vertex => VERTEX,
            Self::TessControl => TESS_CONTROL,
            Self::TessEvaluation => TESS_EVALUATION,
            Self::Geometry => GEOMETRY,
            Self::Fragment => FRAGMENT,
            Self::Compute => COMPUTE,
            Self::Task => TASK,
            Self::Mesh => MESH,
            Self::RayGeneration => RAY_GENERATION,
            Self::Intersection => INTERSECTION,
            Self::AnyHit => ANY_HIT,
            Self::ClosestHit => CLOSEST_HIT,
            Self::Miss => MISS,
            Self::Callable => CALLABLE,
        }
    }

    pub const fn ray_tracing(self) -> bool {
        matches!(
            self,
            Self::RayGeneration
                | Self::Intersection
                | Self::AnyHit
                | Self::ClosestHit
                | Self::Miss
                | Self::Callable
        )
    }
}

const VERTEX: u16 = 1;
const TESS_CONTROL: u16 = 1 << 1;
const TESS_EVALUATION: u16 = 1 << 2;
const GEOMETRY: u16 = 1 << 3;
const FRAGMENT: u16 = 1 << 4;
const COMPUTE: u16 = 1 << 5;
const TASK: u16 = 1 << 6;
const MESH: u16 = 1 << 7;
const RAY_GENERATION: u16 = 1 << 8;
const INTERSECTION: u16 = 1 << 9;
const ANY_HIT: u16 = 1 << 10;
const CLOSEST_HIT: u16 = 1 << 11;
const MISS: u16 = 1 << 12;
const CALLABLE: u16 = 1 << 13;
const ALL_STAGES: u16 = 0;

const fn available(stages: u16, stage: Stage) -> bool {
    stages == ALL_STAGES || stages & stage.mask() != 0
}

struct Section {
    text: &'static str,
    doubles: bool,
    halves: bool,
    stages: u16,
    since: u32,
}

impl Section {
    const fn new(text: &'static str) -> Self {
        Self {
            text,
            doubles: false,
            halves: false,
            stages: ALL_STAGES,
            since: 450,
        }
    }

    const fn with_doubles(self) -> Self {
        Self {
            doubles: true,
            ..self
        }
    }

    const fn with_halves(self) -> Self {
        Self {
            halves: true,
            ..self
        }
    }

    const fn in_stages(self, stages: u16) -> Self {
        Self { stages, ..self }
    }

    const fn since(self, since: u32) -> Self {
        Self { since, ..self }
    }
}

struct Prototype {
    name: String,
    result: Type,
    parameters: Vec<(Type, Direction)>,
    stages: u16,
}

pub(crate) fn parse_type(word: &str) -> Option<Type> {
    if word == "void" {
        return Some(Type::VOID);
    }
    if let Some(basic) = BasicType::from_keyword(word) {
        return Some(Type::from(basic));
    }
    if let Some(long) = long_vector_type(word) {
        return Some(long);
    }
    Opaque::from_keyword(word).map(Type::opaque)
}

fn long_vector_type(word: &str) -> Option<Type> {
    let digits = word.trim_end_matches(|character: char| character.is_ascii_digit());
    let size: u32 = word.get(digits.len()..)?.parse().ok()?;
    if size <= 4 {
        return None;
    }
    let scalar = crate::types::Scalar::ALL
        .into_iter()
        .find(|scalar| scalar.vector_prefix() == digits)?;
    Some(Type::new(crate::types::TypeKind::LongVector {
        scalar,
        size: crate::types::ArraySize::Sized(size),
    }))
}

fn words(text: &str) -> Vec<&str> {
    let mut found = Vec::new();
    let mut start = None;
    for (index, character) in text.char_indices() {
        let is_word = character.is_ascii_alphanumeric() || character == '_';
        match (start, is_word) {
            (None, true) => start = Some(index),
            (Some(begin), false) => {
                found.extend(text.get(begin..index));
                start = None;
            }
            _ => {}
        }
        if !is_word && !character.is_whitespace() {
            found.extend(text.get(index..index + character.len_utf8()));
        }
    }
    if let Some(begin) = start {
        found.extend(text.get(begin..));
    }
    found
}

const SIZED_STEMS: [&str; 23] = [
    "vec",
    "ivec",
    "uvec",
    "bvec",
    "dvec",
    "mat",
    "dmat",
    "f16vec",
    "f16mat",
    "i64vec",
    "u64vec",
    "i16vec",
    "u16vec",
    "i8vec",
    "u8vec",
    "bf16vec",
    "fe4m3vec",
    "fe5m2vec",
    "fe2m1vec",
    "fe3m2vec",
    "fe2m3vec",
    "fue8m0vec",
    "fmxint8vec",
];

#[derive(Clone, Copy, Default)]
struct Sizes {
    generic: u8,
    size: u8,
    columns: u8,
    rows: u8,
}

fn generic_scalar(word: &str) -> Option<(&'static str, &'static str)> {
    Some(match word {
        "genF" => ("float", "vec"),
        "genD" => ("double", "dvec"),
        "genI" => ("int", "ivec"),
        "genU" => ("uint", "uvec"),
        "genB" => ("bool", "bvec"),
        "genH" => ("float16_t", "f16vec"),
        "genI64" => ("int64_t", "i64vec"),
        "genU64" => ("uint64_t", "u64vec"),
        "genI16" => ("int16_t", "i16vec"),
        "genU16" => ("uint16_t", "u16vec"),
        "genI8" => ("int8_t", "i8vec"),
        "genU8" => ("uint8_t", "u8vec"),
        _ => return None,
    })
}

fn shaped(word: &str) -> Option<(&str, &str)> {
    for suffix in ["CxR", "RxC", "C", "R", "N"] {
        if let Some(stem) = word.strip_suffix(suffix) {
            if SIZED_STEMS.contains(&stem) {
                return Some((stem, suffix));
            }
        }
    }
    None
}

fn substitute(word: &str, sizes: Sizes) -> String {
    use alloc::format;
    if let Some((scalar, vector)) = generic_scalar(word) {
        return if sizes.generic <= 1 {
            String::from(scalar)
        } else {
            format!("{vector}{}", sizes.generic)
        };
    }
    match shaped(word) {
        Some((stem, "N")) => format!("{stem}{}", sizes.size),
        Some((stem, "C")) => format!("{stem}{}", sizes.columns),
        Some((stem, "R")) => format!("{stem}{}", sizes.rows),
        Some((stem, "CxR")) => format!("{stem}{}x{}", sizes.columns, sizes.rows),
        Some((stem, "RxC")) => format!("{stem}{}x{}", sizes.rows, sizes.columns),
        _ => String::from(word),
    }
}

fn variant_word(word: &str, half: bool) -> String {
    use alloc::format;
    let (generic, scalar, prefix) = if half {
        ("genH", "float16_t", "f16")
    } else {
        ("genD", "double", "d")
    };
    match word {
        "genF" => String::from(generic),
        "float" => String::from(scalar),
        _ if matches!(shaped(word), Some(("vec" | "mat", _)))
            || (parse_type(word).is_some()
                && (word.starts_with("vec") || word.starts_with("mat"))) =>
        {
            format!("{prefix}{word}")
        }
        _ => String::from(word),
    }
}

fn parse_prototype(words: &[String], stages: u16) -> Option<Prototype> {
    let mut iterator = words.iter().map(String::as_str).peekable();
    let result = parse_type(iterator.next()?)?;
    let name = String::from(iterator.next()?);
    if iterator.next()? != "(" {
        return None;
    }
    let mut parameters = Vec::new();
    loop {
        let mut word = iterator.next()?;
        if word == ")" {
            break;
        }
        if word == "," {
            continue;
        }
        let direction = match word {
            "out" => Direction::Out,
            "inout" => Direction::Inout,
            _ => Direction::In,
        };
        if direction != Direction::In {
            word = iterator.next()?;
        }
        let mut ty = parse_type(word)?;
        if iterator.peek() == Some(&"[") {
            iterator.next();
            let size = iterator.next()?.parse::<u32>().ok()?;
            iterator.next();
            ty = ty.array_of(ArraySize::Sized(size));
        }
        parameters.push((ty, direction));
    }
    Some(Prototype {
        name,
        result,
        parameters,
        stages,
    })
}

fn expand_line(line: &[&str], stages: u16, prototypes: &mut Vec<Prototype>) {
    let uses = |test: &dyn Fn(&str) -> bool| line.iter().any(|word| test(word));
    let range = |used: bool, low: u8| if used { low..=4 } else { 0..=0 };
    let generic = uses(&|word| generic_scalar(word).is_some());
    let size = uses(&|word| matches!(shaped(word), Some((_, "N"))));
    let shape = uses(&|word| matches!(shaped(word), Some((_, "C" | "R" | "CxR" | "RxC"))));
    for generic in range(generic, 1) {
        for size in range(size, 2) {
            for columns in range(shape, 2) {
                for rows in range(shape, 2) {
                    let sizes = Sizes {
                        generic,
                        size,
                        columns,
                        rows,
                    };
                    let concrete: Vec<String> =
                        line.iter().map(|word| substitute(word, sizes)).collect();
                    prototypes.extend(parse_prototype(&concrete, stages));
                }
            }
        }
    }
}

fn expand_section(section: &Section, prototypes: &mut Vec<Prototype>) {
    for line in section.text.lines() {
        let line = words(line);
        if line.is_empty() {
            continue;
        }
        expand_line(&line, section.stages, prototypes);
        for (enabled, half) in [(section.doubles, false), (section.halves, true)] {
            if !enabled {
                continue;
            }
            let variant: Vec<String> = line.iter().map(|word| variant_word(word, half)).collect();
            let variant: Vec<&str> = variant.iter().map(String::as_str).collect();
            if variant != line {
                expand_line(&variant, section.stages, prototypes);
            }
        }
    }
}

pub(crate) fn needs_memory_scope_semantics(name: &str) -> bool {
    !matches!(name, "gl_ScopeQueueFamily" | "gl_ScopeShaderCallEXT")
        && variables::MEMORY_SCOPE_CONSTANTS
            .iter()
            .any(|(constant, _)| *constant == name)
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct BuiltinFunctionId(pub(crate) u32);

impl BuiltinFunctionId {
    pub const fn index(self) -> u32 {
        self.0
    }
}

#[derive(Debug, Clone)]
pub struct Builtins {
    version: u32,
    stage: Stage,
    limits: ResourceLimits,
    functions: Vec<Function>,
    names: BTreeMap<String, Vec<BuiltinFunctionId>>,
    types: TypeRegistry,
    symbols: Vec<Symbol>,
    scope: Vec<(String, SymbolId)>,
}

impl Builtins {
    pub fn new(version: u32, stage: Stage, limits: &ResourceLimits) -> Self {
        let mut prototypes = Vec::new();
        for section in functions::SECTIONS.iter().chain(ray::SECTIONS) {
            if version >= section.since {
                expand_section(section, &mut prototypes);
            }
        }
        prototypes.append(&mut textures::prototypes());
        prototypes.append(&mut subgroup::prototypes(version));
        let mut seen = BTreeSet::new();
        let mut functions = Vec::new();
        let mut names: BTreeMap<String, Vec<BuiltinFunctionId>> = BTreeMap::new();
        for prototype in prototypes {
            if !available(prototype.stages, stage) {
                continue;
            }
            let types: Vec<Type> = prototype
                .parameters
                .iter()
                .map(|(ty, _)| ty.clone())
                .collect();
            if !seen.insert((prototype.name.clone(), types)) {
                continue;
            }
            let Ok(index) = u32::try_from(functions.len()) else {
                break;
            };
            names
                .entry(prototype.name.clone())
                .or_default()
                .push(BuiltinFunctionId(index));
            functions.push(Function {
                name: prototype.name,
                return_type: prototype.result,
                return_qualifiers: Qualifiers::default(),
                parameters: prototype
                    .parameters
                    .into_iter()
                    .map(|(ty, direction)| Parameter::new(ty, direction))
                    .collect(),
                defined: true,
                span: Span::default(),
                spirv_instruction: None,
                control: crate::scope::FunctionControl::default(),
            });
        }
        let mut types = TypeRegistry::new();
        let (symbols, scope) = variables::build(version, stage, limits, &mut types);
        Self {
            version,
            stage,
            limits: *limits,
            functions,
            names,
            types,
            symbols,
            scope,
        }
    }

    pub const fn version(&self) -> u32 {
        self.version
    }

    pub const fn stage(&self) -> Stage {
        self.stage
    }

    pub const fn limits(&self) -> &ResourceLimits {
        &self.limits
    }

    pub fn functions(&self) -> &[Function] {
        &self.functions
    }

    pub fn function(&self, id: BuiltinFunctionId) -> Option<&Function> {
        self.functions.get(usize::try_from(id.0).ok()?)
    }

    pub fn overloads(&self, name: &str) -> &[BuiltinFunctionId] {
        self.names.get(name).map_or(&[], Vec::as_slice)
    }

    pub fn function_names(&self) -> impl Iterator<Item = &str> {
        self.names.keys().map(String::as_str)
    }

    pub const fn types(&self) -> &TypeRegistry {
        &self.types
    }

    pub fn symbols(&self) -> &[Symbol] {
        &self.symbols
    }

    pub fn variables(&self) -> impl Iterator<Item = (&str, SymbolId)> {
        self.scope.iter().map(|(name, id)| (name.as_str(), *id))
    }
}
