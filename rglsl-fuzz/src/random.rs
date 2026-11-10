#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Random {
    seed: u64,
    state: [u64; 4],
}

const fn split_mix(state: &mut u64) -> u64 {
    *state = state.wrapping_add(0x9e37_79b9_7f4a_7c15);
    let mut value = *state;
    value = (value ^ (value >> 30)).wrapping_mul(0xbf58_476d_1ce4_e5b9);
    value = (value ^ (value >> 27)).wrapping_mul(0x94d0_49bb_1331_11eb);
    value ^ (value >> 31)
}

impl Random {
    pub const fn new(seed: u64) -> Self {
        let mut mixer = seed;
        let state = [
            split_mix(&mut mixer),
            split_mix(&mut mixer),
            split_mix(&mut mixer),
            split_mix(&mut mixer),
        ];
        Self { seed, state }
    }

    pub const fn seed(&self) -> u64 {
        self.seed
    }

    pub const fn next_u64(&mut self) -> u64 {
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

    pub fn next_below(&mut self, bound: u64) -> u64 {
        if bound <= 1 {
            return 0;
        }
        let threshold = bound.wrapping_neg() % bound;
        loop {
            let product = u128::from(self.next_u64()) * u128::from(bound);
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

    pub const fn next_bool(&mut self) -> bool {
        self.next_u64() >> 63 == 1
    }

    pub fn next_float(&mut self) -> f32 {
        let bits = self.next_u64() >> 40;
        let high = u16::try_from(bits >> 8).unwrap_or(0);
        let low = u8::try_from(bits & 0xff).unwrap_or(0);
        f32::from(high) / 65_536.0 + f32::from(low) / 16_777_216.0
    }

    pub const fn spawn_child(&mut self) -> Self {
        Self::new(self.next_u64())
    }

    pub fn description(&self) -> String {
        format!("xoshiro256** seeded by splitmix64 with seed {}", self.seed)
    }
}
