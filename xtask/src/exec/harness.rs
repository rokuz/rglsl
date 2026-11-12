use std::fmt::Write as _;

use super::reflect::{Interpolation, Scalar, ScalarKind, Varying, VaryingType};

pub const MAX_ATTACHMENTS: u32 = 8;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Attachment {
    pub location: u32,
    pub kind: ScalarKind,
    pub components: u32,
}

impl Attachment {
    pub fn format(self) -> &'static str {
        match (self.kind, self.components) {
            (ScalarKind::Sint, 1) => "R32_SINT",
            (ScalarKind::Sint, 2) => "R32G32_SINT",
            (ScalarKind::Sint, _) => "R32G32B32A32_SINT",
            (ScalarKind::Uint | ScalarKind::Bool, 1) => "R32_UINT",
            (ScalarKind::Uint | ScalarKind::Bool, 2) => "R32G32_UINT",
            (ScalarKind::Uint | ScalarKind::Bool, _) => "R32G32B32A32_UINT",
            (ScalarKind::Float, 1) => "R32_SFLOAT",
            (ScalarKind::Float, 2) => "R32G32_SFLOAT",
            (ScalarKind::Float, _) => "R32G32B32A32_SFLOAT",
        }
    }

    pub fn texel_components(self) -> u32 {
        match self.components {
            1 => 1,
            2 => 2,
            _ => 4,
        }
    }
}

pub fn simple_32(varying: &Varying) -> Result<(Scalar, u32), String> {
    match &varying.ty {
        VaryingType::Simple { scalar, count } if scalar.width == 32 => {
            if varying.component != 0 {
                return Err(format!(
                    "location {} uses a component qualifier",
                    varying.location
                ));
            }
            Ok((*scalar, *count))
        }
        VaryingType::Simple { scalar, .. } => Err(format!(
            "location {} has {}-bit components",
            varying.location, scalar.width
        )),
        VaryingType::Unsupported(what) => Err(format!("location {}: {what}", varying.location)),
    }
}

pub fn simple(varying: &Varying) -> Result<(Scalar, u32), String> {
    match &varying.ty {
        VaryingType::Simple { scalar, count }
            if matches!(scalar.width, 16 | 32 | 64) && scalar.kind != ScalarKind::Bool =>
        {
            if varying.component != 0 {
                return Err(format!(
                    "location {} uses a component qualifier",
                    varying.location
                ));
            }
            Ok((*scalar, *count))
        }
        VaryingType::Simple { scalar, .. } => Err(format!(
            "location {} has {}-bit components",
            varying.location, scalar.width
        )),
        VaryingType::Unsupported(what) => Err(format!("location {}: {what}", varying.location)),
    }
}

pub const EXPLICIT_TYPES: &str = "#extension GL_EXT_shader_explicit_arithmetic_types : require\n";

fn explicit_types<'a>(scalars: impl IntoIterator<Item = &'a Scalar>) -> &'static str {
    if scalars.into_iter().any(|scalar| scalar.width != 32) {
        EXPLICIT_TYPES
    } else {
        ""
    }
}

pub const fn locations(scalar: Scalar, count: u32) -> u32 {
    if scalar.width == 64 && count > 2 {
        2
    } else {
        1
    }
}

fn scalar_type(scalar: Scalar) -> &'static str {
    match (scalar.kind, scalar.width) {
        (ScalarKind::Float, 16) => "float16_t",
        (ScalarKind::Float, 64) => "double",
        (ScalarKind::Float, _) => "float",
        (ScalarKind::Sint, 16) => "int16_t",
        (ScalarKind::Sint, 64) => "int64_t",
        (ScalarKind::Sint, _) => "int",
        (ScalarKind::Uint | ScalarKind::Bool, 16) => "uint16_t",
        (ScalarKind::Uint | ScalarKind::Bool, 64) => "uint64_t",
        (ScalarKind::Uint | ScalarKind::Bool, _) => "uint",
    }
}

