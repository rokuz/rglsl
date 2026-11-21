use super::quarantine::Mode;
use crate::exec::batch::{self, Ending, Job, JobError, JobResult, Trace};
use std::time::Duration;

use crate::exec::events;
use crate::exec::group;
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
    ReferenceDiffers,
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
            Self::ReferenceDiffers => "reference-differs",
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

const STACK_OVERFLOW: i64 = 0xC000_00FD;

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
    if ending == Some(Ending::Exited(STACK_OVERFLOW)) {
        return Some((
            Class::DriverCrash,
            with_exit(
                &format!(
                    "stack overflow in Amber's process while the driver builds the pipeline: {message}"
                ),
                &ran.trace,
            ),
        ));
    }
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
    pub fn qualified(&self, mode: Mode) -> bool {
        let passes =
            |side: Option<&(Class, String)>| side.is_none_or(|(class, _)| *class == Class::Pass);
        match mode {
            Mode::Unoptimized => self.unoptimized.0 == Class::Pass,
            Mode::Optimized => self.unoptimized.0 == Class::Pass && passes(self.optimized.as_ref()),
        }
    }

    pub fn reason(&self) -> String {
        if matches!(
            self.unoptimized.0,
            Class::GlslangWrong | Class::ReferenceDiffers
        ) {
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

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Consensus {
    Agrees,
    Differs {
        consensus: Vec<usize>,
        detail: String,
    },
    NoMajority {
        detail: String,
    },
}

pub type Image<'a> = (&'a Plan, &'a Outputs);

fn difference(reference: Image<'_>, image: Image<'_>) -> Option<String> {
    fuzz_exec::compare_runs(reference, image, fuzz_exec::Tolerance::OneLevel).err()
}

pub fn consensus(images: &[Option<Image<'_>>]) -> Vec<Consensus> {
    let mut verdicts = vec![Consensus::Agrees; images.len()];
    let mut clusters: Vec<Vec<usize>> = Vec::new();
    for (index, image) in images.iter().enumerate() {
        let Some(image) = image else {
            continue;
        };
        let home = clusters.iter_mut().find(|cluster| {
            cluster
                .first()
                .and_then(|first| images.get(*first).copied().flatten())
                .is_some_and(|representative| difference(representative, *image).is_none())
        });
        match home {
            Some(cluster) => cluster.push(index),
            None => clusters.push(vec![index]),
        }
    }
    if clusters.len() < 2 {
        return verdicts;
    }
    let representative = |cluster: &Vec<usize>| {
        cluster
            .first()
            .and_then(|first| images.get(*first).copied().flatten())
    };
    let largest = clusters.iter().map(Vec::len).max().unwrap_or_default();
    let majority = clusters
        .iter()
        .filter(|cluster| cluster.len() == largest)
        .collect::<Vec<_>>();
    let majority = match majority.as_slice() {
        [cluster] if largest >= 2 => Some((*cluster).clone()),
        _ => None,
    };
    for (position, cluster) in clusters.iter().enumerate() {
        let other = clusters
            .iter()
            .enumerate()
            .find(|(other, _)| *other != position)
            .and_then(|(_, other)| representative(other));
        for index in cluster {
            let Some(image) = images.get(*index).copied().flatten() else {
                continue;
            };
            let verdict = match &majority {
                Some(members) if members.contains(index) => Consensus::Agrees,
                Some(members) => Consensus::Differs {
                    consensus: members.clone(),
                    detail: members
                        .first()
                        .and_then(|first| images.get(*first).copied().flatten())
                        .and_then(|reference| difference(reference, image))
                        .unwrap_or_default(),
                },
                None => Consensus::NoMajority {
                    detail: other
                        .and_then(|reference| difference(reference, image))
                        .unwrap_or_default(),
                },
            };
            if let Some(slot) = verdicts.get_mut(*index) {
                *slot = verdict;
            }
        }
    }
    verdicts
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
        return match fuzz_exec::compare_runs(
            (plan, outputs),
            (optimized_plan, optimized_outputs),
            fuzz_exec::Tolerance::OneLevel,
        ) {
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
    let unoptimized = own(unoptimized);
    let optimized = match (&unoptimized.0, own(optimized)) {
        (Class::Pass, optimized) => optimized,
        (class, (Class::Pass, _)) => (
            Class::ReferenceNotQualified,
            format!(
                "the reference is not qualified: glslang's unoptimized reference: {}: {}",
                class.label(),
                unoptimized.1
            ),
        ),
        (_, optimized) => optimized,
    };
    ReferenceVerdict {
        unoptimized,
        optimized: Some(optimized),
    }
}

#[derive(Debug)]
pub struct Watch<'a> {
    executor: &'a Executor,
    pause: Duration,
    ran_alone: bool,
    pub problems: Vec<String>,
}

impl<'a> Watch<'a> {
    pub const fn new(executor: &'a Executor, pause: Duration) -> Self {
        Self {
            executor,
            pause,
            ran_alone: false,
            problems: Vec::new(),
        }
    }

    pub fn resets(&self) -> usize {
        self.executor.resets()
    }

    pub fn stopped(&self) -> Option<String> {
        self.executor.stopped()
    }

    pub fn run(&mut self, jobs: &[Job], alone: bool) -> Vec<Ran> {
        if alone {
            return self.run_each(jobs, alone);
        }
        let plan = group::plan(
            self.executor.work_dir(),
            jobs,
            self.executor.workers(),
            self.executor.timeout(),
        );
        let batches: Vec<Job> = plan
            .batches
            .iter()
            .map(|(batch, _)| batch.clone())
            .collect();
        let mut out: Vec<Option<Ran>> = vec![None; jobs.len()];
        for ((batch, members), ran) in plan.batches.iter().zip(self.run_each(&batches, false)) {
            let Ok(raw) = &ran.result else {
                continue;
            };
            if !ran.resets.is_empty() || ran.crash_module.is_some() {
                continue;
            }
            for (index, settled) in members.iter().zip(group::settle(batch, raw)) {
                if let (Some(Ok(outputs)), Some(slot)) = (settled, out.get_mut(*index)) {
                    *slot = Some(Ran {
                        result: Ok(outputs),
                        trace: ran.trace.clone(),
                        resets: Vec::new(),
                        crash_module: None,
                    });
                }
            }
        }
        let rest: Vec<usize> = out
            .iter()
            .enumerate()
            .filter(|(_, ran)| ran.is_none())
            .map(|(index, _)| index)
            .collect();
        let again: Vec<Job> = rest.iter().filter_map(|&i| jobs.get(i).cloned()).collect();
        for (index, ran) in rest.iter().zip(self.run_each(&again, false)) {
            if let Some(slot) = out.get_mut(*index) {
                *slot = Some(ran);
            }
        }
        out.into_iter()
            .map(|ran| ran.unwrap_or_else(|| Ran::not_run(JobError::missing("batch").to_string())))
            .collect()
    }

    fn run_each(&mut self, jobs: &[Job], alone: bool) -> Vec<Ran> {
        let mut out = Vec::with_capacity(jobs.len());
        let paused = alone && !self.pause.is_zero();
        let size = if paused {
            1
        } else if alone {
            events::WATCHED_BATCH
        } else {
            events::WATCHED_BATCH * self.executor.workers()
        };
        for range in batch::chunks(jobs.len(), size) {
            let slice = jobs.get(range).unwrap_or_default();
            if let Some(why) = self.executor.stopped() {
                out.extend(
                    slice
                        .iter()
                        .map(|_| Ran::not_run(format!("the target was stopped: {why}"))),
                );
                continue;
            }
            if paused && self.ran_alone {
                std::thread::sleep(self.pause);
            }
            self.ran_alone |= alone;
            let mut watched = self.executor.run_watched(slice, alone);
            self.problems.append(&mut watched.problems);
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
        let overflow = Ran {
            crash_module: Some("ntdll.dll".into()),
            ..ran(
                failed("amber crashed (0xC00000FD): no output"),
                Some(Ending::Exited(0xC000_00FD)),
            )
        };
        assert_eq!(class(&overflow), Some(Class::DriverCrash));
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

    fn float_plan() -> anyhow::Result<Plan> {
        use crate::exec::reflect::{Scalar, ScalarKind};
        let mut plan = plan()?;
        for target in &mut plan.targets {
            for slot in &mut target.slots {
                slot.scalar = Scalar {
                    kind: ScalarKind::Float,
                    width: 32,
                };
            }
        }
        Ok(plan)
    }

    fn outputs(value: u32) -> Outputs {
        [("dump:0:0".to_string(), value.to_le_bytes().to_vec())]
            .into_iter()
            .collect()
    }

    #[test]
    fn a_reference_is_qualified_in_a_mode_only_if_its_modules_of_that_mode_agree()
    -> anyhow::Result<()> {
        let plan = plan()?;
        let (one, two) = (outputs(1), outputs(2));
        let both = [Mode::Unoptimized, Mode::Optimized];
        let agree = judge_reference(Side::Ran(&plan, &one), Some(Side::Ran(&plan, &one)));
        assert!(both.iter().all(|mode| agree.qualified(*mode)));
        assert_eq!(agree.unoptimized.0, Class::Pass);
        assert_eq!(agree.optimized.as_ref().map(|s| s.0), Some(Class::Pass));

        let differ = judge_reference(Side::Ran(&plan, &one), Some(Side::Ran(&plan, &two)));
        assert!(!both.iter().any(|mode| differ.qualified(*mode)));
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
        assert!(hang.qualified(Mode::Unoptimized));
        assert!(!hang.qualified(Mode::Optimized));
        assert_eq!(hang.unoptimized.0, Class::Pass);
        assert_eq!(hang.optimized.as_ref().map(|s| s.0), Some(Class::Hang));
        assert!(
            hang.reason()
                .contains("glslang -O's reference: hang: device lost")
        );

        let crash = judge_reference(
            Side::Failed(Class::AmberCrash, "0xC0000005"),
            Some(Side::Ran(&plan, &one)),
        );
        assert!(!both.iter().any(|mode| crash.qualified(*mode)));
        assert_eq!(crash.unoptimized.0, Class::AmberCrash);
        assert_eq!(
            crash.optimized.as_ref().map(|s| s.0),
            Some(Class::ReferenceNotQualified)
        );
        assert!(
            crash
                .optimized
                .as_ref()
                .is_some_and(|(_, note)| note.contains("amber-crash: 0xC0000005"))
        );

        let quarantined = judge_reference(
            Side::Failed(Class::Quarantined, "in tests/fuzz-quarantine"),
            Some(Side::Failed(Class::NotCompiled, "glslang -O failed")),
        );
        assert!(!both.iter().any(|mode| quarantined.qualified(*mode)));
        assert!(quarantined.reason().contains("quarantined"));

        let optimized_quarantined = judge_reference(
            Side::Ran(&plan, &one),
            Some(Side::Failed(Class::Quarantined, "in tests/fuzz-quarantine")),
        );
        assert!(optimized_quarantined.qualified(Mode::Unoptimized));
        assert!(!optimized_quarantined.qualified(Mode::Optimized));

        let unoptimized_only = judge_reference(Side::Ran(&plan, &two), None);
        assert!(both.iter().all(|mode| unoptimized_only.qualified(*mode)));
        assert_eq!(unoptimized_only.optimized, None);
        assert!(
            !judge_reference(Side::Failed(Class::Hang, "timeout"), None)
                .qualified(Mode::Unoptimized)
        );
        Ok(())
    }

    #[test]
    fn the_targets_references_agree_within_one_level() -> anyhow::Result<()> {
        let plan = float_plan()?;
        let level = |value: f32| -> Outputs {
            [(
                "dump:0:0".to_string(),
                (value / 255.0).to_le_bytes().to_vec(),
            )]
            .into_iter()
            .collect()
        };
        let (a, b, c) = (level(65.0), level(66.0), level(68.0));
        let near = consensus(&[Some((&plan, &a)), Some((&plan, &a)), Some((&plan, &b))]);
        assert!(near.iter().all(|verdict| *verdict == Consensus::Agrees));
        let far = consensus(&[Some((&plan, &a)), Some((&plan, &a)), Some((&plan, &c))]);
        assert!(matches!(far.get(2), Some(Consensus::Differs { .. })));
        Ok(())
    }

    #[test]
    fn a_reference_that_differs_from_the_other_targets_consensus_is_rejected() -> anyhow::Result<()>
    {
        let plan = plan()?;
        let images: Vec<Outputs> = (0..5).map(outputs).collect();
        let image = |value: usize| images.get(value).map(|outputs| (&plan, outputs));
        let agrees = |verdicts: &[Consensus]| {
            verdicts
                .iter()
                .filter(|verdict| **verdict == Consensus::Agrees)
                .count()
        };

        let majority = consensus(&[image(1), image(1), image(2)]);
        assert_eq!(agrees(&majority), 2);
        assert!(matches!(
            majority.get(2),
            Some(Consensus::Differs { consensus, detail }) if consensus == &[0, 1] && !detail.is_empty()
        ));
        let majority = consensus(&[image(3), image(1), image(1), image(1)]);
        assert!(matches!(
            majority.first(),
            Some(Consensus::Differs { consensus, .. }) if consensus == &[1, 2, 3]
        ));
        assert_eq!(agrees(&majority), 3);

        let two = consensus(&[image(1), image(2)]);
        assert!(two.iter().all(
            |verdict| matches!(verdict, Consensus::NoMajority { detail } if !detail.is_empty())
        ));
        let all_differ = consensus(&[image(1), image(2), image(3)]);
        assert!(
            all_differ
                .iter()
                .all(|verdict| matches!(verdict, Consensus::NoMajority { .. }))
        );
        let tie = consensus(&[image(1), image(1), image(2), image(2)]);
        assert!(
            tie.iter()
                .all(|verdict| matches!(verdict, Consensus::NoMajority { .. }))
        );
        let missing = consensus(&[image(1), None, image(2)]);
        assert_eq!(missing.get(1), Some(&Consensus::Agrees));
        assert!(matches!(
            missing.first(),
            Some(Consensus::NoMajority { .. })
        ));

        assert_eq!(consensus(&[image(1)]), [Consensus::Agrees]);
        assert_eq!(
            consensus(&[image(4), None]),
            [Consensus::Agrees, Consensus::Agrees]
        );
        assert_eq!(agrees(&consensus(&[image(2), image(2), image(2)])), 3);
        assert!(consensus(&[]).is_empty());
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
