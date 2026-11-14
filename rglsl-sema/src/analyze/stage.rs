use rglsl_ast::Span;
use rglsl_types::extension::Extension;

use super::Analyzer;
use crate::diagnostic::DiagnosticKind;
use crate::scope::{LayoutEntry, Qualifiers, Storage};
use rglsl_types::ShaderStage;

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

const fn table(stage: ShaderStage) -> &'static [(&'static str, Kind)] {
    match stage {
        ShaderStage::Geometry => GEOMETRY,
        ShaderStage::TessEvaluation => TESS_EVALUATION,
        ShaderStage::TessControl => TESS_CONTROL,
        ShaderStage::Mesh => MESH,
        _ => &[],
    }
}

fn shader_layouts(
    stage: ShaderStage,
    qualifiers: &Qualifiers,
) -> impl Iterator<Item = (&'static str, Kind, &LayoutEntry)> {
    qualifiers.layout.iter().filter_map(move |entry| {
        table(stage)
            .iter()
            .find(|&&(name, _)| entry.name == name)
            .map(|&(name, kind)| (name, kind, entry))
    })
}

const PRE_RASTERIZATION: &[ShaderStage] = &[
    ShaderStage::Vertex,
    ShaderStage::TessControl,
    ShaderStage::TessEvaluation,
    ShaderStage::Geometry,
];

const fn invalid(qualifier: &'static str, reason: &'static str) -> DiagnosticKind {
    DiagnosticKind::InvalidQualifier { qualifier, reason }
}

impl Analyzer<'_> {
    pub(crate) fn passthrough_extension(&mut self, qualifiers: &Qualifiers) {
        let span = qualifiers
            .layout
            .iter()
            .find(|entry| entry.name == "passthrough")
            .map(|entry| entry.span);
        if let Some(span) = span.filter(|_| self.stage_is(ShaderStage::Geometry)) {
            self.require_extension(
                span,
                Extension::NvGeometryShaderPassthrough,
                "geometry shader passthrough",
            );
        }
    }

    pub(crate) fn view_layout_extensions(&mut self, qualifiers: &Qualifiers) {
        let required: alloc::vec::Vec<(Span, &'static [Extension], &'static str, bool)> =
            qualifiers
                .layout
                .iter()
                .filter_map(|entry| {
                    let (extension, what, fragment): (&'static [Extension], _, _) =
                        match entry.name.as_str() {
                            "viewport_relative" => {
                                (&[Extension::NvViewportArray2], "viewport_relative", false)
                            }
                            "secondary_view_offset" => (
                                &[Extension::NvStereoViewRendering],
                                "secondary_view_offset",
                                false,
                            ),
                            "override_coverage" => (
                                &[Extension::NvSampleMaskOverrideCoverage],
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
                    stage == ShaderStage::Fragment
                } else {
                    PRE_RASTERIZATION.contains(&stage)
                };
                applies.then_some(extension)
            });
        }
    }

    pub(crate) fn object_layout(&self, qualifiers: &Qualifiers) -> Option<Span> {
        let shader: alloc::vec::Vec<Span> = self.stage_map(|stage| {
            shader_layouts(stage, qualifiers)
                .map(|(_, _, entry)| entry.span)
                .collect()
        });
        qualifiers
            .layout
            .iter()
            .filter(|entry| !shader.contains(&entry.span))
            .find(|entry| {
                ![
                    "constant_id",
                    "input_attachment_index",
                    "buffer_reference_align",
                ]
                .iter()
                .any(|name| entry.name == *name)
            })
            .map(|entry| entry.span)
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
                .map(|(name, kind, entry)| (name, kind, entry.span, entry.value.constant()))
                .collect();
        let input = qualifiers.storage == Storage::In;
        let output = qualifiers.storage == Storage::Out;
        for (name, kind, span, value) in found {
            match kind {
                Kind::Vertices => {
                    if value == Some(0) && stage == ShaderStage::TessControl {
                        self.error(span, invalid(name, "must be greater than 0"));
                        continue;
                    }
                    let limit = i64::from(self.options.limits.max_geometry_output_vertices);
                    if stage == ShaderStage::Geometry && value.is_some_and(|value| value > limit) {
                        self.error(
                            span,
                            invalid(
                                name,
                                "too large, must be less than gl_MaxGeometryOutputVertices",
                            ),
                        );
                    }
                    if stage == ShaderStage::Mesh {
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
        if !self.stage_is(ShaderStage::TessControl) {
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
}
