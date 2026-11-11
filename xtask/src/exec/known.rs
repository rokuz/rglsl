use std::collections::BTreeMap;
use std::fs;
use std::path::{Path, PathBuf};

use anyhow::{anyhow, bail, Context, Result};

pub const DIR: &str = "xtask/exec-ub";
const LIST: &str = "undefined.toml";

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Undefined {
    pub undefined: String,
    pub change: String,
    pub twin: PathBuf,
}

#[derive(Debug, Clone, Default)]
pub struct Known {
    shaders: BTreeMap<String, Undefined>,
}

impl Known {
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
            let field = |key: &str| -> Result<String> {
                entry
                    .get(key)
                    .and_then(toml::Value::as_str)
                    .map(str::to_string)
                    .ok_or_else(|| anyhow!("{}: `{name}` needs a string `{key}`", list.display()))
            };
            let twin = dir.join(&name);
            if !twin.is_file() {
                bail!(
                    "{}: `{name}` has no twin {}",
                    list.display(),
                    twin.display()
                );
            }
            shaders.insert(
                name.clone(),
                Undefined {
                    undefined: field("undefined")?,
                    change: field("twin")?,
                    twin,
                },
            );
        }
        for entry in fs::read_dir(&dir).with_context(|| format!("reading {}", dir.display()))? {
            let file = entry?.file_name();
            let file = file.to_string_lossy();
            if file != LIST && !shaders.contains_key(file.as_ref()) {
                bail!("{}/{file} is not listed in {}", DIR, list.display());
            }
        }
        Ok(Self { shaders })
    }

    pub fn get(&self, name: &str) -> Option<&Undefined> {
        self.shaders.get(name)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn root() -> PathBuf {
        Path::new(env!("CARGO_MANIFEST_DIR")).join("..")
    }

    #[test]
    fn every_listed_shader_has_a_twin() {
        let known = Known::load(&root()).unwrap();
        for name in [
            "spv.noexplicitlayout.comp",
            "spv.Operations.frag",
            "spv.450.noRedecl.tesc",
            "spv.atomicInt64.comp",
            "spv.structCopy.comp",
            "spv.subgroup.tesc",
            "spv.viewportArray2.perVertex.notRequested.tesc",
        ] {
            let entry = known.get(name).unwrap();
            assert!(entry.twin.is_file(), "{name}");
            assert!(!entry.undefined.is_empty() && !entry.change.is_empty());
        }
        assert!(known.get("spv.atomic.comp").is_none());
        for (name, entry) in &known.shaders {
            let twin = fs::read_to_string(&entry.twin).unwrap();
            assert!(twin.starts_with("#version"), "{name}");
            assert!(!twin.contains("//") && !twin.contains("/*"), "{name}");
        }
    }

    #[test]
    fn a_listed_shader_without_a_twin_is_an_error() {
        let dir = std::env::temp_dir().join(format!("rglsl-exec-ub-{}", std::process::id()));
        let listed = dir.join(DIR);
        fs::create_dir_all(&listed).unwrap();
        fs::write(
            listed.join(LIST),
            "[\"a.comp\"]\nundefined = \"x\"\ntwin = \"y\"\n",
        )
        .unwrap();
        assert!(Known::load(&dir).is_err());
        fs::write(listed.join("a.comp"), "#version 450\n").unwrap();
        assert!(Known::load(&dir).is_ok());
        fs::write(listed.join("b.comp"), "#version 450\n").unwrap();
        assert!(Known::load(&dir).is_err());
        fs::remove_dir_all(&dir).unwrap();
    }
}
