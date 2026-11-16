use alloc::collections::{BTreeMap, BTreeSet};
use std::path::{Path, PathBuf};

use crate::TestResult;

const SOURCES: [&str; 4] = [
    "rglsl/src",
    "rglsl-types/src",
    "rglsl-pp/src/source_map.rs",
    "rglsl-link/src/file.rs",
];

const ROOTS: [&str; 2] = ["ObjectModule", "File"];

const SNAPSHOT: &str = "rglsl/tests/object_schema.txt";

const UPDATE: &str = "RGLSL_UPDATE_OBJECT_SCHEMA";

#[derive(Clone, PartialEq, Eq)]
enum Token {
    Word(String),
    Text(String),
    Punct(char),
}

impl Token {
    fn render(&self) -> String {
        match *self {
            Self::Word(ref word) => word.clone(),
            Self::Text(ref text) => format!("{text:?}"),
            Self::Punct(punct) => punct.to_string(),
        }
    }

    fn is_word(&self, expected: &str) -> bool {
        matches!(*self, Self::Word(ref word) if word == expected)
    }

    const fn is_punct(&self, expected: char) -> bool {
        matches!(*self, Self::Punct(punct) if punct == expected)
    }
}

fn quoted(chars: &[char], start: usize, hashes: usize) -> (String, usize) {
    let mut text = String::new();
    let mut index = start;
    while let Some(&current) = chars.get(index) {
        if hashes == 0 && current == '\\' {
            text.push(current);
            if let Some(&escaped) = chars.get(index + 1) {
                text.push(escaped);
            }
            index += 2;
            continue;
        }
        if current == '"'
            && (1..=hashes).all(|offset| chars.get(index + offset).is_some_and(|&c| c == '#'))
        {
            return (text, index + 1 + hashes);
        }
        text.push(current);
        index += 1;
    }
    (text, index)
}

fn tokens(source: &str) -> Vec<Token> {
    let chars: Vec<char> = source.chars().collect();
    let mut tokens = Vec::new();
    let mut index = 0;
    while let Some(&current) = chars.get(index) {
        let next = chars.get(index + 1).copied();
        if current.is_whitespace() {
            index += 1;
        } else if current == '/' && next == Some('/') {
            while chars.get(index).is_some_and(|&c| c != '\n') {
                index += 1;
            }
        } else if current == '/' && next == Some('*') {
            let mut depth = 0usize;
            while let Some(&c) = chars.get(index) {
                let following = chars.get(index + 1).copied();
                if c == '/' && following == Some('*') {
                    depth += 1;
                    index += 2;
                } else if c == '*' && following == Some('/') {
                    depth -= 1;
                    index += 2;
                    if depth == 0 {
                        break;
                    }
                } else {
                    index += 1;
                }
            }
        } else if current == '"' {
            let (text, end) = quoted(&chars, index + 1, 0);
            tokens.push(Token::Text(text));
            index = end;
        } else if current == '\'' {
            let escaped = next == Some('\\');
            let closed = chars.get(index + 2).is_some_and(|&c| c == '\'');
            if escaped || closed {
                let mut end = index + 2;
                while chars.get(end).is_some_and(|&c| c != '\'') {
                    end += 1;
                }
                tokens.push(Token::Word(String::from("'char'")));
                index = end + 1;
            } else {
                let mut end = index + 1;
                while chars
                    .get(end)
                    .is_some_and(|&c| c.is_alphanumeric() || c == '_')
                {
                    end += 1;
                }
                tokens.push(Token::Word(chars[index..end].iter().collect()));
                index = end;
            }
        } else if current.is_alphanumeric() || current == '_' {
            let mut end = index;
            while chars
                .get(end)
                .is_some_and(|&c| c.is_alphanumeric() || c == '_')
            {
                end += 1;
            }
            let word: String = chars[index..end].iter().collect();
            let mut hashes = 0;
            while chars.get(end + hashes).is_some_and(|&c| c == '#') {
                hashes += 1;
            }
            let raw = matches!(word.as_str(), "r" | "br")
                && chars.get(end + hashes).is_some_and(|&c| c == '"');
            if raw {
                let (text, after) = quoted(&chars, end + hashes + 1, hashes);
                tokens.push(Token::Text(text));
                index = after;
            } else {
                tokens.push(Token::Word(word));
                index = end;
            }
        } else {
            tokens.push(Token::Punct(current));
            index += 1;
        }
    }
    tokens
}

