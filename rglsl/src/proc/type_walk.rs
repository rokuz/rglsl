use alloc::vec::Vec;

use crate::{arena::Handle, FastHashMap, FastHashSet, Type, TypeInner, UniqueArena};

pub fn contains<K: Copy + Eq + core::hash::Hash>(
    root: K,
    memo: &mut FastHashMap<K, bool>,
    mut step: impl FnMut(K, &mut Vec<K>) -> bool,
) -> bool {
    if let Some(&found) = memo.get(&root) {
        return found;
    }
    let mut pending = Vec::from([(root, false)]);
    let mut children = Vec::new();
    let mut entered = FastHashSet::default();
    while let Some((key, expanded)) = pending.pop() {
        if memo.contains_key(&key) {
            continue;
        }
        children.clear();
        if step(key, &mut children) {
            memo.insert(key, true);
        } else if expanded {
            let found = children
                .iter()
                .any(|child| memo.get(child).copied().unwrap_or(false));
            memo.insert(key, found);
        } else if entered.insert(key) {
            pending.push((key, true));
            pending.extend(
                children
                    .iter()
                    .rev()
                    .filter(|&&child| !memo.contains_key(&child))
                    .map(|&child| (child, false)),
            );
        }
    }
    memo.get(&root).copied().unwrap_or(false)
}

pub fn contains_type(
    types: &UniqueArena<Type>,
    root: Handle<Type>,
    memo: &mut FastHashMap<Handle<Type>, bool>,
    mut step: impl FnMut(&TypeInner, &mut Vec<Handle<Type>>) -> bool,
) -> bool {
    contains(root, memo, |ty, children| step(&types[ty].inner, children))
}

pub fn any_type(
    types: &UniqueArena<Type>,
    root: Handle<Type>,
    step: impl FnMut(&TypeInner, &mut Vec<Handle<Type>>) -> bool,
) -> bool {
    contains_type(types, root, &mut FastHashMap::default(), step)
}

pub fn array_element(types: &UniqueArena<Type>, mut ty: Handle<Type>) -> Handle<Type> {
    while let TypeInner::Array { base, .. } = types[ty].inner {
        ty = base;
    }
    ty
}

pub fn post_order<S, K: Copy + Eq + core::hash::Hash, E>(
    state: &mut S,
    root: K,
    mut expand: impl FnMut(&mut S, K, &mut Vec<K>) -> bool,
    mut finish: impl FnMut(&mut S, K) -> Result<(), E>,
) -> Result<(), E> {
    let mut pending = Vec::from([(root, false)]);
    let mut children = Vec::new();
    let mut entered = FastHashSet::default();
    while let Some((key, expanded)) = pending.pop() {
        if expanded {
            finish(state, key)?;
            continue;
        }
        children.clear();
        if !expand(state, key, &mut children) || !entered.insert(key) {
            continue;
        }
        pending.push((key, true));
        pending.extend(children.iter().rev().map(|&child| (child, false)));
    }
    Ok(())
}
