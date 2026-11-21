use std::collections::BTreeSet;
use std::fs;
use std::path::{Path, PathBuf};

use anyhow::{Context, Result};

use crate::corpus::STAGE_EXTENSIONS;

pub const DIR: &str = "tests/fuzz-quarantine";

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Mode {
    Unoptimized,
    Optimized,
}

impl Mode {
    pub const fn label(self) -> &'static str {
        match self {
            Self::Unoptimized => "O0",
            Self::Optimized => "O",
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Reason {
    pub verdict: String,
    pub first: String,
    pub confirmed: String,
    pub exit: String,
    pub seed: u64,
    pub generator: String,
    pub date: String,
    pub driver: String,
    pub device: String,
    pub shader: String,
}

impl Reason {
    pub fn to_toml(&self) -> String {
        let mut table = toml::Table::new();
        let mut put = |key: &str, value: String| {
            table.insert(key.to_string(), toml::Value::String(value));
        };
        put("verdict", self.verdict.clone());
        put("first_run", self.first.clone());
        put("confirmed_alone", self.confirmed.clone());
        put("exit", self.exit.clone());
        put("seed", self.seed.to_string());
        put("generator", self.generator.clone());
        put("date", self.date.clone());
        put("driver", self.driver.clone());
        put("device", self.device.clone());
        put("shader", self.shader.clone());
        table.to_string()
    }
}

pub fn content_hash(shader: &str, json: &str) -> u64 {
    shader
        .bytes()
        .chain(std::iter::once(0))
        .chain(json.bytes())
        .fold(0xcbf2_9ce4_8422_2325, |hash, byte| {
            (hash ^ u64::from(byte)).wrapping_mul(0x0100_0000_01b3)
        })
}

pub fn shader_hash(shader: &Path) -> Result<u64> {
    let text =
        fs::read_to_string(shader).with_context(|| format!("reading {}", shader.display()))?;
    let json = fs::read_to_string(shader.with_extension("json")).unwrap_or_default();
    Ok(content_hash(&text, &json))
}

pub fn mode_dir(root: &Path, target: &str, mode: Mode) -> PathBuf {
    root.join(DIR).join(target).join(mode.label())
}

pub fn entry_shader(entry: &Path) -> Result<Option<PathBuf>> {
    let mut found = None;
    for file in fs::read_dir(entry).with_context(|| format!("reading {}", entry.display()))? {
        let path = file?.path();
        let is_stage = path
            .extension()
            .and_then(|extension| extension.to_str())
            .is_some_and(|extension| STAGE_EXTENSIONS.contains(&extension));
        if is_stage {
            found = Some(path);
        }
    }
    Ok(found)
}

pub fn load(root: &Path, target: &str, mode: Mode) -> Result<BTreeSet<u64>> {
    let dir = mode_dir(root, target, mode);
    let mut hashes = BTreeSet::new();
    if !dir.is_dir() {
        return Ok(hashes);
    }
    for entry in fs::read_dir(&dir).with_context(|| format!("reading {}", dir.display()))? {
        let entry = entry?.path();
        if !entry.is_dir() {
            continue;
        }
        if let Some(shader) = entry_shader(&entry)? {
            hashes.insert(shader_hash(&shader)?);
        }
    }
    Ok(hashes)
}

pub fn entry_name(family: &str, shader: &Path, hash: u64) -> String {
    let stem = shader
        .file_stem()
        .and_then(|stem| stem.to_str())
        .unwrap_or("shader");
    format!("{family}-{stem}-{hash:016x}")
}

pub fn add(
    root: &Path,
    target: &str,
    mode: Mode,
    name: &str,
    shader: &Path,
    reason: &Reason,
) -> Result<PathBuf> {
    let entry = mode_dir(root, target, mode).join(name);
    fs::create_dir_all(&entry).with_context(|| format!("creating {}", entry.display()))?;
    let file_name = shader
        .file_name()
        .with_context(|| format!("{} has no file name", shader.display()))?;
    fs::copy(shader, entry.join(file_name))
        .with_context(|| format!("copying {}", shader.display()))?;
    let json = shader.with_extension("json");
    if json.is_file() {
        fs::copy(
            &json,
            entry.join(Path::new(file_name).with_extension("json")),
        )
        .with_context(|| format!("copying {}", json.display()))?;
    }
    fs::write(entry.join("reason.toml"), reason.to_toml())?;
    Ok(entry)
}

pub fn utc_date(seconds: u64) -> String {
    let days = i64::try_from(seconds / 86_400).unwrap_or_default();
    let rest = seconds % 86_400;
    let z = days + 719_468;
    let era = z.div_euclid(146_097);
    let day_of_era = z.rem_euclid(146_097);
    let year_of_era =
        (day_of_era - day_of_era / 1460 + day_of_era / 36_524 - day_of_era / 146_096) / 365;
    let day_of_year = day_of_era - (365 * year_of_era + year_of_era / 4 - year_of_era / 100);
    let month_index = (5 * day_of_year + 2) / 153;
    let day = day_of_year - (153 * month_index + 2) / 5 + 1;
    let month = if month_index < 10 {
        month_index + 3
    } else {
        month_index - 9
    };
    let year = year_of_era + era * 400 + i64::from(month <= 2);
    format!(
        "{year:04}-{month:02}-{day:02}T{:02}:{:02}:{:02}Z",
        rest / 3600,
        rest % 3600 / 60,
        rest % 60
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    fn reason() -> Reason {
        Reason {
            verdict: "hang".into(),
            first: "amber timed out".into(),
            confirmed: "amber exited with 1: \"DEVICE_LOST\"".into(),
            exit: "timed out".into(),
            seed: 42,
            generator: "abc-dirty".into(),
            date: utc_date(0),
            driver: "NVIDIA 1.2".into(),
            device: "GeForce".into(),
            shader: "f00_squares/variant_001.frag".into(),
        }
    }

    #[test]
    fn writes_and_reads_quarantine_entries() -> Result<()> {
        let root = std::env::temp_dir().join(format!("rglsl-quarantine-{}", std::process::id()));
        let _ = fs::remove_dir_all(&root);
        let family = root.join("shaders").join("f00_squares");
        fs::create_dir_all(&family)?;
        let shader = family.join("variant_001.frag");
        fs::write(&shader, "void main() {}\n")?;
        fs::write(shader.with_extension("json"), "{}")?;
        let other = family.join("variant_002.frag");
        fs::write(&other, "void main() { }\n")?;

        assert!(load(&root, "nvidia", Mode::Unoptimized)?.is_empty());
        let hash = shader_hash(&shader)?;
        let name = entry_name("f00_squares", &shader, hash);
        assert_eq!(name, format!("f00_squares-variant_001-{hash:016x}"));
        let entry = add(
            &root,
            "nvidia",
            Mode::Unoptimized,
            &name,
            &shader,
            &reason(),
        )?;
        assert_eq!(entry, root.join(DIR).join("nvidia").join("O0").join(&name));
        assert!(entry.join("variant_001.frag").is_file());
        assert!(entry.join("variant_001.json").is_file());
        let text = fs::read_to_string(entry.join("reason.toml"))?;
        let table: toml::Table = text.parse()?;
        assert_eq!(
            table.get("verdict").and_then(toml::Value::as_str),
            Some("hang")
        );
        assert_eq!(
            table.get("confirmed_alone").and_then(toml::Value::as_str),
            Some("amber exited with 1: \"DEVICE_LOST\"")
        );
        assert_eq!(table.get("seed").and_then(toml::Value::as_str), Some("42"));

        let loaded = load(&root, "nvidia", Mode::Unoptimized)?;
        assert!(loaded.contains(&hash));
        assert!(!loaded.contains(&shader_hash(&other)?));
        assert!(load(&root, "nvidia", Mode::Optimized)?.is_empty());
        assert!(load(&root, "amd", Mode::Unoptimized)?.is_empty());
        fs::remove_dir_all(&root)?;
        Ok(())
    }

    #[test]
    fn the_hash_covers_the_shader_and_its_job() {
        assert_ne!(content_hash("a", "b"), content_hash("ab", ""));
        assert_ne!(content_hash("a", "{}"), content_hash("a", "{ }"));
        assert_eq!(content_hash("a", "b"), content_hash("a", "b"));
    }

    #[test]
    fn formats_utc_dates() {
        assert_eq!(utc_date(0), "1970-01-01T00:00:00Z");
        assert_eq!(utc_date(951_782_400), "2000-02-29T00:00:00Z");
        assert_eq!(utc_date(1_795_000_000), "2026-11-18T11:06:40Z");
    }
}
