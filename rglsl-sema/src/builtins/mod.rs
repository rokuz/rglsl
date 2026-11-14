pub(crate) mod footprint;
mod functions;
pub mod kind;
mod limits;
pub(crate) mod ray;
mod stages;
pub(crate) mod subgroup;
mod table;
mod tables;
mod textures;
mod variables;

pub(crate) use variables::{TENSOR_OPERAND_NONTEMPORAL, TENSOR_OPERAND_OUT_OF_BOUNDS_VALUE};
pub use variables::{variable_extension, view_extension};

use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::Span;
use rglsl_ast::ast::BasicType;

pub use limits::ResourceLimits;
pub use stages::{ALL_STAGE_BITS, StageTables};
pub use table::{BuiltinFlags, BuiltinFunction};
pub(crate) use tables::Prebuilt;
pub use tables::{BuiltinTables, FreshTables};

use crate::scope::{Direction, Function, Parameter, Qualifiers, Symbol, SymbolId};
use crate::types::{ArraySize, Opaque, Type, TypeRegistry};
use rglsl_types::{FastHashMap, FastHashSet, ShaderStage};

pub(crate) const fn stage_bit(stage: ShaderStage) -> u16 {
    match stage {
        ShaderStage::Vertex => VERTEX,
        ShaderStage::TessControl => TESS_CONTROL,
        ShaderStage::TessEvaluation => TESS_EVALUATION,
        ShaderStage::Geometry => GEOMETRY,
        ShaderStage::Fragment => FRAGMENT,
        ShaderStage::Compute => COMPUTE,
        ShaderStage::Task => TASK,
        ShaderStage::Mesh => MESH,
        ShaderStage::RayGeneration => RAY_GENERATION,
        ShaderStage::Intersection => INTERSECTION,
        ShaderStage::AnyHit => ANY_HIT,
        ShaderStage::ClosestHit => CLOSEST_HIT,
        ShaderStage::Miss => MISS,
        ShaderStage::Callable => CALLABLE,
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

const fn available(stages: u16, stage: ShaderStage) -> bool {
    stages == ALL_STAGES || stages & stage_bit(stage) != 0
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
    row: Option<&'static BuiltinFunction>,
}

struct Signature<'a>(&'a Prototype);

impl PartialEq for Signature<'_> {
    fn eq(&self, other: &Self) -> bool {
        self.0.name == other.0.name
            && self.0.parameters.len() == other.0.parameters.len()
            && self
                .0
                .parameters
                .iter()
                .zip(&other.0.parameters)
                .all(|(left, right)| left.0 == right.0)
    }
}

impl Eq for Signature<'_> {}

impl core::hash::Hash for Signature<'_> {
    fn hash<H: core::hash::Hasher>(&self, state: &mut H) {
        self.0.name.hash(state);
        self.0.parameters.len().hash(state);
        for parameter in &self.0.parameters {
            parameter.0.hash(state);
        }
    }
}

fn add_name(
    names: &mut FastHashMap<String, Vec<BuiltinFunctionId>>,
    name: &str,
    id: BuiltinFunctionId,
) {
    match names.get_mut(name) {
        Some(ids) => ids.push(id),
        None => {
            names.insert(String::from(name), Vec::from([id]));
        }
    }
}

impl Prototype {
    fn function(self) -> Function {
        Function {
            name: self.name,
            return_type: self.result,
            return_qualifiers: Qualifiers::default(),
            parameters: self
                .parameters
                .into_iter()
                .map(|(ty, direction)| Parameter::new(ty, direction))
                .collect(),
            defined: true,
            span: Span::default(),
            spirv_instruction: None,
            control: crate::scope::FunctionControl::default(),
        }
    }
}

type Functions = (
    Vec<Function>,
    Vec<Option<&'static BuiltinFunction>>,
    FastHashMap<String, Vec<BuiltinFunctionId>>,
);

