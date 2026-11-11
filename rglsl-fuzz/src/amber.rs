use std::fmt::Write as _;

use crate::error::Error;
use crate::job::ShaderJob;

pub const FRAMEBUFFER_SIZE: u32 = 256;

const VERTEX_SHADER: &str = "#version 450
layout(location = 0) in vec4 _GLF_position;
void main() {
    gl_Position = _GLF_position;
}
";

fn data_type(function: &str) -> Option<String> {
    let rest = function.strip_prefix("glUniform")?;
    let rest = rest.strip_suffix('v').unwrap_or(rest);
    if let Some(shape) = rest.strip_prefix("Matrix") {
        let shape = shape.strip_suffix('f')?;
        let (columns, rows) = shape.split_once('x').unwrap_or((shape, shape));
        return Some(format!("mat{columns}x{rows}<float>"));
    }
    let (count, scalar) = if let Some(count) = rest.strip_suffix("ui") {
        (count, "uint32")
    } else if let Some(count) = rest.strip_suffix('i') {
        (count, "int32")
    } else if let Some(count) = rest.strip_suffix('f') {
        (count, "float")
    } else {
        return None;
    };
    Some(match count {
        "1" => scalar.to_owned(),
        "2" | "3" | "4" => format!("vec{count}<{scalar}>"),
        _ => return None,
    })
}

pub fn amber_script(job: &ShaderJob) -> Result<String, Error> {
    let emitted = job.emit();
    let mut fragment = None;
    for (extension, text) in &emitted.shaders {
        match extension.as_str() {
            "frag" => fragment = Some(text.clone()),
            _ => {
                return Err(Error::Unsupported(format!(
                    "Amber scripts for {extension} shaders"
                )))
            }
        }
    }
    let fragment =
        fragment.ok_or_else(|| Error::Unsupported(String::from("no fragment shader")))?;
    let mut script = String::from("#!amber\n\n");
    let _ = writeln!(
        script,
        "SHADER vertex vertex_shader GLSL\n{VERTEX_SHADER}END\n"
    );
    let _ = writeln!(
        script,
        "SHADER fragment fragment_shader GLSL\n{}\nEND\n",
        fragment.trim_end()
    );
    let mut binds = Vec::new();
    for name in job.pipeline.uniform_names() {
        let Some(function) = job.pipeline.function(&name) else {
            continue;
        };
        if job.pipeline.is_sampler(&name) {
            let Some(binding) = job.pipeline.binding(&name) else {
                continue;
            };
            let _ = writeln!(
                script,
                "IMAGE {name} FORMAT R8G8B8A8_UNORM DIM_2D WIDTH 8 HEIGHT 8 FILL 0.5"
            );
            let _ = writeln!(script, "SAMPLER {name}_sampler");
            binds.push(format!(
                "  BIND BUFFER {name} AS combined_image_sampler SAMPLER {name}_sampler DESCRIPTOR_SET 0 BINDING {binding}"
            ));
            continue;
        }
        let Some(ty) = data_type(&function) else {
            continue;
        };
        let values: Vec<String> = job.pipeline.args(&name);
        let _ = writeln!(
            script,
            "BUFFER {name} DATA_TYPE {ty} STD140 DATA\n {}\nEND",
            values.join(" ")
        );
        if job.pipeline.is_push_constant(&name) {
            binds.push(format!("  BIND BUFFER {name} AS push_constant"));
        } else if let Some(binding) = job.pipeline.binding(&name) {
            binds.push(format!(
                "  BIND BUFFER {name} AS uniform DESCRIPTOR_SET 0 BINDING {binding}"
            ));
        }
    }
    let _ = writeln!(script, "BUFFER framebuffer FORMAT B8G8R8A8_UNORM\n");
    let _ = writeln!(script, "PIPELINE graphics pipeline");
    let _ = writeln!(script, "  ATTACH vertex_shader");
    let _ = writeln!(script, "  ATTACH fragment_shader");
    let _ = writeln!(
        script,
        "  FRAMEBUFFER_SIZE {FRAMEBUFFER_SIZE} {FRAMEBUFFER_SIZE}"
    );
    let _ = writeln!(script, "  BIND BUFFER framebuffer AS color LOCATION 0");
    for bind in binds {
        let _ = writeln!(script, "{bind}");
    }
    let _ = writeln!(script, "END\n");
    let _ = writeln!(script, "CLEAR_COLOR pipeline 0 0 0 255");
    let _ = writeln!(script, "CLEAR pipeline");
    let _ = writeln!(
        script,
        "RUN pipeline DRAW_RECT POS 0 0 SIZE {FRAMEBUFFER_SIZE} {FRAMEBUFFER_SIZE}"
    );
    Ok(script)
}
