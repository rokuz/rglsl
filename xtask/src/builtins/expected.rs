use std::path::Path;

use anyhow::{Context, Result, bail};

use super::Verdict;
use super::generate::{Case, stage_extension};

#[derive(Debug)]
struct Entry {
    name: String,
    signature: Option<String>,
    stages: Vec<String>,
    versions: Vec<u32>,
    verdicts: Vec<Verdict>,
    reason: String,
}

impl Entry {
    fn matches(&self, case: &Case, verdict: Verdict) -> bool {
        glob(&self.name, &case.name)
            && self
                .signature
                .as_ref()
                .is_none_or(|signature| case.signature.contains(signature.as_str()))
            && (self.stages.is_empty()
                || self
                    .stages
                    .iter()
                    .any(|stage| stage == stage_extension(case.stage)))
            && (self.versions.is_empty() || self.versions.contains(&case.version))
            && (self.verdicts.is_empty() || self.verdicts.contains(&verdict))
    }
}

fn glob(pattern: &str, text: &str) -> bool {
    let pattern = pattern.as_bytes();
    let text = text.as_bytes();
    let (mut p, mut t) = (0, 0);
    let mut star: Option<(usize, usize)> = None;
    while t < text.len() {
        match pattern.get(p) {
            Some(b'*') => {
                star = Some((p, t));
                p += 1;
            }
            Some(&byte) if text.get(t) == Some(&byte) => {
                p += 1;
                t += 1;
            }
            _ => match star {
                Some((star_p, star_t)) => {
                    p = star_p + 1;
                    t = star_t + 1;
                    star = Some((star_p, star_t + 1));
                }
                None => return false,
            },
        }
    }
    pattern
        .get(p..)
        .is_some_and(|rest| rest.iter().all(|byte| *byte == b'*'))
}

#[derive(Debug, Default)]
pub struct Expectations {
    entries: Vec<Entry>,
}

fn strings(table: &toml::Table, key: &str) -> Result<Vec<String>> {
    let Some(value) = table.get(key) else {
        return Ok(Vec::new());
    };
    let array = value
        .as_array()
        .with_context(|| format!("`{key}` must be an array"))?;
    array
        .iter()
        .map(|item| {
            item.as_str()
                .map(String::from)
                .with_context(|| format!("`{key}` must hold strings"))
        })
        .collect()
}

impl Expectations {
    pub fn load(path: &Path) -> Result<Self> {
        if !path.is_file() {
            return Ok(Self::default());
        }
        let text = std::fs::read_to_string(path)?;
        let table: toml::Table = text
            .parse()
            .with_context(|| format!("parsing {}", path.display()))?;
        let mut entries = Vec::new();
        for key in table.keys() {
            if key != "divergence" {
                bail!("{}: unknown key `{key}`", path.display());
            }
        }
        let list = match table.get("divergence") {
            Some(value) => value
                .as_array()
                .with_context(|| format!("{}: `divergence` must be an array", path.display()))?
                .clone(),
            None => Vec::new(),
        };
        for (index, item) in list.iter().enumerate() {
            let entry = item.as_table().with_context(|| {
                format!("{}: divergence {index} is not a table", path.display())
            })?;
            for key in entry.keys() {
                if !matches!(
                    key.as_str(),
                    "name" | "signature" | "stages" | "versions" | "verdicts" | "reason"
                ) {
                    bail!(
                        "{}: divergence {index}: unknown key `{key}`",
                        path.display()
                    );
                }
            }
            let text = |key: &str| {
                entry
                    .get(key)
                    .and_then(toml::Value::as_str)
                    .map(String::from)
            };
            let name = text("name")
                .with_context(|| format!("{}: divergence {index} needs a name", path.display()))?;
            let reason = text("reason").with_context(|| {
                format!("{}: divergence `{name}` needs a reason", path.display())
            })?;
            let versions = match entry.get("versions") {
                Some(value) => value
                    .as_array()
                    .context("`versions` must be an array")?
                    .iter()
                    .map(|version| {
                        version
                            .as_integer()
                            .and_then(|version| u32::try_from(version).ok())
                            .context("`versions` must hold GLSL versions")
                    })
                    .collect::<Result<_>>()?,
                None => Vec::new(),
            };
            let verdicts = strings(entry, "verdicts")?
                .iter()
                .map(|label| {
                    Verdict::parse(label).with_context(|| format!("unknown verdict `{label}`"))
                })
                .collect::<Result<_>>()?;
            entries.push(Entry {
                name,
                signature: text("signature"),
                stages: strings(entry, "stages")?,
                versions,
                verdicts,
                reason,
            });
        }
        Ok(Self { entries })
    }

    pub fn len(&self) -> usize {
        self.entries.len()
    }

    pub fn find(&self, case: &Case, verdict: Verdict) -> Option<(usize, &str)> {
        self.entries
            .iter()
            .enumerate()
            .find(|(_, entry)| entry.matches(case, verdict))
            .map(|(index, entry)| (index, entry.reason.as_str()))
    }

    pub fn describe(&self, index: usize) -> Option<String> {
        let entry = self.entries.get(index)?;
        let mut text = entry.name.clone();
        if let Some(signature) = &entry.signature {
            text.push_str(&format!(" [{signature}]"));
        }
        if !entry.stages.is_empty() {
            text.push_str(&format!(" stages {}", entry.stages.join(",")));
        }
        if !entry.versions.is_empty() {
            let versions: Vec<String> = entry.versions.iter().map(u32::to_string).collect();
            text.push_str(&format!(" versions {}", versions.join(",")));
        }
        Some(text)
    }
}

#[cfg(test)]
mod tests {
    use super::glob;

    #[test]
    fn globs_match_names() {
        assert!(glob("mbcntAMD", "mbcntAMD"));
        assert!(!glob("mbcntAMD", "mbcntAMDx"));
        assert!(glob("dot*EXT", "dotPacked4x8AccSatEXT"));
        assert!(glob(
            "*GatherLodOffsetsAMD",
            "sparseTextureGatherLodOffsetsAMD"
        ));
        assert!(glob(
            "gl_Mesh*NV.gl_*PerViewNV",
            "gl_MeshVerticesNV.gl_ClipDistancePerViewNV"
        ));
        assert!(!glob("dFdx*", "fwidth"));
        assert!(glob("pack*", "pack"));
    }
}
