use std::fmt::Write as _;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::time::{Duration, SystemTime, UNIX_EPOCH};

use anyhow::{anyhow, bail, Result};

use super::amber::{first_line, parse_device, Device, VULKAN_VERSION};
use super::batch::{self, Job, JobResult};
use crate::oracles::{self, ExecPins, TENSOR_LAYER_DLL, TENSOR_LAYER_TARGET};
use crate::process::{self, Exit};

pub const HOST_VAR: &str = "RGLSL_EXEC_REMOTE";
pub const DIR_VAR: &str = "RGLSL_EXEC_REMOTE_DIR";
pub const JOBS_VAR: &str = "RGLSL_EXEC_REMOTE_JOBS";
const DEFAULT_DIR: &str = "C:/rglsl-exec";
const DEFAULT_JOBS: usize = 4;
const BATCH_LIMIT: usize = 400;
const DRIVER: &str = include_str!("driver.py");
const CONNECT: Duration = Duration::from_secs(120);
const BUILD: Duration = Duration::from_secs(3 * 3600);

static BATCHES: AtomicUsize = AtomicUsize::new(0);

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct RemoteSpec {
    pub host: String,
    pub device: Option<String>,
}

impl RemoteSpec {
    pub fn from_env() -> Result<Vec<Self>> {
        let text = std::env::var(HOST_VAR).unwrap_or_default();
        parse_specs(&text).map_err(|error| anyhow!("{HOST_VAR}: {error}"))
    }

    pub fn entry(&self) -> String {
        match &self.device {
            Some(device) => format!("{}@{device}", self.host),
            None => self.host.clone(),
        }
    }

    pub fn matches(&self, name: &str) -> bool {
        let name = name.trim();
        name.eq_ignore_ascii_case(&self.entry()) || name.eq_ignore_ascii_case(&self.host)
    }

    pub fn work_name(&self) -> String {
        let mut name = format!("remote-{}", slug(&self.host));
        if let Some(device) = &self.device {
            name.push('-');
            name.push_str(&slug(device));
        }
        name
    }
}

pub fn parse_specs(text: &str) -> Result<Vec<RemoteSpec>, String> {
    let mut specs: Vec<RemoteSpec> = Vec::new();
    for entry in text.split(',').map(str::trim).filter(|e| !e.is_empty()) {
        let (host, device) = match entry.split_once('@') {
            Some((host, device)) => (host.trim(), Some(device.trim())),
            None => (entry, None),
        };
        if host.is_empty() || host.contains(|c: char| c.is_whitespace() || c == '"' || c == '=') {
            return Err(format!("`{entry}` does not start with an SSH host alias"));
        }
        let device = match device {
            Some(device) if device.is_empty() || device.contains(['"', '@', '%']) => {
                return Err(format!("`{entry}` has no usable device name after `@`"));
            }
            Some(device) => Some(device.to_string()),
            None => None,
        };
        let spec = RemoteSpec {
            host: host.to_string(),
            device,
        };
        if specs
            .iter()
            .any(|s| s.entry().eq_ignore_ascii_case(&spec.entry()))
        {
            return Err(format!("`{entry}` is listed twice"));
        }
        specs.push(spec);
    }
    Ok(specs)
}

pub fn slug(text: &str) -> String {
    text.split(|c: char| !c.is_ascii_alphanumeric())
        .filter(|w| !w.is_empty())
        .map(str::to_ascii_lowercase)
        .collect::<Vec<_>>()
        .join("-")
}

fn per_host(text: &str, host: &str) -> Option<String> {
    let mut default = None;
    for item in text.split(',').map(str::trim).filter(|i| !i.is_empty()) {
        match item.split_once('=') {
            Some((name, value)) if name.trim() == host => return Some(value.trim().to_string()),
            Some(_) => {}
            None => default = Some(item.to_string()),
        }
    }
    default
}

fn host_setting(var: &str, host: &str) -> Option<String> {
    let text = std::env::var(var).ok()?;
    per_host(&text, host).filter(|v| !v.is_empty())
}

#[derive(Debug, Clone)]
pub struct Remote {
    pub host: String,
    pub device_name: Option<String>,
    pub dir: String,
    pub jobs: usize,
    pub timeout: Duration,
}

