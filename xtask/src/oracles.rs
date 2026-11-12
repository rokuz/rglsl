//! The pinned reference tools: glslang and spirv-val.
//!
//! Pins live in `oracles.toml`. `cargo xtask oracles` builds them into
//! `target/oracles/bin/`, which is where `cargo xtask test` looks first.

use std::fmt::Write as _;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::time::Duration;

use anyhow::{anyhow, bail, Context, Result};

use crate::exec::amber::Amber;
use crate::process::{capture, checked, which};

#[derive(Debug, Clone)]
pub struct Pin {
    pub repo: String,
    pub commit: String,
}

#[derive(Debug, Clone)]
pub struct Release {
    pub repo: String,
    pub tag: String,
    pub asset: String,
    pub sha256: String,
}

#[derive(Debug, Clone)]
pub struct TensorLayerPins {
    pub layer: Pin,
    pub version: String,
    pub dependencies: Vec<(&'static str, &'static str, Pin)>,
}

#[derive(Debug, Clone)]
pub struct ExecPins {
    pub kosmickrisp: Release,
    pub amber: Pin,
    pub amber_vulkan_headers: Pin,
    pub tensor_layer: TensorLayerPins,
}

pub const TENSOR_LAYER_DEPENDENCIES: [(&str, &str); 6] = [
    ("glslang", "GLSLANG_PATH"),
    ("spirv-cross", "SPIRV_CROSS_PATH"),
    ("spirv-headers", "SPIRV_HEADERS_PATH"),
    ("spirv-tools", "SPIRV_TOOLS_PATH"),
    ("vulkan-headers", "VULKAN_HEADERS_PATH"),
    ("json", "JSON_PATH"),
];

pub const TENSOR_LAYER_TARGET: &str = "VkLayer_Tensor";
pub const TENSOR_LAYER_DLL: &str = "VkLayer_Tensor.dll";
pub const TENSOR_LAYER_VAR: &str = "RGLSL_TENSOR_LAYER";
pub const AMBER_SRC_VAR: &str = "RGLSL_AMBER_SRC";

pub const fn tensor_layer_file() -> &'static str {
    if cfg!(windows) {
        TENSOR_LAYER_DLL
    } else if cfg!(target_os = "macos") {
        "libVkLayer_Tensor.dylib"
    } else {
        "libVkLayer_Tensor.so"
    }
}

pub fn tensor_layer(root: &Path) -> Option<PathBuf> {
    if let Some(path) = std::env::var_os(TENSOR_LAYER_VAR) {
        return Some(PathBuf::from(path));
    }
    let built = oracles_dir(root).join("bin").join(tensor_layer_file());
    built.is_file().then_some(built)
}

pub fn amber_source_override() -> Option<PathBuf> {
    std::env::var_os(AMBER_SRC_VAR)
        .filter(|path| !path.is_empty())
        .map(PathBuf::from)
}

#[derive(Debug, Clone)]
pub struct Pins {
    pub glslang: Pin,
    pub spirv_tools: Pin,
    pub spirv_headers: Pin,
    pub exec: ExecPins,
}

pub fn load_pins(root: &Path) -> Result<Pins> {
    let path = root.join("oracles.toml");
    let text = fs::read_to_string(&path).with_context(|| format!("reading {}", path.display()))?;
    let table: toml::Table = text
        .parse()
        .with_context(|| format!("parsing {}", path.display()))?;
    let field = |name: &str, key: &str| -> Result<String> {
        table
            .get(name)
            .and_then(|v| v.as_table())
            .with_context(|| format!("oracles.toml: missing [{name}]"))?
            .get(key)
            .and_then(|v| v.as_str())
            .map(str::to_string)
            .with_context(|| format!("oracles.toml: missing {name}.{key}"))
    };
    let pin = |name: &str| -> Result<Pin> {
        Ok(Pin {
            repo: field(name, "repo")?,
            commit: field(name, "commit")?,
        })
    };
    Ok(Pins {
        glslang: pin("glslang")?,
        spirv_tools: pin("spirv-tools")?,
        spirv_headers: pin("spirv-headers")?,
        exec: ExecPins {
            kosmickrisp: Release {
                repo: field("kosmickrisp", "repo")?,
                tag: field("kosmickrisp", "tag")?,
                asset: field("kosmickrisp", "asset")?,
                sha256: field("kosmickrisp", "sha256")?,
            },
            amber: pin("amber")?,
            amber_vulkan_headers: pin("amber-vulkan-headers")?,
            tensor_layer: TensorLayerPins {
                layer: pin("ml-emulation-layer")?,
                version: field("ml-emulation-layer", "version")?,
                dependencies: TENSOR_LAYER_DEPENDENCIES
                    .iter()
                    .map(|(name, variable)| {
                        Ok((
                            *name,
                            *variable,
                            pin(&format!("ml-emulation-layer-{name}"))?,
                        ))
                    })
                    .collect::<Result<Vec<_>>>()?,
            },
        },
    })
}

