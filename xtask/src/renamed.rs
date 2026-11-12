use std::collections::BTreeMap;
use std::fs;
use std::path::{Path, PathBuf};

use anyhow::{anyhow, bail, Context, Result};

use crate::corpus::Case;

pub const DIR: &str = "xtask/corpus-renamed";
const LIST: &str = "renamed.toml";

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Renamed {
    pub why: String,
    pub renames: BTreeMap<String, String>,
    pub twin: PathBuf,
}

impl Renamed {
    pub fn note(&self) -> String {
        let renames: Vec<String> = self
            .renames
            .iter()
            .map(|(from, to)| format!("{from} → {to}"))
            .collect();
        format!("renamed twin: {}", renames.join(", "))
    }
}

#[derive(Debug, Clone, Default)]
pub struct Renamings {
    shaders: BTreeMap<String, Renamed>,
}

impl Renamings {
    pub fn load(root: &Path) -> Result<Self> {
        let dir = root.join(DIR);
        let list = dir.join(LIST);
        let text =
            fs::read_to_string(&list).with_context(|| format!("reading {}", list.display()))?;
        let table: toml::Table = text
            .parse()
            .with_context(|| format!("parsing {}", list.display()))?;
        let mut shaders = BTreeMap::new();
        for (name, entry) in table {
            let context = || format!("{}: `{name}`", list.display());
            let why = entry
                .get("why")
                .and_then(toml::Value::as_str)
                .filter(|why| !why.trim().is_empty())
                .ok_or_else(|| anyhow!("{} needs a string `why`", context()))?
                .to_string();
            let table = entry
                .get("renames")
                .and_then(toml::Value::as_table)
                .ok_or_else(|| anyhow!("{} needs a table `renames`", context()))?;
            let mut renames = BTreeMap::new();
            for (from, to) in table {
                let to = to.as_str().ok_or_else(|| {
                    anyhow!("{}: the new name of `{from}` is not a string", context())
                })?;
                if !is_identifier(from) || !is_identifier(to) || from == to {
                    bail!(
                        "{}: `{from}` → `{to}` is not a rename of an identifier",
                        context()
                    );
                }
                renames.insert(from.clone(), to.to_string());
            }
            if renames.is_empty() {
                bail!("{} renames nothing", context());
            }
            let twin = dir.join(&name);
            if !twin.is_file() {
                bail!("{} has no twin {}", context(), twin.display());
            }
            shaders.insert(name, Renamed { why, renames, twin });
        }
        for entry in fs::read_dir(&dir).with_context(|| format!("reading {}", dir.display()))? {
            let file = entry?.file_name();
            let file = file.to_string_lossy();
            if file != LIST && !shaders.contains_key(file.as_ref()) {
                bail!("{DIR}/{file} is not listed in {}", list.display());
            }
        }
        Ok(Self { shaders })
    }

    pub fn get(&self, name: &str) -> Option<&Renamed> {
        self.shaders.get(name)
    }

    pub fn apply(&self, cases: &mut [Case]) -> Result<()> {
        for (name, renamed) in &self.shaders {
            let case = cases
                .iter_mut()
                .find(|case| case.kind.is_file() && &case.name == name)
                .ok_or_else(|| anyhow!("{DIR}/{LIST} lists {name}, which is not in the corpus"))?;
            let original = fs::read_to_string(&case.path)
                .with_context(|| format!("reading {}", case.path.display()))?;
            let twin = fs::read_to_string(&renamed.twin)
                .with_context(|| format!("reading {}", renamed.twin.display()))?;
            check(&original, &twin, &renamed.renames)
                .with_context(|| format!("{DIR}/{name} is not a renamed twin of {name}"))?;
            case.path.clone_from(&renamed.twin);
        }
        Ok(())
    }
}

