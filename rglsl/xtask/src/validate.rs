use std::{
    io::{BufRead, BufReader, Write},
    path::Path,
    process::Stdio,
};

use anyhow::{bail, Context};

use crate::{
    cli::ValidateSubcommand,
    fs::open_file,
    path::join_path,
    process::{which, EasyCommand},
};

type Job = Box<dyn FnOnce() -> anyhow::Result<()> + Send + std::panic::UnwindSafe + 'static>;

pub(crate) fn validate(cmd: ValidateSubcommand) -> anyhow::Result<()> {
    let mut jobs = vec![];
    collect_validation_jobs(&mut jobs, cmd)?;

    let progress_bar = indicatif::ProgressBar::new(jobs.len() as u64);

    let (tx_results, rx_results) = std::sync::mpsc::channel();
    let enqueuing_thread = std::thread::spawn(move || -> anyhow::Result<()> {
        for job in jobs {
            let tx_results = tx_results.clone();
            crate::jobserver::start_job_thread(move || {
                let result = match std::panic::catch_unwind(job) {
                    Ok(result) => result,
                    Err(payload) => Err(match payload.downcast_ref::<&str>() {
                        Some(message) => {
                            anyhow::anyhow!("Validation job thread panicked: {message}")
                        }
                        None => anyhow::anyhow!("Validation job thread panicked"),
                    }),
                };
                if let Err(lost) = tx_results.send(result) {
                    log::error!("a validation result was lost: {:?}", lost.0);
                }
            })?;
        }
        Ok(())
    });

    let mut all_good = true;
    for result in rx_results {
        if let Err(error) = result {
            all_good = false;
            progress_bar.suspend(|| {
                log::error!("{error:#}");
            });
        }
        progress_bar.inc(1);
    }

    progress_bar.finish_and_clear();

    anyhow::ensure!(
        all_good,
        "failed to validate one or more files, see above output for more details"
    );

    match enqueuing_thread.join() {
        Ok(Ok(())) => {}
        Ok(Err(error)) => bail!("Error enqueuing jobs:\n{error:#}"),
        Err(_) => bail!("the job enqueuing thread panicked"),
    }

    Ok(())
}

fn collect_validation_jobs(jobs: &mut Vec<Job>, cmd: ValidateSubcommand) -> anyhow::Result<()> {
    let snapshots_base_out = join_path(["tests", "out"]);
    match cmd {
        ValidateSubcommand::Spirv => {
            let spirv_as = "spirv-as";
            which(spirv_as)?;

            let spirv_val = "spirv-val";
            which(spirv_val)?;

            push_job_for_each_file(snapshots_base_out, "spv/*.spvasm", jobs, |path| {
                validate_spirv(&path, spirv_as, spirv_val)
            })?;
        }
    };

    Ok(())
}

fn push_job_for_each_file(
    top_dir: impl AsRef<Path>,
    pattern: impl AsRef<Path>,
    jobs: &mut Vec<Job>,
    f: impl FnOnce(std::path::PathBuf) -> anyhow::Result<()>
        + Clone
        + Send
        + std::panic::UnwindSafe
        + 'static,
) -> anyhow::Result<()> {
    crate::glob::for_each_file(top_dir, pattern, move |path_result| {
        // Let each job closure stand on its own.
        let f = f.clone();
        jobs.push(Box::new(|| f(path_result?)));
    })
}

fn validate_spirv(path: &Path, spirv_as: &str, spirv_val: &str) -> anyhow::Result<()> {
    let second_line = {
        let mut file = BufReader::new(open_file(path)?);
        let mut buf = String::new();
        file.read_line(&mut buf)
            .with_context(|| format!("failed to read first line from {path:?}"))?;
        buf.clear();
        file.read_line(&mut buf)
            .with_context(|| format!("failed to read second line from {path:?}"))?;
        buf
    };
    let expected_header_prefix = "; Version: ";
    let Some(version) = second_line
        .strip_prefix(expected_header_prefix)
        .map(str::trim)
    else {
        bail!("no {expected_header_prefix:?} header found in {path:?}");
    };
    let mut spirv_as_cmd = EasyCommand::new(spirv_as, |cmd| {
        cmd.stdout(Stdio::piped())
            .arg("--target-env")
            .arg(format!("spv{version}"))
            .arg(path)
            .args(["-o", "-"])
    });
    let assembled_spirv = spirv_as_cmd
        .output()
        .with_context(|| format!("Failed to run {spirv_as_cmd}"))?;

    if !assembled_spirv.status.success() {
        bail!(
            "Failed to assemble {path:?} with {spirv_as_cmd}:\n{}",
            String::from_utf8_lossy(&assembled_spirv.stderr)
        );
    }

    let error_message = || {
        format!(
            "Failed to validate {path:?}.
Note: Labels and line numbers will not match the input file.
      Use this command to view the corresponding spvasm:
      '{spirv_as} --target-env spv{version} {} -o - | spirv-dis'\n",
            path.display(),
        )
    };
    let mut spirv_val_command = EasyCommand::new(spirv_val, |cmd| cmd.stdin(Stdio::piped()));
    let mut spirv_val_process = spirv_val_command
        .spawn()
        .with_context(|| format!("Failed to run {spirv_val_command}"))?;

    spirv_val_process
        .stdin
        .as_mut()
        .with_context(|| format!("{spirv_val_command} was started without a piped stdin"))?
        .write_all(&assembled_spirv.stdout)?;

    let spirv_val_output = spirv_val_process
        .wait()
        .with_context(|| format!("Failed to wait for {spirv_val_command}"))?;

    if !spirv_val_output.success() {
        bail!("{}", error_message());
    }

    Ok(())
}
