macro_rules! parameters {
    (@ [$($done:expr),*]) => {
        &[$($done),*]
    };
    (@ [$($done:expr),*] out $word:ident $([$size:literal])? $(, $($rest:tt)*)?) => {
        parameters!(@ [$($done,)* $crate::builtins::table::parameter(
            $crate::builtins::table::words::$word, $crate::scope::Direction::Out, [$($size)?]
        )] $($($rest)*)?)
    };
    (@ [$($done:expr),*] inout $word:ident $([$size:literal])? $(, $($rest:tt)*)?) => {
        parameters!(@ [$($done,)* $crate::builtins::table::parameter(
            $crate::builtins::table::words::$word, $crate::scope::Direction::Inout, [$($size)?]
        )] $($($rest)*)?)
    };
    (@ [$($done:expr),*] $word:ident $([$size:literal])? $(, $($rest:tt)*)?) => {
        parameters!(@ [$($done,)* $crate::builtins::table::parameter(
            $crate::builtins::table::words::$word, $crate::scope::Direction::In, [$($size)?]
        )] $($($rest)*)?)
    };
    ($($tokens:tt)*) => {
        parameters!(@ [] $($tokens)*)
    };
}

macro_rules! builtins {
    ($(
        $name:literal: $kind:expr => [$($result:ident($($parameters:tt)*)),* $(,)?]
        $({ $($field:ident: $value:expr),* $(,)? })?
    )*) => {
        &[$(
            $crate::builtins::table::BuiltinFunction {
                name: $name,
                kind: $kind,
                signatures: &[$($crate::builtins::table::Signature {
                    result: $crate::builtins::table::words::$result,
                    parameters: parameters!($($parameters)*),
                }),*],
                $($($field: $value,)*)?
                ..$crate::builtins::table::BuiltinFunction::DEFAULT
            }
        ),*]
    };
}

mod pure;
mod ray;
mod subgroup;
mod texture;
mod words;

use alloc::string::String;
use alloc::vec::Vec;

use rglsl_types::extension::Extension;

use super::kind::BuiltinKind;
use super::{ALL_STAGES, Footprints, Prototype};
use crate::scope::Direction;
use crate::types::{ArraySize, Scalar, Type, TypeKind};

