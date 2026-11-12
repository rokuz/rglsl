use alloc::{
    format,
    string::{String, ToString},
    vec::Vec,
};

use rglsl_sema::{Builtins, ResourceLimits};

use super::{lower_object, stage, Mode, StageClass};
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

#[derive(Clone, Copy, Debug)]
enum Outcome {
    Variant(usize),
    Failure(usize),
}

fn stage_bit(stage: ShaderStage) -> u16 {
    ShaderStage::ALL
        .iter()
        .position(|&candidate| candidate == stage)
        .map_or(0, |index| 1 << index)
}

pub(super) fn compile(
    options: &Options,
    hint: Option<ShaderStage>,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
    share: bool,
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
    let mut classes: Vec<(u16, Outcome)> = Vec::new();
    let mut names = StageNames::default();
    for stage in order {
        let bit = stage_bit(stage);
        if share {
            if let Some(&(_, outcome)) = classes.iter().find(|&&(mask, _)| mask & bit != 0) {
                match outcome {
                    Outcome::Variant(index) => {
                        if let Some(&mut (_, ref mut variant)) = variants.get_mut(index) {
                            variant.stages.push(stage);
                        }
                    }
                    Outcome::Failure(index) => {
                        if let Some(errors) =
                            failures.get(index).map(|&(_, ref errors)| errors.clone())
                        {
                            failures.push((stage, errors));
                        }
                    }
                }
                continue;
            }
        }
        let options = stage_options(options, stage);
        let class = StageClass::new(stage);
        let result = lower_object(
            &options,
            source,
            Mode::Library,
            root,
            includer,
            &mut names,
            &class,
        );
        let version = class.version();
        let reached = class.stages();
        let mask = names.equivalent(version, stage, reached, &class.into_names()) | bit;
        let outcome = match result {
            Ok(mut object) => {
                let key = fingerprint(&object);
                match variants
                    .iter_mut()
                    .position(|&mut (ref known, _)| *known == key)
                {
                    Some(index) => {
                        if let Some(&mut (_, ref mut variant)) = variants.get_mut(index) {
                            variant.stages.push(stage);
                        }
                        Outcome::Variant(index)
                    }
                    None => {
                        object.stages = alloc::vec![stage];
                        variants.push((key, object));
                        Outcome::Variant(variants.len() - 1)
                    }
                }
            }
            Err(errors) => {
                failures.push((stage, errors));
                Outcome::Failure(failures.len() - 1)
            }
        };
        classes.push((mask, outcome));
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
    descriptions: alloc::collections::BTreeMap<(ShaderStage, u32, String), String>,
}

impl StageNames {
    fn table(&mut self, version: u32, candidate: ShaderStage) -> Option<&Builtins> {
        let position = self
            .tables
            .iter()
            .position(|&(stage, known, _)| stage == candidate && known == version);
        let index = position.unwrap_or_else(|| {
            let builtins = Builtins::new(version, stage(candidate), &ResourceLimits::default());
            self.tables.push((candidate, version, builtins));
            self.tables.len() - 1
        });
        self.tables.get(index).map(|&(_, _, ref builtins)| builtins)
    }

    fn describe(&mut self, version: u32, candidate: ShaderStage, name: &str) -> String {
        let key = (candidate, version, String::from(name));
        if let Some(known) = self.descriptions.get(&key) {
            return known.clone();
        }
        let description = self
            .table(version, candidate)
            .map_or_else(String::new, |builtins| {
                let variable = builtins
                    .variables()
                    .find(|&(variable, _)| variable == name)
                    .and_then(|(_, id)| usize::try_from(id.index()).ok())
                    .and_then(|index| builtins.symbols().get(index));
                let functions: Vec<_> = builtins
                    .overloads(name)
                    .iter()
                    .filter_map(|&id| builtins.function(id))
                    .collect();
                format!("{variable:?}{functions:?}")
            });
        self.descriptions.insert(key, description.clone());
        description
    }

    fn equivalent(
        &mut self,
        version: Option<u32>,
        own: ShaderStage,
        reached: u16,
        names: &alloc::collections::BTreeSet<String>,
    ) -> u16 {
        let version = match version {
            Some(460) => 460,
            _ => 450,
        };
        let mut mask = 0;
        for candidate in ShaderStage::ALL {
            let bit = stage_bit(candidate);
            if reached & bit == 0 {
                continue;
            }
            if candidate == own
                || names.iter().all(|name| {
                    self.describe(version, candidate, name) == self.describe(version, own, name)
                })
            {
                mask |= bit;
            }
        }
        mask
    }

    fn declares(&mut self, version: u32, candidate: ShaderStage, name: &str) -> bool {
        self.table(version, candidate).is_some_and(|builtins| {
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