fn glsl_type(scalar: Scalar, count: u32) -> String {
    if count == 1 {
        return scalar_type(scalar).to_string();
    }
    let prefix = match (scalar.kind, scalar.width) {
        (ScalarKind::Float, 16) => "f16",
        (ScalarKind::Float, 64) => "d",
        (ScalarKind::Float, _) => "",
        (ScalarKind::Sint, 16) => "i16",
        (ScalarKind::Sint, 64) => "i64",
        (ScalarKind::Sint, _) => "i",
        (ScalarKind::Uint | ScalarKind::Bool, 16) => "u16",
        (ScalarKind::Uint | ScalarKind::Bool, 64) => "u64",
        (ScalarKind::Uint | ScalarKind::Bool, _) => "u",
    };
    format!("{prefix}vec{count}")
}

fn sized(scalar: Scalar, expression: String) -> String {
    if scalar.width == 32 {
        expression
    } else {
        format!("{}({expression})", scalar_type(scalar))
    }
}

fn qualifier(varying: &Varying, scalar: Scalar) -> &'static str {
    if scalar.kind != ScalarKind::Float {
        return "flat ";
    }
    match varying.interpolation {
        Interpolation::Flat => "flat ",
        Interpolation::NoPerspective => "noperspective ",
        Interpolation::Smooth => "",
    }
}

fn component_expression(
    scalar: Scalar,
    location: u32,
    component: u32,
    position: &str,
    index: &str,
) -> String {
    let l = f64::from(location);
    let c = f64::from(component);
    match scalar.kind {
        ScalarKind::Float => format!(
            "({position}.x * {:?} + {position}.y * {:?} + {:?})",
            0.25 * (l + c + 1.0),
            0.5 * (c + 1.0) - 0.125 * l,
            0.125 * (l + 1.0)
        ),
        ScalarKind::Sint => format!("({index} + {})", location * 4 + component),
        ScalarKind::Uint | ScalarKind::Bool => {
            format!("uint({index} + {})", location * 4 + component)
        }
    }
}

fn declarator(varying: &Varying) -> String {
    match varying.array {
        Some(length) => format!("v{}[{length}]", varying.location),
        None => format!("v{}", varying.location),
    }
}

fn elements(varying: &Varying) -> Vec<(u32, String)> {
    let stride = match &varying.ty {
        VaryingType::Simple { scalar, count } => locations(*scalar, *count),
        VaryingType::Unsupported(_) => 1,
    };
    match varying.array {
        Some(length) => (0..length)
            .map(|i| {
                (
                    varying.location + i * stride,
                    format!("v{}[{i}]", varying.location),
                )
            })
            .collect(),
        None => vec![(varying.location, format!("v{}", varying.location))],
    }
}

pub fn vertex_for_fragment(inputs: &[Varying]) -> Result<String, String> {
    let mut declarations = String::new();
    let mut body = String::new();
    let mut scalars = Vec::new();
    for varying in inputs {
        let (scalar, count) = simple(varying)?;
        scalars.push(scalar);
        let ty = glsl_type(scalar, count);
        let _ = writeln!(
            declarations,
            "layout(location = {}) {}out {ty} {};",
            varying.location,
            qualifier(varying, scalar),
            declarator(varying)
        );
        for (location, name) in elements(varying) {
            let components: Vec<String> = (0..count)
                .map(|c| {
                    sized(
                        scalar,
                        component_expression(scalar, location, c, "a_pos", "gl_VertexIndex"),
                    )
                })
                .collect();
            let _ = writeln!(body, "    {name} = {ty}({});", components.join(", "));
        }
    }
    let extension = explicit_types(&scalars);
    Ok(format!(
        "#version 450\n{extension}layout(location = 0) in vec4 a_pos;\n{declarations}void main() {{\n    gl_Position = a_pos;\n{body}}}\n"
    ))
}

