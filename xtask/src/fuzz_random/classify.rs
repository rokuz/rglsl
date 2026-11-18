use crate::exec::Executor;
use crate::exec::batch::{self, Ending, Job, JobError, JobResult, Trace};
use crate::exec::events::{self, ResetHistory};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Class {
    Pass,
    Hang,
    DriverReset,
    DriverCrash,
    AmberCrash,
    AmberError,
    GlslangWrong,
    NotRun,
    Refused,
    NoReference,
    NotCompiled,
    Quarantined,
}

impl Class {
    pub const fn label(self) -> &'static str {
        match self {
            Self::Pass => "pass",
            Self::Hang => "hang",
            Self::DriverReset => "driver-reset",
            Self::DriverCrash => "driver-crash",
            Self::AmberCrash => "amber-crash",
            Self::AmberError => "amber-error",
            Self::GlslangWrong => "glslang-wrong",
            Self::NotRun => "not-run",
            Self::Refused => "refused",
            Self::NoReference => "no-reference",
            Self::NotCompiled => "not-compiled",
            Self::Quarantined => "quarantined",
        }
    }

    pub const fn hangs_the_driver(self) -> bool {
        matches!(self, Self::Hang | Self::DriverReset | Self::DriverCrash)
    }

    pub const fn needs_confirmation(self) -> bool {
        matches!(
            self,
            Self::Hang
                | Self::DriverReset
                | Self::DriverCrash
                | Self::AmberCrash
                | Self::AmberError
                | Self::GlslangWrong
        )
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Ran {
    pub result: JobResult,
    pub trace: Trace,
    pub resets: Vec<String>,
    pub crash_module: Option<String>,
}

impl Ran {
    pub fn not_run(why: String) -> Self {
        Self {
            result: Err(JobError::NotRun(why)),
            trace: Trace::default(),
            resets: Vec::new(),
            crash_module: None,
        }
    }
}

fn with_exit(message: &str, trace: &Trace) -> String {
    let mut note = message.to_string();
    if let Some(ending) = trace.ending {
        note.push_str(&format!(" [{}]", ending.describe()));
    }
    if !trace.tail.is_empty() {
        note.push_str(" | last output: ");
        note.push_str(&trace.tail.replace('\n', " / "));
    }
    note
}

fn device_lost(message: &str) -> bool {
    message.contains("DEVICE_LOST") || message.contains("device lost")
}

pub fn failure(ran: &Ran) -> Option<(Class, String)> {
    if !ran.resets.is_empty() {
        let outcome = match &ran.result {
            Ok(_) => "the job finished".to_string(),
            Err(error) => error.to_string(),
        };
        return Some((
            Class::DriverReset,
            format!("{}; {outcome}", ran.resets.join(", ")),
        ));
    }
    let error = ran.result.as_ref().err()?;
    let message = match error {
        JobError::NotRun(why) => return Some((Class::NotRun, why.clone())),
        JobError::Failed(message) => message,
    };
    let ending = ran.trace.ending;
    if ending == Some(Ending::TimedOut) || message.contains("timed out") || device_lost(message) {
        return Some((Class::Hang, message.clone()));
    }
    let crashed = ending.is_some_and(Ending::crashed) || message.starts_with("amber crashed");
    if crashed {
        return Some(match &ran.crash_module {
            Some(module) if events::is_driver_module(module) => (
                Class::DriverCrash,
                format!("faulted in the driver ({module}): {message}"),
            ),
            Some(module) => (
                Class::AmberCrash,
                with_exit(&format!("faulted in {module}: {message}"), &ran.trace),
            ),
            None => (Class::AmberCrash, with_exit(message, &ran.trace)),
        });
    }
    Some((Class::AmberError, with_exit(message, &ran.trace)))
}

#[derive(Debug)]
pub struct Watch<'a> {
    executor: &'a Executor,
    history: ResetHistory,
    pub stopped: Option<String>,
    pub problems: Vec<String>,
}

impl<'a> Watch<'a> {
    pub fn new(executor: &'a Executor) -> Self {
        Self {
            executor,
            history: ResetHistory::default(),
            stopped: None,
            problems: Vec::new(),
        }
    }

    pub fn resets(&self) -> usize {
        self.history.len()
    }

