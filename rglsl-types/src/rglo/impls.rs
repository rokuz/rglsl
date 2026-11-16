use alloc::boxed::Box;
use alloc::format;
use alloc::string::String;
use alloc::vec::Vec;
use core::hash::{BuildHasher, Hash};
use core::num::NonZeroU32;

use super::decode::{Decode, Error, Input, element, no_more_elements};
use super::encode::{Encode, Encoder};

macro_rules! unsigned {
    ($($type:ty),+) => {
        $(
            impl Encode for $type {
                fn encode(&self, out: &mut Encoder) {
                    out.unsigned(u64::from(*self));
                }
            }

            impl Decode for $type {
                fn decode(input: &mut Input<'_>) -> Result<Self, Error> {
                    input.unsigned(stringify!($type))
                }
            }
        )+
    };
}

macro_rules! signed {
    ($($type:ty),+) => {
        $(
            impl Encode for $type {
                fn encode(&self, out: &mut Encoder) {
                    out.signed(i64::from(*self));
                }
            }

            impl Decode for $type {
                fn decode(input: &mut Input<'_>) -> Result<Self, Error> {
                    input.signed(stringify!($type))
                }
            }
        )+
    };
}

unsigned!(u8, u16, u32, u64);
signed!(i8, i16, i32, i64);

impl Encode for f32 {
    fn encode(&self, out: &mut Encoder) {
        out.float32(*self);
    }
}

impl Decode for f32 {
    fn decode(input: &mut Input<'_>) -> Result<Self, Error> {
        input.float("f32")
    }
}

impl Encode for f64 {
    fn encode(&self, out: &mut Encoder) {
        out.float64(*self);
    }
}

impl Decode for f64 {
    fn decode(input: &mut Input<'_>) -> Result<Self, Error> {
        input.float("f64")
    }
}

impl Encode for half::f16 {
    fn encode(&self, out: &mut Encoder) {
        out.token("(");
        out.unsigned(u64::from(self.to_bits()));
        out.token(")");
    }
}

impl Decode for half::f16 {
    fn decode(input: &mut Input<'_>) -> Result<Self, Error> {
        input.expect(b'(')?;
        let bits = input.unsigned("f16")?;
        input.expect(b')')?;
        Ok(Self::from_bits(bits))
    }
}

impl Encode for NonZeroU32 {
    fn encode(&self, out: &mut Encoder) {
        out.unsigned(u64::from(self.get()));
    }
}

impl Decode for NonZeroU32 {
    fn decode(input: &mut Input<'_>) -> Result<Self, Error> {
        let start = input.clone();
        let value: u32 = input.unsigned("NonZeroU32")?;
        Self::new(value).ok_or_else(|| start.expected("a nonzero integer of type `NonZeroU32`"))
    }
}

impl Encode for bool {
    fn encode(&self, out: &mut Encoder) {
        out.boolean(*self);
    }
}

impl Decode for bool {
    fn decode(input: &mut Input<'_>) -> Result<Self, Error> {
        input.boolean()
    }
}

impl Encode for String {
    fn encode(&self, out: &mut Encoder) {
        out.string(self);
    }
}

impl Decode for String {
    fn decode(input: &mut Input<'_>) -> Result<Self, Error> {
        input.string()
    }
}

impl<T: Encode> Encode for Option<T> {
    fn encode(&self, out: &mut Encoder) {
        match *self {
            None => out.token("None"),
            Some(ref value) => {
                out.token("Some(");
                value.encode(out);
                out.token(")");
            }
        }
    }
}

impl<T: Decode> Decode for Option<T> {
    fn decode(input: &mut Input<'_>) -> Result<Self, Error> {
        match input.identifier()? {
            "None" => Ok(None),
            "Some" => {
                input.expect(b'(')?;
                let value = T::decode(input)?;
                input.expect(b')')?;
                Ok(Some(value))
            }
            other => Err(input.unknown_variant("Option", other, &["None", "Some"])),
        }
    }
}

impl<T: Encode> Encode for Box<T> {
    fn encode(&self, out: &mut Encoder) {
        (**self).encode(out);
    }
}

impl<T: Decode> Decode for Box<T> {
    fn decode(input: &mut Input<'_>) -> Result<Self, Error> {
        T::decode(input).map(Box::new)
    }
}

