use alloc::string::String;
use alloc::vec::Vec;

use rglsl_types::extension::Extension::{
    self, AmdGpuShaderHalfFloat, AmdGpuShaderInt16, ArbGpuShaderFp64, ArbGpuShaderInt64,
    ArmTensors, ExtBfloat16, ExtFloatE2m1, ExtFloatE2m3, ExtFloatE3m2, ExtFloatE4m3, ExtFloatE5m2,
    ExtFloatMxint8, ExtFloatUe8m0, ExtLongVector, ExtRayQuery, ExtRayTracing, ExtShader8bitStorage,
    ExtShader16bitStorage, ExtShaderExplicitArithmeticTypes,
    ExtShaderExplicitArithmeticTypesFloat16, ExtShaderExplicitArithmeticTypesFloat32,
    ExtShaderExplicitArithmeticTypesFloat64, ExtShaderExplicitArithmeticTypesInt8,
    ExtShaderExplicitArithmeticTypesInt16, ExtShaderExplicitArithmeticTypesInt32,
    ExtShaderExplicitArithmeticTypesInt64, ExtShaderImageInt64, ExtShaderInvocationReorder,
    ExtShaderTileImage, KhrCooperativeMatrix, NvCooperativeMatrix, NvCooperativeMatrix2,
    NvCooperativeVector, NvDisplacementMicromap, NvGpuShader5, NvIntegerCooperativeMatrix,
    NvRayTracing, NvShaderInvocationReorder,
};
use rglsl_types::extension::ExtensionSet;

use crate::ast::ExtensionBehavior;

pub const ALL: &str = "all";

pub const EXPLICIT_ARITHMETIC: [Extension; 8] = [
    ExtShaderExplicitArithmeticTypes,
    ExtShaderExplicitArithmeticTypesInt8,
    ExtShaderExplicitArithmeticTypesInt16,
    ExtShaderExplicitArithmeticTypesInt32,
    ExtShaderExplicitArithmeticTypesInt64,
    ExtShaderExplicitArithmeticTypesFloat16,
    ExtShaderExplicitArithmeticTypesFloat32,
    ExtShaderExplicitArithmeticTypesFloat64,
];

const INT64_TYPES: &[Extension] = &[
    ArbGpuShaderInt64,
    ExtShaderExplicitArithmeticTypes,
    NvGpuShader5,
    ExtShaderExplicitArithmeticTypesInt64,
];
const INT8_TYPES: &[Extension] = &[
    ExtShaderExplicitArithmeticTypes,
    ExtShader8bitStorage,
    NvGpuShader5,
    ExtShaderExplicitArithmeticTypesInt8,
];
const INT16_TYPES: &[Extension] = &[
    AmdGpuShaderInt16,
    ExtShader16bitStorage,
    ExtShaderExplicitArithmeticTypes,
    NvGpuShader5,
    ExtShaderExplicitArithmeticTypesInt16,
];
const INT32_TYPES: &[Extension] = &[
    ExtShaderExplicitArithmeticTypes,
    NvGpuShader5,
    ExtShaderExplicitArithmeticTypesInt32,
];
const FLOAT32_TYPES: &[Extension] = &[
    ExtShaderExplicitArithmeticTypes,
    NvGpuShader5,
    ExtShaderExplicitArithmeticTypesFloat32,
];
const FLOAT32_MATRICES: &[Extension] = &[
    ExtShaderExplicitArithmeticTypes,
    ExtShaderExplicitArithmeticTypesFloat32,
];
const FLOAT64_TYPES: &[Extension] = &[
    ExtShaderExplicitArithmeticTypes,
    ExtShaderExplicitArithmeticTypesFloat64,
];
const FLOAT16_TYPES: &[Extension] = &[
    AmdGpuShaderHalfFloat,
    ExtShader16bitStorage,
    ExtShaderExplicitArithmeticTypes,
    NvGpuShader5,
    ExtShaderExplicitArithmeticTypesFloat16,
];
const FLOAT16_MATRICES: &[Extension] = &[
    AmdGpuShaderHalfFloat,
    ExtShaderExplicitArithmeticTypes,
    ExtShaderExplicitArithmeticTypesFloat16,
];

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Feature {
    Int64Type,
    Int8Type,
    Int16Type,
    Int32Type,
    Float32Type,
    Float32Matrix,
    Float64Type,
    Float64Matrix,
    Float16Type,
    Float16Matrix,
    Int64Literal,
    Int16Literal,
    Float16Literal,
    Float16Arithmetic,
    Int16Arithmetic,
    Int8Arithmetic,
    AccelerationStructureNv,
    AccelerationStructureExt,
    RayQueryType,
    HitObjectNvType,
    HitObjectExtType,
    CooperativeMatrixType,
    CooperativeMatrixNvType,
    IntegerCooperativeMatrixNvType,
    TensorType,
    TensorArmType,
    CooperativeVectorType,
    LongVectorType,
    BFloat16Type,
    FloatE4M3Type,
    FloatE5M2Type,
    FloatE2M1Type,
    FloatE3M2Type,
    FloatE2M3Type,
    FloatUE8M0Type,
    FloatMXINT8Type,
    Int64ImageType,
    TileImageType,
}

