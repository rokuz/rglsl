use alloc::{format, string::String, vec::Vec};

use spirv::Word;

use super::{helpers, Block, Function, Instruction, Writer};
use crate::{arena::Handle, FastHashMap};

const MARKER: u32 = u32::MAX;
const MARK_LOCATION: Word = 0;
const MARK_DECLARE: Word = 1;
const MARK_END: Word = 2;
const MARK_SCOPE: Word = 3;

const NON_SEMANTIC_SET: &str = "NonSemantic.Shader.DebugInfo.100";
const NON_SEMANTIC_SET_101: &str = "NonSemantic.Shader.DebugInfo.101";
const NON_SEMANTIC_SET_102: &str = "NonSemantic.Shader.DebugInfo.102";
const DEBUG_ENTRY_POINT: Word = 107;
const OP_EXT_INST_WITH_FORWARD_REFS: u32 = 4433;
const MAX_STRING_BYTES: usize = 4 * (0xFFFF - 4) - 1;

const DEBUG_INFO_NONE: Word = 0;
const DEBUG_COMPILATION_UNIT: Word = 1;
const DEBUG_TYPE_BASIC: Word = 2;
const DEBUG_TYPE_POINTER: Word = 3;
const DEBUG_TYPE_ARRAY: Word = 5;
const DEBUG_TYPE_VECTOR: Word = 6;
const DEBUG_TYPE_FUNCTION: Word = 8;
const DEBUG_TYPE_COMPOSITE: Word = 10;
const DEBUG_TYPE_MEMBER: Word = 11;
const DEBUG_GLOBAL_VARIABLE: Word = 18;
const DEBUG_FUNCTION: Word = 20;
const DEBUG_LEXICAL_BLOCK: Word = 21;
const DEBUG_SCOPE: Word = 23;
const DEBUG_LOCAL_VARIABLE: Word = 26;
const DEBUG_DECLARE: Word = 28;
const DEBUG_VALUE: Word = 29;
const DEBUG_EXPRESSION: Word = 31;
const DEBUG_SOURCE: Word = 35;
const DEBUG_FUNCTION_DEFINITION: Word = 101;
const DEBUG_SOURCE_CONTINUED: Word = 102;
const DEBUG_LINE: Word = 103;
const DEBUG_TYPE_MATRIX: Word = 108;
const DEBUG_TYPE_COOPERATIVE_MATRIX: Word = 110;

const FLAG_IS_PUBLIC: Word = 3;
const FLAG_IS_LOCAL: Word = 4;
const FLAG_IS_DEFINITION: Word = 8;

const ENCODING_BOOLEAN: Word = 2;
const ENCODING_FLOAT: Word = 3;
const ENCODING_SIGNED: Word = 4;
const ENCODING_UNSIGNED: Word = 6;

const TAG_STRUCTURE: Word = 1;
const LANGUAGE_GLSL: Word = 2;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum DebugLevel {
    #[default]
    None,
    Lines,
    NonSemantic,
}

#[derive(Debug, Clone, Copy, Default)]
pub struct DebugInfo<'a> {
    pub level: DebugLevel,
    pub source_text: bool,
    pub processes: &'a [String],
    pub entry_point: Option<DebugEntryPoint<'a>>,
}

#[derive(Debug, Clone, Copy)]
pub struct DebugEntryPoint<'a> {
    pub signature: &'a str,
    pub arguments: &'a str,
    pub directory: Option<&'a str>,
}

#[derive(Default)]
pub(super) struct DebugState {
    pub(super) level: DebugLevel,
    pub(super) source_text: bool,
    pub(super) processes: Vec<String>,
    entry_point: Option<(String, String, Option<String>)>,
    active: bool,
    set: Word,
    strings: FastHashMap<String, Word>,
    string_instructions: Vec<Instruction>,
    source_instructions: Vec<Instruction>,
    declarations: Vec<Instruction>,
    files: Vec<Word>,
    units: Vec<Word>,
    scope_index: crate::ScopeIndex,
    scopes: Vec<Word>,
    types: FastHashMap<Handle<crate::Type>, Word>,
    basics: FastHashMap<crate::Scalar, Word>,
    vectors: FastHashMap<(Word, u32), Word>,
    pointers: FastHashMap<(Word, Word), Word>,
    opaques: FastHashMap<String, Word>,
    function_types: FastHashMap<Vec<Word>, Word>,
    none: Word,
    expression: Word,
    function: Option<FunctionState>,
    anchors: crate::DebugInfo,
    workgroup_size: Word,
    reserved: FastHashMap<Handle<crate::Type>, Word>,
    pending: crate::FastHashSet<Word>,
    line_lengths: Vec<Vec<u32>>,
    constants: Vec<(u32, Handle<crate::Constant>)>,
    privates: Vec<(u32, Handle<crate::GlobalVariable>)>,
    structs: FastHashMap<String, Vec<usize>>,
    pub(super) buffer_type: bool,
}

struct FunctionState {
    scope: Word,
    unit: Word,
    range: (u32, u32),
    position: Location,
    end: Option<Location>,
    declares: Vec<Declare>,
    cursor: usize,
    prelude: Vec<Instruction>,
}

#[derive(Clone, Copy)]
struct Declare {
    offset: u32,
    variable: Word,
    target: Word,
    value: bool,
}

#[derive(Clone, Copy, PartialEq, Eq)]
struct Location {
    scope: Word,
    source: u32,
    line: u32,
}

impl DebugState {
    pub(super) fn new(options: Option<&DebugInfo<'_>>) -> Self {
        options.map_or_else(Self::default, |options| Self {
            level: options.level,
            source_text: options.source_text,
            processes: options.processes.to_vec(),
            entry_point: options.entry_point.map(|entry| {
                (
                    String::from(entry.signature),
                    String::from(entry.arguments),
                    entry.directory.map(String::from),
                )
            }),
            ..Self::default()
        })
    }

    pub(super) fn reset(&mut self) {
        let level = self.level;
        let source_text = self.source_text;
        let processes = core::mem::take(&mut self.processes);
        let entry_point = self.entry_point.take();
        *self = Self {
            level,
            source_text,
            processes,
            entry_point,
            ..Self::default()
        };
    }

    const fn tracking(&self) -> bool {
        self.active && self.function.is_some()
    }
}

fn split_text(text: &str) -> Vec<&str> {
    let mut chunks = Vec::new();
    let mut rest = text;
    while rest.len() > MAX_STRING_BYTES {
        let mut cut = MAX_STRING_BYTES;
        while !rest.is_char_boundary(cut) {
            cut -= 1;
        }
        let (head, tail) = rest.split_at(cut);
        chunks.push(head);
        rest = tail;
    }
    chunks.push(rest);
    chunks
}

fn image_name(dim: crate::ImageDimension, arrayed: bool, class: crate::ImageClass) -> String {
    let dim = match dim {
        crate::ImageDimension::D1 => "1D",
        crate::ImageDimension::D2 => "2D",
        crate::ImageDimension::D3 => "3D",
        crate::ImageDimension::Cube => "Cube",
        crate::ImageDimension::Buffer => "Buffer",
        crate::ImageDimension::Subpass => "",
        crate::ImageDimension::TileImageData => "",
    };
    let (prefix, base, multi) = match class {
        crate::ImageClass::Sampled { kind, multi } => (kind_prefix(kind), "texture", multi),
        crate::ImageClass::Depth { multi } => ("", "texture", multi),
        crate::ImageClass::External => ("", "texture", false),
        crate::ImageClass::Storage { format, multi, .. } => (
            kind_prefix(crate::Scalar::from(format).kind),
            "image",
            multi,
        ),
    };
    let base = if dim.is_empty() { "subpassInput" } else { base };
    format!(
        "{prefix}{base}{dim}{}{}",
        if multi { "MS" } else { "" },
        if arrayed { "Array" } else { "" }
    )
}

