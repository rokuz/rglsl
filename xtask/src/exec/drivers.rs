use std::collections::BTreeMap;
use std::fs;
use std::path::Path;

use anyhow::{anyhow, Context, Result};

pub const DIR: &str = "xtask/exec-drivers";

#[derive(Debug, Clone, Default)]
pub struct DriverBugs {
    shaders: BTreeMap<String, String>,
}

impl DriverBugs {
    pub fn load(root: &Path, driver: &str) -> Result<Self> {
        let dir = root.join(DIR);
        let driver = driver.to_lowercase();
        let mut shaders = BTreeMap::new();
        for entry in fs::read_dir(&dir).with_context(|| format!("reading {}", dir.display()))? {
            let path = entry?.path();
            let Some(stem) = path.file_stem().and_then(|s| s.to_str()) else {
                continue;
            };
            if path.extension().and_then(|e| e.to_str()) != Some("toml") {
                continue;
            }
            if !driver.contains(stem) {
                continue;
            }
            let text =
                fs::read_to_string(&path).with_context(|| format!("reading {}", path.display()))?;
            let table: toml::Table = text
                .parse()
                .with_context(|| format!("parsing {}", path.display()))?;
            for (name, entry) in table {
                let why = entry
                    .get("why")
                    .and_then(toml::Value::as_str)
                    .filter(|why| !why.trim().is_empty())
                    .ok_or_else(|| anyhow!("{}: `{name}` needs a string `why`", path.display()))?;
                shaders.insert(name, format!("{stem}: {why}"));
            }
        }
        Ok(Self { shaders })
    }

    pub fn get(&self, name: &str) -> Option<&str> {
        self.shaders.get(name).map(String::as_str)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn root() -> std::path::PathBuf {
        Path::new(env!("CARGO_MANIFEST_DIR")).join("..")
    }

    #[test]
    fn lists_apply_to_the_matching_driver_only() -> Result<()> {
        let shader = "spv.subgroupExtendedTypesArithmetic.comp";
        let kk = DriverBugs::load(&root(), "KosmicKrisp Mesa 26.3.0 (git-0a6fa60abb)")?;
        assert!(kk
            .get(shader)
            .is_some_and(|why| why.starts_with("kosmickrisp: ")));
        let amd = DriverBugs::load(&root(), "AMD proprietary driver 26.10.1 (LLPC)")?;
        assert!(amd.get(shader).is_none());
        assert!(amd
            .get("spv.subgroupArithmetic.comp")
            .is_some_and(|why| why.starts_with("amd: ")));
        let nvidia = DriverBugs::load(&root(), "NVIDIA 617.14")?;
        assert!(nvidia.get("spv.subgroupArithmetic.comp").is_none());
        assert!(nvidia.get(shader).is_none());
        Ok(())
    }
}
