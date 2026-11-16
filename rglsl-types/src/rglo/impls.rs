use alloc::boxed::Box;
use alloc::format;
use alloc::string::String;
use alloc::vec::Vec;
use core::hash::{BuildHasher, Hash};
use core::num::NonZeroU32;

use super::decode::{Child, Decode, Decoded, Error, Input, Record, Step, built, start, wrap};
use super::encode::{Encode, Encoder, write_string};

macro_rules! unsigned {
    ($($type:ty),+) => {
        $(
            impl Encode for $type {
                fn encode<'a>(&'a self, out: &mut Encoder<'a>) {
                    out.unsigned(u64::from(*self));
                }
            }

            impl Decode for $type {
                fn decode(input: &mut Input<'_>) -> Result<Decoded<Self>, Error> {
                    input.unsigned(stringify!($type)).map(Decoded::Value)
                }
            }
        )+
    };
}

macro_rules! signed {
    ($($type:ty),+) => {
        $(
            impl Encode for $type {
                fn encode<'a>(&'a self, out: &mut Encoder<'a>) {
                    out.signed(i64::from(*self));
                }
            }

            impl Decode for $type {
                fn decode(input: &mut Input<'_>) -> Result<Decoded<Self>, Error> {
                    input.signed(stringify!($type)).map(Decoded::Value)
                }
            }
        )+
    };
}

unsigned!(u8, u16, u32, u64);
signed!(i8, i16, i32, i64);

impl Encode for f32 {
    fn encode<'a>(&'a self, out: &mut Encoder<'a>) {
        out.float32(*self);
    }
}

impl Decode for f32 {
    fn decode(input: &mut Input<'_>) -> Result<Decoded<Self>, Error> {
        input.float("f32").map(Decoded::Value)
    }
}

impl Encode for f64 {
    fn encode<'a>(&'a self, out: &mut Encoder<'a>) {
        out.float64(*self);
    }
}

impl Decode for f64 {
    fn decode(input: &mut Input<'_>) -> Result<Decoded<Self>, Error> {
        input.float("f64").map(Decoded::Value)
    }
}

impl Encode for half::f16 {
    fn encode<'a>(&'a self, out: &mut Encoder<'a>) {
        out.token("(");
        out.unsigned(u64::from(self.to_bits()));
        out.token(")");
    }
}

impl Decode for half::f16 {
    fn decode(input: &mut Input<'_>) -> Result<Decoded<Self>, Error> {
        input.expect(b'(')?;
        let bits = input.unsigned("f16")?;
        input.expect(b')')?;
        Ok(Decoded::Value(Self::from_bits(bits)))
    }
}

impl Encode for NonZeroU32 {
    fn encode<'a>(&'a self, out: &mut Encoder<'a>) {
        out.unsigned(u64::from(self.get()));
    }
}

impl Decode for NonZeroU32 {
    fn decode(input: &mut Input<'_>) -> Result<Decoded<Self>, Error> {
        let start = input.clone();
        let value: u32 = input.unsigned("NonZeroU32")?;
        Self::new(value)
            .map(Decoded::Value)
            .ok_or_else(|| start.expected("a nonzero integer of type `NonZeroU32`"))
    }
}

impl Encode for bool {
    fn encode<'a>(&'a self, out: &mut Encoder<'a>) {
        out.boolean(*self);
    }
}

impl Decode for bool {
    fn decode(input: &mut Input<'_>) -> Result<Decoded<Self>, Error> {
        input.boolean().map(Decoded::Value)
    }
}

impl Encode for String {
    fn encode<'a>(&'a self, out: &mut Encoder<'a>) {
        out.string(self);
    }
}

impl Decode for String {
    fn decode(input: &mut Input<'_>) -> Result<Decoded<Self>, Error> {
        input.string().map(Decoded::Value)
    }
}

impl<T: Encode> Encode for Option<T> {
    fn encode<'a>(&'a self, out: &mut Encoder<'a>) {
        match *self {
            None => out.token("None"),
            Some(ref value) => {
                out.token("Some(");
                out.value(value);
                out.token(")");
            }
        }
    }
}

impl<T: Decode> Decode for Option<T> {
    fn decode(input: &mut Input<'_>) -> Result<Decoded<Self>, Error> {
        match input.identifier()? {
            "None" => Ok(Decoded::Value(None)),
            "Some" => {
                input.expect(b'(')?;
                wrap(input, Some, true)
            }
            other => Err(input.unknown_variant("Option", other, &["None", "Some"])),
        }
    }
}

impl<T: Encode> Encode for Box<T> {
    fn encode<'a>(&'a self, out: &mut Encoder<'a>) {
        out.value(&**self);
    }
}