fn sampled_image_name(
    dim: crate::ImageDimension,
    arrayed: bool,
    class: crate::ImageClass,
) -> String {
    let name = image_name(dim, arrayed, class)
        .replacen("texture", "sampler", 1)
        .replacen("image", "sampler", 1);
    match class {
        crate::ImageClass::Depth { .. } => format!("{name}Shadow"),
        _ => name,
    }
}

const fn kind_prefix(kind: crate::ScalarKind) -> &'static str {
    match kind {
        crate::ScalarKind::Sint | crate::ScalarKind::AbstractInt => "i",
        crate::ScalarKind::Uint => "u",
        crate::ScalarKind::Float
        | crate::ScalarKind::Bool
        | crate::ScalarKind::BFloat
        | crate::ScalarKind::FloatE4M3
        | crate::ScalarKind::FloatE5M2
        | crate::ScalarKind::FloatE2M1
        | crate::ScalarKind::FloatE3M2
        | crate::ScalarKind::FloatE2M3
        | crate::ScalarKind::FloatUE8M0
        | crate::ScalarKind::FloatMXINT8
        | crate::ScalarKind::AbstractFloat => "",
    }
}

fn scalar_name(scalar: crate::Scalar) -> (&'static str, Word) {
    let bits = u32::from(scalar.width) * 8;
    match scalar.kind {
        crate::ScalarKind::Bool => ("bool", ENCODING_BOOLEAN),
        crate::ScalarKind::Sint | crate::ScalarKind::AbstractInt => (
            match bits {
                8 => "int8_t",
                16 => "int16_t",
                64 => "int64_t",
                _ => "int",
            },
            ENCODING_SIGNED,
        ),
        crate::ScalarKind::Uint => (
            match bits {
                8 => "uint8_t",
                16 => "uint16_t",
                64 => "uint64_t",
                _ => "uint",
            },
            ENCODING_UNSIGNED,
        ),
        crate::ScalarKind::Float | crate::ScalarKind::AbstractFloat => (
            match bits {
                16 => "float16_t",
                64 => "double",
                _ => "float",
            },
            ENCODING_FLOAT,
        ),
        crate::ScalarKind::BFloat => ("bfloat16_t", ENCODING_FLOAT),
        crate::ScalarKind::FloatE4M3 => ("floate4m3_t", ENCODING_FLOAT),
        crate::ScalarKind::FloatE5M2 => ("floate5m2_t", ENCODING_FLOAT),
        crate::ScalarKind::FloatE2M1 => ("floate2m1_t", ENCODING_FLOAT),
        crate::ScalarKind::FloatE3M2 => ("floate3m2_t", ENCODING_FLOAT),
        crate::ScalarKind::FloatE2M3 => ("floate2m3_t", ENCODING_FLOAT),
        crate::ScalarKind::FloatUE8M0 => ("floatue8m0_t", ENCODING_FLOAT),
        crate::ScalarKind::FloatMXINT8 => ("floatmxint8_t", ENCODING_FLOAT),
    }
}

fn parameter_copies(function: &crate::Function) -> FastHashMap<u32, Handle<crate::LocalVariable>> {
    let mut copies = FastHashMap::default();
    for statement in function.body.iter() {
        match *statement {
            crate::Statement::Emit(_) => {}
            crate::Statement::Store { pointer, value } => {
                let local = match function.expressions.try_get(pointer) {
                    Ok(&crate::Expression::LocalVariable(local)) => local,
                    _ => break,
                };
                let index = match function.expressions.try_get(value) {
                    Ok(&crate::Expression::FunctionArgument(index)) => index,
                    _ => break,
                };
                copies.entry(index).or_insert(local);
            }
            _ => break,
        }
    }
    copies
}

impl Writer {
    pub(super) fn debug_begin(&mut self, ir_module: &crate::Module) {
        self.debug.reset();
        self.debug.active = self.debug.level != DebugLevel::None && ir_module.debug_info.is_some();
        if !self.debug.active {
            return;
        }
        if let Some(info) = ir_module.debug_info.as_deref() {
            self.debug.scope_index = info.scope_index();
            self.debug.scopes = alloc::vec![0; info.scopes.len()];
            self.debug.anchors.anchors.clone_from(&info.anchors);
            for (index, record) in info.structs.iter().enumerate() {
                self.debug
                    .structs
                    .entry(record.name.clone())
                    .or_default()
                    .push(index);
            }
            self.debug.constants = ir_module
                .constants
                .iter()
                .filter(|&(_, constant)| constant.name.is_some())
                .filter_map(|(handle, _)| {
                    let range = ir_module.constants.get_span(handle).to_range()?;
                    Some((u32::try_from(range.start).ok()?, handle))
                })
                .collect();
            self.debug.constants.sort_by_key(|&(offset, _)| offset);
            self.debug.privates = ir_module
                .global_variables
                .iter()
                .filter(|&(_, global)| global.space == crate::AddressSpace::Private)
                .filter_map(|(handle, _)| {
                    let range = ir_module.global_variables.get_span(handle).to_range()?;
                    Some((u32::try_from(range.start).ok()?, handle))
                })
                .collect();
            self.debug.privates.sort_by_key(|&(offset, _)| offset);
            if self.debug.source_text && self.debug.level == DebugLevel::NonSemantic {
                self.debug.line_lengths = info
                    .sources
                    .iter()
                    .map(|source| source.text.as_deref().map_or_else(Vec::new, line_lengths))
                    .collect();
            }
        }
        if self.debug.level == DebugLevel::NonSemantic {
            let set = if self
                .debug
                .entry_point
                .as_ref()
                .is_some_and(|entry| entry.2.is_some())
            {
                NON_SEMANTIC_SET_102
            } else if ir_module.types.iter().any(|(_, ty)| {
                matches!(
                    ty.inner,
                    crate::TypeInner::CooperativeMatrix {
                        class: crate::CooperativeMatrixClass::Khr,
                        ..
                    }
                )
            }) {
                NON_SEMANTIC_SET_101
            } else {
                NON_SEMANTIC_SET
            };
            self.debug.set = self.spirv_ext_import(set);
            self.use_extension("SPV_KHR_non_semantic_info");
        }
    }

    fn debug_info_string(&mut self, text: &str) -> Word {
        if let Some(&id) = self.debug.strings.get(text) {
            return id;
        }
        let id = self.id_gen.next();
        self.debug
            .string_instructions
            .push(Instruction::string(text, id));
        self.debug.strings.insert(String::from(text), id);
        id
    }

    fn debug_uint(&mut self, value: u32) -> Word {
        self.get_index_constant(value)
    }

    fn debug_cooperative_size(
        &mut self,
        ir_module: &crate::Module,
        size: crate::CooperativeSize,
    ) -> Word {
        let id = self.cooperative_size_id(size);
        let crate::CooperativeSize::Pending(handle) = size else {
            return id;
        };
        let signed = ir_module
            .overrides
            .try_get(handle)
            .ok()
            .and_then(|constant| ir_module.types.get_handle(constant.ty).ok())
            .is_some_and(|ty| {
                matches!(
                    ty.inner,
                    crate::TypeInner::Scalar(crate::Scalar {
                        kind: crate::ScalarKind::Sint,
                        ..
                    })
                )
            });
        if !signed {
            return id;
        }
        let uint = self.get_u32_type_id();
        let zero = self.get_index_constant(0);
        let converted = self.id_gen.next();
        let mut instruction = Instruction::new(spirv::Op::SpecConstantOp);
        instruction.set_type(uint);
        instruction.set_result(converted);
        instruction.add_operand(spirv::Op::IAdd as Word);
        instruction.add_operand(id);
        instruction.add_operand(zero);
        self.debug.declarations.push(instruction);
        converted
    }