pub fn fragment_for(outputs: &[Varying], mesh_nv: bool) -> (String, Vec<Attachment>, Vec<String>) {
    let mut declarations = String::new();
    let mut body =
        String::from("    o0 = vec4(gl_FragCoord.z, gl_FrontFacing ? 1.0 : 0.0, 1.0, 1.0);\n");
    let mut attachments = vec![Attachment {
        location: 0,
        kind: ScalarKind::Float,
        components: 4,
    }];
    let mut ignored = Vec::new();
    let mut scalars = Vec::new();
    for varying in outputs {
        let (scalar, count) = match simple(varying) {
            Ok(simple) => simple,
            Err(reason) => {
                ignored.push(reason);
                continue;
            }
        };
        let needed = varying.array.unwrap_or(1) as usize;
        if attachments.len() + needed > MAX_ATTACHMENTS as usize {
            ignored.push(format!(
                "location {}: more varyings than color attachments",
                varying.location
            ));
            continue;
        }
        scalars.push(scalar);
        let ty = glsl_type(scalar, count);
        let primitive = match (varying.per_primitive, mesh_nv) {
            (false, _) => "",
            (true, false) => "perprimitiveEXT ",
            (true, true) => "perprimitiveNV ",
        };
        let _ = writeln!(
            declarations,
            "layout(location = {}) {}{primitive}in {ty} {};",
            varying.location,
            qualifier(varying, scalar),
            declarator(varying)
        );
        let wide = Scalar {
            kind: scalar.kind,
            width: 32,
        };
        let out_ty = glsl_type(wide, 4);
        let zero = match scalar.kind {
            ScalarKind::Float => "0.0",
            ScalarKind::Sint => "0",
            ScalarKind::Uint | ScalarKind::Bool => "0u",
        };
        let padding: Vec<&str> = (count..4).map(|_| zero).collect();
        for (_, name) in elements(varying) {
            let location = u32::try_from(attachments.len()).unwrap_or(MAX_ATTACHMENTS);
            let value = if padding.is_empty() {
                name
            } else {
                format!("{name}, {}", padding.join(", "))
            };
            let _ = writeln!(
                declarations,
                "layout(location = {location}) out {out_ty} o{location};"
            );
            let _ = writeln!(body, "    o{location} = {out_ty}({value});");
            attachments.push(Attachment {
                location,
                kind: scalar.kind,
                components: 4,
            });
        }
    }
    let mesh = match (outputs.iter().any(|v| v.per_primitive), mesh_nv) {
        (false, _) => "",
        (true, false) => "#extension GL_EXT_mesh_shader : require\n",
        (true, true) => "#extension GL_NV_mesh_shader : require\n",
    };
    let extension = format!("{mesh}{}", explicit_types(&scalars));
    (
        format!(
            "#version 450\n{extension}{declarations}layout(location = 0) out vec4 o0;\nvoid main() {{\n{body}}}\n"
        ),
        attachments,
        ignored,
    )
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum ShaderKind {
    Vertex,
    TessControl,
    TessEval,
    Geometry,
    Task,
    Mesh,
    Fragment,
    Compute,
    RayGeneration,
    Miss,
    ClosestHit,
    AnyHit,
    Intersection,
    Callable,
}

impl ShaderKind {
    pub const fn amber(self) -> &'static str {
        match self {
            Self::Vertex => "vertex",
            Self::TessControl => "tessellation_control",
            Self::TessEval => "tessellation_evaluation",
            Self::Geometry => "geometry",
            Self::Task => "task",
            Self::Mesh => "mesh",
            Self::Fragment => "fragment",
            Self::Compute => "compute",
            Self::RayGeneration => "ray_generation",
            Self::Miss => "miss",
            Self::ClosestHit => "closest_hit",
            Self::AnyHit => "any_hit",
            Self::Intersection => "intersection",
            Self::Callable => "callable",
        }
    }

    pub const fn extension(self) -> &'static str {
        match self {
            Self::Vertex => "vert",
            Self::TessControl => "tesc",
            Self::TessEval => "tese",
            Self::Geometry => "geom",
            Self::Task => "task",
            Self::Mesh => "mesh",
            Self::Fragment => "frag",
            Self::Compute => "comp",
            Self::RayGeneration => "rgen",
            Self::Miss => "rmiss",
            Self::ClosestHit => "rchit",
            Self::AnyHit => "rahit",
            Self::Intersection => "rint",
            Self::Callable => "rcall",
        }
    }

    pub const fn target_env(self) -> &'static str {
        if self.is_ray_tracing() || matches!(self, Self::Task | Self::Mesh) {
            "vulkan1.2"
        } else {
            "vulkan1.0"
        }
    }

    pub const fn is_ray_tracing(self) -> bool {
        matches!(
            self,
            Self::RayGeneration
                | Self::Miss
                | Self::ClosestHit
                | Self::AnyHit
                | Self::Intersection
                | Self::Callable
        )
    }
}