impl Feature {
    pub const fn extensions(self) -> &'static [Extension] {
        match self {
            Self::Int64Type | Self::Int64Literal => INT64_TYPES,
            Self::Int8Type => INT8_TYPES,
            Self::Int16Type => INT16_TYPES,
            Self::Int32Type => INT32_TYPES,
            Self::Float32Type => FLOAT32_TYPES,
            Self::Float32Matrix => FLOAT32_MATRICES,
            Self::Float64Type | Self::Float64Matrix => FLOAT64_TYPES,
            Self::Float16Type => FLOAT16_TYPES,
            Self::Float16Matrix => FLOAT16_MATRICES,
            Self::Int16Literal => &[
                AmdGpuShaderInt16,
                ExtShaderExplicitArithmeticTypes,
                ExtShaderExplicitArithmeticTypesInt16,
            ],
            Self::Float16Literal => &[
                AmdGpuShaderHalfFloat,
                ExtShaderExplicitArithmeticTypes,
                ExtShaderExplicitArithmeticTypesFloat16,
            ],
            Self::Float16Arithmetic => &[
                AmdGpuShaderHalfFloat,
                ExtShaderExplicitArithmeticTypes,
                NvGpuShader5,
                ExtShaderExplicitArithmeticTypesFloat16,
            ],
            Self::Int16Arithmetic => &[
                AmdGpuShaderInt16,
                ExtShaderExplicitArithmeticTypes,
                NvGpuShader5,
                ExtShaderExplicitArithmeticTypesInt16,
            ],
            Self::Int8Arithmetic => &[
                ExtShaderExplicitArithmeticTypes,
                NvGpuShader5,
                ExtShaderExplicitArithmeticTypesInt8,
            ],
            Self::AccelerationStructureNv => &[NvRayTracing],
            Self::AccelerationStructureExt => &[ExtRayTracing, ExtRayQuery, NvDisplacementMicromap],
            Self::RayQueryType => &[ExtRayQuery],
            Self::HitObjectNvType => &[NvShaderInvocationReorder],
            Self::HitObjectExtType => &[ExtShaderInvocationReorder],
            Self::CooperativeMatrixType => &[KhrCooperativeMatrix],
            Self::CooperativeMatrixNvType => &[NvCooperativeMatrix],
            Self::IntegerCooperativeMatrixNvType => &[NvIntegerCooperativeMatrix],
            Self::TensorType => &[NvCooperativeMatrix2],
            Self::TensorArmType => &[ArmTensors],
            Self::CooperativeVectorType => &[NvCooperativeVector],
            Self::LongVectorType => &[ExtLongVector],
            Self::BFloat16Type => &[ExtBfloat16],
            Self::FloatE4M3Type => &[ExtFloatE4m3],
            Self::FloatE5M2Type => &[ExtFloatE5m2],
            Self::FloatE2M1Type => &[ExtFloatE2m1],
            Self::FloatE3M2Type => &[ExtFloatE3m2],
            Self::FloatE2M3Type => &[ExtFloatE2m3],
            Self::FloatUE8M0Type => &[ExtFloatUe8m0],
            Self::FloatMXINT8Type => &[ExtFloatMxint8],
            Self::Int64ImageType => &[ExtShaderImageInt64],
            Self::TileImageType => &[ExtShaderTileImage],
        }
    }

    pub fn of_type_keyword(word: &str) -> Option<Self> {
        let matrix = |stem: &str| {
            word.strip_prefix(stem).is_some_and(|shape| {
                matches!(
                    shape,
                    "2" | "3"
                        | "4"
                        | "2x2"
                        | "2x3"
                        | "2x4"
                        | "3x2"
                        | "3x3"
                        | "3x4"
                        | "4x2"
                        | "4x3"
                        | "4x4"
                )
            })
        };
        let vector = |stem: &str| {
            word.strip_prefix(stem)
                .is_some_and(|size| matches!(size, "2" | "3" | "4"))
        };
        let family = |scalars: [&str; 2], stems: [&str; 2]| {
            scalars.contains(&word) || stems.iter().any(|stem| vector(stem))
        };
        Some(if word == "accelerationStructureNV" {
            Self::AccelerationStructureNv
        } else if word == "accelerationStructureEXT" {
            Self::AccelerationStructureExt
        } else if word == "rayQueryEXT" {
            Self::RayQueryType
        } else if word == "hitObjectNV" {
            Self::HitObjectNvType
        } else if word == "hitObjectEXT" {
            Self::HitObjectExtType
        } else if matches!(word, "attachmentEXT" | "iattachmentEXT" | "uattachmentEXT") {
            Self::TileImageType
        } else if word.starts_with("i64image") || word.starts_with("u64image") {
            Self::Int64ImageType
        } else if word == "coopmat" {
            Self::CooperativeMatrixType
        } else if word == "fcoopmatNV" {
            Self::CooperativeMatrixNvType
        } else if word == "icoopmatNV" || word == "ucoopmatNV" {
            Self::IntegerCooperativeMatrixNvType
        } else if word == "tensorLayoutNV" || word == "tensorViewNV" {
            Self::TensorType
        } else if word == "tensorARM" {
            Self::TensorArmType
        } else if word == "coopvecNV" {
            Self::CooperativeVectorType
        } else if word == "vector" {
            Self::LongVectorType
        } else if word == "bfloat16_t" || vector("bf16vec") {
            Self::BFloat16Type
        } else if word == "floate4m3_t" || vector("fe4m3vec") {
            Self::FloatE4M3Type
        } else if word == "floate5m2_t" || vector("fe5m2vec") {
            Self::FloatE5M2Type
        } else if word == "floate2m1_t" || vector("fe2m1vec") {
            Self::FloatE2M1Type
        } else if word == "floate3m2_t" || vector("fe3m2vec") {
            Self::FloatE3M2Type
        } else if word == "floate2m3_t" || vector("fe2m3vec") {
            Self::FloatE2M3Type
        } else if word == "floatue8m0_t" || vector("fue8m0vec") {
            Self::FloatUE8M0Type
        } else if word == "floatmxint8_t" || vector("fmxint8vec") {
            Self::FloatMXINT8Type
        } else if family(["int64_t", "uint64_t"], ["i64vec", "u64vec"]) {
            Self::Int64Type
        } else if family(["int8_t", "uint8_t"], ["i8vec", "u8vec"]) {
            Self::Int8Type
        } else if family(["int16_t", "uint16_t"], ["i16vec", "u16vec"]) {
            Self::Int16Type
        } else if family(["int32_t", "uint32_t"], ["i32vec", "u32vec"]) {
            Self::Int32Type
        } else if word == "float32_t" || vector("f32vec") {
            Self::Float32Type
        } else if matrix("f32mat") {
            Self::Float32Matrix
        } else if word == "float64_t" || vector("f64vec") {
            Self::Float64Type
        } else if matrix("f64mat") {
            Self::Float64Matrix
        } else if word == "float16_t" || vector("f16vec") {
            Self::Float16Type
        } else if matrix("f16mat") {
            Self::Float16Matrix
        } else {
            return None;
        })
    }
}