    pub fn run(&mut self, jobs: &[Job], alone: bool) -> Vec<Ran> {
        let mut out = Vec::with_capacity(jobs.len());
        for range in batch::chunks(jobs.len(), events::WATCHED_BATCH) {
            let slice = jobs.get(range).unwrap_or_default();
            if let Some(why) = &self.stopped {
                out.extend(
                    slice
                        .iter()
                        .map(|_| Ran::not_run(format!("the target was stopped: {why}"))),
                );
                continue;
            }
            let watched = self.executor.run_watched(slice, alone);
            let traces: Vec<Trace> = watched
                .results
                .iter()
                .map(|traced| traced.trace.clone())
                .collect();
            let mut resets = events::resets_by_job(&watched.events, &traces);
            let mut crashes = events::crashes_by_job(&watched.events, &traces);
            self.history.record(&watched.events);
            self.problems.extend(watched.problems);
            if let Some(why) = self.history.exceeded() {
                eprintln!(
                    "[xtask] stopping the {} target: {why}",
                    self.executor.target.label()
                );
                self.stopped = Some(why);
            }
            let mut results = watched.results.into_iter();
            for index in 0..slice.len() {
                out.push(match results.next() {
                    Some(traced) => Ran {
                        result: traced.result,
                        trace: traced.trace,
                        resets: resets.remove(&index).unwrap_or_default(),
                        crash_module: crashes.remove(&index),
                    },
                    None => Ran::not_run(JobError::missing("batch").to_string()),
                });
            }
        }
        out
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::exec::Outputs;

    fn ran(result: JobResult, ending: Option<Ending>) -> Ran {
        Ran {
            result,
            trace: Trace {
                start_ms: 1,
                end_ms: 2,
                pid: Some(5),
                ending,
                tail: "line one\nline two".into(),
            },
            resets: Vec::new(),
            crash_module: None,
        }
    }

    fn failed(message: &str) -> JobResult {
        Err(JobError::Failed(message.into()))
    }

    fn class(ran: &Ran) -> Option<Class> {
        failure(ran).map(|(class, _)| class)
    }

    #[test]
    fn classifies_job_failures() {
        assert_eq!(
            class(&ran(Ok(Outputs::new()), Some(Ending::Exited(0)))),
            None
        );
        assert_eq!(
            class(&ran(failed("amber timed out"), Some(Ending::TimedOut))),
            Some(Class::Hang)
        );
        assert_eq!(
            class(&ran(
                failed("amber exited with 1: vkQueueSubmit Fail (DEVICE_LOST)"),
                Some(Ending::Exited(1))
            )),
            Some(Class::Hang)
        );
        let crash = ran(
            failed("amber crashed (0xC0000005): no output"),
            Some(Ending::Exited(0xC000_0005)),
        );
        let (amber, note) = failure(&crash).unwrap_or((Class::Pass, String::new()));
        assert_eq!(amber, Class::AmberCrash);
        assert!(note.contains("exit code 0xC0000005"));
        assert!(note.contains("line one / line two"));
        let in_driver = Ran {
            crash_module: Some("amdvlk64.dll".into()),
            ..crash.clone()
        };
        assert_eq!(class(&in_driver), Some(Class::DriverCrash));
        let in_amber = Ran {
            crash_module: Some("amber.exe".into()),
            ..crash
        };
        assert_eq!(class(&in_amber), Some(Class::AmberCrash));
        assert_eq!(
            class(&ran(
                failed("amber crashed: signal"),
                Some(Ending::Crashed(None))
            )),
            Some(Class::AmberCrash)
        );
        assert_eq!(
            class(&ran(
                failed("amber exited with 1: Unable to create vulkan device"),
                Some(Ending::Exited(1))
            )),
            Some(Class::AmberError)
        );
        assert_eq!(
            class(&ran(Err(JobError::NotRun("ssh".into())), None)),
            Some(Class::NotRun)
        );
        let reset = Ran {
            resets: vec!["nvlddmkm event 153 at 2 ms".into()],
            ..ran(Ok(Outputs::new()), Some(Ending::Exited(0)))
        };
        assert_eq!(class(&reset), Some(Class::DriverReset));
        let reset_and_lost = Ran {
            resets: vec!["Display event 4101 at 2 ms".into()],
            ..ran(failed("device lost"), Some(Ending::Exited(1)))
        };
        assert_eq!(class(&reset_and_lost), Some(Class::DriverReset));
    }

    #[test]
    fn only_driver_hangs_go_to_quarantine() {
        for class in [Class::Hang, Class::DriverReset, Class::DriverCrash] {
            assert!(class.hangs_the_driver());
            assert!(class.needs_confirmation());
        }
        for class in [Class::AmberCrash, Class::AmberError, Class::GlslangWrong] {
            assert!(!class.hangs_the_driver());
            assert!(class.needs_confirmation());
        }
        for class in [
            Class::Pass,
            Class::NotRun,
            Class::Refused,
            Class::NoReference,
        ] {
            assert!(!class.needs_confirmation());
        }
    }
}
