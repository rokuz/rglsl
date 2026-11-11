use rglsl::object::{PathStep, SymbolKind};
use rglsl::{AddressSpace, ArraySize, Binding, Handle, Module, ShaderStage, Type, TypeInner};

use crate::error::{LinkError, LinkErrors};
use crate::merge::{space_class, MergedGlobal, SpaceClass};
use crate::unify::Mismatch;
use crate::{finish, merge, Linked, Merged, Options};

const fn pipeline_position(stage: ShaderStage) -> Option<u8> {
    match stage {
        ShaderStage::Vertex | ShaderStage::Task => Some(0),
        ShaderStage::TessControl | ShaderStage::Mesh => Some(1),
        ShaderStage::TessEvaluation => Some(2),
        ShaderStage::Geometry => Some(3),
        ShaderStage::Fragment => Some(4),
        ShaderStage::Compute
        | ShaderStage::RayGeneration
        | ShaderStage::AnyHit
        | ShaderStage::ClosestHit
        | ShaderStage::Miss
        | ShaderStage::Intersection
        | ShaderStage::Callable => None,
    }
}

const fn arrayed_input(stage: ShaderStage) -> bool {
    matches!(
        stage,
        ShaderStage::TessControl | ShaderStage::TessEvaluation | ShaderStage::Geometry
    )
}

const fn arrayed_output(stage: ShaderStage) -> bool {
    matches!(stage, ShaderStage::TessControl | ShaderStage::Mesh)
}

const fn shared_resource(space: AddressSpace) -> bool {
    matches!(
        space,
        AddressSpace::Uniform
            | AddressSpace::Storage { .. }
            | AddressSpace::Handle
            | AddressSpace::DescriptorHeap(_)
    )
}

struct Side<'a> {
    module: &'a Module,
    ty: Handle<Type>,
    implicit: &'a [Vec<PathStep>],
}

impl Side<'_> {
    fn implicit_at(&self, path: &[PathStep]) -> bool {
        self.implicit.iter().any(|candidate| candidate == path)
    }
}

const fn rank(size: ArraySize) -> Option<u32> {
    match size {
        ArraySize::Dynamic => Some(0),
        ArraySize::Constant(length) => Some(length.get()),
        ArraySize::Pending(_) => None,
    }
}

fn compatible_sizes(
    a: ArraySize,
    b: ArraySize,
    implicit: (bool, bool),
    strict: bool,
) -> Result<(), Mismatch> {
    if a == b {
        return Ok(());
    }
    let (Some(rank_a), Some(rank_b)) = (rank(a), rank(b)) else {
        return Err(Mismatch::Types);
    };
    match implicit {
        (true, true) if strict => Err(Mismatch::ImplicitSize),
        (true, true) => Ok(()),
        (true, false) if rank_a <= rank_b => Ok(()),
        (false, true) if rank_b <= rank_a => Ok(()),
        (true, false) | (false, true) => Err(Mismatch::ImplicitSize),
        (false, false) => Err(Mismatch::Types),
    }
}

fn compatible(a: &Side, b: &Side, path: &mut Vec<PathStep>, strict: bool) -> Result<(), Mismatch> {
    let left = &a.module.types[a.ty];
    let right = &b.module.types[b.ty];
    if left.name != right.name {
        return Err(Mismatch::Types);
    }
    let nested = |path: &mut Vec<PathStep>, step, ty_a, ty_b| {
        path.push(step);
        let result = compatible(
            &Side { ty: ty_a, ..*a },
            &Side { ty: ty_b, ..*b },
            path,
            strict,
        );
        path.pop();
        result
    };
    match (&left.inner, &right.inner) {
        (
            &TypeInner::Array {
                base: base_a,
                size: size_a,
                ..
            },
            &TypeInner::Array {
                base: base_b,
                size: size_b,
                ..
            },
        )
        | (
            &TypeInner::BindingArray {
                base: base_a,
                size: size_a,
            },
            &TypeInner::BindingArray {
                base: base_b,
                size: size_b,
            },
        ) => {
            compatible_sizes(
                size_a,
                size_b,
                (a.implicit_at(path), b.implicit_at(path)),
                strict,
            )?;
            nested(path, PathStep::Element, base_a, base_b)
        }
        (
            TypeInner::Struct {
                members: members_a, ..
            },
            TypeInner::Struct {
                members: members_b, ..
            },
        ) => {
            if members_a.len() != members_b.len() {
                return Err(Mismatch::Types);
            }
            for (index, (member_a, member_b)) in (0_u32..).zip(members_a.iter().zip(members_b)) {
                if member_a.name != member_b.name || member_a.binding != member_b.binding {
                    return Err(Mismatch::Types);
                }
                nested(path, PathStep::Member(index), member_a.ty, member_b.ty)?;
            }
            Ok(())
        }
        (left, right) => {
            if structurally_equal(a.module, left, b.module, right) {
                Ok(())
            } else {
                Err(Mismatch::Types)
            }
        }
    }
}

fn structurally_equal(module_a: &Module, a: &TypeInner, module_b: &Module, b: &TypeInner) -> bool {
    match (a, b) {
        (
            &TypeInner::Pointer {
                base: base_a,
                space: space_a,
            },
            &TypeInner::Pointer {
                base: base_b,
                space: space_b,
            },
        ) => {
            space_a == space_b
                && structurally_equal(
                    module_a,
                    &module_a.types[base_a].inner,
                    module_b,
                    &module_b.types[base_b].inner,
                )
        }
        _ => a == b,
    }
}

