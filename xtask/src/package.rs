use std::ffi::OsString;
use std::fmt::Write as _;
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};

use anyhow::{Context, Result, bail};
use serde_json::Value;

pub const ANDROID_API_LEVEL: u32 = 24;
pub const MACOS_DEPLOYMENT_TARGET: &str = "11.0";

const PROFILE: &str = "dist";
const INSTALL_NAME: &str = "@rpath/librglsl_c.dylib";
const SONAME: &str = "librglsl_c.so";

const README: &str = include_str!("package/README.md");
const PKG_CONFIG: &str = include_str!("package/rglsl.pc");
const PKG_CONFIG_STATIC: &str = include_str!("package/rglsl-static.pc");
const CMAKE_CONFIG: &str = include_str!("package/rglsl-config.cmake");
const CMAKE_CONFIG_VERSION: &str = include_str!("package/rglsl-config-version.cmake");

const SMOKE_SHADER: &str = "#version 450\n\
layout(location = 0) out vec4 color;\n\
void main() {\n    color = vec4(1.0);\n}\n";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Os {
    Linux,
    Windows,
    Apple,
    Android,
}

#[derive(Debug)]
struct Platform {
    target: &'static str,
    name: &'static str,
    title: &'static str,
    os: Os,
    elf_machine: Option<u16>,
}

const PLATFORMS: &[Platform] = &[
    Platform {
        target: "x86_64-unknown-linux-gnu",
        name: "linux-x86_64",
        title: "Linux x86_64",
        os: Os::Linux,
        elf_machine: Some(62),
    },
    Platform {
        target: "x86_64-pc-windows-msvc",
        name: "windows-x86_64",
        title: "Windows x86_64",
        os: Os::Windows,
        elf_machine: None,
    },
    Platform {
        target: "aarch64-apple-darwin",
        name: "macos-arm64",
        title: "macOS arm64",
        os: Os::Apple,
        elf_machine: None,
    },
    Platform {
        target: "aarch64-unknown-linux-gnu",
        name: "linux-arm64",
        title: "Linux arm64",
        os: Os::Linux,
        elf_machine: Some(183),
    },
    Platform {
        target: "x86_64-apple-darwin",
        name: "macos-x86_64",
        title: "macOS x86_64",
        os: Os::Apple,
        elf_machine: None,
    },
    Platform {
        target: "aarch64-linux-android",
        name: "android-arm64-v8a",
        title: "Android arm64-v8a",
        os: Os::Android,
        elf_machine: Some(183),
    },
];

impl Platform {
    fn find(target: &str) -> Result<&'static Platform> {
        PLATFORMS
            .iter()
            .find(|platform| platform.target == target)
            .with_context(|| {
                let known: Vec<&str> = PLATFORMS.iter().map(|platform| platform.target).collect();
                format!(
                    "no C package for `{target}`; the targets are {}",
                    known.join(", ")
                )
            })
    }

    fn shared(&self) -> &'static str {
        match self.os {
            Os::Linux | Os::Android => "librglsl_c.so",
            Os::Apple => "librglsl_c.dylib",
            Os::Windows => "rglsl_c.dll",
        }
    }

    fn shared_dir(&self) -> &'static str {
        if self.os == Os::Windows { "bin" } else { "lib" }
    }

    fn static_lib(&self) -> &'static str {
        if self.os == Os::Windows {
            "rglsl_c.lib"
        } else {
            "librglsl_c.a"
        }
    }

    fn import_lib(&self) -> Option<&'static str> {
        (self.os == Os::Windows).then_some("rglsl_c.dll.lib")
    }

    fn cli(&self) -> Option<&'static str> {
        match self.os {
            Os::Linux | Os::Apple => Some("rglsl"),
            Os::Windows => Some("rglsl.exe"),
            Os::Android => None,
        }
    }

    fn link_args(&self) -> Vec<String> {
        match self.os {
            Os::Apple => vec![
                "-C".into(),
                format!("link-arg=-Wl,-install_name,{INSTALL_NAME}"),
            ],
            Os::Linux | Os::Android => vec!["-C".into(), format!("link-arg=-Wl,-soname,{SONAME}")],
            Os::Windows => Vec::new(),
        }
    }
}

#[derive(Debug)]
pub struct COptions {
    pub target: String,
    pub out_dir: Option<PathBuf>,
    pub smoke: bool,
}

#[derive(Debug)]
struct Workspace {
    version: String,
    target_dir: PathBuf,
    publishable: Vec<(String, String)>,
}

