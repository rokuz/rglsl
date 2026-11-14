use std::collections::BTreeMap;
use std::path::Path;
use std::process::Command;
use std::time::Duration;

use anyhow::{Result, bail};
use rglsl_ast::Span;
use rglsl_sema::scope::{Direction, Function, FunctionControl, Parameter, Qualifiers};
use rglsl_sema::types::{ArraySize, Opaque, Scalar};
use rglsl_sema::{Type, TypeRegistry};
use rglsl_types::ShaderStage as Stage;

use crate::process::{self, Exit};

#[derive(Debug, Clone)]
pub struct Prototype {
    pub name: String,
    pub text: String,
    pub function: Option<Function>,
    pub extensions: Vec<String>,
}

#[derive(Debug, Clone)]
pub struct Variable {
    pub name: String,
    pub text: String,
    pub ty: Option<Type>,
    pub output: bool,
    pub extensions: Vec<String>,
}

#[derive(Debug, Default)]
pub struct Table {
    pub prototypes: BTreeMap<String, Prototype>,
    pub variables: BTreeMap<String, Variable>,
}

const QUALIFIERS: &[&str] = &[
    "global",
    "const",
    "coherent",
    "volatile",
    "nontemporal",
    "readonly",
    "writeonly",
    "restrict",
    "devicecoherent",
    "queuefamilycoherent",
    "workgroupcoherent",
    "subgroupcoherent",
    "shadercallcoherent",
    "nonprivate",
    "highp",
    "mediump",
    "lowp",
    "smooth",
    "flat",
    "noperspective",
    "centroid",
    "sample",
    "patch",
    "perprimitiveNV",
    "perviewNV",
    "pertaskNV",
    "invariant",
    "precise",
    "uniform",
    "buffer",
    "shared",
];

fn scalar(word: &str) -> Option<Scalar> {
    Scalar::ALL
        .into_iter()
        .find(|scalar| scalar.keyword() == word)
}

fn element(words: &[&str]) -> Option<Type> {
    match words {
        ["void"] => Some(Type::VOID),
        [word] => scalar(word)
            .map(Type::scalar)
            .or_else(|| Opaque::from_keyword(word).map(Type::opaque)),
        [size, "component", "vector", "of", word] => {
            Some(Type::vector(scalar(word)?, size.parse().ok()?))
        }
        [shape, "matrix", "of", word] => {
            let (columns, rows) = shape.split_once('X')?;
            Some(Type::matrix(
                scalar(word)?,
                columns.parse().ok()?,
                rows.parse().ok()?,
            ))
        }
        _ => None,
    }
}

pub fn parse_type(text: &str) -> Option<Type> {
    let spaced = text
        .replace("-component", " component")
        .replace("-element", " element");
    let mut words: Vec<&str> = spaced.split_whitespace().collect();
    let mut dimensions = Vec::new();
    loop {
        match words.as_slice() {
            ["unsized", _, "element", "array", "of", ..] => {
                dimensions.push(ArraySize::Unsized);
                words.drain(..5);
            }
            [size, "element", "array", "of", ..] => {
                dimensions.push(ArraySize::Sized(size.parse().ok()?));
                words.drain(..4);
            }
            _ => break,
        }
    }
    Some(element(&words)?.with_dimensions(&dimensions))
}

fn without_layout(body: &str) -> String {
    let Some(start) = body.find("layout(") else {
        return body.to_string();
    };
    let end = body
        .get(start..)
        .and_then(|rest| rest.find(')'))
        .map_or(body.len(), |close| start + close + 1);
    format!(
        "{}{}",
        body.get(..start).unwrap_or_default(),
        body.get(end..).unwrap_or_default().trim_start()
    )
}

fn split_extensions(line: &str) -> (&str, Vec<String>) {
    let trimmed = line.trim_end();
    if let Some(open) = trimmed.rfind(" <")
        && trimmed.ends_with('>')
    {
        let list = trimmed.get(open + 2..trimmed.len() - 1).unwrap_or_default();
        let extensions = list
            .split(',')
            .map(str::trim)
            .filter(|extension| !extension.is_empty())
            .map(String::from)
            .collect();
        return (trimmed.get(..open).unwrap_or(trimmed), extensions);
    }
    (trimmed, Vec::new())
}

fn parameter(text: &str, function: &str) -> Option<Parameter> {
    let mut direction = Direction::In;
    let mut rest = Vec::new();
    for word in text.split_whitespace() {
        match word {
            "in" => direction = Direction::In,
            "out" => direction = Direction::Out,
            "inout" => direction = Direction::Inout,
            _ if QUALIFIERS.contains(&word) && rest.is_empty() => {}
            _ => rest.push(word),
        }
    }
    if rest.starts_with(&["unknown", "type"]) && function.starts_with("hitObject")
        || rest.starts_with(&["unknown", "type"]) && function.starts_with("reorderThread")
    {
        let keyword = if function.ends_with("NV") {
            "hitObjectNV"
        } else {
            "hitObjectEXT"
        };
        return Some(Parameter::new(
            Type::opaque(Opaque::from_keyword(keyword)?),
            direction,
        ));
    }
    let whole = rest.join(" ");
    let ty = parse_type(&whole).or_else(|| {
        let (_, without_name) = rest.split_last()?;
        parse_type(&without_name.join(" "))
    })?;
    Some(Parameter::new(ty, direction))
}

