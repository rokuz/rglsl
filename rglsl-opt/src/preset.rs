use crate::{OptError, OptLevel};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Step {
    Run(&'static str),
    Repeat {
        limit: u8,
        passes: &'static [&'static str],
    },
}

#[derive(Debug)]
pub struct Preset {
    pub level: OptLevel,
    pub flag: &'static str,
    pub steps: &'static [Step],
}

const OPTIMIZE: &[Step] = &[Step::Run("inline"), Step::Run("dce")];

pub static PRESETS: &[Preset] = &[
    Preset {
        level: OptLevel::Disabled,
        flag: "-Od",
        steps: &[],
    },
    Preset {
        level: OptLevel::Performance,
        flag: "-O",
        steps: OPTIMIZE,
    },
    Preset {
        level: OptLevel::Size,
        flag: "-Os",
        steps: OPTIMIZE,
    },
];

impl OptLevel {
    pub fn preset(self) -> Result<&'static Preset, OptError> {
        PRESETS
            .iter()
            .find(|preset| preset.level == self)
            .ok_or(OptError::MissingPreset(self))
    }
}
