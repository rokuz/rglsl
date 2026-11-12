#![cfg(all(feature = "glsl-in", feature = "spv-out"))]

use std::collections::{BTreeMap, BTreeSet};
use std::path::Path;
use std::process::Command;

use rglsl::back::spv;
use rglsl::front::glsl;
use rglsl::valid::{Capabilities, ValidationFlags, Validator};
use rglsl::ShaderStage;
use spirv::Op;

use crate::TestResult;

#[derive(Clone, Copy)]
struct Target {
    environment: &'static str,
    validator: &'static str,
    spirv: (u8, u8),
}

const VULKAN_1_0: Target = Target {
    environment: "vulkan1.0",
    validator: "vulkan1.0",
    spirv: (1, 0),
};
const VULKAN_1_1_SPIRV_1_4: Target = Target {
    environment: "vulkan1.1",
    validator: "vulkan1.1spv1.4",
    spirv: (1, 4),
};
const VULKAN_1_3: Target = Target {
    environment: "vulkan1.3",
    validator: "vulkan1.3",
    spirv: (1, 6),
};

const fn stage_extension(stage: ShaderStage) -> &'static str {
    match stage {
        ShaderStage::Vertex => "vert",
        ShaderStage::Fragment => "frag",
        _ => "comp",
    }
}

fn options(stage: ShaderStage, target: Target, debug: bool) -> glsl::Options {
    glsl::Options {
        spirv_version: Some(target.spirv),
        debug_info: debug,
        source_name: Some(String::from("tensor.glsl")),
        ..glsl::Options::from(stage)
    }
}

fn compile_with(
    stage: ShaderStage,
    source: &str,
    target: Target,
    debug: bool,
) -> TestResult<Vec<u32>> {
    let module = glsl::Frontend::default()
        .parse(&options(stage, target, debug), source)
        .map_err(|errors| {
            errors
                .errors
                .iter()
                .map(|error| {
                    format!(
                        "{}: {}",
                        error.meta.location(source).line_number,
                        error.kind
                    )
                })
                .collect::<Vec<_>>()
                .join("\n")
        })?;
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .map_err(|error| format!("{:?}", error.into_inner()))?;
    let debug_info = debug.then(|| spv::DebugInfo {
        level: spv::DebugLevel::NonSemantic,
        source_text: true,
        processes: &[],
        entry_point: Some(spv::DebugEntryPoint {
            signature: "rglsl",
            arguments: "",
            directory: Some("."),
        }),
    });
    let options = spv::Options {
        lang_version: target.spirv,
        debug_info,
        flags: spv::WriterFlags::DEBUG
            | spv::WriterFlags::LABEL_VARYINGS
            | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
        ..spv::Options::default()
    };
    let words = spv::write_vec(&module, &info, &options, None)?;
    crate::stage_io::spirv_val_in(&words, &["--target-env", target.validator])?;
    Ok(words)
}

fn compile(stage: ShaderStage, source: &str, target: Target) -> TestResult<Vec<u32>> {
    compile_with(stage, source, target, false)
}

fn rejection_lines(stage: ShaderStage, source: &str) -> TestResult<Vec<(u32, String)>> {
    let errors = crate::rejected(
        glsl::Frontend::default().parse(&options(stage, VULKAN_1_0, false), source),
    )?;
    Ok(errors
        .errors
        .iter()
        .map(|error| {
            (
                error.meta.location(source).line_number,
                error.kind.to_string(),
            )
        })
        .collect())
}

fn scratch(name: &str) -> std::path::PathBuf {
    std::env::temp_dir().join(format!(
        "rglsl-tensors-{}-{:?}-{name}",
        std::process::id(),
        std::thread::current().id()
    ))
}

enum Glslang {
    Missing,
    Accepted(Vec<u32>),
    Rejected(Vec<u32>),
}

fn glslang(stage: ShaderStage, source: &str, target: Target, debug: bool) -> TestResult<Glslang> {
    let glslang = crate::stage_io::oracle("RGLSL_GLSLANG", "glslang");
    if !glslang.exists() {
        println!("glslang not found at {}", glslang.display());
        return Ok(Glslang::Missing);
    }
    let input = scratch(&format!("input.{}", stage_extension(stage)));
    let output = scratch("glslang.spv");
    std::fs::write(&input, source)?;
    let spirv = format!("spirv{}.{}", target.spirv.0, target.spirv.1);
    let mut command = Command::new(&glslang);
    command
        .args(["-V", "--target-env", target.environment, "--target-env"])
        .arg(&spirv);
    if debug {
        command.arg("-gVS");
    }
    let result = command.arg("-o").arg(&output).arg(&input).output()?;
    let _ = std::fs::remove_file(&input);
    if !result.status.success() {
        let text = format!(
            "{}{}",
            String::from_utf8_lossy(&result.stdout),
            String::from_utf8_lossy(&result.stderr)
        );
        let lines = text
            .lines()
            .filter_map(|line| line.strip_prefix("ERROR: "))
            .filter_map(|line| line.split(':').nth(1))
            .filter_map(|line| line.trim().parse().ok())
            .collect();
        return Ok(Glslang::Rejected(lines));
    }
    let bytes = std::fs::read(&output)?;
    let _ = std::fs::remove_file(&output);
    let words = bytes
        .chunks_exact(4)
        .map(|chunk| <[u8; 4]>::try_from(chunk).map(u32::from_le_bytes))
        .collect::<Result<Vec<_>, _>>()?;
    Ok(Glslang::Accepted(words))
}

