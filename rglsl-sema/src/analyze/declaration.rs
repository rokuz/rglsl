use alloc::string::String;
use alloc::vec::Vec;
use core::cell::RefCell;

use rglsl_types::stack::run;

use rglsl_ast::ast::{
    ArrayDimension, ArraySpecifier, BlockInstance, BlockStructure, Declaration, DeclarationKind,
    Expression, FullySpecifiedType, FunctionDefinition, FunctionPrototype, Identifier,
    InitDeclarator, InitDeclaratorList, Initializer, InterpolationQualifier, Node,
    ParameterDeclaration, SingleTypeQualifier, Spanned, StorageQualifier, StructDeclaration,
    StructSpecifier, TypeQualifier, TypeSpecifier, TypeSpecifierNonArray,
};
use rglsl_ast::Span;

use super::frames::Cx;
use super::heap::is_heap_storage;
use super::{Analyzer, DerivativeGroup, FunctionContext, Operand, Place};
use crate::builtins::Stage;
use crate::constant::{Constant, Value};
use crate::diagnostic::DiagnosticKind;
use crate::scope::{
    Direction, Function, FunctionControl, FunctionId, LayoutEntry, Lookup, Origin, Parameter,
    PrecisionKey, Qualifiers, Storage, SymbolId, SymbolKind,
};
use crate::types::{
    ArraySize, BlockStorage, BlockType, Member, Opaque, OpaqueKind, Scalar, SpecializedSize, Type,
    TypeKind,
};

pub(crate) const IMAGE_FORMATS: [&str; 41] = [
    "rgba32f",
    "rgba16f",
    "rg32f",
    "rg16f",
    "r11f_g11f_b10f",
    "r32f",
    "r16f",
    "rgba16",
    "rgb10_a2",
    "rgba8",
    "rg16",
    "rg8",
    "r16",
    "r8",
    "rgba16_snorm",
    "rgba8_snorm",
    "rg16_snorm",
    "rg8_snorm",
    "r16_snorm",
    "r8_snorm",
    "rgba32i",
    "rgba16i",
    "rgba8i",
    "rg32i",
    "rg16i",
    "rg8i",
    "r32i",
    "r16i",
    "r8i",
    "rgba32ui",
    "rgba16ui",
    "rgb10_a2ui",
    "rgba8ui",
    "rg32ui",
    "rg16ui",
    "rg8ui",
    "r32ui",
    "r16ui",
    "r8ui",
    "r64i",
    "r64ui",
];

#[derive(Debug, Clone, Copy)]
struct MemberPlace<'q> {
    in_block: Option<&'q Qualifiers>,
    in_heap: bool,
    last: bool,
}

struct List {
    element_types: Vec<Type>,
    result: Type,
    mismatch: bool,
    constant: bool,
    values: Option<Vec<Value>>,
    failed: bool,
    uses: u32,
}

struct Placement {
    in_block: Option<Qualifiers>,
    in_heap: bool,
    last: bool,
}

impl Placement {
    const fn place(&self) -> MemberPlace<'_> {
        MemberPlace {
            in_block: self.in_block.as_ref(),
            in_heap: self.in_heap,
            last: self.last,
        }
    }
}

