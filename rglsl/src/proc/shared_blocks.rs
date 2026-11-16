use alloc::vec::Vec;

use crate::{AddressSpace, Arena, BlockDeclaration, GlobalVariable, Handle, MemoryDecorations};

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum SharedBlockConflict {
    Mixed,
    RestrictAliased,
}

#[derive(Clone, Debug, Default)]
pub struct SharedBlocks {
    count: usize,
    plain: Option<Handle<GlobalVariable>>,
    restricted: Vec<Handle<GlobalVariable>>,
    executable: bool,
}

impl GlobalVariable {
    pub fn is_shared_block(&self) -> bool {
        self.space == AddressSpace::WorkGroup && self.block == Some(BlockDeclaration::Shared)
    }
}

impl SharedBlocks {
    pub fn of(globals: &Arena<GlobalVariable>, executable: bool) -> Self {
        let mut blocks = Self {
            executable,
            ..Self::default()
        };
        for (handle, global) in globals.iter() {
            if global.is_shared_block() {
                blocks.count += 1;
                if global
                    .memory_decorations
                    .contains(MemoryDecorations::RESTRICT)
                {
                    blocks.restricted.push(handle);
                }
            } else if global.space == AddressSpace::WorkGroup && global.block.is_none() {
                blocks.plain.get_or_insert(handle);
            }
        }
        blocks
    }

    pub const fn explicit_layout(&self) -> bool {
        self.count > 0 && self.plain.is_none()
    }

    pub const fn aliased(&self) -> bool {
        self.executable && self.count > 1
    }

    pub fn conflicts(&self) -> impl Iterator<Item = (Handle<GlobalVariable>, SharedBlockConflict)> {
        let mixed = self
            .plain
            .filter(|_| self.count > 0)
            .map(|plain| (plain, SharedBlockConflict::Mixed));
        let restricted = self
            .restricted
            .iter()
            .filter(|_| self.aliased())
            .map(|&handle| (handle, SharedBlockConflict::RestrictAliased));
        mixed.into_iter().chain(restricted)
    }
}
