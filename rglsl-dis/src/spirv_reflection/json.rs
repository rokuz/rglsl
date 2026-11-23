use std::fmt::{Debug, Display, Write as _};

use rglsl_types::ShaderStageMask;

use super::pipeline::LayoutBuilder;
use super::{
    DescriptorBinding, InterfaceVariable, LayoutError, PipelineLayout, PushConstantBlock,
    Reflection, ScalarKind, ScalarType, ScalarValue, SpecializationConstant, WorkgroupDimension,
};

#[derive(Debug, Clone, Copy)]
struct Scope {
    has_items: bool,
}

#[derive(Debug, Default)]
struct Writer {
    text: String,
    scopes: Vec<Scope>,
}

impl Writer {
    fn key(&mut self, key: Option<&str>) {
        if let Some(scope) = self.scopes.last_mut() {
            if scope.has_items {
                self.text.push(',');
            }
            scope.has_items = true;
            self.text.push('\n');
            self.indent(self.scopes.len());
        }
        if let Some(key) = key {
            self.quoted(key);
            self.text.push_str(": ");
        }
    }

    fn indent(&mut self, depth: usize) {
        self.text.extend(std::iter::repeat_n("  ", depth));
    }

    fn begin(&mut self, key: Option<&str>, bracket: char) {
        self.key(key);
        self.text.push(bracket);
        self.scopes.push(Scope { has_items: false });
    }

    fn end(&mut self, bracket: char) {
        if self.scopes.pop().is_some_and(|scope| scope.has_items) {
            self.text.push('\n');
            self.indent(self.scopes.len());
        }
        self.text.push(bracket);
    }

    fn object(&mut self, key: Option<&str>) {
        self.begin(key, '{');
    }

    fn end_object(&mut self) {
        self.end('}');
    }

    fn array(&mut self, key: Option<&str>) {
        self.begin(key, '[');
    }

    fn end_array(&mut self) {
        self.end(']');
    }

    fn quoted(&mut self, text: &str) {
        self.text.push('"');
        for character in text.chars() {
            match character {
                '"' => self.text.push_str("\\\""),
                '\\' => self.text.push_str("\\\\"),
                '\n' => self.text.push_str("\\n"),
                '\r' => self.text.push_str("\\r"),
                '\t' => self.text.push_str("\\t"),
                control if u32::from(control) < 0x20 => {
                    let _ = write!(self.text, "\\u{:04x}", u32::from(control));
                }
                other => self.text.push(other),
            }
        }
        self.text.push('"');
    }

    fn string(&mut self, key: Option<&str>, value: &str) {
        self.key(key);
        self.quoted(value);
    }

    fn number(&mut self, key: Option<&str>, value: impl Display) {
        self.key(key);
        let _ = write!(self.text, "{value}");
    }

    fn float(&mut self, key: Option<&str>, value: impl Debug) {
        self.key(key);
        let _ = write!(self.text, "{value:?}");
    }

    fn null(&mut self, key: Option<&str>) {
        self.key(key);
        self.text.push_str("null");
    }

    fn optional_string(&mut self, key: &str, value: Option<&str>) {
        match value {
            Some(value) => self.string(Some(key), value),
            None => self.null(Some(key)),
        }
    }

    fn optional_number(&mut self, key: &str, value: Option<u32>) {
        match value {
            Some(value) => self.number(Some(key), value),
            None => self.null(Some(key)),
        }
    }

    fn stages(&mut self, key: &str, stages: ShaderStageMask) {
        self.array(Some(key));
        for stage in stages.stages() {
            self.string(None, stage.extension());
        }
        self.end_array();
    }