pub const PATCH_VERTICES: u32 = 3;
const TESS_LEVEL: &str = "3.0";

fn tessellation_varying(varying: &Varying) -> Result<(Scalar, u32), String> {
    let (scalar, count) = simple(varying)?;
    if varying.array.is_some() {
        return Err(format!(
            "location {}: array varying between tessellation stages",
            varying.location
        ));
    }
    Ok((scalar, count))
}

pub fn control_for_evaluation(inputs: &[Varying]) -> Result<String, String> {
    let mut declarations = String::new();
    let mut body = String::from(
        "    gl_out[gl_InvocationID].gl_Position = gl_in[gl_InvocationID].gl_Position;\n",
    );
    let mut patch_body = String::new();
    let position = "gl_in[gl_InvocationID].gl_Position";
    let mut scalars = Vec::new();
    for varying in inputs {
        let (scalar, count) = tessellation_varying(varying)?;
        scalars.push(scalar);
        let ty = glsl_type(scalar, count);
        let location = varying.location;
        let components: Vec<String> = (0..count)
            .map(|c| {
                sized(
                    scalar,
                    if varying.patch {
                        component_expression(scalar, location, c, "vec4(0.25, -0.5, 0.0, 1.0)", "7")
                    } else {
                        component_expression(scalar, location, c, position, "gl_InvocationID")
                    },
                )
            })
            .collect();
        if varying.patch {
            let _ = writeln!(
                declarations,
                "layout(location = {location}) patch out {ty} p{location};"
            );
            let _ = writeln!(
                patch_body,
                "        p{location} = {ty}({});",
                components.join(", ")
            );
        } else {
            let _ = writeln!(
                declarations,
                "layout(location = {location}) out {ty} v{location}[];"
            );
            let _ = writeln!(
                body,
                "    v{location}[gl_InvocationID] = {ty}({});",
                components.join(", ")
            );
        }
    }
    let extension = explicit_types(&scalars);
    Ok(format!(
        "#version 450\n{extension}layout(vertices = {PATCH_VERTICES}) out;\n{declarations}void main() {{\n{body}    if (gl_InvocationID == 0) {{\n        gl_TessLevelOuter[0] = {TESS_LEVEL};\n        gl_TessLevelOuter[1] = {TESS_LEVEL};\n        gl_TessLevelOuter[2] = {TESS_LEVEL};\n        gl_TessLevelOuter[3] = {TESS_LEVEL};\n        gl_TessLevelInner[0] = {TESS_LEVEL};\n        gl_TessLevelInner[1] = {TESS_LEVEL};\n{patch_body}    }}\n}}\n"
    ))
}

pub fn evaluation_for_control(
    outputs: &[Varying],
    vertices: u32,
) -> Result<(String, Vec<Varying>), String> {
    let vertices = vertices.max(1);
    let corner = |i: u32| i % vertices;
    let mut declarations = String::new();
    let mut body = String::from(
        "    gl_Position = vec4(gl_TessCoord.x * 1.6 - 0.8, gl_TessCoord.y * 1.6 - 0.8, 0.5, 1.0);\n",
    );
    let mut forwarded = Vec::new();
    let mut scalars = Vec::new();
    for varying in outputs {
        let (scalar, count) = tessellation_varying(varying)?;
        scalars.push(scalar);
        let ty = glsl_type(scalar, count);
        let location = varying.location;
        let flat = scalar.kind != ScalarKind::Float;
        let value = if varying.patch {
            let _ = writeln!(
                declarations,
                "layout(location = {location}) patch in {ty} i{location};"
            );
            format!("i{location}")
        } else {
            let _ = writeln!(
                declarations,
                "layout(location = {location}) in {ty} i{location}[];"
            );
            if flat {
                format!("i{location}[0]")
            } else {
                format!(
                    "gl_TessCoord.x * i{location}[{}] + gl_TessCoord.y * i{location}[{}] + gl_TessCoord.z * i{location}[{}]",
                    corner(0),
                    corner(1),
                    corner(2)
                )
            }
        };
        let qualifier = if flat { "flat " } else { "" };
        let _ = writeln!(
            declarations,
            "layout(location = {location}) {qualifier}out {ty} v{location};"
        );
        let _ = writeln!(body, "    v{location} = {ty}({value});");
        forwarded.push(Varying {
            location,
            component: 0,
            ty: VaryingType::Simple { scalar, count },
            array: None,
            interpolation: if flat {
                Interpolation::Flat
            } else {
                Interpolation::Smooth
            },
            centroid: false,
            sample: false,
            patch: false,
            per_primitive: false,
        });
    }
    let extension = explicit_types(&scalars);
    Ok((
        format!(
            "#version 450\n{extension}layout(triangles) in;\n{declarations}void main() {{\n{body}}}\n"
        ),
        forwarded,
    ))
}

