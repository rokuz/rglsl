/*!
Frontend for [GLSL][glsl] (OpenGL Shading Language).

To begin, take a look at the documentation for the [`Frontend`].

# Supported versions
## Vulkan
- 450
- 460

[glsl]: https://www.khronos.org/registry/OpenGL/index_gl.php
*/

pub use error::{Error, ErrorKind, ParseErrors};
pub use rglsl_pp::{FileId, Includer, NoIncluder};

use alloc::string::String;

use crate::{FastHashMap, Module, ShaderStage};

mod error;
mod lower;

/// Per-shader options passed to [`parse`](Frontend::parse).
///
/// The [`From`] trait is implemented for [`ShaderStage`] to provide a quick way
/// to create an `Options` instance.
///
/// ```rust
/// # use rglsl::ShaderStage;
/// # use rglsl::front::glsl::Options;
/// Options::from(ShaderStage::Vertex);
/// ```
#[derive(Debug)]
pub struct Options {
    /// The shader stage in the pipeline.
    pub stage: ShaderStage,
    /// Preprocessor definitions to be used, akin to having
    /// ```glsl
    /// #define key value
    /// ```
    /// for each key value pair in the map.
    pub defines: FastHashMap<String, String>,
    /// Give uniform and buffer blocks, samplers, textures and images that have
    /// no `binding` layout qualifier a binding, instead of rejecting them.
    ///
    /// The assignment is glslang's (`--auto-map-bindings`): a resource that
    /// code reachable from `main` uses gets the lowest binding in its set that
    /// no other resource has, in declaration order; explicit bindings are
    /// reserved first. A resource that is not used gets binding 0.
    pub auto_map_bindings: bool,
    /// Give stage inputs and outputs that have no `location` layout qualifier
    /// a location, instead of rejecting them.
    ///
    /// The assignment is glslang's (`--auto-map-locations`): inputs and
    /// outputs are numbered separately, in declaration order, each variable
    /// taking as many locations as its type needs. As in glslang, explicit
    /// locations are not taken into account, so they can overlap automatic
    /// ones.
    pub auto_map_locations: bool,
    pub spirv_version: Option<(u8, u8)>,
    pub library: bool,
    pub hlsl_offsets: bool,
}

impl From<ShaderStage> for Options {
    fn from(stage: ShaderStage) -> Self {
        Options {
            stage,
            defines: FastHashMap::default(),
            auto_map_bindings: false,
            auto_map_locations: false,
            spirv_version: None,
            library: false,
            hlsl_offsets: false,
        }
    }
}

/// The `Frontend` is the central structure of the GLSL frontend.
///
/// To instantiate a new `Frontend` the [`Default`] trait is used, so a
/// call to the associated function [`Frontend::default`](Frontend::default) will
/// return a new `Frontend` instance.
///
/// To parse a shader simply call the [`parse`](Frontend::parse) method with a
/// [`Options`] struct and a [`&str`](str) holding the glsl code.
///
/// # Example usage
/// ```rust
/// use rglsl::ShaderStage;
/// use rglsl::front::glsl::{Frontend, Options};
///
/// let glsl = r#"
///     #version 450 core
///
///     void main() {}
/// "#;
///
/// let mut frontend = Frontend::default();
/// let options = Options::from(ShaderStage::Vertex);
/// frontend.parse(&options, glsl);
/// ```
#[derive(Debug, Default)]
#[non_exhaustive]
pub struct Frontend;

impl Frontend {
    /// Parses a shader either outputting a shader [`Module`] or a list of
    /// [`Error`]s.
    ///
    /// Multiple calls using the same `Frontend` and different shaders are supported.
    pub fn parse(&mut self, options: &Options, source: &str) -> Result<Module, ParseErrors> {
        lower::parse(options, source, FileId(0), &mut NoIncluder)
    }

    pub fn parse_with_includer(
        &mut self,
        options: &Options,
        source: &str,
        root: FileId,
        includer: &mut dyn Includer,
    ) -> Result<Module, ParseErrors> {
        lower::parse(options, source, root, includer)
    }

    pub fn compile(
        &mut self,
        options: &Options,
        source: &str,
    ) -> Result<crate::object::ObjectModule, ParseErrors> {
        lower::compile(options, source, FileId(0), &mut NoIncluder)
    }

    pub fn compile_with_includer(
        &mut self,
        options: &Options,
        source: &str,
        root: FileId,
        includer: &mut dyn Includer,
    ) -> Result<crate::object::ObjectModule, ParseErrors> {
        lower::compile(options, source, root, includer)
    }
}