pub fn package_c(root: &Path, options: &COptions) -> Result<i32> {
    let platform = Platform::find(&options.target)?;
    let workspace = workspace(root)?;
    let out_dir = output_dir(&workspace, options.out_dir.as_deref())?;
    let toolchain = Toolchain::new(platform)?;

    let native_libs = build_library(root, platform, &toolchain, PROFILE, Some(platform.target))?;
    if platform.cli().is_some() {
        let mut command = cargo_command(root, &toolchain);
        command.args([
            "build",
            "--locked",
            "-p",
            "rglsl-cli",
            "--profile",
            PROFILE,
            "--target",
            platform.target,
        ]);
        run(&mut command)?;
    }

    let artifacts = workspace.target_dir.join(platform.target).join(PROFILE);
    let stem = format!("rglsl-c-{}-{}", workspace.version, platform.name);
    let stage = out_dir.join(&stem);
    stage_files(root, platform, &toolchain, &artifacts, &stage)?;
    check_binaries(platform, &stage)?;
    let requirement = requirement(platform, &stage)?;
    write_metadata(
        platform,
        &workspace.version,
        &native_libs,
        &requirement,
        &stage,
    )?;
    let archive = archive(platform, &out_dir, &stem)?;
    println!("{}", archive.display());
    println!("runs on: {requirement}");
    println!("native-static-libs: {native_libs}");

    if options.smoke {
        if host_triple()? == platform.target {
            smoke(
                root,
                platform,
                &workspace.version,
                &archive,
                &stem,
                &out_dir,
            )?;
            println!("smoke test of {} passed", archive.display());
        } else {
            println!(
                "smoke test skipped: {} binaries do not run on this host",
                platform.target
            );
        }
    }
    Ok(0)
}

pub fn capi_cmake(root: &Path, profile: &str) -> Result<i32> {
    let host = host_triple()?;
    let platform = Platform::find(&host)?;
    let workspace = workspace(root)?;
    let toolchain = Toolchain::new(platform)?;
    let native_libs = build_library(root, platform, &toolchain, profile, None)?;
    let profile_dir = if profile == "dev" { "debug" } else { profile };
    let artifacts = workspace.target_dir.join(profile_dir);
    let directory = artifacts.join("cmake").join("rglsl");
    let paths = CMakePaths {
        include_dir: cmake_path(&root.join("rglsl-capi").join("include")),
        shared: cmake_path(&artifacts.join(platform.shared())),
        static_lib: cmake_path(&artifacts.join(platform.static_lib())),
        import_lib: platform
            .import_lib()
            .map(|import_lib| cmake_path(&artifacts.join(import_lib))),
    };
    write_cmake_package(
        &directory,
        platform,
        &workspace.version,
        &native_libs,
        &paths,
    )?;
    println!("{}", directory.display());
    Ok(0)
}

pub fn package_crates(root: &Path, out_dir: Option<&Path>, allow_dirty: bool) -> Result<i32> {
    let workspace = workspace(root)?;
    let out_dir = output_dir(&workspace, out_dir)?;
    let mut command = Command::new(cargo());
    command.current_dir(root).args(["package", "--locked"]);
    if allow_dirty {
        command.arg("--allow-dirty");
    }
    for (name, _) in &workspace.publishable {
        command.args(["-p", name]);
    }
    run(&mut command)?;
    for (name, version) in &workspace.publishable {
        let file = format!("{name}-{version}.crate");
        let source = workspace.target_dir.join("package").join(&file);
        let destination = out_dir.join(&file);
        std::fs::copy(&source, &destination)
            .with_context(|| format!("cannot copy {}", source.display()))?;
        let size = std::fs::metadata(&destination)
            .with_context(|| format!("cannot read {}", destination.display()))?
            .len();
        println!("{} {size}", destination.display());
    }
    Ok(0)
}

fn output_dir(workspace: &Workspace, requested: Option<&Path>) -> Result<PathBuf> {
    let out_dir = match requested {
        Some(path) => std::path::absolute(path)
            .with_context(|| format!("cannot resolve {}", path.display()))?,
        None => workspace.target_dir.join("dist"),
    };
    std::fs::create_dir_all(&out_dir)
        .with_context(|| format!("cannot create {}", out_dir.display()))?;
    Ok(out_dir)
}

