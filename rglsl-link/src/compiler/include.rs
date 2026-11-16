use std::collections::BTreeMap;

use rglsl_pp::{
    FileId, FileSystemIncluder, IncludeError, IncludeKind, IncludeRequest, IncludedFile, Includer,
    MemoryIncluder, ResolvedInclude,
};

use super::CompileOptions;

pub type Resolve<'a> = dyn FnMut(IncludeRequest<'_>) -> Option<ResolvedInclude> + 'a;

type AnswerKey = (String, bool, Option<String>);

pub(crate) enum Includes<'a, 'r> {
    Memory {
        memory: MemoryIncluder,
        resolve: &'a mut Resolve<'r>,
        answers: BTreeMap<AnswerKey, Option<ResolvedInclude>>,
        read: Vec<String>,
    },
    FileSystem(FileSystemIncluder),
}

impl<'a, 'r> Includes<'a, 'r> {
    pub(crate) fn new(
        options: &CompileOptions,
        source: &str,
        resolve: &'a mut Resolve<'r>,
    ) -> (Self, FileId) {
        if options.file_system_includes {
            let mut includer = FileSystemIncluder::new(&options.include_dirs);
            let root = includer.add_root(&options.name);
            return (Self::FileSystem(includer), root);
        }
        let mut memory = MemoryIncluder::with_include_dirs(options.include_dirs.iter().cloned());
        for (name, text) in &options.includes {
            memory.add_file(name, text);
        }
        let root = memory.add_file(&options.name, source);
        (
            Self::Memory {
                memory,
                resolve,
                answers: BTreeMap::new(),
                read: Vec::new(),
            },
            root,
        )
    }

    pub(crate) fn files_read(&self, root: FileId) -> Vec<String> {
        match *self {
            Self::Memory { ref read, .. } => read.clone(),
            Self::FileSystem(ref includer) => includer
                .files()
                .filter(|&(file, _)| file != root)
                .map(|(_, name)| name.to_owned())
                .collect(),
        }
    }
}

impl Includer for Includes<'_, '_> {
    fn include(
        &mut self,
        requested: &str,
        kind: IncludeKind,
        from: FileId,
        depth: usize,
    ) -> Result<IncludedFile, IncludeError> {
        match *self {
            Self::FileSystem(ref mut includer) => includer.include(requested, kind, from, depth),
            Self::Memory {
                ref mut memory,
                ref mut resolve,
                ref mut answers,
                ref mut read,
            } => {
                let included =
                    memory.include_or_resolve(requested, kind, from, depth, &mut |request| {
                        let key = (
                            request.requested.to_owned(),
                            request.kind == IncludeKind::System,
                            request.includer.map(str::to_owned),
                        );
                        answers
                            .entry(key)
                            .or_insert_with(|| resolve(request))
                            .clone()
                    })?;
                if !read.contains(&included.name) {
                    read.push(included.name.clone());
                }
                Ok(included)
            }
        }
    }
}
