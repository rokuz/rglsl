use std::collections::{BTreeMap, BTreeSet};
use std::fmt::Write as _;
use std::path::Path;

use spirv::{
    BuiltIn, Decoration, Dim, ExecutionMode, ExecutionModel, ImageFormat, Op, StorageClass,
};

use crate::exec::module::{self, Instruction, Module};

#[derive(Debug, Default, Clone, PartialEq, Eq)]
pub struct Interface {
    items: BTreeMap<String, Vec<String>>,
}

impl Interface {
    fn add(&mut self, key: String, value: String) {
        self.items.entry(key).or_default().push(value);
    }

    fn add_unique(&mut self, key: String, value: String) {
        let values = self.items.entry(key).or_default();
        if !values.contains(&value) {
            values.push(value);
        }
    }

    fn finish(mut self) -> Self {
        for values in self.items.values_mut() {
            values.sort();
        }
        self
    }

    #[cfg(test)]
    pub fn get(&self, key: &str) -> Option<&[String]> {
        self.items.get(key).map(Vec::as_slice)
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Mismatch {
    pub key: String,
    pub reference: Option<Vec<String>>,
    pub ours: Option<Vec<String>>,
}

impl std::fmt::Display for Mismatch {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let side = |values: &Option<Vec<String>>| {
            values
                .as_ref()
                .map_or_else(|| "none".to_string(), |values| values.join(" | "))
        };
        write!(
            f,
            "{}: glslang `{}`, ours `{}`",
            self.key,
            side(&self.reference),
            side(&self.ours)
        )
    }
}

pub fn compare(reference: &Interface, ours: &Interface) -> Vec<Mismatch> {
    let keys: BTreeSet<&String> = reference.items.keys().chain(ours.items.keys()).collect();
    keys.into_iter()
        .filter_map(|key| {
            let reference = reference.items.get(key);
            let ours = ours.items.get(key);
            (reference != ours).then(|| Mismatch {
                key: key.clone(),
                reference: reference.cloned(),
                ours: ours.cloned(),
            })
        })
        .collect()
}

pub fn reflect_bytes(bytes: &[u8]) -> Result<Interface, String> {
    reflect(&module::parse_bytes(bytes)?)
}

pub const EXPECTED: &str = "xtask/interface-expected.toml";

#[derive(Debug, Clone, PartialEq, Eq)]
struct Difference {
    name: String,
    keys: Vec<String>,
}

#[derive(Debug, Clone, Default)]
pub struct Expected {
    shaders: BTreeMap<String, Vec<Difference>>,
}

impl Expected {
    pub fn load(root: &Path) -> anyhow::Result<Self> {
        let path = root.join(EXPECTED);
        let text = std::fs::read_to_string(&path)
            .map_err(|err| anyhow::anyhow!("reading {}: {err}", path.display()))?;
        Self::parse(&text).map_err(|err| anyhow::anyhow!("{}: {err}", path.display()))
    }

    fn parse(text: &str) -> anyhow::Result<Self> {
        let table: toml::Table = text.parse()?;
        let mut expected = Self::default();
        for (name, entry) in table {
            let strings = |field: &str| -> anyhow::Result<Vec<String>> {
                entry
                    .get(field)
                    .and_then(toml::Value::as_array)
                    .ok_or_else(|| anyhow::anyhow!("`{name}` needs an array `{field}`"))?
                    .iter()
                    .map(|value| {
                        value
                            .as_str()
                            .map(str::to_string)
                            .ok_or_else(|| anyhow::anyhow!("`{name}.{field}` holds strings"))
                    })
                    .collect()
            };
            entry
                .get("why")
                .and_then(toml::Value::as_str)
                .filter(|why| !why.trim().is_empty())
                .ok_or_else(|| anyhow::anyhow!("`{name}` needs a string `why`"))?;
            let keys = strings("keys")?;
            for shader in strings("shaders")? {
                expected
                    .shaders
                    .entry(shader)
                    .or_default()
                    .push(Difference {
                        name: name.clone(),
                        keys: keys.clone(),
                    });
            }
        }
        Ok(expected)
    }

    fn reason(&self, shader: &str, key: &str) -> Option<&str> {
        self.shaders.get(shader)?.iter().find_map(|difference| {
            difference
                .keys
                .iter()
                .any(|prefix| key.starts_with(prefix.as_str()))
                .then_some(difference.name.as_str())
        })
    }
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct Check {
    pub mismatches: Vec<String>,
    pub expected: Vec<String>,
}

impl Check {
    pub fn passed(&self) -> bool {
        self.mismatches.is_empty()
    }

