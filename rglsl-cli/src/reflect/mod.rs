mod database;
mod gl;
mod source;
mod traverse;
mod types;
mod walk;

use std::cell::{Cell, RefCell};
use std::collections::{BTreeMap, BTreeSet};
use std::fmt::Write as _;

use rglsl::front::glsl::Analyzed;
use rglsl::{Module, ShaderStage};
use rglsl_ast::ast::{
    DeclarationKind, ExternalDeclaration, FunctionDefinition, InitDeclaratorList, Node,
};
use rglsl_sema::{Analysis, FunctionId, SymbolId};

use database::Database;
use source::{block_defaults, compute_layout, declared_globals, implicit_sizes};
use traverse::UnitCx;
use types::{layout_value, Layouts};
use walk::{Event, Key, Walked};

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct Options {
    pub strict_array_suffix: bool,
    pub basic_array_suffix: bool,
    pub intermediate_io: bool,
    pub separate_buffers: bool,
    pub all_block_variables: bool,
    pub unwrap_io_blocks: bool,
    pub all_io_variables: bool,
    pub shared_std140_ubo: bool,
    pub shared_std140_ssbo: bool,
}

#[derive(Debug, Clone, Copy)]
pub struct Unit<'a> {
    pub analyzed: &'a Analyzed,
    pub compiled: bool,
}

#[derive(Debug)]
pub struct StageInput<'a> {
    pub stage: ShaderStage,
    pub units: Vec<Unit<'a>>,
    pub module: Option<&'a Module>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Settings {
    pub options: Options,
    pub spirv: bool,
    pub keep_uncalled: bool,
    pub auto_map_bindings: bool,
}

const STAGE_ORDER: [ShaderStage; 14] = [
    ShaderStage::Vertex,
    ShaderStage::TessControl,
    ShaderStage::TessEvaluation,
    ShaderStage::Geometry,
    ShaderStage::Fragment,
    ShaderStage::Compute,
    ShaderStage::RayGeneration,
    ShaderStage::Intersection,
    ShaderStage::AnyHit,
    ShaderStage::ClosestHit,
    ShaderStage::Miss,
    ShaderStage::Callable,
    ShaderStage::Task,
    ShaderStage::Mesh,
];

fn stage_index(stage: ShaderStage) -> usize {
    STAGE_ORDER
        .iter()
        .position(|&candidate| candidate == stage)
        .unwrap_or(0)
}

pub fn reflect(settings: Settings, stages: &[StageInput]) -> String {
    let mut ordered: Vec<&StageInput> = stages.iter().collect();
    ordered.sort_by_key(|input| stage_index(input.stage));
    let (first, last) = if settings.options.intermediate_io {
        (
            ordered.first().map_or(0, |input| stage_index(input.stage)),
            ordered.last().map_or(0, |input| stage_index(input.stage)),
        )
    } else {
        (0, 4)
    };
    let database = RefCell::new(Database {
        local_size: [1, 1, 1],
        ..Database::default()
    });
    for input in ordered {
        let program = Program {
            settings,
            database: &database,
            first,
            last,
        };
        program.add_stage(input);
    }
    database.into_inner().dump()
}

struct Program<'d> {
    settings: Settings,
    database: &'d RefCell<Database>,
    first: usize,
    last: usize,
}

#[derive(Clone, Copy)]
enum Item<'a> {
    Function(&'a Node<FunctionDefinition>),
    Globals(&'a InitDeclaratorList),
}

struct Function<'a> {
    unit: usize,
    item: Item<'a>,
    signature: String,
}

impl Function<'_> {
    fn is_main(&self) -> bool {
        matches!(self.item, Item::Function(definition) if definition.prototype.node.name.node == "main")
    }
}

fn signature(analysis: &Analysis, function: FunctionId) -> String {
    let Some(function) = analysis.function(function) else {
        return String::new();
    };
    let mut text = function.name.clone();
    text.push('(');
    for parameter in &function.parameters {
        let _ = write!(text, "{};", parameter.ty.display(&analysis.types));
    }
    text
}

