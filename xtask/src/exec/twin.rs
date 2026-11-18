use super::batch::JobResult;
use super::plan::Plan;
use super::{Outcome, SkipReason, compare_outputs};

pub const RUNS: usize = 3;

pub fn refused(outcome: Outcome) -> Outcome {
    match outcome {
        Outcome::Skip {
            reason: SkipReason::DeviceFeature,
            detail,
        } => Outcome::skip(SkipReason::DeviceFeature, format!("twin: {detail}")),
        Outcome::Skip { reason, detail } => Outcome::Fail(format!(
            "the twin cannot run ({}: {detail}); fix the twin",
            reason.label()
        )),
        Outcome::Fail(why) => Outcome::Fail(format!("twin: {why}")),
        pass @ Outcome::Pass { .. } => pass,
    }
}

pub fn judge(plan: &Plan, runs: Vec<(JobResult, JobResult)>) -> Outcome {
    let mut theirs = Vec::with_capacity(runs.len());
    let mut ours = Vec::with_capacity(runs.len());
    for (run, (expected, actual)) in runs.into_iter().enumerate() {
        if let Some(error) = [&expected, &actual]
            .into_iter()
            .find_map(|result| result.as_ref().err().filter(|error| !error.ran()))
        {
            return Outcome::Fail(format!(
                "the target did not run the twin on run {}: {error}",
                run + 1
            ));
        }
        match expected {
            Ok(outputs) => theirs.push(outputs),
            Err(error) => {
                return Outcome::Fail(format!(
                    "glslang's module of the twin fails on the driver on run {}: {error}; fix the twin",
                    run + 1
                ));
            }
        }
        ours.push(actual);
    }
    let Some(base) = theirs.first() else {
        return Outcome::Fail("the twin did not run".into());
    };
    for (run, other) in theirs.iter().enumerate().skip(1) {
        if let Err(difference) = compare_outputs(plan, base, other) {
            return Outcome::Fail(format!(
                "glslang's module of the twin differs between runs 1 and {} ({difference}): the twin still has undefined behaviour; fix the twin",
                run + 1
            ));
        }
    }
    let mut tolerated = 0;
    for (run, actual) in ours.into_iter().enumerate() {
        let actual = match actual {
            Ok(outputs) => outputs,
            Err(error) => {
                return Outcome::Fail(format!(
                    "our module of the twin fails on the driver on run {}: {error}",
                    run + 1
                ));
            }
        };
        match compare_outputs(plan, base, &actual) {
            Ok(t) => tolerated = tolerated.max(t),
            Err(difference) => {
                return Outcome::Fail(format!(
                    "{difference} (glslang vs rglsl, twin, run {} of {})",
                    run + 1,
                    theirs.len()
                ));
            }
        }
    }
    Outcome::Pass { tolerated }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::exec::batch::{JobError, Outputs};
    use crate::exec::plan::{Inputs, Target};
    use crate::exec::reflect::{Reflection, Scalar, ScalarKind, Slot};

    fn plan() -> anyhow::Result<Plan> {
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

    fn outputs(value: u32) -> JobResult {
        let outputs: Outputs = [("dump:0:0".to_string(), value.to_le_bytes().to_vec())]
            .into_iter()
            .collect();
        Ok(outputs)
    }

    fn fails_with(outcome: &Outcome, text: &str) -> bool {
        matches!(outcome, Outcome::Fail(why) if why.contains(text))
    }

    #[test]
    fn stable_equal_runs_pass() -> anyhow::Result<()> {
        let runs = vec![(outputs(1), outputs(1)); RUNS];
        assert_eq!(judge(&plan()?, runs), Outcome::Pass { tolerated: 0 });
        Ok(())
    }

    #[test]
    fn an_unstable_reference_is_a_broken_twin() -> anyhow::Result<()> {
        let runs = vec![
            (outputs(1), outputs(1)),
            (outputs(1), outputs(1)),
            (outputs(2), outputs(2)),
        ];
        assert!(fails_with(
            &judge(&plan()?, runs),
            "still has undefined behaviour"
        ));
        Ok(())
    }

    #[test]
    fn our_difference_on_any_run_fails() -> anyhow::Result<()> {
        let runs = vec![
            (outputs(1), outputs(1)),
            (outputs(1), outputs(3)),
            (outputs(1), outputs(1)),
        ];
        assert!(fails_with(
            &judge(&plan()?, runs),
            "glslang vs rglsl, twin, run 2"
        ));
        let lost = || Err(JobError::Failed("lost".into()));
        let runs = vec![(outputs(1), lost()), (outputs(1), outputs(1))];
        assert!(fails_with(
            &judge(&plan()?, runs),
            "our module of the twin fails"
        ));
        let runs = vec![(lost(), outputs(1))];
        assert!(fails_with(&judge(&plan()?, runs), "fix the twin"));
        let offline = || Err(JobError::NotRun("remote target: scp failed".into()));
        let runs = vec![(outputs(1), outputs(1)), (offline(), offline())];
        assert!(fails_with(
            &judge(&plan()?, runs),
            "did not run the twin on run 2: remote target: scp failed"
        ));
        Ok(())
    }

    #[test]
    fn only_missing_device_features_skip_a_twin() {
        assert!(matches!(
            refused(Outcome::skip(
                SkipReason::DeviceFeature,
                "tessellationShader"
            )),
            Outcome::Skip {
                reason: SkipReason::DeviceFeature,
                ..
            }
        ));
        assert!(fails_with(
            &refused(Outcome::skip(SkipReason::Binding, "shared binding")),
            "fix the twin"
        ));
    }
}