bitflags::bitflags! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
    pub struct BuiltinFlags: u16 {
        const SUBGROUP_OPERATION = 1;
        const FOLD = 1 << 1;
        const PRECISE_ARITHMETIC = 1 << 2;
        const HIGHP_OPERANDS = 1 << 3;
        const HIGHP_RESULT = 1 << 4;
        const COOPERATIVE_VECTOR = 1 << 5;
        const NO_DOUBLE_LONG_VECTOR = 1 << 6;
        const LOWP_RESULT = 1 << 7;
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum Size {
    N,
    Columns,
    Rows,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum Shape {
    Square,
    ColumnsByRows,
    RowsByColumns,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum Word {
    Value,
    Gen(Scalar),
    Vector(Scalar, Size),
    Matrix(Scalar, Shape),
    Fixed(TypeKind),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) struct Parameter {
    word: Word,
    direction: Direction,
    array: Option<u32>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) struct Signature {
    pub(crate) result: Word,
    pub(crate) parameters: &'static [Parameter],
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum Floats {
    Single,
    Halves,
    DoublesAndHalves,
}

#[derive(Debug, Clone, Copy)]
pub struct BuiltinFunction {
    pub name: &'static str,
    pub kind: BuiltinKind,
    pub requires: &'static [Extension],
    pub flags: BuiltinFlags,
    pub precision_operands: Option<usize>,
    pub(crate) stages: u16,
    pub(crate) since: u32,
    pub(crate) floats: Floats,
    pub(crate) values: &'static [Scalar],
    pub(crate) signatures: &'static [Signature],
    pub(crate) generate: Option<Generator>,
}

pub(crate) type Generator = fn(&mut Emitter<'_>);

pub(crate) struct Emitter<'a> {
    row: &'static BuiltinFunction,
    footprints: &'a Footprints,
    prototypes: &'a mut Vec<Prototype>,
}

impl Emitter<'_> {
    pub(crate) const fn kind(&self) -> BuiltinKind {
        self.row.kind
    }

    pub(crate) const fn footprints(&self) -> &Footprints {
        self.footprints
    }

    pub(crate) fn push(&mut self, result: Type, parameters: Vec<(Type, Direction)>, stages: u16) {
        self.prototypes.push(Prototype {
            name: String::from(self.row.name),
            result,
            parameters,
            stages,
            row: Some(self.row),
        });
    }
}

impl BuiltinFunction {
    pub(crate) const DEFAULT: Self = Self {
        name: "",
        kind: BuiltinKind::Named,
        requires: &[],
        flags: BuiltinFlags::empty(),
        precision_operands: None,
        stages: ALL_STAGES,
        since: 450,
        floats: Floats::Single,
        values: &[],
        signatures: &[],
        generate: None,
    };

    pub const fn has(&self, flags: BuiltinFlags) -> bool {
        self.flags.contains(flags)
    }
}

pub(crate) const fn parameter<const N: usize>(
    word: Word,
    direction: Direction,
    size: [u32; N],
) -> Parameter {
    let array = match size.first() {
        Some(&size) => Some(size),
        None => None,
    };
    Parameter {
        word,
        direction,
        array,
    }
}

pub(super) const FAMILIES: &[&[BuiltinFunction]] = &[
    pure::FUNCTIONS,
    ray::FUNCTIONS,
    texture::FUNCTIONS,
    subgroup::FUNCTIONS,
];

#[derive(Clone, Default)]
struct Sizes {
    value: Option<Type>,
    generic: u8,
    size: u8,
    columns: u8,
    rows: u8,
}

fn concrete(word: Word, sizes: &Sizes) -> Option<Type> {
    let size = |size: Size| match size {
        Size::N => sizes.size,
        Size::Columns => sizes.columns,
        Size::Rows => sizes.rows,
    };
    Some(match word {
        Word::Value => sizes.value.clone()?,
        Word::Gen(scalar) => Type::vector(scalar, sizes.generic),
        Word::Vector(scalar, length) => Type::vector(scalar, size(length)),
        Word::Matrix(scalar, Shape::Square) => Type::matrix(scalar, sizes.size, sizes.size),
        Word::Matrix(scalar, Shape::ColumnsByRows) => {
            Type::matrix(scalar, sizes.columns, sizes.rows)
        }
        Word::Matrix(scalar, Shape::RowsByColumns) => {
            Type::matrix(scalar, sizes.rows, sizes.columns)
        }
        Word::Fixed(kind) => Type::new(kind),
    })
}

fn signature_words(signature: &Signature) -> impl Iterator<Item = Word> + '_ {
    core::iter::once(signature.result)
        .chain(signature.parameters.iter().map(|parameter| parameter.word))
}

fn variant(word: Word, target: Scalar) -> Word {
    let replaced = |scalar: Scalar| {
        if scalar == Scalar::Float {
            target
        } else {
            scalar
        }
    };
    match word {
        Word::Gen(scalar) => Word::Gen(replaced(scalar)),
        Word::Vector(scalar, size) => Word::Vector(replaced(scalar), size),
        Word::Matrix(scalar, shape) => Word::Matrix(replaced(scalar), shape),
        Word::Fixed(TypeKind::Scalar(scalar)) => Word::Fixed(TypeKind::Scalar(replaced(scalar))),
        Word::Fixed(TypeKind::Vector { scalar, size }) => Word::Fixed(TypeKind::Vector {
            scalar: replaced(scalar),
            size,
        }),
        Word::Fixed(TypeKind::Matrix {
            scalar,
            columns,
            rows,
        }) => Word::Fixed(TypeKind::Matrix {
            scalar: replaced(scalar),
            columns,
            rows,
        }),
        other @ (Word::Value | Word::Fixed(_)) => other,
    }
}

impl BuiltinFunction {
    pub(super) fn expand(
        &'static self,
        version: u32,
        footprints: &Footprints,
        prototypes: &mut Vec<Prototype>,
    ) {
        if version < self.since {
            return;
        }
        if let Some(generate) = self.generate {
            generate(&mut Emitter {
                row: self,
                footprints,
                prototypes,
            });
        }
        let targets: &[Scalar] = match self.floats {
            Floats::Single => &[],
            Floats::Halves => &[Scalar::Float16],
            Floats::DoublesAndHalves => &[Scalar::Double, Scalar::Float16],
        };
        for signature in self.signatures {
            self.expand_signature(signature, None, prototypes);
            for &target in targets {
                if signature_words(signature).any(|word| variant(word, target) != word) {
                    self.expand_signature(signature, Some(target), prototypes);
                }
            }
        }
    }

    fn expand_signature(
        &'static self,
        signature: &Signature,
        target: Option<Scalar>,
        prototypes: &mut Vec<Prototype>,
    ) {
        let word = |word: Word| target.map_or(word, |target| variant(word, target));
        let uses = |test: &dyn Fn(Word) -> bool| signature_words(signature).any(test);
        let range = |used: bool, low: u8| if used { low..=4 } else { 0..=0 };
        let generic = uses(&|word| matches!(word, Word::Gen(_)));
        let size = uses(&|word| {
            matches!(
                word,
                Word::Vector(_, Size::N) | Word::Matrix(_, Shape::Square)
            )
        });
        let shape = uses(&|word| {
            matches!(
                word,
                Word::Vector(_, Size::Columns | Size::Rows)
                    | Word::Matrix(_, Shape::ColumnsByRows | Shape::RowsByColumns)
            )
        });
        let scalars: Vec<Option<Scalar>> = if uses(&|word| word == Word::Value) {
            self.values.iter().copied().map(Some).collect()
        } else {
            alloc::vec![None]
        };
        for value in scalars {
            for value_size in range(value.is_some(), 1) {
                for generic in range(generic, 1) {
                    for size in range(size, 2) {
                        for columns in range(shape, 2) {
                            for rows in range(shape, 2) {
                                let sizes = Sizes {
                                    value: value.map(|scalar| Type::vector(scalar, value_size)),
                                    generic,
                                    size,
                                    columns,
                                    rows,
                                };
                                self.push(signature, &sizes, &word, prototypes);
                            }
                        }
                    }
                }
            }
        }
    }

    fn push(
        &'static self,
        signature: &Signature,
        sizes: &Sizes,
        word: &dyn Fn(Word) -> Word,
        prototypes: &mut Vec<Prototype>,
    ) {
        let Some(result) = concrete(word(signature.result), sizes) else {
            return;
        };
        let mut parameters = Vec::with_capacity(signature.parameters.len());
        for parameter in signature.parameters {
            let Some(mut ty) = concrete(word(parameter.word), sizes) else {
                return;
            };
            if let Some(size) = parameter.array {
                ty = ty.array_of(ArraySize::Sized(size));
            }
            parameters.push((ty, parameter.direction));
        }
        prototypes.push(Prototype {
            name: String::from(self.name),
            result,
            parameters,
            stages: self.stages,
            row: Some(self),
        });
    }
}
