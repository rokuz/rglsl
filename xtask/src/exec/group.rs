use std::collections::BTreeMap;
use std::fs;
use std::path::Path;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::time::Duration;

use super::amber::parse_dump;
use super::batch::{JobResult, Outputs, STATISTICS, TIMED_ERROR, TIMING};
use super::{Job, statistics};

pub const BATCH_JOBS: usize = 32;
pub const BATCH_DUMP: &str = "{script}.batch.dump.txt";
pub const EXIT: &str = "#exit";
pub const STDERR: &str = "#stderr";
pub const STDOUT: &str = "#stdout";
const DUMP: &str = "#dump ";
const PER_JOB: Duration = Duration::from_secs(2);
const TIMING_HEADER: &str = "Execution timing (in script-order):";

static BATCHES: AtomicUsize = AtomicUsize::new(0);

pub fn dump_key(recipe: &str) -> String {
    format!("{DUMP}{recipe}")
}

pub fn dump_file(recipe: &str) -> String {
    BATCH_DUMP.replace("{script}", recipe)
}

fn relative(root: &Path, job: &Job, script: &str) -> Option<String> {
    let dir = job.dir.strip_prefix(root).ok()?;
    let mut parts = Vec::new();
    for component in dir.components() {
        parts.push(component.as_os_str().to_str()?.to_string());
    }
    if script.contains(['/', '\\', '|', '\t', '\n']) {
        return None;
    }
    parts.push(script.to_string());
    Some(parts.join("/"))
}

fn requirements(job: &Job) -> Option<Vec<String>> {
    let mut lines = Vec::new();
    for script in job.scripts() {
        let text = fs::read_to_string(job.dir.join(script)).ok()?;
        lines.extend(
            text.lines()
                .map(str::trim)
                .filter(|line| line.starts_with("DEVICE_") || line.starts_with("INSTANCE_"))
                .map(str::to_string),
        );
    }
    lines.sort();
    lines.dedup();
    Some(lines)
}