impl Remote {
    pub fn new(spec: &RemoteSpec, timeout: Duration) -> Self {
        let dir = host_setting(DIR_VAR, &spec.host)
            .map_or_else(|| DEFAULT_DIR.to_string(), |d| d.replace('\\', "/"));
        let jobs = host_setting(JOBS_VAR, &spec.host)
            .and_then(|j| j.parse().ok())
            .unwrap_or(DEFAULT_JOBS)
            .max(1);
        Self {
            host: spec.host.clone(),
            device_name: spec.device.clone(),
            dir: dir.trim_end_matches('/').to_string(),
            jobs,
            timeout,
        }
    }

    fn device_args(&self) -> String {
        self.device_name
            .as_ref()
            .map_or_else(String::new, |name| format!(" --device-name \"{name}\""))
    }

    fn path(&self, relative: &str) -> String {
        format!("{}/{relative}", self.dir)
    }

    fn windows(&self, relative: &str) -> String {
        self.path(relative).replace('/', "\\")
    }

    fn amber(&self) -> String {
        self.windows("bin/amber.exe")
    }

    fn tensor_layer(&self) -> String {
        self.windows(&format!("bin/{TENSOR_LAYER_DLL}"))
    }

    fn ssh_command(&self) -> Command {
        let mut command = Command::new("ssh");
        command.args([
            "-o",
            "BatchMode=yes",
            "-o",
            "ConnectTimeout=20",
            "-o",
            "ServerAliveInterval=15",
            "-o",
            "ServerAliveCountMax=4",
        ]);
        command.arg(&self.host);
        command
    }

    fn ssh(&self, remote: &str, timeout: Duration) -> Result<process::Output, String> {
        let mut command = self.ssh_command();
        command.arg(remote);
        process::run(command, timeout).map_err(|e| format!("ssh: {e:#}"))
    }

    fn ssh_ok(&self, remote: &str, timeout: Duration, what: &str) -> Result<String, String> {
        let output = self.ssh(remote, timeout)?;
        match output.exit {
            Exit::Code(0) => Ok(output.stdout),
            Exit::Code(code) => Err(format!(
                "{what} on the remote target exited with {code}: {}",
                first_line(&output.stderr, &output.stdout)
            )),
            Exit::Signal => Err(format!("{what}: ssh was killed")),
            Exit::Timeout => Err(format!("{what} on the remote target timed out")),
        }
    }

    fn scp(&self, args: &[String], timeout: Duration, what: &str) -> Result<(), String> {
        let mut command = Command::new("scp");
        command.args(["-q", "-o", "BatchMode=yes", "-o", "ConnectTimeout=20"]);
        command.args(args);
        let output = process::run(command, timeout).map_err(|e| format!("scp: {e:#}"))?;
        match output.exit {
            Exit::Code(0) => Ok(()),
            Exit::Timeout => Err(format!("{what}: scp timed out")),
            _ => Err(format!(
                "{what}: scp failed: {}",
                first_line(&output.stderr, &output.stdout)
            )),
        }
    }

    fn upload(&self, files: &[&Path], relative_dir: &str, timeout: Duration) -> Result<(), String> {
        let mut args: Vec<String> = files.iter().map(|f| f.display().to_string()).collect();
        args.push(format!("{}:{}/", self.host, self.path(relative_dir)));
        self.scp(&args, timeout, "uploading the batch")
    }

    fn download(&self, relative: &str, to: &Path, timeout: Duration) -> Result<(), String> {
        let args = [
            format!("{}:{}", self.host, self.path(relative)),
            to.display().to_string(),
        ];
        self.scp(&args, timeout, "downloading the results")
    }

    pub fn device(&self) -> Result<Device, String> {
        let query = format!(
            "\"{}\" -d -v {VULKAN_VERSION} -V{}",
            self.amber(),
            self.device_args()
        );
        let layer = self.tensor_layer();
        let output = self.ssh(
            &format!("if exist \"{layer}\" ({query} --layer-library \"{layer}\") else ({query})"),
            CONNECT,
        )?;
        if !matches!(output.exit, Exit::Code(0)) {
            return Err(format!(
                "amber on the remote target: {}",
                first_line(&output.stdout, &output.stderr)
            ));
        }
        parse_device(&output.stdout).ok_or_else(|| {
            format!(
                "amber on the remote target did not report a Vulkan device: {}",
                first_line(&output.stdout, &output.stderr)
            )
        })
    }

