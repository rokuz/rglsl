use std::fs;
use std::path::Path;

use rglsl_fuzz::decisions::{decode, SEEDS};
use rglsl_fuzz::Random;

type TestResult = Result<(), Box<dyn std::error::Error>>;

#[test]
fn seeds_are_the_samples_without_a_preprocessor() -> TestResult {
    let directory = Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/data/450");
    let mut names: Vec<String> = fs::read_dir(directory)?
        .map(|entry| entry.map(|entry| entry.path()))
        .collect::<Result<Vec<_>, _>>()?
        .into_iter()
        .filter(|path| {
            path.extension()
                .is_some_and(|extension| extension == "frag")
        })
        .filter_map(|path| {
            path.file_stem()
                .and_then(|stem| stem.to_str())
                .map(str::to_owned)
        })
        .filter(|name| name != "matrices_many_loops")
        .collect();
    names.sort();
    let seeds: Vec<String> = SEEDS.iter().map(|seed| seed.name.to_owned()).collect();
    assert_eq!(seeds, names);
    for seed in &SEEDS {
        seed.job()?;
        seed.donor()?;
    }
    Ok(())
}

#[test]
fn decisions_come_from_the_bytes_first() {
    let mut random = Random::from_decisions(&[3, 1, 0, 0xff, 0x10, 0x20]);
    assert_eq!(random.next_int(10), 3);
    assert!(random.next_bool());
    assert!(!random.next_bool());
    assert_eq!(random.next_below(1 << 16), 0x10ff);
    assert_eq!(random.decisions_left(), 1);
    assert_eq!(random.next_index(7), 0x20 % 7);
    assert_eq!(random.decisions_left(), 0);
    let mut again = Random::from_decisions(&[3, 1, 0, 0xff, 0x10, 0x20]);
    again.next_below(1 << 48);
    assert_eq!(random.next_u64(), again.next_u64());
}

#[test]
fn exhausted_decisions_fall_back_to_a_generator_seeded_by_the_input() {
    let mut zeros = Random::from_decisions(&[0; 4]);
    let mut other = Random::from_decisions(&[0; 5]);
    for _ in 0..8 {
        zeros.next_int(3);
        other.next_int(3);
    }
    let first: Vec<u64> = (0..4).map(|_| zeros.next_u64()).collect();
    let second: Vec<u64> = (0..4).map(|_| other.next_u64()).collect();
    assert_ne!(first, second);
    assert!(first.iter().any(|value| *value != 0));
}

#[test]
fn children_take_a_share_of_the_decisions() {
    let bytes: Vec<u8> = core::iter::once(127).chain(1..=254).collect();
    let mut parent = Random::from_decisions(&bytes);
    let mut child = parent.spawn_child();
    assert_eq!(child.decisions_left(), 127);
    assert_eq!(parent.decisions_left(), 127);
    assert_eq!(child.next_int(256), 1);
    assert_eq!(parent.next_int(256), 128);
    let mut seeded = Random::new(9);
    let mut seeded_child = seeded.spawn_child();
    assert_eq!(seeded_child.decisions_left(), 0);
    seeded_child.next_u64();
}

#[test]
fn decoding_is_deterministic_and_steered_by_the_bytes() -> TestResult {
    let inputs: [&[u8]; 4] = [&[], &[0], &[1, 2, 3, 4, 5, 6, 7, 8], &[42; 300]];
    let mut seeds = Vec::new();
    for input in inputs {
        let first = decode(input)?;
        let second = decode(input)?;
        assert_eq!(first, second);
        assert!(!first.variant.shaders.is_empty());
        seeds.push(first.seed);
    }
    assert_eq!(seeds.get(1), SEEDS.first().map(|seed| &seed.name));
    assert_eq!(seeds.get(2), SEEDS.get(1).map(|seed| &seed.name));
    Ok(())
}