fn instructions(words: &[u32]) -> TestResult<Vec<(u32, Vec<u32>)>> {
    let mut found = Vec::new();
    let mut rest = words.get(5..).ok_or("no SPIR-V header")?;
    while let Some(&first) = rest.first() {
        let count = usize::try_from(first >> 16)?;
        let operands = rest.get(1..count).ok_or("truncated instruction")?;
        found.push((first & 0xffff, operands.to_vec()));
        rest = rest.get(count..).ok_or("truncated instruction")?;
    }
    Ok(found)
}

fn literal_string(words: &[u32]) -> String {
    let bytes: Vec<u8> = words
        .iter()
        .flat_map(|word| word.to_le_bytes())
        .take_while(|&byte| byte != 0)
        .collect();
    String::from_utf8_lossy(&bytes).into_owned()
}

fn is(op: u32, expected: Op) -> bool {
    op == expected as u32
}

#[derive(Debug, PartialEq, Eq)]
struct Shape {
    capabilities: BTreeSet<u32>,
    extensions: BTreeSet<String>,
    tensor_types: Vec<String>,
    variables: BTreeMap<String, (String, Vec<Vec<u32>>)>,
    reads: Vec<String>,
    writes: Vec<String>,
    sizes: Vec<String>,
    calls: usize,
}

struct Module {
    instructions: Vec<(u32, Vec<u32>)>,
    definitions: BTreeMap<u32, usize>,
}

impl Module {
    fn new(words: &[u32]) -> TestResult<Self> {
        let instructions = instructions(words)?;
        let mut definitions = BTreeMap::new();
        for (index, (op, operands)) in instructions.iter().enumerate() {
            let result = if is(*op, Op::Constant)
                || is(*op, Op::SpecConstant)
                || is(*op, Op::SpecConstantOp)
                || is(*op, Op::Variable)
            {
                operands.get(1)
            } else if is(*op, Op::TypeInt)
                || is(*op, Op::TypeFloat)
                || is(*op, Op::TypeBool)
                || is(*op, Op::TypeArray)
                || is(*op, Op::TypeRuntimeArray)
                || is(*op, Op::TypeTensorARM)
                || is(*op, Op::TypePointer)
            {
                operands.first()
            } else {
                None
            };
            if let Some(&result) = result {
                definitions.insert(result, index);
            }
        }
        Ok(Self {
            instructions,
            definitions,
        })
    }

    fn definition(&self, id: u32) -> Option<&(u32, Vec<u32>)> {
        self.definitions
            .get(&id)
            .and_then(|&index| self.instructions.get(index))
    }

    fn constant(&self, id: u32) -> String {
        match self.definition(id) {
            Some((op, operands)) if is(*op, Op::Constant) => operands
                .get(2)
                .map_or_else(|| String::from("?"), u32::to_string),
            Some((op, operands)) if is(*op, Op::SpecConstant) => format!(
                "spec({})",
                operands
                    .get(2)
                    .map_or_else(|| String::from("?"), u32::to_string)
            ),
            Some((op, _)) if is(*op, Op::SpecConstantOp) => String::from("spec(expression)"),
            _ => String::from("?"),
        }
    }

    fn describe(&self, id: u32) -> String {
        let mut wrappers = Vec::new();
        let mut current = id;
        let base = loop {
            let Some((op, operands)) = self.definition(current) else {
                break String::from("?");
            };
            let operand = |index: usize| operands.get(index).copied().unwrap_or_default();
            if is(*op, Op::TypeInt) {
                let sign = if operand(2) == 0 { "u" } else { "i" };
                break format!("{sign}{}", operand(1));
            } else if is(*op, Op::TypeFloat) {
                break match operands.get(2) {
                    Some(encoding) => format!("f{}e{encoding}", operand(1)),
                    None => format!("f{}", operand(1)),
                };
            } else if is(*op, Op::TypeBool) {
                break String::from("bool");
            } else if is(*op, Op::TypeArray) {
                wrappers.push(format!("[{}]", self.constant(operand(2))));
                current = operand(1);
            } else if is(*op, Op::TypeRuntimeArray) {
                wrappers.push(String::from("[]"));
                current = operand(1);
            } else if is(*op, Op::TypeTensorARM) {
                wrappers.push(format!("tensor(rank {})", self.constant(operand(2))));
                current = operand(1);
            } else if is(*op, Op::TypePointer) {
                wrappers.push(format!("pointer({})", operand(1)));
                current = operand(2);
            } else {
                break format!("op{op}");
            }
        };
        wrappers
            .iter()
            .rev()
            .fold(base, |inner, wrapper| format!("{wrapper} {inner}"))
    }

    fn type_of(&self, id: u32) -> Option<u32> {
        self.definition(id)
            .and_then(|(_, operands)| operands.first().copied())
    }

    fn tensor_operands(&self, operands: &[u32]) -> String {
        match operands {
            [] => String::from("none"),
            [mask] => format!("{mask}"),
            [mask, value, ..] => format!("{mask} {}", self.constant(*value)),
        }
    }