    fn reflection(&mut self, key: Option<&str>, reflection: &Reflection) {
        self.object(key);
        self.string(Some("stage"), reflection.stage.extension());
        self.string(Some("entry_point"), &reflection.entry_point);
        match reflection.local_size {
            Some(dimensions) => {
                self.array(Some("local_size"));
                for dimension in dimensions {
                    self.dimension(dimension);
                }
                self.end_array();
            }
            None => self.null(Some("local_size")),
        }
        self.array(Some("descriptor_bindings"));
        for binding in &reflection.descriptor_bindings {
            self.binding(binding);
        }
        self.end_array();
        self.array(Some("descriptor_heaps"));
        for heap in &reflection.descriptor_heaps {
            self.string(None, heap.name());
        }
        self.end_array();
        self.array(Some("push_constants"));
        for block in &reflection.push_constants {
            self.push_constant(block);
        }
        self.end_array();
        for (key, variables) in [
            ("inputs", &reflection.inputs),
            ("outputs", &reflection.outputs),
        ] {
            self.array(Some(key));
            for variable in variables {
                self.interface(variable);
            }
            self.end_array();
        }
        self.array(Some("specialization_constants"));
        for constant in &reflection.specialization_constants {
            self.specialization(constant);
        }
        self.end_array();
        self.end_object();
    }

    fn dimension(&mut self, dimension: WorkgroupDimension) {
        self.object(None);
        self.number(Some("size"), dimension.size());
        self.optional_number("spec_id", dimension.specialization_id());
        self.end_object();
    }

    fn binding(&mut self, binding: &DescriptorBinding) {
        self.object(None);
        self.number(Some("set"), binding.set);
        self.number(Some("binding"), binding.binding);
        self.string(Some("type"), binding.descriptor_type.name());
        self.number(Some("count"), binding.count);
        self.optional_string("name", binding.name.as_deref());
        self.number(Some("variable_id"), binding.variable_id);
        match binding.block {
            Some(block) => {
                self.object(Some("block"));
                self.number(Some("size"), block.size);
                self.optional_number("runtime_array_stride", block.runtime_array_stride);
                self.end_object();
            }
            None => self.null(Some("block")),
        }
        self.end_object();
    }

    fn push_constant(&mut self, block: &PushConstantBlock) {
        self.object(None);
        self.optional_string("name", block.name.as_deref());
        self.number(Some("variable_id"), block.variable_id);
        self.number(Some("offset"), block.offset);
        self.number(Some("size"), block.size);
        self.optional_number("bank", block.bank);
        self.optional_number("bank_offset", block.bank_offset);
        self.end_object();
    }

    fn scalar(&mut self, scalar: ScalarType) {
        self.string(Some("scalar"), scalar.kind.name());
        if let ScalarKind::EncodedFloat(encoding) = scalar.kind {
            self.number(Some("encoding"), encoding);
        }
        self.number(Some("width"), scalar.width);
    }

    fn interface(&mut self, variable: &InterfaceVariable) {
        self.object(None);
        self.number(Some("location"), variable.location);
        self.number(Some("component"), variable.component);
        self.optional_string("name", variable.name.as_deref());
        self.number(Some("variable_id"), variable.variable_id);
        self.object(Some("type"));
        self.scalar(variable.format.scalar);
        self.number(Some("vector_size"), variable.format.vector_size);
        self.number(Some("columns"), variable.format.columns);
        self.array(Some("array"));
        for &length in &variable.format.array {
            self.number(None, length);
        }
        self.end_array();
        self.end_object();
        self.end_object();
    }

    fn specialization(&mut self, constant: &SpecializationConstant) {
        self.object(None);
        self.number(Some("spec_id"), constant.spec_id);
        self.optional_string("name", constant.name.as_deref());
        self.number(Some("result_id"), constant.result_id);
        self.object(Some("type"));
        self.scalar(constant.scalar);
        self.end_object();
        let key = Some("default");
        match constant.default {
            ScalarValue::Bool(value) => {
                self.key(key);
                self.text.push_str(if value { "true" } else { "false" });
            }
            ScalarValue::Int(value) => self.number(key, value),
            ScalarValue::Uint(value) => self.number(key, value),
            ScalarValue::FloatBits(bits)
                if matches!(constant.scalar.kind, ScalarKind::EncodedFloat(_)) =>
            {
                self.number(key, bits);
            }
            ScalarValue::FloatBits(bits) => match float(bits, constant.scalar.width) {
                Some(Float::Single(value)) if value.is_finite() => self.float(key, value),
                Some(Float::Double(value)) if value.is_finite() => self.float(key, value),
                Some(value) if value.is_nan() => self.string(key, "NaN"),
                Some(value) if value.is_positive() => self.string(key, "Infinity"),
                Some(_) => self.string(key, "-Infinity"),
                None => self.number(key, bits),
            },
        }
        self.end_object();
    }