impl Analyzer<'_> {
    pub(crate) fn declaration(&mut self, declaration: &Declaration) {
        match &declaration.kind {
            DeclarationKind::FunctionPrototype(prototype) => {
                self.function_prototype(declaration.id, prototype, false, None);
            }
            DeclarationKind::SpirvInstruction {
                instruction,
                prototype,
            } => {
                self.spirv_requirements(&instruction.requirements);
                let spirv = self.spirv_instruction(&instruction.qualifiers);
                self.function_prototype(declaration.id, prototype, false, Some(spirv));
            }
            DeclarationKind::SpirvExecutionMode(mode) => self.spirv_execution_mode(mode),
            DeclarationKind::InitDeclaratorList(list) => self.init_declarator_list(list),
            DeclarationKind::Precision { qualifier, ty } => {
                if let Some(key) = precision_key(ty) {
                    self.scopes.set_default_precision(key, qualifier.node);
                }
            }
            DeclarationKind::Block {
                structure,
                instance,
            } => self.block(declaration, structure, instance.as_ref()),
            DeclarationKind::Qualifier(qualifier) => self.global_qualifier(qualifier),
            DeclarationKind::QualifiedIdentifiers {
                qualifier,
                identifiers,
            } => {
                let qualifiers = self.qualifiers(qualifier);
                if self.forward_references(qualifier, &qualifiers, identifiers) {
                    return;
                }
                for identifier in identifiers {
                    if self.opacity_micromap_specialization(
                        identifier.span,
                        &qualifiers,
                        &identifier.node,
                    ) {
                        continue;
                    }
                    match self.lookup(&identifier.node) {
                        None => self.error(
                            identifier.span,
                            DiagnosticKind::UndeclaredIdentifier(identifier.node.clone()),
                        ),
                        Some(Lookup::Symbol(id)) if qualifiers.precise => self.make_precise(id),
                        Some(_) => {}
                    }
                }
            }
        }
    }

    fn make_precise(&mut self, id: SymbolId) {
        let member = match self.symbol_mut(id).map(|symbol| &mut symbol.kind) {
            Some(SymbolKind::Variable(variable)) => {
                variable.qualifiers.precise = true;
                return;
            }
            Some(SymbolKind::BlockMember { instance, index }) => (*instance, *index),
            _ => return,
        };
        let (instance, index) = member;
        let TypeKind::Block(block) = self.symbol_type(instance).kind else {
            return;
        };
        if let Some(member) = self
            .types
            .block_mut(block)
            .and_then(|block| block.members.get_mut(usize::try_from(index).ok()?))
        {
            member.qualifiers.precise = true;
        }
    }

    fn global_qualifier(&mut self, qualifier: &Spanned<TypeQualifier>) {
        let qualifiers = self.qualifiers(qualifier);
        self.primitive_culling(qualifier.span, &qualifiers, true);
        self.qcom_layout(qualifier.span, &qualifiers);
        self.shader_record_default(qualifier.span, &qualifiers);
        if self.buffer_reference_layout(&qualifiers) {
            if qualifiers.storage != Storage::Buffer {
                self.error(
                    qualifier.span,
                    super::reference::invalid("can only be used with buffer"),
                );
            }
            self.error(
                qualifier.span,
                super::reference::invalid("cannot declare a default, can only be used on a block"),
            );
        }
        self.record_buffer_defaults(&qualifiers);
        self.standalone_stage_layout(&qualifiers);
        self.fragment_layouts(&qualifiers);
        self.task_payload_type_only(qualifier.span, &qualifiers);
        if qualifiers.storage == Storage::Out {
            self.resize_mesh_arrays(qualifier.span);
        }
        if qualifiers.storage == Storage::Out {
            if let Some(vertices) = qualifiers
                .layout_entry("vertices")
                .and_then(|entry| entry.value)
                .and_then(|value| u32::try_from(value).ok())
            {
                if self.stage_is(Stage::TessControl) && self.output_array_size.is_none() {
                    self.output_array_size = Some(vertices);
                    self.resize_interface_arrays(qualifier.span, Storage::Out, vertices);
                }
            }
        }
        if qualifiers.storage != Storage::In {
            return;
        }
        self.input_layout(qualifier.span, &qualifiers);
        self.derivative_layout(qualifier.span, &qualifiers);
        for entry in &qualifiers.layout {
            let name = entry.name.to_ascii_lowercase();
            if matches!(name.as_str(), "full_quads" | "quad_derivatives") {
                self.require_extension(
                    qualifier.span,
                    crate::builtins::subgroup::QUAD_CONTROL,
                    &name,
                );
            }
        }
        let names = ["local_size_x", "local_size_y", "local_size_z"];
        let identifiers = ["local_size_x_id", "local_size_y_id", "local_size_z_id"];
        for index in 0..3 {
            if let (Some(name), Some(identifier)) = (names.get(index), identifiers.get(index)) {
                if let Some(entry) = qualifiers.layout_entry(name) {
                    if entry.value == Some(0) {
                        self.error(
                            entry.span,
                            DiagnosticKind::InvalidQualifier {
                                qualifier: name,
                                reason: "must be at least 1",
                            },
                        );
                    }
                    let value = entry.value.and_then(|value| u32::try_from(value).ok());
                    let changed = self
                        .local_size
                        .get(index)
                        .copied()
                        .flatten()
                        .is_some_and(|previous| value.is_some_and(|value| value != previous));
                    if changed {
                        self.local_size_changed(entry.span);
                    } else if let Some(slot) = self.local_size.get_mut(index) {
                        *slot = value;
                    }
                }
                if let Some(entry) = qualifiers.layout_entry(identifier) {
                    let changed = self
                        .local_size_ids
                        .get(index)
                        .copied()
                        .flatten()
                        .is_some_and(|previous| entry.value.is_some_and(|value| value != previous));
                    if changed {
                        self.local_size_changed(entry.span);
                    } else if let Some(slot) = self.local_size_ids.get_mut(index) {
                        *slot = entry.value;
                    }
                    if let Some(slot) = self.local_size_specialized.get_mut(index) {
                        *slot = true;
                    }
                }
            }
        }
        self.builtin_name("gl_WorkGroupSize");
        let Some(id) = self.work_group_size else {
            return;
        };
        if names
            .iter()
            .chain(&identifiers)
            .any(|name| qualifiers.has_layout(name))
        {
            self.local_size_declared = true;
        }
        for (index, name) in names.iter().enumerate() {
            let Some(value) = qualifiers
                .layout_entry(name)
                .and_then(|entry| entry.value)
                .and_then(|value| u32::try_from(value).ok())
            else {
                continue;
            };
            let Some(SymbolKind::Variable(variable)) =
                self.symbol_mut(id).map(|symbol| &mut symbol.kind)
            else {
                continue;
            };
            if let Some(slot) = variable
                .value
                .as_mut()
                .and_then(|constant| constant.values.get_mut(index))
            {
                *slot = Value::Uint(value);
            }
        }
    }

    fn derivative_layout(&mut self, span: Span, qualifiers: &Qualifiers) {
        if !matches!(self.stage(), Stage::Compute | Stage::Task | Stage::Mesh) {
            return;
        }
        let mut quads = false;
        let mut linear = false;
        let mut khr = false;
        for entry in &qualifiers.layout {
            match entry.name.to_ascii_lowercase().as_str() {
                "derivative_group_quadskhr" => {
                    quads = true;
                    khr = true;
                    self.khr_derivative_group = true;
                }
                "derivative_group_linearkhr" => {
                    linear = true;
                    khr = true;
                    self.khr_derivative_group = true;
                }
                "derivative_group_quadsnv" | "derivative_group_linearnv"
                    if !self.stage_is(Stage::Compute) =>
                {
                    self.error(
                        entry.span,
                        DiagnosticKind::InvalidQualifier {
                            qualifier: "derivative_group_*NV",
                            reason: "can only apply to compute shaders",
                        },
                    );
                }
                "derivative_group_quadsnv" => {
                    quads = true;
                    khr = false;
                }
                "derivative_group_linearnv" => {
                    linear = true;
                    khr = false;
                }
                _ => {}
            }
        }
        let group = match (quads, linear) {
            (false, false) => return,
            (true, false) => DerivativeGroup::Quads,
            (false, true) => DerivativeGroup::Linear,
            (true, true) => {
                self.error(span, both_derivative_groups());
                return;
            }
        };
        match self.derivative_group {
            Some((previous, _)) if previous != group => {
                self.error(span, both_derivative_groups());
            }
            _ => self.derivative_group = Some((group, khr)),
        }
    }

    fn resize_interface_arrays(&mut self, span: Span, storage: Storage, size: u32) {
        let mut mismatched = Vec::new();
        for symbol in &mut self.symbols {
            let SymbolKind::Variable(variable) = &mut symbol.kind else {
                continue;
            };
            let is_interface = variable.qualifiers.storage == storage
                && !variable.qualifiers.patch
                && variable.origin != Origin::Parameter
                && variable.origin != Origin::Local;
            if !is_interface {
                continue;
            }
            match variable.ty.outer_size() {
                Some(ArraySize::Unsized) => variable.ty.set_outer_size(ArraySize::Sized(size)),
                Some(ArraySize::Sized(declared)) if declared != size => {
                    mismatched.push(symbol.name.clone());
                }
                _ => {}
            }
        }
        if storage == Storage::In && !self.stage_is(Stage::Geometry) {
            return;
        }
        for name in mismatched {
            self.error(
                span,
                DiagnosticKind::InvalidInterfaceArray {
                    name,
                    reason: "its size does not match the input primitive",
                },
            );
        }
    }

    fn input_layout(&mut self, span: Span, qualifiers: &Qualifiers) {
        if !self.stage_is(Stage::Geometry) {
            return;
        }
        let primitives = [
            ("points", 1),
            ("lines", 2),
            ("lines_adjacency", 4),
            ("triangles", 3),
            ("triangles_adjacency", 6),
        ];
        for (name, size) in primitives {
            if qualifiers.has_layout(name) && self.input_array_size.is_none() {
                self.input_array_size = Some(size);
                self.resize_interface_arrays(span, Storage::In, size);
            }
        }
    }

    pub(crate) fn qualifiers(&mut self, qualifier: &Spanned<TypeQualifier>) -> Qualifiers {
        let finished = {
            let analyzer = RefCell::new(&mut *self);
            run(|stack| Cx::new(&analyzer, stack).qualifiers(qualifier))
        };
        finished.unwrap_or_else(|| self.stalled(Qualifiers::default()))
    }

    fn single_qualifier(&mut self, single: &Spanned<SingleTypeQualifier>, result: &mut Qualifiers) {
        match &single.node {
            SingleTypeQualifier::Storage(storage) => match storage {
                StorageQualifier::Const => result.constant = true,
                StorageQualifier::In => {
                    result.storage = if result.storage == Storage::Out {
                        Storage::Inout
                    } else {
                        Storage::In
                    };
                }
                StorageQualifier::Out => {
                    result.storage = if result.storage == Storage::In {
                        Storage::Inout
                    } else {
                        Storage::Out
                    };
                }
                StorageQualifier::Inout => result.storage = Storage::Inout,
                StorageQualifier::Uniform => result.storage = Storage::Uniform,
                StorageQualifier::Buffer => result.storage = Storage::Buffer,
                StorageQualifier::Shared => result.storage = Storage::Shared,
                StorageQualifier::ResourceHeap => result.storage = Storage::ResourceHeap,
                StorageQualifier::SamplerHeap => result.storage = Storage::SamplerHeap,
                StorageQualifier::Centroid => result.centroid = true,
                StorageQualifier::Patch => result.patch = true,
                StorageQualifier::Sample => result.sample = true,
                StorageQualifier::Coherent => result.coherent = true,
                StorageQualifier::DeviceCoherent => {
                    self.require_scope_extension(single.span, storage.keyword());
                    result.device_coherent = true;
                }
                StorageQualifier::QueueFamilyCoherent => {
                    self.require_scope_extension(single.span, storage.keyword());
                    result.queue_family_coherent = true;
                }
                StorageQualifier::WorkgroupCoherent => {
                    self.require_scope_extension(single.span, storage.keyword());
                    result.workgroup_coherent = true;
                }
                StorageQualifier::SubgroupCoherent => {
                    self.require_scope_extension(single.span, storage.keyword());
                    result.subgroup_coherent = true;
                }
                StorageQualifier::NonPrivate => {
                    self.require_scope_extension(single.span, storage.keyword());
                    result.nonprivate = true;
                }
                StorageQualifier::NonTemporal => {
                    self.require_extension(
                        single.span,
                        "GL_EXT_nontemporal_keyword",
                        storage.keyword(),
                    );
                    result.nontemporal = true;
                }
                StorageQualifier::ShaderCallCoherent => {
                    self.require_extension(single.span, "GL_EXT_ray_tracing", "shadercallcoherent");
                    result.shader_call_coherent = true;
                }
                StorageQualifier::PerPrimitiveNV | StorageQualifier::PerPrimitiveEXT => {
                    self.mesh_qualifier(single.span, *storage);
                    result.per_primitive = true;
                }
                StorageQualifier::PerViewNV => {
                    self.mesh_qualifier(single.span, *storage);
                    result.per_view = true;
                }
                StorageQualifier::TaskNV => {
                    self.mesh_qualifier(single.span, *storage);
                    result.per_task = true;
                }
                StorageQualifier::TaskPayloadSharedEXT => {
                    self.mesh_qualifier(single.span, *storage);
                    result.storage = Storage::TaskPayloadShared;
                }
                StorageQualifier::TileImageEXT => {
                    self.require_extension(
                        single.span,
                        "GL_EXT_shader_tile_image",
                        storage.keyword(),
                    );
                    result.storage = Storage::TileImage;
                }
                StorageQualifier::Volatile => result.volatile = true,
                StorageQualifier::Restrict => result.restrict = true,
                StorageQualifier::Readonly => result.readonly = true,
                StorageQualifier::Writeonly => result.writeonly = true,
                StorageQualifier::RayPayloadNV
                | StorageQualifier::RayPayloadEXT
                | StorageQualifier::RayPayloadInNV
                | StorageQualifier::RayPayloadInEXT
                | StorageQualifier::HitAttributeNV
                | StorageQualifier::HitAttributeEXT
                | StorageQualifier::CallableDataNV
                | StorageQualifier::CallableDataEXT
                | StorageQualifier::CallableDataInNV
                | StorageQualifier::CallableDataInEXT
                | StorageQualifier::HitObjectAttributeNV
                | StorageQualifier::HitObjectAttributeEXT => {
                    result.storage = self.ray_storage_qualifier(single.span, *storage);
                }
                StorageQualifier::Attribute | StorageQualifier::Varying => {
                    self.error(
                        single.span,
                        DiagnosticKind::InvalidQualifier {
                            qualifier: storage.keyword(),
                            reason: "removed from the core profile",
                        },
                    );
                }
            },
            SingleTypeQualifier::Subroutine(_) => {
                self.error(
                    single.span,
                    DiagnosticKind::RemovedUnderVulkan(String::from("subroutine")),
                );
            }
            SingleTypeQualifier::Precision(precision) => result.precision = Some(*precision),
            SingleTypeQualifier::Interpolation(interpolation) => {
                result.interpolation = Some(*interpolation);
            }
            SingleTypeQualifier::Invariant => result.invariant = true,
            SingleTypeQualifier::Precise => result.precise = true,
            SingleTypeQualifier::NonUniform => result.nonuniform = true,
            SingleTypeQualifier::SpirvStorageClass(class) => {
                if let Some(class) = self.spirv_storage_class(single.span, class) {
                    result.spirv_storage_class = Some(class);
                    result.storage = super::spirv::spirv_storage(class);
                }
            }
            SingleTypeQualifier::SpirvByReference => result.spirv_by_reference = true,
            SingleTypeQualifier::SpirvLiteral => result.spirv_literal = true,
            SingleTypeQualifier::Layout(_) | SingleTypeQualifier::SpirvDecorate(_) => {}
        }
    }

    fn layout_value(
        &mut self,
        name: &str,
        expression: &Expression,
        operand: &Operand,
    ) -> Option<i64> {
        let value = operand.value.as_ref().and_then(Constant::scalar_i64);
        if operand.ty.is_error() {
            return None;
        }
        if name == "heap_offset" && !operand.constant {
            let read_only = operand.storage == Storage::Uniform
                || operand.place == Place::ReadOnly("it is read-only");
            if !operand.ty.is_scalar_integer() || !read_only {
                self.error(
                    expression.span,
                    DiagnosticKind::InvalidQualifier {
                        qualifier: "heap_offset",
                        reason: "must be a literal or read-only variable value",
                    },
                );
            }
        } else if !operand.constant || !operand.ty.is_scalar_integer() {
            self.error(
                expression.span,
                DiagnosticKind::LayoutValueNotConstant(String::from(name)),
            );
        } else if value.is_some_and(|value| value < 0) {
            self.error(
                expression.span,
                DiagnosticKind::LayoutValueNegative(String::from(name)),
            );
        } else if name == "input_attachment_index" {
            self.input_attachment_index_value(expression.span, value, operand.specialization);
        }
        value
    }

    fn finish_qualifiers(&mut self, result: &Qualifiers) {
        self.stage_layout_identifiers(result);
        self.heap_layout_check(result);
        self.push_constant_bank_layout_check(result);
        self.removed_packing_check(result);
    }

    fn binding_required_check(
        &mut self,
        span: Span,
        ty: &Type,
        qualifiers: &Qualifiers,
        block: bool,
    ) {
        if !self.options.require_bindings
            || qualifiers.has_layout("binding")
            || !matches!(qualifiers.storage, Storage::Uniform | Storage::Buffer)
            || self.extension_enabled(super::heap::DESCRIPTOR_HEAP)
        {
            return;
        }
        let message = if block {
            let exempt = [
                "push_constant",
                "buffer_reference",
                "input_attachment_index",
            ]
            .iter()
            .any(|name| qualifiers.has_layout(name))
                || super::ray::is_shader_record(qualifiers);
            (!exempt).then_some("uniform/buffer blocks require layout(binding=X)")
        } else {
            matches!(
                ty.kind,
                TypeKind::Opaque(Opaque {
                    kind: OpaqueKind::Sampler
                        | OpaqueKind::CombinedSampler
                        | OpaqueKind::Texture
                        | OpaqueKind::Image
                        | OpaqueKind::SubpassInput,
                    ..
                })
            )
            .then_some("sampler/texture/image requires layout(binding=X)")
        };
        if let Some(message) = message {
            self.error(span, DiagnosticKind::BindingRequired(message));
        }
    }

    fn local_size_changed(&mut self, span: Span) {
        self.error(
            span,
            DiagnosticKind::InvalidQualifier {
                qualifier: "local_size",
                reason: "cannot change previously set size",
            },
        );
    }

    fn input_attachment_index_value(&mut self, span: Span, value: Option<i64>, specialized: bool) {
        let invalid = |reason| DiagnosticKind::InvalidQualifier {
            qualifier: "input_attachment_index",
            reason,
        };
        if value.is_some_and(|value| value >= i64::from(i32::MAX)) {
            self.error(span, invalid("attachment index is too large"));
        }
        if specialized {
            self.error(span, invalid("needs a literal integer"));
        }
    }

    fn non_uniform_storage_check(
        &mut self,
        qualifier: Option<&Spanned<TypeQualifier>>,
        qualifiers: &Qualifiers,
    ) {
        let allowed =
            !qualifiers.constant && matches!(qualifiers.storage, Storage::None | Storage::In);
        if !allowed {
            self.non_uniform_error(
                qualifier,
                "for non-parameter, can only apply to 'in' or no storage qualifier",
            );
        }
    }

    fn non_uniform_error(
        &mut self,
        qualifier: Option<&Spanned<TypeQualifier>>,
        reason: &'static str,
    ) {
        let span = qualifier.and_then(|qualifier| {
            qualifier
                .qualifiers
                .iter()
                .find(|single| single.node == SingleTypeQualifier::NonUniform)
                .map(|single| single.span)
        });
        if let Some(span) = span {
            self.error(
                span,
                DiagnosticKind::InvalidQualifier {
                    qualifier: "nonuniformEXT",
                    reason,
                },
            );
        }
    }

    pub(crate) fn optional_qualifiers(&mut self, ty: &FullySpecifiedType) -> Qualifiers {
        let finished = {
            let analyzer = RefCell::new(&mut *self);
            run(|stack| Cx::new(&analyzer, stack).optional_qualifiers(ty))
        };
        finished.unwrap_or_else(|| self.stalled(Qualifiers::default()))
    }

    fn default_precision_of(&mut self, ty: &FullySpecifiedType, qualifiers: &mut Qualifiers) {
        if qualifiers.precision.is_none() {
            qualifiers.precision =
                precision_key(&ty.specifier).map(|key| self.scopes.default_precision(&key));
        }
    }

    pub(crate) fn array_sizes(
        &mut self,
        specifier: Option<&Spanned<ArraySpecifier>>,
    ) -> Vec<ArraySize> {
        let finished = {
            let analyzer = RefCell::new(&mut *self);
            run(|stack| Cx::new(&analyzer, stack).array_sizes(specifier))
        };
        finished.unwrap_or_else(|| self.stalled(Vec::new()))
    }

    fn array_size_with(&mut self, expression: &Expression, operand: &Operand) -> ArraySize {
        if operand.ty.is_error() {
            return ArraySize::Sized(1);
        }
        if !operand.constant || !operand.ty.is_scalar_integer() {
            self.error(expression.span, DiagnosticKind::ArraySizeNotConstant);
            return ArraySize::Sized(1);
        }
        let value = operand.value.as_ref().and_then(Constant::scalar_i64);
        if operand.specialization {
            let mut inner = expression;
            while let rglsl_ast::ast::ExpressionKind::Parenthesized(nested) = &inner.kind {
                inner = nested;
            }
            let symbol = match inner.kind {
                rglsl_ast::ast::ExpressionKind::Variable(_) => {
                    self.references.get(&inner.id).copied()
                }
                _ => None,
            };
            let default = value
                .filter(|size| *size > 0)
                .and_then(|size| u32::try_from(size).ok());
            return ArraySize::Specialized(match (symbol, default) {
                (Some(symbol), Some(default)) => SpecializedSize::Constant { symbol, default },
                _ => SpecializedSize::Expression(expression.id),
            });
        }
        match value {
            Some(size) if size <= 0 => {
                self.error(expression.span, DiagnosticKind::ArraySizeNotPositive);
                ArraySize::Sized(1)
            }
            Some(size) if size > i64::from(i32::MAX) => {
                self.error(expression.span, DiagnosticKind::ArraySizeNotPositive);
                ArraySize::Sized(1)
            }
            Some(size) => ArraySize::Sized(u32::try_from(size).unwrap_or(u32::MAX)),
            None => ArraySize::Specialized(SpecializedSize::Expression(expression.id)),
        }
    }

    pub(crate) fn type_specifier(&mut self, specifier: &Spanned<TypeSpecifier>) -> Type {
        self.bare_type_specifier(&specifier.node, specifier.span)
    }

    pub(crate) fn bare_type_specifier(&mut self, specifier: &TypeSpecifier, span: Span) -> Type {
        let finished = {
            let analyzer = RefCell::new(&mut *self);
            run(|stack| Cx::new(&analyzer, stack).bare_type_specifier(specifier, span))
        };
        finished.unwrap_or_else(|| self.stalled(Type::ERROR))
    }

    fn base_type(&mut self, specifier: &TypeSpecifier, span: Span) -> Type {
        match &specifier.non_array {
            TypeSpecifierNonArray::Void => Type::VOID,
            TypeSpecifierNonArray::Basic(basic) => Type::from(*basic),
            TypeSpecifierNonArray::Opaque(name) => match Opaque::from_keyword(name) {
                Some(opaque) => {
                    if opaque.kind == crate::types::OpaqueKind::SubpassInput
                        && !self.stage_is(Stage::Fragment)
                    {
                        self.error(
                            span,
                            DiagnosticKind::InvalidQualifier {
                                qualifier: "subpass input",
                                reason: "not supported in this stage",
                            },
                        );
                    }
                    Type::opaque(opaque)
                }
                None => {
                    self.error(span, DiagnosticKind::RemovedUnderVulkan(name.clone()));
                    Type::ERROR
                }
            },
            TypeSpecifierNonArray::Parameterized(_)
            | TypeSpecifierNonArray::Struct(_)
            | TypeSpecifierNonArray::Spirv(_) => Type::ERROR,
            TypeSpecifierNonArray::TypeName(name) => match self.lookup(name) {
                Some(Lookup::Symbol(id)) => match self.symbol(id).map(|symbol| &symbol.kind) {
                    Some(SymbolKind::Struct(structure)) => Type::structure(*structure),
                    Some(SymbolKind::Reference(block)) => Type::reference(*block),
                    Some(SymbolKind::BufferType(block)) => Type::block(*block),
                    _ => {
                        self.error(span, DiagnosticKind::NotAType(name.clone()));
                        Type::ERROR
                    }
                },
                _ => {
                    self.error(span, DiagnosticKind::NotAType(name.clone()));
                    Type::ERROR
                }
            },
            TypeSpecifierNonArray::InlineBlock(_) => {
                self.error(
                    span,
                    DiagnosticKind::InvalidQualifier {
                        qualifier: "block",
                        reason: "only buffer_reference blocks can be declared inline inside a heap block",
                    },
                );
                Type::ERROR
            }
        }
    }

    pub(crate) fn struct_members(
        &mut self,
        declarations: &[Spanned<StructDeclaration>],
        in_block: Option<&Qualifiers>,
    ) -> Vec<Member> {
        let finished = {
            let analyzer = RefCell::new(&mut *self);
            run(|stack| Cx::new(&analyzer, stack).struct_members(declarations, in_block.cloned()))
        };
        finished.unwrap_or_else(|| self.stalled(Vec::new()))
    }

    fn member_qualifier_checks(
        &mut self,
        declaration: &Spanned<StructDeclaration>,
        in_heap: bool,
        qualifiers: &mut Qualifiers,
    ) {
        if let Some(qualifier) = &declaration.ty.node.qualifier {
            self.heap_member_checks(qualifier.span, qualifiers, in_heap);
        }
        if qualifiers.nonuniform {
            self.non_uniform_error(
                declaration.ty.qualifier.as_ref(),
                "not allowed on block or structure members",
            );
            qualifiers.nonuniform = false;
        }
    }

    fn member_storage(
        &mut self,
        declaration: &Spanned<StructDeclaration>,
        qualifiers: Qualifiers,
        in_block: Option<&Qualifiers>,
    ) -> Qualifiers {
        let mut qualifiers = qualifiers;
        if let Some(block) = in_block {
            if qualifiers.storage == Storage::None && !qualifiers.constant {
                qualifiers.storage = block.storage;
            } else if qualifiers.storage != block.storage || qualifiers.constant {
                for declarator in &declaration.declarators {
                    self.error(
                        declarator.name.span,
                        DiagnosticKind::InvalidStructMember {
                            name: declarator.name.node.clone(),
                            reason: "the storage qualifier contradicts the block's",
                        },
                    );
                }
            }
            qualifiers.readonly |= block.readonly;
            qualifiers.coherent |= block.coherent;
            qualifiers.volatile |= block.volatile;
            qualifiers.restrict |= block.restrict;
            qualifiers.device_coherent |= block.device_coherent;
            qualifiers.queue_family_coherent |= block.queue_family_coherent;
            qualifiers.workgroup_coherent |= block.workgroup_coherent;
            qualifiers.subgroup_coherent |= block.subgroup_coherent;
            qualifiers.shader_call_coherent |= block.shader_call_coherent;
            qualifiers.nonprivate |= block.nonprivate;
            qualifiers.nontemporal |= block.nontemporal;
            qualifiers.writeonly |= block.writeonly;
            qualifiers.per_primitive |= block.per_primitive;
            qualifiers.per_view |= block.per_view;
            qualifiers.per_task |= block.per_task;
        }
        qualifiers
    }

    #[allow(clippy::too_many_arguments)]
    fn typed_member(
        &mut self,
        declarator: &Spanned<rglsl_ast::ast::StructDeclarator>,
        qualifiers: &Qualifiers,
        base: &Type,
        place: MemberPlace<'_>,
        members: &mut Vec<Member>,
        dimensions: &[ArraySize],
    ) {
        let MemberPlace {
            in_block,
            in_heap,
            last,
        } = place;
        let name = &declarator.name;
        let ty = base.clone().with_dimensions(dimensions);
        let mut ty = ty;
        if in_block.is_some() {
            self.per_view_dimension(name.span, qualifiers, &mut ty, true);
        }
        let reason = if ty.is_void() {
            Some("a member cannot be `void`")
        } else if members.iter().any(|member| member.name == name.node) {
            Some("the name is already used by another member")
        } else if in_block.is_none() && ty.dimensions().contains(&ArraySize::Unsized) {
            Some("an array size is required")
        } else if in_block.is_some()
            && ty.contains_opaque(&self.types)
            && !(in_heap && self.extension_enabled(super::heap::STRUCTURED_DESCRIPTOR_HEAP))
        {
            Some("a block member cannot have an opaque type")
        } else if in_block.is_some() && ty.contains_cooperative(&self.types) {
            Some("a block member cannot be or contain a cooperative matrix or vector type")
        } else if in_heap && !last && ty.dimensions().first() == Some(&ArraySize::Unsized) {
            Some("an array size is required")
        } else if ty
            .dimensions()
            .iter()
            .skip(1)
            .any(|size| *size == ArraySize::Unsized)
        {
            Some("only the outermost array dimension can be unsized")
        } else {
            None
        };
        if let Some(reason) = reason {
            self.error(
                name.span,
                DiagnosticKind::InvalidStructMember {
                    name: name.node.clone(),
                    reason,
                },
            );
        } else if in_block.is_some() {
            self.input_attachment_check(qualifiers, &ty, name.span);
        }
        members.push(Member {
            name: name.node.clone(),
            ty,
            qualifiers: qualifiers.clone(),
        });
    }

    fn struct_specifier_with(&mut self, specifier: &StructSpecifier, members: Vec<Member>) -> Type {
        let name = specifier.name.as_ref().map(|name| name.node.clone());
        let Some(id) = self.types.add_struct(name, members) else {
            return Type::ERROR;
        };
        if let Some(name) = &specifier.name {
            let symbol = self.add_symbol(&name.node, name.span, SymbolKind::Struct(id));
            if self.scopes.declare(&name.node, symbol).is_err() {
                self.error(name.span, DiagnosticKind::Redeclaration(name.node.clone()));
            }
        }
        Type::structure(id)
    }

    fn init_declarator_list(&mut self, list: &InitDeclaratorList) {
        let qualifiers = self.optional_qualifiers(&list.ty.node);
        if let Some(qualifier) = list.ty.qualifier.as_ref() {
            self.primitive_culling(qualifier.span, &qualifiers, false);
            self.qcom_layout(qualifier.span, &qualifiers);
        }
        if qualifiers.nonuniform {
            self.non_uniform_storage_check(list.ty.qualifier.as_ref(), &qualifiers);
        }
        if qualifiers.spirv_by_reference || qualifiers.spirv_literal {
            let qualifier = if qualifiers.spirv_by_reference {
                "spirv_by_reference"
            } else {
                "spirv_literal"
            };
            self.error(
                list.ty.span,
                DiagnosticKind::InvalidQualifier {
                    qualifier,
                    reason: "can only apply to parameter",
                },
            );
        }
        let base = self.type_specifier(&list.ty.specifier);
        if list.declarators.is_empty() {
            self.task_payload_type_only(list.ty.specifier.span, &qualifiers);
            self.global_storage_checks(&qualifiers, &base, list.ty.specifier.span, true);
            return;
        }
        if list.ty.specifier.node.parameters.is_some()
            && !matches!(
                list.ty.specifier.node.non_array,
                TypeSpecifierNonArray::Parameterized(_)
            )
        {
            for declarator in &list.declarators {
                self.error(
                    declarator.name.span,
                    DiagnosticKind::UnexpectedTypeParameters(declarator.name.node.clone()),
                );
            }
        }
        self.no_shader_layouts(&qualifiers);
        self.passthrough_extension(&qualifiers);
        self.view_layout_extensions(&qualifiers);
        for declarator in &list.declarators {
            self.init_declarator(declarator, &qualifiers, &base);
        }
    }

    fn global_storage_checks(
        &mut self,
        qualifiers: &Qualifiers,
        ty: &Type,
        span: Span,
        type_only: bool,
    ) {
        if !self.scopes.is_global() || ty.is_error() {
            return;
        }
        let invalid = |qualifier, reason| DiagnosticKind::InvalidQualifier { qualifier, reason };
        let is_image = matches!(ty.kind, TypeKind::Opaque(opaque) if opaque.is_image());
        let is_tensor = matches!(ty.kind, TypeKind::Tensor { .. });
        let misplaced = if qualifiers.has_memory_qualifier() && !qualifiers.only_nonprivate() {
            !is_image && !is_tensor && qualifiers.storage != Storage::Buffer
        } else {
            qualifiers.nonprivate
                && !matches!(ty.kind, TypeKind::Opaque(_))
                && !matches!(qualifiers.storage, Storage::Uniform | Storage::Buffer)
        };
        if misplaced && !ty.is_reference() {
            self.error(
                span,
                invalid(
                    "memory",
                    "memory qualifiers need an image or a buffer block",
                ),
            );
            return;
        }
        if qualifiers.storage == Storage::Buffer {
            self.error(span, invalid("buffer", "only blocks can be buffers"));
            return;
        }
        if type_only {
            return;
        }
        if matches!(qualifiers.storage, Storage::In | Storage::Out)
            && ty.contains_scalar_where(&self.types, Scalar::is_microscaling)
        {
            self.error(
                span,
                invalid("in/out", "microscaling types not allowed as input/output"),
            );
            return;
        }
        if matches!(
            qualifiers.storage,
            Storage::Uniform | Storage::Buffer | Storage::Shared
        ) && ty.contains_scalar_where(&self.types, Scalar::is_sub_byte)
        {
            self.error(
                span,
                invalid(
                    "storage class",
                    "sub-byte sized types not allowed in storage class",
                ),
            );
            return;
        }
        if matches!(qualifiers.storage, Storage::In | Storage::Out) {
            let bfloat = ty.contains_scalar(&self.types, Scalar::BFloat16);
            let float8 = ty.contains_scalar(&self.types, Scalar::FloatE4M3)
                || ty.contains_scalar(&self.types, Scalar::FloatE5M2);
            if bfloat || float8 {
                let reason = if bfloat {
                    "bfloat16 types not allowed as input/output"
                } else {
                    "fp8 types not allowed as input/output"
                };
                self.error(span, invalid("in/out", reason));
                return;
            }
        }
        if qualifiers.storage == Storage::Inout {
            self.error(span, invalid("inout", "not allowed at global scope"));
            return;
        }
        if qualifiers.storage == Storage::Shared
            && !self.stage_in(&[Stage::Compute, Stage::Mesh, Stage::Task])
        {
            self.error(span, invalid("shared", "not supported in this stage"));
            return;
        }
        if qualifiers.patch && !self.stage_in(&[Stage::TessControl, Stage::TessEvaluation]) {
            self.error(span, invalid("patch", "not supported in this stage"));
            return;
        }
        if is_image
            && !ty.is_array()
            && qualifiers.storage == Storage::Uniform
            && !qualifiers.writeonly
            && !qualifiers
                .layout
                .iter()
                .any(|entry| IMAGE_FORMATS.contains(&entry.name.as_str()))
            && !self.extension_enabled("GL_EXT_shader_image_load_formatted")
        {
            self.error(
                span,
                invalid("image", "an image needs a format unless it is `writeonly`"),
            );
        }
        let needs_flat = [Scalar::Int, Scalar::Uint, Scalar::Double]
            .into_iter()
            .any(|scalar| ty.contains_scalar(&self.types, scalar));
        match qualifiers.storage {
            Storage::In => {
                if qualifiers.patch && qualifiers.interpolation.is_some() {
                    self.error(span, invalid("patch", "cannot be interpolated"));
                }
                match self.stage() {
                    Stage::Fragment => {
                        let flat = qualifiers.interpolation == Some(InterpolationQualifier::Flat);
                        if !flat && needs_flat {
                            self.error(
                                span,
                                invalid("in", "integer and double inputs must be `flat`"),
                            );
                        }
                    }
                    Stage::Vertex => {
                        if matches!(ty.kind, TypeKind::Struct(_)) {
                            self.error(span, invalid("in", "a vertex input cannot be a structure"));
                        } else if qualifiers.centroid
                            || qualifiers.sample
                            || qualifiers.patch
                            || qualifiers.interpolation.is_some()
                            || qualifiers.invariant
                        {
                            self.error(
                                span,
                                invalid("in", "a vertex input cannot be further qualified"),
                            );
                        }
                    }
                    Stage::Compute => {
                        self.error(
                            span,
                            invalid("in", "a compute shader has no user-defined inputs"),
                        );
                    }
                    Stage::TessControl if qualifiers.patch => {
                        self.error(
                            span,
                            invalid("patch", "only outputs can be `patch` in this stage"),
                        );
                    }
                    _ => {}
                }
            }
            Storage::Out => {
                if qualifiers.patch && qualifiers.interpolation.is_some() {
                    self.error(span, invalid("patch", "cannot be interpolated"));
                }
                match self.stage() {
                    Stage::Compute => {
                        self.error(
                            span,
                            invalid("out", "a compute shader has no user-defined outputs"),
                        );
                    }
                    Stage::TessEvaluation if qualifiers.patch => {
                        self.error(
                            span,
                            invalid("patch", "only inputs can be `patch` in this stage"),
                        );
                    }
                    Stage::Fragment => {
                        if qualifiers.centroid
                            || qualifiers.sample
                            || qualifiers.patch
                            || qualifiers.interpolation.is_some()
                        {
                            self.error(
                                span,
                                invalid("out", "a fragment output cannot be further qualified"),
                            );
                        } else if matches!(ty.kind, TypeKind::Struct(_)) {
                            self.error(
                                span,
                                invalid("out", "a fragment output cannot be a structure"),
                            );
                        } else if ty.base_scalar() == Some(Scalar::Bool) {
                            self.error(span, invalid("out", "a fragment output cannot be boolean"));
                        } else if ty.base_scalar() == Some(Scalar::Double) {
                            self.error(span, invalid("out", "a fragment output cannot be double"));
                        } else if matches!(ty.kind, TypeKind::Matrix { .. }) {
                            self.error(
                                span,
                                invalid("out", "a fragment output cannot be a matrix"),
                            );
                        }
                    }
                    _ => {}
                }
            }
            _ => {}
        }
        if matches!(qualifiers.storage, Storage::In | Storage::Out)
            && ty.base_scalar() == Some(Scalar::Bool)
            && !(qualifiers.storage == Storage::Out && self.stage_is(Stage::Fragment))
        {
            self.error(span, invalid("in", "an input or output cannot be boolean"));
        }
        if matches!(qualifiers.storage, Storage::In | Storage::Out)
            && ty.contains_opaque(&self.types)
        {
            self.error(span, invalid("in", "an input or output cannot be opaque"));
        }
        if qualifiers.storage == Storage::Shared && ty.contains_cooperative_matrix(&self.types) {
            self.error(
                span,
                invalid(
                    "shared",
                    "cooperative matrix types must not be used in shared memory",
                ),
            );
        }
    }

    fn reserved_check(&mut self, name: &Identifier) {
        if name.node.starts_with("gl_") && !self.extension_enabled("GL_EXT_spirv_intrinsics") {
            self.error(
                name.span,
                DiagnosticKind::ReservedIdentifier(name.node.clone()),
            );
        }
    }

    fn redeclared_builtin(&self, name: &str) -> Option<SymbolId> {
        if !self.scopes.is_global() || !name.starts_with("gl_") {
            return None;
        }
        match self.scopes.lookup_level(name) {
            Some((0, Lookup::Symbol(id))) => Some(id),
            _ => None,
        }
    }

    fn input_attachment_check(&mut self, qualifiers: &Qualifiers, ty: &Type, span: Span) {
        let is_subpass = matches!(
            ty.kind,
            TypeKind::Opaque(opaque) if opaque.kind == crate::types::OpaqueKind::SubpassInput
        );
        let has_index = qualifiers.has_layout("input_attachment_index");
        let invalid = |qualifier, reason| DiagnosticKind::InvalidQualifier { qualifier, reason };
        if !is_subpass {
            if has_index {
                self.error(
                    span,
                    invalid("input_attachment_index", "can only be used with a subpass"),
                );
            }
            return;
        }
        if self.extension_enabled("GL_EXT_shader_tile_image") {
            self.error(
                span,
                invalid(
                    "subpass",
                    "cannot be used with GL_EXT_shader_tile_image enabled",
                ),
            );
        }
        if !has_index
            && (ty.is_array() || !self.extension_enabled("GL_EXT_optional_input_attachment_index"))
        {
            self.error(
                span,
                invalid(
                    "subpass",
                    "requires an input_attachment_index layout qualifier",
                ),
            );
        }
    }

    fn init_declarator(
        &mut self,
        declarator: &Node<InitDeclarator>,
        qualifiers: &Qualifiers,
        base: &Type,
    ) {
        let name = &declarator.name;
        let dimensions = self.array_sizes(declarator.array.as_ref());
        let ty = base.clone().with_dimensions(&dimensions);
        let mut ty = ty;
        let is_global = self.scopes.is_global();
        let mut qualifiers = qualifiers.clone();
        let mut broken = ty.is_error();
        if ty.is_void() {
            self.error(name.span, DiagnosticKind::VoidVariable(name.node.clone()));
            ty = Type::ERROR;
            broken = true;
        }
        let initializer = declarator.initializer.as_ref().map(|initializer| {
            (
                name.span,
                self.declaration_initializer(name.span, initializer, &ty),
            )
        });
        let null_initializer = declarator
            .initializer
            .as_ref()
            .is_some_and(|initializer| is_null_initializer(&initializer.node));
        if broken {
            self.declare_variable(declarator, ty, qualifiers, None);
            return;
        }
        if name.node == super::ray::ENABLE_OPACITY_MICROMAP {
            let value = initializer
                .as_ref()
                .filter(|(_, operand)| operand.constant && !operand.specialization)
                .and_then(|(_, operand)| operand.value.as_ref());
            if let Some(id) = self.opacity_micromap_constant(name.span, &qualifiers, &ty, value) {
                self.declarations.insert(declarator.id, id);
                return;
            }
        }
        if qualifiers.has_layout("buffer_reference") {
            self.error(
                name.span,
                super::reference::invalid("can only be used with a block"),
            );
        }
        if qualifiers.has_layout("constant_id") {
            if !qualifiers.constant {
                self.error(
                    name.span,
                    DiagnosticKind::InvalidQualifier {
                        qualifier: "constant_id",
                        reason: "can only be applied to 'const'-qualified scalar",
                    },
                );
                qualifiers.constant = initializer.is_some();
            }
            if !ty.is_scalar() {
                self.error(
                    name.span,
                    DiagnosticKind::InvalidQualifier {
                        qualifier: "constant_id",
                        reason: "can only be applied to a scalar",
                    },
                );
            }
        }
        if ty.contains_reference(&self.types) {
            if qualifiers.constant {
                self.error(
                    name.span,
                    DiagnosticKind::InvalidQualifier {
                        qualifier: "const",
                        reason: "variables with reference type can't have qualifier 'const'",
                    },
                );
                qualifiers.constant = false;
            }
            if matches!(ty.kind, TypeKind::Reference(_))
                && matches!(qualifiers.storage, Storage::In | Storage::Out)
            {
                self.error(
                    name.span,
                    DiagnosticKind::InvalidQualifier {
                        qualifier: "in",
                        reason: "cannot contain any structs with buffer_reference",
                    },
                );
            }
        }
        if qualifiers.constant && initializer.is_none() {
            self.error(name.span, DiagnosticKind::ConstWithoutInitializer);
            qualifiers.constant = false;
        }
        if is_global {
            self.shader_record_checks(name.span, &qualifiers, false);
            self.ray_variable_checks(name.span, &qualifiers);
        }
        if self.is_ray_query(&ty) && initializer.is_some() {
            self.error(
                name.span,
                DiagnosticKind::RayQueryInitializer(name.node.clone()),
            );
        }
        let hit_object = self.hit_object_checks(
            name.span,
            &name.node,
            &qualifiers,
            &ty,
            initializer.is_some(),
        );
        if hit_object {
            qualifiers.storage = Storage::None;
        } else if qualifiers.storage == Storage::TileImage || self.is_tile_image(&ty) {
            self.tile_image_declaration(name.span, &qualifiers, &ty);
        } else if qualifiers.storage != Storage::Uniform && self.opaque_outside_uniform(&ty) {
            self.error(name.span, DiagnosticKind::OpaqueNotAllowed(self.show(&ty)));
        } else if qualifiers.storage == Storage::Uniform
            && is_global
            && !self.options.relaxed_uniforms
            && self.contains_non_opaque(&ty)
        {
            self.error(name.span, DiagnosticKind::UniformOutsideBlock);
        }
        self.global_storage_checks(&qualifiers, &ty, name.span, false);
        if is_global {
            self.binding_required_check(name.span, &ty, &qualifiers, false);
        }
        if is_global {
            self.heap_object_check(name.span, &qualifiers);
            self.heap_declaration_check(name.span, &ty, &qualifiers, false);
        }
        self.input_attachment_check(&qualifiers, &ty, name.span);
        self.storage_small_check(name.span, &ty, qualifiers.storage);
        if !is_global
            && (qualifiers.interpolation.is_some()
                || qualifiers.centroid
                || qualifiers.patch
                || qualifiers.sample
                || qualifiers.invariant)
        {
            self.error(
                name.span,
                DiagnosticKind::InvalidQualifier {
                    qualifier: "interpolation",
                    reason: "not allowed in nested scope",
                },
            );
        }
        if is_global {
            self.per_view_dimension(name.span, &qualifiers, &mut ty, false);
            self.interface_array(name, &qualifiers, &mut ty);
            self.mesh_interface_array(name, &qualifiers, &mut ty);
        }
        if !is_global && !matches!(qualifiers.storage, Storage::None) {
            self.error(
                name.span,
                DiagnosticKind::InvalidQualifier {
                    qualifier: "storage",
                    reason: "only allowed at global scope",
                },
            );
            qualifiers.storage = Storage::None;
        }
        if initializer.is_none()
            && ty
                .dimensions()
                .iter()
                .skip(1)
                .any(|size| *size == ArraySize::Unsized)
        {
            self.error(name.span, DiagnosticKind::UnsizedArrayNotAllowed);
        }
        let mut value = None;
        if let Some((span, operand)) = initializer {
            if matches!(
                qualifiers.storage,
                Storage::In | Storage::Out | Storage::Buffer | Storage::TaskPayloadShared
            ) || (qualifiers.storage == Storage::Shared && !null_initializer)
                || (qualifiers.storage == Storage::Uniform && ty.contains_opaque(&self.types))
            {
                self.error(
                    span,
                    DiagnosticKind::InitializerNotAllowed(name.node.clone()),
                );
            } else if !operand.ty.is_error() && self.readable(span, &operand) {
                let converted = self.initialize(span, &mut ty, &operand);
                if let Some(Initializer::Expression(expression)) = declarator
                    .initializer
                    .as_ref()
                    .map(|initializer| &initializer.node)
                {
                    self.record_conversion(expression, &operand.ty, &ty);
                }
                let needs_constant =
                    is_global && (qualifiers.constant || qualifiers.storage == Storage::Uniform);
                let lost_specialization = operand.specialization
                    && operand.ty.base_scalar().is_some_and(Scalar::is_integer)
                    && ty.base_scalar().is_some_and(Scalar::is_floating);
                if converted && needs_constant && (!operand.constant || lost_specialization) {
                    self.error(
                        span,
                        DiagnosticKind::NonConstantInitializer(name.node.clone()),
                    );
                }
                if qualifiers.constant
                    && operand.constant
                    && operand.specialization
                    && qualifiers.has_layout("constant_id")
                {
                    self.error(
                        span,
                        DiagnosticKind::InvalidQualifier {
                            qualifier: "constant_id",
                            reason: "cannot be applied to a constant computed from other specialization constants",
                        },
                    );
                }
                if qualifiers.constant && operand.constant {
                    qualifiers.specialization = operand.specialization;
                    value = operand
                        .value
                        .as_ref()
                        .map(|constant| match ty.base_scalar() {
                            Some(scalar) => constant.convert(scalar),
                            None => constant.clone(),
                        });
                } else if qualifiers.constant {
                    qualifiers.constant = false;
                    qualifiers.readonly = true;
                }
            }
        }
        self.declare_variable(declarator, ty, qualifiers, value);
    }

    fn interface_array(&mut self, name: &Identifier, qualifiers: &Qualifiers, ty: &mut Type) {
        if qualifiers.patch || name.node.starts_with("gl_") {
            return;
        }
        if !matches!(qualifiers.storage, Storage::In | Storage::Out) {
            return;
        }
        let stage = self.stage();
        let size = match (qualifiers.storage, stage) {
            (Storage::In, Stage::Geometry) => self.input_array_size,
            (Storage::In, Stage::TessControl | Stage::TessEvaluation) => self
                .input_array_size
                .or_else(|| u32::try_from(self.options.limits.max_patch_vertices).ok()),
            (Storage::Out, Stage::TessControl) => self.output_array_size,
            _ => return,
        };
        let invalid = |reason| DiagnosticKind::InvalidInterfaceArray {
            name: name.node.clone(),
            reason,
        };
        match (ty.outer_size(), size) {
            (None, _) => self.error(name.span, invalid("the type must be an array")),
            (Some(ArraySize::Unsized), Some(size)) => ty.set_outer_size(ArraySize::Sized(size)),
            (Some(ArraySize::Sized(declared)), Some(size)) if declared != size => {
                let reason = match (stage, qualifiers.storage) {
                    (Stage::Geometry, _) => "its size does not match the input primitive",
                    (_, Storage::In) => "its size must be gl_MaxPatchVertices",
                    _ => "its size does not match the number of output vertices",
                };
                self.error(name.span, invalid(reason));
            }
            _ => {}
        }
    }

    fn contains_non_opaque(&self, ty: &Type) -> bool {
        match ty.kind {
            TypeKind::Opaque(_)
            | TypeKind::Tensor { .. }
            | TypeKind::Spirv(_)
            | TypeKind::Error => false,
            TypeKind::Struct(id) => self
                .types
                .structure(id)
                .is_some_and(|structure| !structure.scalars.is_empty()),
            _ => true,
        }
    }

    fn initialize(&mut self, span: Span, ty: &mut Type, operand: &Operand) -> bool {
        if ty.dimensions().len() == operand.ty.dimensions().len() {
            let given = operand.ty.dimensions();
            if given
                .iter()
                .zip(ty.dimensions())
                .any(|(given, declared)| *declared == ArraySize::Unsized && given != declared)
            {
                ty.update_dimensions(|dimensions| {
                    for (declared, given) in dimensions.iter_mut().zip(given) {
                        if *declared == ArraySize::Unsized {
                            *declared = *given;
                        }
                    }
                });
            }
        }
        if self.converts(&operand.ty, ty) && !operand.ty.is_void() {
            return true;
        }
        self.error(
            span,
            DiagnosticKind::CannotConvert {
                from: self.show(&operand.ty),
                to: self.show(ty),
            },
        );
        false
    }

    fn declare_variable(
        &mut self,
        declarator: &Node<InitDeclarator>,
        ty: Type,
        qualifiers: Qualifiers,
        value: Option<Constant>,
    ) {
        let name = &declarator.name;
        if let Some(builtin) = self.redeclared_builtin(&name.node) {
            self.declarations.insert(declarator.id, builtin);
            if let Some(SymbolKind::Variable(variable)) =
                self.symbol_mut(builtin).map(|symbol| &mut symbol.kind)
            {
                if variable.ty.kind == ty.kind && ty.is_array() {
                    variable.ty = ty;
                }
            }
            return;
        }
        let origin = if self.scopes.is_global() {
            Origin::Global
        } else {
            Origin::Local
        };
        if let Some(Lookup::Symbol(existing)) = self.scopes.lookup_in_current(&name.node) {
            let previous = self
                .symbol(existing)
                .and_then(|symbol| symbol.variable())
                .map(|variable| variable.ty.clone());
            let interface = matches!(qualifiers.storage, Storage::In | Storage::Out)
                && matches!(
                    self.stage(),
                    Stage::Geometry | Stage::TessControl | Stage::TessEvaluation
                );
            let resizes = previous.is_some_and(|previous| {
                previous.kind == ty.kind
                    && ty.is_array()
                    && previous.dimensions().get(1..) == ty.dimensions().get(1..)
                    && (previous.outer_size() == Some(ArraySize::Unsized)
                        || (interface && previous == ty))
            });
            if resizes {
                if let Some(SymbolKind::Variable(variable)) =
                    self.symbol_mut(existing).map(|symbol| &mut symbol.kind)
                {
                    variable.ty = ty;
                }
                self.declarations.insert(declarator.id, existing);
                return;
            }
        }
        self.reserved_check(name);
        let id = self.add_variable(&name.node, name.span, ty, qualifiers, origin, value);
        if let Some(SymbolKind::Variable(variable)) =
            self.symbol_mut(id).map(|symbol| &mut symbol.kind)
        {
            variable.declaration = Some(declarator.id);
        }
        self.declarations.insert(declarator.id, id);
        let recovered = match self.scopes.lookup_in_current(&name.node) {
            Some(Lookup::Symbol(existing)) => self.recovered.contains(&existing),
            _ => false,
        };
        if recovered {
            self.scopes.replace_in_current(&name.node, id);
        } else if self.scopes.declare(&name.node, id).is_err() {
            self.error(name.span, DiagnosticKind::Redeclaration(name.node.clone()));
        }
    }

    fn declaration_initializer(
        &mut self,
        span: Span,
        initializer: &Spanned<Initializer>,
        expected: &Type,
    ) -> Operand {
        if !is_null_initializer(&initializer.node) {
            return self.initializer(span, initializer, expected);
        }
        self.require_extension(initializer.span, NULL_INITIALIZER, "empty { } initializer");
        if expected.is_error() {
            return Operand::error();
        }
        let reason = if expected.dimensions().contains(&ArraySize::Unsized) {
            Some("null initializers can't size unsized arrays")
        } else if expected.contains_opaque(&self.types) {
            Some("null initializers can't be used on opaque values")
        } else {
            None
        };
        if let Some(reason) = reason {
            self.error(span, DiagnosticKind::InvalidNullInitializer(reason));
            return Operand::error();
        }
        let mut operand = Operand::temporary(expected.clone());
        operand.value = expected.base_scalar().and_then(|scalar| {
            let count = expected.flattened_size(&self.types)?;
            let count = usize::try_from(count).ok()?;
            Some(Constant::new(alloc::vec![Value::zero(scalar); count]))
        });
        operand.constant = operand.value.is_some();
        operand
    }

    pub(crate) fn initializer(
        &mut self,
        span: Span,
        initializer: &Spanned<Initializer>,
        expected: &Type,
    ) -> Operand {
        let finished = {
            let analyzer = RefCell::new(&mut *self);
            run(|stack| Cx::new(&analyzer, stack).initializer(span, initializer, expected.clone()))
        };
        finished.unwrap_or_else(|| self.stalled(Operand::error()))
    }

    fn start_list(&mut self, span: Span, items: &[Spanned<Initializer>], expected: &Type) -> List {
        let count = u32::try_from(items.len()).unwrap_or(u32::MAX);
        let mut element_types: Vec<Type> = Vec::new();
        let mut result = expected.clone();
        let mut mismatch = false;
        if let Some(element) = expected.element_type().filter(|_| expected.is_array()) {
            match expected.outer_size() {
                Some(ArraySize::Sized(size)) if size != count => mismatch = true,
                _ => {}
            }
            result.set_outer_size(ArraySize::Sized(count));
            element_types = items.iter().map(|_| element.clone()).collect();
        } else if let TypeKind::Struct(id) = expected.kind {
            if let Some(structure) = self.types.structure(id) {
                element_types = structure
                    .members
                    .iter()
                    .map(|member| member.ty.clone())
                    .collect();
            }
            mismatch = element_types.len() != items.len();
        } else if let Some(element) = expected.element_type() {
            mismatch = expected.length() != Some(count);
            element_types = items.iter().map(|_| element.clone()).collect();
        }
        let mut failed = expected.is_error();
        let uses = self.specialization_uses;
        if element_types.is_empty() && !failed {
            self.error(
                span,
                DiagnosticKind::InvalidConstructor {
                    ty: self.show(expected),
                    reason: "this type cannot be initialized with a list",
                },
            );
            failed = true;
        }
        List {
            element_types,
            result,
            mismatch,
            constant: true,
            values: Some(Vec::new()),
            failed,
            uses,
        }
    }

    fn list_item(
        &mut self,
        span: Span,
        items: &[Spanned<Initializer>],
        expected: &Type,
        list: &mut List,
        element: &Type,
        operand: Operand,
    ) {
        list.constant &= operand.constant;
        if operand.ty.is_error() {
            list.failed = true;
        } else if !element.is_error() && !self.converts(&operand.ty, element) {
            let unsized_match = element.outer_size() == Some(ArraySize::Unsized)
                && operand.ty.kind == element.kind
                && operand.ty.dimensions().get(1..) == element.dimensions().get(1..);
            if !unsized_match {
                list.failed = true;
                let aggregate = expected.is_array() || expected.is_struct();
                let located = match items.first() {
                    Some(first) if aggregate => first.span,
                    _ => span,
                };
                self.error(
                    located,
                    DiagnosticKind::CannotConvert {
                        from: self.show(&operand.ty),
                        to: self.show(element),
                    },
                );
            }
        }
        match (&mut list.values, operand.value, element.base_scalar()) {
            (Some(collected), Some(value), Some(scalar)) => {
                collected.extend(value.convert(scalar).values);
            }
            (Some(collected), Some(value), None) => collected.extend(value.values),
            _ => list.values = None,
        }
    }

    fn finish_list(&mut self, span: Span, expected: &Type, list: List) -> Operand {
        let List {
            result,
            mismatch,
            mut constant,
            values,
            mut failed,
            uses,
            ..
        } = list;
        if mismatch && !failed {
            self.error(
                span,
                DiagnosticKind::InvalidConstructor {
                    ty: self.show(expected),
                    reason: "the initializer list has the wrong number of elements",
                },
            );
            failed = true;
        }
        if failed {
            return Operand::error();
        }
        let specialization = self.specialization_uses != uses;
        if specialization && !self.extension_enabled(super::call::SPEC_CONSTANT_COMPOSITES) {
            constant = false;
        }
        let mut operand = Operand::temporary(result);
        operand.constant = constant;
        operand.specialization = constant && specialization;
        operand.value = values
            .filter(|_| constant && !specialization)
            .map(Constant::new);
        operand
    }

    fn block(
        &mut self,
        declaration: &Declaration,
        structure: &BlockStructure,
        instance: Option<&Spanned<BlockInstance>>,
    ) {
        let qualifiers = self.qualifiers(&structure.qualifier);
        if qualifiers.nonuniform {
            self.non_uniform_storage_check(Some(&structure.qualifier), &qualifiers);
        }
        self.no_shader_layouts(&qualifiers);
        self.passthrough_extension(&qualifiers);
        self.mesh_block_storage(structure.name.span, &qualifiers);
        self.view_layout_extensions(&qualifiers);
        let storage = match qualifiers.storage {
            Storage::TaskPayloadShared => {
                self.task_payload_checks(structure.name.span, &qualifiers, true);
                BlockStorage::Uniform
            }
            Storage::Uniform => BlockStorage::Uniform,
            Storage::Buffer => BlockStorage::Buffer,
            Storage::In => BlockStorage::In,
            Storage::Out => BlockStorage::Out,
            Storage::ResourceHeap | Storage::SamplerHeap => {
                self.heap_block_storage(structure.name.span, qualifiers.storage)
            }
            _ => self.ray_block_storage(structure.name.span, qualifiers.storage),
        };
        self.primitive_culling(structure.qualifier.span, &qualifiers, false);
        self.qcom_layout(structure.qualifier.span, &qualifiers);
        self.shader_record_checks(structure.qualifier.span, &qualifiers, true);
        self.ray_variable_checks(structure.qualifier.span, &qualifiers);
        self.heap_object_check(structure.name.span, &qualifiers);
        self.binding_required_check(structure.name.span, &Type::ERROR, &qualifiers, true);
        let buffer_type = qualifiers.has_layout("buffer_type");
        if buffer_type {
            let invalid =
                |qualifier, reason| DiagnosticKind::InvalidQualifier { qualifier, reason };
            if !matches!(storage, BlockStorage::Uniform | BlockStorage::Buffer) {
                self.error(
                    structure.name.span,
                    invalid("buffer_type", "can only be used with uniform or buffer"),
                );
            }
            if instance.is_some() {
                self.error(
                    structure.name.span,
                    invalid("buffer_type", "cannot have an instance name"),
                );
            }
            for layout in ["set", "binding"] {
                if qualifiers.has_layout(layout) {
                    self.error(
                        structure.name.span,
                        invalid(layout, "cannot be used with buffer_type"),
                    );
                }
            }
        }
        if qualifiers.has_layout("input_attachment_index") {
            self.error(
                structure.name.span,
                DiagnosticKind::InvalidQualifier {
                    qualifier: "input_attachment_index",
                    reason: "can only be used with a subpass",
                },
            );
        }
        let members = self.struct_members(&structure.members, Some(&qualifiers));
        let declarators = structure
            .members
            .iter()
            .flat_map(|declaration| &declaration.declarators);
        for (declarator, member) in declarators.zip(&members) {
            if member
                .ty
                .contains_scalar_where(&self.types, Scalar::is_sub_byte)
            {
                self.error(
                    declarator.name.span,
                    DiagnosticKind::InvalidBlock {
                        name: member.name.clone(),
                        reason: "member of block cannot be or contain a sub-byte type",
                    },
                );
            }
        }
        let dimensions = instance
            .map(|instance| self.array_sizes(instance.array.as_ref()))
            .unwrap_or_default();
        if self.redeclare_mesh_block(
            declaration,
            structure,
            instance,
            storage,
            &qualifiers,
            &members,
            &dimensions,
        ) {
            return;
        }
        if structure.name.node == "gl_PerVertex" {
            let invalid = |reason| DiagnosticKind::InvalidBlock {
                name: structure.name.node.clone(),
                reason,
            };
            let given = instance.map_or("", |instance| instance.name.node.as_str());
            if qualifiers.has_layout("passthrough") {
                return;
            }
            let Some((block, variable)) = self.builtin_per_vertex(storage, given) else {
                self.error(
                    structure.name.span,
                    invalid("there is no such built-in block to redeclare"),
                );
                return;
            };
            if self.redeclared_blocks.contains(&storage) {
                self.error(
                    structure.name.span,
                    invalid("a built-in block can only be redeclared once"),
                );
                return;
            }
            self.redeclared_blocks.push(storage);
            self.declarations.insert(declaration.id, variable);
            self.redeclare_per_vertex(block, variable, members);
            let sized = matches!(dimensions.first(), Some(ArraySize::Sized(_)));
            if let Some(SymbolKind::Variable(variable)) = self
                .symbol_mut(variable)
                .filter(|_| sized)
                .map(|symbol| &mut symbol.kind)
            {
                variable.ty.set_dimensions(&dimensions);
            }
            return;
        }
        if !self.scopes.is_global() {
            self.error(
                structure.name.span,
                DiagnosticKind::InvalidQualifier {
                    qualifier: "block",
                    reason: "only allowed at global scope",
                },
            );
        }
        let block_name = &structure.name;
        let invalid = |reason| DiagnosticKind::InvalidBlock {
            name: block_name.node.clone(),
            reason,
        };
        if block_name.node.starts_with("gl_") {
            self.error(
                block_name.span,
                invalid("built-in blocks cannot be declared"),
            );
        }
        for declaration in &structure.members {
            for declarator in &declaration.declarators {
                self.reserved_check(&declarator.name);
            }
        }
        if let Some(instance) = instance {
            self.reserved_check(&instance.name);
        } else if storage == BlockStorage::In
            && !qualifiers.has_layout("passthrough")
            && self.stage_in(&[Stage::Geometry, Stage::TessControl, Stage::TessEvaluation])
        {
            self.error(
                block_name.span,
                DiagnosticKind::InvalidInterfaceArray {
                    name: block_name.node.clone(),
                    reason: "the type must be an array",
                },
            );
        }
        let unsupported = match storage {
            BlockStorage::In => self.stage_in(&[Stage::Compute, Stage::Vertex]),
            BlockStorage::Out => self.stage_in(&[Stage::Compute, Stage::Fragment]),
            _ => false,
        };
        if unsupported {
            self.error(
                block_name.span,
                invalid("this kind of block is not supported in this stage"),
            );
        }
        if buffer_type {
            self.buffer_type_block(structure, storage, &qualifiers, members);
            return;
        }
        let reference = self.reference_block(structure, storage, &qualifiers, &members);
        if reference.is_none() {
            match self.scopes.lookup_in_current(&block_name.node) {
                None => {
                    let symbol =
                        self.add_symbol(&block_name.node, block_name.span, SymbolKind::BlockName);
                    let _ = self.scopes.declare(&block_name.node, symbol);
                }
                Some(Lookup::Symbol(id))
                    if matches!(
                        self.symbol(id).map(|symbol| &symbol.kind),
                        Some(SymbolKind::BlockName)
                    ) => {}
                Some(_) => self.error(block_name.span, invalid("the name is already used")),
            }
            let used = self.block_names.entry(block_name.node.clone()).or_default();
            if used.contains(&storage) {
                self.error(
                    block_name.span,
                    invalid("the block name is already used in this interface"),
                );
            } else {
                used.push(storage);
            }
        }
        let member_names: Vec<String> = members.iter().map(|member| member.name.clone()).collect();
        let block = match reference {
            Some(block) => block,
            None => {
                let Some(block) = self.types.add_block(BlockType {
                    name: structure.name.node.clone(),
                    storage,
                    qualifiers: qualifiers.clone(),
                    members,
                    reference: None,
                    buffer_type: false,
                }) else {
                    return;
                };
                block
            }
        };
        if reference.is_some() && instance.is_none() {
            return;
        }
        let mut ty = Type::block(block).with_dimensions(&dimensions);
        self.heap_declaration_check(structure.name.span, &ty, &qualifiers, instance.is_none());
        match instance {
            Some(instance) => {
                let name = &instance.name;
                let located = Spanned::new(structure.name.span, name.node.clone());
                self.interface_array(&located, &qualifiers, &mut ty);
                self.mesh_interface_array(&located, &qualifiers, &mut ty);
                let id =
                    self.add_variable(&name.node, name.span, ty, qualifiers, Origin::Global, None);
                self.declarations.insert(declaration.id, id);
                if self.scopes.declare(&name.node, id).is_err() {
                    self.error(
                        structure.name.span,
                        DiagnosticKind::Redeclaration(name.node.clone()),
                    );
                }
            }
            None => {
                let id = self.add_variable(
                    "",
                    structure.name.span,
                    ty,
                    qualifiers,
                    Origin::Global,
                    None,
                );
                self.declarations.insert(declaration.id, id);
                for (index, name) in member_names.iter().enumerate() {
                    let member = self.add_symbol(
                        name,
                        structure.name.span,
                        SymbolKind::BlockMember {
                            instance: id,
                            index: u32::try_from(index).unwrap_or(u32::MAX),
                        },
                    );
                    if self.scopes.declare(name, member).is_err() {
                        self.error(
                            structure.name.span,
                            DiagnosticKind::Redeclaration(name.clone()),
                        );
                    }
                }
            }
        }
    }

    #[allow(clippy::too_many_arguments)]
    fn redeclare_mesh_block(
        &mut self,
        declaration: &Declaration,
        structure: &BlockStructure,
        instance: Option<&Spanned<BlockInstance>>,
        storage: BlockStorage,
        qualifiers: &Qualifiers,
        members: &[Member],
        dimensions: &[ArraySize],
    ) -> bool {
        let name = structure.name.node.as_str();
        let Some(&(_, instance_name)) = super::mesh::MESH_BLOCK_NAMES
            .iter()
            .find(|(block, _)| *block == name)
        else {
            return false;
        };
        if !self.stage_is(Stage::Mesh) {
            return false;
        }
        let given = instance.map_or("", |instance| instance.name.node.as_str());
        let found = self.symbols.iter().enumerate().find_map(|(index, symbol)| {
            let variable = symbol.variable()?;
            let TypeKind::Block(id) = variable.ty.kind else {
                return None;
            };
            let matches = variable.origin == Origin::BuiltIn && symbol.name == instance_name;
            let index = u32::try_from(index).ok()?;
            matches.then_some((id, SymbolId(index)))
        });
        let invalid = |reason| DiagnosticKind::InvalidBlock {
            name: String::from(name),
            reason,
        };
        let Some((block, variable)) =
            found.filter(|_| given == instance_name && storage == BlockStorage::Out)
        else {
            self.error(
                structure.name.span,
                invalid("there is no such built-in block to redeclare"),
            );
            return true;
        };
        self.declarations.insert(declaration.id, variable);
        if let Some(block) = self.types.block_mut(block) {
            block.members = members.to_vec();
            block.qualifiers.per_primitive |= qualifiers.per_primitive;
        }
        let mut sized = None;
        if let Some(SymbolKind::Variable(variable)) =
            self.symbol_mut(variable).map(|symbol| &mut symbol.kind)
        {
            if matches!(dimensions.first(), Some(ArraySize::Sized(_))) {
                variable.ty.set_dimensions(dimensions);
            }
            sized = Some(variable.ty.clone());
        }
        if let (Some(mut ty), Some(instance)) = (sized, instance) {
            let mut qualifiers = qualifiers.clone();
            qualifiers.storage = Storage::Out;
            let located = Spanned::new(structure.name.span, instance.name.node.clone());
            self.mesh_interface_array(&located, &qualifiers, &mut ty);
            if let Some(SymbolKind::Variable(variable)) =
                self.symbol_mut(variable).map(|symbol| &mut symbol.kind)
            {
                variable.ty = ty;
            }
        }
        true
    }

    fn builtin_per_vertex(
        &self,
        storage: BlockStorage,
        instance: &str,
    ) -> Option<(crate::types::BlockId, SymbolId)> {
        self.symbols.iter().enumerate().find_map(|(index, symbol)| {
            let variable = symbol.variable()?;
            let TypeKind::Block(id) = variable.ty.kind else {
                return None;
            };
            let block = self.types.block(id)?;
            let matches = variable.origin == Origin::BuiltIn
                && block.name == "gl_PerVertex"
                && block.storage == storage
                && symbol.name == instance;
            let index = u32::try_from(index).ok()?;
            matches.then_some((id, SymbolId(index)))
        })
    }

    fn redeclare_per_vertex(
        &mut self,
        id: crate::types::BlockId,
        variable: SymbolId,
        mut members: Vec<Member>,
    ) {
        let previous: Vec<String> = self
            .types
            .block(id)
            .map(|block| {
                block
                    .members
                    .iter()
                    .map(|member| member.name.clone())
                    .collect()
            })
            .unwrap_or_default();
        members.sort_by_key(|member| {
            previous
                .iter()
                .position(|name| *name == member.name)
                .unwrap_or(previous.len())
        });
        for name in &previous {
            let Some((0, Lookup::Symbol(symbol))) = self.scopes.lookup_level(name) else {
                continue;
            };
            let is_member = matches!(
                self.symbol(symbol).map(|symbol| &symbol.kind),
                Some(SymbolKind::BlockMember { instance, .. }) if *instance == variable
            );
            if !is_member {
                continue;
            }
            let position = members
                .iter()
                .position(|member| member.name == *name)
                .and_then(|position| u32::try_from(position).ok());
            match (
                position,
                self.symbol_mut(symbol).map(|symbol| &mut symbol.kind),
            ) {
                (Some(position), Some(SymbolKind::BlockMember { index, .. })) => *index = position,
                _ => self.scopes.remove_builtin(name),
            }
        }
        if let Some(block) = self.types.block_mut(id) {
            block.members = members;
        }
    }

    fn parameter(&mut self, parameter: &Node<ParameterDeclaration>) -> Option<Parameter> {
        let qualifiers = self.optional_qualifiers(&parameter.ty.node);
        let base = self.type_specifier(&parameter.ty.specifier);
        let dimensions = self.array_sizes(parameter.array.as_ref());
        let ty = base.with_dimensions(&dimensions);
        let name = parameter.name.as_ref().map(|name| name.node.clone());
        if ty.is_void() && name.is_none() && parameter.ty.qualifier.is_none() {
            return None;
        }
        let direction = match qualifiers.storage {
            Storage::Out => Direction::Out,
            Storage::Inout => Direction::Inout,
            _ => Direction::In,
        };
        if let Some(identifier) = &parameter.name {
            self.reserved_check(identifier);
        }
        let shown = name.clone().unwrap_or_default();
        let literal_type = ty.is_scalar()
            && matches!(
                ty.scalar_type(),
                Some(
                    crate::types::Scalar::Float
                        | crate::types::Scalar::Int
                        | crate::types::Scalar::Uint
                        | crate::types::Scalar::Bool
                )
            );
        let reason = if qualifiers.spirv_literal && !literal_type {
            Some("cannot use spirv_literal qualifier")
        } else if ty.is_void() {
            Some("a parameter cannot be `void`")
        } else if ty.dimensions().contains(&ArraySize::Unsized) {
            Some("an array size is required")
        } else if direction != Direction::In && ty.contains_opaque(&self.types) {
            Some("an opaque type cannot be an output parameter")
        } else if qualifiers.constant && direction != Direction::In {
            Some("a `const` parameter cannot be an output")
        } else if matches!(
            qualifiers.storage,
            Storage::Uniform | Storage::Buffer | Storage::Shared
        ) {
            Some("this storage qualifier is not allowed on a parameter")
        } else {
            None
        };
        if let Some(reason) = reason {
            self.error(
                parameter.span,
                DiagnosticKind::InvalidParameter {
                    name: shown,
                    reason,
                },
            );
        }
        let described = self.show(&ty);
        self.require_small_arithmetic(
            parameter.span,
            &ty,
            &described,
            "{} types can only be in uniform block or buffer storage",
        );
        Some(Parameter {
            name,
            ty,
            direction,
            qualifiers,
        })
    }

    fn function_prototype(
        &mut self,
        node: rglsl_ast::ast::NodeId,
        prototype: &Spanned<FunctionPrototype>,
        definition: bool,
        spirv_instruction: Option<crate::spirv::SpirvInstruction>,
    ) -> Option<FunctionId> {
        let name = &prototype.name;
        let return_qualifiers = self.optional_qualifiers(&prototype.return_type.node);
        if return_qualifiers.nonuniform {
            self.non_uniform_storage_check(
                prototype.return_type.qualifier.as_ref(),
                &return_qualifiers,
            );
        }
        let return_type = self.type_specifier(&prototype.return_type.specifier);
        let close = Span::new(prototype.span.end.saturating_sub(1), prototype.span.end);
        let control = self.function_attributes(prototype, close);
        if return_type.dimensions().contains(&ArraySize::Unsized) {
            self.error(
                prototype.return_type.span,
                DiagnosticKind::UnsizedArrayNotAllowed,
            );
        }
        if return_type.contains_opaque(&self.types) {
            self.error(
                prototype.return_type.span,
                DiagnosticKind::OpaqueNotAllowed(self.show(&return_type)),
            );
        }
        let parameters: Vec<Parameter> = prototype
            .parameters
            .iter()
            .filter_map(|parameter| self.parameter(parameter))
            .collect();
        if name.node == "main" && (!parameters.is_empty() || !return_type.is_void()) {
            self.error(close, DiagnosticKind::InvalidMain);
        }
        if spirv_instruction.is_none()
            && parameters
                .iter()
                .any(|parameter| parameter.qualifiers.spirv_literal)
        {
            self.error(
                close,
                DiagnosticKind::SpirvIntrinsic {
                    subject: name.node.clone(),
                    reason: "'spirv_literal' can only be used on functions defined with 'spirv_instruction'",
                },
            );
        }
        let types: Vec<Type> = parameters
            .iter()
            .map(|parameter| parameter.ty.clone())
            .collect();
        let builtin_conflict = self
            .builtins
            .overloads(&name.node)
            .iter()
            .filter_map(|id| self.builtins.function(*id))
            .any(|function| {
                function.same_parameter_types(&types) && function.return_type != return_type
            });
        if builtin_conflict && self.scopes.is_global() && spirv_instruction.is_none() {
            self.error(
                close,
                DiagnosticKind::ConflictingFunctionDeclaration(name.node.clone()),
            );
        }
        let existing = match self.scopes.lookup_in_current(&name.node) {
            Some(Lookup::Function(ids)) => ids.iter().copied().find(|id| {
                self.function(*id)
                    .is_some_and(|function| function.same_parameter_types(&types))
            }),
            _ => None,
        };
        if let Some(id) = existing {
            let different_instruction = self
                .function(id)
                .is_some_and(|previous| previous.spirv_instruction != spirv_instruction);
            if different_instruction {
                self.error(
                    close,
                    DiagnosticKind::SpirvIntrinsic {
                        subject: name.node.clone(),
                        reason: "overloaded functions must have the same qualifiers",
                    },
                );
            }
            let (conflict, redefined) = self.function(id).map_or((false, false), |previous| {
                let conflict = previous.return_type != return_type
                    || previous
                        .parameters
                        .iter()
                        .zip(&parameters)
                        .any(|(left, right)| left.direction != right.direction);
                (conflict, previous.defined && definition)
            });
            if conflict {
                self.error(
                    close,
                    DiagnosticKind::ConflictingFunctionDeclaration(name.node.clone()),
                );
            }
            if redefined {
                self.error(
                    close,
                    DiagnosticKind::FunctionRedefinition(name.node.clone()),
                );
            }
            let mut incompatible = false;
            if let Some(function) = self
                .functions
                .get_mut(usize::try_from(id.index()).unwrap_or(usize::MAX))
            {
                function.defined |= definition;
                if definition {
                    function.parameters = parameters;
                }
                let merged = function.control.merge(control);
                incompatible = merged.is_incompatible() && !control.is_incompatible();
                function.control = merged;
            }
            if incompatible {
                self.error(
                    close,
                    DiagnosticKind::IncompatibleFunctionAttributes(name.node.clone()),
                );
            }
            self.function_declarations.insert(node, id);
            return Some(id);
        }
        let id = FunctionId(u32::try_from(self.functions.len()).ok()?);
        self.functions.push(Function {
            name: name.node.clone(),
            return_type,
            return_qualifiers,
            parameters,
            defined: definition,
            span: prototype.span,
            spirv_instruction,
            control,
        });
        self.function_declarations.insert(node, id);
        if self.scopes.declare_function(&name.node, id).is_err() {
            self.error(name.span, DiagnosticKind::Redeclaration(name.node.clone()));
        }
        Some(id)
    }

    fn function_attributes(
        &mut self,
        prototype: &FunctionPrototype,
        close: Span,
    ) -> FunctionControl {
        let mut control = FunctionControl::default();
        for attributes in [&prototype.attributes, &prototype.trailing_attributes] {
            if attributes.is_empty() {
                continue;
            }
            self.require_extensions(
                close,
                &[
                    "GL_EXT_subgroup_uniform_control_flow",
                    "GL_EXT_maximal_reconvergence",
                    "GL_EXT_function_control_attributes",
                ],
                "attribute",
            );
            for attribute in attributes {
                if let Some(argument) = &attribute.argument {
                    self.value_expression(argument);
                    continue;
                }
                match attribute.name.node.as_str() {
                    "subgroup_uniform_control_flow" => {
                        self.require_extension(
                            close,
                            "GL_EXT_subgroup_uniform_control_flow",
                            "attribute",
                        );
                        self.subgroup_uniform_control_flow = true;
                    }
                    "maximally_reconverges" => {
                        self.require_extension(close, "GL_EXT_maximal_reconvergence", "attribute");
                        self.maximally_reconverges = true;
                    }
                    "inline" => {
                        self.require_extension(
                            close,
                            "GL_EXT_function_control_attributes",
                            "attribute",
                        );
                        control.inline = true;
                    }
                    "noinline" => {
                        self.require_extension(
                            close,
                            "GL_EXT_function_control_attributes",
                            "attribute",
                        );
                        control.dont_inline = true;
                    }
                    _ => {}
                }
            }
            if control.is_incompatible() {
                self.error(
                    close,
                    DiagnosticKind::IncompatibleFunctionAttributes(prototype.name.node.clone()),
                );
            }
        }
        control
    }

    pub(crate) fn function_definition(&mut self, definition: &Node<FunctionDefinition>) {
        let prototype = &definition.prototype;
        let id = self.function_prototype(definition.id, prototype, true, None);
        if prototype.name.node == "main" {
            self.main_defined = true;
            self.main = self.main.or(id);
        }
        let Some(function) = id.and_then(|id| self.function(id)).cloned() else {
            return;
        };
        let named: Vec<(&Node<ParameterDeclaration>, &Identifier)> = prototype
            .parameters
            .iter()
            .filter_map(|parameter| parameter.name.as_ref().map(|name| (parameter, name)))
            .collect();
        self.scopes.push();
        for (parameter, name) in named {
            let Some(declared) = function
                .parameters
                .iter()
                .find(|declared| declared.name.as_deref() == Some(name.node.as_str()))
            else {
                continue;
            };
            let mut qualifiers = declared.qualifiers.clone();
            qualifiers.storage = Storage::None;
            let symbol = self.add_variable(
                &name.node,
                name.span,
                declared.ty.clone(),
                qualifiers,
                Origin::Parameter,
                None,
            );
            self.declarations.insert(parameter.id, symbol);
            if self.scopes.declare(&name.node, symbol).is_err() {
                self.error(name.span, DiagnosticKind::Redeclaration(name.node.clone()));
            }
        }
        let outer_current = core::mem::replace(&mut self.current_function, id);
        let outer_function = self.function.replace(FunctionContext {
            return_type: function.return_type.clone(),
            returns_value: false,
        });
        let outer_loops = core::mem::take(&mut self.loop_depth);
        let outer_switches = core::mem::take(&mut self.switches);
        for statement in &definition.body.statements {
            self.statement(statement);
        }
        let context = core::mem::replace(&mut self.function, outer_function);
        self.loop_depth = outer_loops;
        self.switches = outer_switches;
        self.current_function = outer_current;
        self.scopes.pop();
        let returns_value = context.is_some_and(|context| context.returns_value);
        if !function.return_type.is_void() && !function.return_type.is_error() && !returns_value {
            let close = Span::new(prototype.span.end.saturating_sub(1), prototype.span.end);
            self.error(close, DiagnosticKind::FunctionWithoutReturn(function.name));
        }
    }
}

