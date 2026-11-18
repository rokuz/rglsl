use crate::exec::batch::{self, Ending, Job, JobError, JobResult, Trace};
use crate::exec::events::{self, ResetHistory};
use crate::exec::plan::Plan;
use crate::exec::remote::Watched;
use crate::exec::{Executor, Outputs};
use crate::fuzz_exec;

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
    ReferenceNotQualified,
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
            Self::ReferenceNotQualified => "reference-not-qualified",
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

#[derive(Debug, Clone, Copy)]
pub enum Side<'a> {
    Ran(&'a Plan, &'a Outputs),
    Failed(Class, &'a str),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ReferenceVerdict {
    pub unoptimized: (Class, String),
    pub optimized: Option<(Class, String)>,
}

impl ReferenceVerdict {
    pub fn qualified(&self) -> bool {
        self.unoptimized.0 == Class::Pass
            && self
                .optimized
                .as_ref()
                .is_none_or(|(class, _)| *class == Class::Pass)
    }

    pub fn reason(&self) -> String {
        if self.unoptimized.0 == Class::GlslangWrong {
            return self.unoptimized.1.clone();
        }
        let mut parts = Vec::new();
        for (module, side) in [
            ("glslang's unoptimized reference", Some(&self.unoptimized)),
            ("glslang -O's reference", self.optimized.as_ref()),
        ] {
            if let Some((class, note)) = side
                && *class != Class::Pass
                && *class != Class::ReferenceNotQualified
            {
                parts.push(format!("{module}: {}: {note}", class.label()));
            }
        }
        if parts.is_empty() {
            "the reference is qualified".into()
        } else {
            parts.join("; ")
        }
    }
}

pub fn judge_reference(unoptimized: Side<'_>, optimized: Option<Side<'_>>) -> ReferenceVerdict {
    let own = |side: Side<'_>| match side {
        Side::Ran(..) => (Class::Pass, String::new()),
        Side::Failed(class, note) => (class, note.to_string()),
    };
    let Some(optimized) = optimized else {
        return ReferenceVerdict {
            unoptimized: own(unoptimized),
            optimized: None,
        };
    };
    if let (Side::Ran(plan, outputs), Side::Ran(optimized_plan, optimized_outputs)) =
        (unoptimized, optimized)
    {
        return match fuzz_exec::compare_runs((plan, outputs), (optimized_plan, optimized_outputs)) {
            Ok(_) => ReferenceVerdict {
                unoptimized: (Class::Pass, String::new()),
                optimized: Some((Class::Pass, String::new())),
            },
            Err(difference) => {
                let note = format!(
                    "glslang's unoptimized and -O references render differently: {difference}"
                );
                ReferenceVerdict {
                    unoptimized: (Class::GlslangWrong, note.clone()),
                    optimized: Some((Class::GlslangWrong, note)),
                }
            }
        };
    }
    let mut verdict = ReferenceVerdict {
        unoptimized: own(unoptimized),
        optimized: Some(own(optimized)),
    };
    let reason = verdict.reason();
    for side in [Some(&mut verdict.unoptimized), verdict.optimized.as_mut()]
        .into_iter()
        .flatten()
    {
        if side.0 == Class::Pass {
            *side = (
                Class::ReferenceNotQualified,
                format!("the reference is not qualified: {reason}"),
            );
        }
    }
    verdict
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
            let mut watched = self.executor.run_watched(slice, alone);
            self.history.record(&watched.events);
            self.problems.append(&mut watched.problems);
            if let Some(why) = self.history.exceeded() {
                eprintln!(
                    "[xtask] stopping the {} target: {why}",
                    self.executor.target.label()
                );
                self.stopped = Some(why);
            }
            out.extend(attributed(watched, slice.len()));
        }
        out
    }
}

fn attributed(watched: Watched, count: usize) -> Vec<Ran> {
    let traces: Vec<Trace> = watched
        .results
        .iter()
        .map(|traced| traced.trace.clone())
        .collect();
    let mut resets = events::resets_by_job(&watched.events, &traces);
    let mut crashes = events::crashes_by_job(&watched.events, &traces);
    let mut results = watched.results.into_iter();
    (0..count)
        .map(|index| match results.next() {
            Some(traced) => Ran {
                result: traced.result,
                trace: traced.trace,
                resets: resets.remove(&index).unwrap_or_default(),
                crash_module: crashes.remove(&index),
            },
            None => Ran::not_run(JobError::missing("batch").to_string()),
        })
        .collect()
}