    fn shape(&self) -> Shape {
        let mut names = BTreeMap::new();
        let mut decorations: BTreeMap<u32, Vec<Vec<u32>>> = BTreeMap::new();
        let mut shape = Shape {
            capabilities: BTreeSet::new(),
            extensions: BTreeSet::new(),
            tensor_types: Vec::new(),
            variables: BTreeMap::new(),
            reads: Vec::new(),
            writes: Vec::new(),
            sizes: Vec::new(),
            calls: 0,
        };
        for (op, operands) in &self.instructions {
            let op = *op;
            if is(op, Op::Capability) {
                shape.capabilities.extend(operands.first());
            } else if is(op, Op::Extension) {
                shape.extensions.insert(literal_string(operands));
            } else if is(op, Op::Name) {
                if let Some((&id, name)) = operands.split_first() {
                    names.insert(id, literal_string(name));
                }
            } else if is(op, Op::Decorate) {
                if let Some((&id, decoration)) = operands.split_first() {
                    decorations.entry(id).or_default().push(decoration.to_vec());
                }
            } else if is(op, Op::TypeTensorARM) {
                if let Some(&id) = operands.first() {
                    shape.tensor_types.push(self.describe(id));
                }
            } else if is(op, Op::TensorReadARM) {
                if let [ty, _, _, _, rest @ ..] = operands.as_slice() {
                    shape.reads.push(format!(
                        "{} {}",
                        self.describe(*ty),
                        self.tensor_operands(rest)
                    ));
                }
            } else if is(op, Op::TensorWriteARM) {
                if let [_, _, value, rest @ ..] = operands.as_slice() {
                    let value = self
                        .type_of(*value)
                        .filter(|_| {
                            self.definition(*value)
                                .is_some_and(|(op, _)| is(*op, Op::Constant))
                        })
                        .map_or_else(|| String::from("value"), |ty| self.describe(ty));
                    shape
                        .writes
                        .push(format!("{value} {}", self.tensor_operands(rest)));
                }
            } else if is(op, Op::TensorQuerySizeARM) {
                if let Some(&dimension) = operands.get(3) {
                    shape.sizes.push(self.constant(dimension));
                }
            } else if is(op, Op::FunctionCall) {
                shape.calls += 1;
            }
        }
        for (op, operands) in &self.instructions {
            if !is(*op, Op::Variable) {
                continue;
            }
            let [ty, id, ..] = operands.as_slice() else {
                continue;
            };
            let description = self.describe(*ty);
            if !description.contains("tensor") {
                continue;
            }
            let name = names.get(id).cloned().unwrap_or_default();
            let mut decorated = decorations.get(id).cloned().unwrap_or_default();
            decorated.sort();
            shape.variables.insert(name, (description, decorated));
        }
        shape.tensor_types.sort();
        shape.reads.sort();
        shape.writes.sort();
        shape.sizes.sort();
        shape
    }
}

fn matches_glslang_in(stage: ShaderStage, source: &str, target: Target) -> TestResult<Shape> {
    let ours = Module::new(&compile(stage, source, target)?)?.shape();
    match glslang(stage, source, target, false)? {
        Glslang::Missing => {}
        Glslang::Rejected(lines) => {
            return Err(format!("glslang rejects the shader on lines {lines:?}").into())
        }
        Glslang::Accepted(words) => {
            let theirs = Module::new(&words)?.shape();
            assert_eq!(ours, theirs, "{source}");
        }
    }
    Ok(ours)
}

fn matches_glslang(stage: ShaderStage, source: &str) -> TestResult<Shape> {
    matches_glslang_in(stage, source, VULKAN_1_0)
}

fn rejected_by_rglsl(source: &str, line: u32, message: &str) -> TestResult {
    let errors = rejection_lines(ShaderStage::Compute, source)?;
    let first = errors.first().ok_or("no error")?;
    assert_eq!(first.0, line, "{source}\n{errors:?}");
    assert!(
        errors
            .iter()
            .any(|(at, text)| *at == line && text.contains(message)),
        "{message}: {errors:?}"
    );
    Ok(())
}

fn rejected_like_glslang(source: &str, line: u32, message: &str) -> TestResult {
    rejected_by_rglsl(source, line, message)?;
    if let Glslang::Rejected(lines) = glslang(ShaderStage::Compute, source, VULKAN_1_0, false)? {
        assert_eq!(lines.first(), Some(&line), "glslang: {source}");
    } else if !matches!(
        glslang(ShaderStage::Compute, source, VULKAN_1_0, false)?,
        Glslang::Missing
    ) {
        panic!("glslang accepts {source}");
    }
    Ok(())
}

const PROLOGUE: &str = "#version 460
#extension GL_ARM_tensors : require
#extension GL_ARM_tensors_bfloat16 : require
#extension GL_ARM_tensors_float_e5m2 : require
#extension GL_ARM_tensors_float_e4m3 : require
#extension GL_EXT_shader_explicit_arithmetic_types : require
#extension GL_EXT_bfloat16 : require
#extension GL_EXT_float_e5m2 : require
#extension GL_EXT_float_e4m3 : require
layout(local_size_x = 1) in;
";

const ELEMENTS: [(&str, &str, &str); 15] = [
    ("bool", "bool", "true"),
    ("int8_t", "i8", "int8_t(-3)"),
    ("int16_t", "i16", "int16_t(-3)"),
    ("int32_t", "i32", "-3"),
    ("int64_t", "i64", "-3l"),
    ("uint8_t", "u8", "uint8_t(3)"),
    ("uint16_t", "u16", "uint16_t(3)"),
    ("uint32_t", "u32", "3u"),
    ("uint64_t", "u64", "3ul"),
    ("float16_t", "f16", "1.5hf"),
    ("float32_t", "f32", "1.5"),
    ("float64_t", "f64", "1.5lf"),
    ("bfloat16_t", "f16e0", "bfloat16_t(1.5)"),
    ("floate5m2_t", "f8e4215", "floate5m2_t(1.5)"),
    ("floate4m3_t", "f8e4214", "floate4m3_t(1.5)"),
];

