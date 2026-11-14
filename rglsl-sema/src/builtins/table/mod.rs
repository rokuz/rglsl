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
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum Word {
    Value,
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

#[derive(Debug, Clone, Copy)]
pub struct BuiltinFunction {
    pub name: &'static str,
    pub kind: BuiltinKind,
    pub requires: &'static [Extension],
    pub flags: BuiltinFlags,
    pub(crate) stages: u16,
    pub(crate) since: u32,
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
        stages: ALL_STAGES,
        since: 450,
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

pub(super) const FAMILIES: &[&[BuiltinFunction]] =
    &[ray::FUNCTIONS, texture::FUNCTIONS, subgroup::FUNCTIONS];

fn concrete(word: Word, value: Option<&Type>) -> Option<Type> {
    match word {
        Word::Value => value.cloned(),
        Word::Fixed(kind) => Some(Type::new(kind)),
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
        for signature in self.signatures {
            let generic = core::iter::once(signature.result)
                .chain(signature.parameters.iter().map(|parameter| parameter.word))
                .any(|word| word == Word::Value);
            if !generic {
                self.push(signature, None, prototypes);
                continue;
            }
            for &scalar in self.values {
                for size in 1..=4 {
                    self.push(signature, Some(&Type::vector(scalar, size)), prototypes);
                }
            }
        }
    }

    fn push(
        &'static self,
        signature: &Signature,
        value: Option<&Type>,
        prototypes: &mut Vec<Prototype>,
    ) {
        let Some(result) = concrete(signature.result, value) else {
            return;
        };
        let mut parameters = Vec::with_capacity(signature.parameters.len());
        for parameter in signature.parameters {
            let Some(mut ty) = concrete(parameter.word, value) else {
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
