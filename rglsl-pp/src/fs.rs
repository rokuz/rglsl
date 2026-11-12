use alloc::collections::BTreeMap;
use alloc::string::{String, ToString};
use alloc::vec::Vec;
use std::path::{Path, PathBuf};

use crate::include::{
    candidates, DirectoryStack, FileId, IncludeError, IncludeKind, IncludedFile, Includer,
};

#[derive(Debug, Clone, Default)]
pub struct FileSystemIncluder {
    include_dirs: Vec<String>,
    names: Vec<String>,
    by_path: BTreeMap<PathBuf, FileId>,
    stack: DirectoryStack,
}

impl FileSystemIncluder {
    pub fn new<I, P>(include_dirs: I) -> Self
    where
        I: IntoIterator<Item = P>,
        P: AsRef<Path>,
    {
        Self {
            include_dirs: include_dirs
                .into_iter()
                .map(|directory| directory.as_ref().to_string_lossy().into_owned())
                .collect(),
            ..Self::default()
        }
    }

    pub fn add_root(&mut self, path: impl AsRef<Path>) -> FileId {
        let name = path.as_ref().to_string_lossy().into_owned();
        self.register(name)
    }

    pub fn path(&self, file: FileId) -> Option<&Path> {
        usize::try_from(file.0)
            .ok()
            .and_then(|index| self.names.get(index))
            .map(Path::new)
    }

    pub fn files(&self) -> impl Iterator<Item = (FileId, &str)> {
        self.names.iter().enumerate().map(|(index, name)| {
            (
                FileId(u32::try_from(index).unwrap_or(u32::MAX)),
                name.as_str(),
            )
        })
    }

    fn register(&mut self, name: String) -> FileId {
        let key = std::fs::canonicalize(&name).unwrap_or_else(|_| PathBuf::from(&name));
        if let Some(&file) = self.by_path.get(&key) {
            return file;
        }
        let file = FileId(u32::try_from(self.names.len()).unwrap_or(u32::MAX));
        self.names.push(name);
        self.by_path.insert(key, file);
        file
    }
}

impl Includer for FileSystemIncluder {
    fn include(
        &mut self,
        requested: &str,
        kind: IncludeKind,
        from: FileId,
        depth: usize,
    ) -> Result<IncludedFile, IncludeError> {
        let from_name = usize::try_from(from.0)
            .ok()
            .and_then(|index| self.names.get(index))
            .cloned();
        self.stack.prepare(from_name.as_deref(), depth);
        for path in candidates(requested, kind, &self.stack, &self.include_dirs) {
            if !Path::new(&path).is_file() {
                continue;
            }
            let bytes = match std::fs::read(&path) {
                Ok(bytes) => bytes,
                Err(error) => return Err(IncludeError::new(error.to_string())),
            };
            let source = String::from_utf8_lossy(&bytes).into_owned();
            let file = self.register(path.clone());
            self.stack.push(&path);
            return Ok(IncludedFile {
                file,
                name: path,
                source,
            });
        }
        Err(IncludeError::not_found())
    }
}