    pub fn note(&self) -> String {
        self.mismatches
            .iter()
            .cloned()
            .chain(
                self.expected
                    .iter()
                    .map(|mismatch| format!("expected: {mismatch}")),
            )
            .collect::<Vec<_>>()
            .join("; ")
    }
}

pub fn check_files(expected: &Expected, shader: &str, pairs: &[(&Path, &Path)]) -> Check {
    let mut check = Check::default();
    let several = pairs.len() > 1;
    for (reference, ours) in pairs {
        let prefix = if several {
            ours.file_name()
                .map(|name| format!("{}: ", name.to_string_lossy()))
                .unwrap_or_default()
        } else {
            String::new()
        };
        let read = |path: &Path| {
            std::fs::read(path)
                .map_err(|err| err.to_string())
                .and_then(|bytes| reflect_bytes(&bytes))
        };
        match (read(reference), read(ours)) {
            (Ok(reference), Ok(ours)) => {
                for mismatch in compare(&reference, &ours) {
                    match expected.reason(shader, &mismatch.key) {
                        Some(reason) => check
                            .expected
                            .push(format!("{prefix}({reason}) {mismatch}")),
                        None => check.mismatches.push(format!("{prefix}{mismatch}")),
                    }
                }
            }
            (Err(err), _) => check
                .mismatches
                .push(format!("{prefix}cannot reflect glslang's module: {err}")),
            (_, Err(err)) => check
                .mismatches
                .push(format!("{prefix}cannot reflect our module: {err}")),
        }
    }
    check
}

type RawDecorations = Vec<(u32, Vec<u32>)>;

#[derive(Default)]
struct Annotations {
    by_id: BTreeMap<u32, RawDecorations>,
    member: BTreeMap<(u32, u32), RawDecorations>,
}

impl Annotations {
    fn collect(module: &Module) -> Self {
        let mut annotations = Self::default();
        for instruction in &module.globals {
            if instruction.is(Op::Decorate) || instruction.is(Op::DecorateId) {
                if let (Some(target), Some(decoration)) = (instruction.word(0), instruction.word(1))
                {
                    annotations
                        .by_id
                        .entry(target)
                        .or_default()
                        .push((decoration, instruction.rest(2).to_vec()));
                }
            } else if instruction.is(Op::MemberDecorate) {
                if let (Some(target), Some(member), Some(decoration)) = (
                    instruction.word(0),
                    instruction.word(1),
                    instruction.word(2),
                ) {
                    annotations
                        .member
                        .entry((target, member))
                        .or_default()
                        .push((decoration, instruction.rest(3).to_vec()));
                }
            }
        }
        annotations
    }

    fn value(&self, id: u32, decoration: Decoration) -> Option<u32> {
        self.by_id.get(&id).and_then(|list| {
            list.iter()
                .find(|(d, _)| *d == decoration as u32)
                .and_then(|(_, operands)| operands.first().copied())
        })
    }

    fn member_value(&self, id: u32, member: u32, decoration: Decoration) -> Option<u32> {
        self.member.get(&(id, member)).and_then(|list| {
            list.iter()
                .find(|(d, _)| *d == decoration as u32)
                .and_then(|(_, operands)| operands.first().copied())
        })
    }

    fn rendered(&self, id: u32, skip: &[Decoration]) -> String {
        render_list(self.by_id.get(&id), skip)
    }

    fn member_rendered(&self, id: u32, member: u32) -> String {
        render_list(self.member.get(&(id, member)), &[])
    }
}

const INTERFACE_DECORATIONS: [Decoration; 32] = [
    Decoration::BuiltIn,
    Decoration::Location,
    Decoration::Component,
    Decoration::Index,
    Decoration::Flat,
    Decoration::NoPerspective,
    Decoration::Centroid,
    Decoration::Sample,
    Decoration::Patch,
    Decoration::Invariant,
    Decoration::PerPrimitiveEXT,
    Decoration::PerVertexKHR,
    Decoration::PerViewNV,
    Decoration::PerTaskNV,
    Decoration::ExplicitInterpAMD,
    Decoration::XfbBuffer,
    Decoration::XfbStride,
    Decoration::Offset,
    Decoration::Stream,
    Decoration::InputAttachmentIndex,
    Decoration::NonWritable,
    Decoration::NonReadable,
    Decoration::PassthroughNV,
    Decoration::ViewportRelativeNV,
    Decoration::SecondaryViewportRelativeNV,
    Decoration::RowMajor,
    Decoration::MatrixStride,
    Decoration::ArrayStride,
    Decoration::Block,
    Decoration::BufferBlock,
    Decoration::DescriptorSet,
    Decoration::Binding,
];

fn render_decoration(decoration: u32, operands: &[u32]) -> Option<String> {
    let known = Decoration::from_u32(decoration)?;
    if !INTERFACE_DECORATIONS.contains(&known) {
        return None;
    }
    if known == Decoration::BuiltIn {
        let builtin = operands.first().copied().unwrap_or_default();
        return Some(BuiltIn::from_u32(builtin).map_or_else(
            || format!("BuiltIn {builtin}"),
            |builtin| format!("BuiltIn {builtin:?}"),
        ));
    }
    let mut text = format!("{known:?}");
    for operand in operands {
        let _ = write!(text, " {operand}");
    }
    Some(text)
}

fn render_list(list: Option<&RawDecorations>, skip: &[Decoration]) -> String {
    let mut rendered: Vec<String> = list
        .into_iter()
        .flatten()
        .filter(|(decoration, _)| !skip.iter().any(|skip| *skip as u32 == *decoration))
        .filter_map(|(decoration, operands)| render_decoration(*decoration, operands))
        .collect();
    rendered.sort();
    rendered.dedup();
    if rendered.is_empty() {
        String::new()
    } else {
        format!(" [{}]", rendered.join(", "))
    }
}

fn op_name(opcode: u32) -> String {
    Op::from_u32(opcode).map_or_else(|| format!("Op{opcode}"), |op| format!("{op:?}"))
}

fn class_name(class: u32) -> String {
    StorageClass::from_u32(class)
        .map_or_else(|| format!("StorageClass{class}"), |c| format!("{c:?}"))
}

struct Describer<'a> {
    annotations: &'a Annotations,
    buffer_references: &'a BTreeMap<u32, u32>,
    shallow: Option<&'a BTreeMap<u32, String>>,
    names: BTreeMap<u32, String>,
}

impl Describer<'_> {
    fn name(&self, id: u32) -> String {
        if let Some(pointee) = self.buffer_references.get(&id) {
            return self.buffer_reference(id, *pointee);
        }
        self.names
            .get(&id)
            .cloned()
            .unwrap_or_else(|| "?".to_string())
    }

