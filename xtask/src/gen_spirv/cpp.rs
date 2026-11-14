use std::collections::BTreeMap;

use anyhow::{Context, Result, bail};

#[derive(Default)]
pub struct Symbols {
    values: BTreeMap<String, Option<u32>>,
    strings: BTreeMap<String, String>,
}

impl Symbols {
    pub fn add_header(&mut self, text: &str) {
        let mut scope: Option<(String, Option<u32>)> = None;
        for raw in text.lines() {
            let line = strip_comment(raw).trim();
            if let Some(rest) = line.strip_prefix("enum class ") {
                let name = rest.split([' ', ':', '{']).next().unwrap_or_default();
                scope = Some((format!("{name}::"), None));
                continue;
            }
            if line.starts_with("enum ") || line == "enum {" {
                scope = Some((String::new(), None));
                continue;
            }
            if line.starts_with('}') {
                scope = None;
                continue;
            }
            if let Some((name, value)) = line
                .split_once("const char* const ")
                .and_then(|(_, rest)| rest.split_once('='))
            {
                let value = value.trim().trim_end_matches(';').trim();
                if let Some(value) = value.strip_prefix('"').and_then(|v| v.strip_suffix('"')) {
                    self.strings
                        .insert(name.trim().to_string(), value.to_string());
                }
                continue;
            }
            let Some((prefix, previous)) = scope.as_mut() else {
                continue;
            };
            let entry = line.trim_end_matches(',').trim();
            if entry.is_empty() || entry.starts_with('{') {
                continue;
            }
            let (name, value) = match entry.split_once('=') {
                Some((name, value)) => (name.trim(), parse_integer(value.trim())),
                None => (entry, previous.and_then(|value| value.checked_add(1))),
            };
            if !is_identifier(name) {
                continue;
            }
            *previous = value;
            self.values.insert(format!("{prefix}{name}"), value);
        }
    }

    pub fn value(&self, name: &str) -> Result<u32> {
        match self.values.get(name) {
            Some(Some(value)) => Ok(*value),
            Some(None) => bail!("glslang's headers give `{name}` a value that is not a number"),
            None => bail!("glslang's headers do not define `{name}`"),
        }
    }

    pub fn find(&self, name: &str) -> Option<u32> {
        self.values.get(name).copied().flatten()
    }

    pub fn string(&self, name: &str) -> Result<&str> {
        self.strings
            .get(name)
            .map(String::as_str)
            .with_context(|| format!("glslang's headers do not define the string `{name}`"))
    }
}

fn is_identifier(text: &str) -> bool {
    !text.is_empty() && text.chars().all(|c| c.is_ascii_alphanumeric() || c == '_')
}

pub fn strip_comment(line: &str) -> &str {
    let mut in_string = false;
    let bytes = line.as_bytes();
    for (index, &byte) in bytes.iter().enumerate() {
        match byte {
            b'"' => in_string = !in_string,
            b'/' if !in_string && bytes.get(index + 1) == Some(&b'/') => {
                return line.get(..index).unwrap_or(line);
            }
            _ => {}
        }
    }
    line
}

pub fn parse_integer(text: &str) -> Option<u32> {
    let text = text.trim().trim_end_matches(['u', 'U']);
    match text.strip_prefix("0x").or_else(|| text.strip_prefix("0X")) {
        Some(hex) => u32::from_str_radix(hex, 16).ok(),
        None => text.parse().ok(),
    }
}

pub struct Evaluator<'a> {
    pub symbols: &'a Symbols,
    pub constants: BTreeMap<String, u32>,
}