fn stage_names(a: ShaderStage, b: ShaderStage) -> String {
    format!("{a:?} and {b:?}")
}

fn find<'a>(merged: &'a Merged, class: SpaceClass, name: &str) -> Option<&'a MergedGlobal> {
    merged.globals.iter().find(|global| {
        global.name == name
            && space_class(merged.module.global_variables[global.handle].space) == class
    })
}

fn strip(module: &Module, ty: Handle<Type>, arrayed: bool) -> Handle<Type> {
    match module.types[ty].inner {
        TypeInner::Array { base, .. } if arrayed => base,
        _ => ty,
    }
}

fn stripped_paths(paths: &[Vec<PathStep>], arrayed: bool) -> Vec<Vec<PathStep>> {
    if !arrayed {
        return paths.to_vec();
    }
    paths
        .iter()
        .filter_map(|path| match path.split_first() {
            Some((PathStep::Element, rest)) => Some(rest.to_vec()),
            _ => None,
        })
        .collect()
}

fn check_resources(stages: &[Merged], errors: &mut Vec<LinkError>) {
    for (index, first) in stages.iter().enumerate() {
        for second in stages.iter().skip(index + 1) {
            for global in &first.globals {
                let variable = &first.module.global_variables[global.handle];
                if !shared_resource(variable.space) {
                    continue;
                }
                let Some(other) = find(second, SpaceClass::Other, &global.name) else {
                    continue;
                };
                let other_variable = &second.module.global_variables[other.handle];
                if !shared_resource(other_variable.space) {
                    continue;
                }
                let result = compatible(
                    &Side {
                        module: &first.module,
                        ty: variable.ty,
                        implicit: &global.implicit,
                    },
                    &Side {
                        module: &second.module,
                        ty: other_variable.ty,
                        implicit: &other.implicit,
                    },
                    &mut Vec::new(),
                    false,
                );
                let stages = stage_names(first.stage, second.stage);
                match result {
                    Ok(()) if variable.binding == other_variable.binding => {}
                    Ok(()) => errors.push(LinkError::CrossStage {
                        stages,
                        name: global.name.clone(),
                        what: "the layout binding qualifiers",
                    }),
                    Err(Mismatch::ImplicitSize) => {
                        errors.push(LinkError::ImplicitSize(global.name.clone()));
                    }
                    Err(Mismatch::Types) => errors.push(LinkError::CrossStage {
                        stages,
                        name: global.name.clone(),
                        what: "the member names and types",
                    }),
                }
            }
        }
    }
}

fn check_interface(from: &Merged, to: &Merged, errors: &mut Vec<LinkError>) {
    for output in &from.globals {
        let variable = &from.module.global_variables[output.handle];
        if variable.space != AddressSpace::Output
            || output.kind == SymbolKind::BuiltIn
            || matches!(variable.io, Some(Binding::BuiltIn(_)))
        {
            continue;
        }
        let Some(input) = find(to, SpaceClass::Input, &output.name) else {
            continue;
        };
        let input_variable = &to.module.global_variables[input.handle];
        let output_patch = matches!(variable.io, Some(Binding::Location { patch: true, .. }));
        let input_patch = matches!(
            input_variable.io,
            Some(Binding::Location { patch: true, .. })
        );
        let output_arrayed = arrayed_output(from.stage) && !output_patch;
        let input_arrayed = arrayed_input(to.stage) && !input_patch;
        let output_paths = stripped_paths(&output.implicit, output_arrayed);
        let input_paths = stripped_paths(&input.implicit, input_arrayed);
        let result = compatible(
            &Side {
                module: &from.module,
                ty: strip(&from.module, variable.ty, output_arrayed),
                implicit: &output_paths,
            },
            &Side {
                module: &to.module,
                ty: strip(&to.module, input_variable.ty, input_arrayed),
                implicit: &input_paths,
            },
            &mut Vec::new(),
            true,
        );
        if result == Err(Mismatch::ImplicitSize) {
            errors.push(LinkError::ImplicitSize(output.name.clone()));
        }
    }
}

pub fn link_program(
    stages: &[Vec<rglsl::object::ObjectModule>],
    options: &Options,
) -> Result<Vec<Linked>, LinkErrors> {
    let mut errors = Vec::new();
    let mut merged = Vec::new();
    for objects in stages {
        match merge(objects, options) {
            Ok(result) => merged.push(result),
            Err(failure) => errors.extend(failure.errors),
        }
    }
    if !errors.is_empty() {
        return Err(errors.into());
    }
    for (index, first) in merged.iter().enumerate() {
        if merged
            .iter()
            .skip(index + 1)
            .any(|second| second.stage == first.stage)
        {
            errors.push(LinkError::MultipleEntryPoints);
        }
    }
    check_resources(&merged, &mut errors);
    let mut pipeline: Vec<&Merged> = merged
        .iter()
        .filter(|stage| pipeline_position(stage.stage).is_some())
        .collect();
    pipeline.sort_by_key(|stage| pipeline_position(stage.stage));
    for pair in pipeline.windows(2) {
        if let [from, to] = *pair {
            check_interface(from, to, &mut errors);
        }
    }
    if !errors.is_empty() {
        return Err(errors.into());
    }
    let mut linked = Vec::with_capacity(merged.len());
    for stage in merged {
        match finish(stage) {
            Ok(result) => linked.push(result),
            Err(failure) => errors.extend(failure.errors),
        }
    }
    if errors.is_empty() {
        Ok(linked)
    } else {
        Err(errors.into())
    }
}
