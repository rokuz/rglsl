//! Utility functions for constructing [`List`] overload sets.
//!
//! [`List`]: crate::proc::overloads::list::List

use crate::ir;
use crate::proc::overloads::list::{MathType, StaticRule};

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