fn coordinates(rank: u32) -> String {
    let zeros: Vec<&str> = (0..rank).map(|_| "0u").collect();
    format!("uint[]({})", zeros.join(", "))
}

#[test]
fn every_element_type_and_rank() -> TestResult {
    for (index, (keyword, _, value)) in ELEMENTS.iter().enumerate() {
        let rank = u32::try_from(index)? + 1;
        let coordinates = coordinates(rank);
        let last = rank - 1;
        let source = format!(
            "{PROLOGUE}
layout(set = 0, binding = 0) uniform tensorARM<{keyword}, {rank}> t;
layout(set = 0, binding = 1) buffer B {{ {keyword} scalar; {keyword} array[3]; uint size; }} b;
void main() {{
    tensorReadARM(t, {coordinates}, b.scalar);
    tensorReadARM(t, {coordinates}, b.array, gl_TensorOperandsOutOfBoundsValueARM, {value});
    {keyword} local[2];
    tensorReadARM(t, {coordinates}, local, gl_TensorOperandsNonTemporalARM);
    tensorWriteARM(t, {coordinates}, local);
    tensorWriteARM(t, {coordinates}, b.scalar, gl_TensorOperandsNonTemporalARM);
    b.size = tensorSizeARM(t, 0) + tensorSizeARM(t, {last});
}}
"
        );
        let shape = matches_glslang_in(ShaderStage::Compute, &source, VULKAN_1_3)?;
        assert_eq!(shape.tensor_types.len(), 1, "{keyword}");
        assert!(
            shape
                .capabilities
                .contains(&(spirv::Capability::TensorsARM as u32)),
            "{keyword}"
        );
        assert!(shape.extensions.contains("SPV_ARM_tensors"));
        assert_eq!(shape.reads.len(), 3, "{keyword}");
        assert_eq!(shape.writes.len(), 2, "{keyword}");
        let mut sizes = vec![String::from("0"), last.to_string()];
        sizes.sort();
        assert_eq!(shape.sizes, sizes, "{keyword}");
    }
    Ok(())
}

#[test]
fn element_types_declared_together() -> TestResult {
    let mut declarations = String::new();
    for (binding, (keyword, _, _)) in ELEMENTS.iter().enumerate() {
        let rank = binding + 1;
        declarations.push_str(&format!(
            "layout(set = 1, binding = {binding}) uniform tensorARM<{keyword}, {rank}> t{binding};\n"
        ));
    }
    let source = format!("{PROLOGUE}{declarations}void main() {{}}\n");
    let shape = matches_glslang_in(ShaderStage::Compute, &source, VULKAN_1_3)?;
    let mut expected: Vec<String> = ELEMENTS
        .iter()
        .enumerate()
        .map(|(index, (_, short, _))| format!("tensor(rank {}) {short}", index + 1))
        .collect();
    expected.sort();
    assert_eq!(shape.tensor_types, expected);
    for capability in [
        spirv::Capability::Int8,
        spirv::Capability::Int16,
        spirv::Capability::Int64,
        spirv::Capability::Float16,
        spirv::Capability::Float64,
        spirv::Capability::BFloat16TypeKHR,
        spirv::Capability::Float8EXT,
    ] {
        assert!(
            shape.capabilities.contains(&(capability as u32)),
            "{capability:?}"
        );
    }
    Ok(())
}

#[test]
fn tensor_operand_forms() -> TestResult {
    let source = "#version 460
#extension GL_ARM_tensors : require
layout(local_size_x = 1) in;
layout(set = 0, binding = 0) uniform tensorARM<float, 2> t;
layout(set = 0, binding = 1) buffer B { float value; float values[4]; vec4 v; } b;
const uint both = gl_TensorOperandsNonTemporalARM | gl_TensorOperandsOutOfBoundsValueARM;
void main() {
    uint c[2] = uint[](1u, 0u);
    tensorReadARM(t, c, b.value);
    tensorReadARM(t, c, b.value, 0u);
    tensorReadARM(t, c, b.value, 0);
    tensorReadARM(t, c, b.value, gl_TensorOperandsNonTemporalARM);
    tensorReadARM(t, c, b.value, 1);
    tensorReadARM(t, c, b.value, gl_TensorOperandsOutOfBoundsValueARM, -1.0);
    tensorReadARM(t, c, b.values, both, 2.5);
    tensorReadARM(t, c, b.v.y, 3u, 0.25);
    tensorReadARM(t, c, b.values[2], 4u);
    tensorWriteARM(t, c, b.value);
    tensorWriteARM(t, c, b.values, 0u);
    tensorWriteARM(t, c, b.v.z, gl_TensorOperandsNonTemporalARM);
    tensorWriteARM(t, uint[](0u, 1u), 2.0, 5u);
    tensorWriteARM(t, c, float[](1.0, 2.0));
}
";
    let shape = matches_glslang(ShaderStage::Compute, source)?;
    let reads: Vec<&str> = shape.reads.iter().map(String::as_str).collect();
    assert_eq!(reads, READS);
    let writes: Vec<&str> = shape.writes.iter().map(String::as_str).collect();
    assert_eq!(writes, WRITES);
    Ok(())
}

