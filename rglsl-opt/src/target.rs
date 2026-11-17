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
pub struct GpuParameters {}

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
        parameters: GpuParameters {},
    },
    GpuProfile {
        gpu: TargetGpu::Amd,
        name: "amd",
        class: GpuClass::Desktop,
        parameters: GpuParameters {},
    },
    GpuProfile {
        gpu: TargetGpu::UniversalDesktop,
        name: "universal-desktop",
        class: GpuClass::Desktop,
        parameters: GpuParameters {},
    },
    GpuProfile {
        gpu: TargetGpu::UniversalMobile,
        name: "universal-mobile",
        class: GpuClass::Mobile,
        parameters: GpuParameters {},
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
