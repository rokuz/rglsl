use rglsl_ast::TranslationUnit;
use rglsl_sema::Analysis;

use crate::donate::{self, Donor};
use crate::fuzzer::GenerationParams;
use crate::random::Random;
use crate::{
    barrier, identity, jump, outline, output_write, split_loop, structify, switchify, vectorize,
    wrap,
};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Probabilities {
    pub substitute_free_variable: u32,
    pub donate_dead_code_at_statement: u32,
    pub donate_live_code_at_statement: u32,
    pub inject_jump_at_statement: u32,
    pub wrap_statement_in_conditional: u32,
    pub mutate_point: u32,
    pub vectorize_statements: u32,
    pub split_loops: u32,
    pub structify: u32,
    pub outline: u32,
    pub add_live_frag_color_writes: u32,
    pub add_dead_frag_color_writes: u32,
    pub switchify: u32,
    pub inject_dead_barrier_at_statement: u32,
}

fn random_probability(random: &mut Random, min: u32, max: u32) -> u32 {
    random.next_int(max - min) + min
}

impl Probabilities {
    pub fn random_multi_pass(random: &mut Random) -> Self {
        Self {
            substitute_free_variable: random_probability(random, 0, 100),
            donate_dead_code_at_statement: random_probability(random, 2, 10),
            donate_live_code_at_statement: random_probability(random, 2, 10),
            inject_jump_at_statement: random_probability(random, 2, 15),
            wrap_statement_in_conditional: random_probability(random, 2, 15),
            mutate_point: random_probability(random, 2, 8),
            vectorize_statements: random_probability(random, 2, 30),
            split_loops: random_probability(random, 2, 15),
            structify: random_probability(random, 2, 8),
            outline: random_probability(random, 2, 15),
            add_live_frag_color_writes: random_probability(random, 2, 10),
            add_dead_frag_color_writes: random_probability(random, 2, 10),
            switchify: random_probability(random, 2, 10),
            inject_dead_barrier_at_statement: random_probability(random, 2, 20),
        }
    }

    pub const fn always() -> Self {
        Self {
            substitute_free_variable: 100,
            donate_dead_code_at_statement: 100,
            donate_live_code_at_statement: 100,
            inject_jump_at_statement: 100,
            wrap_statement_in_conditional: 100,
            mutate_point: 100,
            vectorize_statements: 100,
            split_loops: 100,
            structify: 100,
            outline: 100,
            add_live_frag_color_writes: 100,
            add_dead_frag_color_writes: 100,
            switchify: 100,
            inject_dead_barrier_at_statement: 100,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Transformation {
    DonateDeadCode,
    DonateLiveCode,
    Identity,
    AddJump,
    OutlineStatement,
    SplitForLoop,
    Structification,
    AddSwitch,
    Vectorize,
    AddWrappingConditional,
    AddDeadOutputWrite,
    AddLiveOutputWrite,
    AddDeadBarrier,
}

impl Transformation {
    pub const ALL: [Self; 13] = [
        Self::DonateDeadCode,
        Self::DonateLiveCode,
        Self::Identity,
        Self::AddJump,
        Self::OutlineStatement,
        Self::SplitForLoop,
        Self::Structification,
        Self::AddSwitch,
        Self::Vectorize,
        Self::AddWrappingConditional,
        Self::AddDeadOutputWrite,
        Self::AddLiveOutputWrite,
        Self::AddDeadBarrier,
    ];

    pub const fn name(self) -> &'static str {
        match self {
            Self::DonateDeadCode => donate::DEAD_NAME,
            Self::DonateLiveCode => donate::LIVE_NAME,
            Self::Identity => identity::NAME,
            Self::AddJump => jump::NAME,
            Self::OutlineStatement => outline::NAME,
            Self::SplitForLoop => split_loop::NAME,
            Self::Structification => structify::NAME,
            Self::AddSwitch => switchify::NAME,
            Self::Vectorize => vectorize::NAME,
            Self::AddWrappingConditional => wrap::NAME,
            Self::AddDeadOutputWrite => output_write::DEAD_NAME,
            Self::AddLiveOutputWrite => output_write::LIVE_NAME,
            Self::AddDeadBarrier => barrier::NAME,
        }
    }

    pub fn from_name(name: &str) -> Option<Self> {
        Self::ALL
            .into_iter()
            .find(|transformation| transformation.name() == name)
    }

    const fn bit(self) -> u16 {
        1 << (self as u16)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct EnabledTransformations(u16);

impl Default for EnabledTransformations {
    fn default() -> Self {
        Self::all()
    }
}

impl EnabledTransformations {
    pub const fn all() -> Self {
        Self((1 << 13) - 1)
    }

    pub const fn none() -> Self {
        Self(0)
    }

    pub const fn with(self, transformation: Transformation) -> Self {
        Self(self.0 | transformation.bit())
    }

    pub const fn without(self, transformation: Transformation) -> Self {
        Self(self.0 & !transformation.bit())
    }

    pub const fn contains(self, transformation: Transformation) -> bool {
        self.0 & transformation.bit() != 0
    }

    pub fn parse_list(list: &str) -> Result<Vec<Transformation>, String> {
        list.split(',')
            .filter(|name| !name.trim().is_empty())
            .map(|name| {
                Transformation::from_name(name.trim())
                    .ok_or_else(|| format!("unknown transformation {name}"))
            })
            .collect()
    }
}

#[derive(Debug)]
pub struct PassInput<'a> {
    pub unit: &'a TranslationUnit,
    pub analysis: &'a Analysis,
    pub probabilities: &'a Probabilities,
    pub params: GenerationParams,
    pub donors: &'a [Donor],
}

pub fn apply(
    transformation: Transformation,
    input: &PassInput<'_>,
    random: &mut Random,
) -> Option<TranslationUnit> {
    match transformation {
        Transformation::DonateDeadCode => donate::apply(input, random, false),
        Transformation::DonateLiveCode => donate::apply(input, random, true),
        Transformation::Identity => identity::apply(
            input.unit,
            input.analysis,
            input.probabilities.mutate_point,
            input.params,
            random,
        ),
        Transformation::AddJump => jump::apply(input, random),
        Transformation::OutlineStatement => outline::apply(input, random),
        Transformation::SplitForLoop => split_loop::apply(input, random),
        Transformation::Structification => structify::apply(input, random),
        Transformation::AddSwitch => switchify::apply(input, random),
        Transformation::Vectorize => vectorize::apply(input, random),
        Transformation::AddWrappingConditional => wrap::apply(input, random),
        Transformation::AddDeadOutputWrite => output_write::apply(input, random, false),
        Transformation::AddLiveOutputWrite => output_write::apply(input, random, true),
        Transformation::AddDeadBarrier => barrier::apply(input, random),
    }
}