    fn layout(&mut self, key: Option<&str>, layout: &PipelineLayout) {
        self.object(key);
        self.array(Some("sets"));
        for set in &layout.sets {
            self.object(None);
            self.number(Some("set"), set.set);
            self.array(Some("bindings"));
            for binding in &set.bindings {
                self.object(None);
                self.number(Some("binding"), binding.binding);
                self.string(Some("type"), binding.descriptor_type.name());
                self.number(Some("count"), binding.count);
                self.optional_string("name", binding.name.as_deref());
                self.stages("stages", binding.stages);
                self.end_object();
            }
            self.end_array();
            self.end_object();
        }
        self.end_array();
        self.array(Some("push_constant_ranges"));
        for range in &layout.push_constant_ranges {
            self.object(None);
            self.stages("stages", range.stages);
            self.optional_number("bank", range.bank);
            self.number(Some("offset"), range.offset);
            self.number(Some("size"), range.size);
            self.end_object();
        }
        self.end_array();
        self.end_object();
    }

    fn finish(mut self) -> String {
        self.text.push('\n');
        self.text
    }
}

#[derive(Debug, Clone, Copy)]
enum Float {
    Single(f32),
    Double(f64),
}

impl Float {
    const fn is_nan(self) -> bool {
        match self {
            Self::Single(value) => value.is_nan(),
            Self::Double(value) => value.is_nan(),
        }
    }

    const fn is_positive(self) -> bool {
        match self {
            Self::Single(value) => value.is_sign_positive(),
            Self::Double(value) => value.is_sign_positive(),
        }
    }
}

fn float(bits: u64, width: u32) -> Option<Float> {
    match width {
        16 => Some(Float::Double(half(u16::try_from(bits).ok()?))),
        32 => Some(Float::Single(f32::from_bits(u32::try_from(bits).ok()?))),
        64 => Some(Float::Double(f64::from_bits(bits))),
        _ => None,
    }
}

fn half(bits: u16) -> f64 {
    let sign = if bits & 0x8000 == 0 { 1.0 } else { -1.0 };
    let exponent = i32::from((bits >> 10) & 0x1f);
    let mantissa = f64::from(bits & 0x3ff);
    match exponent {
        0 => sign * mantissa * 2.0_f64.powi(-24),
        0x1f if mantissa == 0.0 => sign * f64::INFINITY,
        0x1f => f64::NAN,
        _ => sign * (1.0 + mantissa / 1024.0) * 2.0_f64.powi(exponent - 15),
    }
}

impl Reflection {
    pub fn to_json(&self) -> String {
        let mut writer = Writer::default();
        writer.reflection(None, self);
        writer.finish()
    }
}

impl PipelineLayout {
    pub fn to_json(&self) -> String {
        let mut writer = Writer::default();
        writer.layout(None, self);
        writer.finish()
    }
}

pub fn program_json<'a>(
    stages: impl IntoIterator<Item = &'a Reflection>,
) -> Result<String, LayoutError> {
    let mut layout = LayoutBuilder::default();
    let mut writer = Writer::default();
    writer.object(None);
    writer.array(Some("stages"));
    for reflection in stages {
        layout.add(reflection)?;
        writer.reflection(None, reflection);
    }
    writer.end_array();
    writer.layout(Some("pipeline_layout"), &layout.finish());
    writer.end_object();
    Ok(writer.finish())
}