    fn debug_ext(&mut self, opcode: Word, operands: &[Word]) -> Word {
        let id = self.id_gen.next();
        let instruction =
            Instruction::ext_inst(self.debug.set, opcode, self.void_type, id, operands);
        self.debug.declarations.push(instruction);
        id
    }

    fn debug_local_ext(&mut self, opcode: Word, operands: &[Word]) -> Instruction {
        let id = self.id_gen.next();
        Instruction::ext_inst(self.debug.set, opcode, self.void_type, id, operands)
    }

    fn debug_none(&mut self) -> Word {
        if self.debug.none == 0 {
            self.debug.none = self.debug_ext(DEBUG_INFO_NONE, &[]);
        }
        self.debug.none
    }

    fn debug_expression(&mut self) -> Word {
        if self.debug.expression == 0 {
            self.debug.expression = self.debug_ext(DEBUG_EXPRESSION, &[]);
        }
        self.debug.expression
    }

    fn debug_file(&self, source: u32) -> Word {
        usize::try_from(source)
            .ok()
            .and_then(|index| self.debug.files.get(index))
            .or_else(|| self.debug.files.first())
            .copied()
            .unwrap_or(0)
    }

    fn debug_unit(&self, unit: u32) -> Word {
        usize::try_from(unit)
            .ok()
            .and_then(|index| self.debug.units.get(index))
            .or_else(|| self.debug.units.first())
            .copied()
            .unwrap_or(0)
    }

    pub(super) fn debug_module(&mut self, ir_module: &crate::Module) -> Result<(), super::Error> {
        if !self.debug.active {
            return Ok(());
        }
        let Some(info) = ir_module.debug_info.as_deref() else {
            return Ok(());
        };
        match self.debug.level {
            DebugLevel::None => Ok(()),
            DebugLevel::Lines => {
                self.debug_line_sources(info);
                Ok(())
            }
            DebugLevel::NonSemantic => {
                self.debug_sources(info);
                self.debug_types(ir_module, info)?;
                self.debug_globals(ir_module, info);
                self.debug_constants(ir_module, info);
                Ok(())
            }
        }
    }

    fn debug_line_sources(&mut self, info: &crate::DebugInfo) {
        for source in &info.sources {
            let id = self.debug_info_string(&source.name);
            self.debug.files.push(id);
        }
        let comments = self.lang_version() < (1, 1);
        let version = info.units.first().map_or(450, |unit| unit.version);
        for (index, source) in info.sources.iter().enumerate() {
            let Some(ref text) = source.text else {
                continue;
            };
            let main = info
                .units
                .iter()
                .any(|unit| usize::try_from(unit.source).ok() == Some(index));
            let mut full = String::new();
            if main && comments && !self.debug.processes.is_empty() {
                for process in &self.debug.processes {
                    full.push_str("// OpModuleProcessed ");
                    full.push_str(process);
                    full.push('\n');
                }
                full.push_str("#line 1\n");
            }
            full.push_str(text);
            let file = self.debug_file(u32::try_from(index).unwrap_or(u32::MAX));
            let chunks = split_text(&full);
            for (position, chunk) in chunks.iter().enumerate() {
                if position == 0 {
                    let mut instruction = Instruction::new(spirv::Op::Source);
                    instruction.add_operand(spirv::SourceLanguage::GLSL as u32);
                    instruction.add_operand(version);
                    instruction.add_operand(file);
                    instruction.add_operands(helpers::string_to_words(chunk));
                    self.debug.source_instructions.push(instruction);
                } else {
                    let mut instruction = Instruction::new(spirv::Op::SourceContinued);
                    instruction.add_operands(helpers::string_to_words(chunk));
                    self.debug.source_instructions.push(instruction);
                }
            }
        }
    }

    fn debug_sources(&mut self, info: &crate::DebugInfo) {
        for source in &info.sources {
            let name = self.debug_info_string(&source.name);
            let mut operands = alloc::vec![name];
            let mut continued = Vec::new();
            if self.debug.source_text {
                if let Some(ref text) = source.text {
                    for (position, chunk) in split_text(text).into_iter().enumerate() {
                        let id = self.debug_info_string(chunk);
                        if position == 0 {
                            operands.push(id);
                        } else {
                            continued.push(id);
                        }
                    }
                }
            }
            let id = self.debug_ext(DEBUG_SOURCE, &operands);
            for chunk in continued {
                self.debug_ext(DEBUG_SOURCE_CONTINUED, &[chunk]);
            }
            self.debug.files.push(id);
        }
        for unit in &info.units {
            let version = self.debug_uint(1);
            let dwarf = self.debug_uint(4);
            let source = self.debug_file(unit.source);
            let language = self.debug_uint(LANGUAGE_GLSL);
            let id = self.debug_ext(DEBUG_COMPILATION_UNIT, &[version, dwarf, source, language]);
            self.debug.units.push(id);
        }
    }

    fn debug_basic(&mut self, scalar: crate::Scalar) -> Word {
        if let Some(&id) = self.debug.basics.get(&scalar) {
            return id;
        }
        let (name, encoding) = scalar_name(scalar);
        let name = self.debug_info_string(name);
        let size = self.debug_uint(if scalar.kind == crate::ScalarKind::Bool {
            32
        } else {
            u32::from(scalar.width) * 8
        });
        let encoding = self.debug_uint(encoding);
        let flags = self.debug_uint(0);
        let id = self.debug_ext(DEBUG_TYPE_BASIC, &[name, size, encoding, flags]);
        self.debug.basics.insert(scalar, id);
        id
    }

    fn debug_vector(&mut self, component: Word, count: u32) -> Word {
        if let Some(&id) = self.debug.vectors.get(&(component, count)) {
            return id;
        }
        let size = self.debug_uint(count);
        let id = self.debug_ext(DEBUG_TYPE_VECTOR, &[component, size]);
        self.debug.vectors.insert((component, count), id);
        id
    }

    fn debug_pointer(&mut self, base: Word, class: spirv::StorageClass) -> Word {
        let key = (base, class as u32);
        if let Some(&id) = self.debug.pointers.get(&key) {
            return id;
        }
        let class = self.debug_uint(class as u32);
        let flags = self.debug_uint(0);
        let id = self.debug_ext(DEBUG_TYPE_POINTER, &[base, class, flags]);
        self.debug.pointers.insert(key, id);
        id
    }

    fn debug_opaque(&mut self, name: &str) -> Word {
        if let Some(&id) = self.debug.opaques.get(name) {
            return id;
        }
        let name_id = self.debug_info_string(name);
        let tag = self.debug_uint(TAG_STRUCTURE);
        let source_index = 0;
        let source = self.debug_file(source_index);
        let line = self.debug_line(source_index, 0);
        let column = self.debug_uint(0);
        let unit = self.debug_unit(0);
        let linkage = self.debug_info_string(&format!("@{name}"));
        let size = self.debug_none();
        let flags = self.debug_uint(FLAG_IS_PUBLIC);
        let id = self.debug_ext(
            DEBUG_TYPE_COMPOSITE,
            &[
                name_id, tag, source, line, column, unit, linkage, size, flags,
            ],
        );
        self.debug.opaques.insert(String::from(name), id);
        id
    }

    fn debug_type(&mut self, ty: Handle<crate::Type>) -> Word {
        match self.debug.types.get(&ty) {
            Some(&id) => id,
            None => self.debug_opaque("unknown"),
        }
    }

    fn debug_reserve(&mut self, ty: Handle<crate::Type>) -> Word {
        match self.debug.reserved.get(&ty) {
            Some(&id) => id,
            None => {
                let id = self.id_gen.next();
                self.debug.reserved.insert(ty, id);
                self.debug.pending.insert(id);
                id
            }
        }
    }