const READS: [&str; 9] = [
    "[4] f32 3 1075838976",
    "f32 1",
    "f32 1",
    "f32 2 3212836864",
    "f32 3 1048576000",
    "f32 none",
    "f32 none",
    "f32 none",
    "f32 none",
];
const WRITES: [&str; 5] = ["f32 1", "value 1", "value none", "value none", "value none"];

#[test]
fn arrays_of_tensors() -> TestResult {
    let source = "#version 460
#extension GL_ARM_tensors : require
layout(local_size_x = 1) in;
layout(set = 0, binding = 0) uniform tensorARM<float, 2> ta[4];
readonly layout(set = 0, binding = 1) uniform tensorARM<int, 1> tr[2];
layout(set = 0, binding = 2) buffer B { uint index; float value; int number; uint size; } b;
uint sizeOf(readonly writeonly tensorARM<float, 2> tensor) {
    return tensorSizeARM(tensor, 1);
}
void main() {
    float d;
    tensorReadARM(ta[b.index], uint[](0u, 1u), d);
    b.value = d;
    tensorWriteARM(ta[2], uint[](b.index, 1u), d, gl_TensorOperandsNonTemporalARM);
    tensorReadARM(tr[b.index & 1u], uint[](0u), b.number);
    b.size = tensorSizeARM(tr[1], 0) + sizeOf(ta[b.index]) + sizeOf(ta[3]);
}
";
    let shape = matches_glslang(ShaderStage::Compute, source)?;
    assert_eq!(
        shape.variables.get("ta").map(|(ty, _)| ty.as_str()),
        Some("pointer(0) [4] tensor(rank 2) f32")
    );
    assert_eq!(shape.calls, 2);
    Ok(())
}

#[test]
fn function_parameters() -> TestResult {
    let source = "#version 460
#extension GL_ARM_tensors : require
layout(local_size_x = 1) in;
layout(set = 0, binding = 0) uniform tensorARM<uint, 3> t;
readonly layout(set = 0, binding = 1) uniform tensorARM<uint, 3> r;
writeonly layout(set = 0, binding = 2) uniform tensorARM<uint, 3> w;
layout(set = 0, binding = 3) buffer B { uint values[2]; uint total; } b;
uint load(readonly tensorARM<uint, 3> tensor, uint x) {
    uint value;
    tensorReadARM(tensor, uint[](x, 0u, 0u), value);
    return value;
}
void store(writeonly tensorARM<uint, 3> tensor, uint value) {
    tensorWriteARM(tensor, uint[](0u, value, 0u), value, gl_TensorOperandsNonTemporalARM);
}
uint total(tensorARM<uint, 3> tensor) {
    store(tensor, load(tensor, 1u));
    return tensorSizeARM(tensor, 2);
}
void copy(readonly tensorARM<uint, 3> from, writeonly tensorARM<uint, 3> to) {
    uint values[2];
    tensorReadARM(from, uint[](0u, 0u, 0u), values);
    tensorWriteARM(to, uint[](0u, 0u, 0u), values);
}
void main() {
    b.total = total(t) + load(r, 0u) + load(t, 2u);
    store(w, b.values[0]);
    copy(r, w);
    copy(t, t);
}
";
    let shape = matches_glslang(ShaderStage::Compute, source)?;
    assert_eq!(shape.calls, 8);
    Ok(())
}

#[test]
fn memory_qualifiers_decorate_the_variables() -> TestResult {
    use spirv::Decoration as D;
    let source = "#version 460
#extension GL_ARM_tensors : require
layout(local_size_x = 1) in;
layout(binding = 0) uniform coherent tensorARM<float, 1> t0;
layout(binding = 1) uniform volatile tensorARM<float, 1> t1;
layout(binding = 2) uniform readonly writeonly tensorARM<float, 1> t2;
layout(binding = 3) uniform restrict readonly tensorARM<float, 1> t3;
layout(binding = 4) uniform writeonly tensorARM<float, 1> t4;
layout(binding = 5) uniform coherent volatile restrict tensorARM<float, 1> t5;
layout(binding = 6) buffer B { uint size; float value; } b;
uint use(coherent volatile tensorARM<float, 1> x) { return 0u; }
void main() {
    b.size = use(t0) + use(t1) + use(t5) + tensorSizeARM(t2, 0);
    tensorReadARM(t3, uint[](0u), b.value);
    tensorWriteARM(t4, uint[](0u), b.value);
}
";
    let shape = matches_glslang(ShaderStage::Compute, source)?;
    let decorations = |name: &str| {
        shape
            .variables
            .get(name)
            .map(|(_, decorations)| {
                decorations
                    .iter()
                    .filter_map(|decoration| decoration.first().copied())
                    .collect::<BTreeSet<u32>>()
            })
            .unwrap_or_default()
    };
    let set = |decorations: &[D]| -> BTreeSet<u32> {
        decorations
            .iter()
            .map(|&decoration| decoration as u32)
            .chain([D::Binding as u32, D::DescriptorSet as u32])
            .collect()
    };
    assert_eq!(decorations("t0"), set(&[D::Coherent]));
    assert_eq!(decorations("t1"), set(&[D::Volatile, D::Coherent]));
    assert_eq!(decorations("t2"), set(&[D::NonWritable, D::NonReadable]));
    assert_eq!(decorations("t3"), set(&[D::Restrict, D::NonWritable]));
    assert_eq!(decorations("t4"), set(&[D::NonReadable]));
    assert_eq!(
        decorations("t5"),
        set(&[D::Restrict, D::Volatile, D::Coherent])
    );
    Ok(())
}