    pub fn setup(&self, pins: &ExecPins, local: &Path) -> Result<()> {
        fs::create_dir_all(local)?;
        let amber_src = oracles::amber_source_override();
        let script = local.join("rglsl-setup.bat");
        fs::write(
            &script,
            setup_script(pins, amber_src.is_some()).replace('\n', "\r\n"),
        )?;
        eprintln!("[xtask] preparing {} on {}", self.dir, self.host);
        self.ssh_ok(
            &format!("if not exist \"{0}\" mkdir \"{0}\"", self.windows("runs")),
            CONNECT,
            "creating the work directory",
        )
        .map_err(|e| anyhow!(e))?;
        let mut uploads = vec![script.clone()];
        if let Some(src) = &amber_src {
            let archive = local.join(AMBER_ARCHIVE);
            pack_amber_sources(src, &archive)?;
            eprintln!(
                "[xtask] uploading the local Amber sources in {} to {}",
                src.display(),
                self.host
            );
            uploads.push(archive);
        }
        let files: Vec<&Path> = uploads.iter().map(PathBuf::as_path).collect();
        self.upload(&files, "", CONNECT + Duration::from_secs(600))
            .map_err(|e| anyhow!(e))?;
        eprintln!(
            "[xtask] building Amber and the ML emulation layer on {} (MSVC, CMake, Ninja)",
            self.host
        );
        let mut command = self.ssh_command();
        command.arg(format!("\"{}\"", self.windows("rglsl-setup.bat")));
        let output = process::run(command, BUILD)?;
        let log = local.join("remote-setup.log");
        fs::write(&log, format!("{}\n{}", output.stdout, output.stderr))?;
        if !matches!(output.exit, Exit::Code(0)) {
            let tail: Vec<&str> = output
                .stdout
                .lines()
                .chain(output.stderr.lines())
                .filter(|l| !l.trim().is_empty())
                .collect();
            let start = tail.len().saturating_sub(15);
            bail!(
                "the Amber build on {} failed ({:?}); log in {}:\n{}",
                self.host,
                output.exit,
                log.display(),
                tail.get(start..).unwrap_or_default().join("\n")
            );
        }
        Ok(())
    }

    pub fn build_key(&self) -> String {
        format!("{}-{}", slug(&self.host), slug(&self.dir))
    }

    pub fn run(&self, root: &Path, jobs: &[Job]) -> Vec<JobResult> {
        let mut results = Vec::with_capacity(jobs.len());
        for range in batch::chunks(jobs.len(), BATCH_LIMIT) {
            let slice = jobs.get(range.clone()).unwrap_or_default();
            match self.run_batch(root, slice) {
                Ok(batch) => results.extend(batch),
                Err(error) => {
                    results.extend(slice.iter().map(|_| Err(format!("remote target: {error}"))));
                }
            }
        }
        results
    }

    fn run_batch(&self, root: &Path, jobs: &[Job]) -> Result<Vec<JobResult>, String> {
        if jobs.is_empty() {
            return Ok(Vec::new());
        }
        let stamp = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map_or(0, |d| d.as_millis());
        let id = format!(
            "b{}-{stamp}-{}",
            std::process::id(),
            BATCHES.fetch_add(1, Ordering::Relaxed)
        );
        let local = root.join("batches").join(&id);
        let _ = fs::remove_dir_all(&local);
        fs::create_dir_all(&local).map_err(|e| e.to_string())?;
        let result = self.exchange(root, &local, &id, jobs);
        let _ = self.ssh(
            &format!(
                "del /q \"{0}.py\" \"{0}.tgz\" \"{0}.out.tgz\" 2>nul & if exist \"{0}\" rmdir /s /q \"{0}\"",
                self.windows(&format!("runs/{id}"))
            ),
            CONNECT,
        );
        if result.is_ok() {
            let _ = fs::remove_dir_all(&local);
        }
        result
    }

