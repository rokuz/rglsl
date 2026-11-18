use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;

use anyhow::{Context, Result, bail};
use rglsl_fuzz::{Donor, FamilyOptions, Random, STAGE_EXTENSIONS, ShaderJob, generate_family};
use serde_json::{Map, Value};

use crate::exec;

pub const REFERENCES: &str = "rglsl-fuzz/tests/data/450";

#[derive(Debug, Clone)]
pub struct Generation {
    pub seed: u64,
    pub families: usize,
    pub variants: u32,
    pub args: String,
    pub generator: String,
}

#[derive(Debug)]
pub struct Generated {
    pub families: Vec<String>,
    pub failures: Vec<String>,
}

pub fn generator_hash(root: &Path) -> Result<String> {
    let head = git(root, &["rev-parse", "HEAD"])?;
    let status = git(root, &["status", "--porcelain", "--untracked-files=no"])?;
    Ok(if status.trim().is_empty() {
        head
    } else {
        format!("{head}-dirty")
    })
}

fn git(root: &Path, args: &[&str]) -> Result<String> {
    let output = Command::new("git")
        .arg("-C")
        .arg(root)
        .args(args)
        .output()
        .context("running git")?;
    if !output.status.success() {
        bail!(
            "git {} failed: {}",
            args.join(" "),
            String::from_utf8_lossy(&output.stderr).trim()
        );
    }
    Ok(String::from_utf8_lossy(&output.stdout).trim().to_string())
}

fn stage_files(dir: &Path) -> Result<Vec<PathBuf>> {
    let mut paths = Vec::new();
    for entry in fs::read_dir(dir).with_context(|| format!("reading {}", dir.display()))? {
        let path = entry?.path();
        if path
            .extension()
            .and_then(|extension| extension.to_str())
            .is_some_and(|extension| STAGE_EXTENSIONS.contains(&extension))
        {
            paths.push(path);
        }
    }
    paths.sort();
    Ok(paths)
}

fn read_donors(dir: &Path) -> Result<Vec<Donor>> {
    let mut donors = Vec::new();
    for path in stage_files(dir)? {
        let (Some(name), Some(extension)) = (
            path.file_stem().and_then(|stem| stem.to_str()),
            path.extension().and_then(|extension| extension.to_str()),
        ) else {
            continue;
        };
        let text = fs::read_to_string(&path)?;
        if let Ok(donor) = Donor::parse(name, extension, &text) {
            donors.push(donor);
        }
    }
    Ok(donors)
}

fn read_job(json: &Path) -> Result<ShaderJob> {
    let text = fs::read_to_string(json).with_context(|| format!("reading {}", json.display()))?;
    let mut sources = Vec::new();
    for extension in STAGE_EXTENSIONS {
        let shader = json.with_extension(extension);
        if shader.is_file() {
            sources.push((extension.to_owned(), fs::read_to_string(&shader)?));
        }
    }
    ShaderJob::parse(&text, &sources).with_context(|| format!("parsing {}", json.display()))
}

fn write_job(job: &ShaderJob, json: &Path) -> Result<()> {
    let emitted = job.emit()?;
    fs::write(json, emitted.json)?;
    for (extension, text) in emitted.shaders {
        fs::write(json.with_extension(extension), text)?;
    }
    Ok(())
}

pub fn references(root: &Path) -> Result<Vec<PathBuf>> {
    let dir = root.join(REFERENCES);
    let mut jobs = Vec::new();
    for entry in fs::read_dir(&dir).with_context(|| format!("reading {}", dir.display()))? {
        let path = entry?.path();
        if path
            .extension()
            .is_some_and(|extension| extension == "json")
            && read_job(&path).is_ok()
        {
            jobs.push(path);
        }
    }
    jobs.sort();
    if jobs.is_empty() {
        bail!("no reference shader jobs in {}", dir.display());
    }
    Ok(jobs)
}

pub fn pick(count: usize, available: usize, random: &mut Random) -> Vec<usize> {
    let mut picked = Vec::with_capacity(count);
    let mut pool: Vec<usize> = Vec::new();
    while picked.len() < count && available > 0 {
        if pool.is_empty() {
            pool = (0..available).collect();
        }
        let index = random.next_index(pool.len());
        if index < pool.len() {
            picked.push(pool.swap_remove(index));
        }
    }
    picked
}