    fn buffer_reference(&self, id: u32, pointee: u32) -> String {
        let decorations = self.annotations.rendered(id, &[]);
        match self.shallow {
            Some(shallow) => format!(
                "ptr<PhysicalStorageBuffer, {}>{decorations}",
                shallow.get(&pointee).map_or("?", String::as_str)
            ),
            None => format!("ptr<PhysicalStorageBuffer>{decorations}"),
        }
    }

    fn literal_words(words: &[u32]) -> String {
        match words {
            [] => String::new(),
            [single] => single.to_string(),
            _ => words
                .iter()
                .map(|w| format!("{w:#x}"))
                .collect::<Vec<_>>()
                .join(":"),
        }
    }

    fn spec(&self, id: u32) -> String {
        self.annotations
            .value(id, Decoration::SpecId)
            .map_or_else(String::new, |spec| format!(" spec {spec}"))
    }

    fn list(&self, ids: &[u32]) -> String {
        ids.iter()
            .map(|id| self.name(*id))
            .collect::<Vec<_>>()
            .join(", ")
    }

    fn describe(&self, instruction: &Instruction) -> Option<String> {
        let Some(op) = Op::from_u32(instruction.opcode) else {
            return Some(op_name(instruction.opcode));
        };
        let word = |index: usize| instruction.word(index).unwrap_or_default();
        let id = word(0);
        let typed = word(0);
        let text = match op {
            Op::TypeVoid => "void".to_string(),
            Op::TypeBool => "bool".to_string(),
            Op::TypeInt => format!("{}{}", if word(2) == 0 { "u" } else { "i" }, word(1)),
            Op::TypeFloat => match instruction.word(2) {
                Some(encoding) => format!("f{}(encoding {encoding})", word(1)),
                None => format!("f{}", word(1)),
            },
            Op::TypeVector => format!("vec{}<{}>", word(2), self.name(word(1))),
            Op::TypeMatrix => format!("mat{}<{}>", word(2), self.name(word(1))),
            Op::TypeArray => format!(
                "[{}; {}]{}",
                self.name(word(1)),
                self.name(word(2)),
                self.annotations.rendered(id, &[])
            ),
            Op::TypeRuntimeArray => format!(
                "[{}]{}",
                self.name(word(1)),
                self.annotations.rendered(id, &[])
            ),
            Op::TypeStruct => {
                let mut text = String::from("struct{");
                for (index, member) in instruction.rest(1).iter().enumerate() {
                    if index > 0 {
                        text.push_str(", ");
                    }
                    let index = u32::try_from(index).ok()?;
                    let _ = write!(
                        text,
                        "{}{}",
                        self.name(*member),
                        self.annotations.member_rendered(id, index)
                    );
                }
                text.push('}');
                text.push_str(&self.annotations.rendered(id, &[]));
                text
            }
            Op::TypeImage => {
                let dim = Dim::from_u32(word(2))
                    .map_or_else(|| format!("Dim{}", word(2)), |dim| format!("{dim:?}"));
                let format = ImageFormat::from_u32(word(7)).map_or_else(
                    || format!("Format{}", word(7)),
                    |format| format!("{format:?}"),
                );
                let access = instruction
                    .word(8)
                    .map_or_else(String::new, |access| format!(", access {access}"));
                format!(
                    "image<{}, {dim}, depth {}, arrayed {}, ms {}, sampled {}, {format}{access}>",
                    self.name(word(1)),
                    word(3),
                    word(4),
                    word(5),
                    word(6),
                )
            }
            Op::TypeSampledImage => format!("sampled<{}>", self.name(word(1))),
            Op::TypeSampler => "sampler".to_string(),
            Op::TypePointer => {
                let class = word(1);
                let pointee = word(2);
                if class == StorageClass::PhysicalStorageBuffer as u32 {
                    self.buffer_reference(id, pointee)
                } else {
                    format!("ptr<{}, {}>", class_name(class), self.name(pointee))
                }
            }
            Op::TypeUntypedPointerKHR => format!("untyped_ptr<{}>", class_name(word(1))),
            Op::TypeForwardPointer
            | Op::TypeFunction
            | Op::Variable
            | Op::UntypedVariableKHR
            | Op::ExtInstImport
            | Op::String => return None,
            Op::TypeAccelerationStructureKHR => "acceleration_structure".to_string(),
            Op::TypeTensorARM => match instruction.word(3) {
                Some(shape) => format!(
                    "tensor<{}, rank {}, shape {}>",
                    self.name(word(1)),
                    self.name(word(2)),
                    self.name(shape)
                ),
                None => format!(
                    "tensor<{}, rank {}>",
                    self.name(word(1)),
                    self.name(word(2))
                ),
            },
            Op::TypeRayQueryKHR => "ray_query".to_string(),
            Op::Constant => format!(
                "{} {}",
                self.name(typed),
                Self::literal_words(instruction.rest(2))
            ),
            Op::SpecConstant => format!(
                "{} {}{}",
                self.name(typed),
                Self::literal_words(instruction.rest(2)),
                self.spec(word(1))
            ),
            Op::ConstantTrue => format!("{} true", self.name(typed)),
            Op::ConstantFalse => format!("{} false", self.name(typed)),
            Op::SpecConstantTrue => format!("{} true{}", self.name(typed), self.spec(word(1))),
            Op::SpecConstantFalse => format!("{} false{}", self.name(typed), self.spec(word(1))),
            Op::ConstantNull => format!("{} null", self.name(typed)),
            Op::Undef => format!("{} undef", self.name(typed)),
            Op::ConstantComposite => {
                format!("{}{{{}}}", self.name(typed), self.list(instruction.rest(2)))
            }
            Op::SpecConstantComposite => format!(
                "spec {}{{{}}}",
                self.name(typed),
                self.list(instruction.rest(2))
            ),
            Op::SpecConstantOp => format!(
                "{} {}({})",
                self.name(typed),
                op_name(word(2)),
                self.list(instruction.rest(3))
            ),
            _ => {
                let start = match instruction.result_id() {
                    Some(_) if instruction.word(0) == instruction.result_id() => 1,
                    Some(_) => 2,
                    None => return None,
                };
                let mut text = op_name(instruction.opcode);
                for operand in instruction.rest(start) {
                    let _ = write!(
                        text,
                        " {}",
                        self.names
                            .get(operand)
                            .cloned()
                            .unwrap_or_else(|| operand.to_string())
                    );
                }
                text
            }
        };
        Some(text)
    }
}

