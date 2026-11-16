//! Overload sets for [`ir::MathFunction`].

use crate::proc::overloads::OverloadSet;
use crate::proc::overloads::any_overload_set::AnyOverloadSet;
use crate::proc::overloads::list::{List, MathType, StaticRule};
use crate::proc::overloads::regular::regular;
use crate::proc::overloads::utils::{
    CONCRETE_INT_SCALARS, FLOAT_SCALARS, VECTOR_SIZES, rule, scalar_or_vecn,
};

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

const fn build_ldexp() -> [StaticRule; 24] {
    const EXPONENTS: [ir::Scalar; 2] = [ir::Scalar::I32, ir::Scalar::I16];
    let mut rules = [StaticRule::EMPTY; 24];
    let mut idx = 0;
    let mut m = 0;
    while m < FLOAT_SCALARS.len() {
        let mantissa_scalar = FLOAT_SCALARS[m];
        let mantissas = scalar_or_vecn(mantissa_scalar);
        let mut e = 0;
        while e < EXPONENTS.len() {
            let exponents = scalar_or_vecn(EXPONENTS[e]);
            let mut k = 0;
            while k < 4 {
                rules[idx] = rule([mantissas[k], exponents[k]], mantissas[k]);
                idx += 1;
                k += 1;
            }
            e += 1;
        }
        m += 1;
    }
    rules
}

