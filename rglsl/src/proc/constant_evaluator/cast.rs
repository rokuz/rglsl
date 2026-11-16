use half::f16;
use num_traits::Zero;

use crate::proc::type_methods::IntFloatLimits;
use crate::{Literal, Scalar as Sc};

pub(super) fn cast_literal(literal: Literal, target: Sc) -> Option<Literal> {
    let literal = match literal {
        Literal::BF16(v) => Literal::F64(crate::proc::small_float::bf16_to_f64(v)),
        Literal::FE4M3(v) => Literal::F64(crate::proc::small_float::fe4m3_to_f64(v)),
        Literal::FE5M2(v) => Literal::F64(crate::proc::small_float::fe5m2_to_f64(v)),
        Literal::FE2M1(_)
        | Literal::FE3M2(_)
        | Literal::FE2M3(_)
        | Literal::FUE8M0(_)
        | Literal::FMXINT8(_) => literal.encoded_float_value().map_or(literal, Literal::F64),
        _ => literal,
    };
    Some(match target {
        Sc::BF16 => Literal::BF16(crate::proc::small_float::bf16_from_f64(wide(literal)?)),
        Sc::FE4M3 => Literal::FE4M3(crate::proc::small_float::fe4m3_from_f64(wide(literal)?)),
        Sc::FE5M2 => Literal::FE5M2(crate::proc::small_float::fe5m2_from_f64(wide(literal)?)),
        Sc::FE2M1 | Sc::FE3M2 | Sc::FE2M3 | Sc::FUE8M0 | Sc::FMXINT8 => {
            Literal::encoded_float(target, wide(literal)?)?
        }
        Sc::I8 => Literal::I8(to_i8(literal)?),
        Sc::U8 => Literal::U8(to_u8(literal)?),
        Sc::I16 => Literal::I16(to_i16(literal)?),
        Sc::U16 => Literal::U16(to_u16(literal)?),
        Sc::I32 => Literal::I32(to_i32(literal)?),
        Sc::U32 => Literal::U32(to_u32(literal)?),
        Sc::I64 => Literal::I64(to_i64(literal)?),
        Sc::U64 => Literal::U64(to_u64(literal)?),
        Sc::F16 => Literal::F16(to_f16(literal)?),
        Sc::F32 => Literal::F32(to_f32(literal)?),
        Sc::F64 => Literal::F64(to_f64(literal)?),
        Sc::BOOL => Literal::Bool(to_bool(literal)?),
        _ => {
            log::debug!("Constant evaluator refused to convert value to {target:?}");
            return None;
        }
    })
}

fn wide(literal: Literal) -> Option<f64> {
    Some(match literal {
        Literal::F64(v) => v,
        Literal::F32(v) => f64::from(v),
        Literal::F16(v) => f16::to_f64(v),
        Literal::U8(v) => f64::from(v),
        Literal::I8(v) => f64::from(v),
        Literal::U16(v) => f64::from(v),
        Literal::I16(v) => f64::from(v),
        Literal::U32(v) => f64::from(v),
        Literal::I32(v) => f64::from(v),
        Literal::U64(v) => v as f64,
        Literal::I64(v) => v as f64,
        _ => return None,
    })
}

fn to_i8(literal: Literal) -> Option<i8> {
    Some(match literal {
        Literal::I8(v) => v,
        Literal::U8(v) => v as i8,
        Literal::I16(v) => v as i8,
        Literal::U16(v) => v as i8,
        Literal::I32(v) => v as i8,
        Literal::U32(v) => v as i8,
        Literal::I64(v) => v as i8,
        Literal::U64(v) => v as i8,
        Literal::F32(v) => v as i8,
        Literal::F64(v) => v as i8,
        Literal::F16(v) => f16::to_f32(v) as i8,
        Literal::Bool(v) => i8::from(v),
        _ => return None,
    })
}

