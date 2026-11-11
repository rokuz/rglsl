use std::fmt::Write as _;

use super::data::{Rng, Value};
use super::reflect::{DataType, Layout, Scalar, ScalarKind};

#[derive(Debug, Default)]
pub struct Types {
    structs: Vec<(DataType, String)>,
    definitions: String,
    explicit: bool,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Declarator {
    pub base: String,
    pub suffix: String,
}

impl Declarator {
    pub fn declare(&self, name: &str) -> String {
        format!("{} {name}{}", self.base, self.suffix)
    }
}

fn prefix(scalar: Scalar) -> Result<&'static str, String> {
    Ok(match (scalar.kind, scalar.width) {
        (ScalarKind::Bool, _) => "b",
        (ScalarKind::Float, 32) => "",
        (ScalarKind::Float, 64) => "d",
        (ScalarKind::Float, 16) => "f16",
        (ScalarKind::Sint, 32) => "i",
        (ScalarKind::Sint, 64) => "i64",
        (ScalarKind::Sint, 16) => "i16",
        (ScalarKind::Sint, 8) => "i8",
        (ScalarKind::Uint, 32) => "u",
        (ScalarKind::Uint, 64) => "u64",
        (ScalarKind::Uint, 16) => "u16",
        (ScalarKind::Uint, 8) => "u8",
        (kind, width) => return Err(format!("{width}-bit {kind:?} values")),
    })
}

fn scalar_name(scalar: Scalar) -> Result<&'static str, String> {
    Ok(match (scalar.kind, scalar.width) {
        (ScalarKind::Bool, _) => "bool",
        (ScalarKind::Float, 32) => "float",
        (ScalarKind::Float, 64) => "double",
        (ScalarKind::Float, 16) => "float16_t",
        (ScalarKind::Sint, 32) => "int",
        (ScalarKind::Sint, 64) => "int64_t",
        (ScalarKind::Sint, 16) => "int16_t",
        (ScalarKind::Sint, 8) => "int8_t",
        (ScalarKind::Uint, 32) => "uint",
        (ScalarKind::Uint, 64) => "uint64_t",
        (ScalarKind::Uint, 16) => "uint16_t",
        (ScalarKind::Uint, 8) => "uint8_t",
        (kind, width) => return Err(format!("{width}-bit {kind:?} values")),
    })
}

fn is_explicit(scalar: Scalar) -> bool {
    scalar.kind != ScalarKind::Bool && scalar.width != 32 && scalar != F64
}

const F64: Scalar = Scalar {
    kind: ScalarKind::Float,
    width: 64,
};

impl Types {
    pub fn declarator(&mut self, ty: &DataType) -> Result<Declarator, String> {
        let base = match ty {
            DataType::Scalar(scalar) => {
                self.explicit |= is_explicit(*scalar);
                scalar_name(*scalar)?.to_string()
            }
            DataType::Vector { scalar, count } => {
                self.explicit |= is_explicit(*scalar);
                format!("{}vec{count}", prefix(*scalar)?)
            }
            DataType::Matrix {
                scalar,
                columns,
                rows,
            } => {
                if scalar.kind != ScalarKind::Float {
                    return Err("non-float matrices".into());
                }
                self.explicit |= is_explicit(*scalar);
                format!("{}mat{columns}x{rows}", prefix(*scalar)?)
            }
            DataType::Array { element, length } => {
                let inner = self.declarator(element)?;
                return Ok(Declarator {
                    base: inner.base,
                    suffix: format!("[{length}]{}", inner.suffix),
                });
            }
            DataType::Struct(members) => self.structure(ty, members)?,
        };
        Ok(Declarator {
            base,
            suffix: String::new(),
        })
    }

    fn structure(&mut self, ty: &DataType, members: &[DataType]) -> Result<String, String> {
        if let Some((_, name)) = self.structs.iter().find(|(known, _)| known == ty) {
            return Ok(name.clone());
        }
        if members.is_empty() {
            return Err("empty structs".into());
        }
        let mut body = String::new();
        for (index, member) in members.iter().enumerate() {
            let declarator = self.declarator(member)?;
            let _ = writeln!(body, "    {};", declarator.declare(&format!("m{index}")));
        }
        let name = format!("RglslStruct{}", self.structs.len());
        let _ = writeln!(self.definitions, "struct {name} {{\n{body}}};");
        self.structs.push((ty.clone(), name.clone()));
        Ok(name)
    }