const fn ldexp() -> List {
    static RULES: [StaticRule; 24] = build_ldexp();
    List::from_static(&RULES)
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

const fn build_integer_dot(accumulate: bool) -> [StaticRule; 48] {
    let mut rules = [StaticRule::EMPTY; 48];
    let mut idx = 0;
    let mut l = 0;
    while l < CONCRETE_INT_SCALARS.len() {
        let left = CONCRETE_INT_SCALARS[l];
        let other = ir::Scalar {
            kind: match left.kind {
                ir::ScalarKind::Uint => ir::ScalarKind::Sint,
                ir::ScalarKind::Sint
                | ir::ScalarKind::Float
                | ir::ScalarKind::Bool
                | ir::ScalarKind::BFloat
                | ir::ScalarKind::FloatE4M3
                | ir::ScalarKind::FloatE5M2
                | ir::ScalarKind::FloatE2M1
                | ir::ScalarKind::FloatE3M2
                | ir::ScalarKind::FloatE2M3
                | ir::ScalarKind::FloatUE8M0
                | ir::ScalarKind::FloatMXINT8 => ir::ScalarKind::Uint,
            },
            width: left.width,
        };
        let rights = [left, other];
        let mut r = 0;
        while r < rights.len() {
            let right = rights[r];
            let mut s = 0;
            while s < VECTOR_SIZES.len() {
                let size = VECTOR_SIZES[s];
                rules[idx] = integer_dot_rule(
                    MathType::Vector { size, scalar: left },
                    MathType::Vector {
                        size,
                        scalar: right,
                    },
                    integer_dot_result(left, right),
                    accumulate,
                );
                idx += 1;
                s += 1;
            }
            r += 1;
        }
        l += 1;
    }
    rules
}

const fn integer_dot(accumulate: bool) -> List {
    static RULES: [StaticRule; 48] = build_integer_dot(false);
    static ACC_RULES: [StaticRule; 48] = build_integer_dot(true);
    if accumulate {
        List::from_static(&ACC_RULES)
    } else {
        List::from_static(&RULES)
    }
}

const fn build_packed_integer_dot(accumulate: bool) -> [StaticRule; 4] {
    const PACKED: [ir::Scalar; 2] = [ir::Scalar::I32, ir::Scalar::U32];
    let mut rules = [StaticRule::EMPTY; 4];
    let mut idx = 0;
    let mut l = 0;
    while l < PACKED.len() {
        let left = PACKED[l];
        let mut r = 0;
        while r < PACKED.len() {
            let right = PACKED[r];
            rules[idx] = integer_dot_rule(
                MathType::Scalar(left),
                MathType::Scalar(right),
                integer_dot_result(left, right),
                accumulate,
            );
            idx += 1;
            r += 1;
        }
        l += 1;
    }
    rules
}

const fn packed_integer_dot(accumulate: bool) -> List {
    static RULES: [StaticRule; 4] = build_packed_integer_dot(false);
    static ACC_RULES: [StaticRule; 4] = build_packed_integer_dot(true);
    if accumulate {
        List::from_static(&ACC_RULES)
    } else {
        List::from_static(&RULES)
    }
}

const fn build_outer() -> [StaticRule; 27] {
    let mut rules = [StaticRule::EMPTY; 27];
    let mut idx = 0;
    let mut c = 0;
    while c < VECTOR_SIZES.len() {
        let cols = VECTOR_SIZES[c];
        let mut r = 0;
        while r < VECTOR_SIZES.len() {
            let rows = VECTOR_SIZES[r];
            let mut s = 0;
            while s < FLOAT_SCALARS.len() {
                let scalar = FLOAT_SCALARS[s];
                let left = MathType::Vector { size: rows, scalar };
                let right = MathType::Vector { size: cols, scalar };
                let result = MathType::Matrix {
                    columns: cols,
                    rows,
                    scalar,
                };
                rules[idx] = rule([left, right], result);
                idx += 1;
                s += 1;
            }
            r += 1;
        }
        c += 1;
    }
    rules
}

const fn outer() -> List {
    static RULES: [StaticRule; 27] = build_outer();
    List::from_static(&RULES)
}

const fn build_refract() -> [StaticRule; 12] {
    let mut rules = [StaticRule::EMPTY; 12];
    let mut idx = 0;
    let mut v = 0;
    while v < VECTOR_SIZES.len() {
        let size = VECTOR_SIZES[v];
        let mut s = 0;
        while s < FLOAT_SCALARS.len() {
            let scalar = FLOAT_SCALARS[s];
            let incident = MathType::Vector { size, scalar };
            let ratio = MathType::Scalar(scalar);
            rules[idx] = rule([incident, incident, ratio], incident);
            idx += 1;
            s += 1;
        }
        v += 1;
    }
    let mut s = 0;
    while s < FLOAT_SCALARS.len() {
        let scalar = MathType::Scalar(FLOAT_SCALARS[s]);
        rules[idx] = rule([scalar, scalar, scalar], scalar);
        idx += 1;
        s += 1;
    }
    rules
}

const fn refract() -> List {
    static RULES: [StaticRule; 12] = build_refract();
    List::from_static(&RULES)
}

const fn build_transpose() -> [StaticRule; 27] {
    let mut rules = [StaticRule::EMPTY; 27];
    let mut idx = 0;
    let mut a_idx = 0;
    while a_idx < VECTOR_SIZES.len() {
        let a = VECTOR_SIZES[a_idx];
        let mut b_idx = 0;
        while b_idx < VECTOR_SIZES.len() {
            let b = VECTOR_SIZES[b_idx];
            let mut s = 0;
            while s < FLOAT_SCALARS.len() {
                let scalar = FLOAT_SCALARS[s];
                let input = MathType::Matrix {
                    columns: a,
                    rows: b,
                    scalar,
                };
                let output = MathType::Matrix {
                    columns: b,
                    rows: a,
                    scalar,
                };
                rules[idx] = rule([input], output);
                idx += 1;
                s += 1;
            }
            b_idx += 1;
        }
        a_idx += 1;
    }
    rules
}

const fn transpose() -> List {
    static RULES: [StaticRule; 27] = build_transpose();
    List::from_static(&RULES)
}

const fn build_extract_bits() -> [StaticRule; 32] {
    let mut rules = [StaticRule::EMPTY; 32];
    let mut idx = 0;
    let u32_scalar = MathType::Scalar(ir::Scalar::U32);
    let mut s = 0;
    while s < CONCRETE_INT_SCALARS.len() {
        let inputs = scalar_or_vecn(CONCRETE_INT_SCALARS[s]);
        let mut k = 0;
        while k < 4 {
            let input = inputs[k];
            rules[idx] = rule([input, u32_scalar, u32_scalar], input);
            idx += 1;
            k += 1;
        }
        s += 1;
    }
    rules
}

const fn extract_bits() -> List {
    static RULES: [StaticRule; 32] = build_extract_bits();
    List::from_static(&RULES)
}

const fn build_insert_bits() -> [StaticRule; 32] {
    let mut rules = [StaticRule::EMPTY; 32];
    let mut idx = 0;
    let u32_scalar = MathType::Scalar(ir::Scalar::U32);
    let mut s = 0;
    while s < CONCRETE_INT_SCALARS.len() {
        let inputs = scalar_or_vecn(CONCRETE_INT_SCALARS[s]);
        let mut k = 0;
        while k < 4 {
            let input = inputs[k];
            rules[idx] = rule([input, input, u32_scalar, u32_scalar], input);
            idx += 1;
            k += 1;
        }
        s += 1;
    }
    rules
}

const fn insert_bits() -> List {
    static RULES: [StaticRule; 32] = build_insert_bits();
    List::from_static(&RULES)
}

const fn build_mix() -> [StaticRule; 24] {
    let mut rules = [StaticRule::EMPTY; 24];
    let mut idx = 0;
    let mut s = 0;
    while s < FLOAT_SCALARS.len() {
        let scalar = FLOAT_SCALARS[s];
        let scalar_ratio = MathType::Scalar(scalar);
        let inputs = scalar_or_vecn(scalar);
        let mut k = 0;
        while k < 4 {
            let input = inputs[k];
            rules[idx] = rule([input, input, input], input);
            idx += 1;
            rules[idx] = rule([input, input, scalar_ratio], input);
            idx += 1;
            k += 1;
        }
        s += 1;
    }
    rules
}

const fn mix() -> List {
    static RULES: [StaticRule; 24] = build_mix();
    List::from_static(&RULES)
}