    fn debug_forward_pointer(&mut self, base_id: Word, class: spirv::StorageClass) -> Word {
        let class = self.debug_uint(class as u32);
        let flags = self.debug_uint(0);
        let id = self.id_gen.next();
        let mut instruction = Instruction::ext_inst(
            self.debug.set,
            DEBUG_TYPE_POINTER,
            self.void_type,
            id,
            &[base_id, class, flags],
        );
        instruction.op = OP_EXT_INST_WITH_FORWARD_REFS;
        self.debug.declarations.push(instruction);
        self.use_extension("SPV_KHR_relaxed_extended_instruction");
        id
    }

    fn debug_boolean(
        &mut self,
        types: &crate::UniqueArena<crate::Type>,
        ty: Handle<crate::Type>,
    ) -> Word {
        let mut sizes = Vec::new();
        let mut current = ty;
        loop {
            let base = match types.get_handle(current).map(|found| &found.inner) {
                Ok(&crate::TypeInner::Array { base, size, .. }) => {
                    sizes.push(size);
                    current = base;
                    continue;
                }
                Ok(&crate::TypeInner::Scalar(_)) => self.debug_basic(crate::Scalar::BOOL),
                Ok(&crate::TypeInner::Vector { size, .. }) => {
                    let component = self.debug_basic(crate::Scalar::BOOL);
                    self.debug_vector(component, size as u32)
                }
                _ => return self.debug_type(ty),
            };
            let mut id = base;
            for &size in sizes.iter().rev() {
                let count = self.debug_array_size(size);
                id = self.debug_ext(DEBUG_TYPE_ARRAY, &[id, count]);
            }
            return id;
        }
    }

    fn debug_lengths(&self, source: u32) -> Option<&Vec<u32>> {
        usize::try_from(source)
            .ok()
            .and_then(|index| self.debug.line_lengths.get(index))
            .filter(|lengths| !lengths.is_empty())
    }

    fn debug_fit_line(&self, source: u32, line: u32) -> u32 {
        match self.debug_lengths(source) {
            Some(lengths) => line.min(u32::try_from(lengths.len()).unwrap_or(u32::MAX)),
            None => line,
        }
    }

    fn debug_line(&mut self, source: u32, line: u32) -> Word {
        let line = self.debug_fit_line(source, line);
        self.debug_uint(line)
    }

    fn debug_column(&mut self, position: crate::DebugPosition) -> Word {
        let line = self.debug_fit_line(position.source, position.line);
        let column = match self.debug_lengths(position.source) {
            Some(lengths) => {
                let fits = line
                    .checked_sub(1)
                    .and_then(|line| usize::try_from(line).ok())
                    .and_then(|line| lengths.get(line))
                    .is_some_and(|&length| position.column <= length);
                if fits {
                    position.column
                } else {
                    0
                }
            }
            None => position.column,
        };
        self.debug_uint(column)
    }

    fn debug_array_size(&mut self, size: crate::ArraySize) -> Word {
        match size {
            crate::ArraySize::Constant(count) => self.debug_uint(count.get()),
            crate::ArraySize::Pending(handle) => {
                match self.override_ids.get(handle.index()).copied() {
                    Some(id) if id != 0 => id,
                    _ => self.debug_uint(0),
                }
            }
            crate::ArraySize::Dynamic => self.debug_uint(0),
        }
    }

    fn debug_types(
        &mut self,
        ir_module: &crate::Module,
        info: &crate::DebugInfo,
    ) -> Result<(), super::Error> {
        let mut complete_structs: FastHashMap<&str, Handle<crate::Type>> = FastHashMap::default();
        for (handle, ty) in ir_module.types.iter() {
            if let (Some(name), &crate::TypeInner::Struct { ref members, .. }) =
                (ty.name.as_deref(), &ty.inner)
            {
                if !members.is_empty() {
                    complete_structs.insert(name, handle);
                }
            }
        }
        for (handle, ty) in ir_module.types.iter() {
            let id = match ty.inner {
                crate::TypeInner::Scalar(scalar) | crate::TypeInner::Atomic(scalar) => {
                    self.debug_basic(scalar)
                }
                crate::TypeInner::Vector { size, scalar } => {
                    let component = self.debug_basic(scalar);
                    self.debug_vector(component, size as u32)
                }
                crate::TypeInner::Matrix {
                    columns,
                    rows,
                    scalar,
                } => {
                    let component = self.debug_basic(scalar);
                    let column = self.debug_vector(component, rows as u32);
                    let count = self.debug_uint(columns as u32);
                    let column_major = self.get_constant_scalar(crate::Literal::Bool(true));
                    self.debug_ext(DEBUG_TYPE_MATRIX, &[column, count, column_major])
                }
                crate::TypeInner::Array { base, size, .. }
                | crate::TypeInner::BindingArray { base, size } => {
                    let base = self.debug_type(base);
                    let count = self.debug_array_size(size);
                    self.debug_ext(DEBUG_TYPE_ARRAY, &[base, count])
                }
                crate::TypeInner::Pointer { base, space } => {
                    let class = helpers::map_storage_class(space);
                    match self.debug.types.get(&base).copied() {
                        Some(id) if !self.debug.pending.contains(&id) => {
                            self.debug_pointer(id, class)
                        }
                        Some(id) => self.debug_forward_pointer(id, class),
                        None => {
                            let id = self.debug_reserve(base);
                            self.debug_forward_pointer(id, class)
                        }
                    }
                }
                crate::TypeInner::ValuePointer {
                    size,
                    scalar,
                    space,
                } => {
                    let component = self.debug_basic(scalar);
                    let base = match size {
                        Some(size) => self.debug_vector(component, size as u32),
                        None => component,
                    };
                    self.debug_pointer(base, helpers::map_storage_class(space))
                }
                crate::TypeInner::Struct { ref members, .. }
                    if members.is_empty() && ty.name.is_some() =>
                {
                    let complete = ty
                        .name
                        .as_deref()
                        .and_then(|name| complete_structs.get(name))
                        .copied();
                    match complete {
                        Some(other) if other.index() > handle.index() => self.debug_reserve(other),
                        _ => {
                            let reserved = self.debug.reserved.remove(&handle);
                            self.debug_struct(
                                ty.name.as_deref().unwrap_or(""),
                                members,
                                (info, &ir_module.types),
                                reserved,
                            )?
                        }
                    }
                }
                crate::TypeInner::Struct { ref members, .. } => {
                    let reserved = self.debug.reserved.remove(&handle);
                    self.debug_struct(
                        ty.name.as_deref().unwrap_or(""),
                        members,
                        (info, &ir_module.types),
                        reserved,
                    )?
                }
                crate::TypeInner::Image {
                    dim,
                    arrayed,
                    class,
                } => self.debug_opaque(&image_name(dim, arrayed, class)),
                crate::TypeInner::SampledImage {
                    dim,
                    arrayed,
                    class,
                } => {
                    self.debug_opaque(&image_name(dim, arrayed, class));
                    self.debug_opaque(&sampled_image_name(dim, arrayed, class))
                }
                crate::TypeInner::Sampler { comparison } => self.debug_opaque(if comparison {
                    "samplerShadow"
                } else {
                    "sampler"
                }),
                crate::TypeInner::AccelerationStructure { .. } => {
                    self.debug_opaque("accelerationStructure")
                }
                crate::TypeInner::RayQuery { .. } => self.debug_opaque("rayQuery"),
                crate::TypeInner::HitObject { kind } => self.debug_opaque(match kind {
                    crate::HitObjectKind::Nv => "hitObjectNV",
                    crate::HitObjectKind::Ext => "hitObjectEXT",
                }),
                crate::TypeInner::BufferDescriptor { base, .. } => self.debug_type(base),
                crate::TypeInner::CooperativeMatrix {
                    columns,
                    rows,
                    scalar,
                    role,
                    scope,
                    class: crate::CooperativeMatrixClass::Khr,
                } => {
                    let component = self.debug_basic(scalar);
                    let scope = self.debug_cooperative_size(ir_module, scope);
                    let rows = self.debug_cooperative_size(ir_module, rows);
                    let columns = self.debug_cooperative_size(ir_module, columns);
                    let role =
                        self.get_index_constant(spirv::CooperativeMatrixUse::from(role) as u32);
                    self.debug_ext(
                        DEBUG_TYPE_COOPERATIVE_MATRIX,
                        &[component, scope, rows, columns, role],
                    )
                }
                crate::TypeInner::CooperativeMatrix { .. } => self.debug_opaque("coopmat"),
                crate::TypeInner::LongVector { .. } => self.debug_opaque("coopvec"),
                crate::TypeInner::TensorLayout { .. } => self.debug_opaque("tensorLayoutNV"),
                crate::TypeInner::TensorView { .. } => self.debug_opaque("tensorViewNV"),
                crate::TypeInner::Tensor { .. } => self.debug_opaque("tensorARM"),
                crate::TypeInner::Spirv { .. } => self.debug_opaque("spirvType"),
            };
            self.debug.types.insert(handle, id);
        }
        let pending: Vec<(Handle<crate::Type>, Word)> = self
            .debug
            .reserved
            .iter()
            .map(|(&ty, &id)| (ty, id))
            .collect();
        for (ty, reserved) in pending {
            let target = self.debug_type(ty);
            for instruction in self.debug.declarations.iter_mut() {
                if instruction.result_id == Some(target) {
                    instruction.result_id = Some(reserved);
                }
                for operand in instruction.operands.iter_mut().skip(2) {
                    if *operand == target {
                        *operand = reserved;
                    }
                }
            }
            self.debug.types.insert(ty, reserved);
        }
        Ok(())
    }