fn workspace(root: &Path) -> Result<Workspace> {
    let mut command = Command::new(cargo());
    command
        .current_dir(root)
        .args(["metadata", "--no-deps", "--format-version", "1"]);
    let metadata: Value =
        serde_json::from_str(&output(&mut command)?).context("cannot parse cargo metadata")?;
    let target_dir = metadata["target_directory"]
        .as_str()
        .map(PathBuf::from)
        .context("cargo metadata has no target directory")?;
    let packages = metadata["packages"]
        .as_array()
        .context("cargo metadata has no packages")?;
    let mut version = None;
    let mut publishable = Vec::new();
    for package in packages {
        let (Some(name), Some(package_version)) =
            (package["name"].as_str(), package["version"].as_str())
        else {
            bail!("cargo metadata has a package without a name or a version");
        };
        if name == "rglsl-capi" {
            version = Some(package_version.to_string());
        }
        if package["publish"].is_null() {
            publishable.push((name.to_string(), package_version.to_string()));
        }
    }
    publishable.sort();
    Ok(Workspace {
        version: version.context("the workspace has no rglsl-capi package")?,
        target_dir,
        publishable,
    })
}

#[derive(Debug)]
struct Toolchain {
    env: Vec<(String, OsString)>,
    ndk_bin: Option<PathBuf>,
}

impl Toolchain {
    fn new(platform: &Platform) -> Result<Self> {
        let mut env = Vec::new();
        let key = platform.target.replace('-', "_");
        let mut ndk_bin = None;
        match platform.os {
            Os::Android => {
                let bin = ndk_bin_dir()?;
                let suffix = if cfg!(windows) { ".cmd" } else { "" };
                let clang = bin.join(format!(
                    "aarch64-linux-android{ANDROID_API_LEVEL}-clang{suffix}"
                ));
                if !clang.is_file() {
                    bail!("the Android NDK has no {}", clang.display());
                }
                let ar = bin.join(format!("llvm-ar{}", std::env::consts::EXE_SUFFIX));
                env.push((
                    format!("CARGO_TARGET_{}_LINKER", key.to_uppercase()),
                    clang.clone().into_os_string(),
                ));
                env.push((format!("CC_{key}"), clang.into_os_string()));
                env.push((format!("AR_{key}"), ar.into_os_string()));
                ndk_bin = Some(bin);
            }
            Os::Apple => {
                env.push((
                    "MACOSX_DEPLOYMENT_TARGET".into(),
                    MACOS_DEPLOYMENT_TARGET.into(),
                ));
            }
            Os::Linux | Os::Windows => {}
        }
        env.retain(|(name, _)| std::env::var_os(name).is_none());
        Ok(Self { env, ndk_bin })
    }
}

fn ndk_bin_dir() -> Result<PathBuf> {
    let ndk = ndk_root()?;
    let host = if cfg!(target_os = "macos") {
        "darwin-x86_64"
    } else if cfg!(windows) {
        "windows-x86_64"
    } else {
        "linux-x86_64"
    };
    let bin = ndk
        .join("toolchains")
        .join("llvm")
        .join("prebuilt")
        .join(host)
        .join("bin");
    if !bin.is_dir() {
        bail!(
            "the Android NDK at {} has no {}",
            ndk.display(),
            bin.display()
        );
    }
    Ok(bin)
}

fn ndk_root() -> Result<PathBuf> {
    for variable in [
        "ANDROID_NDK_HOME",
        "ANDROID_NDK_ROOT",
        "ANDROID_NDK_LATEST_HOME",
    ] {
        if let Some(path) = std::env::var_os(variable).filter(|path| !path.is_empty()) {
            return Ok(PathBuf::from(path));
        }
    }
    let mut parents = Vec::new();
    for variable in ["ANDROID_HOME", "ANDROID_SDK_ROOT"] {
        if let Some(path) = std::env::var_os(variable).filter(|path| !path.is_empty()) {
            parents.push(PathBuf::from(path).join("ndk"));
        }
    }
    if let Some(home) = std::env::var_os("HOME") {
        let home = PathBuf::from(home);
        parents.push(home.join("Library").join("Android").join("sdk").join("ndk"));
        parents.push(home.join("Android").join("Sdk").join("ndk"));
    }
    let mut newest: Option<(Vec<u64>, PathBuf)> = None;
    for parent in parents {
        let Ok(entries) = std::fs::read_dir(&parent) else {
            continue;
        };
        for entry in entries.flatten() {
            let name = entry.file_name();
            let Some(version) = name
                .to_str()
                .and_then(|name| name.split('.').map(|part| part.parse().ok()).collect())
            else {
                continue;
            };
            if newest.as_ref().is_none_or(|(best, _)| version > *best) {
                newest = Some((version, entry.path()));
            }
        }
    }
    newest.map(|(_, path)| path).context(
        "no Android NDK: set ANDROID_NDK_HOME or install one into the Android SDK's ndk directory",
    )
}