pub fn oracles_dir(root: &Path) -> PathBuf {
    root.join("target").join("oracles")
}

/// The default glslang checkout used for the corpus.
pub fn default_glslang_src(root: &Path) -> PathBuf {
    oracles_dir(root).join("src").join("glslang")
}

#[derive(Debug, Clone, Copy)]
pub struct Selection {
    pub reference: bool,
    pub exec: bool,
}

pub fn kosmickrisp_dir(root: &Path) -> PathBuf {
    oracles_dir(root).join("kosmickrisp")
}

pub const EXEC_PLATFORM: bool = cfg!(all(target_os = "macos", target_arch = "aarch64"));

pub fn build(root: &Path, glslang_dir: Option<&Path>, selection: Selection) -> Result<()> {
    let pins = load_pins(root)?;
    let dir = oracles_dir(root);
    fs::create_dir_all(dir.join("src"))?;
    fs::create_dir_all(dir.join("bin"))?;
    let generator = if which("ninja").is_some() {
        vec!["-G".to_string(), "Ninja".to_string()]
    } else {
        Vec::new()
    };
    if selection.reference {
        build_reference(root, &pins, glslang_dir, &generator)?;
    }
    if selection.exec {
        if EXEC_PLATFORM {
            build_exec(root, &pins.exec, &generator)?;
        } else {
            eprintln!("[xtask] skipping the exec oracles: KosmicKrisp runs on macOS on arm64 only");
        }
    }
    write_stamp(root, &pins)?;
    eprintln!("[xtask] oracles ready in {}", dir.join("bin").display());
    Ok(())
}

pub fn build_remote(root: &Path) -> Result<()> {
    use crate::exec::amber::Device;
    use crate::exec::remote::{self, Remote, RemoteSpec};
    use crate::exec::TargetId;
    let pins = load_pins(root)?;
    let specs = RemoteSpec::from_env()?;
    if specs.is_empty() {
        bail!(
            "set {} to the SSH host aliases of Windows machines with Vulkan",
            remote::HOST_VAR
        );
    }
    let remotes: Vec<Remote> = specs
        .iter()
        .map(|spec| Remote::new(spec, Duration::from_secs(60)))
        .collect();
    let mut builds: Vec<&Remote> = Vec::new();
    for candidate in &remotes {
        if !builds
            .iter()
            .any(|b| b.build_key() == candidate.build_key())
        {
            builds.push(candidate);
        }
    }
    let local = remote::local_dir(root);
    let built = crate::exec::parallel_map(&builds, |remote| {
        remote
            .setup(&pins.exec, &local.join(remote.build_key()))
            .with_context(|| format!("preparing {}", remote.host))
    });
    built.into_iter().collect::<Result<Vec<()>>>()?;
    let mut failures = Vec::new();
    let mut found = Vec::new();
    for (spec, remote) in specs.iter().zip(&remotes) {
        match remote.device() {
            Ok(device) => found.push((spec, device)),
            Err(error) => failures.push(format!("{}: {error}", spec.entry())),
        }
    }
    let devices: Vec<(TargetId, Device)> = found
        .iter()
        .map(|(_, device)| (TargetId::Remote(String::new()), device.clone()))
        .collect();
    for ((spec, device), label) in found.iter().zip(crate::exec::target_labels(&devices)) {
        eprintln!(
            "[xtask] {}: Vulkan device {} (API {}, {}), exec target `{}`",
            spec.entry(),
            device.name,
            device.api_version,
            device.driver,
            label.label()
        );
        match device.tensors {
            Some(tensors) => eprintln!(
                "[xtask] {}: ML emulation layer {}: VK_ARM_tensors with tensors of rank up to {}",
                spec.entry(),
                pins.exec.tensor_layer.version,
                tensors.max_rank
            ),
            None => failures.push(format!(
                "{}: the ML emulation layer did not expose VK_ARM_tensors",
                spec.entry()
            )),
        }
    }
    if !failures.is_empty() {
        bail!("remote smoke check failed:\n{}", failures.join("\n"));
    }
    Ok(())
}