    fn exchange(
        &self,
        root: &Path,
        local: &Path,
        id: &str,
        jobs: &[Job],
    ) -> Result<Vec<JobResult>, String> {
        let manifest_name = format!("batches/{id}/manifest.tsv");
        fs::write(local.join("manifest.tsv"), batch::manifest(root, jobs)?)
            .map_err(|e| e.to_string())?;
        let mut list = batch::dirs(root, jobs).join("\n");
        let _ = write!(list, "\n{manifest_name}\n");
        fs::write(local.join("files.txt"), list).map_err(|e| e.to_string())?;
        let archive = local.join(format!("{id}.tgz"));
        let mut tar = Command::new("tar");
        tar.env("COPYFILE_DISABLE", "1")
            .arg("-czf")
            .arg(&archive)
            .arg("-C")
            .arg(root)
            .arg("-T")
            .arg(local.join("files.txt"));
        let packed = process::run(tar, CONNECT).map_err(|e| format!("tar: {e:#}"))?;
        if !matches!(packed.exit, Exit::Code(0)) {
            return Err(format!(
                "packing the batch: {}",
                first_line(&packed.stderr, &packed.stdout)
            ));
        }
        let driver = local.join(format!("{id}.py"));
        fs::write(&driver, DRIVER).map_err(|e| e.to_string())?;
        let transfer = CONNECT + Duration::from_secs(600);
        self.upload(&[driver.as_path(), archive.as_path()], "runs", transfer)?;
        let rounds = u32::try_from(jobs.len().div_ceil(self.jobs)).unwrap_or(u32::MAX);
        let budget = self.timeout.saturating_mul(rounds.saturating_add(1)) + CONNECT;
        let base = format!("runs/{id}");
        let command = format!(
            "python \"{}.py\" \"{}.tgz\" \"{}\" \"{manifest_name}\" \"{}.out.tgz\" \"{}\" {} {} {VULKAN_VERSION} \"{}\"",
            self.windows(&base),
            self.windows(&base),
            self.windows(&base),
            self.windows(&base),
            self.amber(),
            self.jobs,
            self.timeout.as_secs().max(1),
            self.device_name.as_deref().unwrap_or_default()
        );
        self.ssh_ok(&command, budget, "the batch driver")?;
        let out = local.join("out.tgz");
        self.download(&format!("{base}.out.tgz"), &out, transfer)?;
        let mut untar = Command::new("tar");
        untar.arg("-xzf").arg(&out).arg("-C").arg(local);
        let unpacked = process::run(untar, CONNECT).map_err(|e| format!("tar: {e:#}"))?;
        if !matches!(unpacked.exit, Exit::Code(0)) {
            return Err(format!(
                "unpacking the results: {}",
                first_line(&unpacked.stderr, &unpacked.stdout)
            ));
        }
        Ok(read_results(&local.join("results"), jobs))
    }
}

fn read_results(dir: &Path, jobs: &[Job]) -> Vec<JobResult> {
    jobs.iter()
        .enumerate()
        .map(|(index, job)| {
            let status =
                fs::read_to_string(dir.join(format!("{index}.status"))).unwrap_or_default();
            let dump = fs::read_to_string(dir.join(format!("{index}.dump"))).ok();
            batch::parse_result(&status, dump.as_deref(), !job.dumps.is_empty())
        })
        .collect()
}

pub fn local_dir(root: &Path) -> PathBuf {
    root.join("target").join("xtask").join("remote")
}

const AMBER_ARCHIVE: &str = "amber-src.tgz";
const AMBER_ARCHIVE_EXCLUDES: [&str; 5] = [
    "./out",
    "./build",
    "./third_party/googletest",
    "./third_party/vulkan-headers",
    "./framebuffer.png",
];

fn pack_amber_sources(src: &Path, archive: &Path) -> Result<()> {
    let mut tar = Command::new("tar");
    tar.env("COPYFILE_DISABLE", "1").arg("-czf").arg(archive);
    for exclude in AMBER_ARCHIVE_EXCLUDES {
        tar.arg(format!("--exclude={exclude}"));
    }
    tar.arg("-C").arg(src).arg(".");
    let output = process::run(tar, CONNECT)?;
    if !matches!(output.exit, Exit::Code(0)) {
        bail!(
            "packing the Amber sources in {}: {}",
            src.display(),
            first_line(&output.stderr, &output.stdout)
        );
    }
    Ok(())
}

fn amber_sources(pins: &ExecPins, local_sources: bool) -> String {
    if local_sources {
        format!(
            "set \"SRC=%ROOT%src\\amber-local\"
set \"HEADERS=%ROOT%src\\amber-vulkan-headers\"
set \"BUILD=%ROOT%build\\amber-local\"
if not exist \"%ROOT%{AMBER_ARCHIVE}\" (echo {AMBER_ARCHIVE} is missing & exit /b 1)
if exist \"%SRC%\" rmdir /s /q \"%SRC%\"
mkdir \"%SRC%\" || exit /b 1
tar -xzf \"%ROOT%{AMBER_ARCHIVE}\" -C \"%SRC%\" || exit /b 1
del /q \"%ROOT%{AMBER_ARCHIVE}\"
call :checkout \"%HEADERS%\" {headers_repo} {headers_commit} || exit /b 1
set \"AMBER_PIN=local sources\"
",
            headers_repo = pins.amber_vulkan_headers.repo,
            headers_commit = pins.amber_vulkan_headers.commit,
        )
    } else {
        format!(
            "set \"SRC=%ROOT%src\\amber\"
set \"HEADERS=%SRC%\\third_party\\vulkan-headers\"
set \"BUILD=%ROOT%build\\amber\"
call :checkout \"%SRC%\" {amber_repo} {amber_commit} || exit /b 1
call :checkout \"%HEADERS%\" {headers_repo} {headers_commit} || exit /b 1
set \"AMBER_PIN={amber_commit}\"
",
            amber_repo = pins.amber.repo,
            amber_commit = pins.amber.commit,
            headers_repo = pins.amber_vulkan_headers.repo,
            headers_commit = pins.amber_vulkan_headers.commit,
        )
    }
}

