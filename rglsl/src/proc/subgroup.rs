use crate::QuadControl;

impl crate::LoopControl {
    pub fn is_default(&self) -> bool {
        *self == Self::default()
    }
}

impl crate::SelectionControl {
    pub const fn is_none(&self) -> bool {
        matches!(*self, Self::None)
    }
}

impl crate::TileShading {
    pub const fn is_default(&self) -> bool {
        self.rate.is_none() && !self.non_coherent_attachment_read
    }
}

impl crate::FragmentModes {
    pub fn is_default(&self) -> bool {
        *self == Self::default()
    }
}

impl QuadControl {
    pub const fn is_default(&self) -> bool {
        !self.quad_derivatives && !self.require_full_quads
    }
}
