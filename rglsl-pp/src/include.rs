use alloc::borrow::ToOwned;
use alloc::collections::BTreeMap;
use alloc::string::String;
use alloc::vec::Vec;
use core::fmt;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, Default)]
pub struct FileId(pub u32);

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum IncludeKind {
    Local,
    System,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct IncludedFile {
    pub file: FileId,
    pub name: String,
    pub source: String,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct IncludeError {
    pub message: String,
}

impl IncludeError {
    pub fn new(message: impl Into<String>) -> Self {
        Self {
            message: message.into(),
        }
    }

    pub fn not_found() -> Self {
        Self::new("Could not process include directive")
    }
}

impl fmt::Display for IncludeError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(&self.message)
    }
}

pub trait Includer {
    fn include(
        &mut self,
        requested: &str,
        kind: IncludeKind,
        from: FileId,
        depth: usize,
    ) -> Result<IncludedFile, IncludeError>;
}

#[derive(Debug, Clone, Copy, Default)]
pub struct NoIncluder;

impl Includer for NoIncluder {
    fn include(
        &mut self,
        _requested: &str,
        _kind: IncludeKind,
        _from: FileId,
        _depth: usize,
    ) -> Result<IncludedFile, IncludeError> {
        Err(IncludeError::not_found())
    }
}

pub(crate) fn directory_of(name: &str) -> &str {
    match name.rfind(['/', '\\']) {
        Some(index) => name.get(..index).unwrap_or("."),
        None => ".",
    }
}

pub(crate) fn is_absolute(path: &str) -> bool {
    let bytes = path.as_bytes();
    path.starts_with('/')
        || (bytes.len() > 2
            && bytes.first().is_some_and(u8::is_ascii_alphabetic)
            && bytes.get(1) == Some(&b':')
            && matches!(bytes.get(2), Some(b'/' | b'\\')))
}

pub(crate) fn join(directory: &str, requested: &str) -> String {
    let mut path = String::with_capacity(directory.len() + requested.len() + 1);
    path.push_str(directory);
    path.push('/');
    path.push_str(requested);
    path.replace('\\', "/")
}

#[derive(Debug, Clone, Default)]
pub(crate) struct DirectoryStack {
    directories: Vec<String>,
}

impl DirectoryStack {
    pub(crate) fn prepare(&mut self, from: Option<&str>, depth: usize) {
        let depth = depth.max(1);
        let directory = from.map_or(".", directory_of).to_owned();
        self.directories.truncate(depth);
        while self.directories.len() < depth {
            self.directories.push(directory.clone());
        }
        if depth == 1 {
            if let Some(first) = self.directories.first_mut() {
                *first = directory;
            }
        }
    }

    pub(crate) fn push(&mut self, path: &str) {
        self.directories.push(directory_of(path).to_owned());
    }
}

pub(crate) fn candidates(
    requested: &str,
    kind: IncludeKind,
    stack: &DirectoryStack,
    include_dirs: &[String],
) -> Vec<String> {
    if is_absolute(requested) {
        return alloc::vec![requested.replace('\\', "/")];
    }
    let mut paths = Vec::new();
    if kind == IncludeKind::Local {
        for directory in stack.directories.iter().rev() {
            paths.push(join(directory, requested));
        }
    }
    for directory in include_dirs {
        paths.push(join(directory, requested));
    }
    paths
}

pub(crate) fn normalize(path: &str) -> String {
    let absolute = path.starts_with('/');
    let mut parts: Vec<&str> = Vec::new();
    for part in path.split('/') {
        match part {
            "" | "." => {}
            ".." => {
                if parts.last().is_some_and(|last| *last != "..") {
                    parts.pop();
                } else if !absolute {
                    parts.push("..");
                }
            }
            _ => parts.push(part),
        }
    }
    let joined = parts.join("/");
    if absolute {
        let mut result = String::from("/");
        result.push_str(&joined);
        result
    } else {
        joined
    }
}

#[derive(Debug, Clone, Default)]
pub struct MemoryIncluder {
    names: Vec<String>,
    sources: Vec<String>,
    by_path: BTreeMap<String, FileId>,
    include_dirs: Vec<String>,
    stack: DirectoryStack,
}

impl MemoryIncluder {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn with_include_dirs<I, S>(include_dirs: I) -> Self
    where
        I: IntoIterator<Item = S>,
        S: Into<String>,
    {
        Self {
            include_dirs: include_dirs.into_iter().map(Into::into).collect(),
            ..Self::default()
        }
    }

    pub fn add_file(&mut self, name: &str, source: &str) -> FileId {
        let key = normalize(&name.replace('\\', "/"));
        if let Some(&file) = self.by_path.get(&key) {
            if let Some(slot) = usize::try_from(file.0)
                .ok()
                .and_then(|index| self.sources.get_mut(index))
            {
                source.clone_into(slot);
            }
            return file;
        }
        let file = FileId(u32::try_from(self.names.len()).unwrap_or(u32::MAX));
        self.names.push(name.to_owned());
        self.sources.push(source.to_owned());
        self.by_path.insert(key, file);
        file
    }

    pub fn name(&self, file: FileId) -> Option<&str> {
        usize::try_from(file.0)
            .ok()
            .and_then(|index| self.names.get(index))
            .map(String::as_str)
    }

    pub fn source(&self, file: FileId) -> Option<&str> {
        usize::try_from(file.0)
            .ok()
            .and_then(|index| self.sources.get(index))
            .map(String::as_str)
    }
}

impl Includer for MemoryIncluder {
    fn include(
        &mut self,
        requested: &str,
        kind: IncludeKind,
        from: FileId,
        depth: usize,
    ) -> Result<IncludedFile, IncludeError> {
        let from_name = self.name(from).map(ToOwned::to_owned);
        self.stack.prepare(from_name.as_deref(), depth);
        for path in candidates(requested, kind, &self.stack, &self.include_dirs) {
            if let Some(&file) = self.by_path.get(&normalize(&path)) {
                let source = self.source(file).unwrap_or("").to_owned();
                self.stack.push(&path);
                return Ok(IncludedFile {
                    file,
                    name: path,
                    source,
                });
            }
        }
        Err(IncludeError::not_found())
    }
}