fn result_of(instruction: &Instruction) -> Option<u32> {
    if instruction.is(Op::TypeUntypedPointerKHR) {
        return instruction.word(0);
    }
    if instruction.is(Op::UntypedVariableKHR) {
        return instruction.word(1);
    }
    instruction.result_id()
}

fn describe_all(
    module: &Module,
    annotations: &Annotations,
    shallow: Option<&BTreeMap<u32, String>>,
) -> BTreeMap<u32, String> {
    let buffer_references: BTreeMap<u32, u32> = module
        .globals
        .iter()
        .filter(|instruction| {
            instruction.is(Op::TypePointer)
                && instruction.word(1) == Some(StorageClass::PhysicalStorageBuffer as u32)
        })
        .filter_map(|instruction| Some((instruction.word(0)?, instruction.word(2)?)))
        .collect();
    let mut describer = Describer {
        annotations,
        buffer_references: &buffer_references,
        shallow,
        names: BTreeMap::new(),
    };
    for instruction in &module.globals {
        let Some(id) = result_of(instruction) else {
            continue;
        };
        if let Some(text) = describer.describe(instruction) {
            describer.names.insert(id, text);
        }
    }
    describer.names
}

const LOCATION_DECORATIONS: [Decoration; 6] = [
    Decoration::Location,
    Decoration::Component,
    Decoration::Index,
    Decoration::DescriptorSet,
    Decoration::Binding,
    Decoration::BuiltIn,
];

struct Variable {
    id: u32,
    class: u32,
    pointee: Option<u32>,
}

fn variables(module: &Module) -> Vec<Variable> {
    let pointers: BTreeMap<u32, u32> = module
        .globals
        .iter()
        .filter(|instruction| instruction.is(Op::TypePointer))
        .filter_map(|instruction| Some((instruction.word(0)?, instruction.word(2)?)))
        .collect();
    module
        .globals
        .iter()
        .filter_map(|instruction| {
            if instruction.is(Op::Variable) {
                Some(Variable {
                    id: instruction.word(1)?,
                    class: instruction.word(2)?,
                    pointee: pointers.get(&instruction.word(0)?).copied(),
                })
            } else if instruction.is(Op::UntypedVariableKHR) {
                Some(Variable {
                    id: instruction.word(1)?,
                    class: instruction.word(2)?,
                    pointee: instruction.word(3),
                })
            } else {
                None
            }
        })
        .collect()
}

