use alloc::vec::Vec;

use rglsl_types::{rglo, stack};

use crate::{Block, Statement};

#[cfg_attr(feature = "serialize", derive(serde::Serialize))]
#[cfg_attr(feature = "deserialize", derive(serde::Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
enum Entry<S> {
    Block(u32),
    Statement(S),
}

const ENTRIES: [&str; 2] = ["Block", "Statement"];

impl rglo::Encode for Block {
    fn encode(&self, out: &mut rglo::Encoder) {
        out.token("[");
        encode_entries(self, out, "Block(");
        out.token("]");
    }
}

fn encode_entries(block: &Block, out: &mut rglo::Encoder, open: &str) {
    out.token(open);
    out.unsigned(block.len() as u64);
    out.token(")");
    for statement in block.iter() {
        out.token(",Statement(");
        rglo::Encode::encode(statement, out);
        out.token(")");
        for child in statement.child_blocks() {
            stack::recurse(|| encode_entries(child, out, ",Block("));
        }
    }
}

impl rglo::Decode for Block {
    fn decode(input: &mut rglo::Input<'_>) -> Result<Self, rglo::Error> {
        input.expect(b'[')?;
        let mut unflatten = Unflatten::default();
        let mut more = false;
        while input.next_element(&mut more, b']')? {
            let name = input.identifier()?;
            input.expect(b'(')?;
            let entry = match name {
                "Block" => Entry::Block(input.unsigned("u32")?),
                "Statement" => Entry::Statement(rglo::Decode::decode(input)?),
                _ => return Err(input.unknown_variant("Entry", name, &ENTRIES)),
            };
            input.expect(b')')?;
            unflatten
                .entry(entry)
                .map_err(|message| input.error(message))?;
        }
        unflatten
            .root
            .ok_or_else(|| input.error("a block is incomplete"))
    }
}

#[cfg(feature = "serialize")]
impl serde::Serialize for Block {
    fn serialize<S: serde::Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        use serde::ser::{Error as _, SerializeSeq as _};

        let mut sequence = serializer.serialize_seq(None)?;
        let mut pending = Vec::from([(self, 0, false)]);
        while let Some(&mut (block, ref mut next, ref mut started)) = pending.last_mut() {
            if !*started {
                *started = true;
                let length = u32::try_from(block.len())
                    .map_err(|_| S::Error::custom("a block is too long"))?;
                sequence.serialize_element(&Entry::<&Statement>::Block(length))?;
            }
            let Some(statement) = block.get(*next) else {
                pending.pop();
                continue;
            };
            *next += 1;
            sequence.serialize_element(&Entry::Statement(statement))?;
            pending.extend(
                statement
                    .child_blocks()
                    .into_iter()
                    .rev()
                    .map(|child| (child, 0, false)),
            );
        }
        sequence.end()
    }
}

enum Open {
    Block {
        block: Block,
        remaining: usize,
    },
    Statement {
        statement: Statement,
        children: Vec<Block>,
    },
}

#[derive(Default)]
struct Unflatten {
    open: Vec<Open>,
    root: Option<Block>,
}

impl Unflatten {
    fn entry(&mut self, entry: Entry<Statement>) -> Result<(), &'static str> {
        if self.root.is_some() {
            return Err("a block has trailing statements");
        }
        match entry {
            Entry::Block(length) => {
                let remaining = usize::try_from(length).map_err(|_| "a block is too long")?;
                self.open.push(Open::Block {
                    block: Block::with_capacity(remaining.min(1 << 16)),
                    remaining,
                });
            }
            Entry::Statement(statement) => {
                if statement.child_blocks().is_empty() {
                    self.add(statement)?;
                } else {
                    self.open.push(Open::Statement {
                        statement,
                        children: Vec::new(),
                    });
                }
            }
        }
        self.settle()
    }

    fn add(&mut self, statement: Statement) -> Result<(), &'static str> {
        match self.open.last_mut() {
            Some(&mut Open::Block {
                ref mut block,
                ref mut remaining,
            }) if *remaining > 0 => {
                block.push(statement, crate::Span::default());
                *remaining -= 1;
                Ok(())
            }
            _ => Err("a statement is outside of its block"),
        }
    }

    fn settle(&mut self) -> Result<(), &'static str> {
        loop {
            let finished = match self.open.last() {
                Some(&Open::Block { remaining: 0, .. }) => self.open.pop(),
                _ => return Ok(()),
            };
            let Some(Open::Block { block, .. }) = finished else {
                return Err("a block is malformed");
            };
            let complete = match self.open.last_mut() {
                None => {
                    self.root = Some(block);
                    return Ok(());
                }
                Some(&mut Open::Statement {
                    ref statement,
                    ref mut children,
                }) => {
                    children.push(block);
                    children.len() == statement.child_blocks().len()
                }
                Some(&mut Open::Block { .. }) => return Err("a block is outside of a statement"),
            };
            if complete {
                let Some(Open::Statement {
                    mut statement,
                    children,
                }) = self.open.pop()
                else {
                    return Err("a statement is malformed");
                };
                for (slot, child) in statement.child_blocks_mut().into_iter().zip(children) {
                    *slot = child;
                }
                self.add(statement)?;
            }
        }
    }
}

#[cfg(feature = "deserialize")]
impl<'de> serde::Deserialize<'de> for Block {
    fn deserialize<D: serde::Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
        struct Entries;

        impl<'de> serde::de::Visitor<'de> for Entries {
            type Value = Block;

            fn expecting(&self, formatter: &mut core::fmt::Formatter) -> core::fmt::Result {
                formatter.write_str("the entries of a flattened block")
            }

            fn visit_seq<A: serde::de::SeqAccess<'de>>(
                self,
                mut sequence: A,
            ) -> Result<Block, A::Error> {
                use serde::de::Error as _;

                let mut unflatten = Unflatten::default();
                while let Some(entry) = sequence.next_element::<Entry<Statement>>()? {
                    unflatten.entry(entry).map_err(A::Error::custom)?;
                }
                unflatten
                    .root
                    .ok_or_else(|| A::Error::custom("a block is incomplete"))
            }
        }

        deserializer.deserialize_seq(Entries)
    }
}
