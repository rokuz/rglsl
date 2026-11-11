use alloc::{
    collections::BTreeSet,
    format,
    string::{String, ToString},
    vec::Vec,
};

use rglsl_sema::scope::Direction;
use rglsl_sema::types::{ArraySize as GlslArraySize, Type as GlslType, TypeKind};
use rglsl_sema::FunctionId;

use super::{GlobalRef, Lowerer, Result};
use crate::object::{
    FunctionSymbol, GlobalSymbol, ObjectModule, ParameterQualifier, PathStep, StageLayout,
    SymbolKind,
};
use crate::{Function, GlobalVariable, Handle, Linkage, Span, Type, TypeInner};

impl Lowerer<'_> {
    pub(super) fn undefined_functions(&self) -> Vec<FunctionId> {
        let mut seen = BTreeSet::new();
        self.analysis
            .function_declarations
            .values()
            .copied()
            .filter(|&id| seen.insert(id))
            .filter(|&id| {
                self.analysis
                    .function(id)
                    .is_some_and(|function| !function.defined && function.name != "main")
            })
            .collect()
    }

    pub(super) fn declare_imports(&mut self) -> Result<()> {
        for id in self.undefined_functions() {
            let at = self
                .analysis
                .function(id)
                .map_or(Span::UNDEFINED, |function| self.at(function.span));
            let (arguments, result, _) = self.signature(id, at)?;
            let handle = self.module.functions.append(
                Function {
                    name: Some(self.function_name(id)),
                    arguments,
                    result,
                    linkage: Linkage::Import,
                    ..Function::default()
                },
                at,
            );
            self.functions.insert(id, handle);
        }
        Ok(())
    }

    fn function_symbols(&self) -> Vec<FunctionSymbol> {
        let types = &self.analysis.types;
        self.functions
            .iter()
            .filter_map(|(&id, &handle)| {
                let function = self.analysis.function(id)?;
                let parameters: Vec<String> = function
                    .parameters
                    .iter()
                    .map(|parameter| parameter.ty.display(types).to_string())
                    .collect();
                Some(FunctionSymbol {
                    function: handle,
                    name: function.name.clone(),
                    signature: format!("{}({})", function.name, parameters.join(",")),
                    result: function.return_type.display(types).to_string(),
                    qualifiers: function
                        .parameters
                        .iter()
                        .map(|parameter| match parameter.direction {
                            Direction::In if parameter.qualifiers.constant => {
                                ParameterQualifier::ConstIn
                            }
                            Direction::In => ParameterQualifier::In,
                            Direction::Out => ParameterQualifier::Out,
                            Direction::Inout => ParameterQualifier::Inout,
                        })
                        .collect(),
                })
            })
            .collect()
    }

    fn global_symbols(&self) -> Vec<GlobalSymbol> {
        let mut symbols: Vec<GlobalSymbol> = Vec::new();
        let mut covered: BTreeSet<Handle<GlobalVariable>> = BTreeSet::new();
        for (&symbol, &global) in &self.globals {
            let GlobalRef::Variable(handle) = global else {
                continue;
            };
            if !covered.insert(handle) {
                continue;
            }
            let Some(record) = self.symbol(symbol) else {
                continue;
            };
            let Some(variable) = self.variable(symbol) else {
                continue;
            };
            let (name, kind, instance) = match variable.ty.kind {
                TypeKind::Block(id) => match self.analysis.types.block(id) {
                    Some(block) => (
                        block.name.clone(),
                        SymbolKind::Block,
                        (!record.name.is_empty()).then(|| record.name.clone()),
                    ),
                    None => continue,
                },
                _ if variable.origin == rglsl_sema::scope::Origin::BuiltIn => {
                    (record.name.clone(), SymbolKind::BuiltIn, None)
                }
                _ => (record.name.clone(), SymbolKind::Variable, None),
            };
            let mut implicit_sizes = Vec::new();
            let declared = if super::prepass::IMPLICITLY_SIZED.contains(&record.name.as_str())
                && kind == SymbolKind::BuiltIn
                && !variable.ty.is_array()
            {
                variable.ty.clone().array_of(GlslArraySize::Unsized)
            } else {
                variable.ty.clone()
            };
            self.implicit_paths(
                &declared,
                self.module.global_variables[handle].ty,
                &mut Vec::new(),
                &mut implicit_sizes,
            );
            symbols.push(self.global_symbol(handle, name, kind, instance, implicit_sizes));
        }
        for (name, &handle) in &self.builtins {
            if !covered.insert(handle) {
                continue;
            }
            let implicit_sizes = if super::prepass::IMPLICITLY_SIZED.contains(&name.as_str())
                && matches!(
                    self.module.types[self.module.global_variables[handle].ty].inner,
                    TypeInner::Array { .. }
                ) {
                alloc::vec![Vec::new()]
            } else {
                Vec::new()
            };
            symbols.push(self.global_symbol(
                handle,
                name.clone(),
                SymbolKind::BuiltIn,
                None,
                implicit_sizes,
            ));
        }
        if let Some((handle, _)) = self.per_vertex {
            if covered.insert(handle) {
                let mut implicit_sizes = Vec::new();
                if let TypeInner::Struct { ref members, .. } =
                    self.module.types[self.module.global_variables[handle].ty].inner
                {
                    for (index, member) in (0_u32..).zip(members) {
                        if member.name.as_deref().is_some_and(|name| {
                            super::prepass::CLIP_DISTANCES.contains(&name)
                                && !self.per_vertex_redeclared
                        }) {
                            implicit_sizes.push(alloc::vec![PathStep::Member(index)]);
                        }
                    }
                }
                symbols.push(self.global_symbol(
                    handle,
                    String::from("gl_PerVertex"),
                    SymbolKind::BuiltIn,
                    None,
                    implicit_sizes,
                ));
            }
        }
        symbols
    }

    fn global_symbol(
        &self,
        handle: Handle<GlobalVariable>,
        name: String,
        kind: SymbolKind,
        instance: Option<String>,
        implicit_sizes: Vec<Vec<PathStep>>,
    ) -> GlobalSymbol {
        GlobalSymbol {
            global: handle,
            name,
            kind,
            instance,
            implicit_sizes,
            automatic_location: self.automatic_locations.contains(&handle),
            automatic_binding: self
                .automatic_bindings
                .iter()
                .find(|&&(global, _)| global == handle)
                .map(|&(_, set)| set),
        }
    }

    fn implicit_paths(
        &self,
        declared: &GlslType,
        ty: Handle<Type>,
        path: &mut Vec<PathStep>,
        found: &mut Vec<Vec<PathStep>>,
    ) {
        let mut ty = ty;
        let depth = path.len();
        for size in &declared.array {
            let base = match self.module.types[ty].inner {
                TypeInner::Array { base, .. } | TypeInner::BindingArray { base, .. } => base,
                _ => {
                    path.truncate(depth);
                    return;
                }
            };
            if *size == GlslArraySize::Unsized {
                found.push(path.clone());
            }
            path.push(PathStep::Element);
            ty = base;
        }
        let members = match declared.kind {
            TypeKind::Block(id) => self
                .analysis
                .types
                .block(id)
                .map(|block| block.members.as_slice()),
            TypeKind::Struct(id) => self
                .analysis
                .types
                .structure(id)
                .map(|structure| structure.members.as_slice()),
            _ => None,
        };
        if let (
            Some(members),
            &TypeInner::Struct {
                members: ref ir, ..
            },
        ) = (members, &self.module.types[ty].inner)
        {
            for member in members {
                let Some(index) = ir
                    .iter()
                    .position(|candidate| candidate.name.as_deref() == Some(member.name.as_str()))
                else {
                    continue;
                };
                let (Ok(index), Some(member_ty)) =
                    (u32::try_from(index), ir.get(index).map(|ir| ir.ty))
                else {
                    continue;
                };
                path.push(PathStep::Member(index));
                self.implicit_paths(&member.ty, member_ty, path, found);
                path.pop();
            }
        }
        path.truncate(depth);
    }

    fn layout_record(&self) -> StageLayout {
        let mut layout = self.stage_layout.record();
        layout.local_size = self.declared_local_size;
        layout.local_size_ids = self.local_size_ids;
        layout.depth = self.conservative_depth;
        layout.early_fragment_tests = self.early_fragment_tests;
        layout.xfb_strides = self.xfb.declared_strides();
        layout.transform_feedback = self.xfb.mode;
        layout.tile_shading_rate = self.tile_shading_rate;
        layout.non_coherent_tile_read = self.non_coherent_tile_read;
        layout
    }

    pub(super) fn into_object(mut self) -> ObjectModule {
        let functions = self.function_symbols();
        let globals = self.global_symbols();
        let layout = self.layout_record();
        let mut extensions: Vec<String> = self.analysis.extensions.iter().cloned().collect();
        extensions.sort();
        let stage = (!self.library).then_some(self.options.stage);
        let module = core::mem::take(&mut self.module);
        ObjectModule {
            stage,
            glsl_version: self.analysis.version.unwrap_or(0),
            extensions,
            functions,
            globals,
            layout,
            stages: if self.library {
                alloc::vec![self.options.stage]
            } else {
                Vec::new()
            },
            ..ObjectModule::new(stage, module)
        }
    }
}
