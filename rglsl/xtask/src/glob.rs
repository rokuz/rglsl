use std::path::{Path, PathBuf};

use anyhow::Context;
use glob::glob;

/// Apply `f` to each file matching `pattern` in `top_dir`.
///
/// Pass files as `anyhow::Result` values, to carry errors from
/// directory iteration and metadata checking.
pub(crate) fn for_each_file(
    top_dir: impl AsRef<Path>,
    pattern: impl AsRef<Path>,
    mut f: impl FnMut(anyhow::Result<PathBuf>),
) -> anyhow::Result<()> {
    fn filter_files(glob: &str, result: glob::GlobResult) -> anyhow::Result<Option<PathBuf>> {
        let path = result.with_context(|| format!("error while iterating over glob {glob:?}"))?;
        let metadata = path
            .metadata()
            .with_context(|| format!("failed to fetch metadata for {path:?}"))?;
        Ok(metadata.is_file().then_some(path))
    }

    let pattern_in_dir = top_dir.as_ref().join(pattern.as_ref());
    let pattern_in_dir = pattern_in_dir
        .to_str()
        .with_context(|| format!("glob pattern {pattern_in_dir:?} is not valid UTF-8"))?;

    glob(pattern_in_dir)
        .with_context(|| format!("glob pattern {pattern_in_dir:?} is invalid"))?
        .for_each(|result| {
            if let Some(result) = filter_files(pattern_in_dir, result).transpose() {
                f(result);
            }
        });
    Ok(())
}
