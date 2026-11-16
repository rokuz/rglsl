mod decode;
mod encode;
mod impls;

pub use decode::{Decode, Error, Input, element, field, from_str, no_more_elements};
pub use encode::{Encode, Encoder, to_string};
pub use impls::{decode_flags, encode_flags};
pub use rglsl_derive::Rglo;
