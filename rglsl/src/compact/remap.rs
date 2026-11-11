use crate::arena::{BadHandle, Handle, HandleSet};

use super::handle_set_map::HandleMap;
use super::{FunctionMap, ModuleMap};

type Index = crate::non_max_u32::NonMaxU32;

#[derive(Debug)]
pub struct Remap {
    map: ModuleMap,
}

impl Default for Remap {
    fn default() -> Self {
        Self::new()
    }
}

fn record<T>(map: &mut HandleMap<T>, old: Handle<T>, new: Handle<T>) {
    if let Some(index) = u32::try_from(new.index()).ok().and_then(Index::new) {
        map.insert(old, index);
    }
}

impl Remap {
    pub fn new() -> Self {
        Self {
            map: ModuleMap {
                functions: HandleMap::with_capacity(0),
                types: HandleMap::with_capacity(0),
                globals: HandleMap::with_capacity(0),
                constants: HandleMap::with_capacity(0),
                overrides: HandleMap::with_capacity(0),
                global_expressions: HandleMap::with_capacity(0),
            },
        }
    }

    pub fn map_type(&mut self, old: Handle<crate::Type>, new: Handle<crate::Type>) {
        record(&mut self.map.types, old, new);
    }

    pub fn map_constant(&mut self, old: Handle<crate::Constant>, new: Handle<crate::Constant>) {
        record(&mut self.map.constants, old, new);
    }

    pub fn map_override(&mut self, old: Handle<crate::Override>, new: Handle<crate::Override>) {
        record(&mut self.map.overrides, old, new);
    }

    pub fn map_global_expression(
        &mut self,
        old: Handle<crate::Expression>,
        new: Handle<crate::Expression>,
    ) {
        record(&mut self.map.global_expressions, old, new);
    }

    pub fn map_global(
        &mut self,
        old: Handle<crate::GlobalVariable>,
        new: Handle<crate::GlobalVariable>,
    ) {
        record(&mut self.map.globals, old, new);
    }

    pub fn map_function(&mut self, old: Handle<crate::Function>, new: Handle<crate::Function>) {
        record(&mut self.map.functions, old, new);
    }

    pub fn ty(&self, old: Handle<crate::Type>) -> Result<Handle<crate::Type>, BadHandle> {
        self.map
            .types
            .try_adjust(old)
            .ok_or_else(|| BadHandle::new(old))
    }

    pub fn constant(
        &self,
        old: Handle<crate::Constant>,
    ) -> Result<Handle<crate::Constant>, BadHandle> {
        self.map
            .constants
            .try_adjust(old)
            .ok_or_else(|| BadHandle::new(old))
    }

    pub fn r#override(
        &self,
        old: Handle<crate::Override>,
    ) -> Result<Handle<crate::Override>, BadHandle> {
        self.map
            .overrides
            .try_adjust(old)
            .ok_or_else(|| BadHandle::new(old))
    }

    pub fn global_expression(
        &self,
        old: Handle<crate::Expression>,
    ) -> Result<Handle<crate::Expression>, BadHandle> {
        self.map
            .global_expressions
            .try_adjust(old)
            .ok_or_else(|| BadHandle::new(old))
    }

    pub fn global(
        &self,
        old: Handle<crate::GlobalVariable>,
    ) -> Result<Handle<crate::GlobalVariable>, BadHandle> {
        self.map
            .globals
            .try_adjust(old)
            .ok_or_else(|| BadHandle::new(old))
    }

    pub fn function(
        &self,
        old: Handle<crate::Function>,
    ) -> Result<Handle<crate::Function>, BadHandle> {
        self.map
            .functions
            .try_adjust(old)
            .ok_or_else(|| BadHandle::new(old))
    }

    pub fn adjust_type(&self, ty: &mut crate::Type) -> Result<(), BadHandle> {
        self.map.adjust_type(ty)
    }

    pub fn adjust_global_expression(&self, expr: &mut crate::Expression) -> Result<(), BadHandle> {
        self.map
            .adjust_expression(expr, &self.map.global_expressions)
    }

    pub fn adjust_function(&self, function: &mut crate::Function) -> Result<(), BadHandle> {
        let mut all = HandleSet::for_arena(&function.expressions);
        all.add_all();
        let map = FunctionMap {
            expressions: HandleMap::from_set(all),
        };
        let mut reuse = crate::NamedExpressions::default();
        map.compact(function, &self.map, &mut reuse)
    }
}
