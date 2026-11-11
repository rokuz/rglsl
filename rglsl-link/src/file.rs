use rglsl::object::{ObjectModule, FORMAT_VERSION};

#[derive(Debug, thiserror::Error)]
pub enum FileError {
    #[error("cannot write the object module: {0}")]
    Encode(String),
    #[error("not an rglsl object module: {0}")]
    Decode(String),
    #[error("object module format version {found} is not supported (expected {expected})")]
    Version { found: u32, expected: u32 },
}

#[derive(serde::Deserialize)]
struct Header {
    format_version: u32,
}

pub fn encode(object: &ObjectModule) -> Result<String, FileError> {
    ron::ser::to_string(object).map_err(|error| FileError::Encode(error.to_string()))
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
    ron::de::from_str(text).map_err(|error| FileError::Decode(error.to_string()))
}
