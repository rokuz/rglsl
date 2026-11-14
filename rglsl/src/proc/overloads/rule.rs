/*! Type rules.

An implementation of [`OverloadSet`] represents a set of type rules, each of
which has a list of types for its arguments, and a conclusion about the
type of the expression as a whole.

This module defines the [`Rule`] type, representing a type rule from an
[`OverloadSet`], and the [`Conclusion`] type, a specialized enum for
representing a type rule's conclusion.

[`OverloadSet`]: crate::proc::overloads::OverloadSet

*/

use crate::UniqueArena;
use crate::common::{DiagnosticDebug, ForDebugWithTypes};
use crate::ir;
use crate::proc::TypeResolution;
use crate::proc::overloads::constructor_set::ConstructorSize;

use alloc::vec::Vec;
use core::fmt;
use core::result::Result;

/// A single type rule.
#[derive(Clone, Debug)]
pub struct Rule {
    pub arguments: Vec<TypeResolution>,
    pub conclusion: Conclusion,
}

/// The result type of a [`Rule`].
///
/// A `Conclusion` value represents the return type of some operation
/// in the builtin function database.
///
/// This is very similar to [`TypeInner`], except that it represents
/// predeclared types using [`PredeclaredType`], so that overload
/// resolution can delegate registering predeclared types to its users.
///
/// [`TypeInner`]: ir::TypeInner
/// [`PredeclaredType`]: ir::PredeclaredType
#[derive(Clone, Debug)]
pub enum Conclusion {
    /// A type that can be entirely characterized by a [`TypeInner`] value.
    ///
    /// [`TypeInner`]: ir::TypeInner
    Value(ir::TypeInner),

    /// A type that should be registered in the module's
    /// [`SpecialTypes::predeclared_types`] table.
    ///
    /// This is used for operations like [`Frexp`] and [`Modf`].
    ///
    /// [`SpecialTypes::predeclared_types`]: ir::SpecialTypes::predeclared_types
    /// [`Frexp`]: crate::ir::MathFunction::Frexp
    /// [`Modf`]: crate::ir::MathFunction::Modf
    Predeclared(ir::PredeclaredType),
}

impl Conclusion {
    pub const fn for_frexp_modf(
        function: ir::MathFunction,
        size: ConstructorSize,
        scalar: ir::Scalar,
    ) -> Option<Self> {
        use ir::MathFunction as Mf;
        use ir::PredeclaredType as Pt;

        let size = match size {
            ConstructorSize::Scalar => None,
            ConstructorSize::Vector(size) => Some(size),
            ConstructorSize::Matrix { .. } => return None,
        };

        let predeclared = match function {
            Mf::Frexp => Pt::FrexpResult { size, scalar },
            Mf::Modf => Pt::ModfResult { size, scalar },
            Mf::Abs
            | Mf::Min
            | Mf::Max
            | Mf::Clamp
            | Mf::Min3
            | Mf::Max3
            | Mf::Mid3
            | Mf::CubeFaceIndex
            | Mf::CubeFaceCoord
            | Mf::IntelCountLeadingZeros
            | Mf::IntelCountTrailingZeros
            | Mf::AbsoluteDifference
            | Mf::AddSaturate
            | Mf::SubtractSaturate
            | Mf::Average
            | Mf::AverageRounded
            | Mf::Multiply32x16
            | Mf::Cos
            | Mf::Cosh
            | Mf::Sin
            | Mf::Sinh
            | Mf::Tan
            | Mf::Tanh
            | Mf::Acos
            | Mf::Asin
            | Mf::Atan
            | Mf::Atan2
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
            | Mf::Ldexp
            | Mf::Exp
            | Mf::Exp2
            | Mf::Log
            | Mf::Log2
            | Mf::Pow
            | Mf::Dot
            | Mf::Dot4I8Packed
            | Mf::Dot4U8Packed
            | Mf::IntegerDot
            | Mf::IntegerDotAccSat
            | Mf::PackedIntegerDot4x8
            | Mf::PackedIntegerDot4x8AccSat
            | Mf::Outer
            | Mf::Cross
            | Mf::Distance
            | Mf::Length
            | Mf::Normalize
            | Mf::FaceForward
            | Mf::Reflect
            | Mf::Refract
            | Mf::Sign
            | Mf::Fma
            | Mf::Mix
            | Mf::Step
            | Mf::SmoothStep
            | Mf::Sqrt
            | Mf::InverseSqrt
            | Mf::Inverse
            | Mf::Transpose
            | Mf::Determinant
            | Mf::CountTrailingZeros
            | Mf::CountLeadingZeros
            | Mf::CountOneBits
            | Mf::ReverseBits
            | Mf::ExtractBits
            | Mf::InsertBits
            | Mf::FirstTrailingBit
            | Mf::FirstLeadingBit
            | Mf::AddCarry
            | Mf::SubBorrow
            | Mf::MulExtended
            | Mf::Pack4x8snorm
            | Mf::Pack4x8unorm
            | Mf::Pack2x16snorm
            | Mf::Pack2x16unorm
            | Mf::Pack2x16float
            | Mf::Pack4xI8
            | Mf::Pack4xU8
            | Mf::Pack4xI8Clamp
            | Mf::Pack4xU8Clamp
            | Mf::PackDouble2x32
            | Mf::Unpack4x8snorm
            | Mf::Unpack4x8unorm
            | Mf::Unpack2x16snorm
            | Mf::Unpack2x16unorm
            | Mf::Unpack2x16float
            | Mf::Unpack4xI8
            | Mf::Unpack4xU8
            | Mf::UnpackDouble2x32 => return None,
        };

        Some(Conclusion::Predeclared(predeclared))
    }

    pub const fn for_wide(size: ConstructorSize, scalar: ir::Scalar) -> Self {
        let size = match size {
            ConstructorSize::Vector(size) => Some(size),
            ConstructorSize::Scalar | ConstructorSize::Matrix { .. } => None,
        };
        Conclusion::Predeclared(ir::PredeclaredType::WideResult { size, scalar })
    }

    pub fn into_resolution(
        self,
        special_types: &ir::SpecialTypes,
    ) -> Result<TypeResolution, MissingSpecialType> {
        match self {
            Conclusion::Value(inner) => Ok(TypeResolution::Value(inner)),
            Conclusion::Predeclared(predeclared) => {
                let handle = *special_types
                    .predeclared_types
                    .get(&predeclared)
                    .ok_or(MissingSpecialType)?;
                Ok(TypeResolution::Handle(handle))
            }
        }
    }
}

#[derive(Debug, thiserror::Error)]
#[error("Special type is not registered within the module")]
pub struct MissingSpecialType;

impl ForDebugWithTypes for &Rule {}

impl fmt::Debug for DiagnosticDebug<(&Rule, &UniqueArena<ir::Type>)> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let (rule, arena) = self.0;
        f.write_str("(")?;
        for (i, argument) in rule.arguments.iter().enumerate() {
            if i > 0 {
                f.write_str(", ")?;
            }
            write!(f, "{:?}", argument.for_debug(arena))?;
        }
        write!(f, ") -> {:?}", rule.conclusion.for_debug(arena))
    }
}

impl ForDebugWithTypes for &Conclusion {}

impl fmt::Debug for DiagnosticDebug<(&Conclusion, &UniqueArena<ir::Type>)> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let (conclusion, ctx) = self.0;

        {
            let _ = ctx;
            write!(f, "{conclusion:?}")?;
        }

        Ok(())
    }
}