fn build_library(
    root: &Path,
    platform: &Platform,
    toolchain: &Toolchain,
    profile: &str,
    target: Option<&str>,
) -> Result<String> {
    let mut command = cargo_command(root, toolchain);
    command.args([
        "rustc",
        "--locked",
        "-p",
        "rglsl-capi",
        "--lib",
        "--crate-type",
        "cdylib,staticlib",
        "--profile",
        profile,
    ]);
    if let Some(target) = target {
        command.args(["--target", target]);
    }
    command
        .args(["--message-format", "json-diagnostic-rendered-ansi", "--"])
        .args(platform.link_args())
        .args(["--print", "native-static-libs"])
        .stderr(Stdio::inherit());
    let output = command
        .output()
        .with_context(|| format!("cannot start {command:?}"))?;
    let stdout = String::from_utf8_lossy(&output.stdout);
    let mut native_libs = None;
    for line in stdout.lines() {
        let Ok(message) = serde_json::from_str::<Value>(line) else {
            continue;
        };
        if message["reason"] != "compiler-message" {
            continue;
        }
        let Some(text) = message["message"]["message"].as_str() else {
            continue;
        };
        if let Some(libs) = text.strip_prefix("native-static-libs:") {
            native_libs.get_or_insert_with(|| libs.trim().to_string());
        } else if text.starts_with("link against the following native artifacts") {
            continue;
        } else if let Some(rendered) = message["message"]["rendered"].as_str() {
            eprint!("{rendered}");
        }
    }
    if !output.status.success() {
        bail!("{command:?} failed with {}", output.status);
    }
    native_libs.context("rustc did not print the native libraries of the static library")
}

fn stage_files(
    root: &Path,
    platform: &Platform,
    toolchain: &Toolchain,
    artifacts: &Path,
    stage: &Path,
) -> Result<()> {
    if stage.exists() {
        std::fs::remove_dir_all(stage)
            .with_context(|| format!("cannot remove {}", stage.display()))?;
    }
    copy(
        &root.join("rglsl-capi").join("include").join("rglsl.h"),
        &stage.join("include").join("rglsl.h"),
    )?;
    copy(
        &artifacts.join(platform.shared()),
        &stage.join(platform.shared_dir()).join(platform.shared()),
    )?;
    let static_lib = stage.join("lib").join(platform.static_lib());
    copy(&artifacts.join(platform.static_lib()), &static_lib)?;
    strip_debug_info(platform, toolchain, &static_lib)?;
    if let Some(import_lib) = platform.import_lib() {
        copy(
            &artifacts.join(import_lib),
            &stage.join("lib").join(import_lib),
        )?;
    }
    if let Some(cli) = platform.cli() {
        copy(&artifacts.join(cli), &stage.join("bin").join(cli))?;
    }
    copy(&root.join("LICENSE.MIT"), &stage.join("LICENSE-MIT"))?;
    copy(&root.join("LICENSE.APACHE"), &stage.join("LICENSE-APACHE"))?;
    Ok(())
}

fn strip_debug_info(platform: &Platform, toolchain: &Toolchain, path: &Path) -> Result<()> {
    let mut command = match (platform.os, &toolchain.ndk_bin) {
        (Os::Windows, _) => return Ok(()),
        (Os::Apple, _) => {
            let mut command = Command::new("strip");
            command.arg("-S");
            command
        }
        (Os::Android, Some(bin)) => {
            let mut command =
                Command::new(bin.join(format!("llvm-strip{}", std::env::consts::EXE_SUFFIX)));
            command.arg("--strip-debug");
            command
        }
        (Os::Android, None) => bail!("no Android NDK to strip {}", path.display()),
        (Os::Linux, _) => {
            let mut command = Command::new("strip");
            command.arg("--strip-debug");
            command
        }
    };
    run(command.arg(path))
}

fn check_binaries(platform: &Platform, stage: &Path) -> Result<()> {
    let shared = stage.join(platform.shared_dir()).join(platform.shared());
    if let Some(machine) = platform.elf_machine {
        let mut files = vec![shared.clone()];
        if let Some(cli) = platform.cli() {
            files.push(stage.join("bin").join(cli));
        }
        for file in files {
            let found = elf_machine(&file)?;
            if found != machine {
                bail!(
                    "{} is an ELF file for machine {found}, not {machine} ({})",
                    file.display(),
                    platform.target
                );
            }
            println!(
                "{}: 64-bit ELF for machine {machine} ({})",
                file.display(),
                platform.target
            );
        }
    }
    if platform.os == Os::Apple && cfg!(target_os = "macos") {
        let mut command = Command::new("otool");
        command.arg("-D").arg(&shared);
        let text = output(&mut command)?;
        if text.lines().nth(1).map(str::trim) != Some(INSTALL_NAME) {
            bail!(
                "the install name of {} is not {INSTALL_NAME}:\n{text}",
                shared.display()
            );
        }
        println!("{}: install name {INSTALL_NAME}", shared.display());
    }
    Ok(())
}