impl<T: Decode> Decode for Box<T> {
    fn decode(input: &mut Input<'_>) -> Result<Decoded<Self>, Error> {
        wrap(input, Box::new, false)
    }
}

struct Sequence<T, V> {
    items: Vec<T>,
    more: bool,
    close: u8,
    finish: fn(Vec<T>, &Input<'_>) -> Result<V, Error>,
}

impl<T: Decode, V: 'static> Record for Sequence<T, V> {
    type Value = V;

    fn step(&mut self, input: &mut Input<'_>) -> Result<Step, Error> {
        while input.next_element(&mut self.more, self.close)? {
            match T::decode(input)? {
                Decoded::Value(value) => self.items.push(value),
                Decoded::Frame(frame) => return Ok(Step::Push(frame)),
            }
        }
        Ok(Step::Done)
    }

    fn accept(&mut self, child: Child, input: &mut Input<'_>) -> Result<(), Error> {
        self.items.push(built::<T>(child, input)?);
        Ok(())
    }

    fn value(self, input: &mut Input<'_>) -> Result<V, Error> {
        (self.finish)(self.items, input)
    }
}

pub fn sequence<T: Decode, V: 'static>(
    input: &mut Input<'_>,
    finish: fn(Vec<T>, &Input<'_>) -> Result<V, Error>,
) -> Result<Decoded<V>, Error> {
    input.expect(b'[')?;
    let record = Sequence {
        items: Vec::new(),
        more: false,
        close: b']',
        finish,
    };
    start(record, input)
}

impl<T: Encode> Encode for Vec<T> {
    fn encode<'a>(&'a self, out: &mut Encoder<'a>) {
        out.sequence("[", "]", self);
    }
}

impl<T: Decode> Decode for Vec<T> {
    fn decode(input: &mut Input<'_>) -> Result<Decoded<Self>, Error> {
        sequence(input, |items, _| Ok(items))
    }
}

impl<T: Encode, const N: usize> Encode for [T; N] {
    fn encode<'a>(&'a self, out: &mut Encoder<'a>) {
        out.sequence("(", ")", self);
    }
}

impl<T: Decode, const N: usize> Decode for [T; N] {
    fn decode(input: &mut Input<'_>) -> Result<Decoded<Self>, Error> {
        input.expect(b'(')?;
        let record = Sequence {
            items: Vec::with_capacity(N),
            more: false,
            close: b')',
            finish: |items: Vec<T>, input: &Input<'_>| {
                <[T; N]>::try_from(items).map_err(|_| input.length("array", N))
            },
        };
        start(record, input)
    }
}

macro_rules! tuple {
    ($record:ident, $count:literal; $first:ident $first_index:tt $(, $name:ident $index:tt)*) => {
        impl<$first: Encode $(, $name: Encode)*> Encode for ($first, $($name,)*) {
            fn encode<'a>(&'a self, out: &mut Encoder<'a>) {
                out.token("(");
                out.value(&self.$first_index);
                $(
                    out.token(",");
                    out.value(&self.$index);
                )*
                out.token(")");
            }
        }

        struct $record<$first $(, $name)*> {
            next: usize,
            more: bool,
            slots: (Option<$first>, $(Option<$name>,)*),
        }

        impl<$first: Decode $(, $name: Decode)*> Record for $record<$first $(, $name)*> {
            type Value = ($first, $($name,)*);

            fn step(&mut self, input: &mut Input<'_>) -> Result<Step, Error> {
                while input.next_element(&mut self.more, b')')? {
                    let index = self.next;
                    self.next += 1;
                    match index {
                        $first_index => match $first::decode(input)? {
                            Decoded::Value(value) => self.slots.$first_index = Some(value),
                            Decoded::Frame(frame) => return Ok(Step::Push(frame)),
                        },
                        $(
                            $index => match $name::decode(input)? {
                                Decoded::Value(value) => self.slots.$index = Some(value),
                                Decoded::Frame(frame) => return Ok(Step::Push(frame)),
                            },
                        )*
                        _ => return Err(input.length("tuple", $count)),
                    }
                }
                Ok(Step::Done)
            }

            fn accept(&mut self, child: Child, input: &mut Input<'_>) -> Result<(), Error> {
                match self.next.checked_sub(1) {
                    Some($first_index) => self.slots.$first_index = Some(built(child, input)?),
                    $(
                        Some($index) => self.slots.$index = Some(built(child, input)?),
                    )*
                    _ => return Err(input.length("tuple", $count)),
                }
                Ok(())
            }

            fn value(self, input: &mut Input<'_>) -> Result<Self::Value, Error> {
                let missing = || input.length("tuple", $count);
                Ok((
                    self.slots.$first_index.ok_or_else(missing)?,
                    $(self.slots.$index.ok_or_else(missing)?,)*
                ))
            }
        }

        impl<$first: Decode $(, $name: Decode)*> Decode for ($first, $($name,)*) {
            fn decode(input: &mut Input<'_>) -> Result<Decoded<Self>, Error> {
                input.expect(b'(')?;
                let record = $record {
                    next: 0,
                    more: false,
                    slots: (None, $(None::<$name>,)*),
                };
                start(record, input)
            }
        }
    };
}