fn closing(tokens: &[Token], open: usize) -> Option<usize> {
    let mut depth = 0usize;
    for (index, token) in tokens.iter().enumerate().skip(open) {
        match *token {
            Token::Punct('(' | '[' | '{') => depth += 1,
            Token::Punct(')' | ']' | '}') => {
                depth = depth.checked_sub(1)?;
                if depth == 0 {
                    return Some(index);
                }
            }
            _ => {}
        }
    }
    None
}

fn item_end(tokens: &[Token], start: usize) -> Option<usize> {
    let mut index = start;
    while let Some(token) = tokens.get(index) {
        match *token {
            Token::Punct(';') => return Some(index),
            Token::Punct('{') => return closing(tokens, index),
            Token::Punct('(' | '[') => index = closing(tokens, index)? + 1,
            _ => index += 1,
        }
    }
    None
}

fn render(tokens: &[Token]) -> String {
    let mut rendered = Vec::with_capacity(tokens.len());
    let mut index = 0;
    while let Some(token) = tokens.get(index) {
        let attribute = token.is_punct('#')
            && tokens
                .get(index + 1)
                .is_some_and(|token| token.is_punct('['));
        if attribute && let Some(end) = closing(tokens, index + 1) {
            let group = tokens.get(index..=end).unwrap_or_default();
            if is_serde(group) {
                rendered.extend(group.iter().map(Token::render));
            }
            index = end + 1;
            continue;
        }
        rendered.push(token.render());
        index += 1;
    }
    rendered.join(" ")
}

fn is_serde(tokens: &[Token]) -> bool {
    tokens.iter().any(|token| {
        token.is_word("Serialize") || token.is_word("Deserialize") || token.is_word("serde")
    })
}

fn derived_items(tokens: &[Token], items: &mut BTreeMap<String, Vec<String>>) -> TestResult {
    let mut index = 0;
    while index < tokens.len() {
        let attribute = tokens.get(index).is_some_and(|token| token.is_punct('#'))
            && tokens
                .get(index + 1)
                .is_some_and(|token| token.is_punct('['));
        if !attribute {
            index += 1;
            continue;
        }
        let start = index;
        while tokens.get(index).is_some_and(|token| token.is_punct('#'))
            && tokens
                .get(index + 1)
                .is_some_and(|token| token.is_punct('['))
        {
            index = closing(tokens, index + 1).ok_or("unbalanced attribute")? + 1;
        }
        let attributes = tokens.get(start..index).ok_or("attribute range")?;
        if tokens.get(index).is_some_and(|token| token.is_word("pub")) {
            index += 1;
            if tokens.get(index).is_some_and(|token| token.is_punct('(')) {
                index = closing(tokens, index).ok_or("unbalanced visibility")? + 1;
            }
        }
        let kind = tokens
            .get(index)
            .is_some_and(|token| token.is_word("struct") || token.is_word("enum"));
        if !kind || !is_serde(attributes) {
            continue;
        }
        let Some(Token::Word(name)) = tokens.get(index + 1) else {
            continue;
        };
        let end = item_end(tokens, index + 2).ok_or("unterminated item")?;
        let item = tokens.get(start..=end).ok_or("item range")?;
        items.entry(name.clone()).or_default().push(render(item));
        index = end + 1;
    }
    Ok(())
}

fn aliases(tokens: &[Token], items: &mut BTreeMap<String, Vec<String>>) -> TestResult {
    for (start, token) in tokens.iter().enumerate() {
        let public = start
            .checked_sub(1)
            .and_then(|before| tokens.get(before))
            .is_some_and(|before| {
                before.is_word("pub")
                    || (before.is_punct(')')
                        && start
                            .checked_sub(4)
                            .and_then(|visibility| tokens.get(visibility))
                            .is_some_and(|visibility| visibility.is_word("pub")))
            });
        if !token.is_word("type") || !public {
            continue;
        }
        let Some(Token::Word(name)) = tokens.get(start + 1) else {
            continue;
        };
        let is_alias = tokens
            .iter()
            .skip(start + 2)
            .take_while(|token| !token.is_punct(';'))
            .any(|token| token.is_punct('='));
        if !is_alias {
            continue;
        }
        let end = item_end(tokens, start + 2).ok_or("unterminated type alias")?;
        let item = tokens.get(start..=end).ok_or("alias range")?;
        items.entry(name.clone()).or_default().push(render(item));
    }
    Ok(())
}

