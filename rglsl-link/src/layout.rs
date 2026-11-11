use rglsl::object::{ObjectModule, StageLayout};
use rglsl::{
    EarlyDepthTest, EntryPoint, Expression, GeometryInfo, Literal, MeshOutputLayout, Module,
    Override, Scalar, ShaderStage, Span, TessellationInfo, TessellationSpacing,
    TessellationVertexOrder, Type, TypeInner,
};

use crate::error::LinkError;

fn merge_value<T: Copy + PartialEq>(
    merged: &mut Option<T>,
    value: Option<T>,
    what: &'static str,
    errors: &mut Vec<LinkError>,
) {
    match (*merged, value) {
        (None, Some(value)) => *merged = Some(value),
        (Some(previous), Some(value)) if previous != value => {
            let error = LinkError::Contradictory(what);
            if !errors.contains(&error) {
                errors.push(error);
            }
        }
        _ => {}
    }
}

const fn vertices_name(stage: ShaderStage) -> &'static str {
    match stage {
        ShaderStage::TessControl => "layout vertices values",
        _ => "layout max_vertices values",
    }
}

fn merged(
    stage: ShaderStage,
    objects: &[ObjectModule],
    errors: &mut Vec<LinkError>,
) -> StageLayout {
    let mut merged = StageLayout::default();
    for object in objects {
        let layout = &object.layout;
        for index in 0..3 {
            if let (Some(slot), Some(&value)) = (
                merged.local_size.get_mut(index),
                layout.local_size.get(index),
            ) {
                merge_value(slot, value, "local size", errors);
            }
            if let (Some(slot), Some(&value)) = (
                merged.local_size_ids.get_mut(index),
                layout.local_size_ids.get(index),
            ) {
                merge_value(slot, value, "local size specialization ids", errors);
            }
        }
        merge_value(&mut merged.depth, layout.depth, "depth layouts", errors);
        merged.early_fragment_tests |= layout.early_fragment_tests;
        merged.transform_feedback |= layout.transform_feedback;
        merged.point_mode |= layout.point_mode;
        for &(buffer, stride) in &layout.xfb_strides {
            match merged
                .xfb_strides
                .iter()
                .find(|&&(existing, _)| existing == buffer)
            {
                Some(&(_, previous)) if previous != stride => {
                    let error = LinkError::Contradictory("xfb_stride");
                    if !errors.contains(&error) {
                        errors.push(error);
                    }
                }
                Some(_) => {}
                None => merged.xfb_strides.push((buffer, stride)),
            }
        }
        merge_value(
            &mut merged.input_primitive,
            layout.input_primitive,
            "input layout primitives",
            errors,
        );
        merge_value(
            &mut merged.output_primitive,
            layout.output_primitive,
            "output layout primitives",
            errors,
        );
        merge_value(
            &mut merged.vertices,
            layout.vertices,
            vertices_name(stage),
            errors,
        );
        merge_value(
            &mut merged.primitives,
            layout.primitives,
            "layout max_primitives values",
            errors,
        );
        if let (Some(previous), Some(value)) = (merged.invocations, layout.invocations) {
            let error =
                LinkError::Mode("number of invocations must match between compilation units");
            if previous != value && !errors.contains(&error) {
                errors.push(error);
            }
        }
        merged.invocations = merged.invocations.or(layout.invocations);
        merge_value(
            &mut merged.tessellation_primitive,
            layout.tessellation_primitive,
            "input layout primitives",
            errors,
        );
        merge_value(
            &mut merged.spacing,
            layout.spacing,
            "input vertex spacing",
            errors,
        );
        merge_value(
            &mut merged.vertex_order,
            layout.vertex_order,
            "triangle ordering",
            errors,
        );
        for (slot, &value) in merged
            .tile_shading_rate
            .iter_mut()
            .zip(&layout.tile_shading_rate)
        {
            *slot = slot.or(value);
        }
        merged.non_coherent_tile_read |= layout.non_coherent_tile_read;
        merge_value(
            &mut merged.mesh_topology,
            layout.mesh_topology,
            "output layout primitives",
            errors,
        );
    }
    merged
}