fn key(job: &Job, timeout: Duration) -> Option<String> {
    if !job.members.is_empty() || job.timeout.unwrap_or(timeout) > timeout * 2 {
        return None;
    }
    let requirements = requirements(job)?;
    Some(format!(
        "{}\t{}\t{:?}\t{}\t{}\t{:?}",
        requirements.join("\n"),
        job.dumps.is_empty(),
        job.capture,
        job.tensor_layer,
        job.timed.is_some(),
        job.timeout.unwrap_or(timeout)
    ))
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct Plan {
    pub batches: Vec<(Job, Vec<usize>)>,
    pub singles: Vec<usize>,
}

pub fn plan(root: &Path, jobs: &[Job], workers: usize, timeout: Duration) -> Plan {
    let mut groups: BTreeMap<String, Vec<usize>> = BTreeMap::new();
    let mut plan = Plan::default();
    for (index, job) in jobs.iter().enumerate() {
        let recipes_fit = job
            .scripts()
            .iter()
            .all(|script| relative(root, job, script).is_some());
        match key(job, timeout).filter(|_| recipes_fit) {
            Some(key) => groups.entry(key).or_default().push(index),
            None => plan.singles.push(index),
        }
    }
    for indices in groups.into_values() {
        let size = indices.len().div_ceil(workers.max(1)).clamp(1, BATCH_JOBS);
        for chunk in indices.chunks(size) {
            let members: Vec<Job> = chunk.iter().filter_map(|i| jobs.get(*i).cloned()).collect();
            let Some(first) = members.first() else {
                continue;
            };
            if members.len() < 2 {
                plan.singles.extend_from_slice(chunk);
                continue;
            }
            let each = first.timeout.unwrap_or(timeout);
            let mut dumps: Vec<String> = members.iter().flat_map(|m| m.dumps.clone()).collect();
            dumps.sort();
            dumps.dedup();
            let count = u32::try_from(members.len()).unwrap_or(u32::MAX);
            let batch = Job {
                dir: root.to_path_buf(),
                script: format!(
                    "batch-{}-{}",
                    std::process::id(),
                    BATCHES.fetch_add(1, Ordering::Relaxed)
                ),
                dumps,
                tensor_layer: first.tensor_layer,
                capture: first.capture,
                timed: None,
                timeout: Some(each + PER_JOB.saturating_mul(count)),
                members,
            };
            plan.batches.push((batch, chunk.to_vec()));
        }
    }
    plan.singles.sort_unstable();
    plan
}

pub fn recipes(batch: &Job) -> Vec<String> {
    batch
        .members
        .iter()
        .flat_map(|member| {
            member
                .own_scripts()
                .into_iter()
                .filter_map(|script| relative(&batch.dir, member, &script))
                .collect::<Vec<_>>()
        })
        .collect()
}

fn failures(stderr: &str, recipes: &[String]) -> BTreeMap<String, String> {
    let mut found = BTreeMap::new();
    for line in stderr.lines().map(str::trim) {
        for recipe in recipes {
            if let Some(message) = line.strip_prefix(&format!("{recipe}: ")) {
                found
                    .entry(recipe.clone())
                    .or_insert_with(|| message.to_string());
            }
        }
    }
    found
}

fn timing_block(stdout: &str, recipe: &str) -> Option<String> {
    let header = format!("{TIMING_HEADER} {recipe}");
    let mut lines = stdout.lines();
    while let Some(line) = lines.next() {
        if line.trim() == header {
            return lines
                .next()
                .map(|values| format!("{TIMING_HEADER}\n{values}\n"));
        }
    }
    None
}

fn text(raw: &Outputs, key: &str) -> String {
    raw.get(key)
        .map(|bytes| String::from_utf8_lossy(bytes).into_owned())
        .unwrap_or_default()
}

pub fn settle(batch: &Job, raw: &Outputs) -> Vec<Option<JobResult>> {
    let unsettled = vec![None; batch.members.len()];
    let recipes = recipes(batch);
    let stderr = text(raw, STDERR);
    let failed = failures(&stderr, &recipes);
    match text(raw, EXIT).trim() {
        "0" => {}
        "1" if !failed.is_empty() => {}
        _ => return unsettled,
    }
    let stdout = text(raw, STDOUT);
    batch
        .members
        .iter()
        .map(|member| {
            let check = relative(&batch.dir, member, &member.script)?;
            if failed.contains_key(&check) {
                return None;
            }
            let mut outputs = if member.dumps.is_empty() {
                Outputs::new()
            } else {
                parse_dump(&text(raw, &dump_key(&check))).ok()?
            };
            outputs.retain(|name, _| member.dumps.contains(name));
            if outputs.len() != member.dumps.len() {
                return None;
            }
            let timed = member
                .timed
                .as_ref()
                .and_then(|script| Some((script, relative(&batch.dir, member, script)?)));
            if let Some((script, recipe)) = &timed
                && let Some(message) = failed.get(recipe)
            {
                outputs.insert(
                    TIMED_ERROR.to_string(),
                    format!("amber exited with 1: {script}: {message}").into_bytes(),
                );
            }
            if member.capture.statistics
                && let Some(bytes) = raw.get(STATISTICS)
            {
                let mut names = vec![(check, member.script.clone())];
                if let Some((script, recipe)) = &timed {
                    names.push((recipe.clone(), (*script).clone()));
                }
                if let Ok(bytes) = statistics::renamed(bytes, &names) {
                    outputs.insert(STATISTICS.to_string(), bytes);
                }
            }
            if member.capture.timing {
                let block = timed
                    .as_ref()
                    .and_then(|(_, recipe)| timing_block(&stdout, recipe))
                    .unwrap_or_default();
                outputs.insert(TIMING.to_string(), block.into_bytes());
            }
            Some(Ok(outputs))
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use std::path::PathBuf;

    use super::*;
    use crate::exec::amber;
    use crate::exec::batch::Capture;

    fn job(dir: &Path, script: &str, timed: Option<&str>) -> Job {
        Job {
            dir: dir.to_path_buf(),
            script: script.into(),
            dumps: vec!["dump:0:0".into()],
            tensor_layer: false,
            capture: Capture::NONE,
            timed: timed.map(str::to_string),
            timeout: None,
            members: Vec::new(),
        }
    }

    fn write(dir: &Path, name: &str, text: &str) -> anyhow::Result<()> {
        fs::create_dir_all(dir)?;
        fs::write(dir.join(name), text)?;
        Ok(())
    }

    #[test]
    fn batches_jobs_with_the_same_requirements() -> anyhow::Result<()> {
        let root = std::env::temp_dir().join(format!("rglsl-group-{}", std::process::id()));
        let plain = "#!amber\nRUN p 1 1 1\n";
        let feature = "#!amber\nDEVICE_FEATURE Features.shaderInt64\nRUN p 1 1 1\n";
        for (case, text) in [("a", plain), ("b", plain), ("c", feature), ("d", plain)] {
            write(&root.join(case), "rglsl.amber", text)?;
        }
        let jobs: Vec<Job> = ["a", "b", "c", "d"]
            .iter()
            .map(|case| job(&root.join(case), "rglsl.amber", None))
            .collect();
        let plan = plan(&root, &jobs, 1, Duration::from_secs(30));
        assert_eq!(plan.singles, [2]);
        let [(batch, members)] = plan.batches.as_slice() else {
            anyhow::bail!("one batch expected: {plan:?}");
        };
        assert_eq!(members, &[0, 1, 3]);
        assert_eq!(
            recipes(batch),
            ["a/rglsl.amber", "b/rglsl.amber", "d/rglsl.amber"]
        );
        assert_eq!(batch.timeout, Some(Duration::from_secs(36)));
        let split = super::plan(&root, &jobs, 2, Duration::from_secs(30));
        assert_eq!(split.batches.len(), 1);
        assert_eq!(split.singles, [2, 3]);
        let outside = job(Path::new("/elsewhere"), "rglsl.amber", None);
        assert_eq!(
            super::plan(&root, &[outside], 1, Duration::from_secs(30)).singles,
            [0]
        );
        fs::remove_dir_all(&root)?;
        Ok(())
    }

    #[test]
    fn settles_each_member_of_a_batch() -> anyhow::Result<()> {
        let root = PathBuf::from("/w");
        let mut first = job(&root.join("a"), "rglsl.amber", Some("rglsl.timed.amber"));
        first.capture = Capture {
            statistics: true,
            timing: true,
        };
        let mut second = first.clone();
        second.dir = root.join("b");
        let mut third = first.clone();
        third.dir = root.join("c");
        let batch = Job {
            dir: root.clone(),
            script: "batch-1".into(),
            members: vec![first, second, third],
            ..job(&root, "batch-1", None)
        };
        let raw: Outputs = [
            (EXIT, "1".to_string()),
            (
                STDERR,
                "b/rglsl.timed.amber: Line 3: no timestamps\nc/rglsl.amber: DEVICE_LOST\n".into(),
            ),
            (
                STDOUT,
                format!("{TIMING_HEADER} a/rglsl.timed.amber\n    0.5, 0.25\n\nExecution time median = 0.375 ms\n"),
            ),
            (
                STATISTICS,
                r#"{"pipelines": [{"script": "a/rglsl.timed.amber", "pipeline": "main"}, {"script": "a/rglsl.amber", "pipeline": "main"}, {"script": "b/rglsl.amber", "pipeline": "main"}]}"#.into(),
            ),
            (&dump_key("a/rglsl.amber"), "dump:0:0\n 01 02\n".into()),
            (&dump_key("b/rglsl.amber"), "dump:0:0\n 03\n".into()),
        ]
        .into_iter()
        .map(|(key, value)| (key.to_string(), value.into_bytes()))
        .collect();
        let settled = settle(&batch, &raw);
        let [Some(Ok(a)), Some(Ok(b)), None] = settled.as_slice() else {
            anyhow::bail!("unexpected settlement: {settled:?}");
        };
        assert_eq!(a.get("dump:0:0").map(Vec::as_slice), Some(&[1, 2][..]));
        assert_eq!(
            amber::parse_timing(&String::from_utf8_lossy(
                a.get(TIMING).map_or(&[][..], Vec::as_slice)
            )),
            [0.5, 0.25]
        );
        let report = statistics::Report::parse(a.get(STATISTICS).map_or(&[][..], Vec::as_slice))
            .map_err(anyhow::Error::msg)?;
        assert_eq!(report.pipelines.len(), 2);
        assert!(!a.contains_key(TIMED_ERROR));
        assert_eq!(b.get("dump:0:0").map(Vec::as_slice), Some(&[3][..]));
        assert_eq!(
            b.get(TIMED_ERROR).map(Vec::as_slice),
            Some(&b"amber exited with 1: rglsl.timed.amber: Line 3: no timestamps"[..])
        );
        let mut crashed = raw.clone();
        crashed.insert(EXIT.to_string(), b"3221225477".to_vec());
        assert!(settle(&batch, &crashed).iter().all(Option::is_none));
        let mut unattributed = raw;
        unattributed.insert(
            STDERR.to_string(),
            b"Unable to create vulkan device\n".to_vec(),
        );
        assert!(settle(&batch, &unattributed).iter().all(Option::is_none));
        assert_eq!(dump_file("a/rglsl.amber"), "a/rglsl.amber.batch.dump.txt");
        Ok(())
    }
}
