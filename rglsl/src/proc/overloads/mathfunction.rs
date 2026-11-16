//! Overload sets for [`ir::MathFunction`].

use crate::proc::overloads::OverloadSet;
use crate::proc::overloads::any_overload_set::AnyOverloadSet;
use crate::proc::overloads::list::{List, MathType, StaticRule};
use crate::proc::overloads::regular::regular;
use crate::proc::overloads::utils::{rule, scalar_or_vecn};

use crate::ir;

impl ir::MathFunction {
    pub fn overloads(self) -> impl OverloadSet {
        use ir::MathFunction as Mf;

        let set: AnyOverloadSet = match self {
            // Component-wise unary numeric operations
            Mf::Abs | Mf::Sign => regular!(1, SCALAR|VECN of NUMERIC).into(),

            // Component-wise binary numeric operations
            Mf::Min | Mf::Max => regular!(2, SCALAR|VECN of NUMERIC).into(),

            // Component-wise ternary numeric operations
            Mf::Clamp | Mf::Min3 | Mf::Max3 | Mf::Mid3 => {
                regular!(3, SCALAR|VECN of NUMERIC).into()
            }

            // Component-wise unary floating-point operations
            Mf::Sin
            | Mf::Cos
            | Mf::Tan
            | Mf::Asin
            | Mf::Acos
            | Mf::Atan
            | Mf::Sinh
            | Mf::Cosh
            | Mf::Tanh
            | Mf::Asinh
            | Mf::Acosh
            | Mf::Atanh
            | Mf::Radians
            | Mf::Degrees
            | Mf::Ceil
            | Mf::Floor
            | Mf::Round
            | Mf::RoundEven
            | Mf::Fract
            | Mf::Trunc
            | Mf::Exp
            | Mf::Exp2
            | Mf::Log
            | Mf::Log2
            | Mf::Sqrt
            | Mf::InverseSqrt => regular!(1, SCALAR|VECN of FLOAT).into(),

            // Component-wise binary floating-point operations
            Mf::Atan2 | Mf::Pow | Mf::Step => regular!(2, SCALAR|VECN of FLOAT).into(),

            // Component-wise ternary floating-point operations
            Mf::Fma | Mf::SmoothStep => regular!(3, SCALAR|VECN of FLOAT).into(),

            // Component-wise unary concrete integer operations
            Mf::CountTrailingZeros
            | Mf::CountLeadingZeros
            | Mf::CountOneBits
            | Mf::ReverseBits
            | Mf::FirstTrailingBit
            | Mf::FirstLeadingBit => regular!(1, SCALAR|VECN of INTEGER).into(),

            // Packing functions
            Mf::Pack4x8snorm | Mf::Pack4x8unorm => regular!(1, VEC4 of F32 -> U32).into(),
            Mf::Pack2x16snorm | Mf::Pack2x16unorm | Mf::Pack2x16float => {
                regular!(1, VEC2 of F32 -> U32).into()
            }
            Mf::Pack4xI8 => regular!(1, VEC4 of I32 -> U32).into(),
            Mf::Pack4xU8 => regular!(1, VEC4 of U32 -> U32).into(),
            Mf::Pack4xI8Clamp => regular!(1, VEC4 of I32 -> U32).into(),
            Mf::Pack4xU8Clamp => regular!(1, VEC4 of U32 -> U32).into(),
            Mf::PackDouble2x32 => regular!(1, VEC2 of U32 -> F64).into(),

            // Unpacking functions
            Mf::Unpack4x8snorm | Mf::Unpack4x8unorm => regular!(1, SCALAR of U32 -> Vec4F).into(),
            Mf::Unpack2x16snorm | Mf::Unpack2x16unorm | Mf::Unpack2x16float => {
                regular!(1, SCALAR of U32 -> Vec2F).into()
            }
            Mf::Unpack4xI8 => regular!(1, SCALAR of U32 -> Vec4I).into(),
            Mf::Unpack4xU8 => regular!(1, SCALAR of U32 -> Vec4U).into(),
            Mf::UnpackDouble2x32 => regular!(1, SCALAR of F64 -> Vec2U).into(),
            Mf::Dot4I8Packed => regular!(2, SCALAR of U32 -> I32).into(),
            Mf::Dot4U8Packed => regular!(2, SCALAR of U32 -> U32).into(),
            Mf::IntegerDot => integer_dot(false).into(),
            Mf::IntegerDotAccSat => integer_dot(true).into(),
            Mf::PackedIntegerDot4x8 => packed_integer_dot(false).into(),
            Mf::PackedIntegerDot4x8AccSat => packed_integer_dot(true).into(),

            // One-off operations
            Mf::Dot => regular!(2, VECN of NUMERIC -> Scalar).into(),
            Mf::Modf => regular!(1, SCALAR|VECN of FLOAT -> Modf).into(),
            Mf::Frexp => regular!(1, SCALAR|VECN of FLOAT -> Frexp).into(),
            Mf::Ldexp => ldexp().into(),
            Mf::Outer => outer().into(),
            Mf::Cross => regular!(2, VEC3 of FLOAT).into(),
            Mf::CubeFaceIndex => regular!(1, VEC3 of F32 -> Scalar).into(),
            Mf::CubeFaceCoord => regular!(1, VEC3 of F32 -> Vec2F).into(),
            Mf::IntelCountLeadingZeros | Mf::IntelCountTrailingZeros => {
                regular!(1, SCALAR|VECN of U32).into()
            }
            Mf::AbsoluteDifference => regular!(2, SCALAR|VECN of INTEGER -> Unsigned).into(),
            Mf::AddSaturate
            | Mf::SubtractSaturate
            | Mf::Average
            | Mf::AverageRounded
            | Mf::Multiply32x16 => regular!(2, SCALAR|VECN of INTEGER).into(),
            Mf::Distance => regular!(2, SCALAR|VECN of FLOAT -> Scalar).into(),
            Mf::Length => regular!(1, SCALAR|VECN of FLOAT -> Scalar).into(),
            Mf::Normalize => regular!(1, SCALAR|VECN of FLOAT).into(),
            Mf::FaceForward => regular!(3, SCALAR|VECN of FLOAT).into(),
            Mf::Reflect => regular!(2, SCALAR|VECN of FLOAT).into(),
            Mf::Refract => refract().into(),
            Mf::Mix => mix().into(),
            Mf::Inverse => regular!(1, MAT2X2|MAT3X3|MAT4X4 of FLOAT).into(),
            Mf::Transpose => transpose().into(),
            Mf::Determinant => regular!(1, MAT2X2|MAT3X3|MAT4X4 of FLOAT -> Scalar).into(),
            Mf::AddCarry | Mf::SubBorrow => regular!(2, SCALAR|VECN of U32 -> Wide).into(),
            Mf::MulExtended => regular!(2, SCALAR|VECN of U32|I32 -> Wide).into(),
            Mf::ExtractBits => extract_bits().into(),
            Mf::InsertBits => insert_bits().into(),
        };

        set
    }
}