fn write_stamp(root: &Path, pins: &Pins) -> Result<()> {
    let dir = oracles_dir(root);
    let mut stamp = format!(
        "glslang = \"{}\"\nspirv-tools = \"{}\"\nspirv-headers = \"{}\"\n",
        pins.glslang.commit, pins.spirv_tools.commit, pins.spirv_headers.commit
    );
    if dir.join("bin").join("amber").is_file() {
        let amber = amber_source_override().map_or_else(
            || pins.exec.amber.commit.clone(),
            |src| format!("local {}", src.display()),
        );
        let _ = write!(
            stamp,
            "amber = \"{}\"\namber-vulkan-headers = \"{}\"\nkosmickrisp = \"{}\"\n",
            amber.replace('\\', "/").replace('"', "'"),
            pins.exec.amber_vulkan_headers.commit,
            pins.exec.kosmickrisp.tag
        );
    }
    if dir.join("bin").join(tensor_layer_file()).is_file() {
        let _ = writeln!(
            stamp,
            "ml-emulation-layer = \"{}\"",
            pins.exec.tensor_layer.layer.commit
        );
    }
    fs::write(dir.join("stamp.toml"), stamp)?;
    Ok(())
}

fn build_reference(
    root: &Path,
    pins: &Pins,
    glslang_dir: Option<&Path>,
    generator: &[String],
) -> Result<()> {
    let dir = oracles_dir(root);
    let src = dir.join("src");
    let build = dir.join("build");
    let bin = dir.join("bin");

    // glslang
    let glslang_src = match glslang_dir {
        Some(dir) => {
            let head = git_head(dir)?;
            if head != pins.glslang.commit {
                bail!(
                    "{} is at {head}, but oracles.toml pins glslang {}; check out the pinned commit or update the pin",
                    dir.display(),
                    pins.glslang.commit
                );
            }
            dir.to_path_buf()
        }
        None => {
            let dir = default_glslang_src(root);
            checkout(&pins.glslang, &dir)?;
            dir
        }
    };
    let glslang_build = build.join("glslang");
    checked(
        Command::new("cmake")
            .arg("-S")
            .arg(&glslang_src)
            .arg("-B")
            .arg(&glslang_build)
            .args(generator)
            .args([
                "-DCMAKE_BUILD_TYPE=Release",
                "-DENABLE_OPT=OFF",
                "-DGLSLANG_TESTS=OFF",
                "-DBUILD_TESTING=OFF",
                "-DENABLE_GLSLANG_BINARIES=ON",
            ]),
        "configure glslang",
    )?;
    checked(
        Command::new("cmake")
            .arg("--build")
            .arg(&glslang_build)
            .args(["--target", "glslang-standalone", "--parallel"]),
        "build glslang",
    )?;
    copy_binary(&glslang_build.join("StandAlone"), "glslang", &bin)?;

    // SPIRV-Tools (spirv-val only)
    let tools_src = src.join("spirv-tools");
    checkout(&pins.spirv_tools, &tools_src)?;
    checkout(
        &pins.spirv_headers,
        &tools_src.join("external").join("spirv-headers"),
    )?;
    let tools_build = build.join("spirv-tools");
    checked(
        Command::new("cmake")
            .arg("-S")
            .arg(&tools_src)
            .arg("-B")
            .arg(&tools_build)
            .args(generator)
            .args([
                "-DCMAKE_BUILD_TYPE=Release",
                "-DSPIRV_SKIP_TESTS=ON",
                "-DSPIRV_WERROR=OFF",
            ]),
        "configure SPIRV-Tools",
    )?;
    checked(
        Command::new("cmake")
            .arg("--build")
            .arg(&tools_build)
            .args(["--target", "spirv-val", "--parallel"]),
        "build spirv-val",
    )?;
    copy_binary(&tools_build.join("tools"), "spirv-val", &bin)
}

