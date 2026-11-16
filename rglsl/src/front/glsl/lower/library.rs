use alloc::{
    collections::{BTreeMap, BTreeSet},
    format,
    string::{String, ToString},
    sync::Arc,
    vec::Vec,
};
use core::cell::RefCell;

use rglsl_sema::{BuiltinTables, ResourceLimits, StageTables};
use rglsl_types::probe::StageProbe;

use super::{
    Mode, Parsed, StageClass, link_time, lower_object, preprocess, preprocessor_options,
    run_lowerer, sema_error, sema_options,
};
use crate::front::glsl::{Error, ErrorKind, Options, ParseErrors};
use crate::object::{LibraryVariant, ObjectModule, StageRejection};
use crate::{Block, ShaderStage, ShaderStageMask, Span};

fn stage_options(options: &Options, stage: ShaderStage) -> Options {
    Options {
        stage,
        defines: options.defines.clone(),
        library: false,
        source_name: options.source_name.clone(),
        binding_shifts: options.binding_shifts.clone(),
        preamble: options.preamble.clone(),
        builtin_tables: Arc::clone(&options.builtin_tables),
        ..*options
    }
}

fn fingerprint(object: &ObjectModule) -> String {
    let mut text = String::new();
    let mut unit = Some(&*object.unit);
    while let Some(current) = unit {
        text.push_str(&format!(
            "{:?}{:?}{:?}{:?}{:?}{:?}{:?}{:?}{:?}{:?}",
            current.glsl_version,
            current.extensions,
            current.module,
            current.functions,
            current.globals,
            current.layout,
            current.work_group_size_constant,
            current.work_group_size_placeholders,
            current.deferred_bias,
            current.dead_calls,
        ));
        let bodies = current
            .module
            .functions
            .iter()
            .map(|(_, function)| &function.body)
            .chain(
                current
                    .module
                    .entry_points
                    .iter()
                    .map(|entry| &entry.function.body),
            );
        for body in bodies {
            text.push_str(&body_fingerprint(body));
        }
        unit = current.specialized.as_deref();
        text.push('|');
    }
    text
}

fn body_fingerprint(body: &Block) -> String {
    let mut text = String::new();
    let mut pending = Vec::from([body.span_iter()]);
    while let Some(top) = pending.last_mut() {
        let Some((statement, span)) = top.next() else {
            pending.pop();
            continue;
        };
        text.push_str(&format!("{statement:?}{span:?};"));
        let start = pending.len();
        statement.for_each_child_block(|child| pending.push(child.span_iter()));
        if let Some(added) = pending.get_mut(start..) {
            added.reverse();
        }
    }
    text
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

fn stage_order(hint: Option<ShaderStage>) -> Vec<ShaderStage> {
    hint.into_iter()
        .chain(
            ShaderStage::ALL
                .into_iter()
                .filter(|&candidate| Some(candidate) != hint),
        )
        .collect()
}

#[expect(
    clippy::too_many_arguments,
    reason = "the arguments are the parts of one request"
)]
pub(super) fn compile(
    options: &Options,
    hint: Option<ShaderStage>,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
    share: bool,
    names: &mut StageNames,
    parsed: Parsed,
) -> Result<ObjectModule, ParseErrors> {
    let order = stage_order(hint);
    let all: ShaderStageMask = order.iter().copied().collect();
    let once = if share {
        once(options, hint, source, root, includer, names, parsed)
    } else {
        None
    };
    let Some(once) = once else {
        let (variants, failures) =
            per_class(options, hint, source, root, includer, share, names, all);
        return assemble(Vec::new(), variants, failures, hint, source);
    };
    let (variants, failures) = if once.unknown.is_empty() {
        (Vec::new(), Vec::new())
    } else {
        per_class(
            options,
            hint,
            source,
            root,
            includer,
            share,
            names,
            once.unknown,
        )
    };
    let mut objects: Vec<ObjectModule> = once.object.into_iter().collect();
    objects.extend(variants.into_iter().map(|(_, object)| object));
    if objects.is_empty() {
        if let Some(stage) = hint
            && let Some((_, errors)) = failures.into_iter().find(|&(failed, _)| failed == stage)
        {
            return Err(errors);
        }
        let reported = hint.map_or(all, ShaderStageMask::of);
        let (variants, failures) = per_class(
            options, hint, source, root, includer, share, names, reported,
        );
        return assemble(Vec::new(), variants, failures, hint, source);
    }
    let mut rejections = once.rejections;
    rejections.extend(
        failures
            .iter()
            .map(|&(stage, ref errors)| rejection(stage, errors, source)),
    );
    rejections.sort_by_key(|rejection| {
        order
            .iter()
            .position(|&stage| stage == rejection.stage)
            .unwrap_or(order.len())
    });
    assemble(
        rejections,
        objects
            .into_iter()
            .map(|object| (String::new(), object))
            .collect(),
        Vec::new(),
        hint,
        source,
    )
}

