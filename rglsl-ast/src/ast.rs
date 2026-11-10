use alloc::boxed::Box;
use alloc::string::String;
use alloc::vec::Vec;
use core::fmt;
use core::ops::{Deref, DerefMut};

use crate::span::Span;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct NodeId(u32);

impl NodeId {
    pub const fn new(index: u32) -> Self {
        Self(index)
    }

    pub const fn index(self) -> u32 {
        self.0
    }
}

impl fmt::Display for NodeId {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(formatter, "#{}", self.0)
    }
}

#[derive(Debug, Clone)]
pub struct Node<K> {
    pub id: NodeId,
    pub span: Span,
    pub kind: K,
}

impl<K> Node<K> {
    pub const fn new(id: NodeId, span: Span, kind: K) -> Self {
        Self { id, span, kind }
    }
}

impl<K: PartialEq> PartialEq for Node<K> {
    fn eq(&self, other: &Self) -> bool {
        self.kind == other.kind
    }
}

impl<K: Eq> Eq for Node<K> {}

impl<K> Deref for Node<K> {
    type Target = K;

    fn deref(&self) -> &K {
        &self.kind
    }
}

impl<K> DerefMut for Node<K> {
    fn deref_mut(&mut self) -> &mut K {
        &mut self.kind
    }
}

#[derive(Debug, Clone)]
pub struct Spanned<T> {
    pub span: Span,
    pub node: T,
}

impl<T> Spanned<T> {
    pub const fn new(span: Span, node: T) -> Self {
        Self { span, node }
    }
}

impl<T: PartialEq> PartialEq for Spanned<T> {
    fn eq(&self, other: &Self) -> bool {
        self.node == other.node
    }
}

impl<T: Eq> Eq for Spanned<T> {}

impl<T> Deref for Spanned<T> {
    type Target = T;

    fn deref(&self) -> &T {
        &self.node
    }
}

impl<T> DerefMut for Spanned<T> {
    fn deref_mut(&mut self) -> &mut T {
        &mut self.node
    }
}

pub type Identifier = Spanned<String>;
pub type Expression = Node<ExpressionKind>;
pub type Statement = Node<StatementKind>;
pub type Declaration = Node<DeclarationKind>;

#[derive(Debug, Clone)]
pub struct TranslationUnit {
    pub external_declarations: Vec<ExternalDeclaration>,
    next_id: u32,
}

impl TranslationUnit {
    pub const fn new(external_declarations: Vec<ExternalDeclaration>, next_id: NodeId) -> Self {
        Self {
            external_declarations,
            next_id: next_id.index(),
        }
    }

    pub const fn next_id(&self) -> NodeId {
        NodeId(self.next_id)
    }

    pub fn allocate_id(&mut self) -> Option<NodeId> {
        let id = NodeId(self.next_id);
        self.next_id = self.next_id.checked_add(1)?;
        Some(id)
    }
}

impl PartialEq for TranslationUnit {
    fn eq(&self, other: &Self) -> bool {
        self.external_declarations == other.external_declarations
    }
}

