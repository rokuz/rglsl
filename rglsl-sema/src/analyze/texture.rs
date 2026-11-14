use alloc::format;
use alloc::string::String;

use rglsl_ast::Span;
use rglsl_types::extension::Extension;

use super::{Analyzer, Operand};
use crate::builtins::kind::{
    BuiltinKind, GatherOffsets, GatherPattern, Sample, Texture, TextureGather, TextureLevel,
};
use crate::diagnostic::DiagnosticKind;
use crate::types::{OpaqueKind, TextureDimension};
use rglsl_types::ShaderStage;

const COMPUTE_DERIVATIVES: [Extension; 2] = [
    Extension::NvComputeShaderDerivatives,
    Extension::KhrComputeShaderDerivatives,
];
const KHR_ONLY: [Extension; 1] = [Extension::KhrComputeShaderDerivatives];

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

const fn implicit_lod(kind: Texture, operands: &[Operand]) -> bool {
    match kind {
        Texture::Sample(Sample {
            level: TextureLevel::Implicit,
            clamp: false,
            proj,
            offset,
            sparse,
        }) => proj || offset || sparse || operands.len() > 2,
        Texture::QueryLod => true,
        Texture::Sample(_)
        | Texture::Footprint { .. }
        | Texture::Gather(_)
        | Texture::Fetch { .. }
        | Texture::ImageLoad { .. }
        | Texture::ImageStore { .. }
        | Texture::ImageAtomic(_)
        | Texture::Query(_)
        | Texture::SparseTexelsResident
        | Texture::ImageProcessing(_)
        | Texture::SubpassLoad
        | Texture::FragmentFetch { .. } => false,
    }
}

fn biased_gather(gather: TextureGather, operands: &[Operand], shadow: bool) -> bool {
    let quad = match gather.pattern {
        GatherPattern::Quad => true,
        GatherPattern::Linear4x1
        | GatherPattern::Vertical2
        | GatherPattern::Horizontal2
        | GatherPattern::Diagonal => false,
    };
    let fixed = 3 + usize::from(gather.offsets != GatherOffsets::None) + usize::from(gather.sparse);
    !shadow && quad && !gather.lod && operands.len() > fixed
}

fn samplerless(kind: Texture, operands: &[Operand]) -> bool {
    let Some(opaque) = operands.first().and_then(|operand| operand.ty.as_opaque()) else {
        return false;
    };
    if opaque.kind != OpaqueKind::Texture {
        return false;
    }
    match kind {
        Texture::Query(_) => true,
        Texture::Fetch { sparse: false, .. } => !opaque.is_buffer(),
        Texture::Fetch { sparse: true, .. }
        | Texture::Footprint { .. }
        | Texture::Sample(_)
        | Texture::Gather(_)
        | Texture::ImageLoad { .. }
        | Texture::ImageStore { .. }
        | Texture::ImageAtomic(_)
        | Texture::QueryLod
        | Texture::SparseTexelsResident
        | Texture::ImageProcessing(_)
        | Texture::SubpassLoad
        | Texture::FragmentFetch { .. } => false,
    }
}

fn shadow_lod_feature(sample: Sample, name: &str, operands: &[Operand]) -> Option<String> {
    let lod = match sample.level {
        TextureLevel::Implicit => false,
        TextureLevel::Lod => true,
        TextureLevel::Gradient => return None,
    };
    if sample.proj || sample.clamp || sample.sparse {
        return None;
    }
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
    if sample.offset {
        return (array && count == 4).then(|| format!("{name} for sampler2DArrayShadow"));
    }
    (count > 2 && (array || (cube && opaque.arrayed && count > 3) || (cube && lod))).then(|| {
        if lod {
            format!("{name}(..., float lod)")
        } else {
            format!("{name}(..., float bias)")
        }
    })
}

impl Analyzer<'_> {
    pub(crate) fn texture_checks(
        &mut self,
        span: Span,
        kind: BuiltinKind,
        name: &str,
        operands: &[Operand],
    ) -> bool {
        let mut valid = true;
        let mut implicit = false;
        if let BuiltinKind::Texture(texture) = kind {
            valid = self.texture_function_checks(span, texture, name, operands);
            implicit = implicit_lod(texture, operands);
        }
        let derivative = DERIVATIVE_FUNCTIONS.contains(&name);
        if !derivative && !implicit {
            return valid;
        }
        let gated = |stage: ShaderStage| {
            matches!(
                stage,
                ShaderStage::Compute | ShaderStage::Task | ShaderStage::Mesh
            )
        };
        if derivative
            && !self.require_stage_extensions(span, name, |stage| {
                gated(stage).then_some(if stage == ShaderStage::Compute {
                    &COMPUTE_DERIVATIVES[..]
                } else {
                    &KHR_ONLY[..]
                })
            })
        {
            return false;
        }
        if self.extensions.is_on(Extension::KhrComputeShaderDerivatives)
            && self.derivative_group.is_none()
            && self.stage_check(span, |stage| {
                gated(stage).then(|| DiagnosticKind::InvalidBuiltinCall {
                    name: String::from(name),
                    reason: "requires a derivative_group_quads* or derivative_group_linear* layout qualifier",
                })
            })
        {
            valid = false;
        }
        valid
    }

    fn texture_function_checks(
        &mut self,
        span: Span,
        kind: Texture,
        name: &str,
        operands: &[Operand],
    ) -> bool {
        let shadow = operands
            .first()
            .and_then(|operand| operand.ty.as_opaque())
            .is_some_and(|opaque| opaque.shadow);
        let mut valid = true;
        if samplerless(kind, operands) {
            valid &= self.require_extension(span, Extension::ExtSamplerlessTextureFunctions, name);
        }
        if let Texture::Sample(sample) = kind
            && let Some(feature) = shadow_lod_feature(sample, name, operands)
        {
            valid &= self.require_extension(span, Extension::ExtTextureShadowLod, &feature);
        }
        let Texture::Gather(gather) = kind else {
            return valid;
        };
        if biased_gather(gather, operands, shadow) {
            let feature = format!("{name}with bias argument");
            valid &= self.require_extension(span, Extension::AmdTextureGatherBiasLod, &feature);
        }
        if gather.lod && gather.sparse {
            valid &= self.require_extension(span, Extension::ArbSparseTexture2, name);
        }
        let index = if shadow { 3 } else { 2 };
        if !gather.lod
            && gather.sparse
            && gather.offsets == GatherOffsets::Four
            && operands
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
        valid
    }
}