fn prototype(name: &str, body: &str, extensions: Vec<String>) -> Prototype {
    let text = body.trim().to_string();
    let function = (|| {
        let marker = format!(" {name}(");
        let at = body.find(&marker)?;
        let result = body.get(..at)?;
        let result_words: Vec<&str> = result
            .split_whitespace()
            .filter(|word| !QUALIFIERS.contains(word))
            .collect();
        let return_type = parse_type(&result_words.join(" "))?;
        let inside = body.get(at + marker.len()..body.rfind(')')?)?.trim();
        let parameters = if inside.is_empty() {
            Vec::new()
        } else {
            inside
                .split(',')
                .map(|text| parameter(text, name))
                .collect::<Option<Vec<_>>>()?
        };
        Some(Function {
            name: name.to_string(),
            return_type,
            return_qualifiers: Qualifiers::default(),
            parameters,
            defined: true,
            span: Span::default(),
            spirv_instruction: None,
            control: FunctionControl::default(),
        })
    })();
    Prototype {
        name: name.to_string(),
        text,
        function,
        extensions,
    }
}

fn variable(name: &str, body: &str, extensions: Vec<String>) -> Variable {
    let words: Vec<&str> = body.split_whitespace().collect();
    let output = words.contains(&"out");
    let start = words
        .iter()
        .position(|word| {
            !(QUALIFIERS.contains(word)
                || matches!(*word, "in" | "out" | "inout")
                || word.starts_with("gl_"))
        })
        .unwrap_or(words.len());
    let rest = words.get(start..).unwrap_or_default();
    let ty = (1..=rest.len())
        .rev()
        .find_map(|count| parse_type(&rest.get(..count)?.join(" ")));
    Variable {
        name: name.to_string(),
        text: body.trim().to_string(),
        ty,
        output,
        extensions,
    }
}

pub fn key(name: &str, function: &Function, types: &TypeRegistry) -> String {
    let parameters: Vec<String> = function
        .parameters
        .iter()
        .map(|parameter| parameter.ty.display(types).to_string())
        .collect();
    format!("{name}({})", parameters.join(","))
}

pub fn parse(text: &str, types: &TypeRegistry) -> Table {
    let mut table = Table::default();
    for line in text.lines() {
        let Some((name, body)) = line.split_once(": ") else {
            continue;
        };
        let body = without_layout(body.trim_start());
        let body = body.as_str();
        if name.contains(' ') || name.starts_with("anon@") {
            continue;
        }
        let (body, extensions) = split_extensions(body);
        if body.starts_with("global ") && body.contains('(') {
            let prototype = prototype(name, body, extensions);
            let key = prototype.function.as_ref().map_or_else(
                || format!("{name}<{}>", prototype.text),
                |function| key(name, function, types),
            );
            match table.prototypes.get_mut(&key) {
                Some(existing) => {
                    for extension in prototype.extensions {
                        if !existing.extensions.contains(&extension) {
                            existing.extensions.push(extension);
                        }
                    }
                }
                None => {
                    table.prototypes.insert(key, prototype);
                }
            }
        } else if body.contains("block{") {
            let output = body.contains(" out ") || body.starts_with("out ");
            let Some(open) = body.find("block{") else {
                continue;
            };
            let members = body
                .get(open + 6..body.rfind('}').unwrap_or(body.len()))
                .unwrap_or_default();
            for member in members.split(", ") {
                let Some(member_name) = member.split_whitespace().last() else {
                    continue;
                };
                let qualified = format!("{name}.{member_name}");
                table.variables.insert(
                    qualified.clone(),
                    Variable {
                        name: qualified,
                        text: member.trim().to_string(),
                        ty: None,
                        output,
                        extensions: extensions.clone(),
                    },
                );
            }
        } else if name.starts_with("gl_") && !body.ends_with(" block") && !body.starts_with("block")
        {
            table
                .variables
                .insert(name.to_string(), variable(name, body, extensions));
        }
    }
    table
}

pub fn dump(
    glslang: &Path,
    directory: &Path,
    version: u32,
    stage: Stage,
    target_env: &str,
    timeout: Duration,
) -> Result<String> {
    std::fs::create_dir_all(directory)?;
    let shader = directory.join(format!("dump{version}.{}", stage.extension()));
    std::fs::write(&shader, format!("#version {version}\nvoid main() {{}}\n"))?;
    let mut command = Command::new(glslang);
    command
        .args(["--target-env", target_env, "--dump-builtin-symbols", "-o"])
        .arg(shader.with_extension("spv"))
        .arg(&shader);
    let output = process::run(command, timeout)?;
    if matches!(output.exit, Exit::Signal | Exit::Timeout) {
        bail!(
            "glslang crashed dumping the built-ins of {}",
            shader.display()
        );
    }
    let text = format!("{}\n{}", output.stderr, output.stdout);
    if !text.contains("BuiltinSymbolTable") {
        bail!(
            "glslang printed no built-in symbol table for {}",
            shader.display()
        );
    }
    Ok(text)
}
