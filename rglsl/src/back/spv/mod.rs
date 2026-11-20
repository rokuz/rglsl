/*!
Backend for [SPIR-V][spv] (Standard Portable Intermediate Representation).

[spv]: https://www.khronos.org/registry/SPIR-V/
*/

mod atomic;
mod block;
mod builtin;
mod cooperative;
mod debug;
mod feature;
mod grammar;
mod heap;
mod helpers;
mod image;
mod index;
mod instructions;
mod intrinsics;
mod layout;
mod message;
mod microscaling;
mod nan;
mod physical;
mod plain_types;
mod qcom;
mod ray;
mod reclaimable;
mod reference;
mod replicate;
mod small_types;
mod specialization;
mod ssa;
mod stage;
mod subgroup;
mod tensor;
mod uninitialized;
mod writer;

pub use rglsl_types::spv::*;

pub use debug::{DebugEntryPoint, DebugInfo, DebugLevel};
pub use spirv::{Capability, SourceLanguage};

use alloc::{string::String, vec::Vec};

use spirv::Word;
use thiserror::Error;

use crate::arena::{Handle, HandleVec};
use crate::proc::TypeResolution;

#[derive(Clone)]
struct PhysicalLayout {
    magic_number: Word,
    version: Word,
    generator: Word,
    bound: Word,
    instruction_schema: Word,
}

#[derive(Default)]
struct LogicalLayout {
    capabilities: Vec<Word>,
    extensions: Vec<Word>,
    ext_inst_imports: Vec<Word>,
    memory_model: Vec<Word>,
    entry_points: Vec<Word>,
    execution_modes: Vec<Word>,
    debugs: Vec<Word>,
    annotations: Vec<Word>,
    declarations: Vec<Word>,
    function_declarations: Vec<Word>,
    function_definitions: Vec<Word>,
}

type Operands = rglsl_types::small_vec::SmallVec<Word, 6>;

#[derive(Clone)]
struct Instruction {
    op: u32,
    wc: u32,
    type_id: Option<Word>,
    result_id: Option<Word>,
    operands: Operands,
}

const BITS_PER_BYTE: crate::Bytes = 8;

