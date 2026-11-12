use core::hash::{BuildHasher, Hash};
use std::collections::hash_map::RandomState;

use alloc::vec::Vec;

use super::TestResult;
use crate::types::{ArraySize, Type};

fn sizes(values: &[u32]) -> Vec<ArraySize> {
    values
        .iter()
        .map(|value| ArraySize::Sized(*value))
        .collect()
}

fn hash_of(state: &RandomState, value: impl Hash) -> u64 {
    state.hash_one(value)
}

#[test]
fn element_types_share_the_dimensions() -> TestResult {
    let ty = Type::INT.with_dimensions(&sizes(&[2, 3, 4]));
    let element = ty.element_type().ok_or("no element type")?;
    let innermost = element.element_type().ok_or("no element type")?;
    let scalar = innermost.element_type().ok_or("no element type")?;
    assert_eq!(element.dimensions(), sizes(&[3, 4]).as_slice());
    assert_eq!(innermost.dimensions(), sizes(&[4]).as_slice());
    assert_eq!(scalar, Type::INT);
    assert!(!scalar.is_array());
    assert!(scalar.shared_dimensions().is_none());
    assert_eq!(
        element.element_type().and_then(|ty| ty.shared_dimensions()),
        innermost.shared_dimensions()
    );
    assert_ne!(element.shared_dimensions(), ty.shared_dimensions());
    Ok(())
}

#[test]
fn comparison_and_hashing_follow_the_sizes() -> TestResult {
    let shared = Type::INT
        .with_dimensions(&sizes(&[5, 2, 3]))
        .element_type()
        .ok_or("no element type")?;
    let separate = Type::INT.with_dimensions(&sizes(&[2, 3]));
    let other = Type::INT.with_dimensions(&sizes(&[2, 4]));
    let state = RandomState::new();
    assert_eq!(shared, separate);
    assert_ne!(shared.shared_dimensions(), separate.shared_dimensions());
    assert_eq!(hash_of(&state, &shared), hash_of(&state, &separate));
    assert_eq!(
        hash_of(&state, &shared),
        hash_of(&state, (Type::INT.kind, sizes(&[2, 3]).as_slice()))
    );
    assert_ne!(shared, other);
    assert_eq!(shared.cmp(&other), sizes(&[2, 3]).cmp(&sizes(&[2, 4])));
    assert_eq!(shared.cmp(&separate), core::cmp::Ordering::Equal);
    assert!(Type::INT < Type::INT.array_of(ArraySize::Sized(1)));
    Ok(())
}

#[test]
fn changing_a_size_leaves_other_types_alone() -> TestResult {
    let ty = Type::FLOAT.with_dimensions(&[ArraySize::Unsized, ArraySize::Sized(2)]);
    let mut sized = ty.clone();
    sized.set_outer_size(ArraySize::Sized(7));
    assert_eq!(sized.dimensions(), sizes(&[7, 2]).as_slice());
    assert_eq!(ty.dimensions(), &[ArraySize::Unsized, ArraySize::Sized(2)]);
    let unchanged = sized.shared_dimensions();
    sized.set_outer_size(ArraySize::Sized(7));
    sized.set_dimension(5, ArraySize::Sized(1));
    assert_eq!(sized.shared_dimensions(), unchanged);
    sized.set_dimensions(&[]);
    assert_eq!(sized, Type::FLOAT);
    Ok(())
}
