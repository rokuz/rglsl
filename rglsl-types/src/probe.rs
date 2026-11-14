use core::cell::Cell;

use crate::{ShaderStage, ShaderStageMask};

#[derive(Debug, Clone)]
pub struct StageProbe {
    own: ShaderStage,
    compatible: Cell<ShaderStageMask>,
}

impl StageProbe {
    pub const fn new(own: ShaderStage) -> Self {
        Self {
            own,
            compatible: Cell::new(ShaderStageMask::all()),
        }
    }

    fn restrict(&self, mask: ShaderStageMask) {
        self.compatible.set(self.compatible.get() & mask);
    }

    pub fn map<T: PartialEq>(&self, answer: impl Fn(ShaderStage) -> T) -> T {
        let own = answer(self.own);
        let mut mask = ShaderStageMask::empty();
        for stage in ShaderStage::ALL {
            if answer(stage) == own {
                mask |= ShaderStageMask::of(stage);
            }
        }
        self.restrict(mask);
        own
    }

    pub fn is(&self, stage: ShaderStage) -> bool {
        self.map(|candidate| candidate == stage)
    }

    pub fn any(&self, stages: ShaderStageMask) -> bool {
        self.map(|candidate| stages.has(candidate))
    }

    pub fn exact(&self) -> ShaderStage {
        self.map(|candidate| candidate == self.own);
        self.own
    }

    pub const fn own(&self) -> ShaderStage {
        self.own
    }

    pub fn compatible(&self) -> ShaderStageMask {
        self.compatible.get()
    }

    pub fn narrow(&self, mask: ShaderStageMask) {
        self.restrict(mask);
    }
}