pub fn check(original: &str, twin: &str, renames: &BTreeMap<String, String>) -> Result<()> {
    let names: Vec<&str> = identifiers(original).collect();
    for (from, to) in renames {
        if !names.contains(&from.as_str()) {
            bail!("`{from}` does not occur in the original");
        }
        if names.contains(&to.as_str()) {
            bail!("`{to}` already occurs in the original");
        }
    }
    let expected = rename(original, renames);
    if expected == twin {
        return Ok(());
    }
    let line = expected
        .split('\n')
        .zip(twin.split('\n'))
        .position(|(expected, found)| expected != found)
        .unwrap_or_else(|| expected.split('\n').count().min(twin.split('\n').count()));
    bail!(
        "the twin differs from the original with the renames applied on line {}",
        line + 1
    )
}

fn is_identifier_start(c: char) -> bool {
    c.is_ascii_alphabetic() || c == '_'
}

fn is_identifier_char(c: char) -> bool {
    c.is_ascii_alphanumeric() || c == '_'
}

fn is_identifier(word: &str) -> bool {
    let mut chars = word.chars();
    chars.next().is_some_and(is_identifier_start) && chars.all(is_identifier_char)
}

enum Token<'a> {
    Word(&'a str),
    Other(&'a str),
}

fn tokens(text: &str) -> impl Iterator<Item = Token<'_>> {
    let mut rest = text;
    std::iter::from_fn(move || {
        let first = rest.chars().next()?;
        let word = is_identifier_start(first);
        let number = first.is_ascii_digit();
        let end = rest
            .char_indices()
            .skip(1)
            .find(|&(_, c)| {
                if word || number {
                    !is_identifier_char(c)
                } else {
                    is_identifier_char(c)
                }
            })
            .map_or(rest.len(), |(at, _)| at);
        let (token, tail) = rest.split_at(end);
        rest = tail;
        Some(if word {
            Token::Word(token)
        } else {
            Token::Other(token)
        })
    })
}

fn identifiers(text: &str) -> impl Iterator<Item = &str> {
    tokens(text).filter_map(|token| match token {
        Token::Word(word) => Some(word),
        Token::Other(_) => None,
    })
}