impl Evaluator<'_> {
    pub fn eval(&self, expression: &str) -> Result<u32> {
        let mut total = 0_u32;
        for term in expression.split('+') {
            let value = self.term(term.trim())?;
            total = total
                .checked_add(value)
                .with_context(|| format!("`{expression}` overflows"))?;
        }
        Ok(total)
    }

    fn term(&self, term: &str) -> Result<u32> {
        let term = term
            .strip_prefix("(int)")
            .or_else(|| term.strip_prefix("(unsigned)"))
            .unwrap_or(term)
            .trim();
        let term = term
            .strip_prefix("enumCast(")
            .and_then(|inner| inner.strip_suffix(')'))
            .unwrap_or(term)
            .trim();
        if let Some(value) = parse_integer(term) {
            return Ok(value);
        }
        if let Some(&value) = self.constants.get(term) {
            return Ok(value);
        }
        self.symbols.value(term)
    }
}

pub struct Case {
    pub sets: Vec<String>,
    pub value: u32,
    pub name: String,
}

pub fn function_body<'a>(text: &'a str, signature: &str) -> Result<&'a str> {
    let start = text
        .match_indices(signature)
        .map(|(start, _)| start)
        .find(|&start| {
            let line = text.get(start..).unwrap_or_default().lines().next();
            !line.unwrap_or_default().trim_end().ends_with(';')
        })
        .with_context(|| format!("glslang's source has no definition of `{signature}`"))?;
    let body = text.get(start..).unwrap_or_default();
    let end = body
        .find("\n}")
        .with_context(|| format!("`{signature}` has no end"))?;
    Ok(body.get(..end).unwrap_or_default())
}

pub fn switch_cases(body: &str, evaluator: &Evaluator) -> Result<Vec<Case>> {
    let mut cases = Vec::new();
    let mut pending: Vec<u32> = Vec::new();
    let mut sets: Vec<String> = Vec::new();
    let mut fresh_sets = true;
    for raw in body.lines() {
        let mut line = strip_comment(raw);
        loop {
            let case = line.find("case ");
            let default = line.find("default:");
            let ret = line.find("return \"");
            let strcmp = line.find("strcmp(name, spv::");
            let first = [case, default, ret, strcmp].into_iter().flatten().min();
            let Some(first) = first else {
                break;
            };
            let rest = line.get(first..).unwrap_or_default();
            if Some(first) == case {
                let expression = rest.get("case ".len()..).unwrap_or_default();
                let end = case_label_end(expression)
                    .with_context(|| format!("unterminated case label in `{raw}`"))?;
                let label = expression.get(..end).unwrap_or_default();
                pending.push(evaluator.eval(label)?);
                line = expression.get(end + 1..).unwrap_or_default();
                fresh_sets = true;
            } else if Some(first) == default {
                pending.clear();
                line = rest.get("default:".len()..).unwrap_or_default();
            } else if Some(first) == ret {
                let literal = rest.get("return \"".len()..).unwrap_or_default();
                let end = literal
                    .find('"')
                    .with_context(|| format!("unterminated string in `{raw}`"))?;
                let name = literal.get(..end).unwrap_or_default();
                for value in pending.drain(..) {
                    cases.push(Case {
                        sets: sets.clone(),
                        value,
                        name: name.to_string(),
                    });
                }
                line = literal.get(end + 1..).unwrap_or_default();
            } else {
                let symbol = rest.get("strcmp(name, spv::".len()..).unwrap_or_default();
                let end = symbol
                    .find(')')
                    .with_context(|| format!("unterminated strcmp in `{raw}`"))?;
                if fresh_sets {
                    sets.clear();
                    fresh_sets = false;
                }
                let set = evaluator
                    .symbols
                    .string(symbol.get(..end).unwrap_or_default())?;
                sets.push(set.to_string());
                line = symbol.get(end..).unwrap_or_default();
            }
        }
    }
    Ok(cases)
}

fn case_label_end(expression: &str) -> Option<usize> {
    let bytes = expression.as_bytes();
    bytes.iter().enumerate().position(|(index, &byte)| {
        byte == b':'
            && bytes.get(index + 1) != Some(&b':')
            && (index == 0 || bytes.get(index - 1) != Some(&b':'))
    })
}