fn to_u8(literal: Literal) -> Option<u8> {
    Some(match literal {
        Literal::I8(v) => v as u8,
        Literal::U8(v) => v,
        Literal::I16(v) => v as u8,
        Literal::U16(v) => v as u8,
        Literal::I32(v) => v as u8,
        Literal::U32(v) => v as u8,
        Literal::I64(v) => v as u8,
        Literal::U64(v) => v as u8,
        Literal::F32(v) => v as u8,
        Literal::F64(v) => v as u8,
        Literal::F16(v) => f16::to_f32(v) as u8,
        Literal::Bool(v) => u8::from(v),
        _ => return None,
    })
}

fn to_i16(literal: Literal) -> Option<i16> {
    Some(match literal {
        Literal::U8(v) => v as i16,
        Literal::I8(v) => v as i16,
        Literal::I16(v) => v,
        Literal::U16(v) => v as i16,
        Literal::I32(v) => v as i16,
        Literal::U32(v) => v as i16,
        Literal::F32(v) => v.clamp(i16::MIN as f32, i16::MAX as f32) as i16,
        Literal::F16(v) => f16::to_f32(v).clamp(i16::MIN as f32, i16::MAX as f32) as i16,
        Literal::Bool(v) => v as i16,
        Literal::F64(v) => v.clamp(i16::MIN as f64, i16::MAX as f64) as i16,
        Literal::I64(v) => v as i16,
        Literal::U64(v) => v as i16,
        _ => return None,
    })
}

fn to_u16(literal: Literal) -> Option<u16> {
    Some(match literal {
        Literal::U8(v) => v as u16,
        Literal::I8(v) => v as u16,
        Literal::I16(v) => v as u16,
        Literal::U16(v) => v,
        Literal::I32(v) => v as u16,
        Literal::U32(v) => v as u16,
        Literal::F32(v) => v.clamp(u16::MIN as f32, u16::MAX as f32) as u16,
        Literal::F16(v) => f16::to_f32(v) as u16,
        Literal::Bool(v) => v as u16,
        Literal::F64(v) => v.clamp(u16::MIN as f64, u16::MAX as f64) as u16,
        Literal::I64(v) => v as u16,
        Literal::U64(v) => v as u16,
        _ => return None,
    })
}

fn to_i32(literal: Literal) -> Option<i32> {
    Some(match literal {
        Literal::U8(v) => v as i32,
        Literal::I8(v) => v as i32,
        Literal::I16(v) => v as i32,
        Literal::U16(v) => v as i32,
        Literal::I32(v) => v,
        Literal::U32(v) => v as i32,
        Literal::F32(v) => v.clamp(i32::min_float(), i32::max_float()) as i32,
        Literal::F16(v) => f16::to_f32(v) as i32,
        Literal::Bool(v) => v as i32,
        Literal::F64(v) => v as i32,
        Literal::I64(v) => v as i32,
        Literal::U64(v) => v as i32,
        _ => return None,
    })
}

fn to_u32(literal: Literal) -> Option<u32> {
    Some(match literal {
        Literal::U8(v) => v as u32,
        Literal::I8(v) => v as u32,
        Literal::I16(v) => v as u32,
        Literal::U16(v) => v as u32,
        Literal::I32(v) => v as u32,
        Literal::U32(v) => v,
        Literal::F32(v) => v.clamp(u32::min_float(), u32::max_float()) as u32,
        // max(0) avoids None due to negative, therefore only None on NaN or Inf
        Literal::F16(v) => f16::to_f32(v) as u32,
        Literal::Bool(v) => v as u32,
        Literal::F64(v) => v as u32,
        Literal::I64(v) => v as u32,
        Literal::U64(v) => v as u32,
        _ => return None,
    })
}

fn to_i64(literal: Literal) -> Option<i64> {
    Some(match literal {
        Literal::U8(v) => v as i64,
        Literal::I8(v) => v as i64,
        Literal::I16(v) => v as i64,
        Literal::U16(v) => v as i64,
        Literal::I32(v) => v as i64,
        Literal::U32(v) => v as i64,
        Literal::F32(v) => v.clamp(i64::min_float(), i64::max_float()) as i64,
        Literal::Bool(v) => v as i64,
        Literal::F64(v) => v.clamp(i64::min_float(), i64::max_float()) as i64,
        Literal::I64(v) => v,
        Literal::U64(v) => v as i64,
        Literal::F16(v) => f16::to_f32(v) as i64,
        _ => return None,
    })
}