fn ldexp() -> List {
    static RULES: &[[StaticRule; 4]] = &[
        ldexp_rules(ir::Scalar::F32, ir::Scalar::I32),
        ldexp_rules(ir::Scalar::F32, ir::Scalar::I16),
        ldexp_rules(ir::Scalar::F16, ir::Scalar::I32),
        ldexp_rules(ir::Scalar::F16, ir::Scalar::I16),
        ldexp_rules(ir::Scalar::F64, ir::Scalar::I32),
        ldexp_rules(ir::Scalar::F64, ir::Scalar::I16),
    ];
    List::from_static(RULES.as_flattened())
}

const fn ldexp_rules(mantissa: ir::Scalar, exponent: ir::Scalar) -> [StaticRule; 4] {
    let [m1, m2, m3, m4] = scalar_or_vecn(mantissa);
    let [e1, e2, e3, e4] = scalar_or_vecn(exponent);
    [
        rule([m1, e1], m1),
        rule([m2, e2], m2),
        rule([m3, e3], m3),
        rule([m4, e4], m4),
    ]
}

const fn integer_dot_result(left: ir::Scalar, right: ir::Scalar) -> ir::Scalar {
    let kind = if matches!(left.kind, ir::ScalarKind::Uint)
        && matches!(right.kind, ir::ScalarKind::Uint)
    {
        ir::ScalarKind::Uint
    } else {
        ir::ScalarKind::Sint
    };
    let width = if left.width > 4 { left.width } else { 4 };
    ir::Scalar { kind, width }
}

const fn integer_dot_rule(
    left: MathType,
    right: MathType,
    result: ir::Scalar,
    accumulate: bool,
) -> StaticRule {
    let result = MathType::Scalar(result);
    if accumulate {
        rule([left, right, result], result)
    } else {
        rule([left, right], result)
    }
}

