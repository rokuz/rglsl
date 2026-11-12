use rglsl_ast::extensions::Request;
use rglsl_ast::Span;

use super::Analyzer;
use crate::builtins::Stage;
use crate::diagnostic::{Diagnostic, DiagnosticKind};
use crate::scope::{LayoutEntry, Qualifiers, Storage};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Kind {
    InputPrimitive,
    OutputPrimitive,
    AnyPrimitive,
    Spacing,
    Order,
    PointMode,
    Invocations,
    Vertices,
    Primitives,
}

#[derive(Debug, Clone, Default)]
pub struct StageLayout {
    pub(crate) selections: u32,
    pub(crate) returned_from_main: bool,
    input_primitive: Option<&'static str>,
    output_primitive: Option<&'static str>,
    vertices: Option<i64>,
    primitives: Option<i64>,
    invocations: Option<i64>,
    spacing: Option<&'static str>,
    order: Option<&'static str>,
}

const GEOMETRY: &[(&str, Kind)] = &[
    ("points", Kind::AnyPrimitive),
    ("lines", Kind::InputPrimitive),
    ("lines_adjacency", Kind::InputPrimitive),
    ("triangles", Kind::InputPrimitive),
    ("triangles_adjacency", Kind::InputPrimitive),
    ("line_strip", Kind::OutputPrimitive),
    ("triangle_strip", Kind::OutputPrimitive),
    ("invocations", Kind::Invocations),
    ("max_vertices", Kind::Vertices),
];

const TESS_EVALUATION: &[(&str, Kind)] = &[
    ("triangles", Kind::InputPrimitive),
    ("quads", Kind::InputPrimitive),
    ("isolines", Kind::InputPrimitive),
    ("equal_spacing", Kind::Spacing),
    ("fractional_even_spacing", Kind::Spacing),
    ("fractional_odd_spacing", Kind::Spacing),
    ("cw", Kind::Order),
    ("ccw", Kind::Order),
    ("point_mode", Kind::PointMode),
];

const TESS_CONTROL: &[(&str, Kind)] = &[("vertices", Kind::Vertices)];

const MESH: &[(&str, Kind)] = &[
    ("points", Kind::OutputPrimitive),
    ("lines", Kind::OutputPrimitive),
    ("triangles", Kind::OutputPrimitive),
    ("max_vertices", Kind::Vertices),
    ("max_primitives", Kind::Primitives),
];

impl StageLayout {
    pub(crate) const fn output_primitive(&self) -> Option<&'static str> {
        self.output_primitive
    }

    pub(crate) const fn mesh_vertices(&self) -> Option<i64> {
        self.vertices
    }

    pub(crate) const fn mesh_primitives(&self) -> Option<i64> {
        self.primitives
    }
}

const VIEWPORT_LAYER_EXTENSIONS: [&str; 2] = [
    "GL_ARB_shader_viewport_layer_array",
    "GL_NV_viewport_array2",
];

const fn table(stage: Stage) -> &'static [(&'static str, Kind)] {
    match stage {
        Stage::Geometry => GEOMETRY,
        Stage::TessEvaluation => TESS_EVALUATION,
        Stage::TessControl => TESS_CONTROL,
        Stage::Mesh => MESH,
        _ => &[],
    }
}

fn shader_layouts(
    stage: Stage,
    qualifiers: &Qualifiers,
) -> impl Iterator<Item = (&'static str, Kind, &LayoutEntry)> {
    qualifiers.layout.iter().filter_map(move |entry| {
        table(stage)
            .iter()
            .find(|&&(name, _)| entry.name.eq_ignore_ascii_case(name))
            .map(|&(name, kind)| (name, kind, entry))
    })
}

const PRE_RASTERIZATION: &[Stage] = &[
    Stage::Vertex,
    Stage::TessControl,
    Stage::TessEvaluation,
    Stage::Geometry,
];

const COMPUTE_LIKE: &[Stage] = &[Stage::Compute, Stage::Task, Stage::Mesh];

