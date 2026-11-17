use std::collections::BTreeMap;
use std::path::PathBuf;
use std::process::Command;
use std::time::Duration;

use super::batch::{Capture, Job, STATISTICS, TIMING};
use super::cooperative::{self, Support};
use crate::process::{self, Exit};

pub const VULKAN_VERSION: &str = "1.3";

#[derive(Debug, Clone)]
pub struct Amber {
    pub binary: PathBuf,
    pub icd: PathBuf,
    pub layer: Option<PathBuf>,
    pub timeout: Duration,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct TensorSupport {
    pub max_rank: u32,
    pub stages: u32,
}

impl TensorSupport {
    pub const COMPUTE: u32 = 0x20;

    pub const fn compute_only(self) -> bool {
        self.stages & !Self::COMPUTE == 0
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Device {
    pub name: String,
    pub api_version: String,
    pub driver: String,
    pub cooperative: Support,
    pub tensors: Option<TensorSupport>,
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
    fn command(&self, layer: bool) -> Command {
        let mut command = Command::new(&self.binary);
        command
            .env("VK_DRIVER_FILES", &self.icd)
            .env("VK_ICD_FILENAMES", &self.icd)
            .env_remove("VK_INSTANCE_LAYERS")
            .args(["-d", "-v", VULKAN_VERSION]);
        if let (true, Some(library)) = (layer, &self.layer) {
            command.arg("--layer-library").arg(library);
        }
        command
    }

    pub fn device(&self) -> Result<Device, String> {
        let mut command = self.command(true);
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

    pub fn run(&self, job: &Job) -> Result<BTreeMap<String, Vec<u8>>, String> {
        if job.tensor_layer && self.layer.is_none() {
            return Err(format!(
                "the script needs the ML emulation layer, which is not built: run `cargo xtask oracles` or set {}",
                crate::oracles::TENSOR_LAYER_VAR
            ));
        }
        let out = job.dir.join(format!("{}.dump.txt", job.script));
        let statistics = job.dir.join(job.statistics_file());
        let _ = std::fs::remove_file(&out);
        let _ = std::fs::remove_file(&statistics);
        let mut command = self.command(job.tensor_layer);
        command.arg("-q");
        if !job.dumps.is_empty() {
            command.arg("-b").arg(&out);
            for dump in &job.dumps {
                command.args(["-B", dump]);
            }
        }
        if job.capture.statistics {
            command.arg("--pipeline-stats").arg(job.statistics_file());
        }
        if job.capture.timing {
            command.arg("--log-execution-timing");
        }
        command.current_dir(&job.dir).arg(&job.script);
        let output = process::run(command, self.timeout).map_err(|e| format!("{e:#}"))?;
        match output.exit {
            Exit::Code(0) => {}
            Exit::Code(code) => {
                return Err(format!(
                    "amber exited with {code}: {}",
                    first_line(&output.stderr, &output.stdout)
                ));
            }
            Exit::Signal => {
                return Err(format!(
                    "amber crashed: {}",
                    first_line(&output.stderr, &output.stdout)
                ));
            }
            Exit::Timeout => return Err("amber timed out".into()),
        }
        let mut outputs = if job.dumps.is_empty() {
            BTreeMap::new()
        } else {
            let text =
                std::fs::read_to_string(&out).map_err(|e| format!("reading the dump: {e}"))?;
            parse_dump(&text)?
        };
        add_captures(
            &mut outputs,
            job.capture,
            std::fs::read(&statistics).ok(),
            &output.stdout,
        );
        Ok(outputs)
    }
}

pub fn add_captures(
    outputs: &mut BTreeMap<String, Vec<u8>>,
    capture: Capture,
    statistics: Option<Vec<u8>>,
    stdout: &str,
) {
    if let (true, Some(bytes)) = (capture.statistics, statistics) {
        outputs.insert(STATISTICS.to_string(), bytes);
    }
    if capture.timing {
        outputs.insert(TIMING.to_string(), stdout.as_bytes().to_vec());
    }
}

pub fn parse_timing(stdout: &str) -> Vec<f64> {
    let mut lines = stdout.lines();
    let mut times = Vec::new();
    while let Some(line) = lines.next() {
        if !line.trim_start().starts_with("Execution timing") {
            continue;
        }
        if let Some(values) = lines.next() {
            times.extend(
                values
                    .split(',')
                    .filter_map(|value| value.trim().parse::<f64>().ok()),
            );
        }
    }
    times
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
    let tensors = field("maxTensorDimensionCount:")
        .and_then(|rank| rank.parse().ok())
        .map(|max_rank| TensorSupport {
            max_rank,
            stages: field("shaderTensorSupportedStages:")
                .and_then(|stages| stages.parse().ok())
                .unwrap_or(0),
        });
    Some(Device {
        name,
        api_version,
        driver,
        cooperative: cooperative::parse_support(text),
        tensors,
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
    fn parses_execution_timing() {
        let stdout = "Execution timing (in script-order):\n    0.5, 0.25, 1e-3\n\nExecution time median = 0.25 ms\n";
        assert_eq!(parse_timing(stdout), [0.5, 0.25, 0.001]);
        assert!(parse_timing("Summary: 1 pass\n").is_empty());
        let mut outputs = BTreeMap::new();
        add_captures(
            &mut outputs,
            Capture {
                statistics: true,
                timing: false,
            },
            Some(b"{}".to_vec()),
            stdout,
        );
        assert_eq!(outputs.get(STATISTICS).map(Vec::as_slice), Some(&b"{}"[..]));
        assert!(!outputs.contains_key(TIMING));
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
        assert_eq!(device.tensors, None);
        let layered = format!(
            "{}  maxTensorDimensionCount: 6\n  shaderTensorSupportedStages: 32\nEnd of physical device properties.\n",
            text.trim_end_matches("End of physical device properties.\n")
        );
        let tensors = parse_device(&layered)
            .and_then(|device| device.tensors)
            .context("no tensor support")?;
        assert_eq!(tensors.max_rank, 6);
        assert!(tensors.compute_only());
        Ok(())
    }
}