fn assemble(
    rejections: Vec<StageRejection>,
    variants: Vec<(String, ObjectModule)>,
    failures: Vec<(ShaderStage, ParseErrors)>,
    hint: Option<ShaderStage>,
    source: &str,
) -> Result<ObjectModule, ParseErrors> {
    let mut variants = variants.into_iter().map(|(_, object)| object);
    let Some(mut library) = variants.next() else {
        let best = match hint {
            Some(_) => failures.into_iter().next(),
            None => failures
                .into_iter()
                .min_by_key(|&(_, ref errors)| errors.errors.len()),
        };
        return Err(best.map_or_else(
            || ParseErrors::from(Vec::<Error>::new()),
            |(_, errors)| errors,
        ));
    };
    let variants: Vec<LibraryVariant> = variants
        .map(|variant| LibraryVariant {
            stages: library_stages(&variant),
            unit: variant.unit,
        })
        .collect();
    if let Some(target) = library.library_mut() {
        target.variants = variants;
        target.rejections = rejections;
        target.rejections.extend(
            failures
                .iter()
                .map(|&(stage, ref errors)| rejection(stage, errors, source)),
        );
    }
    Ok(library)
}

fn library_stages(object: &ObjectModule) -> ShaderStageMask {
    object
        .library()
        .map_or(ShaderStageMask::empty(), |library| library.stages)
}

fn add_stage(object: &mut ObjectModule, stage: ShaderStage) {
    if let Some(library) = object.library_mut() {
        library.stages |= ShaderStageMask::of(stage);
    }
}