struct Context<'a> {
    annotations: &'a Annotations,
    names: &'a BTreeMap<u32, String>,
    defs: BTreeMap<u32, &'a Instruction>,
}

impl Context<'_> {
    fn name(&self, id: u32) -> String {
        self.names
            .get(&id)
            .cloned()
            .unwrap_or_else(|| "?".to_string())
    }

    fn block_struct(&self, mut id: u32) -> Option<u32> {
        loop {
            let instruction = self.defs.get(&id)?;
            if instruction.is(Op::TypeArray) || instruction.is(Op::TypeRuntimeArray) {
                id = instruction.word(1)?;
            } else if instruction.is(Op::TypeStruct) {
                return Some(id);
            } else {
                return None;
            }
        }
    }

    fn member_count(&self, id: u32) -> u32 {
        self.defs
            .get(&id)
            .and_then(|instruction| u32::try_from(instruction.rest(1).len()).ok())
            .unwrap_or_default()
    }

    fn member_locations(&self, structure: u32) -> Option<u32> {
        (0..self.member_count(structure))
            .map(|member| {
                self.annotations
                    .member_value(structure, member, Decoration::Location)
            })
            .collect::<Option<Vec<u32>>>()?
            .into_iter()
            .min()
    }

    fn varying_key(&self, class: &str, variable: &Variable) -> String {
        let annotations = self.annotations;
        if let Some(builtin) = annotations.value(variable.id, Decoration::BuiltIn) {
            let builtin = BuiltIn::from_u32(builtin)
                .map_or_else(|| builtin.to_string(), |builtin| format!("{builtin:?}"));
            return format!("{class} BuiltIn {builtin}");
        }
        let structure = variable
            .pointee
            .and_then(|pointee| self.block_struct(pointee));
        if let Some(location) = structure.and_then(|structure| self.member_locations(structure)) {
            return format!("{class} block location {location}");
        }
        if let Some(location) = annotations.value(variable.id, Decoration::Location) {
            let mut key = format!("{class} location {location}");
            if let Some(component) = annotations
                .value(variable.id, Decoration::Component)
                .filter(|component| *component != 0)
            {
                let _ = write!(key, " component {component}");
            }
            if let Some(index) = annotations
                .value(variable.id, Decoration::Index)
                .filter(|index| *index != 0)
            {
                let _ = write!(key, " index {index}");
            }
            return key;
        }
        if let Some(structure) = structure {
            let members = self.member_count(structure);
            if (0..members).any(|member| {
                annotations
                    .member_value(structure, member, Decoration::BuiltIn)
                    .is_some()
            }) {
                return format!("{class} builtin block");
            }
        }
        format!("{class} without location")
    }

    fn value(&self, variable: &Variable) -> String {
        let pointee = variable
            .pointee
            .map_or_else(|| "untyped".to_string(), |pointee| self.name(pointee));
        format!(
            "{pointee}{}",
            self.annotations
                .rendered(variable.id, &LOCATION_DECORATIONS)
        )
    }
}

fn component_names(context: &Context, ids: &[u32]) -> String {
    ids.iter()
        .map(|id| context.name(*id))
        .collect::<Vec<_>>()
        .join(", ")
}