fn build_exec(root: &Path, pins: &ExecPins, generator: &[String]) -> Result<()> {
    let dir = fs::canonicalize(oracles_dir(root))?;
    let kk = dir.join("kosmickrisp");
    install_kosmickrisp(&dir, &kk, &pins.kosmickrisp)?;

    let (amber_src, headers, amber_build) = match amber_source_override() {
        Some(src) => {
            eprintln!(
                "[xtask] building Amber from the local sources in {} ({AMBER_SRC_VAR})",
                src.display()
            );
            let headers = dir.join("src").join("amber-vulkan-headers");
            checkout(&pins.amber_vulkan_headers, &headers)?;
            (src, headers, dir.join("build").join("amber-local"))
        }
        None => {
            let src = dir.join("src").join("amber");
            checkout(&pins.amber, &src)?;
            let headers = src.join("third_party").join("vulkan-headers");
            checkout(&pins.amber_vulkan_headers, &headers)?;
            (src, headers, dir.join("build").join("amber"))
        }
    };
    let loader = kk.join("lib").join("libvulkan.dylib");
    checked(
        Command::new("cmake")
            .arg("-S")
            .arg(&amber_src)
            .arg("-B")
            .arg(&amber_build)
            .args(generator)
            .args([
                "-DCMAKE_BUILD_TYPE=Release",
                "-DAMBER_SKIP_TESTS=ON",
                "-DAMBER_SKIP_SPIRV_TOOLS=ON",
                "-DAMBER_SKIP_SHADERC=ON",
                "-DAMBER_SKIP_LODEPNG=ON",
                "-DAMBER_DISABLE_WERROR=ON",
            ])
            .arg(format!("-DVulkan-Headers_SOURCE_DIR={}", headers.display()))
            .arg(format!("-DVulkan_LIBRARIES={}", loader.display())),
        "configure Amber",
    )?;
    checked(
        Command::new("cmake")
            .arg("--build")
            .arg(&amber_build)
            .args(["--target", "amber", "--parallel"]),
        "build Amber",
    )?;
    copy_binary(&amber_build, "amber", &dir.join("bin"))?;
    let layer = build_tensor_layer(&dir, &pins.tensor_layer, generator)?;

    let amber = Amber {
        binary: dir.join("bin").join("amber"),
        icd: kk.join("icd.json"),
        layer: Some(layer),
        timeout: Duration::from_secs(60),
    };
    let device = amber
        .device()
        .map_err(|error| anyhow!("KosmicKrisp smoke check failed: {error}"))?;
    eprintln!(
        "[xtask] Vulkan device: {} (API {}, {})",
        device.name, device.api_version, device.driver
    );
    let tensors = device.tensors.ok_or_else(|| {
        anyhow!("the ML emulation layer did not expose VK_ARM_tensors on KosmicKrisp")
    })?;
    eprintln!(
        "[xtask] ML emulation layer {}: VK_ARM_tensors with tensors of rank up to {}",
        pins.tensor_layer.version, tensors.max_rank
    );
    Ok(())
}

fn build_tensor_layer(dir: &Path, pins: &TensorLayerPins, generator: &[String]) -> Result<PathBuf> {
    let src = dir.join("src").join("eml");
    checkout(&pins.layer, &src.join("layer"))?;
    let mut definitions = Vec::new();
    for (name, variable, pin) in &pins.dependencies {
        let path = src.join(name);
        checkout(pin, &path)?;
        definitions.push(format!("-D{variable}={}", path.display()));
    }
    let build = dir.join("build").join("eml");
    let mut configure = Command::new("cmake");
    configure
        .arg("-S")
        .arg(src.join("layer"))
        .arg("-B")
        .arg(&build)
        .args(generator)
        .args(["-DCMAKE_BUILD_TYPE=Release", "-DBUILD_TESTING=OFF"])
        .args(&definitions);
    if cfg!(target_os = "macos") {
        configure.arg("-DCMAKE_CXX_FLAGS=-UEXPERIMENTAL_MOLTEN_VK_SUPPORT");
    }
    checked(&mut configure, "configure the ML emulation layer")?;
    checked(
        Command::new("cmake").arg("--build").arg(&build).args([
            "--target",
            TENSOR_LAYER_TARGET,
            "--parallel",
        ]),
        "build the ML emulation layer",
    )?;
    let name = tensor_layer_file();
    let built = build.join("tensor").join(name);
    let installed = dir.join("bin").join(name);
    let _ = fs::remove_file(&installed);
    fs::copy(&built, &installed).with_context(|| format!("copying {}", built.display()))?;
    Ok(installed)
}

fn install_kosmickrisp(oracles: &Path, kk: &Path, release: &Release) -> Result<()> {
    let marker = kk.join("release.txt");
    let wanted = format!("{} {}\n", release.tag, release.sha256);
    if fs::read_to_string(&marker).ok().as_deref() == Some(wanted.as_str()) {
        return Ok(());
    }
    let downloads = oracles.join("downloads");
    fs::create_dir_all(&downloads)?;
    let archive = downloads.join(format!("{}-{}", release.tag, release.asset));
    if !archive.is_file() || sha256(&archive)? != release.sha256 {
        let url = format!(
            "{}/releases/download/{}/{}",
            release.repo, release.tag, release.asset
        );
        let partial = archive.with_extension("part");
        checked(
            Command::new("curl")
                .args([
                    "--fail",
                    "--location",
                    "--silent",
                    "--show-error",
                    "--output",
                ])
                .arg(&partial)
                .arg(&url),
            &format!("download {url}"),
        )?;
        fs::rename(&partial, &archive)?;
    }
    let digest = sha256(&archive)?;
    if digest != release.sha256 {
        bail!(
            "{} has sha256 {digest}, but oracles.toml pins {}",
            archive.display(),
            release.sha256
        );
    }
    let _ = fs::remove_dir_all(kk);
    fs::create_dir_all(kk)?;
    checked(
        Command::new("unzip")
            .args(["-q", "-o"])
            .arg(&archive)
            .arg("-d")
            .arg(kk),
        "unpack KosmicKrisp",
    )?;
    let library = kk.join("lib").join("libvulkan_kosmickrisp.dylib");
    if !library.is_file() {
        bail!(
            "{} is missing from the KosmicKrisp release",
            library.display()
        );
    }
    fs::write(kk.join("icd.json"), icd_manifest_text(&library))?;
    fs::write(marker, wanted)?;
    Ok(())
}