#[expect(
    clippy::too_many_arguments,
    reason = "the arguments are the parts of one request"
)]
fn per_class(
    options: &Options,
    hint: Option<ShaderStage>,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
    share: bool,
    names: &mut StageNames,
    stages: ShaderStageMask,
) -> Classes {
    let mut variants: Vec<(String, ObjectModule)> = Vec::new();
    let mut failures: Vec<(ShaderStage, ParseErrors)> = Vec::new();
    let mut classes: Vec<(ShaderStageMask, Outcome)> = Vec::new();
    for stage in stage_order(hint) {
        if !stages.has(stage) {
            continue;
        }
        if share && let Some(&(_, outcome)) = classes.iter().find(|&&(mask, _)| mask.has(stage)) {
            match outcome {
                Outcome::Variant(index) => {
                    if let Some(&mut (_, ref mut variant)) = variants.get_mut(index) {
                        add_stage(variant, stage);
                    }
                }
                Outcome::Failure(index) => {
                    if let Some(errors) = failures.get(index).map(|&(_, ref errors)| errors.clone())
                    {
                        failures.push((stage, errors));
                    }
                }
            }
            continue;
        }
        let options = stage_options(options, stage);
        let class = StageClass::collecting_identifiers(stage);
        let result = lower_object(
            &options,
            source,
            Mode::Library,
            root,
            includer,
            names,
            &class,
        );
        let version = class.version();
        let reached = class.stages();
        let mask = names.equivalent(version, stage, reached, &class.into_names())
            | ShaderStageMask::of(stage);
        let outcome = match result {
            Ok(mut object) => {
                let key = fingerprint(&object);
                match variants
                    .iter_mut()
                    .position(|&mut (ref known, _)| *known == key)
                {
                    Some(index) => {
                        if let Some(&mut (_, ref mut variant)) = variants.get_mut(index) {
                            add_stage(variant, stage);
                        }
                        Outcome::Variant(index)
                    }
                    None => {
                        if let Some(library) = object.library_mut() {
                            library.stages = ShaderStageMask::of(stage);
                        }
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
    (variants, failures)
}

type Classes = (Vec<(String, ObjectModule)>, Vec<(ShaderStage, ParseErrors)>);

struct Once {
    object: Option<ObjectModule>,
    rejections: Vec<StageRejection>,
    unknown: ShaderStageMask,
}

struct Run {
    object: Option<ObjectModule>,
    accepted: ShaderStageMask,
    rejected: Vec<(ShaderStage, StageRejection)>,
    unknown: ShaderStageMask,
}

const STAGE_KEYWORDS: [(&str, ShaderStageMask); 3] = [
    ("discard", ShaderStageMask::FRAGMENT),
    ("shared", ShaderStageMask::COMPUTE_LIKE),
    (
        "patch",
        ShaderStageMask::TESS_CONTROL.union(ShaderStageMask::TESS_EVALUATION),
    ),
];

fn choose(
    order: &[ShaderStage],
    allowed: ShaderStageMask,
    tables: &StageTables,
    identifiers: &BTreeSet<String>,
) -> Option<ShaderStage> {
    let candidates: Vec<ShaderStage> = order
        .iter()
        .copied()
        .filter(|&candidate| allowed.has(candidate))
        .collect();
    let mut scores: BTreeMap<ShaderStage, (usize, usize)> = BTreeMap::new();
    for identifier in identifiers {
        let lower = identifier.to_ascii_lowercase();
        let layout = rglsl_sema::layout_stages(&lower);
        let keyword = STAGE_KEYWORDS
            .iter()
            .find(|&&(name, _)| name == identifier)
            .map(|&(_, stages)| stages);
        let counts: Vec<usize> = candidates
            .iter()
            .map(|&candidate| tables.overloads(candidate, identifier).len())
            .collect();
        let most = counts.iter().copied().max().unwrap_or(0);
        let varies = counts.iter().any(|&count| count != most);
        for (&candidate, &count) in candidates.iter().zip(&counts) {
            let mut declared = 0;
            if tables.variable(candidate, identifier).is_some() {
                declared += 1;
            }
            if layout.is_some_and(|stages| stages.has(candidate)) {
                declared += 1;
            }
            if keyword.is_some_and(|stages| stages.has(candidate)) {
                declared += 1;
            }
            let entry = scores.entry(candidate).or_default();
            entry.0 += declared;
            entry.1 += usize::from(varies && count == most);
        }
    }
    let best = scores.values().copied().max().unwrap_or_default();
    candidates
        .into_iter()
        .find(|candidate| scores.get(candidate).copied().unwrap_or_default() == best)
}

fn once(
    options: &Options,
    hint: Option<ShaderStage>,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
    names: &mut StageNames,
    parsed: Parsed,
) -> Option<Once> {
    let order = stage_order(hint);
    let base = rglsl_pp::version_check(source, &preprocessor_options(options, None));
    if !base.1.is_empty() {
        return None;
    }
    let mut versioned = ShaderStageMask::empty();
    let mut rejections: Vec<(ShaderStage, StageRejection)> = Vec::new();
    let mut unknown = ShaderStageMask::empty();
    for &candidate in &order {
        let checked =
            rglsl_pp::version_check(source, &preprocessor_options(options, Some(candidate)));
        if checked == base {
            versioned |= ShaderStageMask::of(candidate);
            continue;
        }
        match checked.1.first() {
            Some(&message) => {
                let error = Error {
                    kind: ErrorKind::Syntax(
                        rglsl_pp::DiagnosticKind::VersionUnsupported { message }.to_string(),
                    ),
                    meta: Span::new(0, 0),
                };
                let errors = ParseErrors::from(alloc::vec![(error, None)]);
                rejections.push((candidate, rejection(candidate, &errors, source)));
            }
            None => unknown |= ShaderStageMask::of(candidate),
        }
    }
    let first = order
        .iter()
        .copied()
        .find(|&candidate| versioned.has(candidate))?;
    let (preprocessed, unit, failed) = match parsed.reuse(first) {
        Some(reused) => reused,
        None => {
            let preprocessed = preprocess(options, Some(first), source, root, includer);
            let (unit, failure) = super::parse_unit(options, preprocessed.text.as_str());
            (preprocessed, unit, failure.is_some())
        }
    };
    if !preprocessed.same_for_stage(first) || preprocessed.has_errors() || failed {
        return None;
    }
    let text = preprocessed.text.as_str();
    let version = if preprocessed.version.number == 460 {
        460
    } else {
        450
    };
    let tables = names.tables(version);
    let identifiers = identifiers(text);
    let own = choose(&order, versioned, &tables, &identifiers)?;
    let context = Context {
        options,
        source,
        preprocessed: &preprocessed,
        unit: &unit,
        tables: &tables,
        order: &order,
        hint,
        own,
        versioned,
    };
    let main = context.run(false, names);
    unknown |= main.unknown;
    rejections.extend(main.rejected);
    let mut object = main.object;
    let mut accepted = main.accepted;
    if let Some(ref mut object) = object
        && object.unit.work_group_size_constant
    {
        let specialized = context.run(true, names);
        if specialized.accepted.contains(accepted) {
            object.unit.specialized = specialized.object.map(|specialized| specialized.unit);
        } else if !specialized.accepted.intersects(accepted)
            && !specialized.unknown.intersects(accepted)
        {
            object.unit.specialized = None;
        } else {
            unknown |= accepted;
            accepted = ShaderStageMask::empty();
        }
    }
    let object = object.filter(|_| !accepted.is_empty()).map(|mut object| {
        if let Some(library) = object.library_mut() {
            library.stages = accepted;
        }
        object
    });
    rejections.sort_by_key(|&(stage, _)| order.iter().position(|&known| known == stage));
    Some(Once {
        object,
        rejections: rejections
            .into_iter()
            .map(|(_, rejection)| rejection)
            .collect(),
        unknown,
    })
}

struct Context<'a> {
    options: &'a Options,
    source: &'a str,
    preprocessed: &'a rglsl_pp::Preprocessed,
    unit: &'a rglsl_ast::TranslationUnit,
    tables: &'a Arc<StageTables>,
    order: &'a [ShaderStage],
    hint: Option<ShaderStage>,
    own: ShaderStage,
    versioned: ShaderStageMask,
}

impl Context<'_> {
    fn run(&self, specialize: bool, names: &mut StageNames) -> Run {
        let map = &self.preprocessed.source_map;
        let text = self.preprocessed.text.as_str();
        let own_options = stage_options(self.options, self.own);
        let analysis = rglsl_sema::analyze_library(
            self.unit,
            &rglsl_sema::Options {
                specialize_work_group_size: specialize,
                ..sema_options(&own_options, text)
            },
            self.tables,
        );
        let mut run = Run {
            object: None,
            accepted: ShaderStageMask::empty(),
            rejected: Vec::new(),
            unknown: ShaderStageMask::empty(),
        };
        let mut clean = ShaderStageMask::empty();
        let mut waiting = Vec::new();
        let waits_for_lowering = analysis
            .diagnostics
            .iter()
            .filter(|diagnostic| !link_time(&diagnostic.kind))
            .all(|diagnostic| diagnostic.kind.waits_for_lowering());
        for &candidate in self.order {
            if !self.versioned.has(candidate) {
                continue;
            }
            let bit = ShaderStageMask::of(candidate);
            match first_error(&analysis, candidate) {
                Some((diagnostic, trusted)) => {
                    if !trusted.has(candidate) {
                        run.unknown |= bit;
                        continue;
                    }
                    let reworded = reword(self.tables, &diagnostic.kind, candidate);
                    let error = sema_error(map, text, self.source, diagnostic, reworded);
                    let errors = ParseErrors::from(alloc::vec![error]);
                    let rejected = (candidate, rejection(candidate, &errors, self.source));
                    if waits_for_lowering
                        && diagnostic.kind.waits_for_lowering()
                        && analysis.stages.has(candidate)
                    {
                        clean |= bit;
                        waiting.push(rejected);
                    } else {
                        run.rejected.push(rejected);
                    }
                }
                None if analysis.stages.has(candidate) => clean |= bit,
                None => run.unknown |= bit,
            }
        }
        let Some(lowering) = self
            .hint
            .into_iter()
            .chain([self.own])
            .chain(self.order.iter().copied())
            .find(|&candidate| clean.has(candidate))
        else {
            return run;
        };
        let probe = StageProbe::new(lowering);
        probe.narrow(analysis.stages);
        let stage_names = RefCell::new(BTreeSet::new());
        names.lowerings += 1;
        let result = run_lowerer(
            &stage_options(self.options, lowering),
            self.source,
            self.preprocessed,
            self.unit,
            &analysis,
            Mode::Library,
            &probe,
            &stage_names,
            specialize,
        );
        let compatible = probe.compatible() & clean;
        run.unknown |= clean & !compatible;
        match result {
            Ok(object) => {
                let mut waited = ShaderStageMask::empty();
                for (candidate, rejected) in waiting {
                    if compatible.has(candidate) {
                        waited |= ShaderStageMask::of(candidate);
                        run.rejected.push((candidate, rejected));
                    }
                }
                run.accepted = compatible & !waited;
                run.object = Some(object);
            }
            Err(errors) => {
                for &candidate in self.order {
                    if compatible.has(candidate) {
                        run.rejected
                            .push((candidate, rejection(candidate, &errors, self.source)));
                    }
                }
            }
        }
        run
    }
}

fn first_error(
    analysis: &rglsl_sema::Analysis,
    candidate: ShaderStage,
) -> Option<(&rglsl_sema::Diagnostic, ShaderStageMask)> {
    let staged = analysis
        .stage_diagnostics
        .iter()
        .filter(|entry| entry.stage == candidate)
        .map(|entry| (entry.index, 0, &entry.diagnostic, entry.trusted));
    let unconditional = analysis
        .diagnostics
        .iter()
        .enumerate()
        .filter(|&(_, diagnostic)| !link_time(&diagnostic.kind))
        .map(|(index, diagnostic)| {
            (
                index,
                1,
                diagnostic,
                analysis
                    .diagnostic_trust
                    .get(index)
                    .copied()
                    .unwrap_or_else(ShaderStageMask::all),
            )
        });
    staged
        .chain(unconditional)
        .min_by_key(|&(index, order, _, _)| (index, order))
        .map(|(_, _, diagnostic, trusted)| (diagnostic, trusted))
}

fn reword(
    tables: &StageTables,
    kind: &rglsl_sema::DiagnosticKind,
    own: ShaderStage,
) -> Option<String> {
    use rglsl_sema::DiagnosticKind;
    let (DiagnosticKind::UndeclaredIdentifier(ref name)
    | DiagnosticKind::NoMatchingFunction(ref name)) = *kind
    else {
        return None;
    };
    let declared = !tables.declares(own, name)
        && ShaderStage::ALL
            .into_iter()
            .filter(|&candidate| candidate != own)
            .any(|candidate| tables.declares(candidate, name));
    declared.then(|| format!("`{name}` is not available in {} shaders", own.name()))
}

fn identifiers(text: &str) -> BTreeSet<String> {
    let mut names = BTreeSet::new();
    let mut start = None;
    for (index, character) in text
        .char_indices()
        .chain(core::iter::once((text.len(), ' ')))
    {
        let word = character.is_ascii_alphanumeric() || character == '_';
        match (start, word) {
            (None, true) => start = Some(index),
            (Some(from), false) => {
                if let Some(identifier) = text.get(from..index)
                    && identifier
                        .chars()
                        .next()
                        .is_some_and(|first| !first.is_ascii_digit())
                    && !names.contains(identifier)
                {
                    names.insert(String::from(identifier));
                }
                start = None;
            }
            _ => {}
        }
    }
    names
}

#[derive(Debug)]
pub(super) struct StageNames {
    tables: Vec<Arc<StageTables>>,
    source: Arc<dyn BuiltinTables + Send + Sync>,
    limits: ResourceLimits,
    pub lowerings: usize,
}

impl StageNames {
    pub(super) fn new(options: &Options) -> Self {
        Self {
            tables: Vec::new(),
            source: Arc::clone(&options.builtin_tables),
            limits: options.limits,
            lowerings: 0,
        }
    }

    pub(super) fn tables(&mut self, version: u32) -> Arc<StageTables> {
        if let Some(found) = self
            .tables
            .iter()
            .find(|tables| tables.version() == version)
        {
            return Arc::clone(found);
        }
        let tables = self.source.stage_tables(version, &self.limits);
        self.tables.push(Arc::clone(&tables));
        tables
    }

    fn equivalent(
        &mut self,
        version: Option<u32>,
        own: ShaderStage,
        reached: ShaderStageMask,
        names: &BTreeSet<String>,
    ) -> ShaderStageMask {
        let version = match version {
            Some(460) => 460,
            _ => 450,
        };
        let tables = self.tables(version);
        let mut mask = ShaderStageMask::empty();
        for candidate in reached.stages() {
            if candidate == own || names.iter().all(|name| tables.same(own, candidate, name)) {
                mask |= ShaderStageMask::of(candidate);
            }
        }
        mask
    }

    pub(super) fn stage_diagnostic(
        &mut self,
        kind: &rglsl_sema::DiagnosticKind,
        version: Option<u32>,
        own: ShaderStage,
    ) -> Option<String> {
        let version = match version {
            Some(460) => 460,
            _ => 450,
        };
        reword(&self.tables(version), kind, own)
    }
}