fn tensor_layer_build(pins: &ExecPins) -> String {
    let layer = &pins.tensor_layer;
    let mut out = format!(
        "set \"EML=%ROOT%src\\eml\"
set \"EML_BUILD=%ROOT%build\\eml\"
call :checkout \"%EML%\\layer\" {} {} || exit /b 1
",
        layer.layer.repo, layer.layer.commit
    );
    let mut definitions = String::new();
    for (name, variable, pin) in &layer.dependencies {
        let _ = writeln!(
            out,
            "call :checkout \"%EML%\\{name}\" {} {} || exit /b 1",
            pin.repo, pin.commit
        );
        let _ = write!(definitions, " \"-D{variable}=%EML%\\{name}\"");
    }
    let _ = write!(
        out,
        "cmake -S \"%EML%\\layer\" -B \"%EML_BUILD%\" -G Ninja -DCMAKE_BUILD_TYPE=Release -DBUILD_TESTING=OFF{definitions} || exit /b 1
cmake --build \"%EML_BUILD%\" --target {TENSOR_LAYER_TARGET} --parallel || exit /b 1
copy /y \"%EML_BUILD%\\tensor\\{TENSOR_LAYER_DLL}\" \"%ROOT%bin\\{TENSOR_LAYER_DLL}\" >nul || exit /b 1
echo ml-emulation-layer {}> \"%ROOT%bin\\eml.pin\"
",
        layer.layer.commit
    );
    out
}

