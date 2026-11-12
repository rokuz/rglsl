use std::collections::BTreeMap;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::time::Duration;

use super::cooperative::{self, Shape};
use crate::process::{self, Exit};

pub const VULKAN_VERSION: &str = "1.3";

#[derive(Debug, Clone)]
pub struct Amber {
    pub binary: PathBuf,
    pub icd: PathBuf,
    pub timeout: Duration,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Device {
    pub name: String,
    pub api_version: String,
    pub driver: String,
    pub cooperative: Vec<Shape>,
}

impl Device {
    pub fn vendor(&self) -> String {
        let text = format!("{} {}", self.name, self.driver).to_ascii_lowercase();
        let words: Vec<&str> = text
            .split(|c: char| !c.is_ascii_alphanumeric())
            .filter(|w| !w.is_empty())
            .collect();
        let known = [
            ("nvidia", "nvidia"),
            ("geforce", "nvidia"),
            ("amd", "amd"),
            ("radeon", "amd"),
            ("intel", "intel"),
            ("arc", "intel"),
            ("apple", "apple"),
            ("qualcomm", "qualcomm"),
            ("adreno", "qualcomm"),
            ("llvmpipe", "llvmpipe"),
            ("swiftshader", "swiftshader"),
        ];
        known
            .iter()
            .find(|(word, _)| words.contains(word))
            .map_or_else(
                || {
                    words
                        .first()
                        .map_or_else(|| "gpu".to_string(), |w| (*w).to_string())
                },
                |(_, vendor)| (*vendor).to_string(),
            )
    }
}

impl Amber {
    fn command(&self) -> Command {
        let mut command = Command::new(&self.binary);
        command
            .env("VK_DRIVER_FILES", &self.icd)
            .env("VK_ICD_FILENAMES", &self.icd)
            .env_remove("VK_INSTANCE_LAYERS")
            .args(["-d", "-v", VULKAN_VERSION]);
        command
    }

    pub fn device(&self) -> Result<Device, String> {
        let mut command = self.command();
        command.arg("-V");
        let output = process::run(command, self.timeout).map_err(|e| format!("{e:#}"))?;
        if !matches!(output.exit, Exit::Code(0)) {
            return Err(first_line(&output.stdout, &output.stderr));
        }
        parse_device(&output.stdout).ok_or_else(|| {
            format!(
                "amber did not report a Vulkan device: {}",
                first_line(&output.stdout, &output.stderr)
            )
        })
    }

    pub fn run(
        &self,
        script: &Path,
        dumps: &[&str],
        out: &Path,
    ) -> Result<BTreeMap<String, Vec<u8>>, String> {
        let _ = std::fs::remove_file(out);
        let mut command = self.command();
        command.arg("-q");
        if !dumps.is_empty() {
            command.arg("-b").arg(out);
            for dump in dumps {
                command.args(["-B", dump]);
            }
        }
        match (script.parent(), script.file_name()) {
            (Some(dir), Some(name)) if !dir.as_os_str().is_empty() => {
                command.current_dir(dir).arg(name);
            }
            _ => {
                command.arg(script);
            }
        }
        let output = process::run(command, self.timeout).map_err(|e| format!("{e:#}"))?;
        match output.exit {
            Exit::Code(0) => {}
            Exit::Code(code) => {
                return Err(format!(
                    "amber exited with {code}: {}",
                    first_line(&output.stderr, &output.stdout)
                ))
            }
            Exit::Signal => {
                return Err(format!(
                    "amber crashed: {}",
                    first_line(&output.stderr, &output.stdout)
                ))
            }
            Exit::Timeout => return Err("amber timed out".into()),
        }
        if dumps.is_empty() {
            return Ok(BTreeMap::new());
        }
        let text = std::fs::read_to_string(out).map_err(|e| format!("reading the dump: {e}"))?;
        parse_dump(&text)
    }
}

pub fn first_line(primary: &str, secondary: &str) -> String {
    primary
        .lines()
        .chain(secondary.lines())
        .map(str::trim)
        .find(|line| !line.is_empty())
        .unwrap_or("no output")
        .chars()
        .take(300)
        .collect()
}

pub fn parse_device(text: &str) -> Option<Device> {
    let field = |key: &str| {
        text.lines()
            .find_map(|line| line.trim().strip_prefix(key))
            .map(|value| value.trim().to_string())
    };
    let name = field("deviceName:")?;
    let api_version = field("apiVersion:")?;
    let driver = match (field("driverName:"), field("driverInfo:")) {
        (Some(name), Some(info)) => format!("{name} {info}"),
        (Some(name), None) => name,
        (None, Some(info)) => info,
        (None, None) => String::new(),
    };
    Some(Device {
        name,
        api_version,
        driver,
        cooperative: cooperative::parse_shapes(text),
    })
}

pub fn parse_dump(text: &str) -> Result<BTreeMap<String, Vec<u8>>, String> {
    let mut buffers: BTreeMap<String, Vec<u8>> = BTreeMap::new();
    let mut current: Option<String> = None;
    for line in text.lines() {
        if line.trim().is_empty() {
            continue;
        }
        if line.starts_with(' ') {
            let Some(name) = &current else {
                return Err("buffer bytes before a buffer name".into());
            };
            let bytes = buffers.entry(name.clone()).or_default();
            for word in line.split_whitespace() {
                let byte = u8::from_str_radix(word, 16)
                    .map_err(|_| format!("bad byte `{word}` in the dump"))?;
                bytes.push(byte);
            }
        } else {
            let name = line.trim().to_string();
            buffers.entry(name.clone()).or_default();
            current = Some(name);
        }
    }
    Ok(buffers)
}

#[cfg(test)]
mod tests {
    use super::*;
    use anyhow::Context;

    #[test]
    fn parses_buffer_dumps() -> anyhow::Result<()> {
        let text = "main:0:0\n 03 00 00 00 06 00\n 0a\n\ndump:0:1\n ff\n\nempty\n";
        let buffers = parse_dump(text).map_err(anyhow::Error::msg)?;
        assert_eq!(buffers["main:0:0"], [3, 0, 0, 0, 6, 0, 10]);
        assert_eq!(buffers["dump:0:1"], [255]);
        assert!(buffers["empty"].is_empty());
        assert!(parse_dump(" 00\n").is_err());
        assert!(parse_dump("x\n zz\n").is_err());
        Ok(())
    }

    #[test]
    fn parses_device_properties() -> anyhow::Result<()> {
        let text = "Amber        : c9f1e28\n\nPhysical device properties:\n  apiVersion: 1.4.354\n  deviceName: Apple M4 Max\n  driverName: KosmicKrisp\n  driverInfo: Mesa 26.2.1\nEnd of physical device properties.\n";
        let device = parse_device(text).context("no device properties")?;
        assert_eq!(device.name, "Apple M4 Max");
        assert_eq!(device.api_version, "1.4.354");
        assert_eq!(device.driver, "KosmicKrisp Mesa 26.2.1");
        assert!(parse_device("Summary: 0 pass").is_none());
        assert_eq!(device.vendor(), "apple");
        Ok(())
    }
}
