use rglsl::object::{ObjectModule, StageLayout};
use rglsl::{EarlyDepthTest, EntryPoint, ShaderStage};

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
        merge_value(
            &mut merged.invocations,
            layout.invocations,
            "number of invocations",
            errors,
        );
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

fn outside_main<T: PartialEq>(main: &Option<T>, merged: &Option<T>) -> bool {
    main.is_none() && merged.is_some()
}

pub(crate) fn apply(
    stage: ShaderStage,
    objects: &[ObjectModule],
    main: usize,
    entry: &mut EntryPoint,
    errors: &mut Vec<LinkError>,
) -> StageLayout {
    let layout = merged(stage, objects, errors);
    errors.extend(
        missing(stage, &layout)
            .into_iter()
            .map(LinkError::MissingLayout),
    );
    let Some(own) = objects.get(main).map(|object| &object.layout) else {
        return layout;
    };
    for index in 0..3 {
        if let (Some(&None), Some(&Some(size)), Some(slot)) = (
            own.local_size.get(index),
            layout.local_size.get(index),
            entry.workgroup_size.get_mut(index),
        ) {
            *slot = size;
        }
    }
    if layout.early_fragment_tests {
        entry.early_depth_test = Some(EarlyDepthTest::Force);
    } else if let (None, Some(conservative)) = (own.depth, layout.depth) {
        entry.early_depth_test = Some(EarlyDepthTest::Allow { conservative });
    }
    entry.transform_feedback |= layout.transform_feedback;
    let unsupported = [
        (
            own.local_size_ids
                .iter()
                .zip(&layout.local_size_ids)
                .any(|(own, merged)| outside_main(own, merged)),
            "local_size_*_id",
        ),
        (
            outside_main(&own.input_primitive, &layout.input_primitive)
                || outside_main(&own.tessellation_primitive, &layout.tessellation_primitive),
            "an input primitive",
        ),
        (
            outside_main(&own.output_primitive, &layout.output_primitive)
                || outside_main(&own.mesh_topology, &layout.mesh_topology),
            "an output primitive",
        ),
        (
            outside_main(&own.vertices, &layout.vertices)
                || outside_main(&own.primitives, &layout.primitives),
            "max_vertices, vertices or max_primitives",
        ),
        (
            outside_main(&own.invocations, &layout.invocations),
            "invocations",
        ),
        (
            outside_main(&own.spacing, &layout.spacing)
                || outside_main(&own.vertex_order, &layout.vertex_order)
                || (layout.point_mode && !own.point_mode),
            "a tessellation spacing, vertex order or point mode",
        ),
        (
            layout
                .xfb_strides
                .iter()
                .any(|stride| !own.xfb_strides.contains(stride)),
            "xfb_stride",
        ),
    ];
    for (outside, what) in unsupported {
        if outside {
            errors.push(LinkError::Unsupported(format!(
                "the layout qualifier {what} declared in a module without `main`"
            )));
        }
    }
    layout
}
