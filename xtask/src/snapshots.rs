use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::time::Duration;

use anyhow::{Context, Result, bail};

use crate::oracles;
use crate::process::{self, Exit};

const TIMEOUT: Duration = Duration::from_secs(60);

pub fn run(root: &Path) -> Result<i32> {
    let spirv_as = oracles::find_tool(root, "spirv-as", "RGLSL_SPIRV_AS")?;
    let spirv_val = oracles::find_tool(root, "spirv-val", "RGLSL_SPIRV_VAL")?;
    let snapshots = root.join("rglsl").join("tests").join("out").join("spv");
    let mut files = fs::read_dir(&snapshots)
        .with_context(|| format!("reading {}", snapshots.display()))?
        .map(|entry| entry.map(|entry| entry.path()))
        .collect::<Result<Vec<PathBuf>, _>>()?;
    files.retain(|path| {
        path.extension()
            .is_some_and(|extension| extension == "spvasm")
    });
    files.sort();
    let scratch = root.join("target").join("xtask").join("snapshots");
    fs::create_dir_all(&scratch).with_context(|| format!("creating {}", scratch.display()))?;
    let mut invalid = 0;
    for file in &files {
        if let Err(error) = validate(file, &scratch, &spirv_as.path, &spirv_val.path) {
            eprintln!("{}: {error:#}", file.display());
            invalid += 1;
        }
    }
    eprintln!(
        "[xtask] {} SPIR-V snapshots validated, {invalid} invalid",
        files.len()
    );
    Ok(if invalid == 0 { 0 } else { 1 })
}

fn validate(file: &Path, scratch: &Path, spirv_as: &Path, spirv_val: &Path) -> Result<()> {
    let text = fs::read_to_string(file)?;
    let version = text
        .lines()
        .find_map(|line| line.strip_prefix("; Version: "))
        .map(str::trim)
        .context("no `; Version:` header")?;
    let target_env = target_env(version)?;
    let name = file.file_stem().context("a snapshot without a file name")?;
    let binary = scratch.join(name).with_extension("spv");
    let mut assemble = Command::new(spirv_as);
    assemble
        .arg("--target-env")
        .arg(format!("spv{version}"))
        .arg(file)
        .arg("-o")
        .arg(&binary);
    succeeded(process::run(assemble, TIMEOUT)?, "spirv-as")?;
    let mut check = Command::new(spirv_val);
    check.arg("--target-env").arg(target_env).arg(&binary);
    succeeded(process::run(check, TIMEOUT)?, "spirv-val")
}

fn target_env(version: &str) -> Result<&'static str> {
    Ok(match version {
        "1.0" => "vulkan1.0",
        "1.1" | "1.2" | "1.3" => "vulkan1.1",
        "1.4" => "vulkan1.1spv1.4",
        "1.5" => "vulkan1.2",
        "1.6" => "vulkan1.3",
        other => bail!("SPIR-V {other} has no Vulkan target environment"),
    })
}

fn succeeded(output: process::Output, tool: &str) -> Result<()> {
    match output.exit {
        Exit::Code(0) => Ok(()),
        Exit::Code(code) => bail!(
            "{tool} exited with {code}:\n{}{}",
            output.stdout,
            output.stderr
        ),
        Exit::Signal => bail!("{tool} was killed"),
        Exit::Timeout => bail!("{tool} timed out"),
    }
}
