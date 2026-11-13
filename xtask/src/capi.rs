use std::path::Path;

use anyhow::{Context, Result};

pub fn run(root: &Path, check: bool) -> Result<i32> {
    let crate_dir = root.join("rglsl-capi");
    let header_path = crate_dir.join("include").join("rglsl.h");
    let config = cbindgen::Config::from_file(crate_dir.join("cbindgen.toml"))
        .map_err(anyhow::Error::msg)
        .context("cannot read rglsl-capi/cbindgen.toml")?;
    let bindings = cbindgen::Builder::new()
        .with_crate(&crate_dir)
        .with_config(config)
        .generate()
        .context("cbindgen cannot generate the header of rglsl-capi")?;
    let mut generated = Vec::new();
    bindings.write(&mut generated);
    if check {
        let committed = std::fs::read(&header_path).unwrap_or_default();
        if committed != generated {
            eprintln!(
                "{} is out of date: run `cargo xtask capi-header`",
                header_path.display()
            );
            return Ok(1);
        }
        println!("{} is up to date", header_path.display());
        return Ok(0);
    }
    if let Some(directory) = header_path.parent() {
        std::fs::create_dir_all(directory)
            .with_context(|| format!("cannot create {}", directory.display()))?;
    }
    std::fs::write(&header_path, &generated)
        .with_context(|| format!("cannot write {}", header_path.display()))?;
    println!("wrote {}", header_path.display());
    Ok(0)
}