tuple!(Tuple2, 2; A 0, B 1);
tuple!(Tuple3, 3; A 0, B 1, C 2);
tuple!(Tuple4, 4; A 0, B 1, C 2, D 3);
tuple!(Tuple5, 5; A 0, B 1, C 2, D 3, E 4);

impl<K: Encode, V: Encode, S> Encode for indexmap::IndexMap<K, V, S> {
    fn encode<'a>(&'a self, out: &mut Encoder<'a>) {
        out.token("{");
        let mut first = true;
        for (key, value) in self {
            if !first {
                out.token(",");
            }
            first = false;
            out.value(key);
            out.token(":");
            out.value(value);
        }
        out.token("}");
    }
}

struct Map<K, V, S> {
    map: indexmap::IndexMap<K, V, S>,
    key: Option<K>,
    more: bool,
}

impl<K, V, S> Record for Map<K, V, S>
where
    K: Decode + Hash + Eq,
    V: Decode,
    S: BuildHasher + 'static,
{
    type Value = indexmap::IndexMap<K, V, S>;

    fn step(&mut self, input: &mut Input<'_>) -> Result<Step, Error> {
        loop {
            if self.key.is_none() {
                if !input.next_element(&mut self.more, b'}')? {
                    return Ok(Step::Done);
                }
                match K::decode(input)? {
                    Decoded::Value(key) => self.key = Some(key),
                    Decoded::Frame(frame) => return Ok(Step::Push(frame)),
                }
            }
            input.expect(b':')?;
            match V::decode(input)? {
                Decoded::Value(value) => self.insert(value, input)?,
                Decoded::Frame(frame) => return Ok(Step::Push(frame)),
            }
        }
    }

    fn accept(&mut self, child: Child, input: &mut Input<'_>) -> Result<(), Error> {
        if self.key.is_none() {
            self.key = Some(built(child, input)?);
            return Ok(());
        }
        let value = built(child, input)?;
        self.insert(value, input)
    }

    fn value(self, _input: &mut Input<'_>) -> Result<Self::Value, Error> {
        Ok(self.map)
    }
}

impl<K: Hash + Eq, V, S: BuildHasher> Map<K, V, S> {
    fn insert(&mut self, value: V, input: &Input<'_>) -> Result<(), Error> {
        let Some(key) = self.key.take() else {
            return Err(input.error("a map value without a key"));
        };
        match self.map.insert(key, value) {
            None => Ok(()),
            Some(_) => Err(input.error("duplicate key in a map")),
        }
    }
}

impl<K, V, S> Decode for indexmap::IndexMap<K, V, S>
where
    K: Decode + Hash + Eq,
    V: Decode,
    S: BuildHasher + Default + 'static,
{
    fn decode(input: &mut Input<'_>) -> Result<Decoded<Self>, Error> {
        input.expect(b'{')?;
        let record = Map {
            map: indexmap::IndexMap::with_hasher(S::default()),
            key: None,
            more: false,
        };
        start(record, input)
    }
}

pub fn encode_flags<'a, B>(flags: &B, out: &mut Encoder<'a>)
where
    B: bitflags::Flags,
    B::Bits: bitflags::parser::WriteHex,
{
    let mut names = String::new();
    let _ = bitflags::parser::to_writer(flags, &mut names);
    let mut text = String::from("(");
    write_string(&mut text, &names);
    text.push(')');
    out.text(text);
}

pub fn decode_flags<B>(input: &mut Input<'_>, owner: &str) -> Result<Decoded<B>, Error>
where
    B: bitflags::Flags + 'static,
    B::Bits: bitflags::parser::ParseHex,
{
    input.expect(b'(')?;
    let names = input.string()?;
    let flags = bitflags::parser::from_str::<B>(&names)
        .map_err(|error| input.error(format!("invalid flags of `{owner}`: {error}")))?;
    input.expect(b')')?;
    Ok(Decoded::Value(flags))
}