const fn integer_dot_vectors(
    left: ir::Scalar,
    right: ir::Scalar,
    accumulate: bool,
) -> [StaticRule; 3] {
    let result = integer_dot_result(left, right);
    let [_, left2, left3, left4] = scalar_or_vecn(left);
    let [_, right2, right3, right4] = scalar_or_vecn(right);
    [
        integer_dot_rule(left2, right2, result, accumulate),
        integer_dot_rule(left3, right3, result, accumulate),
        integer_dot_rule(left4, right4, result, accumulate),
    ]
}

const fn integer_dot_rules(left: ir::Scalar, accumulate: bool) -> [[StaticRule; 3]; 2] {
    let other = ir::Scalar {
        kind: if matches!(left.kind, ir::ScalarKind::Uint) {
            ir::ScalarKind::Sint
        } else {
            ir::ScalarKind::Uint
        },
        width: left.width,
    };
    [
        integer_dot_vectors(left, left, accumulate),
        integer_dot_vectors(left, other, accumulate),
    ]
}

fn integer_dot(accumulate: bool) -> List {
    static RULES: &[[[StaticRule; 3]; 2]] = &[
        integer_dot_rules(ir::Scalar::I32, false),
        integer_dot_rules(ir::Scalar::U32, false),
        integer_dot_rules(ir::Scalar::I16, false),
        integer_dot_rules(ir::Scalar::U16, false),
        integer_dot_rules(ir::Scalar::I64, false),
        integer_dot_rules(ir::Scalar::U64, false),
        integer_dot_rules(ir::Scalar::I8, false),
        integer_dot_rules(ir::Scalar::U8, false),
    ];
    static ACCUMULATING_RULES: &[[[StaticRule; 3]; 2]] = &[
        integer_dot_rules(ir::Scalar::I32, true),
        integer_dot_rules(ir::Scalar::U32, true),
        integer_dot_rules(ir::Scalar::I16, true),
        integer_dot_rules(ir::Scalar::U16, true),
        integer_dot_rules(ir::Scalar::I64, true),
        integer_dot_rules(ir::Scalar::U64, true),
        integer_dot_rules(ir::Scalar::I8, true),
        integer_dot_rules(ir::Scalar::U8, true),
    ];
    let rules = if accumulate {
        ACCUMULATING_RULES
    } else {
        RULES
    };
    List::from_static(rules.as_flattened().as_flattened())
}

const fn packed_integer_dot_rule(
    left: ir::Scalar,
    right: ir::Scalar,
    accumulate: bool,
) -> StaticRule {
    integer_dot_rule(
        MathType::Scalar(left),
        MathType::Scalar(right),
        integer_dot_result(left, right),
        accumulate,
    )
}

const fn packed_integer_dot_set(accumulate: bool) -> [StaticRule; 4] {
    let (signed, unsigned) = (ir::Scalar::I32, ir::Scalar::U32);
    [
        packed_integer_dot_rule(signed, signed, accumulate),
        packed_integer_dot_rule(signed, unsigned, accumulate),
        packed_integer_dot_rule(unsigned, signed, accumulate),
        packed_integer_dot_rule(unsigned, unsigned, accumulate),
    ]
}

fn packed_integer_dot(accumulate: bool) -> List {
    static RULES: [StaticRule; 4] = packed_integer_dot_set(false);
    static ACCUMULATING_RULES: [StaticRule; 4] = packed_integer_dot_set(true);
    List::from_static(if accumulate {
        &ACCUMULATING_RULES
    } else {
        &RULES
    })
}

const fn outer_rule(
    columns: ir::VectorSize,
    rows: ir::VectorSize,
    scalar: ir::Scalar,
) -> StaticRule {
    let left = MathType::Vector { size: rows, scalar };
    let right = MathType::Vector {
        size: columns,
        scalar,
    };
    let result = MathType::Matrix {
        columns,
        rows,
        scalar,
    };
    rule([left, right], result)
}

const fn outer_rules(columns: ir::VectorSize, rows: ir::VectorSize) -> [StaticRule; 3] {
    [
        outer_rule(columns, rows, ir::Scalar::F32),
        outer_rule(columns, rows, ir::Scalar::F16),
        outer_rule(columns, rows, ir::Scalar::F64),
    ]
}

