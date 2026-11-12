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
    check_structure_depth(text)?;
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
        let layout = &object.layout;
        if object
            .globals
            .iter()
            .map(|symbol| symbol.global)
            .chain(layout.streams.iter().map(|&(global, _)| global))
            .chain(layout.passthrough.iter().copied())
            .any(|global| module.global_variables.try_get(global).is_err())
        {
            return Err(FileError::Invalid(String::from(
                "a global symbol names a missing global variable",
            )));
        }
        if object
            .work_group_size_placeholders
            .iter()
            .flatten()
            .any(|&handle| module.overrides.try_get(handle).is_err())
        {
            return Err(FileError::Invalid(String::from(
                "a work group size placeholder names a missing specialization constant",
            )));
        }
        if let Some(ref specialized) = object.specialized {
            if specialized.specialized.is_some() || !specialized.variants.is_empty() {
                return Err(FileError::Invalid(String::from(
                    "a specialized object module has its own variants",
                )));
            }
            pending.push(specialized);
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
        let ObjectModule {
            ref mut variants,
            ref mut specialized,
            ..
        } = *object;
        objects.extend(variants.iter_mut().rev());
        objects.extend(specialized.as_deref_mut());
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

const MAX_STRUCTURE_DEPTH: usize = 32;

fn check_structure_depth(text: &str) -> Result<(), FileError> {
    let bytes = text.as_bytes();
    let mut depth = 0_usize;
    let mut index = 0;
    while let Some(&byte) = bytes.get(index) {
        index += 1;
        match byte {
            b'(' | b'[' | b'{' => {
                depth += 1;
                if depth > MAX_STRUCTURE_DEPTH {
                    return Err(decode_error(
                        "the object file is nested deeper than its format allows",
                    ));
                }
            }
            b')' | b']' | b'}' => {
                depth = depth
                    .checked_sub(1)
                    .ok_or_else(|| decode_error("the object file has unbalanced brackets"))?;
            }
            b'"' => index = skip_string(bytes, index, 0)?,
            b'r' if matches!(bytes.get(index), Some(b'"' | b'#')) => {
                let hashes = bytes.get(index..).map_or(0, |rest| {
                    rest.iter().take_while(|&&byte| byte == b'#').count()
                });
                if bytes.get(index + hashes) == Some(&b'"') {
                    index = skip_string(bytes, index + hashes + 1, hashes)?;
                }
            }
            b'/' if bytes.get(index) == Some(&b'/') => {
                while bytes.get(index).is_some_and(|&byte| byte != b'\n') {
                    index += 1;
                }
            }
            b'/' if bytes.get(index) == Some(&b'*') => {
                let mut open = 1_usize;
                index += 1;
                while open > 0 {
                    match (bytes.get(index), bytes.get(index + 1)) {
                        (Some(b'/'), Some(b'*')) => {
                            open += 1;
                            index += 2;
                        }
                        (Some(b'*'), Some(b'/')) => {
                            open -= 1;
                            index += 2;
                        }
                        (Some(_), _) => index += 1,
                        (None, _) => return Err(decode_error("an unterminated comment")),
                    }
                }
            }
            _ => {}
        }
    }
    Ok(())
}

fn skip_string(bytes: &[u8], mut index: usize, hashes: usize) -> Result<usize, FileError> {
    loop {
        match bytes.get(index) {
            None => return Err(decode_error("an unterminated string")),
            Some(b'\\') if hashes == 0 => index += 2,
            Some(b'"')
                if bytes
                    .get(index + 1..index + 1 + hashes)
                    .is_some_and(|rest| rest.iter().all(|&byte| byte == b'#')) =>
            {
                return Ok(index + 1 + hashes);
            }
            Some(_) => index += 1,
        }
    }
}