const fn both_derivative_groups() -> DiagnosticKind {
    DiagnosticKind::InvalidQualifier {
        qualifier: "derivative_group_quads* and derivative_group_linear*",
        reason: "cannot be both specified",
    }
}

fn precision_key(specifier: &TypeSpecifier) -> Option<PrecisionKey> {
    use rglsl_ast::ast::{BasicType, ScalarType};
    match specifier.non_array {
        TypeSpecifierNonArray::Basic(
            BasicType::Scalar(scalar)
            | BasicType::Vector { scalar, .. }
            | BasicType::Matrix { scalar, .. },
        ) => match scalar {
            ScalarType::Float => Some(PrecisionKey::Float),
            ScalarType::Int | ScalarType::Uint => Some(PrecisionKey::Int),
            _ => None,
        },
        TypeSpecifierNonArray::Opaque(ref word) => Some(PrecisionKey::Opaque(word.clone())),
        _ => None,
    }
}

const NULL_INITIALIZER: &str = "GL_EXT_null_initializer";

pub const fn is_null_initializer(initializer: &Initializer) -> bool {
    matches!(*initializer, Initializer::List(ref items) if items.is_empty())
}

impl<'b> Cx<'b, Analyzer<'_>> {
    pub(crate) async fn qualifiers(self, qualifier: &'b Spanned<TypeQualifier>) -> Qualifiers {
        let mut result = Qualifiers::default();
        for single in &qualifier.qualifiers {
            match &single.node {
                SingleTypeQualifier::Layout(layout) => {
                    for id in &layout.ids {
                        let value = match &id.value {
                            Some(expression) => {
                                let operand = self.call(self.clone().expression(expression)).await;
                                self.with(|analyzer| {
                                    analyzer.layout_value(&id.name.node, expression, &operand)
                                })
                            }
                            None => None,
                        };
                        result.layout.push(LayoutEntry {
                            name: id.name.node.clone(),
                            has_value: id.value.is_some(),
                            value,
                            span: id.span,
                        });
                    }
                }
                SingleTypeQualifier::SpirvDecorate(decorate) => {
                    if let Some(decoration) = self.call(self.clone().spirv_decorate(decorate)).await
                    {
                        result.spirv_decorations.push(decoration);
                    }
                }
                _ => self.with(|analyzer| analyzer.single_qualifier(single, &mut result)),
            }
        }
        self.with(|analyzer| analyzer.finish_qualifiers(&result));
        result
    }

    pub(crate) async fn optional_qualifiers(self, ty: &'b FullySpecifiedType) -> Qualifiers {
        let mut qualifiers = match &ty.qualifier {
            Some(qualifier) => self.call(self.clone().qualifiers(qualifier)).await,
            None => Qualifiers::default(),
        };
        self.with(|analyzer| analyzer.default_precision_of(ty, &mut qualifiers));
        qualifiers
    }

    pub(crate) async fn array_sizes(
        self,
        specifier: Option<&'b Spanned<ArraySpecifier>>,
    ) -> Vec<ArraySize> {
        let Some(specifier) = specifier else {
            return Vec::new();
        };
        let mut sizes = Vec::with_capacity(specifier.dimensions.len());
        for dimension in &specifier.dimensions {
            sizes.push(match &dimension.node {
                ArrayDimension::Unsized => ArraySize::Unsized,
                ArrayDimension::Sized(expression) => {
                    let operand = self.call(self.clone().expression(expression)).await;
                    self.with(|analyzer| analyzer.array_size_with(expression, &operand))
                }
            });
        }
        sizes
    }

    pub(crate) async fn type_specifier(self, specifier: &'b Spanned<TypeSpecifier>) -> Type {
        self.call(
            self.clone()
                .bare_type_specifier(&specifier.node, specifier.span),
        )
        .await
    }

    pub(crate) async fn bare_type_specifier(
        self,
        specifier: &'b TypeSpecifier,
        span: Span,
    ) -> Type {
        let base = match &specifier.non_array {
            TypeSpecifierNonArray::Parameterized(kind) => {
                self.call(self.clone().parameterized_type(
                    *kind,
                    specifier.parameters.as_ref(),
                    span,
                ))
                .await
            }
            TypeSpecifierNonArray::Struct(structure) => {
                self.call(self.clone().struct_specifier(structure)).await
            }
            TypeSpecifierNonArray::Spirv(spirv) => {
                self.call(self.clone().spirv_type_specifier(spirv)).await
            }
            _ => {
                if let Some(parameters) = specifier.parameters.as_ref() {
                    self.call(self.clone().ignored_type_parameters(parameters))
                        .await;
                }
                self.with(|analyzer| analyzer.base_type(specifier, span))
            }
        };
        let dimensions = self
            .call(self.clone().array_sizes(specifier.array.as_ref()))
            .await;
        base.with_dimensions(&dimensions)
    }

    pub(crate) async fn struct_members(
        self,
        declarations: &'b [Spanned<StructDeclaration>],
        in_block: Option<Qualifiers>,
    ) -> Vec<Member> {
        let in_heap = in_block
            .as_ref()
            .is_some_and(|block| is_heap_storage(block.storage));
        let mut members: Vec<Member> = Vec::new();
        let count = declarations.len();
        for (position, declaration) in declarations.iter().enumerate() {
            let placement = Placement {
                in_block: in_block.clone(),
                in_heap,
                last: position + 1 == count,
            };
            if let TypeSpecifierNonArray::InlineBlock(ref inner) =
                declaration.ty.specifier.node.non_array
            {
                members = self
                    .call(
                        self.clone()
                            .inline_block_members(declaration, inner, placement, members),
                    )
                    .await;
            } else {
                members = self
                    .call(self.clone().plain_members(declaration, placement, members))
                    .await;
            }
        }
        members
    }

    async fn inline_block_members(
        self,
        declaration: &'b Spanned<StructDeclaration>,
        inner: &'b [Spanned<StructDeclaration>],
        placement: Placement,
        mut members: Vec<Member>,
    ) -> Vec<Member> {
        let qualifiers = self
            .call(self.clone().optional_qualifiers(&declaration.ty.node))
            .await;
        let base = self
            .call(self.clone().inline_reference(
                declaration.ty.span,
                qualifiers,
                inner,
                placement.in_heap,
            ))
            .await;
        let mut member_qualifiers = Qualifiers::default();
        if let Some(block) = &placement.in_block {
            member_qualifiers.storage = block.storage;
        }
        for declarator in &declaration.declarators {
            let dimensions = self
                .call(self.clone().array_sizes(declarator.array.as_ref()))
                .await;
            let ty = base.clone().with_dimensions(&dimensions);
            members.push(Member {
                name: declarator.name.node.clone(),
                ty,
                qualifiers: member_qualifiers.clone(),
            });
        }
        members
    }

    async fn plain_members(
        self,
        declaration: &'b Spanned<StructDeclaration>,
        placement: Placement,
        mut members: Vec<Member>,
    ) -> Vec<Member> {
        let mut qualifiers = self
            .call(self.clone().optional_qualifiers(&declaration.ty.node))
            .await;
        self.with(|analyzer| {
            analyzer.member_qualifier_checks(declaration, placement.in_heap, &mut qualifiers);
            if matches!(
                declaration.ty.specifier.non_array,
                TypeSpecifierNonArray::Struct(_)
            ) {
                analyzer.error(
                    declaration.ty.specifier.span,
                    DiagnosticKind::NestedStructDefinition,
                );
            }
        });
        let base = self
            .call(self.clone().type_specifier(&declaration.ty.specifier))
            .await;
        let qualifiers = self.with(|analyzer| {
            analyzer.member_storage(declaration, qualifiers, placement.in_block.as_ref())
        });
        for declarator in &declaration.declarators {
            let dimensions = self
                .call(self.clone().array_sizes(declarator.array.as_ref()))
                .await;
            self.with(|analyzer| {
                analyzer.typed_member(
                    declarator,
                    &qualifiers,
                    &base,
                    placement.place(),
                    &mut members,
                    &dimensions,
                );
            });
        }
        members
    }

    async fn struct_specifier(self, specifier: &'b StructSpecifier) -> Type {
        let members = self
            .call(self.clone().struct_members(&specifier.declarations, None))
            .await;
        self.with(|analyzer| analyzer.struct_specifier_with(specifier, members))
    }
}

impl<'b> Cx<'b, Analyzer<'_>> {
    pub(crate) async fn initializer(
        self,
        span: Span,
        initializer: &'b Spanned<Initializer>,
        expected: Type,
    ) -> Operand {
        match &initializer.node {
            Initializer::Expression(expression) => {
                self.call(self.clone().value_expression(expression)).await
            }
            Initializer::List(items) => {
                self.call(self.clone().initializer_list(span, items, expected))
                    .await
            }
        }
    }

    async fn initializer_list(
        self,
        span: Span,
        items: &'b [Spanned<Initializer>],
        expected: Type,
    ) -> Operand {
        let mut list = self.with(|analyzer| analyzer.start_list(span, items, &expected));
        for (index, item) in items.iter().enumerate() {
            let element = list
                .element_types
                .get(index)
                .cloned()
                .unwrap_or(Type::ERROR);
            let operand = self
                .call(self.clone().initializer(span, item, element.clone()))
                .await;
            self.with(|analyzer| {
                analyzer.list_item(span, items, &expected, &mut list, &element, operand);
            });
        }
        self.with(|analyzer| analyzer.finish_list(span, &expected, list))
    }
}
