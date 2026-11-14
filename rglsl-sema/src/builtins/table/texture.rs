use rglsl_types::extension::Extension::*;

use super::BuiltinFunction;
use crate::builtins::footprint;
use crate::builtins::kind::BuiltinKind::Texture;
use crate::builtins::kind::FootprintLevel::{Gradient, Implicit, Lod};
use crate::builtins::kind::Texture::Footprint;

pub(super) const FUNCTIONS: &[BuiltinFunction] = builtins! {
    "textureFootprintNV": Texture(Footprint { level: Implicit, clamp: false }) => [] {
        requires: &[NvShaderTextureFootprint],
        generate: Some(footprint::implicit),
    }
    "textureFootprintClampNV": Texture(Footprint { level: Implicit, clamp: true }) => [] {
        requires: &[NvShaderTextureFootprint],
        generate: Some(footprint::clamp),
    }
    "textureFootprintLodNV": Texture(Footprint { level: Lod, clamp: false }) => [] {
        requires: &[NvShaderTextureFootprint],
        generate: Some(footprint::lod),
    }
    "textureFootprintGradNV": Texture(Footprint { level: Gradient, clamp: false }) => [] {
        requires: &[NvShaderTextureFootprint],
        generate: Some(footprint::gradient),
    }
    "textureFootprintGradClampNV": Texture(Footprint { level: Gradient, clamp: true }) => [] {
        requires: &[NvShaderTextureFootprint],
        generate: Some(footprint::gradient_clamp),
    }
};