fn to_u64(literal: Literal) -> Option<u64> {
    Some(match literal {
        Literal::U8(v) => v as u64,
        Literal::I8(v) => v as u64,
        Literal::I16(v) => v as u64,
        Literal::U16(v) => v as u64,
        Literal::I32(v) => v as u64,
        Literal::U32(v) => v as u64,
        Literal::F32(v) => v.clamp(u64::min_float(), u64::max_float()) as u64,
        Literal::Bool(v) => v as u64,
        Literal::F64(v) => v.clamp(u64::min_float(), u64::max_float()) as u64,
        Literal::I64(v) => v as u64,
        Literal::U64(v) => v,
        // max(0) avoids None due to negative, therefore only None on NaN or Inf
        Literal::F16(v) => f16::to_f32(v) as u64,
        _ => return None,
    })
}

fn to_f16(literal: Literal) -> Option<f16> {
    Some(match literal {
        Literal::U8(v) => f16::from_f32(f32::from(v)),
        Literal::I8(v) => f16::from_f32(f32::from(v)),
        Literal::F16(v) => v,
        Literal::F32(v) => f16::from_f32(v),
        Literal::F64(v) => f16::from_f64(v),
        Literal::Bool(v) => f16::from_f32(f32::from(u8::from(v))),
        Literal::I16(v) => f16::from_f32(v as f32),
        Literal::U16(v) => f16::from_f32(v as f32),
        Literal::I64(v) => f16::from_f64(v as f64),
        Literal::U64(v) => f16::from_f64(v as f64),
        Literal::I32(v) => f16::from_f64(f64::from(v)),
        Literal::U32(v) => f16::from_f64(f64::from(v)),
        _ => return None,
    })
}

fn to_f32(literal: Literal) -> Option<f32> {
    Some(match literal {
        Literal::U8(v) => v as f32,
        Literal::I8(v) => v as f32,
        Literal::I16(v) => v as f32,
        Literal::U16(v) => v as f32,
        Literal::I32(v) => v as f32,
        Literal::U32(v) => v as f32,
        Literal::F32(v) => v,
        Literal::Bool(v) => v as u32 as f32,
        Literal::F64(v) => v as f32,
        Literal::I64(v) => v as f32,
        Literal::U64(v) => v as f32,
        Literal::F16(v) => f16::to_f32(v),
        _ => return None,
    })
}

fn to_f64(literal: Literal) -> Option<f64> {
    Some(match literal {
        Literal::U8(v) => v as f64,
        Literal::I8(v) => v as f64,
        Literal::I16(v) => v as f64,
        Literal::U16(v) => v as f64,
        Literal::I32(v) => v as f64,
        Literal::U32(v) => v as f64,
        Literal::F16(v) => f16::to_f64(v),
        Literal::F32(v) => v as f64,
        Literal::F64(v) => v,
        Literal::Bool(v) => v as u32 as f64,
        Literal::I64(v) => v as f64,
        Literal::U64(v) => v as f64,
        _ => return None,
    })
}

fn to_bool(literal: Literal) -> Option<bool> {
    Some(match literal {
        Literal::U8(v) => v != 0,
        Literal::I8(v) => v != 0,
        Literal::I16(v) => v != 0,
        Literal::U16(v) => v != 0,
        Literal::I32(v) => v != 0,
        Literal::U32(v) => v != 0,
        Literal::F32(v) => v != 0.0,
        Literal::F16(v) => v != f16::zero(),
        Literal::Bool(v) => v,
        Literal::F64(v) => v != 0.0,
        Literal::I64(v) => v != 0,
        Literal::U64(v) => v != 0,
        _ => return None,
    })
}