impl Program<'_> {
    fn add_stage(&self, input: &StageInput) {
        let units: Vec<&Analyzed> = input.units.iter().map(|unit| unit.analyzed).collect();
        let entry_points: usize = units
            .iter()
            .map(|unit| {
                unit.unit
                    .external_declarations
                    .iter()
                    .filter(|declaration| {
                        matches!(
                            declaration,
                            ExternalDeclaration::FunctionDefinition(definition)
                                if definition.prototype.node.name.node == "main"
                        )
                    })
                    .count()
            })
            .sum();
        if entry_points != 1 {
            return;
        }
        let stage = stage_index(input.stage);
        if input.stage == ShaderStage::Compute {
            let (local_size, rate) = compute_layout(&units);
            let mut database = self.database.borrow_mut();
            database.local_size = local_size;
            database.tile_shading_rate = rate;
        }
        let mut functions = Vec::new();
        for (index, unit) in units.iter().enumerate() {
            if !input.units.get(index).is_some_and(|unit| unit.compiled) {
                continue;
            }
            for declaration in &unit.unit.external_declarations {
                match declaration {
                    ExternalDeclaration::FunctionDefinition(definition) => {
                        let Some(&id) = unit.analysis.function_declarations.get(&definition.id)
                        else {
                            continue;
                        };
                        functions.push(Function {
                            unit: index,
                            item: Item::Function(definition),
                            signature: signature(&unit.analysis, id),
                        });
                    }
                    ExternalDeclaration::Declaration(declaration) => {
                        if let DeclarationKind::InitDeclaratorList(ref list) = declaration.kind {
                            if list
                                .declarators
                                .iter()
                                .any(|declarator| declarator.initializer.is_some())
                            {
                                functions.push(Function {
                                    unit: index,
                                    item: Item::Globals(list),
                                    signature: String::new(),
                                });
                            }
                        }
                    }
                    ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
                }
            }
        }
        let walked: Vec<Walked> = functions
            .iter()
            .map(|function| {
                let analysis = units.get(function.unit).map(|unit| &unit.analysis);
                analysis.map_or_else(Walked::default, |analysis| match function.item {
                    Item::Function(definition) => {
                        walk::function_body(analysis, &definition.body.node.statements)
                    }
                    Item::Globals(list) => walk::global_initializers(analysis, list),
                })
            })
            .collect();
        let reachable = self.reachable(input, &functions, &walked);
        let processed = RefCell::new(BTreeSet::new());
        let defaults: Vec<_> = units.iter().map(|unit| block_defaults(unit)).collect();
        let mut used = BTreeSet::new();
        for ((function, walked), &live) in functions.iter().zip(&walked).zip(&reachable) {
            if !live {
                continue;
            }
            for event in &walked.events {
                if let Event::Symbol(symbol, _) = *event {
                    used.insert((function.unit, symbol));
                }
            }
        }
        let heap_bindings = self.heap_bindings(input, &used);
        let mut contexts = Vec::with_capacity(units.len());
        for (index, unit) in units.iter().enumerate() {
            contexts.push(UnitCx {
                program: self,
                unit: index,
                source: unit,
                analysis: &unit.analysis,
                layouts: Layouts::new(&unit.analysis.types, implicit_sizes(unit)),
                module: input.module,
                defaults: defaults.get(index).cloned().unwrap_or_default(),
                processed: &processed,
                heap_bindings: &heap_bindings,
                used: &used,
                stage,
                update_stage_masks: Cell::new(true),
                derefs: RefCell::new(BTreeMap::new()),
            });
        }
        for ((function, walked), reachable) in functions.iter().zip(&walked).zip(&reachable) {
            if !reachable {
                continue;
            }
            let Some(cx) = contexts.get(function.unit) else {
                continue;
            };
            cx.derefs.replace(walked.derefs.clone());
            cx.update_stage_masks.set(true);
            for event in &walked.events {
                cx.event(*event);
            }
        }
        if self.settings.options.shared_std140_ubo
            || self.settings.options.shared_std140_ssbo
            || self.settings.options.all_io_variables
        {
            let mut seen = BTreeSet::new();
            let mut linker = 0;
            for cx in &contexts {
                cx.update_stage_masks.set(false);
                for symbol in cx.linker_objects() {
                    let name = cx
                        .analysis
                        .symbol(symbol)
                        .map(|symbol| symbol.name.clone())
                        .unwrap_or_default();
                    if !name.is_empty() && !seen.insert(name) {
                        continue;
                    }
                    linker += 1;
                    cx.linker_object(symbol, Key::Linker(linker));
                }
            }
            if self.settings.options.all_io_variables
                && !self.settings.spirv
                && input.stage == ShaderStage::Vertex
                && stage == self.first
            {
                for name in ["gl_VertexID", "gl_InstanceID"] {
                    self.database.borrow_mut().pipe_input(
                        name,
                        rglsl_sema::types::Scalar::Int,
                        1u32 << stage,
                        self.settings.options,
                    );
                }
            }
        }
        if !self.settings.options.all_block_variables {
            let bit = 1u32 << stage;
            let mut database = self.database.borrow_mut();
            for object in &mut database.uniforms {
                object.stages |= bit;
            }
            for object in &mut database.buffer_variables {
                object.stages |= bit;
            }
        }
    }

    fn heap_bindings(
        &self,
        input: &StageInput,
        used: &BTreeSet<(usize, SymbolId)>,
    ) -> BTreeMap<(usize, SymbolId), i64> {
        let mut assigned = BTreeMap::new();
        let settings = self.settings;
        let Some(module) = input
            .module
            .filter(|_| settings.spirv && settings.auto_map_bindings)
        else {
            return assigned;
        };
        let mut taken: BTreeMap<i64, BTreeSet<i64>> = BTreeMap::new();
        for (_, global) in module.global_variables.iter() {
            if let Some(ref binding) = global.binding {
                taken
                    .entry(i64::from(binding.group))
                    .or_default()
                    .insert(i64::from(binding.binding));
            }
        }
        for (index, unit) in input.units.iter().enumerate() {
            let unit = unit.analyzed;
            for symbol in declared_globals(unit) {
                if !used.contains(&(index, symbol)) {
                    continue;
                }
                let Some(variable) = unit.analysis.symbol(symbol).and_then(|s| s.variable()) else {
                    continue;
                };
                let qualifiers = &variable.qualifiers;
                if !qualifiers.has_layout("descriptor_heap") || qualifiers.has_layout("binding") {
                    continue;
                }
                let set = layout_value(qualifiers, "set").unwrap_or(0);
                let slots = taken.entry(set).or_default();
                let mut binding = 0;
                while slots.contains(&binding) {
                    binding += 1;
                }
                slots.insert(binding);
                assigned.insert((index, symbol), binding);
            }
        }
        assigned
    }

    fn reachable(
        &self,
        input: &StageInput,
        functions: &[Function],
        walked: &[Walked],
    ) -> Vec<bool> {
        if self.settings.keep_uncalled {
            return vec![true; functions.len()];
        }
        let mut by_signature: BTreeMap<&str, Vec<usize>> = BTreeMap::new();
        for (index, function) in functions.iter().enumerate() {
            by_signature
                .entry(function.signature.as_str())
                .or_default()
                .push(index);
        }
        let mut reachable: Vec<bool> = functions
            .iter()
            .map(|function| matches!(function.item, Item::Globals(_)))
            .collect();
        let mut pending: Vec<usize> = functions
            .iter()
            .enumerate()
            .filter(|(_, function)| function.is_main())
            .map(|(index, _)| index)
            .collect();
        while let Some(index) = pending.pop() {
            let Some(slot) = reachable.get_mut(index) else {
                continue;
            };
            if *slot {
                continue;
            }
            *slot = true;
            let (Some(function), Some(walked)) = (functions.get(index), walked.get(index)) else {
                continue;
            };
            let Some(unit) = input.units.get(function.unit).map(|unit| unit.analyzed) else {
                continue;
            };
            for event in &walked.events {
                if let Event::Call(callee) = *event {
                    let key = signature(&unit.analysis, callee);
                    if let Some(targets) = by_signature.get(key.as_str()) {
                        pending.extend(targets.iter().copied());
                    }
                }
            }
        }
        reachable
    }
}