pub fn layout_stages(name: &str) -> Option<&'static [Stage]> {
    Some(match name {
        "local_size_x" | "local_size_y" | "local_size_z" | "local_size_x_id"
        | "local_size_y_id" | "local_size_z_id" | "shading_rate_xqcom" | "shading_rate_yqcom"
        | "shading_rate_zqcom" => COMPUTE_LIKE,
        "vertices" => &[Stage::TessControl],
        "max_vertices" | "points" | "lines" => &[Stage::Geometry, Stage::Mesh],
        "max_primitives" => &[Stage::Mesh],
        "invocations"
        | "stream"
        | "line_strip"
        | "lines_adjacency"
        | "triangles_adjacency"
        | "triangle_strip"
        | "passthrough" => &[Stage::Geometry],
        "triangles" => &[Stage::Geometry, Stage::TessEvaluation, Stage::Mesh],
        "quads"
        | "isolines"
        | "equal_spacing"
        | "fractional_even_spacing"
        | "fractional_odd_spacing"
        | "cw"
        | "ccw"
        | "point_mode" => &[Stage::TessEvaluation],
        "index"
        | "origin_upper_left"
        | "pixel_center_integer"
        | "early_fragment_tests"
        | "early_and_late_fragment_tests_amd"
        | "post_depth_coverage"
        | "non_coherent_color_attachment_readext"
        | "non_coherent_depth_attachment_readext"
        | "non_coherent_stencil_attachment_readext"
        | "depth_any"
        | "depth_greater"
        | "depth_less"
        | "depth_unchanged"
        | "pixel_interlock_ordered"
        | "pixel_interlock_unordered"
        | "sample_interlock_ordered"
        | "sample_interlock_unordered"
        | "shading_rate_interlock_ordered"
        | "shading_rate_interlock_unordered"
        | "override_coverage"
        | "full_quads"
        | "non_coherent_attachment_readqcom" => &[Stage::Fragment],
        "tile_attachmentqcom" => &[Stage::Fragment, Stage::Compute],
        "viewport_relative" | "secondary_view_offset" => PRE_RASTERIZATION,
        _ if name.starts_with("blend_support_") || name.starts_with("stencil_ref_") => {
            &[Stage::Fragment]
        }
        _ => return None,
    })
}

const fn invalid(qualifier: &'static str, reason: &'static str) -> DiagnosticKind {
    DiagnosticKind::InvalidQualifier { qualifier, reason }
}