fn rename(text: &str, renames: &BTreeMap<String, String>) -> String {
    tokens(text)
        .map(|token| match token {
            Token::Word(word) => renames.get(word).map_or(word, String::as_str),
            Token::Other(other) => other,
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::corpus::Kind;

    fn root() -> PathBuf {
        Path::new(env!("CARGO_MANIFEST_DIR")).join("..")
    }

    fn renames(pairs: &[(&str, &str)]) -> BTreeMap<String, String> {
        pairs
            .iter()
            .map(|&(from, to)| (from.to_string(), to.to_string()))
            .collect()
    }

    #[test]
    fn a_twin_may_differ_only_in_the_listed_identifiers() {
        let original =
            "#version 450\nvec4 vector;\nfloat f = vector.y + vectors.x;\nint v2vector;\n";
        let map = renames(&[("vector", "vector_")]);
        let twin = "#version 450\nvec4 vector_;\nfloat f = vector_.y + vectors.x;\nint v2vector;\n";
        assert!(check(original, twin, &map).is_ok());
        let partial =
            "#version 450\nvec4 vector_;\nfloat f = vector.y + vectors.x;\nint v2vector;\n";
        assert!(check(original, partial, &map).is_err());
        let other =
            "#version 450\nvec4 vector_;\nfloat f = vector_.y + vectors.z;\nint v2vector;\n";
        assert!(check(original, other, &map).is_err());
        let shifted =
            "#version 450\n\nvec4 vector_;\nfloat f = vector_.y + vectors.x;\nint v2vector;\n";
        assert!(check(original, shifted, &map).is_err());
        assert!(check(original, original, &renames(&[("missing", "missing_")])).is_err());
        assert!(check(original, original, &renames(&[("vector", "vectors")])).is_err());
        let number = "float x = 1e5;\nint e5;\n";
        let map = renames(&[("e5", "e5_")]);
        assert!(check(number, "float x = 1e5;\nint e5_;\n", &map).is_ok());
    }

    #[test]
    fn every_listed_shader_has_a_twin() -> Result<()> {
        let renamings = Renamings::load(&root())?;
        for (name, word) in [
            ("spv.longVectorNotReserved.comp", "vector"),
            ("spv.structuredDescriptorHeap.ReadOnly.comp", "vector"),
            ("spv.structuredDescriptorHeap.ReadOnly.error.comp", "vector"),
            ("spv.demoteDisabled.frag", "demote"),
        ] {
            let entry = renamings
                .get(name)
                .with_context(|| format!("{name} is not listed"))?;
            assert!(entry.twin.is_file(), "{name}");
            assert!(entry.renames.contains_key(word), "{name}");
            assert!(entry.why.contains(&format!("`{word}`")), "{name}");
            let twin = fs::read_to_string(&entry.twin)?;
            assert!(twin.starts_with("#version"), "{name}");
        }
        Ok(())
    }

    #[test]
    fn the_list_and_the_directory_agree() -> Result<()> {
        let dir = std::env::temp_dir().join(format!("rglsl-renamed-{}", std::process::id()));
        let listed = dir.join(DIR);
        fs::create_dir_all(&listed)?;
        fs::write(
            listed.join(LIST),
            "[\"a.comp\"]\nwhy = \"x\"\nrenames = { vector = \"vector_\" }\n",
        )?;
        assert!(Renamings::load(&dir).is_err());
        fs::write(listed.join("a.comp"), "#version 450\n")?;
        assert!(Renamings::load(&dir).is_ok());
        fs::write(listed.join("b.comp"), "#version 450\n")?;
        assert!(Renamings::load(&dir).is_err());
        fs::remove_file(listed.join("b.comp"))?;
        fs::write(
            listed.join(LIST),
            "[\"a.comp\"]\nwhy = \"x\"\nrenames = {}\n",
        )?;
        assert!(Renamings::load(&dir).is_err());
        fs::write(
            listed.join(LIST),
            "[\"a.comp\"]\nwhy = \"x\"\nrenames = { vector = \"1x\" }\n",
        )?;
        assert!(Renamings::load(&dir).is_err());
        fs::remove_dir_all(&dir)?;
        Ok(())
    }

    #[test]
    fn a_renamed_case_compiles_its_twin() -> Result<()> {
        let dir = std::env::temp_dir().join(format!("rglsl-renamed-apply-{}", std::process::id()));
        let listed = dir.join(DIR);
        fs::create_dir_all(&listed)?;
        fs::write(
            listed.join(LIST),
            "[\"a.comp\"]\nwhy = \"`vector` is reserved\"\nrenames = { vector = \"vector_\" }\n",
        )?;
        let original = dir.join("a.comp");
        fs::write(&original, "#version 450\nvec4 vector;\n")?;
        fs::write(listed.join("a.comp"), "#version 450\nvec4 vector_;\n")?;
        let renamings = Renamings::load(&dir)?;
        let case = Case {
            name: "a.comp".into(),
            path: original.clone(),
            stage: "comp",
            target: crate::corpus::Target::VULKAN_DEFAULT,
            suite: None,
            version: 450,
            corpus: crate::corpus::Corpus::Vulkan,
            kind: Kind::File,
        };
        let mut cases = vec![case.clone()];
        renamings.apply(&mut cases)?;
        assert_eq!(
            cases.first().map(|case| &case.path),
            Some(&listed.join("a.comp"))
        );
        fs::write(listed.join("a.comp"), "#version 450\nvec3 vector_;\n")?;
        let mut cases = vec![case];
        assert!(Renamings::load(&dir)?.apply(&mut cases).is_err());
        assert!(renamings.apply(&mut []).is_err());
        fs::remove_dir_all(&dir)?;
        Ok(())
    }
}
