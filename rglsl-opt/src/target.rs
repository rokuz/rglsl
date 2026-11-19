use crate::OptError;

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, Hash)]
pub enum TargetGpu {
    Nvidia,
    Amd,
    #[default]
    UniversalDesktop,
    UniversalMobile,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum GpuClass {
    Desktop,
    Mobile,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub enum Inlining {
    #[default]
    Exhaustive,
    NoGrowth,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub enum Reuse {
    #[default]
    Nested,
    Block,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct Unrolling {
    pub indexed: u32,
    pub hinted: u32,
    pub other: u32,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct GpuParameters {
    pub inlining: Inlining,
    pub scalar_replacement: u32,
    pub reuse: Reuse,
    pub unroll: Unrolling,
    pub unroll_for_size: Unrolling,
}

const DESKTOP: GpuParameters = GpuParameters {
    inlining: Inlining::Exhaustive,
    scalar_replacement: 1024,
    reuse: Reuse::Nested,
    unroll: Unrolling {
        indexed: 1024,
        hinted: 16384,
        other: 0,
    },
    unroll_for_size: Unrolling {
        indexed: 256,
        hinted: 16384,
        other: 0,
    },
};

const MOBILE: GpuParameters = GpuParameters {
    inlining: Inlining::NoGrowth,
    scalar_replacement: 64,
    reuse: Reuse::Block,
    unroll: Unrolling {
        indexed: 256,
        hinted: 4096,
        other: 0,
    },
    unroll_for_size: Unrolling {
        indexed: 64,
        hinted: 4096,
        other: 0,
    },
};

#[derive(Debug)]
pub struct GpuProfile {
    pub gpu: TargetGpu,
    pub name: &'static str,
    pub class: GpuClass,
    pub parameters: GpuParameters,
}

pub static PROFILES: &[GpuProfile] = &[
    GpuProfile {
        gpu: TargetGpu::Nvidia,
        name: "nvidia",
        class: GpuClass::Desktop,
        parameters: DESKTOP,
    },
    GpuProfile {
        gpu: TargetGpu::Amd,
        name: "amd",
        class: GpuClass::Desktop,
        parameters: DESKTOP,
    },
    GpuProfile {
        gpu: TargetGpu::UniversalDesktop,
        name: "universal-desktop",
        class: GpuClass::Desktop,
        parameters: DESKTOP,
    },
    GpuProfile {
        gpu: TargetGpu::UniversalMobile,
        name: "universal-mobile",
        class: GpuClass::Mobile,
        parameters: MOBILE,
    },
];

impl TargetGpu {
    pub const ALL: [Self; 4] = [
        Self::Nvidia,
        Self::Amd,
        Self::UniversalDesktop,
        Self::UniversalMobile,
    ];

    pub fn profile(self) -> Result<&'static GpuProfile, OptError> {
        PROFILES
            .iter()
            .find(|profile| profile.gpu == self)
            .ok_or(OptError::MissingProfile(self))
    }

    pub fn from_name(name: &str) -> Option<Self> {
        PROFILES
            .iter()
            .find(|profile| profile.name == name)
            .map(|profile| profile.gpu)
    }

    pub fn names() -> impl Iterator<Item = &'static str> {
        PROFILES.iter().map(|profile| profile.name)
    }
}
