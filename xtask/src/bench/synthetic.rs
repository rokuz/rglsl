use std::fmt::Write as _;

#[derive(Debug, Clone, Copy)]
pub struct Sizes {
    pub statements: usize,
    pub blocks: usize,
    pub depth: usize,
    pub functions: usize,
    pub nesting: usize,
}

impl Sizes {
    pub const DEFAULT: Self = Self {
        statements: 20000,
        blocks: 2000,
        depth: 5000,
        functions: 5000,
        nesting: 1000,
    };
}

pub fn shaders(sizes: Sizes) -> Vec<(String, String)> {
    vec![
        ("trivial.comp".into(), TRIVIAL.into()),
        ("long_function.comp".into(), long_function(sizes.statements)),
        ("many_uniforms.frag".into(), many_uniforms(sizes.blocks)),
        ("deep_expression.frag".into(), deep_expression(sizes.depth)),
        (
            "many_functions.comp".into(),
            many_functions(sizes.functions),
        ),
        ("nested_control.frag".into(), nested_control(sizes.nesting)),
    ]
}

const TRIVIAL: &str = "#version 450
layout(local_size_x = 1) in;
void main()
{
}
";

const COMPUTE_HEADER: &str = "#version 450
layout(local_size_x = 64) in;
layout(std430, set = 0, binding = 0) buffer Data { float values[]; };
";

const FRAGMENT_HEADER: &str = "#version 450
layout(location = 0) in vec4 inColor;
layout(location = 0) out vec4 outColor;
";

pub fn long_function(statements: usize) -> String {
    let mut text = String::from(COMPUTE_HEADER);
    text.push_str("void main()\n{\n    uint index = gl_GlobalInvocationID.x;\n");
    text.push_str("    float v0 = values[index];\n    float v1 = v0 * 0.5;\n");
    for k in 2..statements.max(2) {
        let _ = writeln!(
            text,
            "    float v{k} = v{} * 1.0001 + v{} - float({}) * 0.25;",
            k - 1,
            k - 2,
            k % 7
        );
        if k % 50 == 0 {
            let _ = writeln!(
                text,
                "    if (v{k} > 1000.0) {{ v{k} = sqrt(v{k}); }} else {{ v{k} = v{k} * 0.75 + float(index); }}"
            );
        }
    }
    let _ = writeln!(text, "    values[index] = v{};\n}}", statements.max(2) - 1);
    text
}

pub fn many_uniforms(blocks: usize) -> String {
    let mut text = String::from(FRAGMENT_HEADER);
    for block in 0..blocks {
        let _ = writeln!(
            text,
            "layout(std140, set = {}, binding = {}) uniform Block{block}\n{{\n    vec4 color{block};\n    mat4 transform{block};\n    float weights{block}[4];\n    ivec2 offset{block};\n}} block{block};",
            block / 100,
            block % 100
        );
    }
    let samplers = blocks / 4;
    let sampler_set = blocks.div_ceil(100);
    for sampler in 0..samplers {
        let _ = writeln!(
            text,
            "layout(set = {sampler_set}, binding = {sampler}) uniform sampler2D texture{sampler};"
        );
    }
    text.push_str("void main()\n{\n    vec4 sum = inColor;\n");
    for block in 0..blocks {
        let _ = writeln!(
            text,
            "    sum += block{block}.transform{block} * block{block}.color{block} * block{block}.weights{block}[{}] + vec4(block{block}.offset{block}, 0.0, 1.0);",
            block % 4
        );
    }
    for sampler in 0..samplers {
        let _ = writeln!(
            text,
            "    sum += texture(texture{sampler}, sum.xy * {}.0);",
            sampler + 1
        );
    }
    text.push_str("    outColor = sum;\n}\n");
    text
}

pub fn deep_expression(depth: usize) -> String {
    let mut text = String::from(FRAGMENT_HEADER);
    text.push_str("float step1(float x) { return x * 0.999 + 0.001; }\n");
    text.push_str("void main()\n{\n    float x = inColor.x;\n    float left = ");
    text.push_str(&"(".repeat(depth));
    text.push('x');
    for level in 0..depth {
        let operator = match level % 4 {
            0 => '+',
            1 => '*',
            2 => '-',
            _ => '/',
        };
        let _ = write!(text, " {operator} {}.5)", level % 9 + 1);
    }
    text.push_str(";\n    float right = ");
    let calls = depth / 2;
    text.push_str(&"step1(".repeat(calls));
    text.push_str("inColor.y");
    text.push_str(&")".repeat(calls));
    text.push_str(";\n    outColor = vec4(left, right, inColor.zw);\n}\n");
    text
}

pub fn many_functions(functions: usize) -> String {
    let mut text = String::from(COMPUTE_HEADER);
    text.push_str("float f0(float x, int k) { return x + float(k); }\n");
    for function in 1..functions.max(1) {
        let previous = function - 1;
        let _ = writeln!(
            text,
            "float f{function}(float x, int k)\n{{\n    float y = f{previous}(x * 1.01, k + {function});\n    if (y > float({function})) {{ y -= x; }}\n    return y;\n}}"
        );
    }
    let _ = writeln!(
        text,
        "void main()\n{{\n    uint index = gl_GlobalInvocationID.x;\n    values[index] = f{}(values[index], int(index));\n}}",
        functions.max(1) - 1
    );
    text
}

pub fn nested_control(nesting: usize) -> String {
    let mut text = String::from(FRAGMENT_HEADER);
    text.push_str("void main()\n{\n    vec4 acc = inColor;\n");
    for level in 0..nesting {
        let indent = "    ".repeat(level + 1);
        match level % 3 {
            0 => {
                let _ = writeln!(
                    text,
                    "{indent}if (acc.x > {}.0) {{\n{indent}    acc.y += 1.0;",
                    level % 5
                );
            }
            1 => {
                let _ = writeln!(
                    text,
                    "{indent}for (int i{level} = 0; i{level} < 2; ++i{level}) {{\n{indent}    acc.z += float(i{level});"
                );
            }
            _ => {
                let _ = writeln!(
                    text,
                    "{indent}while (acc.w < {}.0) {{\n{indent}    acc.w += 1.0;",
                    level + 2
                );
            }
        }
    }
    for level in (0..nesting).rev() {
        let indent = "    ".repeat(level + 1);
        let _ = writeln!(text, "{indent}}}");
    }
    text.push_str("    outColor = acc;\n}\n");
    text
}

#[cfg(test)]
mod tests {
    use super::*;

    fn balanced(text: &str) -> bool {
        let mut depth = 0i64;
        for c in text.chars() {
            match c {
                '(' | '{' => depth += 1,
                ')' | '}' => depth -= 1,
                _ => {}
            }
            if depth < 0 {
                return false;
            }
        }
        depth == 0
    }

    #[test]
    fn generated_shaders_are_balanced() {
        let sizes = Sizes {
            statements: 120,
            blocks: 8,
            depth: 30,
            functions: 10,
            nesting: 9,
        };
        for (name, text) in shaders(sizes) {
            assert!(text.starts_with("#version 450\n"), "{name}");
            assert!(balanced(&text), "{name}");
            assert!(text.contains("void main()"), "{name}");
        }
    }

    #[test]
    fn sizes_scale_the_shaders() {
        assert!(long_function(1000).len() > 10 * long_function(100).len() / 2);
        assert_eq!(deep_expression(40).matches("step1(").count(), 21);
        assert_eq!(many_functions(25).matches("\nfloat f").count(), 25);
    }
}