fn elf_machine(path: &Path) -> Result<u16> {
    let bytes = std::fs::read(path).with_context(|| format!("cannot read {}", path.display()))?;
    match bytes.get(..20) {
        Some([0x7f, b'E', b'L', b'F', 2, 1, .., low, high]) => {
            Ok(u16::from_le_bytes([*low, *high]))
        }
        _ => bail!("{} is not a little-endian 64-bit ELF file", path.display()),
    }
}

fn requirement(platform: &Platform, stage: &Path) -> Result<String> {
    Ok(match platform.os {
        Os::Linux => {
            let mut newest: Option<Vec<u32>> = None;
            let mut files = vec![stage.join("lib").join(platform.shared())];
            if let Some(cli) = platform.cli() {
                files.push(stage.join("bin").join(cli));
            }
            for file in files {
                let bytes = std::fs::read(&file)
                    .with_context(|| format!("cannot read {}", file.display()))?;
                for version in glibc_versions(&bytes) {
                    if newest.as_ref().is_none_or(|best| version > *best) {
                        newest = Some(version);
                    }
                }
            }
            let newest = newest.context("the Linux binaries reference no glibc version")?;
            let version: Vec<String> = newest.iter().map(u32::to_string).collect();
            format!(
                "{} with glibc {} or newer",
                platform.title,
                version.join(".")
            )
        }
        Os::Apple => format!("{} {MACOS_DEPLOYMENT_TARGET} or newer", platform.title),
        Os::Windows => "64-bit Windows 10 or newer with the Visual C++ runtime \
             (`vcruntime140.dll`, the Visual C++ Redistributable for Visual Studio 2015 or newer)"
            .to_string(),
        Os::Android => {
            format!("Android API level {ANDROID_API_LEVEL} (Android 7.0) or newer, arm64-v8a")
        }
    })
}

fn glibc_versions(bytes: &[u8]) -> Vec<Vec<u32>> {
    let needle = b"GLIBC_";
    let mut versions = Vec::new();
    for (start, window) in bytes.windows(needle.len()).enumerate() {
        if window != needle {
            continue;
        }
        let Some(rest) = bytes.get(start + needle.len()..) else {
            continue;
        };
        let end = rest
            .iter()
            .position(|byte| !(byte.is_ascii_digit() || *byte == b'.'))
            .unwrap_or(rest.len());
        let Some(text) = rest
            .get(..end)
            .and_then(|text| std::str::from_utf8(text).ok())
        else {
            continue;
        };
        if let Some(version) = text
            .split('.')
            .map(|part| part.parse().ok())
            .collect::<Option<Vec<u32>>>()
        {
            versions.push(version);
        }
    }
    versions
}

#[derive(Debug)]
struct CMakePaths {
    include_dir: String,
    shared: String,
    static_lib: String,
    import_lib: Option<String>,
}

fn cmake_path(path: &Path) -> String {
    path.display().to_string().replace('\\', "/")
}

fn native_lib_list(native_libs: &str) -> Vec<&str> {
    native_libs
        .split_whitespace()
        .filter(|lib| !lib.starts_with("/defaultlib:"))
        .collect()
}

fn major_minor(version: &str) -> Result<(&str, &str)> {
    let mut parts = version.split('.');
    match (parts.next(), parts.next()) {
        (Some(major), Some(minor)) => Ok((major, minor)),
        _ => bail!("the version `{version}` has no major and minor number"),
    }
}

fn write_cmake_package(
    directory: &Path,
    platform: &Platform,
    version: &str,
    native_libs: &str,
    paths: &CMakePaths,
) -> Result<()> {
    let (major, minor) = major_minor(version)?;
    let shared_property = match &paths.import_lib {
        Some(import_lib) => format!("IMPORTED_IMPLIB \"{import_lib}\""),
        None if platform.os == Os::Apple => format!("IMPORTED_SONAME \"{INSTALL_NAME}\""),
        None => format!("IMPORTED_SONAME \"{SONAME}\""),
    };
    let config = CMAKE_CONFIG
        .replace("@INCLUDE_DIR@", &paths.include_dir)
        .replace("@SHARED@", &paths.shared)
        .replace("@STATIC@", &paths.static_lib)
        .replace("@SHARED_PROPERTY@", &shared_property)
        .replace("@NATIVE_LIBS@", &native_lib_list(native_libs).join(";"));
    write(&directory.join("rglsl-config.cmake"), &config)?;
    let config_version = CMAKE_CONFIG_VERSION
        .replace("@VERSION@", version)
        .replace("@MAJOR@", major)
        .replace("@MINOR@", minor);
    write(
        &directory.join("rglsl-config-version.cmake"),
        &config_version,
    )
}