    fn debug_struct(
        &mut self,
        name: &str,
        members: &[crate::StructMember],
        (info, types): (&crate::DebugInfo, &crate::UniqueArena<crate::Type>),
        reserved: Option<Word>,
    ) -> Result<Word, super::Error> {
        let candidates = self.debug.structs.get(name).cloned().unwrap_or_default();
        let record = candidates
            .iter()
            .filter_map(|&index| info.structs.get(index))
            .find(|record| {
                record.name == name
                    && record.members.len() == members.len()
                    && record
                        .members
                        .iter()
                        .zip(members)
                        .all(|(declared, member)| {
                            member.name.as_deref() == Some(declared.name.as_str())
                        })
            });
        let unit = record.map_or(0, |record| record.unit);
        let unit_id = self.debug_unit(unit);
        let at = record.map_or(
            crate::DebugPosition {
                source: info.units.first().map_or(0, |first| first.source),
                line: 0,
                column: 0,
            },
            |record| record.at,
        );
        let mut member_ids = Vec::with_capacity(members.len());
        for (index, member) in members.iter().enumerate() {
            let position = record
                .and_then(|record| record.members.get(index))
                .map_or(at, |declared| declared.at);
            let name = self.debug_info_string(member.name.as_deref().unwrap_or(""));
            let boolean = record
                .and_then(|record| record.members.get(index))
                .is_some_and(|declared| declared.boolean);
            let ty = if boolean {
                self.debug_boolean(types, member.ty)
            } else {
                self.debug_type(member.ty)
            };
            let source_index = position.source;
            let source = self.debug_file(source_index);
            let line = self.debug_line(source_index, position.line);
            let column = self.debug_column(position);
            let offset = self.debug_uint(0);
            let size = self.debug_uint(0);
            let flags = self.debug_uint(FLAG_IS_PUBLIC);
            member_ids.push(self.debug_ext(
                DEBUG_TYPE_MEMBER,
                &[name, ty, source, line, column, offset, size, flags],
            ));
        }
        let name_id = self.debug_info_string(name);
        let tag = self.debug_uint(TAG_STRUCTURE);
        let source_index = at.source;
        let source = self.debug_file(source_index);
        let line = self.debug_line(source_index, at.line);
        let column = self.debug_uint(0);
        let size = self.debug_uint(0);
        let flags = self.debug_uint(FLAG_IS_PUBLIC);
        let mut operands =
            alloc::vec![name_id, tag, source, line, column, unit_id, name_id, size, flags];
        operands.extend(member_ids);
        Ok(match reserved {
            Some(id) => {
                self.debug.declarations.push(Instruction::ext_inst(
                    self.debug.set,
                    DEBUG_TYPE_COMPOSITE,
                    self.void_type,
                    id,
                    &operands,
                ));
                self.debug.pending.remove(&id);
                id
            }
            None => self.debug_ext(DEBUG_TYPE_COMPOSITE, &operands),
        })
    }

    fn debug_globals(&mut self, ir_module: &crate::Module, info: &crate::DebugInfo) {
        for (handle, value) in ir_module.overrides.iter() {
            let Some(ref name) = value.name else {
                continue;
            };
            let Some(&id) = self.override_ids.get(handle.index()) else {
                continue;
            };
            if id == 0 {
                continue;
            }
            let position = info.position(ir_module.overrides.get_span(handle));
            let name = self.debug_info_string(name);
            let ty = self.debug_type(value.ty);
            let source_index = position.map_or(0, |position| position.source);
            let source = self.debug_file(source_index);
            let line = self.debug_line(source_index, position.map_or(0, |position| position.line));
            let column = self.debug_uint(0);
            let scope = self.debug_unit(0);
            let flags = self.debug_uint(FLAG_IS_DEFINITION);
            self.debug_ext(
                DEBUG_GLOBAL_VARIABLE,
                &[name, ty, source, line, column, scope, name, id, flags],
            );
        }
        for (handle, variable) in ir_module.global_variables.iter() {
            let mut id = self.global_variables[handle].var_id;
            if id == 0 {
                continue;
            }
            if variable.space == crate::AddressSpace::Private
                && in_function(info, ir_module.global_variables.get_span(handle))
            {
                continue;
            }
            if matches!(variable.space, crate::AddressSpace::DescriptorHeap(_)) {
                id = self.debug_none();
            }
            let span = ir_module.global_variables.get_span(handle);
            let position = info.position(span);
            let unit = span
                .to_range()
                .and_then(|range| u32::try_from(range.start).ok())
                .and_then(|start| info.unit_of(start))
                .and_then(|unit| u32::try_from(unit).ok())
                .unwrap_or(0);
            let variable_name = variable.name.as_deref().unwrap_or("");
            let ty = self.debug_type(variable.ty);
            let source_index = position.map_or(0, |position| position.source);
            let source = self.debug_file(source_index);
            let line = self.debug_line(source_index, position.map_or(0, |position| position.line));
            let column = self.debug_uint(0);
            let scope = self.debug_unit(unit);
            let flags = self.debug_uint(FLAG_IS_DEFINITION);
            let aliases = builtin_aliases(ir_module, variable);
            for name in core::iter::once(variable_name).chain(aliases.iter().copied()) {
                let name = self.debug_info_string(name);
                self.debug_ext(
                    DEBUG_GLOBAL_VARIABLE,
                    &[name, ty, source, line, column, scope, name, id, flags],
                );
            }
        }
    }