fn manual_impls(tokens: &[Token], items: &mut BTreeMap<String, Vec<String>>) -> TestResult {
    for (start, token) in tokens.iter().enumerate() {
        if !token.is_word("impl") {
            continue;
        }
        let Some(open) = tokens
            .iter()
            .skip(start)
            .position(|token| token.is_punct('{') || token.is_punct(';'))
            .map(|offset| start + offset)
        else {
            continue;
        };
        let header = tokens.get(start..open).ok_or("impl header")?;
        let Some(after_for) = header.iter().position(|token| token.is_word("for")) else {
            continue;
        };
        let trait_part = header.get(..after_for).ok_or("impl trait")?;
        if !is_serde(trait_part) || !tokens.get(open).is_some_and(|token| token.is_punct('{')) {
            continue;
        }
        let name = header
            .iter()
            .skip(after_for + 1)
            .take_while(|token| !token.is_punct('<') && !token.is_word("where"))
            .filter_map(|token| match *token {
                Token::Word(ref word) => Some(word.clone()),
                _ => None,
            })
            .last()
            .ok_or("impl without a type")?;
        let end = closing(tokens, open).ok_or("unbalanced impl")?;
        let item = tokens.get(start..=end).ok_or("impl range")?;
        items.entry(name).or_default().push(render(item));
    }
    Ok(())
}

fn rust_files(path: &Path) -> TestResult<Vec<PathBuf>> {
    let mut files = Vec::new();
    let mut pending = vec![path.to_path_buf()];
    while let Some(path) = pending.pop() {
        if path.is_dir() {
            for entry in std::fs::read_dir(&path)? {
                pending.push(entry?.path());
            }
        } else if path.extension().is_some_and(|extension| extension == "rs") {
            files.push(path);
        }
    }
    Ok(files)
}

fn fnv(text: &str) -> u64 {
    text.bytes().fold(0xcbf2_9ce4_8422_2325, |hash, byte| {
        (hash ^ u64::from(byte)).wrapping_mul(0x0000_0100_0000_01b3)
    })
}

fn workspace() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("..")
}

fn has_named_fields(name: &str, text: &str) -> bool {
    if text.contains(&format!("enum {name} ")) {
        return true;
    }
    let Some(at) = text.find(&format!("struct {name} ")) else {
        return false;
    };
    let rest = text.get(at..).unwrap_or_default();
    let brace = rest.find('{');
    let parenthesis = rest.find('(');
    let semicolon = rest.find(';');
    brace.is_some_and(|brace| {
        parenthesis.is_none_or(|parenthesis| brace < parenthesis)
            && semicolon.is_none_or(|semicolon| brace < semicolon)
    })
}

fn admits_unknown_fields(name: &str, text: &str) -> bool {
    text.starts_with('#')
        && text.contains("Deserialize")
        && !text.contains("transparent")
        && !text.contains("deny_unknown_fields")
        && has_named_fields(name, text)
}

fn schema() -> TestResult<BTreeMap<String, u64>> {
    let root = workspace();
    let mut items: BTreeMap<String, Vec<String>> = BTreeMap::new();
    for source in SOURCES {
        for path in rust_files(&root.join(source))? {
            let tokens = tokens(&std::fs::read_to_string(&path)?);
            derived_items(&tokens, &mut items)?;
            manual_impls(&tokens, &mut items)?;
            aliases(&tokens, &mut items)?;
        }
    }
    let mut reachable = BTreeSet::new();
    let mut pending: Vec<String> = ROOTS.iter().map(|&root| String::from(root)).collect();
    while let Some(name) = pending.pop() {
        let Some(texts) = items.get(&name) else {
            return Err(format!("no serialized type {name} in {SOURCES:?}").into());
        };
        if !reachable.insert(name) {
            continue;
        }
        for text in texts {
            for word in text.split(|c: char| !c.is_alphanumeric() && c != '_') {
                if items.contains_key(word) && !reachable.contains(word) {
                    pending.push(String::from(word));
                }
            }
        }
    }
    let lenient: Vec<&String> = reachable
        .iter()
        .filter(|name| {
            items
                .get(*name)
                .is_some_and(|texts| texts.iter().any(|text| admits_unknown_fields(name, text)))
        })
        .collect();
    if !lenient.is_empty() {
        return Err(
            format!("serialized types without #[serde(deny_unknown_fields)]: {lenient:?}").into(),
        );
    }
    Ok(reachable
        .into_iter()
        .filter_map(|name| {
            let mut texts = items.get(&name)?.clone();
            texts.sort();
            Some((name, fnv(&texts.join("\n"))))
        })
        .collect())
}