fn write_metadata(
    platform: &Platform,
    version: &str,
    native_libs: &str,
    requirement: &str,
    stage: &Path,
) -> Result<()> {
    let (major, minor) = major_minor(version)?;
    let prefix = "${_rglsl_prefix}";
    let paths = CMakePaths {
        include_dir: format!("{prefix}/include"),
        shared: format!("{prefix}/{}/{}", platform.shared_dir(), platform.shared()),
        static_lib: format!("{prefix}/lib/{}", platform.static_lib()),
        import_lib: platform
            .import_lib()
            .map(|import_lib| format!("{prefix}/lib/{import_lib}")),
    };
    write_cmake_package(
        &stage.join("lib").join("cmake").join("rglsl"),
        platform,
        version,
        native_libs,
        &paths,
    )?;
    let native_libs = native_lib_list(native_libs).join(" ");
    let fill = |template: &str| {
        template
            .replace("@VERSION@", version)
            .replace("@MAJOR@", major)
            .replace("@MINOR@", minor)
            .replace("@NATIVE_LIBS@", &native_libs)
    };
    if platform.os != Os::Windows {
        let pkg_config_dir = stage.join("lib").join("pkgconfig");
        write(&pkg_config_dir.join("rglsl.pc"), &fill(PKG_CONFIG))?;
        write(
            &pkg_config_dir.join("rglsl-static.pc"),
            &fill(PKG_CONFIG_STATIC),
        )?;
    }
    let readme = README
        .replace("@LAYOUT@", &layout(platform))
        .replace("@LINKING@", &linking(platform))
        .replace("@REQUIREMENT@", requirement)
        .replace("@PKG_CONFIG@", &pkg_config_section(platform))
        .replace("@PLATFORM@", platform.title)
        .replace("@TARGET@", platform.target);
    write(&stage.join("README.md"), &fill(&readme))
}

fn layout(platform: &Platform) -> String {
    let mut rows = String::from("| `include/rglsl.h` | the header |\n");
    let _ = writeln!(
        rows,
        "| `{}/{}` | the shared library |",
        platform.shared_dir(),
        platform.shared()
    );
    if let Some(import_lib) = platform.import_lib() {
        let _ = writeln!(
            rows,
            "| `lib/{import_lib}` | the import library of `{}` |",
            platform.shared()
        );
    }
    let _ = writeln!(
        rows,
        "| `lib/{}` | the static library |",
        platform.static_lib()
    );
    if let Some(cli) = platform.cli() {
        let _ = writeln!(
            rows,
            "| `bin/{cli}` | the command-line tool, `glslangValidator`-compatible for Vulkan GLSL; it does not need the libraries |"
        );
    }
    rows.push_str("| `lib/cmake/rglsl/` | the CMake package `rglsl` |\n");
    if platform.os != Os::Windows {
        rows.push_str(
            "| `lib/pkgconfig/` | the pkg-config files `rglsl` (shared) and `rglsl-static` |\n",
        );
    }
    rows.push_str("| `README.md` | this file |\n");
    rows
}

