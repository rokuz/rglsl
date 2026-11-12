use crate::donate::Donor;
use crate::error::Error;
use crate::generate::{generate_variant_with_donors, prepare_reference, GeneratorOptions};
use crate::job::ShaderJob;
use crate::random::Random;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Seed {
    pub name: &'static str,
    pub json: &'static str,
    pub source: &'static str,
}

impl Seed {
    pub const EXTENSION: &'static str = "frag";

    pub fn job(&self) -> Result<ShaderJob, Error> {
        ShaderJob::parse(
            self.json,
            &[(String::from(Self::EXTENSION), String::from(self.source))],
        )
    }

    pub fn donor(&self) -> Result<Donor, Error> {
        Donor::parse(self.name, Self::EXTENSION, self.source)
    }
}

macro_rules! seed {
    ($name:literal) => {
        Seed {
            name: $name,
            json: include_str!(concat!("../tests/data/450/", $name, ".json")),
            source: include_str!(concat!("../tests/data/450/", $name, ".frag")),
        }
    };
}

pub const SEEDS: [Seed; 43] = [
    seed!("binarysearch_bw"),
    seed!("binarysearch_tree"),
    seed!("bubblesort_flag_intfunctions"),
    seed!("colorgrid_modulo"),
    seed!("colorgrid_modulo_intfunctions"),
    seed!("householder_lattice"),
    seed!("linear_algebra_chessboard"),
    seed!("mandelbrot_fixed_point"),
    seed!("mandelbrot_zoom"),
    seed!("mandelbrot_zoom_intfunctions"),
    seed!("matrices_smart_loops"),
    seed!("mergesort_mosaic"),
    seed!("muller"),
    seed!("prefix_sum"),
    seed!("prefix_sum_checkers"),
    seed!("prefix_sum_intfunctions"),
    seed!("quicksort_palette"),
    seed!("selection_sort_struct"),
    seed!("squares"),
    seed!("squares_intfunctions"),
    seed!("stable_bifurcation"),
    seed!("stable_binarysearch_tree"),
    seed!("stable_bubblesort_flag"),
    seed!("stable_collatz"),
    seed!("stable_colorgrid_modulo"),
    seed!("stable_logicops"),
    seed!("stable_maze"),
    seed!("stable_mergesort"),
    seed!("stable_orbit"),
    seed!("stable_pillars"),
    seed!("stable_quicksort"),
    seed!("stable_rects"),
    seed!("stable_sampler_boxfilter"),
    seed!("stable_sampler_loop"),
    seed!("stable_sampler_minimal"),
    seed!("stable_sampler_mip"),
    seed!("stable_sampler_polar_simple"),
    seed!("stable_sampler_polar_warp"),
    seed!("stable_sampler_reuse"),
    seed!("stable_sampler_trace"),
    seed!("stable_triangle"),
    seed!("trigonometric_strip"),
    seed!("truthtable"),
];

pub const MAX_DONORS: u32 = 3;

#[derive(Debug, Clone, PartialEq)]
pub struct Decoded {
    pub seed: &'static str,
    pub donors: Vec<&'static str>,
    pub options: GeneratorOptions,
    pub link: bool,
    pub reference: ShaderJob,
    pub variant: ShaderJob,
}

pub fn decode(data: &[u8]) -> Result<Decoded, Error> {
    let mut random = Random::from_decisions(data);
    let seed = SEEDS
        .get(random.next_index(SEEDS.len()))
        .ok_or_else(|| Error::Generation(String::from("no seed shader")))?;
    let small = random.next_int(4) != 0;
    let add_injection_switch = random.next_int(8) != 0;
    let min_nodes = 300 + random.next_int(1200);
    let max_nodes = min_nodes + 200 + random.next_int(2800);
    let options = GeneratorOptions {
        small,
        add_injection_switch,
        min_nodes,
        max_nodes,
        ..GeneratorOptions::default()
    };
    let link = random.next_bool();
    let mut donors = Vec::new();
    let mut donor_names = Vec::new();
    for _ in 0..random.next_int(MAX_DONORS + 1) {
        let Some(donor) = SEEDS.get(random.next_index(SEEDS.len())) else {
            continue;
        };
        if donor_names.contains(&donor.name) {
            continue;
        }
        donor_names.push(donor.name);
        donors.push(donor.donor()?);
    }
    let job = seed.job()?;
    let reference = prepare_reference(&job, 0, true)?;
    let variant = generate_variant_with_donors(&job, &options, &donors, &mut random)?;
    Ok(Decoded {
        seed: seed.name,
        donors: donor_names,
        options,
        link,
        reference,
        variant,
    })
}
