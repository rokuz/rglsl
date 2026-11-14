use std::collections::{BTreeMap, BTreeSet};

use rglsl::object::{FunctionSymbol, ObjectModule};
use rglsl::{Block, FastHashMap, Function, Handle};

use crate::error::LinkError;

pub(crate) fn callees(block: &Block, found: &mut Vec<Handle<Function>>) {
    for statement in block.walk() {
        statement.for_each_callee(|callee| {
            if !found.contains(&callee) {
                found.push(callee);
            }
        });
    }
}

pub(crate) type Node = (usize, Handle<Function>);

type Frame = (Option<Node>, Vec<Result<Node, String>>);

type DeadCalls = BTreeMap<Option<Handle<Function>>, Vec<Handle<Function>>>;

#[derive(Debug, Default)]
pub(crate) struct SymbolTable {
    pub definitions: BTreeMap<String, Node>,
    symbols: Vec<FastHashMap<Handle<Function>, usize>>,
}

impl SymbolTable {
    pub fn symbol<'o>(
        &self,
        objects: &'o [ObjectModule],
        node: Node,
    ) -> Option<&'o FunctionSymbol> {
        let (index, handle) = node;
        let position = *self.symbols.get(index)?.get(&handle)?;
        objects.get(index)?.unit.functions.get(position)
    }

    pub fn build(objects: &[ObjectModule], errors: &mut Vec<LinkError>) -> Self {
        let mut table = Self {
            definitions: BTreeMap::new(),
            symbols: objects
                .iter()
                .map(|object| {
                    let mut positions = FastHashMap::default();
                    for (position, symbol) in object.unit.functions.iter().enumerate() {
                        positions.entry(symbol.function).or_insert(position);
                    }
                    positions
                })
                .collect(),
        };
        let mut duplicates = BTreeSet::new();
        for (index, object) in objects.iter().enumerate() {
            for symbol in &object.unit.functions {
                let Ok(function) = object.unit.module.functions.try_get(symbol.function) else {
                    errors.push(LinkError::Internal(format!(
                        "function symbol `{}` has no function",
                        symbol.signature
                    )));
                    continue;
                };
                if function.linkage.is_import() && symbol.invalid.is_none() {
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
            for symbol in &object.unit.functions {
                let Some(&(defining, handle)) = table.definitions.get(&symbol.signature) else {
                    continue;
                };
                let Some(definition) = table.symbol(objects, (defining, handle)) else {
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
        let Ok(function) = object.unit.module.functions.try_get(handle) else {
            return Err(String::from("<unknown>"));
        };
        if function.linkage.is_definition() {
            return Ok(node);
        }
        let signature = self.symbol(objects, node).map_or_else(
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
    keep_uncalled: bool,
    errors: &mut Vec<LinkError>,
) -> Vec<Node> {
    let Some(entry) = objects
        .get(main)
        .and_then(|object| object.unit.module.entry_points.first())
    else {
        return Vec::new();
    };
    let dead_calls: Vec<DeadCalls> = objects
        .iter()
        .map(|object| {
            let mut calls = DeadCalls::new();
            for call in &object.unit.dead_calls {
                calls.entry(call.caller).or_default().push(call.callee);
            }
            calls
        })
        .collect();
    let edges = |index: usize, caller: Option<Handle<Function>>, block: &Block| {
        let mut found = Vec::new();
        callees(block, &mut found);
        for &callee in dead_calls
            .get(index)
            .and_then(|calls| calls.get(&caller))
            .into_iter()
            .flatten()
        {
            if !found.contains(&callee) {
                found.push(callee);
            }
        }
        found
            .into_iter()
            .map(|callee| table.resolve(objects, (index, callee)))
            .collect::<Vec<Result<Node, String>>>()
    };
    let body = |node: Node| -> Option<&Block> {
        let (index, handle) = node;
        objects
            .get(index)
            .and_then(|object| object.unit.module.functions.try_get(handle).ok())
            .map(|function| &function.body)
    };
    let name = |node: Node| -> String {
        let (index, handle) = node;
        table
            .symbol(objects, node)
            .map(|symbol| symbol.signature.clone())
            .or_else(|| {
                objects
                    .get(index)
                    .and_then(|object| object.unit.module.functions.try_get(handle).ok())
                    .and_then(|function| function.name.clone())
            })
            .unwrap_or_default()
    };
    let mut missing: Vec<String> = Vec::new();
    let mut invalid: Vec<LinkError> = Vec::new();
    let mut recursion: BTreeSet<String> = BTreeSet::new();
    let mut done: BTreeSet<Node> = BTreeSet::new();
    let mut active: BTreeSet<Node> = BTreeSet::new();
    let mut postorder: Vec<Node> = Vec::new();
    let mut callees_of: BTreeMap<Node, Vec<Node>> = BTreeMap::new();
    let mut stack: Vec<Frame> = Vec::new();
    let mut roots = edges(main, None, &entry.function.body);
    if keep_uncalled {
        let mut uncalled: Vec<Result<Node, String>> = objects
            .iter()
            .enumerate()
            .flat_map(|(index, object)| {
                object
                    .unit
                    .functions
                    .iter()
                    .map(move |symbol| (index, symbol))
            })
            .filter(|&(index, symbol)| {
                table.definitions.get(&symbol.signature) == Some(&(index, symbol.function))
            })
            .map(|(index, symbol)| Ok((index, symbol.function)))
            .collect();
        uncalled.reverse();
        roots.reverse();
        uncalled.extend(roots);
        roots = uncalled;
    } else {
        roots.reverse();
    }
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
                if let Some(message) = table
                    .symbol(objects, next)
                    .and_then(|symbol| symbol.invalid.clone())
                {
                    done.insert(next);
                    invalid.push(LinkError::InvalidFunction {
                        signature: name(next),
                        message,
                    });
                    continue;
                }
                active.insert(next);
                let mut children =
                    body(next).map_or_else(Vec::new, |block| edges(next.0, Some(next.1), block));
                callees_of.insert(
                    next,
                    children
                        .iter()
                        .filter_map(|child| child.as_ref().ok().copied())
                        .collect(),
                );
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
    errors.extend(invalid);
    errors.extend(recursion.into_iter().map(LinkError::Recursion));
    in_object_order(&postorder, &callees_of)
}

fn in_object_order(reachable: &[Node], callees_of: &BTreeMap<Node, Vec<Node>>) -> Vec<Node> {
    let members: BTreeSet<Node> = reachable.iter().copied().collect();
    let mut waiting: BTreeMap<Node, usize> = BTreeMap::new();
    let mut callers: BTreeMap<Node, Vec<Node>> = BTreeMap::new();
    for &node in reachable {
        let callees: BTreeSet<Node> = callees_of
            .get(&node)
            .into_iter()
            .flatten()
            .copied()
            .filter(|callee| members.contains(callee) && *callee != node)
            .collect();
        waiting.insert(node, callees.len());
        for callee in callees {
            callers.entry(callee).or_default().push(node);
        }
    }
    let mut ready: BTreeSet<Node> = waiting
        .iter()
        .filter(|&(_, &count)| count == 0)
        .map(|(&node, _)| node)
        .collect();
    let mut order = Vec::with_capacity(reachable.len());
    while let Some(node) = ready.pop_first() {
        order.push(node);
        for &caller in callers.get(&node).into_iter().flatten() {
            if let Some(count) = waiting.get_mut(&caller) {
                *count = count.saturating_sub(1);
                if *count == 0 {
                    ready.insert(caller);
                }
            }
        }
    }
    order
}