    fn debug_constants(&mut self, ir_module: &crate::Module, info: &crate::DebugInfo) {
        for (handle, constant) in ir_module.constants.iter() {
            let Some(ref name) = constant.name else {
                continue;
            };
            let Some(offset) = ir_module
                .constants
                .get_span(handle)
                .to_range()
                .and_then(|range| u32::try_from(range.start).ok())
            else {
                continue;
            };
            let index = info
                .functions
                .partition_point(|function| function.start <= offset);
            let inside = index
                .checked_sub(1)
                .and_then(|index| info.functions.get(index))
                .is_some_and(|function| offset <= function.stop);
            if inside {
                continue;
            }
            let target = self.constant_ids[constant.init];
            if target == 0 {
                continue;
            }
            let line = info.line(offset).copied();
            let unit = info
                .unit_of(offset)
                .and_then(|unit| u32::try_from(unit).ok())
                .unwrap_or(0);
            let name = self.debug_info_string(name);
            let ty = self.debug_type(constant.ty);
            let source_index = line.map_or(0, |line| line.source);
            let source = self.debug_file(source_index);
            let line = self.debug_line(source_index, line.map_or(0, |line| line.line));
            let column = self.debug_uint(0);
            let scope = self.debug_unit(unit);
            let flags = self.debug_uint(FLAG_IS_DEFINITION);
            self.debug_ext(
                DEBUG_GLOBAL_VARIABLE,
                &[name, ty, source, line, column, scope, name, target, flags],
            );
        }
    }

    pub(super) fn debug_sampled_image(
        &mut self,
        dim: crate::ImageDimension,
        arrayed: bool,
        class: crate::ImageClass,
    ) {
        if self.debug.active && self.debug.level == DebugLevel::NonSemantic {
            self.debug_opaque(&sampled_image_name(dim, arrayed, class));
        }
    }

    pub(super) const fn debug_workgroup_size_id(&mut self, id: Word) {
        self.debug.workgroup_size = id;
    }

    pub(super) fn debug_workgroup_size(
        &mut self,
        ir_module: &crate::Module,
        entry_point: &crate::EntryPoint,
    ) {
        if !self.debug.active
            || self.debug.level != DebugLevel::NonSemantic
            || entry_point.workgroup_size_overrides.is_some()
            || !entry_point.workgroup_size_builtin
        {
            return;
        }
        let Some(record) = ir_module
            .debug_info
            .as_deref()
            .and_then(crate::DebugInfo::entry_function)
            .copied()
        else {
            return;
        };
        let mut id = self.debug.workgroup_size;
        if id == 0 {
            let constituents = entry_point
                .workgroup_size
                .map(|size| self.get_constant_scalar(crate::Literal::U32(size)));
            let type_id = self.get_numeric_type_id(super::NumericType::Vector {
                size: crate::VectorSize::Tri,
                scalar: crate::Scalar::U32,
            });
            id = self.id_gen.next();
            Instruction::constant_composite(type_id, id, &constituents)
                .to_words(&mut self.logical_layout.declarations);
        }
        let position = record.end.unwrap_or(record.at);
        let name = self.debug_info_string("gl_WorkGroupSize");
        let component = self.debug_basic(crate::Scalar::U32);
        let ty = self.debug_vector(component, 3);
        let source_index = position.source;
        let source = self.debug_file(source_index);
        let line = self.debug_line(source_index, position.line);
        let column = self.debug_uint(0);
        let scope = self.debug_unit(0);
        let flags = self.debug_uint(FLAG_IS_DEFINITION);
        self.debug_ext(
            DEBUG_GLOBAL_VARIABLE,
            &[name, ty, source, line, column, scope, name, id, flags],
        );
    }

    fn debug_location(&self, info: &crate::DebugInfo, offset: u32) -> Option<Location> {
        let line = info.line(offset)?;
        Some(Location {
            scope: self.debug_scope_at(offset)?,
            source: line.source,
            line: line.line,
        })
    }

    fn debug_scope_at(&self, offset: u32) -> Option<Word> {
        let state = self.debug.function.as_ref()?;
        let (start, stop) = state.range;
        if (offset < start || offset > stop) && state.unit != 0 {
            return Some(state.unit);
        }
        Some(
            self.debug
                .scope_index
                .at(offset)
                .and_then(|index| self.debug.scopes.get(index))
                .copied()
                .filter(|&id| id != 0)
                .unwrap_or(state.scope),
        )
    }

