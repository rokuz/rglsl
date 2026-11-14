use alloc::{
    collections::BTreeSet,
    format,
    string::{String, ToString},
    vec::Vec,
};
use rglsl_sema::scope::QualifierFlags;

use rglsl_sema::FunctionId;
use rglsl_sema::builtins::variables;
use rglsl_sema::scope::Direction;
use rglsl_sema::types::{ArraySize as GlslArraySize, Type as GlslType, TypeKind};

use super::{GlobalRef, Lowerer, Result};
use crate::object::{
    BindingAssignment, CompiledUnit, DeadCall, FunctionSymbol, GlobalSymbol, Library, ObjectModule,
    ObjectTarget, ParameterQualifier, PathStep, StageLayout, SymbolKind,
};
use crate::valid::{ValidationError, ValidationFlags, ValidationMode, Validator};
use crate::{Function, GlobalVariable, Handle, Linkage, Span, Type, TypeInner};

impl Lowerer<'_> {
    fn implicit_paths(
        &self,
        declared: &GlslType,
        ty: Handle<Type>,
        path: &mut Vec<PathStep>,
        found: &mut Vec<Vec<PathStep>>,
    ) {
        let origin = path.len();
        let mut pending = alloc::vec![(declared, ty, origin, None)];
        while let Some((declared, ty, depth, step)) = pending.pop() {
            path.truncate(depth);
            path.extend(step);
            let mut ty = ty;
            let mut sized = true;
            for size in declared.dimensions() {
                let (TypeInner::Array { base, .. } | TypeInner::BindingArray { base, .. }) =
                    self.module.types[ty].inner
                else {
                    sized = false;
                    break;
                };
                if *size == GlslArraySize::Unsized {
                    found.push(path.clone());
                }
                path.push(PathStep::Element);
                ty = base;
            }
            if !sized {
                continue;
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
            let (
                Some(members),
                &TypeInner::Struct {
                    members: ref ir, ..
                },
            ) = (members, &self.module.types[ty].inner)
            else {
                continue;
            };
            let depth = path.len();
            let mut children = Vec::new();
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
                children.push((&member.ty, member_ty, depth, Some(PathStep::Member(index))));
            }
            pending.extend(children.into_iter().rev());
        }
        path.truncate(origin);
    }

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

    pub(super) fn declare_import(&mut self, id: FunctionId) -> Result<()> {
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
                            Direction::In
                                if parameter
                                    .qualifiers
                                    .flags
                                    .contains(QualifierFlags::CONSTANT) =>
                            {
                                ParameterQualifier::ConstIn
                            }
                            Direction::In => ParameterQualifier::In,
                            Direction::Out => ParameterQualifier::Out,
                            Direction::Inout => ParameterQualifier::Inout,
                        })
                        .collect(),
                    invalid: None,
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
                _ if self.function_private.contains(&handle) => {
                    (record.name.clone(), SymbolKind::Local, None)
                }
                _ if variable.origin == rglsl_sema::scope::Origin::BuiltIn => {
                    (record.name.clone(), SymbolKind::BuiltIn, None)
                }
                _ => (record.name.clone(), SymbolKind::Variable, None),
            };
            let mut implicit_sizes = Vec::new();
            let declared = if variables::implicitly_sized(&record.name)
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
            let implicit_sizes = if variables::implicitly_sized(name)
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
        if let Some((handle, _)) = self.per_vertex
            && covered.insert(handle)
        {
            let mut implicit_sizes = Vec::new();
            if let TypeInner::Struct { ref members, .. } =
                self.module.types[self.module.global_variables[handle].ty].inner
            {
                for (index, member) in (0_u32..).zip(members) {
                    if member.name.as_deref().is_some_and(|name| {
                        variables::clip_or_cull_distance(name) && !self.per_vertex_redeclared
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
        if self.library {
            symbols.sort_by_key(|symbol| symbol.global.index());
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
            binding: self
                .automatic_bindings
                .iter()
                .find(|&&(global, _)| global == handle)
                .map_or(BindingAssignment::Explicit, |&(_, set)| {
                    BindingAssignment::Automatic { set }
                }),
            on_use: self.on_use_globals.contains(&handle),
            initializer: self.constant_initializers.get(&handle).copied(),
        }
    }

    fn layout_record(&self) -> StageLayout {
        let mut layout = self.stage_layout.record();
        layout.local_size = self.declared_local_size;
        layout.local_size_ids = self.local_size_ids;
        layout.depth = self.conservative_depth;
        let fragment = self.analysis.fragment;
        layout.early_fragment_tests = self.early_fragment_tests || fragment.early_fragment_tests;
        layout.post_depth_coverage = fragment.post_depth_coverage;
        layout.non_coherent_color_attachment_read = fragment.non_coherent_color_attachment_read;
        layout.non_coherent_depth_attachment_read = fragment.non_coherent_depth_attachment_read;
        layout.non_coherent_stencil_attachment_read = fragment.non_coherent_stencil_attachment_read;
        layout.xfb_strides = self.xfb.declared_strides();
        layout.transform_feedback = self.xfb.mode;
        layout.tile_shading_rate = self.tile_shading_rate;
        layout.non_coherent_tile_read = self.non_coherent_tile_read;
        layout
    }

    pub(super) fn is_deferrable(&self, id: FunctionId) -> bool {
        self.object
            && !self.library
            && self
                .reachable
                .as_ref()
                .is_some_and(|reachable| !reachable.contains(&id))
    }

    pub(super) fn defer_function(&mut self, handle: Handle<Function>, message: String) {
        let function = self.module.functions.get_mut(handle);
        *function = Function {
            name: function.name.take(),
            arguments: core::mem::take(&mut function.arguments),
            result: function.result.take(),
            linkage: Linkage::Import,
            ..Function::default()
        };
        self.deferred.push((handle, message));
    }

    fn defer_invalid_functions(&mut self) {
        let deferrable: BTreeSet<Handle<Function>> = self
            .functions
            .iter()
            .filter(|&(&id, _)| self.is_deferrable(id))
            .map(|(_, &handle)| handle)
            .filter(|&handle| {
                self.module
                    .functions
                    .try_get(handle)
                    .is_ok_and(|function| function.linkage.is_definition())
            })
            .collect();
        if deferrable.is_empty() {
            return;
        }
        loop {
            let mut validator = Validator::new(ValidationFlags::all());
            validator.mode(ValidationMode::Object);
            let Err(error) = validator.validate(&self.module) else {
                return;
            };
            let ValidationError::Function { handle, .. } = *error.as_inner() else {
                return;
            };
            if !deferrable.contains(&handle)
                || self.deferred.iter().any(|&(done, _)| done == handle)
            {
                return;
            }
            let mut message = error.as_inner().to_string();
            let mut source = core::error::Error::source(error.as_inner());
            while let Some(inner) = source {
                message.push_str(": ");
                message.push_str(&inner.to_string());
                source = inner.source();
            }
            self.defer_function(handle, message);
        }
    }

    fn dead_calls(&self) -> Vec<DeadCall> {
        let main = self.main_function();
        let mut dead = Vec::new();
        for (&caller_id, callees) in &self.ast_calls {
            let (caller, function) = if Some(caller_id) == main {
                (
                    None,
                    self.module
                        .entry_points
                        .first()
                        .map(|entry| &entry.function),
                )
            } else {
                let Some(&handle) = self.functions.get(&caller_id) else {
                    continue;
                };
                (Some(handle), self.module.functions.try_get(handle).ok())
            };
            let Some(function) = function else {
                continue;
            };
            let mut lowered = BTreeSet::new();
            for statement in function.body.walk() {
                statement.for_each_callee(|callee| {
                    lowered.insert(callee);
                });
            }
            for callee in callees {
                if let Some(&callee) = self.functions.get(callee)
                    && !lowered.contains(&callee)
                {
                    dead.push(DeadCall { caller, callee });
                }
            }
        }
        dead
    }

    pub(super) fn into_object(mut self) -> ObjectModule {
        self.defer_invalid_functions();
        let deferred = core::mem::take(&mut self.deferred);
        let mut functions = self.function_symbols();
        for symbol in &mut functions {
            symbol.invalid = deferred
                .iter()
                .find(|&&(handle, _)| handle == symbol.function)
                .map(|&(_, ref message)| message.clone());
        }
        let globals = self.global_symbols();
        let dead_calls = self.dead_calls();
        let layout = self.layout_record();
        let extensions: Vec<String> = self
            .analysis
            .extensions
            .iter()
            .map(|extension| String::from(extension.name()))
            .collect();
        let stage = (!self.library).then(|| self.stage());
        let module = core::mem::take(&mut self.module);
        let work_group_size_constant = !self.specialize_work_group_size
            && self.analysis.work_group_size_read
            && self.local_size_ids.iter().any(Option::is_none)
            && self.stage_map(crate::ShaderStage::compute_like);
        let target = match stage {
            Some(stage) => ObjectTarget::Stage(stage),
            None => ObjectTarget::Library(Library {
                stages: crate::ShaderStageMask::empty(),
                variants: Vec::new(),
                rejections: Vec::new(),
            }),
        };
        ObjectModule::new(
            target,
            CompiledUnit {
                work_group_size_constant,
                work_group_size_placeholders: self.work_group_size_placeholders,
                deferred_bias: self.deferred_bias,
                glsl_version: self.analysis.version.unwrap_or(0),
                extensions,
                functions,
                globals,
                layout,
                dead_calls,
                ..CompiledUnit::new(module)
            },
        )
    }
}
