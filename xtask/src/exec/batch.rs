use std::collections::BTreeMap;
use std::fmt::Write as _;
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::{Mutex, PoisonError};

use super::amber::{Amber, parse_dump};

pub type Outputs = BTreeMap<String, Vec<u8>>;
pub type JobResult = Result<Outputs, JobError>;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum JobError {
    Failed(String),
    NotRun(String),
}

impl JobError {
    pub const fn ran(&self) -> bool {
        matches!(self, Self::Failed(_))
    }

    pub fn is_transient(&self) -> bool {
        match self {
            Self::Failed(error) => transient(error),
            Self::NotRun(_) => true,
        }
    }

    pub fn missing(source: &str) -> Self {
        Self::NotRun(format!("no result from the {source}"))
    }

    pub fn message(&self) -> &str {
        match self {
            Self::Failed(error) | Self::NotRun(error) => error,
        }
    }
}

impl std::fmt::Display for JobError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(self.message())
    }
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct Capture {
    pub statistics: bool,
    pub timing: bool,
}

impl Capture {
    pub const NONE: Self = Self {
        statistics: false,
        timing: false,
    };

    fn field(self) -> String {
        let mut parts = Vec::new();
        if self.statistics {
            parts.push("statistics");
        }
        if self.timing {
            parts.push("timing");
        }
        parts.join(",")
    }
}

pub const STATISTICS: &str = "#pipeline-statistics";
pub const TIMING: &str = "#execution-timing";

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Job {
    pub dir: PathBuf,
    pub script: String,
    pub dumps: Vec<String>,
    pub tensor_layer: bool,
    pub capture: Capture,
}