fn outer() -> List {
    use ir::VectorSize::{Bi, Quad, Tri};
    static RULES: &[[StaticRule; 3]] = &[
        outer_rules(Bi, Bi),
        outer_rules(Bi, Tri),
        outer_rules(Bi, Quad),
        outer_rules(Tri, Bi),
        outer_rules(Tri, Tri),
        outer_rules(Tri, Quad),
        outer_rules(Quad, Bi),
        outer_rules(Quad, Tri),
        outer_rules(Quad, Quad),
    ];
    List::from_static(RULES.as_flattened())
}

const fn refract_rule(incident: MathType, ratio: ir::Scalar) -> StaticRule {
    rule([incident, incident, MathType::Scalar(ratio)], incident)
}

const fn refract_rules(size: Option<ir::VectorSize>) -> [StaticRule; 3] {
    const fn incident(size: Option<ir::VectorSize>, scalar: ir::Scalar) -> MathType {
        match size {
            Some(size) => MathType::Vector { size, scalar },
            None => MathType::Scalar(scalar),
        }
    }
    [
        refract_rule(incident(size, ir::Scalar::F32), ir::Scalar::F32),
        refract_rule(incident(size, ir::Scalar::F16), ir::Scalar::F16),
        refract_rule(incident(size, ir::Scalar::F64), ir::Scalar::F64),
    ]
}

fn refract() -> List {
    static RULES: &[[StaticRule; 3]] = &[
        refract_rules(Some(ir::VectorSize::Bi)),
        refract_rules(Some(ir::VectorSize::Tri)),
        refract_rules(Some(ir::VectorSize::Quad)),
        refract_rules(None),
    ];
    List::from_static(RULES.as_flattened())
}

const fn transpose_rule(
    columns: ir::VectorSize,
    rows: ir::VectorSize,
    scalar: ir::Scalar,
) -> StaticRule {
    let input = MathType::Matrix {
        columns,
        rows,
        scalar,
    };
    let output = MathType::Matrix {
        columns: rows,
        rows: columns,
        scalar,
    };
    rule([input], output)
}

const fn transpose_rules(columns: ir::VectorSize, rows: ir::VectorSize) -> [StaticRule; 3] {
    [
        transpose_rule(columns, rows, ir::Scalar::F32),
        transpose_rule(columns, rows, ir::Scalar::F16),
        transpose_rule(columns, rows, ir::Scalar::F64),
    ]
}

fn transpose() -> List {
    use ir::VectorSize::{Bi, Quad, Tri};
    static RULES: &[[StaticRule; 3]] = &[
        transpose_rules(Bi, Bi),
        transpose_rules(Bi, Tri),
        transpose_rules(Bi, Quad),
        transpose_rules(Tri, Bi),
        transpose_rules(Tri, Tri),
        transpose_rules(Tri, Quad),
        transpose_rules(Quad, Bi),
        transpose_rules(Quad, Tri),
        transpose_rules(Quad, Quad),
    ];
    List::from_static(RULES.as_flattened())
}

const fn bit_field_rules(scalar: ir::Scalar, insert: bool) -> [StaticRule; 4] {
    const fn bit_field_rule(input: MathType, insert: bool) -> StaticRule {
        let bits = MathType::Scalar(ir::Scalar::U32);
        if insert {
            rule([input, input, bits, bits], input)
        } else {
            rule([input, bits, bits], input)
        }
    }
    let [scalar, vec2, vec3, vec4] = scalar_or_vecn(scalar);
    [
        bit_field_rule(scalar, insert),
        bit_field_rule(vec2, insert),
        bit_field_rule(vec3, insert),
        bit_field_rule(vec4, insert),
    ]
}

fn extract_bits() -> List {
    static RULES: &[[StaticRule; 4]] = &[
        bit_field_rules(ir::Scalar::I32, false),
        bit_field_rules(ir::Scalar::U32, false),
        bit_field_rules(ir::Scalar::I16, false),
        bit_field_rules(ir::Scalar::U16, false),
        bit_field_rules(ir::Scalar::I64, false),
        bit_field_rules(ir::Scalar::U64, false),
        bit_field_rules(ir::Scalar::I8, false),
        bit_field_rules(ir::Scalar::U8, false),
    ];
    List::from_static(RULES.as_flattened())
}

