use core::cell::Cell;

pub const ALL_STAGES: u16 = (1 << 14) - 1;

#[derive(Debug, Clone)]
pub struct StageProbe<S: 'static> {
    own: S,
    all: &'static [S],
    compatible: Cell<u16>,
}

impl<S: Copy + PartialEq + 'static> StageProbe<S> {
    pub fn new(own: S, all: &'static [S]) -> Self {
        Self {
            own,
            all,
            compatible: Cell::new(ALL_STAGES),
        }
    }

    fn restrict(&self, mask: u16) {
        self.compatible.set(self.compatible.get() & mask);
    }

    pub fn map<T: PartialEq>(&self, answer: impl Fn(S) -> T) -> T {
        let own = answer(self.own);
        let mut mask = 0_u16;
        for (index, &stage) in self.all.iter().enumerate().take(14) {
            if answer(stage) == own {
                mask |= 1 << index;
            }
        }
        self.restrict(mask);
        own
    }

    pub fn is(&self, stage: S) -> bool {
        self.map(|candidate| candidate == stage)
    }

    pub fn any(&self, stages: &[S]) -> bool {
        self.map(|candidate| stages.contains(&candidate))
    }

    pub fn exact(&self) -> S {
        self.map(|candidate| candidate == self.own);
        self.own
    }

    pub const fn own(&self) -> S {
        self.own
    }

    pub fn compatible(&self) -> u16 {
        self.compatible.get()
    }

    pub fn narrow(&self, mask: u16) {
        self.restrict(mask);
    }
}
