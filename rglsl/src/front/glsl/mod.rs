/*!
Frontend for [GLSL][glsl] (OpenGL Shading Language).

To begin, take a look at the documentation for the [`Frontend`].

# Supported versions
## Vulkan
- 450
- 460

[glsl]: https://www.khronos.org/registry/OpenGL/index_gl.php
*/

pub use error::{Error, ErrorKind, IncludeLocation, ParseErrors};
pub use rglsl_pp::{FileId, Includer, NoIncluder};
pub use rglsl_sema::{BuiltinTables, FreshTables, ResourceLimits};

use alloc::string::String;
use alloc::sync::Arc;

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
    pub spirv_version: Option<(u8, u8)>,
    pub library: bool,
    pub debug_info: bool,
    pub source_name: Option<String>,
    pub preamble: Option<String>,
    pub limits: ResourceLimits,
    pub invert_y: bool,
    pub nan_clamp: bool,
    pub discard_is_terminate: bool,
    pub builtin_tables: Arc<dyn BuiltinTables + Send + Sync>,
}

impl From<ShaderStage> for Options {
    fn from(stage: ShaderStage) -> Self {
        Options {
            stage,
            defines: FastHashMap::default(),
            spirv_version: None,
            library: false,
            debug_info: false,
            source_name: None,
            preamble: None,
            limits: ResourceLimits::default(),
            invert_y: false,
            nan_clamp: false,
            discard_is_terminate: false,
            builtin_tables: Arc::new(FreshTables),
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
/// let frontend = Frontend::default();
/// let options = Options::from(ShaderStage::Vertex);
/// frontend.parse(&options, glsl);
/// ```
#[derive(Debug, Default)]
#[non_exhaustive]
pub struct Frontend;

#[derive(Debug)]
pub struct Analyzed {
    pub unit: rglsl_ast::TranslationUnit,
    pub analysis: rglsl_sema::Analysis,
}

impl Frontend {
    /// Parses a shader either outputting a shader [`Module`] or a list of
    /// [`Error`]s.
    ///
    /// Multiple calls using the same `Frontend` and different shaders are supported.
    pub fn parse(&self, options: &Options, source: &str) -> Result<Module, ParseErrors> {
        lower::parse(options, source, FileId(0), &mut NoIncluder)
    }

    pub fn parse_with_includer(
        &self,
        options: &Options,
        source: &str,
        root: FileId,
        includer: &mut dyn Includer,
    ) -> Result<Module, ParseErrors> {
        lower::parse(options, source, root, includer)
    }

    pub fn compile_program(
        &self,
        options: &Options,
        source: &str,
        root: FileId,
        includer: &mut dyn Includer,
    ) -> Result<crate::object::ObjectModule, ParseErrors> {
        lower::compile_program(options, source, root, includer)
    }

    pub fn compile(
        &self,
        options: &Options,
        source: &str,
    ) -> Result<crate::object::ObjectModule, ParseErrors> {
        lower::compile(options, source, FileId(0), &mut NoIncluder)
    }

    pub fn compile_with_includer(
        &self,
        options: &Options,
        source: &str,
        root: FileId,
        includer: &mut dyn Includer,
    ) -> Result<crate::object::ObjectModule, ParseErrors> {
        lower::compile(options, source, root, includer)
    }

    pub fn analyze_with_includer(
        &self,
        options: &Options,
        source: &str,
        root: FileId,
        includer: &mut dyn Includer,
    ) -> Option<Analyzed> {
        lower::analyze(options, source, root, includer)
    }

    #[doc(hidden)]
    pub fn library_lowerings(&self, options: &Options, source: &str) -> usize {
        lower::library_lowerings(options, source, FileId(0), &mut NoIncluder)
    }

    #[doc(hidden)]
    pub fn compile_library_per_stage(
        &self,
        options: &Options,
        source: &str,
    ) -> Result<crate::object::ObjectModule, ParseErrors> {
        lower::compile_library_per_stage(options, source, FileId(0), &mut NoIncluder)
    }
}