#[test]
fn fragment_and_vertex_stages() -> TestResult {
    let fragment = "#version 450
#extension GL_ARM_tensors : require
layout(set = 0, binding = 0) uniform tensorARM<float, 2> image;
layout(location = 0) out vec4 color;
void main() {
    float value;
    tensorReadARM(image, uint[](uint(gl_FragCoord.x), uint(gl_FragCoord.y)), value,
                  gl_TensorOperandsOutOfBoundsValueARM, 0.0);
    color = vec4(value, float(tensorSizeARM(image, 0)), 0.0, 1.0);
}
";
    let shape = matches_glslang(ShaderStage::Fragment, fragment)?;
    assert_eq!(shape.reads.len(), 1);
    let vertex = "#version 460
#extension GL_ARM_tensors : require
layout(set = 0, binding = 0) uniform tensorARM<float, 1> positions;
void main() {
    float values[4];
    tensorReadARM(positions, uint[](uint(gl_VertexIndex) * 4u), values);
    gl_Position = vec4(values[0], values[1], values[2], values[3]);
}
";
    let shape = matches_glslang(ShaderStage::Vertex, vertex)?;
    assert_eq!(shape.reads, ["[4] f32 none"]);
    Ok(())
}

#[test]
fn specialization_constant_ranks() -> TestResult {
    let source = "#version 460
#extension GL_ARM_tensors : require
layout(local_size_x = 1) in;
layout(constant_id = 0) const int R = 2;
layout(constant_id = 1) const uint S = 3u;
layout(set = 0, binding = 0) uniform tensorARM<float, R> t;
layout(set = 0, binding = 1) uniform tensorARM<int, S> u;
layout(set = 0, binding = 2) uniform tensorARM<float, 3> v;
layout(set = 0, binding = 3) buffer B { uint size; float value; int number; } b;
void main() {
    b.size = tensorSizeARM(t, 1) + tensorSizeARM(u, 2);
    uint c[R];
    c[0] = 0u;
    c[1] = 1u;
    tensorReadARM(t, c, b.value);
    float values[R];
    tensorReadARM(t, uint[](0u, 1u), values);
    tensorWriteARM(t, c, values);
    tensorReadARM(u, uint[](0u, 0u, 0u), b.number);
    uint d[S];
    tensorReadARM(v, d, b.value);
}
";
    let shape = matches_glslang(ShaderStage::Compute, source)?;
    assert_eq!(
        shape.tensor_types,
        [
            "tensor(rank 3) f32",
            "tensor(rank spec(2)) f32",
            "tensor(rank spec(3)) i32"
        ]
    );
    let rejected = "#version 460
#extension GL_ARM_tensors : require
layout(constant_id = 0) const int R = 2;
layout(set = 0, binding = 0) uniform tensorARM<float, R> t;
layout(set = 0, binding = 1) buffer B { uint size; float value; } b;
void main() {
    uint c[3];
    tensorReadARM(t, c, b.value);
    b.size = tensorSizeARM(t, 2);
}
";
    let errors = rejection_lines(ShaderStage::Compute, rejected)?;
    let lines: Vec<u32> = errors.iter().map(|(line, _)| *line).collect();
    assert_eq!(lines, [8, 9], "{errors:?}");
    Ok(())
}

#[test]
fn descriptor_heap_tensors() -> TestResult {
    let source = "#version 460
#extension GL_EXT_descriptor_heap : require
#extension GL_ARM_tensors : require
#extension GL_EXT_shader_explicit_arithmetic_types : require
layout(local_size_x = 1) in;
layout(descriptor_heap) uniform tensorARM<float, 2> floatTensors[];
layout(descriptor_heap) uniform tensorARM<int, 4> intTensors[3];
layout(descriptor_heap) buffer O { uint index; float value; int number; uint size; } ssbo[];
void main() {
    float d;
    tensorReadARM(floatTensors[1], uint[](0u, 1u), d, gl_TensorOperandsOutOfBoundsValueARM, 1.5);
    ssbo[0].value = d;
    tensorWriteARM(floatTensors[2], uint[](ssbo[0].index, 1u), ssbo[0].value);
    tensorReadARM(intTensors[0], uint[](0u, 0u, 0u, 0u), ssbo[1].number);
    ssbo[0].size = tensorSizeARM(intTensors[1], 3) + tensorSizeARM(floatTensors[0], 0);
}
";
    let shape = matches_glslang_in(ShaderStage::Compute, source, VULKAN_1_1_SPIRV_1_4)?;
    assert_eq!(
        shape.tensor_types,
        ["tensor(rank 2) f32", "tensor(rank 4) i32"]
    );
    assert_eq!(shape.sizes, ["0", "3"]);
    let corpus = "#version 460 core
#extension GL_ARM_tensors : enable
#extension GL_EXT_descriptor_heap : require
#extension GL_EXT_shader_explicit_arithmetic_types : enable
layout(set = 0, binding = 0) uniform tensorARM<int32_t, 4> t;
layout(descriptor_heap) buffer O { int32_t out_data; } ssbo[];
void main() {
    tensorReadARM(t, uint[](1, 2, 3, 4), ssbo[1].out_data);
}
";
    matches_glslang_in(ShaderStage::Compute, corpus, VULKAN_1_1_SPIRV_1_4)?;
    Ok(())
}

