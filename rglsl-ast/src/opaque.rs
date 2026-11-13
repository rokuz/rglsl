use core::fmt;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum SampledPrefix {
    Float,
    Int,
    Uint,
}

impl SampledPrefix {
    const ALL: [Self; 3] = [Self::Float, Self::Int, Self::Uint];

    pub const fn spelling(self) -> &'static str {
        match self {
            Self::Float => "",
            Self::Int => "i",
            Self::Uint => "u",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum SampledFamily {
    Sampler,
    Texture,
    Image,
}

impl SampledFamily {
    const ALL: [Self; 3] = [Self::Sampler, Self::Texture, Self::Image];

    pub const fn spelling(self) -> &'static str {
        match self {
            Self::Sampler => "sampler",
            Self::Texture => "texture",
            Self::Image => "image",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum SampledShape {
    D1,
    D2,
    D3,
    Cube,
    D1Array,
    D2Array,
    CubeArray,
    Buffer,
    D2Ms,
    D2MsArray,
}

impl SampledShape {
    const ALL: [Self; 10] = [
        Self::D1,
        Self::D2,
        Self::D3,
        Self::Cube,
        Self::D1Array,
        Self::D2Array,
        Self::CubeArray,
        Self::Buffer,
        Self::D2Ms,
        Self::D2MsArray,
    ];

    pub const fn spelling(self) -> &'static str {
        match self {
            Self::D1 => "1D",
            Self::D2 => "2D",
            Self::D3 => "3D",
            Self::Cube => "Cube",
            Self::D1Array => "1DArray",
            Self::D2Array => "2DArray",
            Self::CubeArray => "CubeArray",
            Self::Buffer => "Buffer",
            Self::D2Ms => "2DMS",
            Self::D2MsArray => "2DMSArray",
        }
    }

    fn parse(text: &str) -> Option<Self> {
        Self::ALL.into_iter().find(|shape| shape.spelling() == text)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum ShadowShape {
    D1,
    D2,
    Cube,
    D1Array,
    D2Array,
    CubeArray,
}

impl ShadowShape {
    const ALL: [Self; 6] = [
        Self::D1,
        Self::D2,
        Self::Cube,
        Self::D1Array,
        Self::D2Array,
        Self::CubeArray,
    ];

    pub const fn shape(self) -> SampledShape {
        match self {
            Self::D1 => SampledShape::D1,
            Self::D2 => SampledShape::D2,
            Self::Cube => SampledShape::Cube,
            Self::D1Array => SampledShape::D1Array,
            Self::D2Array => SampledShape::D2Array,
            Self::CubeArray => SampledShape::CubeArray,
        }
    }

    fn parse(text: &str) -> Option<Self> {
        let shape = text.strip_suffix("Shadow")?;
        Self::ALL
            .into_iter()
            .find(|candidate| candidate.shape().spelling() == shape)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum WidePrefix {
    Int64,
    Uint64,
}

impl WidePrefix {
    pub const fn spelling(self) -> &'static str {
        match self {
            Self::Int64 => "i64",
            Self::Uint64 => "u64",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum OpaqueKeyword {
    AtomicUint,
    Sampler,
    SamplerShadow,
    AccelerationStructureNv,
    AccelerationStructureExt,
    RayQueryExt,
    HitObjectNv,
    HitObjectExt,
    Attachment(SampledPrefix),
    Shadow(ShadowShape),
    Sampled {
        prefix: SampledPrefix,
        family: SampledFamily,
        shape: SampledShape,
    },
    SubpassInput {
        prefix: SampledPrefix,
        multisample: bool,
    },
    WideImage {
        prefix: WidePrefix,
        shape: SampledShape,
    },
}

impl OpaqueKeyword {
    pub fn parse(word: &str) -> Option<Self> {
        let fixed = match word {
            "atomic_uint" => Some(Self::AtomicUint),
            "sampler" => Some(Self::Sampler),
            "samplerShadow" => Some(Self::SamplerShadow),
            "accelerationStructureNV" => Some(Self::AccelerationStructureNv),
            "accelerationStructureEXT" => Some(Self::AccelerationStructureExt),
            "rayQueryEXT" => Some(Self::RayQueryExt),
            "hitObjectNV" => Some(Self::HitObjectNv),
            "hitObjectEXT" => Some(Self::HitObjectExt),
            "attachmentEXT" => Some(Self::Attachment(SampledPrefix::Float)),
            "iattachmentEXT" => Some(Self::Attachment(SampledPrefix::Int)),
            "uattachmentEXT" => Some(Self::Attachment(SampledPrefix::Uint)),
            _ => None,
        };
        if fixed.is_some() {
            return fixed;
        }
        if let Some(shadow) = word.strip_prefix("sampler").and_then(ShadowShape::parse) {
            return Some(Self::Shadow(shadow));
        }
        for prefix in SampledPrefix::ALL {
            let Some(rest) = word.strip_prefix(prefix.spelling()) else {
                continue;
            };
            match rest {
                "subpassInput" => {
                    return Some(Self::SubpassInput {
                        prefix,
                        multisample: false,
                    })
                }
                "subpassInputMS" => {
                    return Some(Self::SubpassInput {
                        prefix,
                        multisample: true,
                    })
                }
                _ => {}
            }
            for family in SampledFamily::ALL {
                if let Some(shape) = rest
                    .strip_prefix(family.spelling())
                    .and_then(SampledShape::parse)
                {
                    return Some(Self::Sampled {
                        prefix,
                        family,
                        shape,
                    });
                }
            }
        }
        for prefix in [WidePrefix::Int64, WidePrefix::Uint64] {
            if let Some(shape) = word
                .strip_prefix(prefix.spelling())
                .and_then(|rest| rest.strip_prefix("image"))
                .and_then(SampledShape::parse)
            {
                return Some(Self::WideImage { prefix, shape });
            }
        }
        None
    }
}

impl fmt::Display for OpaqueKeyword {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match *self {
            Self::AtomicUint => formatter.write_str("atomic_uint"),
            Self::Sampler => formatter.write_str("sampler"),
            Self::SamplerShadow => formatter.write_str("samplerShadow"),
            Self::AccelerationStructureNv => formatter.write_str("accelerationStructureNV"),
            Self::AccelerationStructureExt => formatter.write_str("accelerationStructureEXT"),
            Self::RayQueryExt => formatter.write_str("rayQueryEXT"),
            Self::HitObjectNv => formatter.write_str("hitObjectNV"),
            Self::HitObjectExt => formatter.write_str("hitObjectEXT"),
            Self::Attachment(prefix) => write!(formatter, "{}attachmentEXT", prefix.spelling()),
            Self::Shadow(shape) => write!(formatter, "sampler{}Shadow", shape.shape().spelling()),
            Self::Sampled {
                prefix,
                family,
                shape,
            } => write!(
                formatter,
                "{}{}{}",
                prefix.spelling(),
                family.spelling(),
                shape.spelling()
            ),
            Self::SubpassInput {
                prefix,
                multisample,
            } => write!(
                formatter,
                "{}subpassInput{}",
                prefix.spelling(),
                if multisample { "MS" } else { "" }
            ),
            Self::WideImage { prefix, shape } => {
                write!(formatter, "{}image{}", prefix.spelling(), shape.spelling())
            }
        }
    }
}
