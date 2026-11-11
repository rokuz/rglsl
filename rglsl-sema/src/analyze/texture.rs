use alloc::format;
use alloc::string::String;

use rglsl_ast::Span;

use super::{Analyzer, Operand};
use crate::builtins::Stage;
use crate::diagnostic::DiagnosticKind;
use crate::types::TextureDimension;

pub const SPARSE_TEXTURE2: &str = "GL_ARB_sparse_texture2";
pub const SPARSE_TEXTURE_CLAMP: &str = "GL_ARB_sparse_texture_clamp";
pub const GATHER_BIAS_LOD: &str = "GL_AMD_texture_gather_bias_lod";
pub const SHADOW_LOD: &str = "GL_EXT_texture_shadow_lod";
pub const NV_DERIVATIVES: &str = "GL_NV_compute_shader_derivatives";
pub const KHR_DERIVATIVES: &str = "GL_KHR_compute_shader_derivatives";

const COMPUTE_DERIVATIVES: [&str; 2] = [NV_DERIVATIVES, KHR_DERIVATIVES];
const KHR_ONLY: [&str; 1] = [KHR_DERIVATIVES];

const DERIVATIVE_FUNCTIONS: [&str; 9] = [
    "dFdx",
    "dFdy",
    "fwidth",
    "dFdxFine",
    "dFdyFine",
    "fwidthFine",
    "dFdxCoarse",
    "dFdyCoarse",
    "fwidthCoarse",
];

pub(crate) fn function_extension(name: &str) -> Option<&'static str> {
    Some(match name {
        "sparseTextureARB"
        | "sparseTextureLodARB"
        | "sparseTextureOffsetARB"
        | "sparseTexelFetchARB"
        | "sparseTexelFetchOffsetARB"
        | "sparseTextureLodOffsetARB"
        | "sparseTextureGradARB"
        | "sparseTextureGradOffsetARB"
        | "sparseTextureGatherARB"
        | "sparseTextureGatherOffsetARB"
        | "sparseTextureGatherOffsetsARB"
        | "sparseImageLoadARB" => SPARSE_TEXTURE2,
        "sparseTextureClampARB"
        | "sparseTextureOffsetClampARB"
        | "sparseTextureGradClampARB"
        | "sparseTextureGradOffsetClampARB"
        | "textureClampARB"
        | "textureOffsetClampARB"
        | "textureGradClampARB"
        | "textureGradOffsetClampARB" => SPARSE_TEXTURE_CLAMP,
        "textureGatherLodAMD"
        | "textureGatherLodOffsetAMD"
        | "textureGatherLodOffsetsAMD"
        | "sparseTextureGatherLodAMD"
        | "sparseTextureGatherLodOffsetAMD"
        | "sparseTextureGatherLodOffsetsAMD" => GATHER_BIAS_LOD,
        _ => return None,
    })
}

fn implicit_lod(name: &str, operands: &[Operand]) -> bool {
    match name {
        "texture" => operands.len() > 2,
        "textureProj"
        | "sparseTextureARB"
        | "textureQueryLod"
        | "textureQueryLOD"
        | "textureOffset"
        | "textureProjOffset"
        | "sparseTextureOffsetARB" => true,
        _ => false,
    }
}

fn biased_gather(name: &str, operands: &[Operand], shadow: bool) -> bool {
    let count = operands.len();
    !shadow
        && match name {
            "textureGather" => count > 3,
            "textureGatherOffset" | "textureGatherOffsets" => count > 4,
            "sparseTextureGatherARB" => count > 4,
            "sparseTextureGatherOffsetARB" | "sparseTextureGatherOffsetsARB" => count > 5,
            _ => false,
        }
}

fn shadow_lod_feature(name: &str, operands: &[Operand]) -> Option<String> {
    let opaque = operands.first()?.ty.as_opaque()?;
    let coordinate = operands.get(1)?;
    let vec4 = coordinate.ty.is_vector()
        && coordinate.ty.length() == Some(4)
        && coordinate.ty.base_scalar() == Some(crate::types::Scalar::Float);
    if !opaque.shadow || !vec4 {
        return None;
    }
    let array = opaque.dimension == TextureDimension::D2 && opaque.arrayed;
    let cube = opaque.dimension == TextureDimension::Cube;
    let count = operands.len();
    match name {
        "texture" | "textureLod" if count > 2 => {
            let lod = name == "textureLod";
            (array || (cube && opaque.arrayed && count > 3) || (cube && lod)).then(|| {
                if lod {
                    format!("{name}(..., float lod)")
                } else {
                    format!("{name}(..., float bias)")
                }
            })
        }
        "textureOffset" | "textureLodOffset" if array && count == 4 => {
            Some(format!("{name} for sampler2DArrayShadow"))
        }
        _ => None,
    }
}

impl Analyzer<'_> {
    pub(crate) fn texture_extensions(&mut self, span: Span, name: &str) {
        if let Some(extension) = function_extension(name) {
            self.require_extension(span, extension, name);
        }
    }

    pub(crate) fn texture_checks(&mut self, span: Span, name: &str, operands: &[Operand]) -> bool {
        let shadow = operands
            .first()
            .and_then(|operand| operand.ty.as_opaque())
            .is_some_and(|opaque| opaque.shadow);
        let mut valid = true;
        if let Some(feature) = shadow_lod_feature(name, operands) {
            valid &= self.require_extension(span, SHADOW_LOD, &feature);
        }
        if biased_gather(name, operands, shadow) {
            let feature = format!("{name}with bias argument");
            valid &= self.require_extension(span, GATHER_BIAS_LOD, &feature);
        }
        if matches!(
            name,
            "sparseTextureGatherLodAMD"
                | "sparseTextureGatherLodOffsetAMD"
                | "sparseTextureGatherLodOffsetsAMD"
        ) {
            valid &= self.require_extension(span, SPARSE_TEXTURE2, name);
        }
        if name == "sparseTextureGatherOffsetsARB" {
            let index = if shadow { 3 } else { 2 };
            if operands
                .get(index)
                .is_some_and(|operand| !operand.constant || operand.specialization)
            {
                self.error(
                    span,
                    DiagnosticKind::InvalidBuiltinCall {
                        name: String::from(name),
                        reason: "the offsets must be constant",
                    },
                );
                valid = false;
            }
        }
        if !matches!(
            self.options.stage,
            Stage::Compute | Stage::Task | Stage::Mesh
        ) {
            return valid;
        }
        let derivative = DERIVATIVE_FUNCTIONS.contains(&name);
        if !derivative && !implicit_lod(name, operands) {
            return valid;
        }
        if derivative {
            let extensions: &'static [&'static str] = if self.options.stage == Stage::Compute {
                &COMPUTE_DERIVATIVES
            } else {
                &KHR_ONLY
            };
            if !self.require_extensions(span, extensions, name) {
                return false;
            }
        }
        if self.extensions.is_on(KHR_DERIVATIVES) && self.derivative_group.is_none() {
            self.error(
                span,
                DiagnosticKind::InvalidBuiltinCall {
                    name: String::from(name),
                    reason: "requires a derivative_group_quads* or derivative_group_linear* layout qualifier",
                },
            );
            valid = false;
        }
        valid
    }
}