fn linking(platform: &Platform) -> String {
    let mut text = String::new();
    match platform.os {
        Os::Linux => text.push_str(
            "```sh\n\
             cc app.c -Iinclude -Llib -lrglsl_c -Wl,-rpath,'$ORIGIN/../lib'\n\
             cc app.c -Iinclude lib/librglsl_c.a @NATIVE_LIBS@\n\
             ```\n\n\
             The first line links the shared library: the run path makes `app` find\n\
             `librglsl_c.so` (its `SONAME`) in the `lib/` next to its own directory;\n\
             `LD_LIBRARY_PATH` works too. The second links the static library.\n",
        ),
        Os::Apple => text.push_str(
            "```sh\n\
             cc app.c -Iinclude -Llib -lrglsl_c -Wl,-rpath,@executable_path/../lib\n\
             cc app.c -Iinclude lib/librglsl_c.a @NATIVE_LIBS@\n\
             ```\n\n\
             The install name of the shared library is `@rpath/librglsl_c.dylib`: the program\n\
             that links it needs a run path to its directory. The second line links the static\n\
             library. The binaries are not notarized: when macOS refuses to load them from a\n\
             downloaded archive, run `xattr -dr com.apple.quarantine` on this directory.\n",
        ),
        Os::Windows => text.push_str(
            "```bat\n\
             cl app.c /Iinclude lib\\rglsl_c.dll.lib\n\
             cl app.c /Iinclude lib\\rglsl_c.lib @NATIVE_LIBS@\n\
             ```\n\n\
             The first line links the DLL through its import library; `bin\\rglsl_c.dll` goes next\n\
             to `app.exe`. The second links the static library. Both are built against the dynamic\n\
             C runtime (`/MD`, the default of `cl` and CMake).\n",
        ),
        Os::Android => {
            let _ = write!(
                text,
                "```sh\n\
                 $NDK/toolchains/llvm/prebuilt/$HOST/bin/aarch64-linux-android{ANDROID_API_LEVEL}-clang \\\n    \
                 app.c -Iinclude -Llib -lrglsl_c\n\
                 ```\n\n\
                 In an application, `lib/librglsl_c.so` (its `SONAME` is `librglsl_c.so`) goes into\n\
                 `jniLibs/arm64-v8a/` or is an imported library of the NDK build; link the static\n\
                 library `lib/librglsl_c.a` with @NATIVE_LIBS@. The NDK's CMake toolchain file\n\
                 searches packages only inside the sysroot: pass\n\
                 `-Drglsl_DIR=/path/to/this/directory/lib/cmake/rglsl` instead of\n\
                 `CMAKE_PREFIX_PATH`.\n"
            );
        }
    }
    text
}

fn pkg_config_section(platform: &Platform) -> String {
    if platform.os == Os::Windows {
        return String::new();
    }
    "\n## pkg-config\n\n\
     ```sh\n\
     export PKG_CONFIG_PATH=/path/to/this/directory/lib/pkgconfig\n\
     cc app.c $(pkg-config --cflags --libs rglsl)\n\
     cc app.c $(pkg-config --cflags --libs rglsl-static)\n\
     ```\n"
        .to_string()
}

fn archive(platform: &Platform, out_dir: &Path, stem: &str) -> Result<PathBuf> {
    let (file, mut command) = if platform.os == Os::Windows {
        let file = format!("{stem}.zip");
        let mut command = Command::new(windows_tar());
        command.args(["-a", "-c", "-f", &file, stem]);
        (file, command)
    } else {
        let file = format!("{stem}.tar.gz");
        let gnu = output(Command::new("tar").arg("--version"))?.contains("GNU tar");
        let mut command = Command::new("tar");
        command.env("COPYFILE_DISABLE", "1");
        if gnu {
            command.args(["--owner=0", "--group=0", "--numeric-owner"]);
        } else {
            command.args(["--uid", "0", "--gid", "0", "--uname", "", "--gname", ""]);
        }
        command.args(["-czf", &file, stem]);
        (file, command)
    };
    let path = out_dir.join(&file);
    if path.exists() {
        std::fs::remove_file(&path).with_context(|| format!("cannot remove {}", path.display()))?;
    }
    run(command.current_dir(out_dir))?;
    Ok(path)
}

fn windows_tar() -> PathBuf {
    if cfg!(windows) {
        let system_root = std::env::var_os("SystemRoot").unwrap_or_else(|| "C:\\Windows".into());
        PathBuf::from(system_root).join("System32").join("tar.exe")
    } else {
        PathBuf::from("tar")
    }
}