fn missing(stage: ShaderStage, layout: &StageLayout) -> Vec<&'static str> {
    let checks: &[(bool, &'static str)] = match stage {
        ShaderStage::Geometry => &[
            (
                layout.input_primitive.is_none(),
                "At least one shader must specify an input layout primitive",
            ),
            (
                layout.output_primitive.is_none(),
                "At least one shader must specify an output layout primitive",
            ),
            (
                layout.vertices.is_none(),
                "At least one shader must specify a layout(max_vertices = value)",
            ),
        ],
        ShaderStage::TessControl => &[(
            layout.vertices.is_none(),
            "At least one shader must specify an output layout(vertices=...)",
        )],
        ShaderStage::TessEvaluation => &[(
            layout.tessellation_primitive.is_none(),
            "At least one shader must specify an input layout primitive",
        )],
        ShaderStage::Mesh => &[
            (
                layout.vertices.is_none(),
                "At least one shader must specify a layout(max_vertices = value)",
            ),
            (
                layout.primitives.is_none(),
                "At least one shader must specify a layout(max_primitives = value)",
            ),
            (
                layout.mesh_topology.is_none(),
                "At least one shader must specify an output layout primitive",
            ),
        ],
        ShaderStage::Vertex
        | ShaderStage::Fragment
        | ShaderStage::Compute
        | ShaderStage::Task
        | ShaderStage::RayGeneration
        | ShaderStage::AnyHit
        | ShaderStage::ClosestHit
        | ShaderStage::Miss
        | ShaderStage::Intersection
        | ShaderStage::Callable => &[],
    };
    checks
        .iter()
        .filter(|&&(missing, _)| missing)
        .map(|&(_, message)| message)
        .collect()
}

fn workgroup_size_overrides(module: &mut Module, ids: [Option<u32>; 3], entry: &mut EntryPoint) {
    if ids.iter().all(Option::is_none) {
        return;
    }
    let mut overrides = entry.workgroup_size_overrides.unwrap_or([None; 3]);
    for ((slot, id), &size) in overrides.iter_mut().zip(ids).zip(&entry.workgroup_size) {
        let (None, Some(id)) = (*slot, id) else {
            continue;
        };
        let existing = module
            .overrides
            .iter()
            .find(|&(_, candidate)| candidate.id == Some(id))
            .map(|(handle, _)| handle);
        let handle = existing.unwrap_or_else(|| {
            let ty = module.types.insert(
                Type {
                    name: None,
                    inner: TypeInner::Scalar(Scalar::U32),
                },
                Span::UNDEFINED,
            );
            let init = module
                .global_expressions
                .append(Expression::Literal(Literal::U32(size)), Span::UNDEFINED);
            module.overrides.append(
                Override {
                    name: None,
                    id: Some(id),
                    ty,
                    init: Some(init),
                },
                Span::UNDEFINED,
            )
        });
        *slot = Some(
            module
                .global_expressions
                .append(Expression::Override(handle), Span::UNDEFINED),
        );
    }
    entry.workgroup_size_overrides = Some(overrides);
}

fn geometry(layout: &StageLayout, entry: &mut EntryPoint) {
    match entry.geometry {
        Some(ref mut info) => {
            if let Some(vertices) = layout.vertices {
                info.max_vertices = vertices;
            }
            if let Some(invocations) = layout.invocations {
                info.invocations = invocations;
            }
        }
        None => {
            if let (Some(input), Some(output)) = (layout.input_primitive, layout.output_primitive) {
                entry.geometry = Some(GeometryInfo {
                    input,
                    output,
                    max_vertices: layout.vertices.unwrap_or(0),
                    invocations: layout.invocations.unwrap_or(1),
                    streams: Vec::new(),
                    passthrough: Vec::new(),
                });
            }
        }
    }
}