pub fn joined_names(extensions: &[Extension]) -> String {
    let mut text = String::new();
    for (index, extension) in extensions.iter().enumerate() {
        if index > 0 {
            text.push_str(", ");
        }
        text.push_str(extension.name());
    }
    text
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ExtensionIssue {
    UnknownRequired(String),
    Unknown(String),
    AllEnabled(ExtensionBehavior),
}

impl ExtensionIssue {
    pub const fn is_error(&self) -> bool {
        matches!(self, Self::UnknownRequired(_) | Self::AllEnabled(_))
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Request {
    Enabled,
    Warned(&'static str),
    Missing,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ExtensionState {
    behaviors: [ExtensionBehavior; Extension::COUNT],
    requested: ExtensionSet,
}

impl Default for ExtensionState {
    fn default() -> Self {
        Self::new()
    }
}

impl ExtensionState {
    pub const fn new() -> Self {
        Self {
            behaviors: [ExtensionBehavior::Disable; Extension::COUNT],
            requested: ExtensionSet::EMPTY,
        }
    }

    fn set(&mut self, extension: Extension, behavior: ExtensionBehavior) {
        if let Some(slot) = self.behaviors.get_mut(extension as usize) {
            *slot = behavior;
        }
        if behavior != ExtensionBehavior::Disable {
            self.requested.set(extension, true);
        }
    }

    pub fn extension_behavior(&self, extension: Extension) -> ExtensionBehavior {
        self.behaviors
            .get(extension as usize)
            .copied()
            .unwrap_or(ExtensionBehavior::Disable)
    }

    pub const fn is_extension_requested(&self, extension: Extension) -> bool {
        self.requested.contains(extension)
    }

    pub fn apply(&mut self, name: &str, behavior: ExtensionBehavior) -> Vec<ExtensionIssue> {
        let mut issues = Vec::new();
        if name == ALL {
            if matches!(
                behavior,
                ExtensionBehavior::Require | ExtensionBehavior::Enable
            ) {
                issues.push(ExtensionIssue::AllEnabled(behavior));
            } else {
                self.behaviors = [behavior; Extension::COUNT];
            }
            return issues;
        }
        let Some(extension) = Extension::from_name(name) else {
            issues.push(if behavior == ExtensionBehavior::Require {
                ExtensionIssue::UnknownRequired(String::from(name))
            } else {
                ExtensionIssue::Unknown(String::from(name))
            });
            return issues;
        };
        for affected in extension.with_implied().iter() {
            self.set(affected, behavior);
        }
        issues
    }

    pub fn behavior(&self, name: &str) -> ExtensionBehavior {
        Extension::from_name(name).map_or(ExtensionBehavior::Disable, |extension| {
            self.extension_behavior(extension)
        })
    }

    pub fn requested(&self) -> impl Iterator<Item = &'static str> + '_ {
        self.requested.iter().map(Extension::name)
    }

    pub fn is_requested(&self, name: &str) -> bool {
        Extension::from_name(name).is_some_and(|extension| self.is_extension_requested(extension))
    }

    pub fn is_extension_on(&self, extension: Extension) -> bool {
        self.extension_behavior(extension) != ExtensionBehavior::Disable
    }

    pub fn any_extension_on(&self, extensions: &[Extension]) -> bool {
        extensions
            .iter()
            .any(|&extension| self.is_extension_on(extension))
    }

    pub fn is_on(&self, name: &str) -> bool {
        self.behavior(name) != ExtensionBehavior::Disable
    }

    pub fn any_on(&self, names: &[&str]) -> bool {
        names.iter().any(|name| self.is_on(name))
    }

    pub fn request(&self, names: &[&'static str]) -> Request {
        let enabled = names.iter().any(|name| {
            matches!(
                self.behavior(name),
                ExtensionBehavior::Enable | ExtensionBehavior::Require
            )
        });
        if enabled {
            return Request::Enabled;
        }
        names
            .iter()
            .find(|name| self.behavior(name) == ExtensionBehavior::Warn)
            .map_or(Request::Missing, |name| Request::Warned(name))
    }

    pub fn request_any(&self, extensions: &[Extension]) -> Request {
        let enabled = extensions.iter().any(|&extension| {
            matches!(
                self.extension_behavior(extension),
                ExtensionBehavior::Enable | ExtensionBehavior::Require
            )
        });
        if enabled {
            return Request::Enabled;
        }
        extensions
            .iter()
            .find(|&&extension| self.extension_behavior(extension) == ExtensionBehavior::Warn)
            .map_or(Request::Missing, |extension| {
                Request::Warned(extension.name())
            })
    }

    pub fn enabled(&self) -> impl Iterator<Item = &'static str> + '_ {
        Extension::ALL
            .into_iter()
            .filter(|&extension| self.is_extension_on(extension))
            .map(Extension::name)
    }

    pub fn keyword_enabled(&self, word: &str) -> bool {
        match Feature::of_type_keyword(word) {
            None => true,
            Some(Feature::Float64Type) => {
                self.any_extension_on(Feature::Float64Type.extensions())
                    || (self.is_extension_on(NvGpuShader5)
                        && self.is_extension_on(ArbGpuShaderFp64))
            }
            Some(feature) => self.any_extension_on(feature.extensions()),
        }
    }

    pub fn explicit_arithmetic(&self) -> bool {
        self.any_extension_on(&EXPLICIT_ARITHMETIC)
    }
}
