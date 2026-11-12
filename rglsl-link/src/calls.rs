use std::collections::{BTreeMap, BTreeSet};

use rglsl::object::ObjectModule;
use rglsl::{Block, Function, Handle, Statement};

use crate::error::LinkError;

pub(crate) fn callees(block: &Block, found: &mut Vec<Handle<Function>>) {
    for statement in block.walk() {
        match *statement {
            Statement::Block(_)
            | Statement::If { .. }
            | Statement::Switch { .. }
            | Statement::Loop { .. } => {}
            Statement::Call { function, .. } => {
                if !found.contains(&function) {
                    found.push(function);
                }
            }
            Statement::CooperativeMatrix { ref function, .. } => {
                for callee in function.functions() {
                    if !found.contains(&callee) {
                        found.push(callee);
                    }
                }
            }
            Statement::Emit(_)
            | Statement::SpirvInstruction { .. }
            | Statement::Break
            | Statement::Continue
            | Statement::Return { .. }
            | Statement::Kill
            | Statement::Demote
            | Statement::BeginInvocationInterlock
            | Statement::EndInvocationInterlock
            | Statement::SplitBarrier { .. }
            | Statement::EmitVertex { .. }
            | Statement::EndPrimitive { .. }
            | Statement::ControlBarrier(_)
            | Statement::MemoryBarrier(_)
            | Statement::ScopedBarrier { .. }
            | Statement::Store { .. }
            | Statement::ImageStore { .. }
            | Statement::Atomic { .. }
            | Statement::AtomicLoad { .. }
            | Statement::AtomicStore { .. }
            | Statement::ImageAtomic { .. }
            | Statement::WorkGroupUniformLoad { .. }
            | Statement::RayQuery { .. }
            | Statement::RayPipelineFunction(_)
            | Statement::HitObject { .. }
            | Statement::ReorderThread { .. }
            | Statement::MeshFunction(_)
            | Statement::SubgroupBallot { .. }
            | Statement::SubgroupGather { .. }
            | Statement::SubgroupCollectiveOperation { .. }
            | Statement::SubgroupFunction { .. }
            | Statement::CooperativeStore { .. }
            | Statement::DebugPrintf { .. }
            | Statement::Assume { .. }
            | Statement::CooperativeVector(_)
            | Statement::TensorWrite { .. }
            | Statement::Abort { .. } => {}
        }
    }
}

pub(crate) type Node = (usize, Handle<Function>);

type Frame = (Option<Node>, Vec<Result<Node, String>>);

#[derive(Debug, Default)]
pub(crate) struct SymbolTable {
    pub definitions: BTreeMap<String, Node>,
}

impl SymbolTable {
    pub fn build(objects: &[ObjectModule], errors: &mut Vec<LinkError>) -> Self {
        let mut table = Self::default();
        let mut duplicates = BTreeSet::new();
        for (index, object) in objects.iter().enumerate() {
            for symbol in &object.functions {
                let Ok(function) = object.module.functions.try_get(symbol.function) else {
                    errors.push(LinkError::Internal(format!(
                        "function symbol `{}` has no function",
                        symbol.signature
                    )));
                    continue;
                };
                if function.linkage.is_import() {
                    continue;
                }
                if table.definitions.contains_key(&symbol.signature) {
                    if duplicates.insert(symbol.signature.clone()) {
                        errors.push(LinkError::DuplicateDefinition(symbol.signature.clone()));
                    }
                    continue;
                }
                table
                    .definitions
                    .insert(symbol.signature.clone(), (index, symbol.function));
            }
        }
        let mut mismatched = BTreeSet::new();
        for object in objects {
            for symbol in &object.functions {
                let Some(&(defining, handle)) = table.definitions.get(&symbol.signature) else {
                    continue;
                };
                let Some(definition) = objects
                    .get(defining)
                    .and_then(|object| object.function_symbol(handle))
                else {
                    continue;
                };
                if (definition.result != symbol.result
                    || definition.qualifiers != symbol.qualifiers)
                    && mismatched.insert(symbol.signature.clone())
                {
                    errors.push(LinkError::SignatureMismatch(symbol.signature.clone()));
                }
            }
        }
        table
    }

    pub fn resolve(&self, objects: &[ObjectModule], node: Node) -> Result<Node, String> {
        let (index, handle) = node;
        let Some(object) = objects.get(index) else {
            return Err(String::from("<unknown>"));
        };
        let Ok(function) = object.module.functions.try_get(handle) else {
            return Err(String::from("<unknown>"));
        };
        if function.linkage.is_definition() {
            return Ok(node);
        }
        let signature = object.function_symbol(handle).map_or_else(
            || function.name.clone().unwrap_or_default(),
            |symbol| symbol.signature.clone(),
        );
        self.definitions.get(&signature).copied().ok_or(signature)
    }
}

pub(crate) fn order(
    objects: &[ObjectModule],
    main: usize,
    table: &SymbolTable,
    errors: &mut Vec<LinkError>,
) -> Vec<Node> {
    let Some(entry) = objects
        .get(main)
        .and_then(|object| object.module.entry_points.first())
    else {
        return Vec::new();
    };
    let edges = |index: usize, block: &Block| -> Vec<Result<Node, String>> {
        let mut found = Vec::new();
        callees(block, &mut found);
        found
            .into_iter()
            .map(|callee| table.resolve(objects, (index, callee)))
            .collect()
    };
    let body = |node: Node| -> Option<&Block> {
        let (index, handle) = node;
        objects
            .get(index)
            .and_then(|object| object.module.functions.try_get(handle).ok())
            .map(|function| &function.body)
    };
    let name = |node: Node| -> String {
        let (index, handle) = node;
        objects
            .get(index)
            .and_then(|object| {
                object
                    .function_symbol(handle)
                    .map(|symbol| symbol.signature.clone())
                    .or_else(|| {
                        object
                            .module
                            .functions
                            .try_get(handle)
                            .ok()
                            .and_then(|function| function.name.clone())
                    })
            })
            .unwrap_or_default()
    };
    let mut missing: Vec<String> = Vec::new();
    let mut recursion: BTreeSet<String> = BTreeSet::new();
    let mut done: BTreeSet<Node> = BTreeSet::new();
    let mut active: BTreeSet<Node> = BTreeSet::new();
    let mut postorder: Vec<Node> = Vec::new();
    let mut stack: Vec<Frame> = Vec::new();
    let mut roots = edges(main, &entry.function.body);
    roots.reverse();
    stack.push((None, roots));
    while let Some(&mut (current, ref mut pending)) = stack.last_mut() {
        match pending.pop() {
            Some(Err(signature)) => {
                if !missing.contains(&signature) {
                    missing.push(signature);
                }
            }
            Some(Ok(next)) => {
                if active.contains(&next) {
                    recursion.insert(name(next));
                    continue;
                }
                if done.contains(&next) {
                    continue;
                }
                active.insert(next);
                let mut children = body(next).map_or_else(Vec::new, |block| edges(next.0, block));
                children.reverse();
                stack.push((Some(next), children));
            }
            None => {
                stack.pop();
                if let Some(current) = current {
                    active.remove(&current);
                    done.insert(current);
                    postorder.push(current);
                }
            }
        }
    }
    errors.extend(missing.into_iter().map(LinkError::MissingDefinition));
    errors.extend(recursion.into_iter().map(LinkError::Recursion));
    postorder
}
