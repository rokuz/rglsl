/*!
Frontend for [GLSL][glsl] (OpenGL Shading Language).

To begin, take a look at the documentation for the [`Frontend`].

# Supported versions
## Vulkan
- 440 (partial)
- 450
- 460

[glsl]: https://www.khronos.org/registry/OpenGL/index_gl.php
*/

pub use ast::{Precision, Profile};
pub use error::{Error, ErrorKind, ExpectedToken, ParseErrors};
pub use token::TokenValue;

use alloc::{string::String, vec::Vec};

use crate::{proc::Layouter, FastHashMap, FastHashSet, Handle, Module, ShaderStage, Span, Type};
use ast::{EntryArg, FunctionDeclaration, GlobalLookup};
use parser::ParsingContext;

mod ast;
mod builtins;
mod context;
mod error;
mod functions;
mod lex;
mod offset;
mod parser;
#[cfg(test)]
mod parser_tests;
mod token;
mod types;
mod variables;

type Result<T> = core::result::Result<T, Error>;

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
}

impl From<ShaderStage> for Options {
    fn from(stage: ShaderStage) -> Self {
        Options {
            stage,
            defines: FastHashMap::default(),
            auto_map_bindings: false,
            auto_map_locations: false,
        }
    }
}

/// Additional information about the GLSL shader.
///
/// Stores additional information about the GLSL shader which might not be
/// stored in the shader [`Module`].
#[derive(Debug)]
pub struct ShaderMetadata {
    /// The GLSL version specified in the shader through the use of the
    /// `#version` preprocessor directive.
    pub version: u16,
    /// The GLSL profile specified in the shader through the use of the
    /// `#version` preprocessor directive.
    pub profile: Profile,
    /// The shader stage in the pipeline, passed to the [`parse`](Frontend::parse)
    /// method via the [`Options`] struct.
    pub stage: ShaderStage,

    /// The workgroup size for compute shaders, defaults to `[1; 3]` for
    /// compute shaders and `[0; 3]` for non compute shaders.
    pub workgroup_size: [u32; 3],
    /// Whether or not early fragment tests where requested by the shader.
    /// Defaults to `false`.
    pub early_fragment_tests: bool,

    /// The shader can request extensions via the
    /// `#extension` preprocessor directive, in the directive a behavior
    /// parameter is used to control whether the extension should be disabled,
    /// warn on usage, enabled if possible or required.
    ///
    /// This field only stores extensions which were required or requested to
    /// be enabled if possible and they are supported.
    pub extensions: FastHashSet<String>,
}

impl ShaderMetadata {
    fn reset(&mut self, stage: ShaderStage) {
        self.version = 0;
        self.profile = Profile::Core;
        self.stage = stage;
        self.workgroup_size = [u32::from(stage.compute_like()); 3];
        self.early_fragment_tests = false;
        self.extensions.clear();
    }
}

impl Default for ShaderMetadata {
    fn default() -> Self {
        ShaderMetadata {
            version: 0,
            profile: Profile::Core,
            stage: ShaderStage::Vertex,
            workgroup_size: [0; 3],
            early_fragment_tests: false,
            extensions: FastHashSet::default(),
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
/// The `Frontend` also provides the [`metadata`](Frontend::metadata) to get some
/// further information about the previously parsed shader, like version and
/// extensions used (see the documentation for
/// [`ShaderMetadata`] to see all the returned information)
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
///
/// # Reusability
///
/// If there's a need to parse more than one shader reusing the same `Frontend`
/// instance may be beneficial since internal allocations will be reused.
///
/// Calling the [`parse`](Frontend::parse) method multiple times will reset the
/// `Frontend` so no extra care is needed when reusing.
#[derive(Debug, Default)]
pub struct Frontend {
    meta: ShaderMetadata,

    lookup_function: FastHashMap<String, FunctionDeclaration>,
    lookup_type: FastHashMap<String, Handle<Type>>,

    global_variables: Vec<(String, GlobalLookup)>,

    entry_args: Vec<EntryArg>,

    /// The user-defined stage inputs and outputs, in declaration order: the
    /// entry point's [`interface`](crate::EntryPoint::interface).
    interface: Vec<Handle<crate::GlobalVariable>>,

    layouter: Layouter,

    /// `#pragma STDGL invariant(all)` was seen: every stage output declared
    /// from here on is invariant.
    invariant_all: bool,

    /// Block members that are booleans in the source and unsigned integers
    /// in the block's type: (the block's variable, the member's index).
    block_bools: FastHashSet<(Handle<crate::GlobalVariable>, u32)>,

    /// Automatic bindings and locations; see [`Options::auto_map_bindings`]
    /// and [`Options::auto_map_locations`].
    auto_map: variables::AutoMap,

    errors: Vec<Error>,
}

impl Frontend {
    fn reset(&mut self, stage: ShaderStage) {
        self.meta.reset(stage);

        self.lookup_function.clear();
        self.lookup_type.clear();
        self.global_variables.clear();
        self.entry_args.clear();
        self.interface.clear();
        self.layouter.clear();
        self.invariant_all = false;
        self.block_bools.clear();
        self.auto_map = variables::AutoMap::default();
    }

    /// Parses a shader either outputting a shader [`Module`] or a list of
    /// [`Error`]s.
    ///
    /// Multiple calls using the same `Frontend` and different shaders are supported.
    pub fn parse(
        &mut self,
        options: &Options,
        source: &str,
    ) -> core::result::Result<Module, ParseErrors> {
        self.reset(options.stage);
        self.auto_map.bindings = options.auto_map_bindings;
        self.auto_map.locations = options.auto_map_locations;

        let lexer = lex::Lexer::new(source, &options.defines);
        let mut ctx = ParsingContext::new(lexer);

        match ctx.parse(self) {
            Ok(mut module) => {
                self.assign_automatic_bindings(&mut module);
                self.apply_invariant_all(&mut module);
                if self.errors.is_empty() {
                    Ok(module)
                } else {
                    Err(core::mem::take(&mut self.errors).into())
                }
            }
            Err(e) => {
                self.errors.push(e);
                Err(core::mem::take(&mut self.errors).into())
            }
        }
    }

    /// Returns additional information about the parsed shader which might not
    /// be stored in the [`Module`], see the documentation for
    /// [`ShaderMetadata`] for more information about the returned data.
    ///
    /// # Notes
    ///
    /// Following an unsuccessful parsing the state of the returned information
    /// is undefined, it might contain only partial information about the
    /// current shader, the previous shader or both.
    pub const fn metadata(&self) -> &ShaderMetadata {
        &self.meta
    }
}