    pub(super) fn debug_function_begin(
        &mut self,
        ir_module: &crate::Module,
        ir_function: &crate::Function,
        start: Option<u32>,
        (function_id, parameters): (Word, &[Word]),
        variables: &FastHashMap<Handle<crate::LocalVariable>, super::LocalVariable>,
    ) {
        self.debug.function = None;
        if !self.debug.active {
            return;
        }
        let Some(info) = ir_module.debug_info.as_deref() else {
            return;
        };
        let Some(record) = start.and_then(|start| info.function(start)).copied() else {
            return;
        };
        let unit = info
            .unit_of(record.start)
            .and_then(|unit| u32::try_from(unit).ok())
            .unwrap_or(0);
        let position = Location {
            scope: 0,
            source: record.at.source,
            line: record.at.line,
        };
        let end = record.end.map(|end| Location {
            scope: 0,
            source: end.source,
            line: end.line,
        });
        let mut state = FunctionState {
            scope: 0,
            unit: 0,
            range: (record.start, record.stop),
            position,
            end,
            declares: Vec::new(),
            cursor: 0,
            prelude: Vec::new(),
        };
        if self.debug.level == DebugLevel::NonSemantic {
            let copies = parameter_copies(ir_function);
            let return_type = match ir_function.result {
                Some(ref result) => self.debug_type(result.ty),
                None => self.void_type,
            };
            let mut signature = alloc::vec![return_type];
            for argument in &ir_function.arguments {
                signature.push(self.debug_type(argument.ty));
            }
            let function_type = match self.debug.function_types.get(&signature) {
                Some(&id) => id,
                None => {
                    let flags = self.debug_uint(FLAG_IS_PUBLIC);
                    let mut operands = alloc::vec![flags];
                    operands.extend(signature.iter().copied());
                    let id = self.debug_ext(DEBUG_TYPE_FUNCTION, &operands);
                    self.debug.function_types.insert(signature, id);
                    id
                }
            };
            let name = self.debug_info_string(ir_function.name.as_deref().unwrap_or(""));
            let source_index = record.at.source;
            let source = self.debug_file(source_index);
            let line = self.debug_line(source_index, record.at.line);
            let column = self.debug_uint(0);
            let unit_id = self.debug_unit(unit);
            let flags = self.debug_uint(FLAG_IS_PUBLIC);
            let scope = self.debug_ext(
                DEBUG_FUNCTION,
                &[
                    name,
                    function_type,
                    source,
                    line,
                    column,
                    unit_id,
                    name,
                    flags,
                    line,
                ],
            );
            let is_entry = info
                .units
                .iter()
                .any(|unit| unit.entry == Some(record.start));
            if let Some((signature, arguments, directory)) =
                self.debug.entry_point.clone().filter(|_| is_entry)
            {
                let signature = self.debug_info_string(&signature);
                let arguments = self.debug_info_string(&arguments);
                let mut operands = alloc::vec![scope, unit_id, signature, arguments];
                if let Some(directory) = directory {
                    operands.push(self.debug_info_string(&directory));
                }
                self.debug_ext(DEBUG_ENTRY_POINT, &operands);
            }
            state.scope = scope;
            state.unit = unit_id;
            state.position.scope = scope;
            if let Some(ref mut end) = state.end {
                end.scope = scope;
            }
            let first = info
                .scopes
                .partition_point(|scope_record| scope_record.start < record.start);
            for (position, scope_record) in info
                .scopes
                .get(first..)
                .unwrap_or_default()
                .iter()
                .enumerate()
            {
                let index = first + position;
                if scope_record.start > record.stop {
                    break;
                }
                let parent = self
                    .debug
                    .scope_index
                    .parent(index)
                    .and_then(|parent| self.debug.scopes.get(parent))
                    .copied()
                    .filter(|&id| id != 0)
                    .unwrap_or(scope);
                let source_index = scope_record.at.source;
                let source = self.debug_file(source_index);
                let line = self.debug_line(source_index, scope_record.at.line);
                let column = self.debug_column(scope_record.at);
                let id = self.debug_ext(DEBUG_LEXICAL_BLOCK, &[source, line, column, parent]);
                if let Some(slot) = self.debug.scopes.get_mut(index) {
                    *slot = id;
                }
            }
            let expression = self.debug_expression();
            let mut copied = crate::FastHashSet::default();
            for (index, argument) in ir_function.arguments.iter().enumerate() {
                let Some(&parameter) = parameters.get(index) else {
                    continue;
                };
                let number = u32::try_from(index).unwrap_or(u32::MAX);
                let name = self.debug_info_string(argument.name.as_deref().unwrap_or(""));
                let ty = self.debug_type(argument.ty);
                let source_index = record.at.source;
                let source = self.debug_file(source_index);
                let line = self.debug_line(source_index, record.at.line);
                let column = self.debug_uint(0);
                let flags = self.debug_uint(FLAG_IS_LOCAL);
                let argument_number = self.debug_uint(number.saturating_add(1));
                let variable = self.debug_ext(
                    DEBUG_LOCAL_VARIABLE,
                    &[
                        name,
                        ty,
                        source,
                        line,
                        column,
                        scope,
                        flags,
                        argument_number,
                    ],
                );
                let copy = copies
                    .get(&number)
                    .and_then(|local| variables.get(local).map(|found| (*local, found.id)));
                let instruction = match copy {
                    Some((local, pointer)) => {
                        copied.insert(local);
                        self.debug_local_ext(DEBUG_DECLARE, &[variable, pointer, expression])
                    }
                    None => self.debug_local_ext(DEBUG_VALUE, &[variable, parameter, expression]),
                };
                state.prelude.push(instruction);
            }
            let definition = self.id_gen.next();
            state.prelude.push(Instruction::ext_inst(
                self.debug.set,
                DEBUG_FUNCTION_DEFINITION,
                self.void_type,
                definition,
                &[scope, function_id],
            ));
            for (handle, local) in ir_function.local_variables.iter() {
                if copied.contains(&handle) {
                    continue;
                }
                let Some(ref name) = local.name else {
                    continue;
                };
                let Some(found) = variables.get(&handle) else {
                    continue;
                };
                let span = ir_function.local_variables.get_span(handle);
                let Some(offset) = span
                    .to_range()
                    .and_then(|range| u32::try_from(range.start).ok())
                else {
                    continue;
                };
                let Some(line) = info.line(offset).copied() else {
                    continue;
                };
                let local_scope = self
                    .debug
                    .scope_index
                    .at(offset)
                    .and_then(|index| self.debug.scopes.get(index))
                    .copied()
                    .filter(|&id| id != 0)
                    .unwrap_or(scope);
                let name = self.debug_info_string(name);
                let ty = self.debug_type(local.ty);
                let source_index = line.source;
                let source = self.debug_file(source_index);
                let line_id = self.debug_line(source_index, line.line);
                let column = self.debug_uint(0);
                let flags = self.debug_uint(FLAG_IS_LOCAL);
                let variable = self.debug_ext(
                    DEBUG_LOCAL_VARIABLE,
                    &[name, ty, source, line_id, column, local_scope, flags],
                );
                state.declares.push(Declare {
                    offset,
                    variable,
                    target: found.id,
                    value: false,
                });
            }
            let first = self
                .debug
                .constants
                .partition_point(|&(offset, _)| offset < record.start);
            let constants: Vec<(u32, Handle<crate::Constant>)> = self
                .debug
                .constants
                .get(first..)
                .unwrap_or_default()
                .iter()
                .take_while(|&&(offset, _)| offset <= record.stop)
                .copied()
                .collect();
            for (offset, handle) in constants {
                let constant = &ir_module.constants[handle];
                let Some(ref name) = constant.name else {
                    continue;
                };
                let Some(line) = info.line(offset).copied() else {
                    continue;
                };
                let target = self.constant_ids[constant.init];
                if target == 0 {
                    continue;
                }
                let local_scope = self
                    .debug
                    .scope_index
                    .at(offset)
                    .and_then(|index| self.debug.scopes.get(index))
                    .copied()
                    .filter(|&id| id != 0)
                    .unwrap_or(scope);
                let name = self.debug_info_string(name);
                let ty = self.debug_type(constant.ty);
                let source_index = line.source;
                let source = self.debug_file(source_index);
                let line_id = self.debug_line(source_index, line.line);
                let column = self.debug_uint(0);
                let flags = self.debug_uint(FLAG_IS_LOCAL);
                let variable = self.debug_ext(
                    DEBUG_LOCAL_VARIABLE,
                    &[name, ty, source, line_id, column, local_scope, flags],
                );
                state.declares.push(Declare {
                    offset,
                    variable,
                    target,
                    value: true,
                });
            }
            let first = self
                .debug
                .privates
                .partition_point(|&(offset, _)| offset < record.start);
            let privates: Vec<(u32, Handle<crate::GlobalVariable>)> = self
                .debug
                .privates
                .get(first..)
                .unwrap_or_default()
                .iter()
                .take_while(|&&(offset, _)| offset <= record.stop)
                .copied()
                .collect();
            for (offset, handle) in privates {
                let global = &ir_module.global_variables[handle];
                let target = self.global_variables[handle].var_id;
                let Some(line) = info.line(offset).copied().filter(|_| target != 0) else {
                    continue;
                };
                let local_scope = self
                    .debug
                    .scope_index
                    .at(offset)
                    .and_then(|index| self.debug.scopes.get(index))
                    .copied()
                    .filter(|&id| id != 0)
                    .unwrap_or(scope);
                let name = self.debug_info_string(global.name.as_deref().unwrap_or(""));
                let ty = self.debug_type(global.ty);
                let source_index = line.source;
                let source = self.debug_file(source_index);
                let line_id = self.debug_line(source_index, line.line);
                let column = self.debug_uint(0);
                let flags = self.debug_uint(FLAG_IS_LOCAL);
                let variable = self.debug_ext(
                    DEBUG_LOCAL_VARIABLE,
                    &[name, ty, source, line_id, column, local_scope, flags],
                );
                state.declares.push(Declare {
                    offset,
                    variable,
                    target,
                    value: false,
                });
            }
            state.declares.sort_by_key(|declare| declare.offset);
        }
        self.debug.function = Some(state);
    }

    pub(super) fn debug_mark(&mut self, block: &mut Block, span: crate::Span) {
        if !self.debug.tracking() {
            return;
        }
        let Some(offset) = self.debug.anchors.anchor(span) else {
            return;
        };
        if let Some(ref mut state) = self.debug.function {
            while let Some(declared) = state
                .declares
                .get(state.cursor)
                .map(|declare| declare.offset)
            {
                if declared > offset {
                    break;
                }
                let index = u32::try_from(state.cursor).unwrap_or(u32::MAX);
                block.body.push(marker(MARK_LOCATION, declared));
                block.body.push(marker(MARK_DECLARE, index));
                state.cursor += 1;
            }
        }
        block.body.push(marker(MARK_LOCATION, offset));
    }

    pub(super) fn debug_mark_scope(&mut self, block: &mut Block, span: crate::Span) {
        if !self.debug.tracking() {
            return;
        }
        if let Some(offset) = self.debug.anchors.anchor(span) {
            block.body.push(marker(MARK_SCOPE, offset));
        }
    }

    pub(super) fn debug_mark_end(&self, block: &mut Block) {
        if self.debug.tracking() {
            block.body.push(marker(MARK_END, 0));
        }
    }