    pub fn extensions(&self) -> &'static str {
        if self.explicit {
            "#extension GL_EXT_shader_explicit_arithmetic_types : require\n"
        } else {
            ""
        }
    }

    pub fn definitions(&self) -> &str {
        &self.definitions
    }
}

fn literal(scalar: Scalar, value: Value) -> String {
    match (scalar.kind, scalar.width) {
        (ScalarKind::Bool, _) => {
            if value.as_i64() & 1 == 1 {
                "true".into()
            } else {
                "false".into()
            }
        }
        (ScalarKind::Float, width) => {
            let v = value.as_f64();
            let v = if v.is_finite() { v } else { 0.0 };
            match width {
                64 => format!("{v:?}lf"),
                16 => format!("float16_t({v:?})"),
                _ => format!("{v:?}"),
            }
        }
        (ScalarKind::Sint, 32) => format!("{}", value.as_i64()),
        (ScalarKind::Uint, 32) => format!("{}u", value.as_i64()),
        (ScalarKind::Sint, 64) => format!("{}l", value.as_i64()),
        (ScalarKind::Uint, 64) => format!("{}ul", value.as_i64()),
        (ScalarKind::Sint, width) => format!("int{width}_t({})", value.as_i64()),
        (ScalarKind::Uint, width) => format!("uint{width}_t({}u)", value.as_i64()),
    }
}

pub fn assign_literals(
    target: &str,
    ty: &DataType,
    rng: &mut Rng,
    out: &mut String,
) -> Result<(), String> {
    match ty {
        DataType::Scalar(scalar) => {
            let _ = writeln!(
                out,
                "    {target} = {};",
                literal(*scalar, Value::random(*scalar, rng))
            );
        }
        DataType::Vector { scalar, count } => {
            let values: Vec<String> = (0..*count)
                .map(|_| literal(*scalar, Value::random(*scalar, rng)))
                .collect();
            let _ = writeln!(
                out,
                "    {target} = {}vec{count}({});",
                prefix(*scalar)?,
                values.join(", ")
            );
        }
        DataType::Matrix {
            scalar,
            columns,
            rows,
        } => {
            for column in 0..*columns {
                assign_literals(
                    &format!("{target}[{column}]"),
                    &DataType::Vector {
                        scalar: *scalar,
                        count: *rows,
                    },
                    rng,
                    out,
                )?;
            }
        }
        DataType::Array { element, length } => {
            for index in 0..*length {
                assign_literals(&format!("{target}[{index}]"), element, rng, out)?;
            }
        }
        DataType::Struct(members) => {
            for (index, member) in members.iter().enumerate() {
                assign_literals(&format!("{target}.m{index}"), member, rng, out)?;
            }
        }
    }
    Ok(())
}

fn round_up(value: u32, multiple: u32) -> u32 {
    value.div_ceil(multiple.max(1)) * multiple.max(1)
}

pub fn std430(ty: &DataType) -> (Layout, u32, u32) {
    match ty {
        DataType::Scalar(scalar) => {
            let bytes = scalar.bytes();
            (Layout::Scalar(*scalar), bytes, bytes)
        }
        DataType::Vector { scalar, count } => {
            let bytes = scalar.bytes();
            let align = bytes * if *count == 3 { 4 } else { *count };
            (
                Layout::Vector {
                    scalar: *scalar,
                    count: *count,
                },
                bytes * count,
                align,
            )
        }
        DataType::Matrix {
            scalar,
            columns,
            rows,
        } => {
            let (_, size, align) = std430(&DataType::Vector {
                scalar: *scalar,
                count: *rows,
            });
            let stride = round_up(size, align);
            (
                Layout::Matrix {
                    scalar: *scalar,
                    columns: *columns,
                    rows: *rows,
                    stride,
                    row_major: false,
                },
                stride * columns,
                align,
            )
        }
        DataType::Array { element, length } => {
            let (layout, size, align) = std430(element);
            let stride = round_up(size, align);
            (
                Layout::Array {
                    element: Box::new(layout),
                    length: Some(*length),
                    stride,
                },
                stride * length,
                align,
            )
        }
        DataType::Struct(members) => {
            let mut offset = 0;
            let mut align = 1;
            let mut layouts = Vec::new();
            for member in members {
                let (layout, size, member_align) = std430(member);
                offset = round_up(offset, member_align);
                layouts.push((offset, layout));
                offset += size;
                align = align.max(member_align);
            }
            (
                Layout::Struct { members: layouts },
                round_up(offset, align),
                align,
            )
        }
    }
}