struct Planned {
    name: String,
    reference: PathBuf,
    seed: u64,
}

pub fn generate(root: &Path, out: &Path, generation: &Generation) -> Result<Generated> {
    let references = references(root)?;
    let donors = read_donors(&root.join(REFERENCES))?;
    let options = FamilyOptions {
        variants: generation.variants,
        donors,
        ..FamilyOptions::default()
    };
    let mut random = Random::new(generation.seed);
    let planned: Vec<Planned> = pick(generation.families, references.len(), &mut random)
        .into_iter()
        .enumerate()
        .filter_map(|(number, index)| {
            let reference = references.get(index)?.clone();
            let stem = reference.file_stem()?.to_str()?.to_string();
            Some(Planned {
                name: format!("f{number:02}_{stem}"),
                reference,
                seed: random.next_u64(),
            })
        })
        .collect();
    fs::create_dir_all(out)?;
    let results = exec::parallel_map(&planned, |family| {
        write_family(root, out, family, &options, generation)
            .with_context(|| format!("generating {}", family.name))
    });
    let mut generated = Generated {
        families: Vec::new(),
        failures: Vec::new(),
    };
    for (family, result) in planned.iter().zip(results) {
        match result {
            Ok(()) => generated.families.push(family.name.clone()),
            Err(error) => generated.failures.push(format!("{error:#}")),
        }
    }
    Ok(generated)
}

fn write_family(
    root: &Path,
    out: &Path,
    family: &Planned,
    options: &FamilyOptions,
    generation: &Generation,
) -> Result<()> {
    let reference = read_job(&family.reference)?;
    let mut random = Random::new(family.seed);
    let generated = generate_family(&reference, options, &mut random)?;
    let dir = out.join(&family.name);
    fs::create_dir_all(&dir)?;
    write_job(&generated.reference, &dir.join("reference.json"))?;
    for (index, variant) in generated.variants.iter().enumerate() {
        write_job(variant, &dir.join(format!("variant_{index:03}.json")))?;
    }
    let source = family
        .reference
        .strip_prefix(root)
        .unwrap_or(&family.reference);
    let mut info = Map::new();
    info.insert("generator".into(), Value::from("rglsl-fuzz"));
    info.insert("git_hash".into(), Value::from(generation.generator.clone()));
    info.insert("args".into(), Value::from(generation.args.clone()));
    info.insert("seed".into(), Value::from(generation.seed.to_string()));
    info.insert("family_seed".into(), Value::from(family.seed.to_string()));
    info.insert(
        "reference".into(),
        Value::from(source.display().to_string().replace('\\', "/")),
    );
    info.insert("variants".into(), Value::from(generated.variants.len()));
    info.insert("tried".into(), Value::from(generated.tried));
    info.insert(
        "failures".into(),
        Value::from(
            generated
                .failures
                .iter()
                .map(|failure| Value::from(failure.clone()))
                .collect::<Vec<_>>(),
        ),
    );
    fs::write(
        dir.join("infolog.json"),
        serde_json::to_string_pretty(&Value::Object(info))?,
    )?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn picks_distinct_references_until_the_pool_runs_out() {
        let mut random = Random::new(7);
        let mut picked = pick(5, 5, &mut random);
        picked.sort_unstable();
        assert_eq!(picked, [0, 1, 2, 3, 4]);
        let mut random = Random::new(7);
        assert_eq!(pick(12, 5, &mut random).len(), 12);
        assert!(pick(3, 0, &mut random).is_empty());
        assert_eq!(
            pick(4, 44, &mut Random::new(1)),
            pick(4, 44, &mut Random::new(1))
        );
    }

    #[test]
    fn references_and_donors_come_from_the_repository() -> Result<()> {
        let root = Path::new(env!("CARGO_MANIFEST_DIR")).join("..");
        let references = references(&root)?;
        assert!(references.len() >= 29);
        assert!(
            !references
                .iter()
                .any(|path| path.ends_with("matrices_many_loops.json"))
        );
        assert!(
            references
                .iter()
                .all(|path| !path.starts_with(root.join("target")))
        );
        assert!(!read_donors(&root.join(REFERENCES))?.is_empty());
        Ok(())
    }
}
