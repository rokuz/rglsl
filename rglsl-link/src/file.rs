use rglsl::object::{ObjectModule, FORMAT_VERSION};
use rglsl::valid::{Capabilities, ValidationFlags, ValidationMode, Validator};
use rglsl::{Block, Span, Statement};

#[derive(Debug, thiserror::Error)]
pub enum FileError {
    #[error("cannot write the object module: {0}")]
    Encode(String),
    #[error("not an rglsl object module: {0}")]
    Decode(String),
    #[error("object module format version {found} is not supported (expected {expected})")]
    Version { found: u32, expected: u32 },
    #[error("invalid object module: {0}")]
    Invalid(String),
}

#[derive(serde::Deserialize)]
struct Header {
    format_version: u32,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
enum Flat {
    Block(u32),
    Statement(Statement),
}

#[derive(serde::Serialize, serde::Deserialize)]
struct File {
    format_version: u32,
    object: ObjectModule,
    bodies: Vec<Vec<Flat>>,
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

pub fn encode(object: &ObjectModule) -> Result<String, FileError> {
    let mut object = object.clone();
    let bodies = body_slots(&mut object)
        .into_iter()
        .map(|body| flatten(&core::mem::take(body)))
        .collect::<Result<Vec<_>, _>>()?;
    let file = File {
        format_version: FORMAT_VERSION,
        object,
        bodies,
    };
    ron::ser::to_string(&file).map_err(|error| FileError::Encode(error.to_string()))
}

pub fn decode(text: &str) -> Result<ObjectModule, FileError> {
    let header: Header =
        ron::de::from_str(text).map_err(|error| FileError::Decode(error.to_string()))?;
    if header.format_version != FORMAT_VERSION {
        return Err(FileError::Version {
            found: header.format_version,
            expected: FORMAT_VERSION,
        });
    }
    let File {
        mut object, bodies, ..
    } = ron::de::from_str(text).map_err(|error| FileError::Decode(error.to_string()))?;
    let slots = body_slots(&mut object);
    if slots.len() != bodies.len() {
        return Err(decode_error("the number of function bodies does not match"));
    }
    for (slot, flat) in slots.into_iter().zip(bodies) {
        *slot = unflatten(flat)?;
    }
    validate(&object)?;
    Ok(object)
}

fn validate(object: &ObjectModule) -> Result<(), FileError> {
    let mut pending = Vec::from([object]);
    while let Some(object) = pending.pop() {
        if object.format_version != FORMAT_VERSION {
            return Err(FileError::Version {
                found: object.format_version,
                expected: FORMAT_VERSION,
            });
        }
        let module = &object.module;
        let mut validator = Validator::new(ValidationFlags::all(), Capabilities::all());
        validator.mode(ValidationMode::Object);
        validator
            .validate(module)
            .map_err(|error| FileError::Invalid(crate::message(error.as_inner())))?;
        if object
            .functions
            .iter()
            .any(|symbol| module.functions.try_get(symbol.function).is_err())
        {
            return Err(FileError::Invalid(String::from(
                "a function symbol names a missing function",
            )));
        }
        if object
            .globals
            .iter()
            .any(|symbol| module.global_variables.try_get(symbol.global).is_err())
        {
            return Err(FileError::Invalid(String::from(
                "a global symbol names a missing global variable",
            )));
        }
        pending.extend(&object.variants);
    }
    Ok(())
}

fn decode_error(message: &str) -> FileError {
    FileError::Decode(String::from(message))
}

fn body_slots(object: &mut ObjectModule) -> Vec<&mut Block> {
    let mut slots = Vec::new();
    let mut objects = Vec::from([object]);
    while let Some(object) = objects.pop() {
        let module = &mut object.module;
        slots.extend(
            module
                .functions
                .iter_mut()
                .map(|(_, function)| &mut function.body),
        );
        slots.extend(
            module
                .entry_points
                .iter_mut()
                .map(|entry| &mut entry.function.body),
        );
        objects.extend(object.variants.iter_mut().rev());
    }
    slots
}

fn flatten(root: &Block) -> Result<Vec<Flat>, FileError> {
    let mut flat = Vec::new();
    let mut pending = Vec::from([(root, 0, false)]);
    while let Some(&mut (block, ref mut next, ref mut started)) = pending.last_mut() {
        if !*started {
            *started = true;
            let length = u32::try_from(block.len())
                .map_err(|_| FileError::Encode(String::from("a block is too long")))?;
            flat.push(Flat::Block(length));
        }
        let Some(statement) = block.get(*next) else {
            pending.pop();
            continue;
        };
        *next += 1;
        flat.push(Flat::Statement(statement.shell()));
        pending.extend(
            statement
                .child_blocks()
                .into_iter()
                .rev()
                .map(|child| (child, 0, false)),
        );
    }
    Ok(flat)
}

fn unflatten(flat: Vec<Flat>) -> Result<Block, FileError> {
    let mut open: Vec<Open> = Vec::new();
    let mut root = None;
    for entry in flat {
        if root.is_some() {
            return Err(decode_error("a function body has trailing statements"));
        }
        match entry {
            Flat::Block(length) => {
                let remaining =
                    usize::try_from(length).map_err(|_| decode_error("a block is too long"))?;
                open.push(Open::Block {
                    block: Block::with_capacity(remaining.min(1 << 16)),
                    remaining,
                });
            }
            Flat::Statement(statement) => {
                if statement.child_blocks().is_empty() {
                    add_statement(&mut open, statement)?;
                } else {
                    open.push(Open::Statement {
                        statement,
                        children: Vec::new(),
                    });
                }
            }
        }
        root = settle(&mut open)?;
    }
    root.ok_or_else(|| decode_error("a function body is incomplete"))
}

fn add_statement(open: &mut [Open], statement: Statement) -> Result<(), FileError> {
    match open.last_mut() {
        Some(&mut Open::Block {
            ref mut block,
            ref mut remaining,
        }) if *remaining > 0 => {
            block.push(statement, Span::default());
            *remaining -= 1;
            Ok(())
        }
        _ => Err(decode_error("a statement is outside of its block")),
    }
}

fn settle(open: &mut Vec<Open>) -> Result<Option<Block>, FileError> {
    loop {
        let finished = match open.last() {
            Some(&Open::Block { remaining: 0, .. }) => open.pop(),
            _ => return Ok(None),
        };
        let Some(Open::Block { block, .. }) = finished else {
            return Err(decode_error("a block is malformed"));
        };
        let complete = match open.last_mut() {
            None => return Ok(Some(block)),
            Some(&mut Open::Statement {
                ref statement,
                ref mut children,
            }) => {
                children.push(block);
                children.len() == statement.child_blocks().len()
            }
            Some(&mut Open::Block { .. }) => {
                return Err(decode_error("a block is outside of a statement"))
            }
        };
        if complete {
            let Some(Open::Statement {
                mut statement,
                children,
            }) = open.pop()
            else {
                return Err(decode_error("a statement is malformed"));
            };
            for (slot, child) in statement.child_blocks_mut().into_iter().zip(children) {
                *slot = child;
            }
            add_statement(open, statement)?;
        }
    }
}