fn insert_bits() -> List {
    static RULES: &[[StaticRule; 4]] = &[
        bit_field_rules(ir::Scalar::I32, true),
        bit_field_rules(ir::Scalar::U32, true),
        bit_field_rules(ir::Scalar::I16, true),
        bit_field_rules(ir::Scalar::U16, true),
        bit_field_rules(ir::Scalar::I64, true),
        bit_field_rules(ir::Scalar::U64, true),
        bit_field_rules(ir::Scalar::I8, true),
        bit_field_rules(ir::Scalar::U8, true),
    ];
    List::from_static(RULES.as_flattened())
}

const fn mix_rules(scalar: ir::Scalar) -> [StaticRule; 8] {
    let ratio = MathType::Scalar(scalar);
    let [s, v2, v3, v4] = scalar_or_vecn(scalar);
    [
        rule([s, s, s], s),
        rule([s, s, ratio], s),
        rule([v2, v2, v2], v2),
        rule([v2, v2, ratio], v2),
        rule([v3, v3, v3], v3),
        rule([v3, v3, ratio], v3),
        rule([v4, v4, v4], v4),
        rule([v4, v4, ratio], v4),
    ]
}

fn mix() -> List {
    static RULES: &[[StaticRule; 8]] = &[
        mix_rules(ir::Scalar::F32),
        mix_rules(ir::Scalar::F16),
        mix_rules(ir::Scalar::F64),
    ];
    List::from_static(RULES.as_flattened())
}

#[cfg(test)]
mod tests {
    use alloc::vec::Vec;

    use super::{
        List, extract_bits, insert_bits, integer_dot, ldexp, mix, outer, packed_integer_dot,
        refract, transpose,
    };
    use crate::ir::{self, Scalar, TypeInner, VectorSize};
    use crate::proc::TypeResolution;
    use crate::proc::overloads::OverloadSet;
    use crate::proc::overloads::rule::Conclusion;

    type Shape = (Vec<TypeInner>, TypeInner);

    const FLOATS: [Scalar; 3] = [Scalar::F32, Scalar::F16, Scalar::F64];
    const INTEGERS: [Scalar; 8] = [
        Scalar::I32,
        Scalar::U32,
        Scalar::I16,
        Scalar::U16,
        Scalar::I64,
        Scalar::U64,
        Scalar::I8,
        Scalar::U8,
    ];
    const SIZES: [VectorSize; 3] = [VectorSize::Bi, VectorSize::Tri, VectorSize::Quad];

    fn shapes(list: List) -> Vec<Shape> {
        let module = crate::Module::default();
        list.overload_list(&module.to_ctx())
            .into_iter()
            .filter_map(|rule| {
                let arguments = rule
                    .arguments
                    .iter()
                    .filter_map(|argument| match *argument {
                        TypeResolution::Value(ref inner) => Some(inner.clone()),
                        TypeResolution::Handle(_) => None,
                    })
                    .collect();
                match rule.conclusion {
                    Conclusion::Value(inner) => Some((arguments, inner)),
                    Conclusion::Predeclared(_) => None,
                }
            })
            .collect()
    }

    const fn vector(size: VectorSize, scalar: Scalar) -> TypeInner {
        TypeInner::Vector { size, scalar }
    }

    const fn matrix(columns: VectorSize, rows: VectorSize, scalar: Scalar) -> TypeInner {
        TypeInner::Matrix {
            columns,
            rows,
            scalar,
        }
    }

    fn scalar_or_vector(scalar: Scalar) -> impl Iterator<Item = TypeInner> {
        core::iter::once(TypeInner::Scalar(scalar))
            .chain(SIZES.into_iter().map(move |size| vector(size, scalar)))
    }

    fn integer_dot_result(left: Scalar, right: Scalar) -> Scalar {
        let kind = if left.kind == ir::ScalarKind::Uint && right.kind == ir::ScalarKind::Uint {
            ir::ScalarKind::Uint
        } else {
            ir::ScalarKind::Sint
        };
        Scalar {
            kind,
            width: left.width.max(4),
        }
    }

    fn integer_dot_shape(
        left: TypeInner,
        right: TypeInner,
        result: Scalar,
        accumulate: bool,
    ) -> Shape {
        let result = TypeInner::Scalar(result);
        let mut arguments = Vec::from([left, right]);
        if accumulate {
            arguments.push(result.clone());
        }
        (arguments, result)
    }