fn tessellation(stage: ShaderStage, layout: &StageLayout, entry: &mut EntryPoint) {
    let info = entry
        .tessellation
        .get_or_insert_with(TessellationInfo::default);
    match stage {
        ShaderStage::TessControl => {
            info.output_vertices = layout.vertices.or(info.output_vertices);
        }
        ShaderStage::TessEvaluation => {
            info.primitive = layout.tessellation_primitive.or(info.primitive);
            info.spacing = Some(layout.spacing.unwrap_or(TessellationSpacing::Equal));
            info.vertex_order = Some(layout.vertex_order.unwrap_or(TessellationVertexOrder::Ccw));
            info.point_mode |= layout.point_mode;
        }
        ShaderStage::Vertex
        | ShaderStage::Geometry
        | ShaderStage::Fragment
        | ShaderStage::Compute
        | ShaderStage::Task
        | ShaderStage::Mesh
        | ShaderStage::RayGeneration
        | ShaderStage::AnyHit
        | ShaderStage::ClosestHit
        | ShaderStage::Miss
        | ShaderStage::Intersection
        | ShaderStage::Callable => {}
    }
}

fn mesh(layout: &StageLayout, entry: &mut EntryPoint) {
    let Some(ref mut info) = entry.mesh_shader else {
        return;
    };
    if let (Some(topology), Some(max_vertices), Some(max_primitives)) =
        (layout.mesh_topology, layout.vertices, layout.primitives)
    {
        info.output = Some(MeshOutputLayout {
            topology,
            max_vertices,
            max_primitives,
        });
    }
}

fn xfb_strides(module: &mut Module, strides: &[(u32, u32)]) {
    for (_, global) in module.global_variables.iter_mut() {
        let Some(ref mut xfb) = global.xfb else {
            continue;
        };
        if let Some(&(_, stride)) = strides.iter().find(|&&(buffer, _)| buffer == xfb.buffer) {
            xfb.stride = stride;
        }
    }
}

fn tile_shading(layout: &StageLayout, entry: &mut EntryPoint) {
    let rate = layout.tile_shading_rate;
    if rate.iter().any(Option::is_some) {
        entry.tile_shading.rate = Some(rate.map(|value| value.unwrap_or(1)));
    }
    entry.tile_shading.non_coherent_attachment_read |= layout.non_coherent_tile_read;
}

pub(crate) fn apply(
    stage: ShaderStage,
    objects: &[ObjectModule],
    module: &mut Module,
    entry: &mut EntryPoint,
    errors: &mut Vec<LinkError>,
) -> StageLayout {
    let layout = merged(stage, objects, errors);
    errors.extend(
        missing(stage, &layout)
            .into_iter()
            .map(LinkError::MissingLayout),
    );
    if stage.compute_like() {
        if layout.local_size.iter().any(Option::is_some)
            || layout.local_size_ids.iter().any(Option::is_some)
        {
            entry.workgroup_size_builtin = true;
        }
        for (slot, size) in entry.workgroup_size.iter_mut().zip(layout.local_size) {
            if let Some(size) = size {
                *slot = size;
            }
        }
        workgroup_size_overrides(module, layout.local_size_ids, entry);
    }
    if layout.early_fragment_tests {
        entry.early_depth_test = Some(EarlyDepthTest::Force);
    } else if let Some(conservative) = layout.depth {
        entry.early_depth_test = Some(EarlyDepthTest::Allow { conservative });
    }
    entry.transform_feedback |= layout.transform_feedback;
    xfb_strides(module, &layout.xfb_strides);
    match stage {
        ShaderStage::Geometry => geometry(&layout, entry),
        ShaderStage::TessControl | ShaderStage::TessEvaluation => {
            tessellation(stage, &layout, entry);
        }
        ShaderStage::Mesh => mesh(&layout, entry),
        ShaderStage::Vertex
        | ShaderStage::Fragment
        | ShaderStage::Compute
        | ShaderStage::Task
        | ShaderStage::RayGeneration
        | ShaderStage::AnyHit
        | ShaderStage::ClosestHit
        | ShaderStage::Miss
        | ShaderStage::Intersection
        | ShaderStage::Callable => {}
    }
    tile_shading(&layout, entry);
    layout
}