pub fn run_alone(executor: &Executor, job: &Job) -> (Ran, Vec<String>) {
    let mut watched = executor.run_watched(std::slice::from_ref(job), true);
    let problems = std::mem::take(&mut watched.problems);
    let ran = attributed(watched, 1)
        .into_iter()
        .next()
        .unwrap_or_else(|| Ran::not_run(JobError::missing("batch").to_string()));
    (ran, problems)
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

    fn plan() -> anyhow::Result<Plan> {
        use crate::exec::plan::{Inputs, Target};
        use crate::exec::reflect::{Reflection, Scalar, ScalarKind, Slot};
        let reflection = Reflection::new(spirv::ExecutionModel::GLCompute);
        let mut plan = Plan::new(&reflection, &Inputs::default())
            .map_err(|refusal| anyhow::anyhow!("{refusal:?}"))?;
        plan.targets.push(Target {
            name: "buffer".into(),
            buffer: "b".into(),
            dump: "dump:0:0".into(),
            slots: vec![Slot {
                offset: 0,
                scalar: Scalar {
                    kind: ScalarKind::Uint,
                    width: 32,
                },
            }],
        });
        Ok(plan)
    }

    fn outputs(value: u32) -> Outputs {
        [("dump:0:0".to_string(), value.to_le_bytes().to_vec())]
            .into_iter()
            .collect()
    }

    #[test]
    fn a_reference_is_qualified_only_if_both_glslang_modules_agree() -> anyhow::Result<()> {
        let plan = plan()?;
        let (one, two) = (outputs(1), outputs(2));
        let agree = judge_reference(Side::Ran(&plan, &one), Some(Side::Ran(&plan, &one)));
        assert!(agree.qualified());
        assert_eq!(agree.unoptimized.0, Class::Pass);
        assert_eq!(agree.optimized.as_ref().map(|s| s.0), Some(Class::Pass));

        let differ = judge_reference(Side::Ran(&plan, &one), Some(Side::Ran(&plan, &two)));
        assert!(!differ.qualified());
        assert_eq!(differ.unoptimized.0, Class::GlslangWrong);
        assert_eq!(
            differ.optimized.as_ref().map(|s| s.0),
            Some(Class::GlslangWrong)
        );
        assert!(differ.unoptimized.1.contains("render differently"));
        assert_eq!(differ.reason(), differ.unoptimized.1);

        let hang = judge_reference(
            Side::Ran(&plan, &one),
            Some(Side::Failed(Class::Hang, "device lost")),
        );
        assert!(!hang.qualified());
        assert_eq!(hang.unoptimized.0, Class::ReferenceNotQualified);
        assert!(
            hang.unoptimized
                .1
                .contains("glslang -O's reference: hang: device lost")
        );
        assert_eq!(hang.optimized.as_ref().map(|s| s.0), Some(Class::Hang));

        let crash = judge_reference(
            Side::Failed(Class::AmberCrash, "0xC0000005"),
            Some(Side::Ran(&plan, &one)),
        );
        assert!(!crash.qualified());
        assert_eq!(crash.unoptimized.0, Class::AmberCrash);
        assert_eq!(
            crash.optimized.as_ref().map(|s| s.0),
            Some(Class::ReferenceNotQualified)
        );

        let quarantined = judge_reference(
            Side::Failed(Class::Quarantined, "in tests/fuzz-quarantine"),
            Some(Side::Failed(Class::NotCompiled, "glslang -O failed")),
        );
        assert!(!quarantined.qualified());
        assert!(quarantined.reason().contains("quarantined"));

        let unoptimized_only = judge_reference(Side::Ran(&plan, &two), None);
        assert!(unoptimized_only.qualified());
        assert_eq!(unoptimized_only.optimized, None);
        assert!(!judge_reference(Side::Failed(Class::Hang, "timeout"), None).qualified());
        Ok(())
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
            Class::ReferenceNotQualified,
        ] {
            assert!(!class.needs_confirmation());
        }
    }
}