    #[test]
    fn rule_tables_are_the_products_of_their_types() {
        let ldexp_rules: Vec<Shape> = FLOATS
            .into_iter()
            .flat_map(|mantissa| {
                [Scalar::I32, Scalar::I16]
                    .into_iter()
                    .flat_map(move |exponent| {
                        scalar_or_vector(mantissa)
                            .zip(scalar_or_vector(exponent))
                            .map(|(mantissa, exponent)| {
                                (Vec::from([mantissa.clone(), exponent]), mantissa)
                            })
                    })
            })
            .collect();
        assert_eq!(shapes(ldexp()), ldexp_rules);

        for accumulate in [false, true] {
            let dot: Vec<Shape> = INTEGERS
                .into_iter()
                .flat_map(|left| {
                    let other = Scalar {
                        kind: if left.kind == ir::ScalarKind::Uint {
                            ir::ScalarKind::Sint
                        } else {
                            ir::ScalarKind::Uint
                        },
                        width: left.width,
                    };
                    [left, other].into_iter().flat_map(move |right| {
                        SIZES.into_iter().map(move |size| {
                            integer_dot_shape(
                                vector(size, left),
                                vector(size, right),
                                integer_dot_result(left, right),
                                accumulate,
                            )
                        })
                    })
                })
                .collect();
            assert_eq!(shapes(integer_dot(accumulate)), dot);
            let packed: Vec<Shape> = [Scalar::I32, Scalar::U32]
                .into_iter()
                .flat_map(|left| {
                    [Scalar::I32, Scalar::U32].into_iter().map(move |right| {
                        integer_dot_shape(
                            TypeInner::Scalar(left),
                            TypeInner::Scalar(right),
                            integer_dot_result(left, right),
                            accumulate,
                        )
                    })
                })
                .collect();
            assert_eq!(shapes(packed_integer_dot(accumulate)), packed);
        }

        let matrices = |rule: fn(VectorSize, VectorSize, Scalar) -> Shape| -> Vec<Shape> {
            SIZES
                .into_iter()
                .flat_map(|columns| {
                    SIZES.into_iter().flat_map(move |rows| {
                        FLOATS
                            .into_iter()
                            .map(move |scalar| rule(columns, rows, scalar))
                    })
                })
                .collect()
        };
        assert_eq!(
            shapes(outer()),
            matrices(|columns, rows, scalar| (
                Vec::from([vector(rows, scalar), vector(columns, scalar)]),
                matrix(columns, rows, scalar)
            ))
        );
        assert_eq!(
            shapes(transpose()),
            matrices(|columns, rows, scalar| (
                Vec::from([matrix(columns, rows, scalar)]),
                matrix(rows, columns, scalar)
            ))
        );

        let refract_rules: Vec<Shape> = SIZES
            .into_iter()
            .flat_map(|size| {
                FLOATS
                    .into_iter()
                    .map(move |scalar| (vector(size, scalar), scalar))
            })
            .chain(
                FLOATS
                    .into_iter()
                    .map(|scalar| (TypeInner::Scalar(scalar), scalar)),
            )
            .map(|(incident, scalar)| {
                (
                    Vec::from([
                        incident.clone(),
                        incident.clone(),
                        TypeInner::Scalar(scalar),
                    ]),
                    incident,
                )
            })
            .collect();
        assert_eq!(shapes(refract()), refract_rules);

        let bits = TypeInner::Scalar(Scalar::U32);
        let bit_field = |insert: bool| -> Vec<Shape> {
            INTEGERS
                .into_iter()
                .flat_map(scalar_or_vector)
                .map(|input| {
                    let mut arguments = Vec::from([input.clone()]);
                    if insert {
                        arguments.push(input.clone());
                    }
                    arguments.extend([bits.clone(), bits.clone()]);
                    (arguments, input)
                })
                .collect()
        };
        assert_eq!(shapes(extract_bits()), bit_field(false));
        assert_eq!(shapes(insert_bits()), bit_field(true));

        let mix_rules: Vec<Shape> = FLOATS
            .into_iter()
            .flat_map(|scalar| {
                scalar_or_vector(scalar).flat_map(move |input| {
                    [input.clone(), TypeInner::Scalar(scalar)].map(|ratio| {
                        (
                            Vec::from([input.clone(), input.clone(), ratio]),
                            input.clone(),
                        )
                    })
                })
            })
            .collect();
        assert_eq!(shapes(mix()), mix_rules);
    }
}
