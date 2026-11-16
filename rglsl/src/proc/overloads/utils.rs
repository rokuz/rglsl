//! Utility functions for constructing [`List`] overload sets.
//!
//! [`List`]: crate::proc::overloads::list::List

use crate::ir;
use crate::proc::overloads::list::{MathType, StaticRule};

pub const FLOAT_SCALARS: [ir::Scalar; 3] = [ir::Scalar::F32, ir::Scalar::F16, ir::Scalar::F64];

pub const CONCRETE_INT_SCALARS: [ir::Scalar; 8] = [
    ir::Scalar::I32,
    ir::Scalar::U32,
    ir::Scalar::I16,
    ir::Scalar::U16,
    ir::Scalar::I64,
    ir::Scalar::U64,
    ir::Scalar::I8,
    ir::Scalar::U8,
];

pub const VECTOR_SIZES: [ir::VectorSize; 3] = [
    ir::VectorSize::Bi,
    ir::VectorSize::Tri,
    ir::VectorSize::Quad,
];

pub const fn scalar_or_vecn(scalar: ir::Scalar) -> [MathType; 4] {
    [
        MathType::Scalar(scalar),
        MathType::Vector {
            size: ir::VectorSize::Bi,
            scalar,
        },
        MathType::Vector {
            size: ir::VectorSize::Tri,
            scalar,
        },
        MathType::Vector {
            size: ir::VectorSize::Quad,
            scalar,
        },
    ]
}

pub const fn rule<const N: usize>(args: [MathType; N], ret: MathType) -> StaticRule {
    StaticRule::new(args, ret)
}