pub const DUMP_SHADER: &str = "#version 450\nlayout(local_size_x = 1) in;\nvoid main() {}\n";

#[cfg(test)]
mod tests {
    use super::*;

    fn varying(location: u32, kind: ScalarKind, count: u32) -> Varying {
        Varying {
            location,
            component: 0,
            ty: VaryingType::Simple {
                scalar: Scalar { kind, width: 32 },
                count,
            },
            array: None,
            interpolation: Interpolation::Smooth,
            centroid: false,
            sample: false,
            patch: false,
            per_primitive: false,
        }
    }

    #[test]
    fn vertex_harness_feeds_every_input() -> anyhow::Result<()> {
        let source = vertex_for_fragment(&[
            varying(0, ScalarKind::Float, 4),
            varying(2, ScalarKind::Sint, 1),
        ])
        .map_err(anyhow::Error::msg)?;
        assert!(source.contains("layout(location = 0) out vec4 v0;"));
        assert!(source.contains("layout(location = 2) flat out int v2;"));
        assert!(source.contains("v2 = int((gl_VertexIndex + 8));"));
        assert!(source.contains("gl_Position = a_pos;"));
        Ok(())
    }

    #[test]
    fn harnesses_handle_arrays() -> anyhow::Result<()> {
        let mut array = varying(2, ScalarKind::Float, 4);
        array.array = Some(2);
        let source =
            vertex_for_fragment(std::slice::from_ref(&array)).map_err(anyhow::Error::msg)?;
        assert!(source.contains("layout(location = 2) out vec4 v2[2];"));
        assert!(source.contains("v2[1] = vec4("));
        let (source, attachments, ignored) = fragment_for(&[array], false);
        assert!(ignored.is_empty());
        assert_eq!(attachments.len(), 3);
        assert!(source.contains("layout(location = 2) in vec4 v2[2];"));
        assert!(source.contains("o2 = vec4(v2[1]);"));
        Ok(())
    }

    #[test]
    fn harnesses_pass_16_and_64_bit_varyings() -> anyhow::Result<()> {
        let mut half = varying(0, ScalarKind::Float, 3);
        half.ty = VaryingType::Simple {
            scalar: Scalar {
                kind: ScalarKind::Float,
                width: 16,
            },
            count: 3,
        };
        let mut double = varying(1, ScalarKind::Float, 3);
        double.ty = VaryingType::Simple {
            scalar: Scalar {
                kind: ScalarKind::Float,
                width: 64,
            },
            count: 3,
        };
        double.interpolation = Interpolation::Flat;
        double.array = Some(2);
        let mut long = varying(5, ScalarKind::Sint, 1);
        long.ty = VaryingType::Simple {
            scalar: Scalar {
                kind: ScalarKind::Sint,
                width: 64,
            },
            count: 1,
        };
        let inputs = [half, double, long];
        let source = vertex_for_fragment(&inputs).map_err(anyhow::Error::msg)?;
        assert!(source.starts_with(&format!("#version 450\n{EXPLICIT_TYPES}")));
        assert!(source.contains("layout(location = 0) out f16vec3 v0;"));
        assert!(source.contains("v0 = f16vec3(float16_t("));
        assert!(source.contains("layout(location = 1) flat out dvec3 v1[2];"));
        assert!(source.contains("v1[1] = dvec3(double((a_pos.x * 1.0"));
        assert!(source.contains("layout(location = 5) flat out int64_t v5;"));
        assert!(source.contains("v5 = int64_t(int64_t((gl_VertexIndex + 20)));"));
        let (source, attachments, ignored) = fragment_for(&inputs, false);
        assert!(ignored.is_empty());
        assert_eq!(attachments.len(), 5);
        assert!(source.contains(EXPLICIT_TYPES));
        assert!(source.contains("o1 = vec4(v0, 0.0);"));
        assert!(source.contains("o3 = vec4(v1[1], 0.0);"));
        assert!(source.contains("o4 = ivec4(v5, 0, 0, 0);"));
        Ok(())
    }

