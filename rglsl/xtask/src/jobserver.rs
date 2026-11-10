//! Running jobs in parallel, with a controlled degree of concurrency.

use std::sync::OnceLock;

use anyhow::Context;
use jobserver::Client;

static JOB_SERVER: OnceLock<Client> = OnceLock::new();

pub fn init() -> anyhow::Result<()> {
    // rglsl: upstream first tries to inherit the parent's jobserver with the
    // `unsafe` `Client::from_env`. We forbid unsafe code, so we always start our
    // own jobserver; it only bounds the concurrency of this tool.
    if JOB_SERVER.get().is_none() {
        let client = Client::new(num_cpus::get()).context("failed to create jobserver")?;
        JOB_SERVER.get_or_init(|| client);
    }
    Ok(())
}

/// Wait until it is okay to start a new job, and then spawn a thread running `body`.
pub fn start_job_thread<F>(body: F) -> anyhow::Result<()>
where
    F: FnOnce() + Send + 'static,
{
    let acquired = JOB_SERVER
        .get()
        .context("the jobserver is not initialized")?
        .acquire()?;
    std::thread::spawn(move || {
        body();
        drop(acquired);
    });
    Ok(())
}