pub fn icd_manifest_text(library: &Path) -> String {
    let path = library
        .display()
        .to_string()
        .replace('\\', "\\\\")
        .replace('"', "\\\"");
    format!(
        "{{\n    \"file_format_version\": \"1.0.1\",\n    \"ICD\": {{\n        \"library_path\": \"{path}\",\n        \"api_version\": \"1.4.0\"\n    }}\n}}\n"
    )
}

fn sha256(path: &Path) -> Result<String> {
    let output = capture(Command::new("shasum").args(["-a", "256"]).arg(path))
        .with_context(|| format!("hashing {}", path.display()))?;
    output
        .split_whitespace()
        .next()
        .map(str::to_string)
        .context("shasum printed nothing")
}

/// Clones `pin.repo` into `dir` (shallow) and checks out `pin.commit`.
fn checkout(pin: &Pin, dir: &Path) -> Result<()> {
    if dir.join(".git").exists() && git_head(dir).ok().as_deref() == Some(pin.commit.as_str()) {
        return Ok(());
    }
    fs::create_dir_all(dir)?;
    if !dir.join(".git").exists() {
        checked(
            Command::new("git").arg("-C").arg(dir).arg("init").arg("-q"),
            "git init",
        )?;
        checked(
            Command::new("git")
                .arg("-C")
                .arg(dir)
                .args(["remote", "add", "origin", &pin.repo]),
            "git remote add",
        )?;
    }
    checked(
        Command::new("git").arg("-C").arg(dir).args([
            "fetch",
            "-q",
            "--depth",
            "1",
            "origin",
            &pin.commit,
        ]),
        &format!("fetch {} {}", pin.repo, pin.commit),
    )?;
    checked(
        Command::new("git")
            .arg("-C")
            .arg(dir)
            .args(["checkout", "-q", "--detach", "FETCH_HEAD"]),
        "git checkout",
    )
}

pub fn git_head(dir: &Path) -> Result<String> {
    capture(
        Command::new("git")
            .arg("-C")
            .arg(dir)
            .args(["rev-parse", "HEAD"]),
    )
    .with_context(|| format!("reading the git HEAD of {}", dir.display()))
}

fn copy_binary(from_dir: &Path, name: &str, to_dir: &Path) -> Result<()> {
    let exe = format!("{name}{}", std::env::consts::EXE_SUFFIX);
    let from = from_dir.join(&exe);
    let to = to_dir.join(&exe);
    match fs::remove_file(&to) {
        Err(error) if error.kind() != std::io::ErrorKind::NotFound => {
            return Err(error).with_context(|| format!("removing {}", to.display()));
        }
        _ => {}
    }
    fs::copy(&from, &to).with_context(|| format!("copying {}", from.display()))?;
    Ok(())
}

/// A resolved oracle binary and whether it is the pinned build.
#[derive(Debug, Clone)]
pub struct Tool {
    pub path: PathBuf,
    pub pinned: bool,
}

/// Finds an oracle: `$env_var`, then `target/oracles/bin`, then `PATH`.
pub fn find_tool(root: &Path, name: &str, env_var: &str) -> Result<Tool> {
    if let Some(path) = std::env::var_os(env_var) {
        return Ok(Tool {
            path: PathBuf::from(path),
            pinned: false,
        });
    }
    let built = oracles_dir(root)
        .join("bin")
        .join(format!("{name}{}", std::env::consts::EXE_SUFFIX));
    if built.is_file() {
        return Ok(Tool {
            path: built,
            pinned: true,
        });
    }
    if let Some(path) = which(name) {
        return Ok(Tool {
            path,
            pinned: false,
        });
    }
    bail!("`{name}` not found: run `cargo xtask oracles` or set {env_var}")
}