    pub(super) fn debug_function_finish(
        &mut self,
        ir_module: &crate::Module,
        function: &mut Function,
    ) {
        let Some(mut state) = self.debug.function.take() else {
            return;
        };
        let Some(info) = ir_module.debug_info.as_deref() else {
            return;
        };
        let leftover: Vec<Declare> = state
            .declares
            .get(state.cursor..)
            .unwrap_or_default()
            .to_vec();
        for declare in leftover {
            let instruction = self.debug_declare(declare);
            state.prelude.push(instruction);
        }
        let mut current = state.position;
        let declares = core::mem::take(&mut state.declares);
        let prelude = core::mem::take(&mut state.prelude);
        self.debug.function = Some(state);
        let mut prelude = Some(prelude);
        for block in function.blocks.iter_mut() {
            let body = core::mem::take(&mut block.body);
            let mut out = Vec::with_capacity(body.len() + 4);
            let mut emitted_scope: Option<Word> = None;
            let mut emitted_line: Option<(u32, u32)> = None;
            if let Some(prelude) = prelude.take() {
                self.debug_emit_location(&mut out, current, &mut emitted_scope, &mut emitted_line);
                out.extend(prelude);
            }
            let mut after_merge = false;
            for instruction in body {
                let instruction = if instruction.op == MARKER {
                    let kind = instruction
                        .operands
                        .first()
                        .copied()
                        .unwrap_or(MARK_LOCATION);
                    let payload = instruction.operands.get(1).copied().unwrap_or(0);
                    match kind {
                        MARK_LOCATION => {
                            if let Some(location) = self.debug_location(info, payload) {
                                current = location;
                            }
                            continue;
                        }
                        MARK_SCOPE => {
                            if let Some(scope) = self.debug_scope_at(payload) {
                                current.scope = scope;
                            }
                            continue;
                        }
                        MARK_END => {
                            if let Some(end) =
                                self.debug.function.as_ref().and_then(|state| state.end)
                            {
                                current = end;
                            }
                            continue;
                        }
                        _ => {
                            let Some(&declare) = usize::try_from(payload)
                                .ok()
                                .and_then(|index| declares.get(index))
                            else {
                                continue;
                            };
                            self.debug_declare(declare)
                        }
                    }
                } else {
                    instruction
                };
                if instruction.op == spirv::Op::Phi as u32 {
                    out.push(instruction);
                    continue;
                }
                if !after_merge {
                    self.debug_emit_location(
                        &mut out,
                        current,
                        &mut emitted_scope,
                        &mut emitted_line,
                    );
                }
                after_merge = instruction.op == spirv::Op::SelectionMerge as u32
                    || instruction.op == spirv::Op::LoopMerge as u32;
                out.push(instruction);
            }
            block.body = out;
        }
        self.debug.function = None;
    }

    fn debug_declare(&mut self, declare: Declare) -> Instruction {
        let expression = self.debug_expression();
        let opcode = if declare.value {
            DEBUG_VALUE
        } else {
            DEBUG_DECLARE
        };
        self.debug_local_ext(opcode, &[declare.variable, declare.target, expression])
    }

    fn debug_emit_location(
        &mut self,
        out: &mut Vec<Instruction>,
        location: Location,
        emitted_scope: &mut Option<Word>,
        emitted_line: &mut Option<(u32, u32)>,
    ) {
        match self.debug.level {
            DebugLevel::None => {}
            DebugLevel::Lines => {
                if *emitted_line != Some((location.source, location.line)) {
                    let file = self.debug_file(location.source);
                    out.push(Instruction::line(file, location.line, 0));
                    *emitted_line = Some((location.source, location.line));
                }
            }
            DebugLevel::NonSemantic => {
                if *emitted_scope != Some(location.scope) {
                    let instruction = self.debug_local_ext(DEBUG_SCOPE, &[location.scope]);
                    out.push(instruction);
                    *emitted_scope = Some(location.scope);
                }
                if *emitted_line != Some((location.source, location.line)) {
                    let source_index = location.source;
                    let source = self.debug_file(source_index);
                    let line = self.debug_line(source_index, location.line.max(1));
                    let zero = self.debug_uint(0);
                    let instruction =
                        self.debug_local_ext(DEBUG_LINE, &[source, line, line, zero, zero]);
                    out.push(instruction);
                    *emitted_line = Some((location.source, location.line));
                }
            }
        }
    }

    pub(super) fn debug_end(&mut self) {
        if !self.debug.active {
            return;
        }
        if self.debug.buffer_type && self.debug.level == DebugLevel::NonSemantic {
            self.debug_opaque("buffer");
        }
        for instruction in self.debug.string_instructions.iter() {
            instruction.to_words(&mut self.logical_layout.debugs);
        }
    }

    pub(super) fn debug_end_sources(&mut self) {
        if !self.debug.active {
            return;
        }
        for instruction in self.debug.source_instructions.iter() {
            instruction.to_words(&mut self.logical_layout.debugs);
        }
    }

    pub(super) fn debug_end_processes(&mut self) {
        if !self.debug.active || self.lang_version() < (1, 1) {
            return;
        }
        for process in &self.debug.processes {
            let mut instruction = Instruction::new(spirv::Op::ModuleProcessed);
            instruction.add_operands(helpers::string_to_words(process));
            instruction.to_words(&mut self.logical_layout.debugs);
        }
    }

    pub(super) fn debug_end_declarations(&mut self) {
        if !self.debug.active {
            return;
        }
        for instruction in self.debug.declarations.iter() {
            instruction.to_words(&mut self.logical_layout.declarations);
        }
    }
}

fn line_lengths(text: &str) -> Vec<u32> {
    let bytes = text.as_bytes();
    let mut lengths = Vec::new();
    let mut length: u32 = 1;
    let mut line_start = 0;
    let mut index = 0;
    while let Some(&byte) = bytes.get(index) {
        match byte {
            b'\n' => {
                lengths.push(length);
                length = 1;
                line_start = index + 1;
            }
            b'\r' => {
                if bytes.get(index + 1) == Some(&b'\n') {
                    index += 1;
                }
                lengths.push(length);
                length = 1;
                line_start = index + 1;
            }
            _ => length = length.saturating_add(1),
        }
        index += 1;
    }
    if line_start < bytes.len() {
        lengths.push(length);
    }
    lengths
}

fn builtin_aliases(
    ir_module: &crate::Module,
    variable: &crate::GlobalVariable,
) -> &'static [&'static str] {
    let hit = ir_module.entry_points.iter().any(|entry| {
        matches!(
            entry.stage,
            crate::ShaderStage::AnyHit | crate::ShaderStage::ClosestHit
        )
    });
    if !hit || variable.io != Some(crate::Binding::BuiltIn(crate::BuiltIn::RayTCurrentMax)) {
        return &[];
    }
    match variable.name.as_deref() {
        Some("gl_RayTmaxNV") => &["gl_HitTNV"],
        Some("gl_RayTmaxEXT") => &["gl_HitTEXT"],
        _ => &[],
    }
}

fn in_function(info: &crate::DebugInfo, span: crate::Span) -> bool {
    let Some(offset) = span
        .to_range()
        .and_then(|range| u32::try_from(range.start).ok())
    else {
        return false;
    };
    let index = info
        .functions
        .partition_point(|function| function.start <= offset);
    index
        .checked_sub(1)
        .and_then(|index| info.functions.get(index))
        .is_some_and(|function| offset <= function.stop)
}

fn marker(kind: Word, payload: Word) -> Instruction {
    let mut instruction = Instruction::raw(MARKER);
    instruction.add_operand(kind);
    instruction.add_operand(payload);
    instruction
}

pub(super) fn ends_at_location(block: &Block) -> bool {
    block.body.last().is_some_and(|instruction| {
        instruction.op == MARKER && instruction.operands.first() == Some(&MARK_LOCATION)
    })
}

pub(super) const fn is_marker(instruction: &Instruction) -> bool {
    instruction.op == MARKER
}