fn elements<T: Decode>(
    input: &mut Input<'_>,
    open: u8,
    close: u8,
    mut items: Vec<T>,
) -> Result<Vec<T>, Error> {
    input.expect(open)?;
    let mut more = false;
    while input.next_element(&mut more, close)? {
        items.push(T::decode(input)?);
    }
    Ok(items)
}

impl<T: Encode> Encode for Vec<T> {
    fn encode(&self, out: &mut Encoder) {
        out.sequence("[", "]", self);
    }
}

impl<T: Decode> Decode for Vec<T> {
    fn decode(input: &mut Input<'_>) -> Result<Self, Error> {
        elements(input, b'[', b']', Vec::new())
    }
}

impl<T: Encode, const N: usize> Encode for [T; N] {
    fn encode(&self, out: &mut Encoder) {
        out.sequence("(", ")", self);
    }
}

impl<T: Decode, const N: usize> Decode for [T; N] {
    fn decode(input: &mut Input<'_>) -> Result<Self, Error> {
        let items = elements(input, b'(', b')', Vec::with_capacity(N))?;
        <[T; N]>::try_from(items).map_err(|_| input.length("array", N))
    }
}

macro_rules! tuple {
    ($count:literal; $first:ident $first_index:tt $(, $name:ident $index:tt)*) => {
        impl<$first: Encode $(, $name: Encode)*> Encode for ($first, $($name,)*) {
            fn encode(&self, out: &mut Encoder) {
                out.token("(");
                self.$first_index.encode(out);
                $(
                    out.token(",");
                    self.$index.encode(out);
                )*
                out.token(")");
            }
        }

        impl<$first: Decode $(, $name: Decode)*> Decode for ($first, $($name,)*) {
            fn decode(input: &mut Input<'_>) -> Result<Self, Error> {
                input.expect(b'(')?;
                let mut more = false;
                let value = (
                    element::<$first>(input, &mut more, "tuple", $count)?,
                    $(element::<$name>(input, &mut more, "tuple", $count)?,)*
                );
                no_more_elements(input, &mut more, "tuple", $count)?;
                Ok(value)
            }
        }
    };
}

tuple!(2; A 0, B 1);
tuple!(3; A 0, B 1, C 2);
tuple!(4; A 0, B 1, C 2, D 3);
tuple!(5; A 0, B 1, C 2, D 3, E 4);

impl<K: Encode, V: Encode, S> Encode for indexmap::IndexMap<K, V, S> {
    fn encode(&self, out: &mut Encoder) {
        out.token("{");
        for (index, (key, value)) in self.iter().enumerate() {
            if index > 0 {
                out.token(",");
            }
            key.encode(out);
            out.token(":");
            value.encode(out);
        }
        out.token("}");
    }
}

impl<K, V, S> Decode for indexmap::IndexMap<K, V, S>
where
    K: Decode + Hash + Eq,
    V: Decode,
    S: BuildHasher + Default,
{
    fn decode(input: &mut Input<'_>) -> Result<Self, Error> {
        input.expect(b'{')?;
        let mut map = Self::with_hasher(S::default());
        let mut more = false;
        while input.next_element(&mut more, b'}')? {
            let key = K::decode(input)?;
            input.expect(b':')?;
            let value = V::decode(input)?;
            if map.insert(key, value).is_some() {
                return Err(input.error("duplicate key in a map"));
            }
        }
        Ok(map)
    }
}

pub fn encode_flags<B>(flags: &B, out: &mut Encoder)
where
    B: bitflags::Flags,
    B::Bits: bitflags::parser::WriteHex,
{
    let mut names = String::new();
    let _ = bitflags::parser::to_writer(flags, &mut names);
    out.token("(");
    out.string(&names);
    out.token(")");
}

pub fn decode_flags<B>(input: &mut Input<'_>, owner: &str) -> Result<B, Error>
where
    B: bitflags::Flags,
    B::Bits: bitflags::parser::ParseHex,
{
    input.expect(b'(')?;
    let names = input.string()?;
    let flags = bitflags::parser::from_str::<B>(&names)
        .map_err(|error| input.error(format!("invalid flags of `{owner}`: {error}")))?;
    input.expect(b')')?;
    Ok(flags)
}