pub(crate) type Footprints = Vec<(&'static str, crate::types::StructId)>;

fn expand_prototypes(
    version: u32,
    stage: Option<ShaderStage>,
) -> (Vec<Prototype>, TypeRegistry, Footprints) {
    let mut prototypes = Vec::new();
    for section in functions::SECTIONS.iter().chain(ray::SECTIONS) {
        if version >= section.since && stage.is_none_or(|stage| available(section.stages, stage)) {
            expand_section(section, &mut prototypes);
        }
    }
    prototypes.append(&mut textures::prototypes());
    for family in table::FAMILIES {
        for row in *family {
            row.expand(version, &mut prototypes);
        }
    }
    let mut types = TypeRegistry::new();
    let footprints = footprint::structs(&mut types);
    prototypes.append(&mut footprint::prototypes(&footprints));
    (prototypes, types, footprints)
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
        if let Some(stem) = word.strip_suffix(suffix)
            && SIZED_STEMS.contains(&stem)
        {
            return Some((stem, suffix));
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
        row: None,
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
    stage: ShaderStage,
    limits: ResourceLimits,
    functions: Vec<Function>,
    rows: Vec<Option<&'static BuiltinFunction>>,
    names: FastHashMap<String, Vec<BuiltinFunctionId>>,
    types: TypeRegistry,
    symbols: Vec<Symbol>,
    scope: Vec<(String, SymbolId)>,
}

impl Builtins {
    pub fn new(version: u32, stage: ShaderStage, limits: &ResourceLimits) -> Self {
        let (prototypes, mut types, footprints) = expand_prototypes(version, Some(stage));
        let kept: Vec<bool> = {
            let mut seen =
                FastHashSet::with_capacity_and_hasher(prototypes.len(), Default::default());
            prototypes
                .iter()
                .map(|prototype| {
                    available(prototype.stages, stage) && seen.insert(Signature(prototype))
                })
                .collect()
        };
        let mut functions = Vec::new();
        let mut rows = Vec::new();
        let mut names: FastHashMap<String, Vec<BuiltinFunctionId>> = FastHashMap::default();
        for (prototype, kept) in prototypes.into_iter().zip(kept) {
            if !kept {
                continue;
            }
            let Ok(index) = u32::try_from(functions.len()) else {
                break;
            };
            add_name(&mut names, &prototype.name, BuiltinFunctionId(index));
            rows.push(prototype.row);
            functions.push(prototype.function());
        }
        let table = variables::build(version, stage, limits, &mut types);
        Self::assemble(
            version,
            stage,
            limits,
            (functions, rows, names),
            types,
            table,
            footprints,
        )
    }

    fn assemble(
        version: u32,
        stage: ShaderStage,
        limits: &ResourceLimits,
        functions: Functions,
        types: TypeRegistry,
        table: (Vec<Symbol>, Vec<(String, SymbolId)>),
        footprints: Footprints,
    ) -> Self {
        let (functions, rows, names) = functions;
        let (mut symbols, mut scope) = table;
        for (name, id) in footprints {
            let Some(symbol) = u32::try_from(symbols.len()).ok().and_then(SymbolId::new) else {
                break;
            };
            symbols.push(Symbol {
                name: String::from(name),
                span: Span::default(),
                kind: crate::scope::SymbolKind::Struct(id),
            });
            scope.push((String::from(name), symbol));
        }
        Self {
            version,
            stage,
            limits: *limits,
            functions,
            rows,
            names,
            types,
            symbols,
            scope,
        }
    }

    pub const fn version(&self) -> u32 {
        self.version
    }

    pub const fn stage(&self) -> ShaderStage {
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

    pub fn entry(&self, id: BuiltinFunctionId) -> Option<&'static BuiltinFunction> {
        self.rows
            .get(usize::try_from(id.0).ok()?)
            .copied()
            .flatten()
    }

    pub fn kind(&self, id: BuiltinFunctionId) -> kind::BuiltinKind {
        self.entry(id)
            .map_or(kind::BuiltinKind::Named, |entry| entry.kind)
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