#[test]
fn extra_arguments_are_evaluated() -> TestResult {
    let source = "#version 460
#extension GL_ARM_tensors : require
layout(local_size_x = 1) in;
layout(set = 0, binding = 0) uniform tensorARM<float, 1> t;
layout(set = 0, binding = 1) buffer B { float value; uint counter; } b;
float bump() {
    b.counter += 1u;
    return 2.0;
}
void main() {
    tensorReadARM(t, uint[](0u), b.value, 0u, bump());
    tensorReadARM(t, uint[](0u), b.value, gl_TensorOperandsOutOfBoundsValueARM, 1.0, bump());
    tensorWriteARM(t, uint[](0u), b.value, gl_TensorOperandsNonTemporalARM, bump(), bump());
}
";
    let shape = matches_glslang(ShaderStage::Compute, source)?;
    assert_eq!(shape.calls, 4);
    Ok(())
}

#[test]
fn debug_information_describes_tensors_as_glslang() -> TestResult {
    let source = "#version 460
#extension GL_ARM_tensors : require
layout(local_size_x = 1) in;
layout(set = 0, binding = 0) uniform tensorARM<float, 2> t;
layout(set = 0, binding = 1) buffer B { float value; } b;
uint size(tensorARM<float, 2> tensor) {
    return tensorSizeARM(tensor, 0);
}
void main() {
    tensorReadARM(t, uint[](size(t), 0u), b.value);
}
";
    let strings = |words: &[u32]| -> TestResult<BTreeSet<String>> {
        Ok(instructions(words)?
            .into_iter()
            .filter(|(op, _)| is(*op, Op::String))
            .filter_map(|(_, operands)| operands.get(1..).map(literal_string))
            .filter(|string| !string.contains('\n'))
            .collect())
    };
    let ours = strings(&compile_with(
        ShaderStage::Compute,
        source,
        VULKAN_1_3,
        true,
    )?)?;
    assert!(ours.contains("tensorARM"), "{ours:?}");
    if let Glslang::Accepted(words) = glslang(ShaderStage::Compute, source, VULKAN_1_3, true)? {
        let theirs = strings(&words)?;
        for expected in ["tensorARM", "t", "tensor", "size"] {
            assert_eq!(
                ours.contains(expected),
                theirs.contains(expected),
                "{expected}: {ours:?} {theirs:?}"
            );
        }
    }
    Ok(())
}

const ERROR_PROLOGUE: &str = "#version 460
#extension GL_ARM_tensors : require
layout(set = 0, binding = 0) uniform tensorARM<float, 2> t;
layout(set = 0, binding = 1) buffer B { uint size; float value; int number; float values[2][2]; } b;
";

#[test]
fn call_errors_on_glslang_lines() -> TestResult {
    let cases = [
        ("tensorReadARM(t, uint[](0u), b.value);", "number of coordinates"),
        ("tensorReadARM(t, uint[](0u, 0u), b.number);", "data argument type"),
        ("tensorWriteARM(t, uint[](0u, 0u), b.number);", "data argument type"),
        ("tensorReadARM(t, int[](0, 0), b.value);", "no overload"),
        ("tensorReadARM(t, uint[](0u, 0u), b.values);", "no overload"),
        ("tensorReadARM(t, uint[](0u, 0u), b.value, 1ul);", "no overload"),
        ("tensorReadARM(t, uint[](0u, 0u), b.value, 1.0);", "no overload"),
        (
            "tensorReadARM(t, uint[](0u, 0u), b.value, b.size);",
            "constant integral",
        ),
        (
            "tensorReadARM(t, uint[](0u, 0u), b.value, gl_TensorOperandsOutOfBoundsValueARM);",
            "out-of-bounds value as next argument",
        ),
        (
            "tensorReadARM(t, uint[](0u, 0u), b.value, gl_TensorOperandsOutOfBoundsValueARM, b.value);",
            "must be constant",
        ),
        (
            "tensorReadARM(t, uint[](0u, 0u), b.value, gl_TensorOperandsOutOfBoundsValueARM, 1);",
            "out-of-bounds value type",
        ),
        (
            "tensorWriteARM(t, uint[](0u, 0u), b.value, gl_TensorOperandsOutOfBoundsValueARM, 1.0);",
            "only valid with tensorReadARM",
        ),
        ("tensorReadARM(t, uint[](0u, 0u), 1.0);", "l-value"),
        ("b.size = tensorSizeARM(t, 2);", "exceeds tensor rank"),
        ("b.size = tensorSizeARM(t, -1);", "exceeds tensor rank"),
        ("b.size = tensorSizeARM(t, b.size);", "must be constant"),
        ("b.size = tensorSizeARM(t, 1ul);", "no overload"),
        ("b.size = tensorSizeARM(t);", "no overload"),
        ("b.size = tensorSizeARM(b.size, 0);", "no overload"),
        ("tensorARM<float, 2> local;", "opaque"),
        ("t = t;", "l-value"),
    ];
    for (statement, message) in cases {
        let source = format!("{ERROR_PROLOGUE}void main() {{\n    {statement}\n}}\n");
        rejected_like_glslang(&source, 6, message)?;
    }
    Ok(())
}