    #[test]
    fn vertex_harness_rejects_blocks() {
        let mut block = varying(1, ScalarKind::Float, 4);
        block.ty = VaryingType::Unsupported("block or struct varying".into());
        assert!(vertex_for_fragment(&[block]).is_err());
    }

    #[test]
    fn fragment_harness_writes_varyings_to_attachments() {
        let mut outputs = vec![
            varying(3, ScalarKind::Float, 2),
            varying(5, ScalarKind::Uint, 3),
        ];
        outputs.push(Varying {
            ty: VaryingType::Unsupported("array varying".into()),
            ..varying(7, ScalarKind::Float, 1)
        });
        let (source, attachments, ignored) = fragment_for(&outputs, false);
        assert_eq!(attachments.len(), 3);
        assert_eq!(attachments[2].format(), "R32G32B32A32_UINT");
        assert_eq!(ignored.len(), 1);
        assert!(source.contains("layout(location = 3) in vec2 v3;"));
        assert!(source.contains("o1 = vec4(v3, 0.0, 0.0);"));
        assert!(source.contains("layout(location = 5) flat in uvec3 v5;"));
        assert!(source.contains("o2 = uvec4(v5, 0u);"));
    }

    #[test]
    fn nv_mesh_fragments_read_per_primitive_inputs_with_the_nv_qualifier() {
        let mut primitive = varying(1, ScalarKind::Uint, 1);
        primitive.per_primitive = true;
        let (nv, _, _) = fragment_for(&[primitive.clone()], true);
        assert!(nv.contains("#extension GL_NV_mesh_shader : require\n"));
        assert!(nv.contains("perprimitiveNV in uint v1;"));
        let (ext, _, _) = fragment_for(&[primitive], false);
        assert!(ext.contains("#extension GL_EXT_mesh_shader : require\n"));
        assert!(ext.contains("perprimitiveEXT in uint v1;"));
    }

    #[test]
    fn tessellation_harnesses_forward_varyings() -> anyhow::Result<()> {
        let mut patch = varying(4, ScalarKind::Float, 2);
        patch.patch = true;
        let source = control_for_evaluation(&[varying(1, ScalarKind::Uint, 1), patch.clone()])
            .map_err(anyhow::Error::msg)?;
        assert!(source.contains("layout(vertices = 3) out;"));
        assert!(source.contains("layout(location = 1) out uint v1[];"));
        assert!(source.contains("v1[gl_InvocationID] = uint(uint(gl_InvocationID + 4));"));
        assert!(source.contains("layout(location = 4) patch out vec2 p4;"));
        assert!(source.contains("gl_TessLevelInner[1] = 3.0;"));
        let (source, forwarded) =
            evaluation_for_control(&[varying(0, ScalarKind::Float, 4), patch], 4)
                .map_err(anyhow::Error::msg)?;
        assert!(source.contains("layout(location = 0) in vec4 i0[];"));
        assert!(source.contains("gl_TessCoord.z * i0[2]"));
        assert!(source.contains("layout(location = 4) patch in vec2 i4;"));
        assert_eq!(forwarded.len(), 2);
        let mut array = varying(2, ScalarKind::Float, 4);
        array.array = Some(2);
        assert!(evaluation_for_control(&[array], 3).is_err());
        Ok(())
    }
}
