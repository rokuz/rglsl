//! The pinned reference tools: glslang and spirv-val.
//!
//! Pins live in `oracles.toml`. `cargo xtask oracles` builds them into
//! `target/oracles/bin/`, which is where `cargo xtask test` looks first.

use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;

use anyhow::{bail, Context, Result};

use crate::process::{capture, checked, which};

#[derive(Debug, Clone)]
pub struct Pin {
    pub repo: String,
    pub commit: String,
}

#[derive(Debug, Clone)]
pub struct Pins {
    pub glslang: Pin,
    pub spirv_tools: Pin,
    pub spirv_headers: Pin,
}

pub fn load_pins(root: &Path) -> Result<Pins> {
    let path = root.join("oracles.toml");
    let text = fs::read_to_string(&path).with_context(|| format!("reading {}", path.display()))?;
    let table: toml::Table = text
        .parse()
        .with_context(|| format!("parsing {}", path.display()))?;
    let pin = |name: &str| -> Result<Pin> {
        let section = table
            .get(name)
            .and_then(|v| v.as_table())
            .with_context(|| format!("oracles.toml: missing [{name}]"))?;
        let field = |key: &str| -> Result<String> {
            section
                .get(key)
                .and_then(|v| v.as_str())
                .map(str::to_string)
                .with_context(|| format!("oracles.toml: missing {name}.{key}"))
        };
        Ok(Pin {
            repo: field("repo")?,
            commit: field("commit")?,
        })
    };
    Ok(Pins {
        glslang: pin("glslang")?,
        spirv_tools: pin("spirv-tools")?,
        spirv_headers: pin("spirv-headers")?,
    })
}

pub fn oracles_dir(root: &Path) -> PathBuf {
    root.join("target").join("oracles")
}

/// The default glslang checkout used for the corpus.
pub fn default_glslang_src(root: &Path) -> PathBuf {
    oracles_dir(root).join("src").join("glslang")
}

/// Fetches the pinned sources and builds `glslang` and `spirv-val`.
pub fn build(root: &Path, glslang_dir: Option<&Path>) -> Result<()> {
    let pins = load_pins(root)?;
    let dir = oracles_dir(root);
    let src = dir.join("src");
    let build = dir.join("build");
    let bin = dir.join("bin");
    fs::create_dir_all(&src)?;
    fs::create_dir_all(&bin)?;

    let generator = if which("ninja").is_some() {
        vec!["-G".to_string(), "Ninja".to_string()]
    } else {
        Vec::new()
    };

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
            .args(&generator)
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
            .args(&generator)
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
    copy_binary(&tools_build.join("tools"), "spirv-val", &bin)?;

    fs::write(
        dir.join("stamp.toml"),
        format!(
            "glslang = \"{}\"\nspirv-tools = \"{}\"\nspirv-headers = \"{}\"\n",
            pins.glslang.commit, pins.spirv_tools.commit, pins.spirv_headers.commit
        ),
    )?;
    eprintln!("[xtask] oracles ready in {}", bin.display());
    Ok(())
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
    fs::copy(&from, to_dir.join(&exe)).with_context(|| format!("copying {}", from.display()))?;
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