pub fn array_of(ty: &DataType, length: u32) -> Layout {
    let (layout, size, align) = std430(ty);
    Layout::Array {
        element: Box::new(layout),
        length: Some(length),
        stride: round_up(size, align),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const F32: Scalar = Scalar {
        kind: ScalarKind::Float,
        width: 32,
    };
    const U32: Scalar = Scalar {
        kind: ScalarKind::Uint,
        width: 32,
    };

    fn vec(count: u32) -> DataType {
        DataType::Vector { scalar: F32, count }
    }

    #[test]
    fn declares_nested_types_once() {
        let inner = DataType::Struct(vec![DataType::Scalar(U32), vec(3)]);
        let outer = DataType::Struct(vec![
            DataType::Array {
                element: Box::new(inner.clone()),
                length: 2,
            },
            inner,
            DataType::Matrix {
                scalar: F32,
                columns: 4,
                rows: 3,
            },
        ]);
        let mut types = Types::default();
        let declarator = types.declarator(&outer).unwrap();
        assert_eq!(declarator.declare("p"), "RglslStruct1 p");
        assert_eq!(
            types.definitions(),
            "struct RglslStruct0 {\n    uint m0;\n    vec3 m1;\n};\nstruct RglslStruct1 {\n    RglslStruct0 m0[2];\n    RglslStruct0 m1;\n    mat4x3 m2;\n};\n"
        );
        assert_eq!(types.extensions(), "");
        let half = DataType::Array {
            element: Box::new(DataType::Vector {
                scalar: Scalar {
                    kind: ScalarKind::Float,
                    width: 16,
                },
                count: 2,
            }),
            length: 3,
        };
        let declarator = types.declarator(&half).unwrap();
        assert_eq!(declarator.declare("h"), "f16vec2 h[3]");
        assert!(types.extensions().contains("explicit_arithmetic_types"));
    }

    #[test]
    fn assigns_every_scalar() {
        let ty = DataType::Struct(vec![
            DataType::Scalar(Scalar {
                kind: ScalarKind::Bool,
                width: 32,
            }),
            DataType::Array {
                element: Box::new(DataType::Scalar(U32)),
                length: 2,
            },
            DataType::Matrix {
                scalar: F32,
                columns: 2,
                rows: 2,
            },
        ]);
        let mut out = String::new();
        assign_literals("p", &ty, &mut Rng::new(1), &mut out).unwrap();
        let lines: Vec<&str> = out.lines().collect();
        assert_eq!(lines.len(), 5);
        assert!(lines[0].starts_with("    p.m0 = "));
        assert!(lines[1].starts_with("    p.m1[0] = ") && lines[1].ends_with("u;"));
        assert!(lines[4].starts_with("    p.m2[1] = vec2("));
    }

    #[test]
    fn lays_out_std430() {
        let ty = DataType::Struct(vec![
            DataType::Scalar(F32),
            vec(3),
            DataType::Array {
                element: Box::new(DataType::Scalar(F32)),
                length: 2,
            },
            DataType::Matrix {
                scalar: F32,
                columns: 2,
                rows: 3,
            },
        ]);
        let (layout, size, align) = std430(&ty);
        assert_eq!((size, align), (80, 16));
        let Layout::Struct { members } = layout else {
            panic!("a struct layout");
        };
        let offsets: Vec<u32> = members.iter().map(|(offset, _)| *offset).collect();
        assert_eq!(offsets, [0, 16, 28, 48]);
        let array = array_of(&vec(3), 4);
        assert_eq!(array.size(0), 64);
        let mut slots = Vec::new();
        array.slots(0, 0, &mut slots);
        assert_eq!(slots.len(), 12);
        assert_eq!(slots[3].offset, 16);
    }
}
