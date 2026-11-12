use std::sync::Arc;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Random {
    seed: u64,
    state: [u64; 4],
    decisions: Option<Decisions>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
struct Decisions {
    bytes: Arc<[u8]>,
    cursor: usize,
    end: usize,
}

impl Decisions {
    const fn remaining(&self) -> usize {
        self.end.saturating_sub(self.cursor)
    }

    fn take(&mut self, count: usize) -> Option<u64> {
        let available = count.min(self.remaining()).min(8);
        if available == 0 {
            return None;
        }
        let start = self.cursor;
        self.cursor += available;
        let bytes = self.bytes.get(start..start + available)?;
        Some(
            bytes
                .iter()
                .rev()
                .fold(0, |value, byte| (value << 8) | u64::from(*byte)),
        )
    }
}

const fn split_mix(state: &mut u64) -> u64 {
    *state = state.wrapping_add(0x9e37_79b9_7f4a_7c15);
    let mut value = *state;
    value = (value ^ (value >> 30)).wrapping_mul(0xbf58_476d_1ce4_e5b9);
    value = (value ^ (value >> 27)).wrapping_mul(0x94d0_49bb_1331_11eb);
    value ^ (value >> 31)
}

const fn seeded_state(seed: u64) -> [u64; 4] {
    let mut mixer = seed;
    [
        split_mix(&mut mixer),
        split_mix(&mut mixer),
        split_mix(&mut mixer),
        split_mix(&mut mixer),
    ]
}

fn fnv1a(bytes: &[u8]) -> u64 {
    bytes.iter().fold(0xcbf2_9ce4_8422_2325, |hash, byte| {
        (hash ^ u64::from(*byte)).wrapping_mul(0x0100_0000_01b3)
    })
}

const fn bytes_for_bound(bound: u64) -> usize {
    let bits = 64 - (bound - 1).leading_zeros();
    bits.div_ceil(8) as usize
}

impl Random {
    pub const fn new(seed: u64) -> Self {
        Self {
            seed,
            state: seeded_state(seed),
            decisions: None,
        }
    }

    pub fn from_decisions(bytes: &[u8]) -> Self {
        let seed = fnv1a(bytes);
        Self {
            seed,
            state: seeded_state(seed),
            decisions: Some(Decisions {
                bytes: Arc::from(bytes),
                cursor: 0,
                end: bytes.len(),
            }),
        }
    }

    pub const fn seed(&self) -> u64 {
        self.seed
    }

    pub fn decisions_left(&self) -> usize {
        self.decisions.as_ref().map_or(0, Decisions::remaining)
    }

    fn take(&mut self, count: usize) -> Option<u64> {
        self.decisions.as_mut()?.take(count)
    }

    const fn next_state(&mut self) -> u64 {
        let result = self.state[1].wrapping_mul(5).rotate_left(7).wrapping_mul(9);
        let shifted = self.state[1] << 17;
        self.state[2] ^= self.state[0];
        self.state[3] ^= self.state[1];
        self.state[1] ^= self.state[2];
        self.state[0] ^= self.state[3];
        self.state[2] ^= shifted;
        self.state[3] = self.state[3].rotate_left(45);
        result
    }

    pub fn next_u64(&mut self) -> u64 {
        match self.take(8) {
            Some(value) => value,
            None => self.next_state(),
        }
    }

    pub fn next_below(&mut self, bound: u64) -> u64 {
        if bound <= 1 {
            return 0;
        }
        if let Some(value) = self.take(bytes_for_bound(bound)) {
            return value % bound;
        }
        let threshold = bound.wrapping_neg() % bound;
        loop {
            let product = u128::from(self.next_state()) * u128::from(bound);
            let low = u64::try_from(product & u128::from(u64::MAX)).unwrap_or(0);
            if low >= threshold {
                return u64::try_from(product >> 64).unwrap_or(0);
            }
        }
    }

    pub fn next_int(&mut self, bound: u32) -> u32 {
        u32::try_from(self.next_below(u64::from(bound))).unwrap_or(0)
    }

    pub fn next_index(&mut self, length: usize) -> usize {
        let bound = u64::try_from(length).unwrap_or(u64::MAX);
        usize::try_from(self.next_below(bound)).unwrap_or(0)
    }

    pub fn next_positive_int(&mut self, bound: u32) -> u32 {
        self.next_int(bound.saturating_sub(1)) + 1
    }

    pub fn next_bool(&mut self) -> bool {
        match self.take(1) {
            Some(value) => value & 1 == 1,
            None => self.next_state() >> 63 == 1,
        }
    }

    pub fn next_float(&mut self) -> f32 {
        let bits = match self.take(3) {
            Some(value) => value & 0xff_ffff,
            None => self.next_state() >> 40,
        };
        let high = u16::try_from(bits >> 8).unwrap_or(0);
        let low = u8::try_from(bits & 0xff).unwrap_or(0);
        f32::from(high) / 65_536.0 + f32::from(low) / 16_777_216.0
    }

    pub fn spawn_child(&mut self) -> Self {
        let share = self.take(1);
        let seed = self.next_state();
        let Some(share) = share else {
            return Self::new(seed);
        };
        let mut child = Self::new(seed);
        if let Some(decisions) = self.decisions.as_mut() {
            let remaining = u64::try_from(decisions.remaining()).unwrap_or(u64::MAX);
            let length = usize::try_from(remaining.saturating_mul(share + 1) / 256).unwrap_or(0);
            let start = decisions.cursor;
            decisions.cursor = start.saturating_add(length).min(decisions.end);
            child.decisions = Some(Decisions {
                bytes: Arc::clone(&decisions.bytes),
                cursor: start,
                end: decisions.cursor,
            });
        }
        child
    }

    pub fn description(&self) -> String {
        match &self.decisions {
            Some(decisions) => format!(
                "{} bytes of decisions, then xoshiro256** seeded by splitmix64 with seed {}",
                decisions.remaining(),
                self.seed
            ),
            None => format!("xoshiro256** seeded by splitmix64 with seed {}", self.seed),
        }
    }
}