impl Eq for TranslationUnit {}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ExternalDeclaration {
    Directive(Spanned<Directive>),
    FunctionDefinition(Node<FunctionDefinition>),
    Declaration(Declaration),
    Semicolon(Spanned<()>),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Directive {
    pub raw: String,
    pub kind: DirectiveKind,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum DirectiveKind {
    Version {
        number: u32,
        profile: Option<String>,
    },
    Extension {
        name: String,
        behavior: ExtensionBehavior,
    },
    Pragma {
        tokens: Vec<String>,
    },
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum ExtensionBehavior {
    Require,
    Enable,
    Warn,
    Disable,
}

impl ExtensionBehavior {
    pub const fn keyword(self) -> &'static str {
        match self {
            Self::Require => "require",
            Self::Enable => "enable",
            Self::Warn => "warn",
            Self::Disable => "disable",
        }
    }

    pub fn from_keyword(word: &str) -> Option<Self> {
        match word {
            "require" => Some(Self::Require),
            "enable" => Some(Self::Enable),
            "warn" => Some(Self::Warn),
            "disable" => Some(Self::Disable),
            _ => None,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct FunctionDefinition {
    pub prototype: Spanned<FunctionPrototype>,
    pub body: Spanned<CompoundStatement>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum DeclarationKind {
    FunctionPrototype(Spanned<FunctionPrototype>),
    InitDeclaratorList(InitDeclaratorList),
    Precision {
        qualifier: Spanned<PrecisionQualifier>,
        ty: Spanned<TypeSpecifier>,
    },
    Block {
        structure: BlockStructure,
        instance: Option<Spanned<BlockInstance>>,
    },
    Qualifier(Spanned<TypeQualifier>),
    QualifiedIdentifiers {
        qualifier: Spanned<TypeQualifier>,
        identifiers: Vec<Identifier>,
    },
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct FunctionPrototype {
    pub return_type: Spanned<FullySpecifiedType>,
    pub name: Identifier,
    pub parameters: Vec<Node<ParameterDeclaration>>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ParameterDeclaration {
    pub ty: Spanned<FullySpecifiedType>,
    pub name: Option<Identifier>,
    pub array: Option<Spanned<ArraySpecifier>>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InitDeclaratorList {
    pub ty: Spanned<FullySpecifiedType>,
    pub declarators: Vec<Node<InitDeclarator>>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InitDeclarator {
    pub name: Identifier,
    pub array: Option<Spanned<ArraySpecifier>>,
    pub initializer: Option<Spanned<Initializer>>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Initializer {
    Expression(Expression),
    List(Vec<Spanned<Initializer>>),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct BlockStructure {
    pub qualifier: Spanned<TypeQualifier>,
    pub name: Identifier,
    pub members: Vec<Spanned<StructDeclaration>>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct BlockInstance {
    pub name: Identifier,
    pub array: Option<Spanned<ArraySpecifier>>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct FullySpecifiedType {
    pub qualifier: Option<Spanned<TypeQualifier>>,
    pub specifier: Spanned<TypeSpecifier>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TypeQualifier {
    pub qualifiers: Vec<Spanned<SingleTypeQualifier>>,
}

impl TypeQualifier {
    pub fn has_layout(&self, name: &str) -> bool {
        self.qualifiers.iter().any(|single| match single.node {
            SingleTypeQualifier::Layout(ref layout) => layout
                .ids
                .iter()
                .any(|id| id.name.node.eq_ignore_ascii_case(name)),
            _ => false,
        })
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum SingleTypeQualifier {
    Storage(StorageQualifier),
    Subroutine(Vec<Identifier>),
    Layout(LayoutQualifier),
    Precision(PrecisionQualifier),
    Interpolation(InterpolationQualifier),
    Invariant,
    Precise,
    NonUniform,
}

impl SingleTypeQualifier {
    pub fn from_keyword(word: &str) -> Option<Self> {
        match word {
            "invariant" => Some(Self::Invariant),
            "precise" => Some(Self::Precise),
            "nonuniformEXT" => Some(Self::NonUniform),
            _ => StorageQualifier::from_keyword(word)
                .map(Self::Storage)
                .or_else(|| PrecisionQualifier::from_keyword(word).map(Self::Precision))
                .or_else(|| InterpolationQualifier::from_keyword(word).map(Self::Interpolation)),
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum StorageQualifier {
    Const,
    In,
    Out,
    Inout,
    Centroid,
    Patch,
    Sample,
    Uniform,
    Buffer,
    Shared,
    Coherent,
    Volatile,
    Restrict,
    Readonly,
    Writeonly,
    Attribute,
    Varying,
    DeviceCoherent,
    QueueFamilyCoherent,
    WorkgroupCoherent,
    SubgroupCoherent,
    ShaderCallCoherent,
    NonPrivate,
    ResourceHeap,
    SamplerHeap,
    RayPayloadNV,
    RayPayloadEXT,
    RayPayloadInNV,
    RayPayloadInEXT,
    HitAttributeNV,
    HitAttributeEXT,
    CallableDataNV,
    CallableDataEXT,
    CallableDataInNV,
    CallableDataInEXT,
}

impl StorageQualifier {
    pub const ALL: [Self; 35] = [
        Self::Const,
        Self::In,
        Self::Out,
        Self::Inout,
        Self::Centroid,
        Self::Patch,
        Self::Sample,
        Self::Uniform,
        Self::Buffer,
        Self::Shared,
        Self::Coherent,
        Self::Volatile,
        Self::Restrict,
        Self::Readonly,
        Self::Writeonly,
        Self::Attribute,
        Self::Varying,
        Self::DeviceCoherent,
        Self::QueueFamilyCoherent,
        Self::WorkgroupCoherent,
        Self::SubgroupCoherent,
        Self::ShaderCallCoherent,
        Self::NonPrivate,
        Self::ResourceHeap,
        Self::SamplerHeap,
        Self::RayPayloadNV,
        Self::RayPayloadEXT,
        Self::RayPayloadInNV,
        Self::RayPayloadInEXT,
        Self::HitAttributeNV,
        Self::HitAttributeEXT,
        Self::CallableDataNV,
        Self::CallableDataEXT,
        Self::CallableDataInNV,
        Self::CallableDataInEXT,
    ];

    pub const fn keyword(self) -> &'static str {
        match self {
            Self::Const => "const",
            Self::In => "in",
            Self::Out => "out",
            Self::Inout => "inout",
            Self::Centroid => "centroid",
            Self::Patch => "patch",
            Self::Sample => "sample",
            Self::Uniform => "uniform",
            Self::Buffer => "buffer",
            Self::Shared => "shared",
            Self::Coherent => "coherent",
            Self::Volatile => "volatile",
            Self::Restrict => "restrict",
            Self::Readonly => "readonly",
            Self::Writeonly => "writeonly",
            Self::Attribute => "attribute",
            Self::Varying => "varying",
            Self::DeviceCoherent => "devicecoherent",
            Self::QueueFamilyCoherent => "queuefamilycoherent",
            Self::WorkgroupCoherent => "workgroupcoherent",
            Self::SubgroupCoherent => "subgroupcoherent",
            Self::ShaderCallCoherent => "shadercallcoherent",
            Self::NonPrivate => "nonprivate",
            Self::ResourceHeap => "resourceheap",
            Self::SamplerHeap => "samplerheap",
            Self::RayPayloadNV => "rayPayloadNV",
            Self::RayPayloadEXT => "rayPayloadEXT",
            Self::RayPayloadInNV => "rayPayloadInNV",
            Self::RayPayloadInEXT => "rayPayloadInEXT",
            Self::HitAttributeNV => "hitAttributeNV",
            Self::HitAttributeEXT => "hitAttributeEXT",
            Self::CallableDataNV => "callableDataNV",
            Self::CallableDataEXT => "callableDataEXT",
            Self::CallableDataInNV => "callableDataInNV",
            Self::CallableDataInEXT => "callableDataInEXT",
        }
    }

    pub fn from_keyword(word: &str) -> Option<Self> {
        Self::ALL
            .into_iter()
            .find(|qualifier| qualifier.keyword() == word)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum PrecisionQualifier {
    High,
    Medium,
    Low,
}

impl PrecisionQualifier {
    pub const fn keyword(self) -> &'static str {
        match self {
            Self::High => "highp",
            Self::Medium => "mediump",
            Self::Low => "lowp",
        }
    }

    pub fn from_keyword(word: &str) -> Option<Self> {
        match word {
            "highp" => Some(Self::High),
            "mediump" => Some(Self::Medium),
            "lowp" => Some(Self::Low),
            _ => None,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum InterpolationQualifier {
    Smooth,
    Flat,
    Noperspective,
}

impl InterpolationQualifier {
    pub const fn keyword(self) -> &'static str {
        match self {
            Self::Smooth => "smooth",
            Self::Flat => "flat",
            Self::Noperspective => "noperspective",
        }
    }

    pub fn from_keyword(word: &str) -> Option<Self> {
        match word {
            "smooth" => Some(Self::Smooth),
            "flat" => Some(Self::Flat),
            "noperspective" => Some(Self::Noperspective),
            _ => None,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct LayoutQualifier {
    pub ids: Vec<Spanned<LayoutQualifierId>>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct LayoutQualifierId {
    pub name: Identifier,
    pub value: Option<Expression>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TypeSpecifier {
    pub non_array: TypeSpecifierNonArray,
    pub parameters: Option<Spanned<TypeParameters>>,
    pub array: Option<Spanned<ArraySpecifier>>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TypeParameters {
    pub element: Option<Box<Spanned<TypeSpecifier>>>,
    pub values: Vec<Expression>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum ParameterizedType {
    CooperativeMatrix,
    FloatCooperativeMatrixNv,
    IntCooperativeMatrixNv,
    UintCooperativeMatrixNv,
    CooperativeVectorNv,
    LongVector,
    TensorLayoutNv,
    TensorViewNv,
}

impl ParameterizedType {
    pub const ALL: [Self; 8] = [
        Self::CooperativeMatrix,
        Self::FloatCooperativeMatrixNv,
        Self::IntCooperativeMatrixNv,
        Self::UintCooperativeMatrixNv,
        Self::CooperativeVectorNv,
        Self::LongVector,
        Self::TensorLayoutNv,
        Self::TensorViewNv,
    ];

    pub const fn keyword(self) -> &'static str {
        match self {
            Self::CooperativeMatrix => "coopmat",
            Self::FloatCooperativeMatrixNv => "fcoopmatNV",
            Self::IntCooperativeMatrixNv => "icoopmatNV",
            Self::UintCooperativeMatrixNv => "ucoopmatNV",
            Self::CooperativeVectorNv => "coopvecNV",
            Self::LongVector => "vector",
            Self::TensorLayoutNv => "tensorLayoutNV",
            Self::TensorViewNv => "tensorViewNV",
        }
    }

    pub fn from_keyword(word: &str) -> Option<Self> {
        Self::ALL.into_iter().find(|kind| kind.keyword() == word)
    }

    pub const fn is_nv_matrix(self) -> bool {
        matches!(
            self,
            Self::FloatCooperativeMatrixNv
                | Self::IntCooperativeMatrixNv
                | Self::UintCooperativeMatrixNv
        )
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum TypeSpecifierNonArray {
    Void,
    Basic(BasicType),
    Opaque(String),
    Parameterized(ParameterizedType),
    Struct(StructSpecifier),
    TypeName(String),
    InlineBlock(Vec<Spanned<StructDeclaration>>),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ArraySpecifier {
    pub dimensions: Vec<Spanned<ArrayDimension>>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ArrayDimension {
    Unsized,
    Sized(Expression),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum ScalarType {
    Bool,
    Int,
    Uint,
    Float,
    Double,
    Int8,
    Uint8,
    Int16,
    Uint16,
    Int64,
    Uint64,
    Float16,
}

impl ScalarType {
    pub const ALL: [Self; 12] = [
        Self::Bool,
        Self::Int,
        Self::Uint,
        Self::Float,
        Self::Double,
        Self::Int8,
        Self::Uint8,
        Self::Int16,
        Self::Uint16,
        Self::Int64,
        Self::Uint64,
        Self::Float16,
    ];

    pub const fn keyword(self) -> &'static str {
        match self {
            Self::Bool => "bool",
            Self::Int => "int",
            Self::Uint => "uint",
            Self::Float => "float",
            Self::Double => "double",
            Self::Int8 => "int8_t",
            Self::Uint8 => "uint8_t",
            Self::Int16 => "int16_t",
            Self::Uint16 => "uint16_t",
            Self::Int64 => "int64_t",
            Self::Uint64 => "uint64_t",
            Self::Float16 => "float16_t",
        }
    }

    pub const fn vector_prefix(self) -> &'static str {
        match self {
            Self::Bool => "bvec",
            Self::Int => "ivec",
            Self::Uint => "uvec",
            Self::Float => "vec",
            Self::Double => "dvec",
            Self::Int8 => "i8vec",
            Self::Uint8 => "u8vec",
            Self::Int16 => "i16vec",
            Self::Uint16 => "u16vec",
            Self::Int64 => "i64vec",
            Self::Uint64 => "u64vec",
            Self::Float16 => "f16vec",
        }
    }

    pub const fn matrix_prefix(self) -> Option<&'static str> {
        match self {
            Self::Float => Some("mat"),
            Self::Double => Some("dmat"),
            Self::Float16 => Some("f16mat"),
            _ => None,
        }
    }

    fn from_scalar_keyword(word: &str) -> Option<Self> {
        Some(match word {
            "int32_t" => Self::Int,
            "uint32_t" => Self::Uint,
            "float32_t" => Self::Float,
            "float64_t" => Self::Double,
            _ => {
                return Self::ALL
                    .into_iter()
                    .find(|scalar| scalar.keyword() == word)
            }
        })
    }

    fn vector_prefixes() -> impl Iterator<Item = (&'static str, Self)> {
        Self::ALL
            .into_iter()
            .map(|scalar| (scalar.vector_prefix(), scalar))
            .chain([
                ("i32vec", Self::Int),
                ("u32vec", Self::Uint),
                ("f32vec", Self::Float),
                ("f64vec", Self::Double),
            ])
    }

    fn matrix_prefixes() -> impl Iterator<Item = (&'static str, Self)> {
        Self::ALL
            .into_iter()
            .filter_map(|scalar| scalar.matrix_prefix().map(|prefix| (prefix, scalar)))
            .chain([("f32mat", Self::Float), ("f64mat", Self::Double)])
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Dimension {
    Two,
    Three,
    Four,
}

impl Dimension {
    pub const fn count(self) -> u32 {
        match self {
            Self::Two => 2,
            Self::Three => 3,
            Self::Four => 4,
        }
    }

    fn from_digit(digit: &str) -> Option<Self> {
        match digit {
            "2" => Some(Self::Two),
            "3" => Some(Self::Three),
            "4" => Some(Self::Four),
            _ => None,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum BasicType {
    Scalar(ScalarType),
    Vector {
        scalar: ScalarType,
        size: Dimension,
    },
    Matrix {
        scalar: ScalarType,
        columns: Dimension,
        rows: Dimension,
    },
}

impl BasicType {
    pub fn from_keyword(word: &str) -> Option<Self> {
        if let Some(scalar) = ScalarType::from_scalar_keyword(word) {
            return Some(Self::Scalar(scalar));
        }
        for (prefix, scalar) in ScalarType::vector_prefixes() {
            if let Some(size) = word.strip_prefix(prefix).and_then(Dimension::from_digit) {
                return Some(Self::Vector { scalar, size });
            }
        }
        for (prefix, scalar) in ScalarType::matrix_prefixes() {
            let Some(shape) = word.strip_prefix(prefix) else {
                continue;
            };
            let (columns, rows) = match shape.split_once('x') {
                Some((columns, rows)) => {
                    (Dimension::from_digit(columns), Dimension::from_digit(rows))
                }
                None => (Dimension::from_digit(shape), Dimension::from_digit(shape)),
            };
            if let (Some(columns), Some(rows)) = (columns, rows) {
                return Some(Self::Matrix {
                    scalar,
                    columns,
                    rows,
                });
            }
        }
        None
    }
}

impl fmt::Display for BasicType {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match *self {
            Self::Scalar(scalar) => formatter.write_str(scalar.keyword()),
            Self::Vector { scalar, size } => {
                write!(formatter, "{}{}", scalar.vector_prefix(), size.count())
            }
            Self::Matrix {
                scalar,
                columns,
                rows,
            } => {
                let prefix = scalar.matrix_prefix().unwrap_or("mat");
                if columns == rows {
                    write!(formatter, "{prefix}{}", columns.count())
                } else {
                    write!(formatter, "{prefix}{}x{}", columns.count(), rows.count())
                }
            }
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct StructSpecifier {
    pub name: Option<Identifier>,
    pub declarations: Vec<Spanned<StructDeclaration>>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct StructDeclaration {
    pub ty: Spanned<FullySpecifiedType>,
    pub declarators: Vec<Spanned<StructDeclarator>>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct StructDeclarator {
    pub name: Identifier,
    pub array: Option<Spanned<ArraySpecifier>>,
}

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct CompoundStatement {
    pub statements: Vec<Statement>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum StatementKind {
    Compound(CompoundStatement),
    Declaration(Box<Declaration>),
    Expression(Option<Expression>),
    Selection {
        condition: Expression,
        then_branch: Box<Statement>,
        else_branch: Option<Box<Statement>>,
    },
    Switch {
        selector: Expression,
        statements: Vec<Statement>,
    },
    CaseLabel(CaseLabel),
    While {
        condition: Condition,
        body: Box<Statement>,
    },
    DoWhile {
        body: Box<Statement>,
        condition: Expression,
    },
    For(Box<ForStatement>),
    Jump(JumpStatement),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ForStatement {
    pub init: Statement,
    pub condition: Option<Condition>,
    pub increment: Option<Expression>,
    pub body: Statement,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum CaseLabel {
    Case(Expression),
    Default,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Condition {
    Expression(Expression),
    Declaration(Box<Node<ConditionDeclaration>>),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ConditionDeclaration {
    pub ty: Spanned<FullySpecifiedType>,
    pub name: Identifier,
    pub initializer: Spanned<Initializer>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum JumpStatement {
    Continue,
    Break,
    Return(Option<Expression>),
    Discard,
    TerminateRay,
    IgnoreIntersection,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum NumericKind {
    Int,
    Uint,
    Float,
    Double,
    Int16,
    Uint16,
    Int64,
    Uint64,
    Float16,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct NumericLiteral {
    pub kind: NumericKind,
    pub text: String,
}

impl NumericLiteral {
    pub fn suffix(&self) -> &str {
        let letters: &[char] = match self.kind {
            NumericKind::Float | NumericKind::Double | NumericKind::Float16 => {
                &['f', 'F', 'h', 'H', 'l', 'L']
            }
            _ => &['u', 'U', 'l', 'L', 's', 'S'],
        };
        let digits = self.text.trim_end_matches(letters);
        self.text.get(digits.len()..).unwrap_or("")
    }

    pub fn digits(&self) -> &str {
        let split = self.text.len().saturating_sub(self.suffix().len());
        self.text.get(..split).unwrap_or(&self.text)
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ExpressionKind {
    Variable(String),
    Number(NumericLiteral),
    Bool(bool),
    String(String),
    Parenthesized(Box<Expression>),
    Subscript {
        base: Box<Expression>,
        index: Box<Expression>,
    },
    FunctionCall(Box<FunctionCall>),
    FieldSelection {
        base: Box<Expression>,
        field: Identifier,
    },
    Postfix {
        operand: Box<Expression>,
        operator: PostfixOperator,
    },
    Unary {
        operator: UnaryOperator,
        operand: Box<Expression>,
    },
    Binary {
        operator: BinaryOperator,
        left: Box<Expression>,
        right: Box<Expression>,
    },
    Conditional {
        condition: Box<Expression>,
        then_expression: Box<Expression>,
        else_expression: Box<Expression>,
    },
    Assignment {
        operator: AssignmentOperator,
        target: Box<Expression>,
        value: Box<Expression>,
    },
    Sequence(Vec<Expression>),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct FunctionCall {
    pub function: Spanned<FunctionIdentifier>,
    pub arguments: Vec<Expression>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum FunctionIdentifier {
    Constructor(Box<TypeSpecifier>),
    Function(String),
    Expression(Box<Expression>),
    Method {
        object: Box<Expression>,
        name: Identifier,
    },
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum PostfixOperator {
    Increment,
    Decrement,
}

impl PostfixOperator {
    pub const fn symbol(self) -> &'static str {
        match self {
            Self::Increment => "++",
            Self::Decrement => "--",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum UnaryOperator {
    Increment,
    Decrement,
    Plus,
    Minus,
    LogicalNot,
    BitNot,
}

impl UnaryOperator {
    pub const fn symbol(self) -> &'static str {
        match self {
            Self::Increment => "++",
            Self::Decrement => "--",
            Self::Plus => "+",
            Self::Minus => "-",
            Self::LogicalNot => "!",
            Self::BitNot => "~",
        }
    }

    pub fn from_symbol(symbol: &str) -> Option<Self> {
        match symbol {
            "++" => Some(Self::Increment),
            "--" => Some(Self::Decrement),
            "+" => Some(Self::Plus),
            "-" => Some(Self::Minus),
            "!" => Some(Self::LogicalNot),
            "~" => Some(Self::BitNot),
            _ => None,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum BinaryOperator {
    Multiply,
    Divide,
    Modulo,
    Add,
    Subtract,
    ShiftLeft,
    ShiftRight,
    Less,
    Greater,
    LessEqual,
    GreaterEqual,
    Equal,
    NotEqual,
    BitAnd,
    BitXor,
    BitOr,
    LogicalAnd,
    LogicalXor,
    LogicalOr,
}

impl BinaryOperator {
    pub const ALL: [Self; 19] = [
        Self::Multiply,
        Self::Divide,
        Self::Modulo,
        Self::Add,
        Self::Subtract,
        Self::ShiftLeft,
        Self::ShiftRight,
        Self::Less,
        Self::Greater,
        Self::LessEqual,
        Self::GreaterEqual,
        Self::Equal,
        Self::NotEqual,
        Self::BitAnd,
        Self::BitXor,
        Self::BitOr,
        Self::LogicalAnd,
        Self::LogicalXor,
        Self::LogicalOr,
    ];

    pub const fn symbol(self) -> &'static str {
        match self {
            Self::Multiply => "*",
            Self::Divide => "/",
            Self::Modulo => "%",
            Self::Add => "+",
            Self::Subtract => "-",
            Self::ShiftLeft => "<<",
            Self::ShiftRight => ">>",
            Self::Less => "<",
            Self::Greater => ">",
            Self::LessEqual => "<=",
            Self::GreaterEqual => ">=",
            Self::Equal => "==",
            Self::NotEqual => "!=",
            Self::BitAnd => "&",
            Self::BitXor => "^",
            Self::BitOr => "|",
            Self::LogicalAnd => "&&",
            Self::LogicalXor => "^^",
            Self::LogicalOr => "||",
        }
    }

    pub fn from_symbol(symbol: &str) -> Option<Self> {
        Self::ALL
            .into_iter()
            .find(|operator| operator.symbol() == symbol)
    }

    pub const fn precedence(self) -> u8 {
        match self {
            Self::LogicalOr => 1,
            Self::LogicalXor => 2,
            Self::LogicalAnd => 3,
            Self::BitOr => 4,
            Self::BitXor => 5,
            Self::BitAnd => 6,
            Self::Equal | Self::NotEqual => 7,
            Self::Less | Self::Greater | Self::LessEqual | Self::GreaterEqual => 8,
            Self::ShiftLeft | Self::ShiftRight => 9,
            Self::Add | Self::Subtract => 10,
            Self::Multiply | Self::Divide | Self::Modulo => 11,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum AssignmentOperator {
    Assign,
    Multiply,
    Divide,
    Modulo,
    Add,
    Subtract,
    ShiftLeft,
    ShiftRight,
    BitAnd,
    BitXor,
    BitOr,
}

impl AssignmentOperator {
    pub const ALL: [Self; 11] = [
        Self::Assign,
        Self::Multiply,
        Self::Divide,
        Self::Modulo,
        Self::Add,
        Self::Subtract,
        Self::ShiftLeft,
        Self::ShiftRight,
        Self::BitAnd,
        Self::BitXor,
        Self::BitOr,
    ];

    pub const fn symbol(self) -> &'static str {
        match self {
            Self::Assign => "=",
            Self::Multiply => "*=",
            Self::Divide => "/=",
            Self::Modulo => "%=",
            Self::Add => "+=",
            Self::Subtract => "-=",
            Self::ShiftLeft => "<<=",
            Self::ShiftRight => ">>=",
            Self::BitAnd => "&=",
            Self::BitXor => "^=",
            Self::BitOr => "|=",
        }
    }

    pub fn from_symbol(symbol: &str) -> Option<Self> {
        Self::ALL
            .into_iter()
            .find(|operator| operator.symbol() == symbol)
    }
}