pub fn setup_script(pins: &ExecPins, local_sources: bool) -> String {
    format!(
        "@echo off
setlocal
set \"ROOT=%~dp0\"
{sources}set \"VSWHERE=%ProgramFiles(x86)%\\Microsoft Visual Studio\\Installer\\vswhere.exe\"
if not exist \"%VSWHERE%\" (echo vswhere.exe not found & exit /b 1)
set \"VS=\"
for /f \"usebackq delims=\" %%i in (`\"%VSWHERE%\" -latest -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath`) do set \"VS=%%i\"
if not defined VS (echo no Visual Studio with the C++ tools & exit /b 1)
call \"%VS%\\VC\\Auxiliary\\Build\\vcvars64.bat\" >nul || exit /b 1
if not defined VULKAN_SDK (echo VULKAN_SDK is not set & exit /b 1)
cmake -S \"%SRC%\" -B \"%BUILD%\" -G Ninja -DCMAKE_BUILD_TYPE=Release -DAMBER_SKIP_TESTS=ON -DAMBER_SKIP_SPIRV_TOOLS=ON -DAMBER_SKIP_SHADERC=ON -DAMBER_SKIP_LODEPNG=ON -DAMBER_DISABLE_WERROR=ON \"-DVulkan-Headers_SOURCE_DIR=%HEADERS%\" \"-DVulkan_LIBRARIES=%VULKAN_SDK%\\Lib\\vulkan-1.lib\" || exit /b 1
cmake --build \"%BUILD%\" --target amber --parallel || exit /b 1
if not exist \"%ROOT%bin\" mkdir \"%ROOT%bin\"
copy /y \"%BUILD%\\amber.exe\" \"%ROOT%bin\\amber.exe\" >nul || exit /b 1
echo amber %AMBER_PIN%> \"%ROOT%bin\\amber.pin\"
{tensor_layer}exit /b 0
:checkout
if not exist \"%~1\\.git\" (
  git init -q \"%~1\" || exit /b 1
  git -C \"%~1\" remote add origin %2 || exit /b 1
)
set \"HEAD=\"
for /f %%h in ('git -C \"%~1\" rev-parse HEAD 2^>nul') do set \"HEAD=%%h\"
if \"%HEAD%\"==\"%3\" exit /b 0
git -C \"%~1\" fetch -q --depth 1 origin %3 || exit /b 1
git -C \"%~1\" checkout -q --detach FETCH_HEAD || exit /b 1
exit /b 0
",
        sources = amber_sources(pins, local_sources),
        tensor_layer = tensor_layer_build(pins),
    )
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::oracles::{Pin, Release};

    #[test]
    fn setup_script_builds_the_pinned_amber() {
        let pins = ExecPins {
            kosmickrisp: Release {
                repo: String::new(),
                tag: String::new(),
                asset: String::new(),
                sha256: String::new(),
            },
            amber: Pin {
                repo: "https://example.com/amber".into(),
                commit: "abc".into(),
            },
            amber_vulkan_headers: Pin {
                repo: "https://example.com/headers".into(),
                commit: "def".into(),
            },
            tensor_layer: oracles::TensorLayerPins {
                layer: Pin {
                    repo: "https://example.com/layer".into(),
                    commit: "fed".into(),
                },
                version: "v1".into(),
                dependencies: vec![(
                    "glslang",
                    "GLSLANG_PATH",
                    Pin {
                        repo: "https://example.com/glslang".into(),
                        commit: "cab".into(),
                    },
                )],
            },
        };
        let script = setup_script(&pins, false);
        assert!(script.contains("call :checkout \"%SRC%\" https://example.com/amber abc"));
        assert!(script.contains("https://example.com/headers def"));
        assert!(script.contains("vcvars64.bat"));
        assert!(script.contains("%VULKAN_SDK%\\Lib\\vulkan-1.lib"));
        assert!(!script.contains("rem "));
        assert!(script.contains("call :checkout \"%EML%\\layer\" https://example.com/layer fed"));
        assert!(
            script.contains("call :checkout \"%EML%\\glslang\" https://example.com/glslang cab")
        );
        assert!(script.contains("\"-DGLSLANG_PATH=%EML%\\glslang\""));
        assert!(script.contains("--target VkLayer_Tensor"));
        assert!(script.contains("bin\\VkLayer_Tensor.dll"));
        assert!(!script.contains("amber-local"));
        let local = setup_script(&pins, true);
        assert!(local.contains("tar -xzf \"%ROOT%amber-src.tgz\" -C \"%SRC%\""));
        assert!(local.contains("call :checkout \"%HEADERS%\" https://example.com/headers def"));
        assert!(!local.contains("https://example.com/amber"));
    }

    #[test]
    fn remote_paths_use_the_work_directory() {
        let remote = Remote {
            host: "target".into(),
            device_name: Some("RTX".into()),
            dir: "C:/work".into(),
            jobs: 2,
            timeout: Duration::from_secs(5),
        };
        assert_eq!(remote.windows("runs/b1"), "C:\\work\\runs\\b1");
        assert_eq!(remote.amber(), "C:\\work\\bin\\amber.exe");
        assert_eq!(remote.path("runs"), "C:/work/runs");
        assert_eq!(remote.device_args(), " --device-name \"RTX\"");
    }

    #[test]
    fn parses_remote_targets_with_device_filters() -> Result<()> {
        let specs =
            parse_specs(" first, second@NVIDIA ,,third@Radeon RX ").map_err(|e| anyhow!(e))?;
        let entries: Vec<String> = specs.iter().map(RemoteSpec::entry).collect();
        assert_eq!(entries, ["first", "second@NVIDIA", "third@Radeon RX"]);
        assert_eq!(
            specs.get(1).map(RemoteSpec::work_name).as_deref(),
            Some("remote-second-nvidia")
        );
        assert!(specs
            .get(2)
            .is_some_and(|s| s.matches("THIRD") && s.matches("third@radeon rx")));
        assert!(parse_specs("").map_err(|e| anyhow!(e))?.is_empty());
        assert!(parse_specs("a@").is_err());
        assert!(parse_specs("@x").is_err());
        assert!(parse_specs("a@x\"y").is_err());
        assert!(parse_specs("a@x, a@X").is_err());
        assert!(parse_specs("a, a@x").is_ok());
        Ok(())
    }

    #[test]
    fn settings_can_differ_per_host() {
        assert_eq!(per_host("C:/a", "x").as_deref(), Some("C:/a"));
        assert_eq!(per_host("C:/a, x=D:/b", "x").as_deref(), Some("D:/b"));
        assert_eq!(per_host("x=D:/b,C:/a", "y").as_deref(), Some("C:/a"));
        assert_eq!(per_host("x=D:/b", "y"), None);
    }
}