impl Analyzer<'_> {
    pub(crate) fn stage_layout_identifiers(&mut self, qualifiers: &Qualifiers) {
        for entry in &qualifiers.layout {
            let name = entry.name.to_ascii_lowercase();
            if let Some(stages) = layout_stages(&name) {
                self.stage_check(entry.span, |stage| {
                    (!stages.contains(&stage)).then(|| DiagnosticKind::NotSupportedInStage {
                        feature: alloc::format!("layout({name})"),
                        stage: stage.name(),
                    })
                });
            }
        }
    }

    pub(crate) fn passthrough_extension(&mut self, qualifiers: &Qualifiers) {
        let span = qualifiers
            .layout
            .iter()
            .find(|entry| entry.name.eq_ignore_ascii_case("passthrough"))
            .map(|entry| entry.span);
        if let Some(span) = span.filter(|_| self.stage_is(Stage::Geometry)) {
            self.require_extension(
                span,
                "GL_NV_geometry_shader_passthrough",
                "geometry shader passthrough",
            );
        }
    }

    pub(crate) fn view_layout_extensions(&mut self, qualifiers: &Qualifiers) {
        let required: alloc::vec::Vec<(Span, &'static [&'static str], &'static str, bool)> =
            qualifiers
                .layout
                .iter()
                .filter_map(|entry| {
                    let name = entry.name.to_ascii_lowercase();
                    let (extension, what, fragment): (&'static [&'static str], _, _) =
                        match name.as_str() {
                            "viewport_relative" => {
                                (&["GL_NV_viewport_array2"], "viewport_relative", false)
                            }
                            "secondary_view_offset" => (
                                &["GL_NV_stereo_view_rendering"],
                                "secondary_view_offset",
                                false,
                            ),
                            "override_coverage" => (
                                &["GL_NV_sample_mask_override_coverage"],
                                "override_coverage",
                                true,
                            ),
                            _ => return None,
                        };
                    Some((entry.span, extension, what, fragment))
                })
                .collect();
        for (span, extension, what, fragment) in required {
            self.require_stage_extensions(span, what, |stage| {
                let applies = if fragment {
                    stage == Stage::Fragment
                } else {
                    PRE_RASTERIZATION.contains(&stage)
                };
                applies.then_some(extension)
            });
        }
    }

    pub(crate) fn no_shader_layouts(&mut self, qualifiers: &Qualifiers) {
        let found: alloc::vec::Vec<(&'static str, Span)> = self.stage_map(|stage| {
            shader_layouts(stage, qualifiers)
                .map(|(name, _, entry)| (name, entry.span))
                .collect()
        });
        for (name, span) in found {
            self.error(
                span,
                invalid(name, "can only apply to a standalone qualifier"),
            );
        }
    }

    pub(crate) fn standalone_stage_layout(&mut self, qualifiers: &Qualifiers) {
        if self.stage_map(|stage| shader_layouts(stage, qualifiers).next().is_none()) {
            return;
        }
        let stage = self.stage();
        let found: alloc::vec::Vec<(&'static str, Kind, Span, Option<i64>)> =
            shader_layouts(stage, qualifiers)
                .map(|(name, kind, entry)| (name, kind, entry.span, entry.value))
                .collect();
        let input = qualifiers.storage == Storage::In;
        let output = qualifiers.storage == Storage::Out;
        for (name, kind, span, value) in found {
            match kind {
                Kind::Vertices => {
                    if value == Some(0) && stage == Stage::TessControl {
                        self.error(span, invalid(name, "must be greater than 0"));
                        continue;
                    }
                    let limit = i64::from(self.options.limits.max_geometry_output_vertices);
                    if stage == Stage::Geometry && value.is_some_and(|value| value > limit) {
                        self.error(
                            span,
                            invalid(
                                name,
                                "too large, must be less than gl_MaxGeometryOutputVertices",
                            ),
                        );
                    }
                    if stage == Stage::Mesh {
                        self.mesh_limit(span, name, value, false);
                    }
                    if !output {
                        self.error(span, invalid(name, "can only apply to 'out'"));
                    }
                    match self.stage_layout.vertices {
                        Some(previous) if Some(previous) != value => self.error(
                            span,
                            invalid(name, "cannot change previously set layout value"),
                        ),
                        _ => self.stage_layout.vertices = value,
                    }
                }
                Kind::Primitives => {
                    self.mesh_limit(span, name, value, true);
                    if !output {
                        self.error(span, invalid(name, "can only apply to 'out'"));
                    }
                    match self.stage_layout.primitives {
                        Some(previous) if Some(previous) != value => self.error(
                            span,
                            invalid(name, "cannot change previously set layout value"),
                        ),
                        _ => self.stage_layout.primitives = value,
                    }
                }
                Kind::Invocations => {
                    if value == Some(0) {
                        self.error(span, invalid(name, "must be at least 1"));
                        continue;
                    }
                    if !input {
                        self.error(span, invalid(name, "can only apply to 'in'"));
                    }
                    match self.stage_layout.invocations {
                        Some(previous) if Some(previous) != value => self.error(
                            span,
                            invalid(name, "cannot change previously set layout value"),
                        ),
                        _ => self.stage_layout.invocations = value,
                    }
                }
                Kind::InputPrimitive | Kind::OutputPrimitive | Kind::AnyPrimitive => {
                    self.primitive_layout(span, name, kind, input, output);
                }
                Kind::Spacing | Kind::Order => {
                    if !input {
                        self.error(span, invalid(name, "can only apply to 'in'"));
                        continue;
                    }
                    let (slot, message) = if kind == Kind::Spacing {
                        (
                            &mut self.stage_layout.spacing,
                            "cannot change previously set vertex spacing",
                        )
                    } else {
                        (
                            &mut self.stage_layout.order,
                            "cannot change previously set vertex order",
                        )
                    };
                    match *slot {
                        Some(previous) if previous != name => {
                            self.error(span, invalid(name, message));
                        }
                        _ => *slot = Some(name),
                    }
                }
                Kind::PointMode => {
                    if !input {
                        self.error(span, invalid(name, "can only apply to 'in'"));
                    }
                }
            }
        }
    }

    fn mesh_limit(&mut self, span: Span, name: &'static str, value: Option<i64>, primitives: bool) {
        let ext = self.mesh_ext();
        let limits = &self.options.limits;
        let (limit, message) = match (primitives, ext) {
            (false, true) => (
                limits.max_mesh_output_vertices_ext,
                "too large, must be less than gl_MaxMeshOutputVerticesEXT",
            ),
            (false, false) => (
                limits.max_mesh_output_vertices_nv,
                "too large, must be less than gl_MaxMeshOutputVerticesNV",
            ),
            (true, true) => (
                limits.max_mesh_output_primitives_ext,
                "too large, must be less than gl_MaxMeshOutputPrimitivesEXT",
            ),
            (true, false) => (
                limits.max_mesh_output_primitives_nv,
                "too large, must be less than gl_MaxMeshOutputPrimitivesNV",
            ),
        };
        if value.is_some_and(|value| value > i64::from(limit)) {
            self.error(span, invalid(name, message));
        }
    }

    fn primitive_layout(
        &mut self,
        span: Span,
        name: &'static str,
        kind: Kind,
        input: bool,
        output: bool,
    ) {
        if input {
            if kind == Kind::OutputPrimitive {
                self.error(span, invalid(name, "cannot apply to input"));
                return;
            }
            match self.stage_layout.input_primitive {
                Some(previous) if previous != name => self.error(
                    span,
                    invalid(name, "cannot change previously set input primitive"),
                ),
                _ => self.stage_layout.input_primitive = Some(name),
            }
        } else if output {
            if kind == Kind::InputPrimitive {
                self.error(span, invalid(name, "cannot apply to 'out'"));
                return;
            }
            match self.stage_layout.output_primitive {
                Some(previous) if previous != name => self.error(
                    span,
                    invalid(name, "cannot change previously set output primitive"),
                ),
                _ => self.stage_layout.output_primitive = Some(name),
            }
        } else {
            self.error(span, invalid(name, "cannot apply to this storage"));
        }
    }

    pub(crate) fn in_main(&self) -> bool {
        self.current_function
            .and_then(|id| self.functions.get(usize::try_from(id.index()).ok()?))
            .is_some_and(|function| function.name == "main")
    }

    pub(crate) fn tessellation_barrier(&mut self, span: Span) {
        if !self.stage_is(Stage::TessControl) {
            return;
        }
        let reason =
            if self.stage_layout.selections > 0 || self.loop_depth > 0 || !self.switches.is_empty()
            {
                Some("tessellation control barrier() cannot be placed within flow control")
            } else if !self.in_main() {
                Some("tessellation control barrier() must be in main()")
            } else if self.stage_layout.returned_from_main {
                Some("tessellation control barrier() cannot be placed after a return from main()")
            } else {
                None
            };
        if let Some(reason) = reason {
            self.error(span, invalid("barrier", reason));
        }
    }

    pub(crate) fn viewport_layer_extension(&mut self, span: Span, name: &str) {
        if !matches!(name, "gl_Layer" | "gl_ViewportIndex")
            || !matches!(
                self.stage(),
                Stage::Vertex | Stage::TessControl | Stage::TessEvaluation
            )
        {
            return;
        }
        match self.extensions.request(&VIEWPORT_LAYER_EXTENSIONS) {
            Request::Enabled => {}
            Request::Warned(extension) => self.warnings.push(Diagnostic {
                span,
                kind: DiagnosticKind::ExtensionWarned {
                    extension,
                    feature: alloc::string::String::from(name),
                },
            }),
            Request::Missing => self.error(
                span,
                DiagnosticKind::ExtensionRequired {
                    feature: alloc::string::String::from(name),
                    extensions: VIEWPORT_LAYER_EXTENSIONS.join(", "),
                },
            ),
        }
    }
}