#[test]
fn declaration_errors_on_glslang_lines() -> TestResult {
    let declarations = [
        ("uniform tensorARM t2;", "missing type parameters"),
        (
            "uniform tensorARM<float, 0> t2;",
            "greater than or equal to 1",
        ),
        ("uniform tensorARM<float, 1, 2> t2;", "exactly 1 rank"),
        ("uniform tensorARM<float, 16> t2;", "at most 15"),
        ("tensorARM<float, 1> t2;", "opaque"),
        ("shared tensorARM<float, 1> t2;", "opaque"),
        (
            "layout(binding = 2) uniform U { tensorARM<float, 1> member; } u;",
            "opaque",
        ),
    ];
    for (declaration, message) in declarations {
        let source = format!("{ERROR_PROLOGUE}{declaration}\nvoid main() {{}}\n");
        rejected_like_glslang(&source, 5, message)?;
    }
    for declaration in [
        "uniform tensorARM<vec2, 1> t2;",
        "uniform tensorARM<mat2, 1> t2;",
    ] {
        let source = format!("{ERROR_PROLOGUE}{declaration}\nvoid main() {{}}\n");
        rejected_by_rglsl(&source, 5, "expected bool, integer or floating point")?;
    }
    Ok(())
}

#[test]
fn memory_qualifiers_cannot_be_dropped() -> TestResult {
    for qualifier in [
        "coherent",
        "volatile",
        "devicecoherent",
        "queuefamilycoherent",
        "workgroupcoherent",
        "subgroupcoherent",
    ] {
        for statement in [
            "b.size = tensorSizeARM(t, 0);",
            "tensorReadARM(t, uint[](0u), b.value);",
            "tensorWriteARM(t, uint[](0u), b.value);",
        ] {
            let source = format!(
                "#version 460
#extension GL_ARM_tensors : require
#extension GL_KHR_memory_scope_semantics : require
layout(set = 0, binding = 0) uniform {qualifier} tensorARM<float, 1> t;
layout(set = 0, binding = 1) buffer B {{ uint size; float value; }} b;
void main() {{
    {statement}
}}
"
            );
            rejected_like_glslang(&source, 7, qualifier)?;
        }
    }
    for (qualifier, statement) in [
        ("readonly", "tensorWriteARM(t, uint[](0u), b.value);"),
        ("writeonly", "tensorReadARM(t, uint[](0u), b.value);"),
    ] {
        let source = format!(
            "#version 460
#extension GL_ARM_tensors : require
layout(set = 0, binding = 0) uniform {qualifier} tensorARM<float, 1> t;
layout(set = 0, binding = 1) buffer B {{ uint size; float value; }} b;
void main() {{
    {statement}
}}
"
        );
        rejected_like_glslang(&source, 6, qualifier)?;
    }
    Ok(())
}

#[test]
fn small_types_need_arithmetic_extensions_in_calls() -> TestResult {
    for (extension, keyword, statement) in [
        (
            "GL_EXT_shader_16bit_storage",
            "float16_t",
            "b.size = tensorSizeARM(t, 0);",
        ),
        (
            "GL_EXT_shader_16bit_storage",
            "float16_t",
            "tensorReadARM(t, uint[](0u), b.value);",
        ),
        (
            "GL_EXT_shader_16bit_storage",
            "int16_t",
            "tensorWriteARM(t, uint[](0u), b.value);",
        ),
        (
            "GL_EXT_shader_8bit_storage",
            "uint8_t",
            "tensorReadARM(t, uint[](0u), b.value);",
        ),
    ] {
        let source = format!(
            "#version 460
#extension GL_ARM_tensors : require
#extension {extension} : require
layout(set = 0, binding = 0) uniform tensorARM<{keyword}, 1> t;
layout(set = 0, binding = 1) buffer B {{ uint size; {keyword} value; }} b;
void main() {{
    {statement}
}}
"
        );
        rejected_like_glslang(&source, 7, "can only be in uniform block or buffer storage")?;
    }
    let parameter = "#version 460
#extension GL_ARM_tensors : require
#extension GL_EXT_shader_16bit_storage : require
layout(set = 0, binding = 0) uniform tensorARM<float16_t, 1> t;
void use(tensorARM<float16_t, 1> tensor) {}
void main() { use(t); }
";
    rejected_like_glslang(
        parameter,
        5,
        "can only be in uniform block or buffer storage",
    )
}

#[test]
fn unsized_tensor_arrays_need_constant_indices() -> TestResult {
    let source = "#version 460
#extension GL_ARM_tensors : require
#extension GL_EXT_nonuniform_qualifier : require
layout(set = 0, binding = 0) uniform tensorARM<float, 1> t[];
layout(set = 0, binding = 1) buffer B { uint index; float value; } b;
void main() {
    tensorReadARM(t[nonuniformEXT(b.index)], uint[](0u), b.value);
}
";
    rejected_like_glslang(source, 7, "unsized array")
}

#[test]
fn extensions_are_required() -> TestResult {
    let plain = "#version 460
layout(set = 0, binding = 0) uniform tensorARM<float, 1> t;
void main() {}
";
    rejected_like_glslang(plain, 2, "GL_ARM_tensors")?;
    for (keyword, extension, tensor_extension) in [
        ("bfloat16_t", "GL_EXT_bfloat16", "GL_ARM_tensors_bfloat16"),
        (
            "floate5m2_t",
            "GL_EXT_float_e5m2",
            "GL_ARM_tensors_float_e5m2",
        ),
        (
            "floate4m3_t",
            "GL_EXT_float_e4m3",
            "GL_ARM_tensors_float_e4m3",
        ),
    ] {
        let source = format!(
            "#version 460
#extension GL_ARM_tensors : require
#extension {extension} : require
layout(set = 0, binding = 0) uniform tensorARM<{keyword}, 1> t;
void main() {{}}
"
        );
        rejected_like_glslang(&source, 4, tensor_extension)?;
    }
    Ok(())
}