fn smoke(
    root: &Path,
    platform: &Platform,
    version: &str,
    archive: &Path,
    stem: &str,
    out_dir: &Path,
) -> Result<()> {
    let work = out_dir.join(format!("smoke-{}", platform.name));
    if work.exists() {
        std::fs::remove_dir_all(&work)
            .with_context(|| format!("cannot remove {}", work.display()))?;
    }
    std::fs::create_dir_all(&work).with_context(|| format!("cannot create {}", work.display()))?;
    let tar = if platform.os == Os::Windows {
        windows_tar()
    } else {
        PathBuf::from("tar")
    };
    run(Command::new(tar)
        .arg("-xf")
        .arg(archive)
        .arg("-C")
        .arg(&work))?;
    let stage = work.join(stem);
    let stage = stage.as_path();

    if let Some(cli) = platform.cli() {
        let cli = stage.join("bin").join(cli);
        let printed = output(Command::new(&cli).arg("--version"))?;
        if !printed.contains(version) {
            bail!("`rglsl --version` does not print {version}:\n{printed}");
        }
        write(&work.join("smoke.frag"), SMOKE_SHADER)?;
        run(Command::new(&cli)
            .current_dir(&work)
            .args(["-V", "smoke.frag", "-o", "smoke.spv"]))?;
        let spirv = std::fs::read(work.join("smoke.spv")).context("rglsl wrote no smoke.spv")?;
        if spirv.get(..4) != Some(&0x0723_0203_u32.to_le_bytes()[..]) {
            bail!("smoke.spv is not a SPIR-V module");
        }
        println!("{}: compiled smoke.frag", cli.display());
    }

    let build = work.join("cmake");
    run(Command::new("cmake")
        .arg("-S")
        .arg(root.join("samples").join("c"))
        .arg("-B")
        .arg(&build)
        .arg(format!("-DCMAKE_PREFIX_PATH={}", stage.display()))
        .arg("-DCMAKE_BUILD_TYPE=Release"))?;
    run(Command::new("cmake")
        .arg("--build")
        .arg(&build)
        .args(["--config", "Release"]))?;
    run(Command::new("ctest").arg("--test-dir").arg(&build).args([
        "-C",
        "Release",
        "--output-on-failure",
    ]))?;

    if platform.os == Os::Windows {
        return Ok(());
    }
    let has_pkg_config = Command::new("pkg-config")
        .arg("--version")
        .stdout(Stdio::null())
        .status()
        .is_ok_and(|status| status.success());
    if !has_pkg_config {
        println!("pkg-config not found: the pkg-config files are not tested");
        return Ok(());
    }
    let pkg_config_path = stage.join("lib").join("pkgconfig");
    for (package, compiler, standard, source) in [
        ("rglsl", "cc", "-std=c99", "main.c"),
        ("rglsl-static", "c++", "-std=c++17", "main.cpp"),
    ] {
        let flags = output(
            Command::new("pkg-config")
                .env("PKG_CONFIG_PATH", &pkg_config_path)
                .args(["--cflags", "--libs", package]),
        )?;
        let program = work.join(format!("pkg-config-{package}"));
        let mut command = Command::new(compiler);
        command
            .arg(standard)
            .arg(root.join("samples").join("c").join(source))
            .arg("-o")
            .arg(&program)
            .args(flags.split_whitespace());
        if package == "rglsl" {
            command.arg(format!("-Wl,-rpath,{}", stage.join("lib").display()));
        }
        run(&mut command)?;
        let directory = work.join(package);
        std::fs::create_dir_all(&directory)
            .with_context(|| format!("cannot create {}", directory.display()))?;
        run(Command::new(&program).arg(&directory).stdout(Stdio::null()))?;
        println!("pkg-config {package}: {source} builds and runs");
    }
    Ok(())
}

fn host_triple() -> Result<String> {
    let rustc = std::env::var_os("RUSTC").unwrap_or_else(|| "rustc".into());
    let text = output(Command::new(rustc).arg("-vV"))?;
    text.lines()
        .find_map(|line| line.strip_prefix("host: "))
        .map(str::to_string)
        .context("rustc -vV does not print the host")
}

fn cargo() -> OsString {
    std::env::var_os("CARGO").unwrap_or_else(|| "cargo".into())
}

fn cargo_command(root: &Path, toolchain: &Toolchain) -> Command {
    let mut command = Command::new(cargo());
    command.current_dir(root);
    for (name, value) in &toolchain.env {
        command.env(name, value);
    }
    command
}

fn run(command: &mut Command) -> Result<()> {
    let status = command
        .status()
        .with_context(|| format!("cannot start {command:?}"))?;
    if !status.success() {
        bail!("{command:?} failed with {status}");
    }
    Ok(())
}

fn output(command: &mut Command) -> Result<String> {
    let output = command
        .stderr(Stdio::inherit())
        .output()
        .with_context(|| format!("cannot start {command:?}"))?;
    if !output.status.success() {
        bail!("{command:?} failed with {}", output.status);
    }
    String::from_utf8(output.stdout).with_context(|| format!("{command:?} printed no UTF-8"))
}

fn copy(source: &Path, destination: &Path) -> Result<()> {
    if let Some(directory) = destination.parent() {
        std::fs::create_dir_all(directory)
            .with_context(|| format!("cannot create {}", directory.display()))?;
    }
    std::fs::copy(source, destination).with_context(|| {
        format!(
            "cannot copy {} to {}",
            source.display(),
            destination.display()
        )
    })?;
    Ok(())
}

fn write(path: &Path, contents: &str) -> Result<()> {
    if let Some(directory) = path.parent() {
        std::fs::create_dir_all(directory)
            .with_context(|| format!("cannot create {}", directory.display()))?;
    }
    std::fs::write(path, contents).with_context(|| format!("cannot write {}", path.display()))
}
