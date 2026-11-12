use std::collections::BTreeMap;
use std::fmt::Write as _;
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::{Mutex, PoisonError};

use super::amber::{parse_dump, Amber};

pub type Outputs = BTreeMap<String, Vec<u8>>;
pub type JobResult = Result<Outputs, String>;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Job {
    pub dir: PathBuf,
    pub script: String,
    pub dumps: Vec<String>,
}

const ATTEMPTS: usize = 3;
const TRANSIENT: [&str; 5] = [
    "ERROR_INCOMPATIBLE_DRIVER",
    "ERROR_INITIALIZATION_FAILED",
    "DEVICE_LOST",
    "device lost",
    "Unable to create vulkan",
];

pub fn transient(error: &str) -> bool {
    TRANSIENT.iter().any(|word| error.contains(word))
}

pub fn run_local(amber: &Amber, jobs: &[Job], workers: usize) -> Vec<JobResult> {
    let next = AtomicUsize::new(0);
    let results: Mutex<Vec<(usize, JobResult)>> = Mutex::new(Vec::with_capacity(jobs.len()));
    std::thread::scope(|scope| {
        for _ in 0..workers.max(1).min(jobs.len().max(1)) {
            scope.spawn(|| loop {
                let index = next.fetch_add(1, Ordering::Relaxed);
                let Some(job) = jobs.get(index) else { break };
                let dumps: Vec<&str> = job.dumps.iter().map(String::as_str).collect();
                let out = job.dir.join(format!("{}.dump.txt", job.script));
                let mut result = amber.run(&job.dir.join(&job.script), &dumps, &out);
                for _ in 1..ATTEMPTS {
                    if !result.as_ref().is_err_and(|e| transient(e)) {
                        break;
                    }
                    result = amber.run(&job.dir.join(&job.script), &dumps, &out);
                }
                results
                    .lock()
                    .unwrap_or_else(PoisonError::into_inner)
                    .push((index, result));
            });
        }
    });
    let mut results = results.into_inner().unwrap_or_else(PoisonError::into_inner);
    results.sort_by_key(|(index, _)| *index);
    results.into_iter().map(|(_, result)| result).collect()
}

pub fn manifest(root: &Path, jobs: &[Job]) -> Result<String, String> {
    let mut out = String::new();
    for (index, job) in jobs.iter().enumerate() {
        let relative = job
            .dir
            .strip_prefix(root)
            .map_err(|_| format!("{} is outside the batch root", job.dir.display()))?;
        let mut parts = Vec::new();
        for component in relative.components() {
            let part = component
                .as_os_str()
                .to_str()
                .ok_or_else(|| format!("{} is not UTF-8", relative.display()))?;
            parts.push(part);
        }
        let fields = [parts.join("/"), job.script.clone(), job.dumps.join(",")];
        if fields.iter().any(|f| f.contains(['\t', '\n'])) {
            return Err(format!("job {index} has a tab or newline in a field"));
        }
        let _ = writeln!(out, "{index}\t{}", fields.join("\t"));
    }
    Ok(out)
}

pub fn dirs(root: &Path, jobs: &[Job]) -> Vec<String> {
    let mut dirs: Vec<String> = jobs
        .iter()
        .filter_map(|job| job.dir.strip_prefix(root).ok())
        .filter_map(|dir| dir.to_str().map(str::to_string))
        .collect();
    dirs.sort();
    dirs.dedup();
    dirs
}

pub fn parse_result(status: &str, dump: Option<&str>, wants_dump: bool) -> JobResult {
    let mut lines = status.lines();
    let kind = lines.next().unwrap_or_default().trim();
    let message = lines.next().unwrap_or_default().trim().to_string();
    match kind {
        "ok" => match (dump, wants_dump) {
            (_, false) => Ok(Outputs::new()),
            (Some(text), true) => parse_dump(text),
            (None, true) => Err("the remote run returned no dump".into()),
        },
        "" => Err("the remote run returned no status".into()),
        _ if message.is_empty() => Err(kind.to_string()),
        _ => Err(message),
    }
}

pub fn chunks(jobs: usize, limit: usize) -> Vec<std::ops::Range<usize>> {
    let limit = limit.max(1);
    (0..jobs)
        .step_by(limit)
        .map(|start| start..(start + limit).min(jobs))
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn job(dir: &str, script: &str, dumps: &[&str]) -> Job {
        Job {
            dir: PathBuf::from(dir),
            script: script.into(),
            dumps: dumps.iter().map(|d| (*d).to_string()).collect(),
        }
    }

    #[test]
    fn device_losses_are_transient() {
        assert!(transient(
            "probe.amber: Vulkan::Calling vkQueueSubmit Fail (DEVICE_LOST)"
        ));
        assert!(transient(
            "glslang.amber: Line 16: device lost after RUN (DrawRectCommand)"
        ));
        assert!(transient("VK_ERROR_DEVICE_LOST"));
        assert!(!transient("Missing subgroup operation quad feature"));
    }

    #[test]
    fn writes_a_manifest_relative_to_the_root() -> anyhow::Result<()> {
        let jobs = [
            job("/w/a.comp", "glslang.amber", &["dump:0:0", "dump:0:1"]),
            job("/w/probes/x", "p.amber", &[]),
        ];
        let text = manifest(Path::new("/w"), &jobs).map_err(anyhow::Error::msg)?;
        assert_eq!(
            text,
            "0\ta.comp\tglslang.amber\tdump:0:0,dump:0:1\n1\tprobes/x\tp.amber\t\n"
        );
        assert!(manifest(Path::new("/other"), &jobs).is_err());
        assert_eq!(dirs(Path::new("/w"), &jobs), ["a.comp", "probes/x"]);
        Ok(())
    }

    #[test]
    fn reads_remote_results() -> anyhow::Result<()> {
        let dump = "dump:0:0\n 01 02\n";
        assert_eq!(
            parse_result("ok\n\n", Some(dump), true).map_err(anyhow::Error::msg)?["dump:0:0"],
            [1, 2]
        );
        assert!(parse_result("ok\n\n", None, false)
            .map_err(anyhow::Error::msg)?
            .is_empty());
        assert_eq!(
            parse_result("ok\n\n", None, true).err().as_deref(),
            Some("the remote run returned no dump")
        );
        assert_eq!(
            parse_result("exit\namber exited with 1: bad\n", None, true)
                .err()
                .as_deref(),
            Some("amber exited with 1: bad")
        );
        assert_eq!(
            parse_result("timeout\n", None, true).err().as_deref(),
            Some("timeout")
        );
        assert!(parse_result("", None, true).is_err());
        Ok(())
    }

    #[test]
    fn splits_batches() {
        assert_eq!(chunks(5, 2), [0..2, 2..4, 4..5]);
        assert!(chunks(0, 2).is_empty());
        assert_eq!(chunks(3, 0), [0..1, 1..2, 2..3]);
    }
}