impl Job {
    pub fn statistics_file(&self) -> String {
        format!("{}.stats.json", self.script)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Ending {
    Exited(i64),
    Crashed(Option<u32>),
    TimedOut,
}

impl Ending {
    pub const fn crashed(self) -> bool {
        match self {
            Self::Crashed(_) => true,
            Self::Exited(code) => code < 0 || code >= 0xC000_0000,
            Self::TimedOut => false,
        }
    }

    pub fn describe(self) -> String {
        match self {
            Self::Exited(code) if self.crashed() => {
                format!("exit code 0x{:08X}", code & 0xFFFF_FFFF)
            }
            Self::Exited(code) => format!("exit code {code}"),
            Self::Crashed(Some(code)) => format!("crashed (0x{code:08X})"),
            Self::Crashed(None) => "killed by a signal".into(),
            Self::TimedOut => "timed out".into(),
        }
    }
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct Trace {
    pub start_ms: u64,
    pub end_ms: u64,
    pub pid: Option<u32>,
    pub ending: Option<Ending>,
    pub tail: String,
}

impl Trace {
    pub const fn ran(&self) -> bool {
        self.start_ms != 0
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Traced {
    pub result: JobResult,
    pub trace: Trace,
}

impl Traced {
    pub fn not_run(error: JobError) -> Self {
        Self {
            result: Err(error),
            trace: Trace::default(),
        }
    }
}

pub const ATTEMPTS: usize = 3;
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

pub fn retry_transient(
    results: &mut [JobResult],
    rounds: usize,
    mut rerun: impl FnMut(&[usize]) -> Vec<JobResult>,
) {
    for _ in 0..rounds {
        let lost: Vec<usize> = results
            .iter()
            .enumerate()
            .filter(|(_, result)| result.as_ref().is_err_and(JobError::is_transient))
            .map(|(index, _)| index)
            .collect();
        if lost.is_empty() {
            return;
        }
        for (index, result) in lost.iter().zip(rerun(&lost)) {
            if let Some(slot) = results.get_mut(*index) {
                *slot = result;
            }
        }
    }
}

pub fn run_local(amber: &Amber, jobs: &[Job], workers: usize) -> Vec<JobResult> {
    run_local_traced(amber, jobs, workers, ATTEMPTS)
        .into_iter()
        .map(|traced| traced.result)
        .collect()
}

pub fn run_local_traced(
    amber: &Amber,
    jobs: &[Job],
    workers: usize,
    attempts: usize,
) -> Vec<Traced> {
    let next = AtomicUsize::new(0);
    let results: Mutex<Vec<(usize, Traced)>> = Mutex::new(Vec::with_capacity(jobs.len()));
    std::thread::scope(|scope| {
        for _ in 0..workers.max(1).min(jobs.len().max(1)) {
            scope.spawn(|| {
                loop {
                    let index = next.fetch_add(1, Ordering::Relaxed);
                    let Some(job) = jobs.get(index) else { break };
                    let (result, mut trace) = amber.run_traced(job);
                    let start_ms = trace.start_ms;
                    let mut result = result.map_err(JobError::Failed);
                    for _ in 1..attempts {
                        if !result.as_ref().is_err_and(JobError::is_transient) {
                            break;
                        }
                        let (again, again_trace) = amber.run_traced(job);
                        result = again.map_err(JobError::Failed);
                        trace = Trace {
                            start_ms,
                            ..again_trace
                        };
                    }
                    results
                        .lock()
                        .unwrap_or_else(PoisonError::into_inner)
                        .push((index, Traced { result, trace }));
                }
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
        let fields = [
            parts.join("/"),
            job.script.clone(),
            job.dumps.join(","),
            if job.tensor_layer { "tensor" } else { "" }.to_string(),
            job.capture.field(),
        ];
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
            (Some(text), true) => parse_dump(text).map_err(JobError::Failed),
            (None, true) => Err(JobError::Failed("the remote run returned no dump".into())),
        },
        "" => Err(JobError::NotRun("the remote run returned no status".into())),
        _ if message.is_empty() => Err(JobError::Failed(kind.to_string())),
        _ => Err(JobError::Failed(message)),
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
            tensor_layer: false,
            capture: Capture::NONE,
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
    fn transient_failures_are_rerun_a_bounded_number_of_times() {
        let lost = || -> JobResult {
            Err(JobError::Failed(
                "amber exited with 1: Unable to create vulkan device: ERROR_DEVICE_LOST".into(),
            ))
        };
        let offline = || -> JobResult { Err(JobError::NotRun("remote target: ssh".into())) };
        let wrong = || -> JobResult { Err(JobError::Failed("wrong value".into())) };
        let mut results = vec![Ok(Outputs::new()), lost(), wrong(), lost(), offline()];
        let mut calls = Vec::new();
        retry_transient(&mut results, 2, |indices| {
            calls.push(indices.to_vec());
            indices
                .iter()
                .map(|&index| match index {
                    1 => Ok(Outputs::new()),
                    4 => offline(),
                    _ => lost(),
                })
                .collect()
        });
        assert_eq!(calls, [vec![1, 3, 4], vec![3, 4]]);
        assert_eq!(results[0], Ok(Outputs::new()));
        assert_eq!(results[1], Ok(Outputs::new()));
        assert_eq!(results[2], wrong());
        assert!(results[3].as_ref().is_err_and(JobError::is_transient));
        assert_eq!(results[4], offline());
    }

    #[test]
    fn errors_tell_a_failed_run_from_a_job_that_did_not_run() {
        let failed = JobError::Failed("amber exited with 1: bad".into());
        let not_run = JobError::NotRun("remote target: scp: connection refused".into());
        assert!(failed.ran());
        assert!(!not_run.ran());
        assert!(!failed.is_transient());
        assert!(not_run.is_transient());
        assert_eq!(
            not_run.to_string(),
            "remote target: scp: connection refused"
        );
        assert_eq!(failed.to_string(), "amber exited with 1: bad");
        assert!(!JobError::missing("batch").ran());
        assert_eq!(
            JobError::missing("batch").to_string(),
            "no result from the batch"
        );
    }

    #[test]
    fn writes_a_manifest_relative_to_the_root() -> anyhow::Result<()> {
        let mut timed = job("/w/a.comp", "rglsl.timed.amber", &[]);
        timed.capture = Capture {
            statistics: true,
            timing: true,
        };
        let jobs = [
            job("/w/a.comp", "glslang.amber", &["dump:0:0", "dump:0:1"]),
            job("/w/probes/x", "p.amber", &[]),
            timed,
        ];
        let text = manifest(Path::new("/w"), &jobs).map_err(anyhow::Error::msg)?;
        assert_eq!(
            text,
            "0\ta.comp\tglslang.amber\tdump:0:0,dump:0:1\t\t\n1\tprobes/x\tp.amber\t\t\t\n2\ta.comp\trglsl.timed.amber\t\t\tstatistics,timing\n"
        );
        assert!(manifest(Path::new("/other"), &jobs).is_err());
        assert_eq!(dirs(Path::new("/w"), &jobs), ["a.comp", "probes/x"]);
        Ok(())
    }

    #[test]
    fn reads_remote_results() -> anyhow::Result<()> {
        let dump = "dump:0:0\n 01 02\n";
        assert_eq!(
            parse_result("ok\n\n", Some(dump), true).map_err(|e| anyhow::anyhow!("{e}"))?["dump:0:0"],
            [1, 2]
        );
        assert!(
            parse_result("ok\n\n", None, false)
                .map_err(|e| anyhow::anyhow!("{e}"))?
                .is_empty()
        );
        assert_eq!(
            parse_result("ok\n\n", None, true).err(),
            Some(JobError::Failed("the remote run returned no dump".into()))
        );
        assert_eq!(
            parse_result("exit\namber exited with 1: bad\n", None, true).err(),
            Some(JobError::Failed("amber exited with 1: bad".into()))
        );
        assert_eq!(
            parse_result("timeout\n", None, true).err(),
            Some(JobError::Failed("timeout".into()))
        );
        assert!(parse_result("", None, true).is_err_and(|error| !error.ran()));
        Ok(())
    }

    #[test]
    fn splits_batches() {
        assert_eq!(chunks(5, 2), [0..2, 2..4, 4..5]);
        assert!(chunks(0, 2).is_empty());
        assert_eq!(chunks(3, 0), [0..1, 1..2, 2..3]);
    }
}
