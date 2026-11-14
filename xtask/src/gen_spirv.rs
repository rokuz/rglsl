mod backend;
mod cpp;
mod disassembler;
mod grammar;

use std::collections::BTreeMap;
use std::io::Write as _;
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};

use anyhow::{Context, Result, bail};

use crate::oracles;

const GLSLANG_HEADERS: &[&str] = &[
    "spirv.hpp11",
    "GLSL.std.450.h",
    "GLSL.ext.AMD.h",
    "GLSL.ext.ARM.h",
    "GLSL.ext.EXT.h",
    "GLSL.ext.KHR.h",
    "GLSL.ext.NV.h",
    "GLSL.ext.QCOM.h",
    "NonSemanticShaderDebugInfo.h",
];

pub fn run(root: &Path, glslang_dir: Option<&Path>, check: bool) -> Result<i32> {
    let pins = oracles::load_pins(root)?;
    let glslang = glslang_dir.map_or_else(|| oracles::default_glslang_src(root), Path::to_path_buf);
    let headers = oracles::oracles_dir(root)
        .join("src")
        .join("spirv-tools")
        .join("external")
        .join("spirv-headers");
    for (dir, pin, name) in [
        (&glslang, &pins.glslang.commit, "glslang"),
        (&headers, &pins.spirv_headers.commit, "SPIRV-Headers"),
    ] {
        let head = oracles::git_head(dir).with_context(|| {
            format!(
                "{name} is not checked out in {}: run `cargo xtask oracles`",
                dir.display()
            )
        })?;
        if &head != pin {
            bail!(
                "{} is at {head}, not at the pinned {name} commit {pin} (oracles.toml)",
                dir.display()
            );
        }
    }

    let spirv = glslang.join("SPIRV");
    let mut symbols = cpp::Symbols::default();
    for header in GLSLANG_HEADERS {
        symbols.add_header(&read(&spirv.join(header))?);
    }
    let unified = headers.join("include").join("spirv").join("unified1");
    let mut grammars: BTreeMap<&str, grammar::Grammar> = BTreeMap::new();
    for section in backend::SECTIONS {
        if !grammars.contains_key(section.grammar) {
            let path = unified.join(format!("{}.grammar.json", section.grammar));
            grammars.insert(section.grammar, grammar::Grammar::load(&path)?);
        }
    }
    let core = grammars
        .get(backend::CORE)
        .context("the core grammar is not loaded")?;

    let doc = read(&spirv.join("doc.cpp"))?;
    let disassemble = read(&spirv.join("disassemble.cpp"))?;
    let outputs = [
        (
            root.join("rglsl")
                .join("src")
                .join("back")
                .join("spv")
                .join("grammar.rs"),
            rustfmt(root, &backend::generate(&grammars, &symbols)?)?,
        ),
        (
            root.join("rglsl-cli")
                .join("src")
                .join("disassemble")
                .join("glslang_tables.rs"),
            disassembler::generate(&disassembler::Sources {
                doc: &doc,
                disassemble: &disassemble,
                symbols: &symbols,
                grammar: core,
            })?,
        ),
    ];

    let mut stale = false;
    for (path, generated) in outputs {
        let committed = std::fs::read_to_string(&path).unwrap_or_default();
        if committed == generated {
            println!("{} is up to date", relative(root, &path).display());
            continue;
        }
        if check {
            eprintln!(
                "{} is out of date: run `cargo xtask gen-spirv`",
                relative(root, &path).display()
            );
            stale = true;
            continue;
        }
        std::fs::write(&path, generated)
            .with_context(|| format!("cannot write {}", path.display()))?;
        println!("wrote {}", relative(root, &path).display());
    }
    Ok(i32::from(stale))
}

fn read(path: &Path) -> Result<String> {
    std::fs::read_to_string(path).with_context(|| format!("cannot read {}", path.display()))
}

fn relative(root: &Path, path: &Path) -> PathBuf {
    path.strip_prefix(root).unwrap_or(path).to_path_buf()
}

fn rustfmt(root: &Path, text: &str) -> Result<String> {
    let mut child = Command::new("rustfmt")
        .args(["--edition", "2024"])
        .current_dir(root)
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .context("cannot run rustfmt")?;
    child
        .stdin
        .take()
        .context("rustfmt has no stdin")?
        .write_all(text.as_bytes())
        .context("cannot write to rustfmt")?;
    let output = child.wait_with_output().context("rustfmt failed")?;
    if !output.status.success() {
        bail!(
            "rustfmt rejects the generated code: {}",
            String::from_utf8_lossy(&output.stderr)
        );
    }
    String::from_utf8(output.stdout).context("rustfmt printed invalid UTF-8")
}