fn format_version() -> TestResult<u32> {
    let source = std::fs::read_to_string(workspace().join("rglsl/src/object.rs"))?;
    let tokens = tokens(&source);
    let position = tokens
        .iter()
        .position(|token| token.is_word("FORMAT_VERSION"))
        .ok_or("no FORMAT_VERSION in rglsl/src/object.rs")?;
    let value = tokens
        .iter()
        .skip(position)
        .find_map(|token| match *token {
            Token::Word(ref word) if word.starts_with(|c: char| c.is_ascii_digit()) => {
                Some(word.clone())
            }
            _ => None,
        })
        .ok_or("no FORMAT_VERSION value")?;
    if value.parse::<u32>()? != rglsl::object::FORMAT_VERSION {
        return Err("FORMAT_VERSION parsed from rglsl/src/object.rs does not match".into());
    }
    Ok(rglsl::object::FORMAT_VERSION)
}

fn render_snapshot(version: u32, schema: &BTreeMap<String, u64>) -> String {
    let mut text = format!("FORMAT_VERSION {version}\n");
    for (name, hash) in schema {
        text.push_str(&format!("{name} {hash:016x}\n"));
    }
    text
}

fn parse_snapshot(text: &str) -> TestResult<(u32, BTreeMap<String, u64>)> {
    let mut lines = text.lines();
    let version = lines
        .next()
        .and_then(|line| line.strip_prefix("FORMAT_VERSION "))
        .ok_or("the snapshot does not start with FORMAT_VERSION")?
        .parse()?;
    let mut schema = BTreeMap::new();
    for line in lines {
        let (name, hash) = line.split_once(' ').ok_or("malformed snapshot line")?;
        schema.insert(String::from(name), u64::from_str_radix(hash, 16)?);
    }
    Ok((version, schema))
}

fn differences(old: &BTreeMap<String, u64>, new: &BTreeMap<String, u64>) -> String {
    let names: BTreeSet<&String> = old.keys().chain(new.keys()).collect();
    names
        .into_iter()
        .filter_map(|name| match (old.get(name), new.get(name)) {
            (Some(before), Some(after)) if before != after => Some(format!("{name} changed")),
            (Some(_), None) => Some(format!("{name} removed")),
            (None, Some(_)) => Some(format!("{name} added")),
            _ => None,
        })
        .collect::<Vec<_>>()
        .join(", ")
}

#[test]
fn object_schema_matches_format_version() -> TestResult {
    let version = format_version()?;
    let schema = schema()?;
    let path = workspace().join(SNAPSHOT);
    let recorded = match std::fs::read_to_string(&path) {
        Ok(text) => Some(parse_snapshot(&text)?),
        Err(error) if error.kind() == std::io::ErrorKind::NotFound => None,
        Err(error) => return Err(error.into()),
    };
    let update = std::env::var_os(UPDATE).is_some();
    match recorded {
        Some((recorded_version, ref recorded_schema)) if recorded_version == version => {
            if *recorded_schema == schema {
                return Ok(());
            }
            Err(format!(
                "the serialized schema of object modules changed ({}) but FORMAT_VERSION is \
                 still {version}: raise FORMAT_VERSION in rglsl/src/object.rs, then update the \
                 snapshot with `{UPDATE}=1 cargo test -p rglsl --test rglsl object_schema`",
                differences(recorded_schema, &schema)
            )
            .into())
        }
        _ if update => {
            std::fs::write(&path, render_snapshot(version, &schema))?;
            Ok(())
        }
        Some((recorded_version, _)) => Err(format!(
            "{SNAPSHOT} records FORMAT_VERSION {recorded_version}, rglsl/src/object.rs has \
             {version}: update the snapshot with `{UPDATE}=1 cargo test -p rglsl --test rglsl \
             object_schema`"
        )
        .into()),
        None => Err(format!(
            "{SNAPSHOT} is missing: create it with `{UPDATE}=1 cargo test -p rglsl --test rglsl \
             object_schema`"
        )
        .into()),
    }
}
