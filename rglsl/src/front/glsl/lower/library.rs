use alloc::{
    format,
    string::{String, ToString},
    vec::Vec,
};

use rglsl_sema::{Builtins, ResourceLimits};

use super::{lower_object, stage, Mode};
use crate::front::glsl::{Options, ParseErrors};
use crate::object::{ObjectModule, StageRejection};
use crate::ShaderStage;

fn stage_options(options: &Options, stage: ShaderStage) -> Options {
    Options {
        stage,
        defines: options.defines.clone(),
        library: false,
        ..*options
    }
}

fn fingerprint(object: &ObjectModule) -> String {
    format!(
        "{:?}{:?}{:?}{:?}{:?}",
        object.module, object.functions, object.globals, object.layout, object.specialized
    )
}

fn rejection(stage: ShaderStage, errors: &ParseErrors, source: &str) -> StageRejection {
    let first = errors.errors.first();
    let included = errors.include_location(0);
    StageRejection {
        stage,
        file: included.map(|location| location.file.clone()),
        line: match included {
            Some(location) => Some(location.line),
            None => first
                .filter(|error| error.meta.is_defined())
                .map(|error| error.meta.location(source).line_number),
        },
        message: first.map_or_else(
            || {
                format!(
                    "the library cannot be compiled as a {} shader",
                    stage.name()
                )
            },
            ToString::to_string,
        ),
    }
}

pub(super) fn compile(
    options: &Options,
    hint: Option<ShaderStage>,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
) -> Result<ObjectModule, ParseErrors> {
    let order: Vec<ShaderStage> = hint
        .into_iter()
        .chain(
            ShaderStage::ALL
                .into_iter()
                .filter(|&candidate| Some(candidate) != hint),
        )
        .collect();
    let mut variants: Vec<(String, ObjectModule)> = Vec::new();
    let mut failures: Vec<(ShaderStage, ParseErrors)> = Vec::new();
    let mut names = StageNames::default();
    for stage in order {
        let options = stage_options(options, stage);
        match lower_object(&options, source, Mode::Library, root, includer, &mut names) {
            Ok(object) => {
                let key = fingerprint(&object);
                match variants
                    .iter_mut()
                    .find(|&&mut (ref known, _)| *known == key)
                {
                    Some(&mut (_, ref mut variant)) => variant.stages.push(stage),
                    None => variants.push((key, object)),
                }
            }
            Err(errors) => failures.push((stage, errors)),
        }
    }
    let mut variants = variants.into_iter().map(|(_, object)| object);
    let Some(mut library) = variants.next() else {
        let best = match hint {
            Some(_) => failures.into_iter().next(),
            None => failures
                .into_iter()
                .min_by_key(|&(_, ref errors)| errors.errors.len()),
        };
        return Err(best.map_or_else(
            || ParseErrors::from(Vec::<crate::front::glsl::Error>::new()),
            |(_, errors)| errors,
        ));
    };
    library.variants = variants.collect();
    library.rejections = failures
        .iter()
        .map(|&(stage, ref errors)| rejection(stage, errors, source))
        .collect();
    Ok(library)
}

#[derive(Debug, Default)]
pub(super) struct StageNames {
    tables: Vec<(ShaderStage, u32, Builtins)>,
}

impl StageNames {
    fn declares(&mut self, version: u32, candidate: ShaderStage, name: &str) -> bool {
        let position = self
            .tables
            .iter()
            .position(|&(stage, known, _)| stage == candidate && known == version);
        let index = position.unwrap_or_else(|| {
            let builtins = Builtins::new(version, stage(candidate), &ResourceLimits::default());
            self.tables.push((candidate, version, builtins));
            self.tables.len() - 1
        });
        self.tables.get(index).is_some_and(|&(_, _, ref builtins)| {
            !builtins.overloads(name).is_empty()
                || builtins.variables().any(|(variable, _)| variable == name)
        })
    }

    pub(super) fn stage_diagnostic(
        &mut self,
        kind: &rglsl_sema::DiagnosticKind,
        version: Option<u32>,
        own: ShaderStage,
    ) -> Option<String> {
        use rglsl_sema::DiagnosticKind;
        let name = match *kind {
            DiagnosticKind::UndeclaredIdentifier(ref name)
            | DiagnosticKind::NoMatchingFunction(ref name) => name,
            _ => return None,
        };
        let version = match version {
            Some(460) => 460,
            _ => 450,
        };
        let declared = !self.declares(version, own, name)
            && ShaderStage::ALL
                .into_iter()
                .filter(|&candidate| candidate != own)
                .any(|candidate| self.declares(version, candidate, name));
        declared.then(|| format!("`{name}` is not available in {} shaders", own.name()))
    }
}