pub fn reflect(module: &Module) -> Result<Interface, String> {
    let annotations = Annotations::collect(module);
    let shallow = describe_all(module, &annotations, None);
    let names = describe_all(module, &annotations, Some(&shallow));
    let context = Context {
        annotations: &annotations,
        names: &names,
        defs: module
            .globals
            .iter()
            .filter_map(|instruction| Some((result_of(instruction)?, instruction)))
            .collect(),
    };
    let mut interface = Interface::default();

    let mut models: BTreeMap<u32, String> = BTreeMap::new();
    for instruction in module.globals.iter().filter(|i| i.is(Op::EntryPoint)) {
        let (Some(model), Some(id)) = (instruction.word(0), instruction.word(1)) else {
            return Err("truncated OpEntryPoint".into());
        };
        let model = ExecutionModel::from_u32(model)
            .map_or_else(|| format!("ExecutionModel{model}"), |m| format!("{m:?}"));
        interface.add("entry point".into(), model.clone());
        models.insert(id, model);
    }
    if models.is_empty() {
        return Err("the module has no entry point".into());
    }

    let mut local_sizes: BTreeMap<String, String> = BTreeMap::new();
    for instruction in &module.globals {
        let by_id = instruction.is(Op::ExecutionModeId);
        if !(by_id || instruction.is(Op::ExecutionMode)) {
            continue;
        }
        let (Some(entry), Some(mode)) = (instruction.word(0), instruction.word(1)) else {
            return Err("truncated OpExecutionMode".into());
        };
        let model = models
            .get(&entry)
            .cloned()
            .unwrap_or_else(|| "?".to_string());
        let operands = instruction.rest(2);
        let operands = if by_id {
            component_names(&context, operands)
        } else {
            operands
                .iter()
                .map(|operand| format!("u32 {operand}"))
                .collect::<Vec<_>>()
                .join(", ")
        };
        if mode == ExecutionMode::LocalSize as u32 || mode == ExecutionMode::LocalSizeId as u32 {
            local_sizes.insert(model, operands);
            continue;
        }
        let mode = ExecutionMode::from_u32(mode)
            .map_or_else(|| format!("ExecutionMode{mode}"), |m| format!("{m:?}"));
        interface.add(format!("{model} mode {mode}"), operands);
    }
    let workgroup_size = module.globals.iter().find(|instruction| {
        result_of(instruction).is_some_and(|id| {
            annotations.value(id, Decoration::BuiltIn) == Some(BuiltIn::WorkgroupSize as u32)
        }) && !instruction.is(Op::Variable)
    });
    if let Some(constant) = workgroup_size {
        let replicated = constant.is(Op::ConstantCompositeReplicateEXT)
            || constant.is(Op::SpecConstantCompositeReplicateEXT);
        let ids = if replicated {
            constant.rest(2).repeat(3)
        } else {
            constant.rest(2).to_vec()
        };
        let components = component_names(&context, &ids);
        for model in models.values() {
            if matches!(
                model.as_str(),
                "GLCompute" | "TaskEXT" | "MeshEXT" | "TaskNV" | "MeshNV"
            ) {
                local_sizes.insert(model.clone(), components.clone());
            }
        }
    }
    for (model, size) in local_sizes {
        interface.add(format!("{model} local size"), size);
    }

    for instruction in &module.globals {
        let Some(id) = result_of(instruction) else {
            continue;
        };
        if let Some(spec) = annotations.value(id, Decoration::SpecId) {
            interface.add_unique(format!("spec constant {spec}"), context.name(id));
        }
    }

    for variable in variables(module) {
        let Some(class) = StorageClass::from_u32(variable.class) else {
            interface.add(
                format!("{} variable", class_name(variable.class)),
                context.value(&variable),
            );
            continue;
        };
        let class_text = class_name(variable.class);
        let key = match class {
            StorageClass::Function | StorageClass::Private | StorageClass::Workgroup => continue,
            StorageClass::Input | StorageClass::Output | StorageClass::TileImageEXT => {
                context.varying_key(&class_text, &variable)
            }
            StorageClass::Uniform | StorageClass::UniformConstant | StorageClass::StorageBuffer => {
                match annotations.value(variable.id, Decoration::Binding) {
                    Some(binding) => format!(
                        "resource set {} binding {binding}",
                        annotations
                            .value(variable.id, Decoration::DescriptorSet)
                            .unwrap_or_default()
                    ),
                    None => format!("{class_text} without binding"),
                }
            }
            _ => match annotations.value(variable.id, Decoration::Location) {
                Some(location) => format!("{class_text} location {location}"),
                None => class_text.clone(),
            },
        };
        let value = context.value(&variable);
        let value = if key.starts_with("resource") || key.ends_with("without binding") {
            format!("{class_text} {value}")
        } else {
            value
        };
        interface.add(key, value);
    }
    Ok(interface.finish())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::exec::module::tests::{instruction, module, string_words};

    fn op(op: Op, operands: &[u32]) -> anyhow::Result<Vec<u32>> {
        instruction(op as u32, operands)
    }

    fn reflect_words(words: &[u32]) -> anyhow::Result<Interface> {
        reflect(&module::parse(words).map_err(anyhow::Error::msg)?).map_err(anyhow::Error::msg)
    }

    fn entry(model: ExecutionModel, id: u32, interface: &[u32]) -> anyhow::Result<Vec<u32>> {
        let mut operands = vec![model as u32, id];
        operands.extend(string_words("main"));
        operands.extend_from_slice(interface);
        op(Op::EntryPoint, &operands)
    }

    fn compute(local_size: [u32; 3], extra: Vec<Vec<u32>>) -> anyhow::Result<Vec<u32>> {
        let mut instructions = vec![
            op(Op::Capability, &[1])?,
            entry(ExecutionModel::GLCompute, 1, &[])?,
            op(
                Op::ExecutionMode,
                &[
                    1,
                    ExecutionMode::LocalSize as u32,
                    local_size[0],
                    local_size[1],
                    local_size[2],
                ],
            )?,
        ];
        instructions.extend(extra);
        Ok(module(&instructions))
    }

    #[test]
    fn reflects_a_storage_buffer_layout() -> anyhow::Result<()> {
        let words = compute(
            [8, 1, 1],
            vec![
                op(Op::Decorate, &[10, Decoration::ArrayStride as u32, 16])?,
                op(Op::MemberDecorate, &[11, 0, Decoration::Offset as u32, 0])?,
                op(Op::MemberDecorate, &[11, 1, Decoration::Offset as u32, 16])?,
                op(Op::MemberDecorate, &[11, 1, Decoration::NonWritable as u32])?,
                op(Op::Decorate, &[11, Decoration::Block as u32])?,
                op(Op::Decorate, &[13, Decoration::DescriptorSet as u32, 1])?,
                op(Op::Decorate, &[13, Decoration::Binding as u32, 2])?,
                op(Op::TypeFloat, &[3, 32])?,
                op(Op::TypeVector, &[4, 3, 4])?,
                op(Op::TypeRuntimeArray, &[10, 4])?,
                op(Op::TypeStruct, &[11, 3, 10])?,
                op(
                    Op::TypePointer,
                    &[12, StorageClass::StorageBuffer as u32, 11],
                )?,
                op(Op::Variable, &[12, 13, StorageClass::StorageBuffer as u32])?,
            ],
        )?;
        let interface = reflect_words(&words)?;
        assert_eq!(
            interface.get("resource set 1 binding 2"),
            Some(
                [
                    "StorageBuffer struct{f32 [Offset 0], [vec4<f32>] [ArrayStride 16] [NonWritable, Offset 16]} [Block]"
                        .to_string()
                ]
                .as_slice()
            )
        );
        assert_eq!(
            interface.get("GLCompute local size"),
            Some(["u32 8, u32 1, u32 1".to_string()].as_slice())
        );
        assert_eq!(
            interface.get("entry point"),
            Some(["GLCompute".to_string()].as_slice())
        );
        Ok(())
    }

    #[test]
    fn local_size_encodings_with_spec_constants_agree() -> anyhow::Result<()> {
        let types = || -> anyhow::Result<Vec<Vec<u32>>> {
            Ok(vec![
                op(Op::Decorate, &[5, Decoration::SpecId as u32, 3])?,
                op(Op::TypeInt, &[2, 32, 0])?,
                op(Op::TypeVector, &[3, 2, 3])?,
                op(Op::SpecConstant, &[2, 5, 16])?,
                op(Op::Constant, &[2, 6, 1])?,
            ])
        };
        let mut builtin = types()?;
        builtin.insert(
            0,
            op(
                Op::Decorate,
                &[7, Decoration::BuiltIn as u32, BuiltIn::WorkgroupSize as u32],
            )?,
        );
        builtin.push(op(Op::SpecConstantComposite, &[3, 7, 5, 6, 6])?);
        let with_builtin = reflect_words(&compute([16, 1, 1], builtin)?)?;

        let mut by_id = vec![
            op(Op::Capability, &[1])?,
            entry(ExecutionModel::GLCompute, 1, &[])?,
            op(
                Op::ExecutionModeId,
                &[1, ExecutionMode::LocalSizeId as u32, 5, 6, 6],
            )?,
        ];
        by_id.extend(types()?);
        let with_ids = reflect_words(&module(&by_id))?;
        assert_eq!(compare(&with_builtin, &with_ids), []);
        assert_eq!(
            with_ids.get("GLCompute local size"),
            Some(["u32 16 spec 3, u32 1, u32 1".to_string()].as_slice())
        );
        assert_eq!(
            with_ids.get("spec constant 3"),
            Some(["u32 16 spec 3".to_string()].as_slice())
        );
        Ok(())
    }

    fn fragment_input(flat: bool, location: u32) -> anyhow::Result<Vec<u32>> {
        let mut instructions = vec![
            op(Op::Capability, &[1])?,
            entry(ExecutionModel::Fragment, 1, &[9])?,
            op(
                Op::ExecutionMode,
                &[1, ExecutionMode::OriginUpperLeft as u32],
            )?,
            op(Op::Decorate, &[9, Decoration::Location as u32, location])?,
        ];
        if flat {
            instructions.push(op(Op::Decorate, &[9, Decoration::Flat as u32])?);
        }
        instructions.extend([
            op(Op::TypeInt, &[2, 32, 1])?,
            op(Op::TypePointer, &[3, StorageClass::Input as u32, 2])?,
            op(Op::Variable, &[3, 9, StorageClass::Input as u32])?,
        ]);
        Ok(module(&instructions))
    }

    #[test]
    fn reports_interpolation_and_location_differences() -> anyhow::Result<()> {
        let reference = reflect_words(&fragment_input(true, 2)?)?;
        assert_eq!(
            reference.get("Input location 2"),
            Some(["i32 [Flat]".to_string()].as_slice())
        );
        assert_eq!(
            reference.get("Fragment mode OriginUpperLeft"),
            Some([String::new()].as_slice())
        );
        let unflat = reflect_words(&fragment_input(false, 2)?)?;
        let mismatches = compare(&reference, &unflat);
        assert_eq!(mismatches.len(), 1);
        assert_eq!(
            mismatches.first().map(ToString::to_string),
            Some("Input location 2: glslang `i32 [Flat]`, ours `i32`".to_string())
        );
        let moved = reflect_words(&fragment_input(true, 3)?)?;
        let keys: Vec<String> = compare(&reference, &moved)
            .into_iter()
            .map(|mismatch| mismatch.key)
            .collect();
        assert_eq!(keys, ["Input location 2", "Input location 3"]);
        Ok(())
    }

    #[test]
    fn ignores_ids_names_and_declaration_order() -> anyhow::Result<()> {
        let first = vec![
            op(Op::Capability, &[1])?,
            entry(ExecutionModel::Vertex, 1, &[])?,
            op(
                Op::Decorate,
                &[20, Decoration::BuiltIn as u32, BuiltIn::Position as u32],
            )?,
            op(Op::Decorate, &[21, Decoration::Location as u32, 0])?,
            op(Op::TypeFloat, &[2, 32])?,
            op(Op::TypeVector, &[3, 2, 4])?,
            op(Op::TypePointer, &[4, StorageClass::Output as u32, 3])?,
            op(Op::Variable, &[4, 20, StorageClass::Output as u32])?,
            op(Op::Variable, &[4, 21, StorageClass::Output as u32])?,
        ];
        let mut name = vec![40];
        name.extend(string_words("color"));
        let second = vec![
            op(Op::Capability, &[1])?,
            entry(ExecutionModel::Vertex, 7, &[])?,
            op(Op::Name, &name)?,
            op(Op::Decorate, &[40, Decoration::Location as u32, 0])?,
            op(
                Op::Decorate,
                &[41, Decoration::BuiltIn as u32, BuiltIn::Position as u32],
            )?,
            op(Op::TypeFloat, &[30, 32])?,
            op(Op::TypeVector, &[31, 30, 4])?,
            op(Op::TypePointer, &[32, StorageClass::Output as u32, 31])?,
            op(Op::Variable, &[32, 40, StorageClass::Output as u32])?,
            op(Op::Variable, &[32, 41, StorageClass::Output as u32])?,
        ];
        let first = reflect_words(&module(&first))?;
        let second = reflect_words(&module(&second))?;
        assert_eq!(compare(&first, &second), []);
        assert_eq!(
            first.get("Output BuiltIn Position"),
            Some(["vec4<f32>".to_string()].as_slice())
        );
        Ok(())
    }

    #[test]
    fn describes_buffer_references_without_following_cycles() -> anyhow::Result<()> {
        let psb = StorageClass::PhysicalStorageBuffer as u32;
        let words = compute(
            [1, 1, 1],
            vec![
                op(Op::MemberDecorate, &[5, 0, Decoration::Offset as u32, 0])?,
                op(Op::MemberDecorate, &[5, 1, Decoration::Offset as u32, 8])?,
                op(Op::Decorate, &[5, Decoration::Block as u32])?,
                op(Op::MemberDecorate, &[7, 0, Decoration::Offset as u32, 0])?,
                op(Op::Decorate, &[7, Decoration::Block as u32])?,
                op(Op::TypeForwardPointer, &[4, psb])?,
                op(Op::TypeInt, &[2, 32, 1])?,
                op(Op::TypeStruct, &[5, 4, 2])?,
                op(Op::TypePointer, &[4, psb, 5])?,
                op(Op::TypeStruct, &[7, 4])?,
                op(Op::TypePointer, &[8, StorageClass::PushConstant as u32, 7])?,
                op(Op::Variable, &[8, 9, StorageClass::PushConstant as u32])?,
            ],
        )?;
        let interface = reflect_words(&words)?;
        assert_eq!(
            interface.get("PushConstant"),
            Some(
                ["struct{ptr<PhysicalStorageBuffer, struct{ptr<PhysicalStorageBuffer> [Offset 0], i32 [Offset 8]} [Block]> [Offset 0]} [Block]".to_string()]
                    .as_slice()
            )
        );
        Ok(())
    }

    #[test]
    fn expected_differences_cover_only_their_shaders_and_keys() -> anyhow::Result<()> {
        let expected = Expected::parse(
            "[overlap]\nwhy = \"reason\"\nkeys = [\"Input location\"]\nshaders = [\"x.frag\"]\n",
        )?;
        assert_eq!(
            expected.reason("x.frag", "Input location 3"),
            Some("overlap")
        );
        assert_eq!(expected.reason("x.frag", "Output location 3"), None);
        assert_eq!(expected.reason("y.frag", "Input location 3"), None);
        assert!(Expected::parse("[overlap]\nkeys = []\nshaders = []\n").is_err());
        assert!(Expected::parse("[overlap]\nwhy = \"reason\"\nshaders = []\n").is_err());
        Ok(())
    }

    #[test]
    fn the_expected_differences_file_parses() -> anyhow::Result<()> {
        let root = Path::new(env!("CARGO_MANIFEST_DIR")).join("..");
        let expected = Expected::load(&root)?;
        assert!(expected
            .reason("spv.noLocation.vert", "Output location 3")
            .is_some());
        Ok(())
    }

    #[test]
    fn rejects_modules_without_entry_points() -> anyhow::Result<()> {
        let words = module(&[op(Op::Capability, &[1])?]);
        assert!(reflect_words(&words).is_err());
        Ok(())
    }
}