#[derive(Clone, Debug, Error)]
pub enum Error {
    #[error("The requested entry point couldn't be found")]
    EntryPointNotFound,
    #[error("target SPIRV-{0}.{1} is not supported")]
    UnsupportedVersion(u8, u8),
    #[error("using {0} requires at least one of the capabilities {1:?}, but none are available")]
    MissingCapabilities(&'static str, Vec<Capability>),
    #[error("unimplemented {0}")]
    FeatureNotImplemented(&'static str),
    #[error("module is not validated properly: {0}")]
    Validation(&'static str),
    #[error("overrides should not be present at this stage")]
    Override,
    #[error("{0} is not allowed in a specialization constant")]
    SpecializationConstant(&'static str),
    #[error(transparent)]
    ResolveArraySizeError(#[from] crate::proc::ResolveArraySizeError),
    #[error("module requires SPIRV-{0}.{1}, which isn't supported")]
    SpirvVersionTooLow(u8, u8),
    #[error("mapping of {0:?} is missing")]
    MissingBinding(crate::ResourceBinding),
    #[error("function `{0}` is imported: link the module before writing SPIR-V")]
    Import(String),
    #[error("internal error: {0}")]
    Internal(&'static str),
}

#[derive(Default)]
struct IdGenerator(Word);

impl IdGenerator {
    const fn next(&mut self) -> Word {
        self.0 += 1;
        self.0
    }
}

/// A SPIR-V block to which we are still adding instructions.
///
/// A `Block` represents a SPIR-V block that does not yet have a termination
/// instruction like `OpBranch` or `OpReturn`.
///
/// The `OpLabel` that starts the block is implicit. It will be emitted based on
/// `label_id` when we write the block to a `LogicalLayout`.
///
/// To terminate a `Block`, pass the block and the termination instruction to
/// `Function::consume`. This takes ownership of the `Block` and transforms it
/// into a `TerminatedBlock`.
struct Block {
    label_id: Word,
    body: Vec<Instruction>,
}

/// A SPIR-V block that ends with a termination instruction.
struct TerminatedBlock {
    label_id: Word,
    body: Vec<Instruction>,
}

impl Block {
    const fn new(label_id: Word) -> Self {
        Block {
            label_id,
            body: Vec::new(),
        }
    }
}

struct LocalVariable {
    id: Word,
    instruction: Instruction,
}

struct ResultMember {
    id: Word,
    type_id: Word,
    built_in: Option<crate::BuiltIn>,
}

struct EntryPointContext {
    argument_ids: Vec<Word>,
    results: Vec<ResultMember>,
}

#[derive(Default)]
struct Function {
    signature: Option<Instruction>,
    parameters: Vec<FunctionArgument>,
    variables: crate::FastHashMap<Handle<crate::LocalVariable>, LocalVariable>,
    argument_locals: crate::FastHashMap<Handle<crate::LocalVariable>, Word>,
    argument_copies: Vec<LocalVariable>,
    /// List of local variables used as a counters to ensure that all loops are bounded.

    /// A map from a rglsl expression to the temporary SPIR-V variable we have
    /// spilled its value to, if any.
    ///
    /// rglsl IR lets us apply [`Access`] expressions to expressions whose value
    /// is an array or matrix---not a pointer to such---but SPIR-V doesn't have
    /// instructions that can do the same. So when we encounter such code, we
    /// spill the expression's value to a generated temporary variable. That, we
    /// can obtain a pointer to, and then use an `OpAccessChain` instruction to
    /// do whatever series of [`Access`] and [`AccessIndex`] operations we need
    /// (with bounds checks). Finally, we generate an `OpLoad` to get the final
    /// value.
    ///
    /// [`Access`]: crate::Expression::Access
    /// [`AccessIndex`]: crate::Expression::AccessIndex
    spilled_composites: crate::FastIndexMap<Handle<crate::Expression>, LocalVariable>,

    /// A set of expressions that are either in [`spilled_composites`] or refer
    /// to some component/element of such.
    ///
    /// [`spilled_composites`]: Function::spilled_composites
    spilled_accesses: crate::arena::HandleSet<crate::Expression>,

    texel_images: crate::arena::HandleSet<crate::Expression>,

    handle_pointers: crate::FastHashMap<Handle<crate::Expression>, Word>,

    size_query: Option<SizeQuery>,

    /// A map taking each expression to the number of [`Access`] and
    /// [`AccessIndex`] expressions that uses it as a base value. If an
    /// expression has no entry, its count is zero: it is never used as a
    /// [`Access`] or [`AccessIndex`] base.
    ///
    /// We use this, together with [`ExpressionInfo::ref_count`], to recognize
    /// the tips of chains of [`Access`] and [`AccessIndex`] expressions that
    /// access spilled values --- expressions in [`spilled_composites`]. We
    /// defer generating code for the chain until we reach its tip, so we can
    /// handle it with a single instruction.
    ///
    /// [`Access`]: crate::Expression::Access
    /// [`AccessIndex`]: crate::Expression::AccessIndex
    /// [`ExpressionInfo::ref_count`]: crate::valid::ExpressionInfo
    /// [`spilled_composites`]: Function::spilled_composites
    access_uses: crate::FastHashMap<Handle<crate::Expression>, usize>,

    blocks: Vec<TerminatedBlock>,
    entry_point_context: Option<EntryPointContext>,
}

impl Function {
    fn consume(&mut self, mut block: Block, termination: Instruction) {
        block.body.push(termination);
        self.blocks.push(TerminatedBlock {
            label_id: block.label_id,
            body: block.body,
        });
    }

    fn local_id(&self, local: Handle<crate::LocalVariable>) -> Result<Word, Error> {
        if let Some(&id) = self.argument_locals.get(&local) {
            return Ok(id);
        }
        self.variables
            .get(&local)
            .map(|variable| variable.id)
            .ok_or(Error::Validation("local variable is not written"))
    }

    fn parameter_id(&self, index: u32) -> Result<Word, Error> {
        match self.entry_point_context {
            Some(ref context) => Ok(context.argument_ids[index as usize]),
            None => self.parameters[index as usize]
                .instruction
                .result_id
                .ok_or(Error::Validation("function parameter has no id")),
        }
    }
}

/// Characteristics of a SPIR-V `OpTypeImage` type.
///
/// SPIR-V requires non-composite types to be unique, including images. Since we
/// use `LocalType` for this deduplication, it's essential that `LocalImageType`
/// be equal whenever the corresponding `OpTypeImage`s would be. To reduce the
/// likelihood of mistakes, we use fields that correspond exactly to the
/// operands of an `OpTypeImage` instruction, using the actual SPIR-V types
/// where practical.
#[derive(Debug, PartialEq, Hash, Eq, Copy, Clone)]
struct LocalImageType {
    sampled_type: crate::Scalar,
    dim: spirv::Dim,
    flags: ImageTypeFlags,
    image_format: spirv::ImageFormat,
}

bitflags::bitflags! {
    /// Flags corresponding to the boolean(-ish) parameters to OpTypeImage.
    #[derive(Clone, Copy, Debug, Eq, Hash, PartialEq)]
    pub(super) struct ImageTypeFlags: u8 {
        const DEPTH = 0x1;
        const ARRAYED = 0x2;
        const MULTISAMPLED = 0x4;
        const SAMPLED = 0x8;
    }
}

impl LocalImageType {
    /// Construct a `LocalImageType` from the fields of a `TypeInner::Image`.
    fn from_inner(
        dim: crate::ImageDimension,
        arrayed: bool,
        class: crate::ImageClass,
    ) -> Result<Self, Error> {
        let make_flags = |multi: bool, other: ImageTypeFlags| -> ImageTypeFlags {
            let mut flags = other;
            flags.set(ImageTypeFlags::ARRAYED, arrayed);
            flags.set(ImageTypeFlags::MULTISAMPLED, multi);
            flags
        };

        let dim = spirv::Dim::from(dim);

        Ok(match class {
            crate::ImageClass::Sampled { kind, multi } => LocalImageType {
                sampled_type: crate::Scalar { kind, width: 4 },
                dim,
                flags: make_flags(
                    multi,
                    if matches!(
                        dim,
                        spirv::Dim::DimSubpassData | spirv::Dim::DimTileImageDataEXT
                    ) {
                        ImageTypeFlags::empty()
                    } else {
                        ImageTypeFlags::SAMPLED
                    },
                ),
                image_format: spirv::ImageFormat::Unknown,
            },
            crate::ImageClass::Depth { multi } => LocalImageType {
                sampled_type: crate::Scalar {
                    kind: crate::ScalarKind::Float,
                    width: 4,
                },
                dim,
                flags: make_flags(multi, ImageTypeFlags::DEPTH | ImageTypeFlags::SAMPLED),
                image_format: spirv::ImageFormat::Unknown,
            },
            crate::ImageClass::Storage {
                format,
                access: _,
                multi,
            } => LocalImageType {
                sampled_type: format.into(),
                dim,
                flags: make_flags(multi, ImageTypeFlags::empty()),
                image_format: format.into(),
            },
        })
    }
}

/// A numeric type, for use in [`LocalType`].
#[derive(Debug, PartialEq, Hash, Eq, Copy, Clone)]
enum NumericType {
    Scalar(crate::Scalar),
    Vector {
        size: crate::VectorSize,
        scalar: crate::Scalar,
    },
    Matrix {
        columns: crate::VectorSize,
        rows: crate::VectorSize,
        scalar: crate::Scalar,
    },
}

/// A cooperative type, for use in [`LocalType`].
#[derive(Debug, PartialEq, Hash, Eq, Copy, Clone)]
enum CooperativeType {
    Matrix {
        columns: crate::CooperativeSize,
        rows: crate::CooperativeSize,
        scalar: crate::Scalar,
        role: crate::CooperativeRole,
        scope: crate::CooperativeSize,
        class: crate::CooperativeMatrixClass,
    },
    Vector {
        size: crate::CooperativeSize,
        scalar: crate::Scalar,
        class: crate::LongVectorClass,
    },
}

/// A SPIR-V type constructed during code generation.
///
/// This is the variant of [`LookupType`] used to represent types that might not
/// be available in the arena. Variants are present here for one of two reasons:
///
/// -   They represent types synthesized during code generation, as explained
///     in the documentation for [`LookupType`].
///
/// -   They represent types for which SPIR-V forbids duplicate `OpType...`
///     instructions, requiring deduplication.
///
/// This is not a complete copy of [`TypeInner`]: for example, SPIR-V generation
/// never synthesizes new struct types, so `LocalType` has nothing for that.
///
/// Each `LocalType` variant should be handled identically to its analogous
/// `TypeInner` variant. You can use the [`Writer::localtype_from_inner`]
/// function to help with this, by converting everything possible to a
/// `LocalType` before inspecting it.
///
/// ## `LocalType` equality and SPIR-V `OpType` uniqueness
///
/// The definition of `Eq` on `LocalType` is carefully chosen to help us follow
/// certain SPIR-V rules. SPIR-V §2.8 requires some classes of `OpType...`
/// instructions to be unique; for example, you can't have two `OpTypeInt 32 1`
/// instructions in the same module. All 32-bit signed integers must use the
/// same type id.
///
/// All SPIR-V types that must be unique can be represented as a `LocalType`,
/// and two `LocalType`s are always `Eq` if SPIR-V would require them to use the
/// same `OpType...` instruction. This lets us avoid duplicates by recording the
/// ids of the type instructions we've already generated in a hash table,
/// [`Writer::lookup_type`], keyed by `LocalType`.
///
/// As another example, [`LocalImageType`], stored in the `LocalType::Image`
/// variant, is designed to help us deduplicate `OpTypeImage` instructions. See
/// its documentation for details.
///
/// SPIR-V does not require pointer types to be unique - but different
/// SPIR-V ids are considered to be distinct pointer types. Since rglsl
/// uses structural type equality, we need to represent each rglsl
/// equivalence class with a single SPIR-V `OpTypePointer`.
///
/// As it always must, the `Hash` implementation respects the `Eq` relation.
///
/// [`TypeInner`]: crate::TypeInner
#[derive(Debug, PartialEq, Hash, Eq, Copy, Clone)]
enum LocalType {
    /// A numeric type.
    Numeric(NumericType),
    Cooperative(CooperativeType),
    Pointer {
        base: Word,
        class: spirv::StorageClass,
    },
    Image(LocalImageType),
    SampledImage {
        image_type_id: Word,
    },
    Sampler,
    BindingArray {
        base_type_id: Word,
        size: u32,
    },
    AccelerationStructure,
    RayQuery,
    HitObject(crate::HitObjectFlavor),
    UntypedPointer {
        class: spirv::StorageClass,
    },
    BufferDescriptor {
        class: spirv::StorageClass,
    },
}

/// A type encountered during SPIR-V generation.
///
/// In the process of writing SPIR-V, we need to synthesize various types for
/// intermediate results and such: pointer types, vector/matrix component types,
/// or even booleans, which usually appear in SPIR-V code even when they're not
/// used by the module source.
///
/// However, we can't use `crate::Type` or `crate::TypeInner` for these, as the
/// type arena may not contain what we need (it only contains types used
/// directly by other parts of the IR), and the IR module is immutable, so we
/// can't add anything to it.
///
/// So for local use in the SPIR-V writer, we use this type, which holds either
/// a handle into the arena, or a [`LocalType`] containing something synthesized
/// locally.
///
/// This is very similar to the [`proc::TypeResolution`] enum, with `LocalType`
/// playing the role of `TypeInner`. However, `LocalType` also has other
/// properties needed for SPIR-V generation; see the description of
/// [`LocalType`] for details.
///
/// [`proc::TypeResolution`]: crate::proc::TypeResolution
#[derive(Debug, PartialEq, Hash, Eq, Copy, Clone)]
enum LookupType {
    Handle(Handle<crate::Type>),
    Local(LocalType),
}

impl From<LocalType> for LookupType {
    fn from(local: LocalType) -> Self {
        Self::Local(local)
    }
}

#[derive(Debug, PartialEq, Clone, Hash, Eq)]
struct LookupFunctionType {
    parameter_type_ids: Vec<Word>,
    return_type_id: Word,
}

#[derive(Debug)]
enum Dimension {
    Scalar,
    Vector,
    Matrix,
    CooperativeMatrix,
}

/// A map from evaluated [`Expression`](crate::Expression)s to their SPIR-V ids.
///
/// When we emit code to evaluate a given `Expression`, we record the
/// SPIR-V id of its value here, under its `Handle<Expression>` index.
///
/// A `CachedExpressions` value can be indexed by a `Handle<Expression>` value.
///
/// [emit]: index.html#expression-evaluation-time-and-scope
#[derive(Default)]
struct CachedExpressions {
    ids: HandleVec<crate::Expression, Word>,
}
impl CachedExpressions {
    fn reset(&mut self, length: usize) {
        self.ids.clear();
        self.ids.resize(length, 0);
    }
}
impl CachedExpressions {
    fn get(&self, h: Handle<crate::Expression>) -> Result<Word, Error> {
        match self.ids.get(h) {
            Some(&id) if id != 0 => Ok(id),
            _ => Err(Error::Validation(
                "expression is used before it is evaluated",
            )),
        }
    }

    fn set(&mut self, h: Handle<crate::Expression>, id: Word) -> Result<(), Error> {
        match self.ids.get(h) {
            Some(&0) => {
                self.ids[h] = id;
                Ok(())
            }
            _ => Err(Error::Validation("expression is evaluated twice")),
        }
    }
}
impl reclaimable::Reclaimable for CachedExpressions {
    fn reclaim(self) -> Self {
        CachedExpressions {
            ids: self.ids.reclaim(),
        }
    }
}

#[derive(Eq, Hash, PartialEq)]
enum CachedConstant {
    Literal(crate::proc::HashableLiteral),
    Composite {
        ty: LookupType,
        constituent_ids: Vec<Word>,
    },
    ZeroValue(Word),
    Undef(Word),
}

/// The SPIR-V representation of a [`crate::GlobalVariable`].
///
/// In the Vulkan spec 1.3.296, the section [Descriptor Set Interface][dsi] says:
///
/// > Variables identified with the `Uniform` storage class are used to access
/// > transparent buffer backed resources. Such variables *must* be:
/// >
/// > -   typed as `OpTypeStruct`, or an array of this type,
/// >
/// > -   identified with a `Block` or `BufferBlock` decoration, and
/// >
/// > -   laid out explicitly using the `Offset`, `ArrayStride`, and `MatrixStride`
/// >     decorations as specified in "Offset and Stride Assignment".
///
/// This is followed by identical language for the `StorageBuffer`,
/// except that a `BufferBlock` decoration is not allowed.
///
/// When we encounter a global variable in the [`Storage`] or [`Uniform`]
/// address spaces whose type is not already [`Struct`], this backend implicitly
/// wraps the global variable in a struct: we generate a SPIR-V global variable
/// holding an `OpTypeStruct` with a single member, whose type is what the rglsl
/// global's type would suggest, decorated as required above.
///
/// The [`helpers::global_needs_wrapper`] function determines whether a given
/// [`crate::GlobalVariable`] needs to be wrapped.
///
/// [dsi]: https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#interfaces-resources-descset
/// [`Storage`]: crate::AddressSpace::Storage
/// [`Uniform`]: crate::AddressSpace::Uniform
/// [`Struct`]: crate::TypeInner::Struct
#[derive(Clone)]
struct GlobalVariable {
    /// The SPIR-V id of the `OpVariable` that declares the global.
    ///
    /// If this global has been implicitly wrapped in an `OpTypeStruct`, this id
    /// refers to the wrapper, not the original rglsl value it contains. If you
    /// need the rglsl value, use [`access_id`] instead of this field.
    ///
    /// If this global is not implicitly wrapped, this is the same as
    /// [`access_id`].
    ///
    /// This is used to compute the `access_id` pointer in function prologues,
    /// and used for `ArrayLength` expressions, which need to pass the wrapper
    /// struct.
    ///
    /// [`access_id`]: GlobalVariable::access_id
    var_id: Word,

    /// The SPIR-V id of a pointer to this variable's rglsl IR value.
    ///
    /// If the current function uses this global variable, and it has been
    /// implicitly wrapped in an `OpTypeStruct`, this is the id of an
    /// `OpAccessChain` instruction in the function's prologue that refers to
    /// the wrapped value inside the struct. (This value is assigned as we write
    /// the prologue code of each function.) If you need the wrapper struct
    /// itself, use [`var_id`] instead of this field.
    ///
    /// If this global is not implicitly wrapped, this is the same as
    /// [`var_id`].
    ///
    /// [`var_id`]: GlobalVariable::var_id
    access_id: Word,
}

impl GlobalVariable {
    const fn dummy() -> Self {
        Self {
            var_id: 0,
            access_id: 0,
        }
    }

    const fn new(id: Word) -> Self {
        Self {
            var_id: id,
            access_id: 0,
        }
    }

    /// Prepare `self` for use within a single function.
    const fn reset_for_function(&mut self) {
        self.access_id = 0;
    }
}

struct FunctionArgument {
    /// Actual instruction of the argument.
    instruction: Instruction,
}

struct SizeQuery {
    image: Handle<crate::Expression>,
    label_id: Word,
    id: Word,
    layer_index: u32,
}

#[derive(Clone, Copy)]
enum HandleSource {
    Global(Handle<crate::GlobalVariable>),
    Argument(u32),
}

/// Tracks the expressions for which the backend emits the following instructions:
/// - OpConstantTrue
/// - OpConstantFalse
/// - OpConstant
/// - OpConstantComposite
/// - OpConstantNull
struct ExpressionConstnessTracker {
    inner: crate::arena::HandleSet<crate::Expression>,
    specialized: crate::arena::HandleSet<crate::Expression>,
}

impl ExpressionConstnessTracker {
    fn from_arena(arena: &crate::Arena<crate::Expression>) -> Self {
        let mut inner = crate::arena::HandleSet::for_arena(arena);
        let mut specialized = crate::arena::HandleSet::for_arena(arena);
        for (handle, expr) in arena.iter() {
            let known = |h| inner.contains(h) || specialized.contains(h);
            let (constant, spec) = match *expr {
                crate::Expression::Literal(_)
                | crate::Expression::ZeroValue(_)
                | crate::Expression::Constant(_) => (true, false),
                crate::Expression::Override(_) => (false, true),
                crate::Expression::Compose { ref components, .. } => {
                    let all_known = components.iter().all(|&h| known(h));
                    let any_spec = components.iter().any(|&h| specialized.contains(h));
                    (all_known && !any_spec, all_known && any_spec)
                }
                crate::Expression::Splat { value, .. }
                | crate::Expression::Replicate { value, .. } => {
                    (inner.contains(value), specialized.contains(value))
                }
                _ => (false, false),
            };
            if constant {
                inner.insert(handle);
            }
            if spec {
                specialized.insert(handle);
            }
        }
        Self { inner, specialized }
    }

    fn is_const(&self, value: Handle<crate::Expression>) -> bool {
        self.inner.contains(value)
    }

    fn is_specialized(&self, value: Handle<crate::Expression>) -> bool {
        self.specialized.contains(value)
    }

    fn is_constant_instruction(&self, value: Handle<crate::Expression>) -> bool {
        self.is_const(value) || self.is_specialized(value)
    }
}

/// General information needed to emit SPIR-V for rglsl statements.
struct BlockContext<'w> {
    /// The writer handling the module to which this code belongs.
    writer: &'w mut Writer,

    /// The [`Module`](crate::Module) for which we're generating code.
    ir_module: &'w crate::Module,

    /// The [`Function`](crate::Function) for which we're generating code.
    ir_function: &'w crate::Function,

    /// Information module validation produced about
    /// [`ir_function`](BlockContext::ir_function).
    fun_info: &'w crate::valid::FunctionInfo,

    /// The [`spv::Function`](Function) to which we are contributing SPIR-V instructions.
    function: &'w mut Function,

    /// SPIR-V ids for expressions we've evaluated.
    cached: CachedExpressions,

    /// The `Writer`'s temporary vector, for convenience.
    temp_list: Vec<Word>,

    /// Tracks the constness of `Expression`s residing in `self.ir_function.expressions`
    expression_constness: ExpressionConstnessTracker,

    /// Hash from an expression whose type is a ray query / pointer to a ray query to its tracker.
    /// Note: this is sparse, so can't be a handle vec
    physical_component_load: bool,

    reachability: crate::proc::Reachability,

    ssa: ssa::Ssa,
}

impl BlockContext<'_> {
    const fn gen_id(&mut self) -> Word {
        self.writer.id_gen.next()
    }

    fn get_type_id(&mut self, lookup_type: LookupType) -> Result<Word, Error> {
        self.writer.get_type_id(lookup_type)
    }

    fn get_localtype_id(&mut self, local: LocalType) -> Word {
        self.writer.get_localtype_id(local)
    }

    fn get_handle_type_id(&self, handle: Handle<crate::Type>) -> Result<Word, Error> {
        self.writer.get_handle_type_id(handle)
    }

    fn get_expression_type_id(&mut self, tr: &TypeResolution) -> Result<Word, Error> {
        self.writer.get_expression_type_id(tr)
    }

    fn get_index_constant(&mut self, index: Word) -> Word {
        self.writer.get_constant_scalar(crate::Literal::U32(index))
    }

    fn get_scope_constant(&mut self, scope: Word) -> Word {
        self.writer
            .get_constant_scalar(crate::Literal::I32(scope as _))
    }

    fn get_pointer_type_id(&mut self, base: Word, class: spirv::StorageClass) -> Word {
        self.writer.get_pointer_type_id(base, class)
    }

    fn get_numeric_type_id(&mut self, numeric: NumericType) -> Word {
        self.writer.get_numeric_type_id(numeric)
    }
}

#[expect(missing_debug_implementations, reason = "would be way too verbose?")]
pub struct Writer {
    physical_layout: PhysicalLayout,
    logical_layout: LogicalLayout,
    id_gen: IdGenerator,

    /// The set of capabilities modules are permitted to use.
    ///
    /// This is initialized from `Options::capabilities`.
    capabilities_available: Option<crate::FastHashSet<Capability>>,

    /// The set of capabilities used by this module.
    ///
    /// If `capabilities_available` is `Some`, then this is always a subset of
    /// that.
    capabilities_used: crate::FastIndexSet<Capability>,

    /// The set of spirv extensions used.
    extensions_used: crate::FastIndexSet<&'static str>,

    debug_strings: Vec<Instruction>,
    debugs: Vec<Instruction>,
    annotations: Vec<Instruction>,
    flags: WriterFlags,
    vulkan_memory_model: bool,
    device_scope_used: bool,
    void_type: Word,
    //TODO: convert most of these into vectors, addressable by handle indices
    lookup_type: crate::FastHashMap<LookupType, Word>,
    lookup_function: crate::FastHashMap<Handle<crate::Function>, Word>,
    reference_arguments: crate::FastHashMap<Word, Vec<bool>>,
    lookup_function_type: crate::FastHashMap<LookupFunctionType, Word>,
    /// Indexed by const-expression handle indexes
    constant_ids: HandleVec<crate::Expression, Word>,
    cached_constants: crate::FastHashMap<CachedConstant, Word>,
    nullable_types: Vec<bool>,
    override_ids: Vec<Word>,
    override_dependent: Vec<bool>,
    spec_defaults: Vec<bool>,
    spec_composites: crate::FastHashMap<(Word, Vec<Word>), Word>,
    cooperative_vector_types: crate::FastHashSet<Word>,
    global_variables: HandleVec<crate::GlobalVariable, GlobalVariable>,
    /// The types of the contents of uniform buffers, storage buffers and
    /// push constants. Only these get `Offset`, `ArrayStride` and
    /// `MatrixStride` decorations: SPIR-V does not allow explicit layouts on
    /// types used in other storage classes, such as stage outputs or workgroup
    /// memory.
    laid_out_types: crate::arena::HandleSet<crate::Type>,
    workgroup_explicit_layout: bool,
    aliased_workgroup_blocks: bool,
    composite_types: crate::FastHashMap<Word, plain_types::CompositeType>,
    plain_types: crate::FastHashMap<Word, Word>,
    laid_out_of_plain: crate::FastHashMap<Word, Word>,
    physical_types: crate::FastHashMap<Word, bool>,
    decorated_blocks: crate::arena::HandleSet<crate::Type>,
    nested_types: crate::arena::HandleSet<crate::Type>,
    buffer_blocks: crate::FastHashSet<Word>,
    physical_pointees: crate::FastHashMap<Handle<crate::Type>, crate::StorageAccess>,
    forward_pointers: crate::FastHashMap<Handle<crate::Type>, Word>,
    physical_type_ids: crate::FastHashSet<Word>,
    fake_missing_bindings: bool,
    binding_map: BindingMap,

    // Cached expressions are only meaningful within a BlockContext, but we
    // retain the table here between functions to save heap allocations.
    saved_cached: CachedExpressions,

    gl450_ext_inst_id: Word,

    // Just a temporary list of SPIR-V ids
    temp_list: Vec<Word>,

    has_ray_tracing_pipeline: bool,
    micromap_acceleration_structures: bool,
    legacy_buffer_blocks: bool,
    invariant_outputs: bool,
    legacy_storage_blocks: crate::FastHashSet<Word>,
    mesh_flavor: Option<crate::MeshFlavor>,
    task_memory_strides: crate::FastHashSet<Handle<crate::Type>>,

    ray_tracing_features: crate::RayTracingFeatures,

    /// Non semantic debug printf extension `OpExtInstImport`
    debug_printf: Option<Word>,
    undeclarable_scalar: bool,
    min_version: Option<(u8, u8)>,
    debug_printf_strings: crate::FastHashMap<String, Word>,
    raw_capabilities: crate::FastIndexSet<Word>,
    raw_extensions: crate::FastIndexSet<String>,
    spirv_ext_imports: crate::FastHashMap<String, Word>,
    utf_encoded: crate::FastHashSet<Word>,
    qcom_decorations: crate::FastHashSet<(Word, spirv::Decoration)>,
    laid_out_copies: crate::FastHashMap<Handle<crate::Type>, Word>,

    heap: heap::HeapState,
    descriptor_heap: bool,
    debug: debug::DebugState,
}

bitflags::bitflags! {
    #[derive(Clone, Copy, Debug, Eq, PartialEq)]
    pub struct WriterFlags: u32 {
        /// Include debug labels for everything.
        const DEBUG = 0x1;

        /// Flip Y coordinate of [`BuiltIn::Position`] output.
        ///
        /// [`BuiltIn::Position`]: crate::BuiltIn::Position
        const ADJUST_COORDINATE_SPACE = 0x2;

        /// Emit [`OpName`][op] for input/output locations.
        ///
        /// Contrary to spec, some drivers treat it as semantic, not allowing
        /// any conflicts.
        ///
        /// [op]: https://registry.khronos.org/SPIR-V/specs/unified1/SPIRV.html#OpName
        const LABEL_VARYINGS = 0x4;

        /// Emit [`PointSize`] output builtin to vertex shaders, which is
        /// required for drawing with `PointList` topology.
        ///
        /// [`PointSize`]: crate::BuiltIn::PointSize
        const FORCE_POINT_SIZE = 0x8;

        /// Clamp [`BuiltIn::FragDepth`] output between 0 and 1.
        ///
        /// [`BuiltIn::FragDepth`]: crate::BuiltIn::FragDepth
        const CLAMP_FRAG_DEPTH = 0x10;

        const SMALL_TYPE_CAPABILITIES_BY_USE = 0x80;

        const EXPORT_FUNCTIONS = 0x100;
    }
}

#[derive(Debug, Clone)]
pub struct Options<'a> {
    /// (Major, Minor) target version of the SPIR-V.
    pub lang_version: (u8, u8),

    /// Configuration flags for the writer.
    pub flags: WriterFlags,

    /// Don't panic on missing bindings. Instead use fake values for `Binding`
    /// and `DescriptorSet` decorations. This may result in invalid SPIR-V.
    pub fake_missing_bindings: bool,

    /// Map of resources to information about the binding.
    pub binding_map: BindingMap,

    /// If given, the set of capabilities modules are allowed to use. Code that
    /// requires capabilities beyond these is rejected with an error.
    ///
    /// If this is `None`, all capabilities are permitted.
    pub capabilities: Option<crate::FastHashSet<Capability>>,

    pub debug_info: Option<DebugInfo<'a>>,
}

impl Default for Options<'_> {
    fn default() -> Self {
        let mut flags = WriterFlags::LABEL_VARYINGS;
        if cfg!(debug_assertions) {
            flags |= WriterFlags::DEBUG;
        }
        Options {
            lang_version: (1, 0),
            flags,
            fake_missing_bindings: true,
            binding_map: BindingMap::default(),
            capabilities: None,
            debug_info: None,
        }
    }
}

// A subset of options meant to be changed per pipeline.
#[derive(Debug, Clone)]
#[cfg_attr(feature = "serialize", derive(serde::Serialize))]
#[cfg_attr(feature = "deserialize", derive(serde::Deserialize))]
pub struct PipelineOptions {
    /// The stage of the entry point.
    pub shader_stage: crate::ShaderStage,
    /// The name of the entry point.
    ///
    /// If no entry point that matches is found while creating a [`Writer`], a error will be thrown.
    pub entry_point: String,
}

pub fn minimum_version(module: &crate::Module) -> (u8, u8) {
    if module
        .types
        .iter()
        .any(|(_, ty)| matches!(ty.inner, crate::TypeInner::Tensor { .. }))
    {
        (1, 6)
    } else {
        (1, 0)
    }
}

pub fn write_vec(
    module: &crate::Module,
    info: &crate::valid::ModuleInfo,
    options: &Options,
    pipeline_options: Option<&PipelineOptions>,
) -> Result<Vec<u32>, Error> {
    let mut words: Vec<u32> = Vec::new();
    let minimum = minimum_version(module);
    let raised;
    let options = if options.lang_version < minimum {
        raised = Options {
            lang_version: minimum,
            ..options.clone()
        };
        &raised
    } else {
        options
    };
    let mut w = Writer::new(options)?;

    w.write(module, info, pipeline_options, &mut words)?;
    Ok(words)
}
