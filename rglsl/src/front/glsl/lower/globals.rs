use alloc::{format, string::String, vec, vec::Vec};

use rglsl_ast::ast::{
    BlockInstance, BlockStructure, Declaration, DeclarationKind, ExternalDeclaration,
    InitDeclarator, InitDeclaratorList, Initializer, InterpolationQualifier, Node,
    SingleTypeQualifier, Spanned, StorageQualifier, TypeQualifier,
};
use rglsl_sema::scope::{Origin, PerVertex, Qualifiers, Storage, SymbolKind, Variable};
use rglsl_sema::types::{
    ArraySize as GlslArraySize, BlockId, BlockStorage, OpaqueKind, Scalar, Type as GlslType,
    TypeKind,
};
use rglsl_sema::SymbolId;

use super::types::image_dimension;
use super::{internal, semantic, unsupported, GlobalRef, Initialization, Lowerer, Packing, Result};
use super::{specialization, xfb};
use crate::proc::Alignment;
use crate::{
    AddressSpace, Binding, BuiltIn, ConservativeDepth, GlobalVariable, Handle, ImageClass,
    Interpolation, MemoryDecorations, ResourceBinding, Sampling, ShaderBallot, ShaderCore, Span,
    StorageAccess, StorageFormat, SubgroupMask, TypeInner,
};

fn layout_names(qualifier: Option<&Spanned<TypeQualifier>>) -> Vec<&str> {
    let mut names = Vec::new();
    for single in qualifier.iter().flat_map(|q| &q.qualifiers) {
        if let SingleTypeQualifier::Layout(ref layout) = single.node {
            names.extend(layout.ids.iter().map(|id| id.name.node.as_str()));
        }
    }
    names
}

fn tile_shading_rate_index(name: &str) -> Option<usize> {
    [
        "shading_rate_xqcom",
        "shading_rate_yqcom",
        "shading_rate_zqcom",
    ]
    .iter()
    .position(|rate| name.eq_ignore_ascii_case(rate))
}

fn has_qualifier(
    qualifier: Option<&Spanned<TypeQualifier>>,
    test: impl Fn(&SingleTypeQualifier) -> bool,
) -> bool {
    qualifier
        .iter()
        .flat_map(|q| &q.qualifiers)
        .any(|single| test(&single.node))
}

fn storage_of(qualifier: Option<&Spanned<TypeQualifier>>) -> Option<StorageQualifier> {
    qualifier
        .iter()
        .flat_map(|q| &q.qualifiers)
        .find_map(|single| match single.node {
            SingleTypeQualifier::Storage(
                storage @ (StorageQualifier::In
                | StorageQualifier::Out
                | StorageQualifier::Uniform
                | StorageQualifier::Buffer),
            ) => Some(storage),
            _ => None,
        })
}

const PER_VERTEX: [&str; 4] = [
    "gl_Position",
    "gl_PointSize",
    "gl_ClipDistance",
    "gl_CullDistance",
];

const fn per_vertex_interpolation(
    per_vertex: PerVertex,
    interpolation: Option<InterpolationQualifier>,
) -> Interpolation {
    Interpolation::PerVertex {
        nv: matches!(per_vertex, PerVertex::Nv),
        flat: matches!(interpolation, Some(InterpolationQualifier::Flat)),
        linear: matches!(interpolation, Some(InterpolationQualifier::Noperspective)),
    }
}

const fn interpolation_of(qualifier: InterpolationQualifier) -> Interpolation {
    match qualifier {
        InterpolationQualifier::Flat => Interpolation::Flat,
        InterpolationQualifier::Noperspective => Interpolation::Linear,
        InterpolationQualifier::Smooth => Interpolation::Perspective,
    }
}

pub(super) fn image_format(word: &str) -> Option<StorageFormat> {
    use StorageFormat as Sf;
    Some(match word {
        "rgba32f" => Sf::Rgba32Float,
        "rgba16f" => Sf::Rgba16Float,
        "rg32f" => Sf::Rg32Float,
        "rg16f" => Sf::Rg16Float,
        "r11f_g11f_b10f" => Sf::Rg11b10Ufloat,
        "r32f" => Sf::R32Float,
        "r16f" => Sf::R16Float,
        "rgba16" => Sf::Rgba16Unorm,
        "rgb10_a2ui" => Sf::Rgb10a2Uint,
        "rgb10_a2" => Sf::Rgb10a2Unorm,
        "rgba8" => Sf::Rgba8Unorm,
        "rg16" => Sf::Rg16Unorm,
        "rg8" => Sf::Rg8Unorm,
        "r16" => Sf::R16Unorm,
        "r8" => Sf::R8Unorm,
        "rgba16_snorm" => Sf::Rgba16Snorm,
        "rgba8_snorm" => Sf::Rgba8Snorm,
        "rg16_snorm" => Sf::Rg16Snorm,
        "rg8_snorm" => Sf::Rg8Snorm,
        "r16_snorm" => Sf::R16Snorm,
        "r8_snorm" => Sf::R8Snorm,
        "rgba32i" => Sf::Rgba32Sint,
        "rgba16i" => Sf::Rgba16Sint,
        "rgba8i" => Sf::Rgba8Sint,
        "rg32i" => Sf::Rg32Sint,
        "rg16i" => Sf::Rg16Sint,
        "rg8i" => Sf::Rg8Sint,
        "r32i" => Sf::R32Sint,
        "r16i" => Sf::R16Sint,
        "r8i" => Sf::R8Sint,
        "rgba32ui" => Sf::Rgba32Uint,
        "rgba16ui" => Sf::Rgba16Uint,
        "rgba8ui" => Sf::Rgba8Uint,
        "r64ui" => Sf::R64Uint,
        "r64i" => Sf::R64Sint,
        "rg32ui" => Sf::Rg32Uint,
        "rg16ui" => Sf::Rg16Uint,
        "rg8ui" => Sf::Rg8Uint,
        "r32ui" => Sf::R32Uint,
        "r16ui" => Sf::R16Uint,
        "r8ui" => Sf::R8Uint,
        _ => return None,
    })
}

pub(super) const fn unknown_format(sampled: rglsl_sema::types::SampledType) -> StorageFormat {
    StorageFormat::Unknown(super::types::sampled_scalar(sampled))
}

pub(super) fn storage_access(qualifiers: &Qualifiers) -> StorageAccess {
    if qualifiers.readonly {
        StorageAccess::LOAD
    } else if qualifiers.writeonly {
        StorageAccess::STORE
    } else {
        StorageAccess::LOAD | StorageAccess::STORE
    }
}

pub(super) fn image_access(qualifiers: &Qualifiers) -> StorageAccess {
    if qualifiers.readonly || qualifiers.writeonly {
        storage_access(qualifiers)
    } else {
        StorageAccess::LOAD | StorageAccess::STORE | StorageAccess::ATOMIC
    }
}

fn tensor_access(qualifiers: &Qualifiers, ty: &GlslType) -> MemoryDecorations {
    let mut decorations = MemoryDecorations::empty();
    if !matches!(ty.kind, TypeKind::Tensor { .. }) {
        return decorations;
    }
    if qualifiers.readonly {
        decorations |= MemoryDecorations::NON_WRITABLE;
    }
    if qualifiers.writeonly {
        decorations |= MemoryDecorations::NON_READABLE;
    }
    decorations
}

pub(super) fn parameter_memory(qualifiers: &Qualifiers, ty: &GlslType) -> MemoryDecorations {
    let image = ty
        .as_opaque()
        .is_some_and(|opaque| opaque.kind == OpaqueKind::Image);
    if !image && !matches!(ty.kind, TypeKind::Tensor { .. }) {
        return MemoryDecorations::empty();
    }
    member_memory(qualifiers, qualifiers)
}

pub(super) fn member_memory(block: &Qualifiers, member: &Qualifiers) -> MemoryDecorations {
    let mut decorations = memory(block) | memory(member);
    if block.readonly || member.readonly {
        decorations |= MemoryDecorations::NON_WRITABLE;
    }
    if block.writeonly || member.writeonly {
        decorations |= MemoryDecorations::NON_READABLE;
    }
    decorations
}

fn memory(qualifiers: &Qualifiers) -> MemoryDecorations {
    let mut decorations = MemoryDecorations::empty();
    if qualifiers.coherent {
        decorations |= MemoryDecorations::COHERENT;
    }
    for (present, decoration) in [
        (qualifiers.volatile, MemoryDecorations::VOLATILE),
        (qualifiers.restrict, MemoryDecorations::RESTRICT),
        (
            qualifiers.device_coherent,
            MemoryDecorations::DEVICE_COHERENT,
        ),
        (
            qualifiers.queue_family_coherent,
            MemoryDecorations::QUEUE_FAMILY_COHERENT,
        ),
        (
            qualifiers.workgroup_coherent,
            MemoryDecorations::WORKGROUP_COHERENT,
        ),
        (
            qualifiers.subgroup_coherent,
            MemoryDecorations::SUBGROUP_COHERENT,
        ),
        (
            qualifiers.shader_call_coherent,
            MemoryDecorations::SHADER_CALL_COHERENT,
        ),
        (qualifiers.nonprivate, MemoryDecorations::NONPRIVATE),
        (qualifiers.nontemporal, MemoryDecorations::NONTEMPORAL),
    ] {
        if present {
            decorations |= decoration;
        }
    }
    decorations
}

fn builtin_of(name: &str) -> Option<BuiltIn> {
    Some(match name {
        "gl_Position" | "gl_FragCoord" => BuiltIn::Position { invariant: false },
        "gl_PointSize" => BuiltIn::PointSize,
        "gl_ClipDistance" => BuiltIn::ClipDistances,
        "gl_CullDistance" => BuiltIn::CullDistance,
        "gl_VertexIndex" => BuiltIn::VertexIndex,
        "gl_InstanceIndex" => BuiltIn::InstanceIndex,
        "gl_BaseVertex" => BuiltIn::BaseVertex,
        "gl_BaseInstance" => BuiltIn::BaseInstance,
        "gl_DrawID" => BuiltIn::DrawIndex,
        "gl_FrontFacing" => BuiltIn::FrontFacing,
        "gl_FragDepth" => BuiltIn::FragDepth,
        "gl_PointCoord" => BuiltIn::PointCoord,
        "gl_PrimitiveID" => BuiltIn::PrimitiveIndex,
        "gl_SampleID" => BuiltIn::SampleIndex,
        "gl_SamplePosition" => BuiltIn::SamplePosition,
        "gl_HelperInvocation" => BuiltIn::HelperInvocation,
        "gl_BaseVertexARB" => BuiltIn::BaseVertex,
        "gl_BaseInstanceARB" => BuiltIn::BaseInstance,
        "gl_DrawIDARB" => BuiltIn::DrawIndex,
        "gl_DeviceIndex" => BuiltIn::DeviceIndex,
        "gl_PrimitiveShadingRateEXT" => BuiltIn::PrimitiveShadingRate,
        "gl_ShadingRateEXT" => BuiltIn::ShadingRate,
        "gl_FragSizeEXT" => BuiltIn::FragSize { nv: false },
        "gl_FragInvocationCountEXT" => BuiltIn::FragInvocationCount { nv: false },
        "gl_FragmentSizeNV" => BuiltIn::FragSize { nv: true },
        "gl_InvocationsPerPixelNV" => BuiltIn::FragInvocationCount { nv: true },
        "gl_FragFullyCoveredNV" => BuiltIn::FullyCovered,
        "gl_BaryCoordNV" => BuiltIn::Barycentric {
            perspective: true,
            nv: true,
        },
        "gl_BaryCoordNoPerspNV" => BuiltIn::Barycentric {
            perspective: false,
            nv: true,
        },
        "gl_BaryCoordEXT" => BuiltIn::Barycentric {
            perspective: true,
            nv: false,
        },
        "gl_BaryCoordNoPerspEXT" => BuiltIn::Barycentric {
            perspective: false,
            nv: false,
        },
        "gl_FragStencilRefARB" => BuiltIn::FragStencilRef,
        "gl_NumWorkGroups" => BuiltIn::NumWorkGroups,
        "gl_WorkGroupID" => BuiltIn::WorkGroupId,
        "gl_LocalInvocationID" => BuiltIn::LocalInvocationId,
        "gl_GlobalInvocationID" => BuiltIn::GlobalInvocationId,
        "gl_LocalInvocationIndex" => BuiltIn::LocalInvocationIndex,
        "gl_PrimitiveIDIn" => BuiltIn::PrimitiveIndex,
        "gl_InvocationID" => BuiltIn::InvocationId,
        "gl_PatchVerticesIn" => BuiltIn::PatchVertices,
        "gl_TessCoord" => BuiltIn::TessCoord,
        "gl_TessLevelOuter" => BuiltIn::TessLevelOuter,
        "gl_TessLevelInner" => BuiltIn::TessLevelInner,
        "gl_Layer" => BuiltIn::Layer {
            viewport_relative: false,
            secondary_view_offset: None,
        },
        "gl_ViewportIndex" => BuiltIn::ViewportIndex,
        "gl_ViewIndex" => BuiltIn::ViewIndex,
        "gl_ViewportMask" => BuiltIn::ViewportMaskNV,
        "gl_SecondaryPositionNV" => BuiltIn::SecondaryPositionNV,
        "gl_SecondaryViewportMaskNV" => BuiltIn::SecondaryViewportMaskNV,
        "gl_PositionPerViewNV" => BuiltIn::PositionPerViewNV,
        "gl_ViewportMaskPerViewNV" => BuiltIn::ViewportMaskPerViewNV,
        "gl_SampleMask" | "gl_SampleMaskIn" => BuiltIn::SampleMask {
            override_coverage: false,
        },
        "gl_SubgroupSize" => BuiltIn::SubgroupSize,
        "gl_SubgroupInvocationID" => BuiltIn::SubgroupInvocationId,
        "gl_NumSubgroups" => BuiltIn::NumSubgroups,
        "gl_SubgroupID" => BuiltIn::SubgroupId,
        "gl_SubGroupSizeARB" => BuiltIn::ShaderBallot(ShaderBallot::Size),
        "gl_SubGroupInvocationARB" => BuiltIn::ShaderBallot(ShaderBallot::InvocationId),
        "gl_TileOffsetQCOM" => BuiltIn::TileOffset,
        "gl_TileDimensionQCOM" => BuiltIn::TileDimension,
        "gl_TileApronSizeQCOM" => BuiltIn::TileApronSize,
        "gl_WarpsPerSMNV" => BuiltIn::ShaderCore(ShaderCore::WarpsPerSmNv),
        "gl_SMCountNV" => BuiltIn::ShaderCore(ShaderCore::SmCountNv),
        "gl_WarpIDNV" => BuiltIn::ShaderCore(ShaderCore::WarpIdNv),
        "gl_SMIDNV" => BuiltIn::ShaderCore(ShaderCore::SmIdNv),
        "gl_CoreIDARM" => BuiltIn::ShaderCore(ShaderCore::CoreIdArm),
        "gl_CoreCountARM" => BuiltIn::ShaderCore(ShaderCore::CoreCountArm),
        "gl_CoreMaxIDARM" => BuiltIn::ShaderCore(ShaderCore::CoreMaxIdArm),
        "gl_WarpIDARM" => BuiltIn::ShaderCore(ShaderCore::WarpIdArm),
        "gl_WarpMaxIDARM" => BuiltIn::ShaderCore(ShaderCore::WarpMaxIdArm),
        _ if super::mesh::mesh_builtin(name).is_some() => super::mesh::mesh_builtin(name)?,
        _ => {
            if let Some(mask) = name
                .strip_prefix("gl_Subgroup")
                .and_then(|rest| rest.strip_suffix("Mask"))
                .and_then(subgroup_mask)
            {
                BuiltIn::SubgroupMask(mask)
            } else {
                let mask = name
                    .strip_prefix("gl_SubGroup")
                    .and_then(|rest| rest.strip_suffix("MaskARB"))
                    .and_then(subgroup_mask)?;
                BuiltIn::ShaderBallot(ShaderBallot::Mask(mask))
            }
        }
    })
}

fn subgroup_mask(name: &str) -> Option<SubgroupMask> {
    Some(match name {
        "Eq" => SubgroupMask::Eq,
        "Ge" => SubgroupMask::Ge,
        "Gt" => SubgroupMask::Gt,
        "Le" => SubgroupMask::Le,
        "Lt" => SubgroupMask::Lt,
        _ => return None,
    })
}

impl<'a> Lowerer<'a> {
    fn glsl_location_count(&self, ty: &GlslType) -> u32 {
        enum Task<'t> {
            Visit(&'t GlslType),
            Sum(&'t GlslType, usize),
        }
        let wide = |scalar: Scalar, size: u8| u32::from(scalar == Scalar::Double && size > 2) + 1;
        let arrayed = |ty: &GlslType, element: u32| {
            ty.dimensions()
                .iter()
                .map(|size| match *size {
                    GlslArraySize::Sized(length) => length,
                    GlslArraySize::Specialized(_) | GlslArraySize::Unsized => 1,
                })
                .fold(element, u32::saturating_mul)
        };
        let mut tasks = alloc::vec![Task::Visit(ty)];
        let mut counts: Vec<u32> = Vec::new();
        while let Some(task) = tasks.pop() {
            match task {
                Task::Visit(ty) => {
                    let members = match ty.kind {
                        TypeKind::Struct(id) => self
                            .analysis
                            .types
                            .structure(id)
                            .map(|structure| structure.members.as_slice()),
                        TypeKind::Block(id) => self
                            .analysis
                            .types
                            .block(id)
                            .map(|block| block.members.as_slice()),
                        _ => None,
                    };
                    if let Some(members) = members {
                        tasks.push(Task::Sum(ty, members.len()));
                        tasks.extend(members.iter().rev().map(|member| Task::Visit(&member.ty)));
                        continue;
                    }
                    let element = match ty.kind {
                        TypeKind::Vector { scalar, size } => wide(scalar, size),
                        TypeKind::Matrix {
                            scalar,
                            columns,
                            rows,
                        } => u32::from(columns).saturating_mul(wide(scalar, rows)),
                        _ => 1,
                    };
                    counts.push(arrayed(ty, element));
                }
                Task::Sum(ty, count) => {
                    let start = counts.len().saturating_sub(count);
                    let element = counts.drain(start..).fold(0, u32::saturating_add);
                    counts.push(arrayed(ty, element));
                }
            }
        }
        counts.pop().unwrap_or(1)
    }

    pub(super) fn global_ref(&mut self, symbol: SymbolId, at: Span) -> Result<GlobalRef> {
        super::function::lowerer_on_heap!(self, |cx| cx.global_ref(symbol, at))
    }

    pub(super) fn reserve_explicit_locations(&mut self) {
        let analysis = self.analysis;
        for declaration in &self.unit.external_declarations {
            let ExternalDeclaration::Declaration(ref declaration) = *declaration else {
                continue;
            };
            let symbols: Vec<SymbolId> = match declaration.kind {
                DeclarationKind::InitDeclaratorList(ref list) => list
                    .declarators
                    .iter()
                    .filter_map(|declarator| analysis.declarations.get(&declarator.id).copied())
                    .collect(),
                DeclarationKind::Block { .. } => analysis
                    .declarations
                    .get(&declaration.id)
                    .copied()
                    .into_iter()
                    .collect(),
                _ => Vec::new(),
            };
            for symbol in symbols {
                let Some(variable) = self.variable(symbol) else {
                    continue;
                };
                if variable.origin == Origin::BuiltIn {
                    continue;
                }
                let slot = match variable.qualifiers.storage {
                    Storage::In => 0,
                    Storage::Out => 1,
                    _ => continue,
                };
                let ranges = self.explicit_ranges(variable);
                self.explicit_locations[slot].extend(ranges);
            }
        }
    }

    fn explicit_ranges(&self, variable: &Variable) -> Vec<(u32, u32)> {
        let location_of = |qualifiers: &Qualifiers| {
            qualifiers
                .layout_entry("location")
                .and_then(|entry| entry.value)
                .and_then(|value| u32::try_from(value).ok())
        };
        let mut ranges = Vec::new();
        let mut push = |start: u32, count: u32| ranges.push((start, start.saturating_add(count)));
        let block = match variable.ty.kind {
            TypeKind::Block(id) => self.analysis.types.block(id),
            _ => None,
        };
        match (block, variable.ty.kind) {
            (Some(block), TypeKind::Block(id)) => {
                let mut next = location_of(&block.qualifiers);
                for (index, member) in (0_u32..).zip(&block.members) {
                    let mut member_ty = member.ty.clone();
                    if member_ty.outer_size() == Some(GlslArraySize::Unsized) {
                        let size = self.member_sizes.get(&(id, index)).copied().unwrap_or(1);
                        member_ty.set_outer_size(GlslArraySize::Sized(size.max(1)));
                    }
                    let count = match member_ty.element_type() {
                        Some(element) if member.qualifiers.per_view => {
                            self.glsl_location_count(&element)
                        }
                        _ => self.glsl_location_count(&member_ty),
                    };
                    let start = location_of(&member.qualifiers).or(next);
                    if let Some(start) = start {
                        push(start, count);
                    }
                    next = start.map(|start| start.saturating_add(count));
                }
            }
            _ => {
                if let Some(start) = location_of(&variable.qualifiers) {
                    let element = if self.is_per_vertex_io(&variable.qualifiers) {
                        variable.ty.element_type()
                    } else {
                        None
                    };
                    let element = if variable.qualifiers.per_view {
                        element.and_then(|element| element.element_type())
                    } else {
                        element
                    };
                    push(
                        start,
                        self.glsl_location_count(element.as_ref().unwrap_or(&variable.ty)),
                    );
                }
            }
        }
        ranges
    }

    fn auto_location(&mut self, slot: usize, count: u32) -> u32 {
        let mut start = self.next_location[slot];
        let end = |start: u32| start.saturating_add(count.max(1));
        while let Some(&(_, taken)) = self.explicit_locations[slot]
            .iter()
            .find(|&&(from, to)| from < end(start) && start < to)
        {
            start = taken;
        }
        self.next_location[slot] = start.saturating_add(count);
        start
    }

    pub(super) fn global_declaration(&mut self, declaration: &'a Declaration) -> Result<()> {
        let qualifiers: Vec<&Spanned<TypeQualifier>> = match declaration.kind {
            DeclarationKind::InitDeclaratorList(ref list) => list.ty.qualifier.iter().collect(),
            DeclarationKind::Block { ref structure, .. } => core::iter::once(&structure.qualifier)
                .chain(
                    structure
                        .members
                        .iter()
                        .filter_map(|member| member.ty.qualifier.as_ref()),
                )
                .collect(),
            DeclarationKind::Qualifier(ref qualifier)
            | DeclarationKind::QualifiedIdentifiers { ref qualifier, .. } => vec![qualifier],
            DeclarationKind::FunctionPrototype(_)
            | DeclarationKind::Precision { .. }
            | DeclarationKind::SpirvInstruction { .. }
            | DeclarationKind::SpirvExecutionMode(_) => Vec::new(),
        };
        if let Some(qualifier) = qualifiers.into_iter().find(|&qualifier| {
            layout_names(Some(qualifier))
                .iter()
                .any(|name| name.starts_with("xfb_"))
        }) {
            if self.xfb_default_buffer().is_none() {
                return Err(semantic(
                    "transform feedback qualifier: not supported in this stage",
                    self.at(qualifier.span),
                ));
            }
            self.xfb.mode = true;
        }
        match declaration.kind {
            DeclarationKind::FunctionPrototype(_)
            | DeclarationKind::Precision { .. }
            | DeclarationKind::SpirvInstruction { .. }
            | DeclarationKind::SpirvExecutionMode(_) => Ok(()),
            DeclarationKind::InitDeclaratorList(ref list) => {
                for declarator in &list.declarators {
                    let result = self.global_declarator(list, declarator);
                    self.report(result);
                }
                Ok(())
            }
            DeclarationKind::Block {
                ref structure,
                ref instance,
            } => self.block(declaration, structure, instance.as_ref()),
            DeclarationKind::Qualifier(ref qualifier) => self.default_qualifier(qualifier),
            DeclarationKind::QualifiedIdentifiers {
                ref qualifier,
                ref identifiers,
            } => {
                let qualifier = Some(qualifier);
                if has_qualifier(qualifier, |q| matches!(q, SingleTypeQualifier::Invariant)) {
                    for identifier in identifiers {
                        self.invariant
                            .push((identifier.node.clone(), self.at(identifier.span)));
                    }
                }
                Ok(())
            }
        }
    }

    fn default_qualifier(&mut self, qualifier: &'a Spanned<TypeQualifier>) -> Result<()> {
        let at = self.at(qualifier.span);
        let names = layout_names(Some(qualifier));
        match storage_of(Some(qualifier)) {
            Some(storage @ (StorageQualifier::Uniform | StorageQualifier::Buffer)) => {
                let defaults = if storage == StorageQualifier::Buffer {
                    &mut self.buffer_defaults
                } else {
                    &mut self.uniform_defaults
                };
                for name in names {
                    match name {
                        "std140" | "shared" | "packed" => defaults.packing = Some(Packing::Std140),
                        "std430" => defaults.packing = Some(Packing::Std430),
                        "row_major" => defaults.row_major = Some(true),
                        "column_major" => defaults.row_major = Some(false),
                        "scalar" => defaults.packing = Some(Packing::Scalar),
                        _ => {}
                    }
                }
                Ok(())
            }
            Some(StorageQualifier::In) => {
                let owned: Vec<String> = names.iter().map(|name| String::from(*name)).collect();
                self.stage_input_layout(&owned);
                self.stage_input_values(qualifier);
                for name in names {
                    match name {
                        "early_fragment_tests" => self.early_fragment_tests = true,
                        "quad_derivatives" => self.quad_control.quad_derivatives = true,
                        "full_quads" => self.quad_control.require_full_quads = true,
                        "local_size_x" | "local_size_y" | "local_size_z" => {
                            let value = xfb::ast_layout_value(self, Some(qualifier), name);
                            let index = match name {
                                "local_size_x" => 0,
                                "local_size_y" => 1,
                                _ => 2,
                            };
                            if let Some(slot) = self.declared_local_size.get_mut(index) {
                                *slot = value;
                            }
                        }
                        _ if name.eq_ignore_ascii_case("non_coherent_attachment_readQCOM") => {
                            self.non_coherent_tile_read = true;
                        }
                        _ if tile_shading_rate_index(name).is_some() => {
                            let index = tile_shading_rate_index(name).unwrap_or(0);
                            let value = xfb::ast_layout_value(self, Some(qualifier), name)
                                .filter(|value| *value > 0);
                            if let (Some(slot), Some(value)) =
                                (self.tile_shading_rate.get_mut(index), value)
                            {
                                *slot = Some(value);
                            }
                        }
                        "local_size_x_id" | "local_size_y_id" | "local_size_z_id" => {
                            let id = xfb::ast_layout_value(self, Some(qualifier), name)
                                .filter(|value| *value != u32::MAX)
                                .ok_or_else(|| {
                                    semantic("the specialization id is out of range", at)
                                })?;
                            if let Some(slot) = specialization::local_size_index(name)
                                .and_then(|index| self.local_size_ids.get_mut(index))
                            {
                                *slot = Some(id);
                            }
                        }
                        _ => {}
                    }
                }
                Ok(())
            }
            Some(StorageQualifier::Out) => {
                let owned: Vec<String> = names.iter().map(|name| String::from(*name)).collect();
                self.stage_output_layout(&owned, qualifier);
                let qualifier = Some(qualifier);
                if let Some(buffer) = xfb::ast_layout_value(self, qualifier, "xfb_buffer") {
                    self.xfb.default_buffer = Some(Some(buffer));
                }
                if let (Some(buffer), Some(stride)) = (
                    self.xfb_default_buffer(),
                    xfb::ast_layout_value(self, qualifier, "xfb_stride"),
                ) {
                    self.xfb_stride(buffer, stride, at)?;
                }
                Ok(())
            }
            _ => Ok(()),
        }
    }

    fn global_declarator(
        &mut self,
        list: &'a InitDeclaratorList,
        declarator: &'a Node<InitDeclarator>,
    ) -> Result<()> {
        let at = self.at(declarator.span);
        let Some(&symbol) = self.analysis.declarations.get(&declarator.id) else {
            return Ok(());
        };
        if self.is_per_vertex_member(symbol) {
            return self.builtin_redeclaration(symbol, list, declarator, at);
        }
        let Some(variable) = self.variable(symbol) else {
            return Ok(());
        };
        if variable.origin == Origin::BuiltIn {
            return self.builtin_redeclaration(symbol, list, declarator, at);
        }
        let name = declarator.name.node.clone();
        let qualifiers = &variable.qualifiers;
        let ty = &variable.ty;
        if qualifiers.constant {
            if let Some(entry) = qualifiers.layout_entry("constant_id") {
                let id = entry
                    .value
                    .and_then(|value| u32::try_from(value).ok())
                    .filter(|value| *value != u32::MAX)
                    .ok_or_else(|| semantic("the `constant_id` is out of range", at))?;
                let value = variable.value.as_ref().ok_or_else(|| {
                    unsupported("specialization constants without a known default", at)
                })?;
                let ir = self.ir_type(ty, at)?;
                let init = self.global_constant(ty, &value.values, at)?;
                let handle = self.module.overrides.append(
                    crate::Override {
                        name: Some(name),
                        id: Some(id),
                        ty: ir,
                        init: Some(init),
                    },
                    at,
                );
                self.globals.insert(symbol, GlobalRef::Override(handle));
                return Ok(());
            }
            if qualifiers.specialization {
                if let Some(initializer) = declarator.initializer.as_ref() {
                    let handle = self.specialized_initializer(initializer, ty, Some(name), at)?;
                    self.globals.insert(symbol, GlobalRef::Override(handle));
                    return Ok(());
                }
            }
            if let Some(ref value) = variable.value {
                let ir = self.ir_type(ty, at)?;
                let init = self.global_constant(ty, &value.values, at)?;
                let handle = self.module.constants.append(
                    crate::Constant {
                        name: Some(name),
                        ty: ir,
                        init,
                    },
                    at,
                );
                self.globals.insert(symbol, GlobalRef::Constant(handle));
                return Ok(());
            }
        }
        match qualifiers.storage {
            Storage::In | Storage::Out => self.interface_variable(symbol, name, at),
            Storage::Uniform if self.is_heap_view(qualifiers) => {
                self.heap_resource(symbol, name, list.ty.qualifier.as_ref(), at)
            }
            Storage::Uniform => self.resource(symbol, name, at),
            Storage::TaskPayloadShared => self.task_payload_variable(symbol, name, at),
            Storage::TileImage => self.tile_image_variable(symbol, name, at),
            Storage::Shared => {
                let ir = self.ir_type(ty, at)?;
                let init = declarator
                    .initializer
                    .as_ref()
                    .filter(|initializer| {
                        rglsl_sema::analyze::is_null_initializer(&initializer.node)
                    })
                    .map(|_| {
                        self.module
                            .global_expressions
                            .append(crate::Expression::ZeroValue(ir), at)
                    });
                let handle = self.module.global_variables.append(
                    GlobalVariable {
                        name: Some(name),
                        space: AddressSpace::WorkGroup,
                        binding: None,
                        ty: ir,
                        init,
                        memory_decorations: memory(qualifiers),
                        io: None,
                        xfb: None,
                        input_attachment_index: None,
                        heap_offset: None,
                        tile_attachment: false,
                        spirv_decorations: Vec::new(),
                        relaxed_precision: false,
                        immediate_bank: None,
                        block: None,
                    },
                    at,
                );
                self.globals.insert(symbol, GlobalRef::Variable(handle));
                Ok(())
            }
            Storage::Buffer | Storage::Inout | Storage::ResourceHeap | Storage::SamplerHeap => {
                Err(internal(at))
            }
            Storage::RayPayload
            | Storage::RayPayloadIn
            | Storage::HitAttribute
            | Storage::CallableData
            | Storage::CallableDataIn
            | Storage::HitObjectAttributeNv
            | Storage::HitObjectAttributeExt => self.ray_variable(symbol, name, at),
            Storage::None => self.private(symbol, name, declarator, at),
        }
    }

    fn tile_image_variable(&mut self, symbol: SymbolId, name: String, at: Span) -> Result<()> {
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        if variable.ty.is_array() {
            return Err(unsupported("arrays of tile images", at));
        }
        let location = variable
            .qualifiers
            .layout_entry("location")
            .and_then(|entry| entry.value)
            .and_then(|value| u32::try_from(value).ok())
            .ok_or_else(|| internal(at))?;
        let ty = self.ir_type(&variable.ty, at)?;
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(name),
                space: AddressSpace::Handle,
                binding: None,
                ty,
                init: None,
                memory_decorations: MemoryDecorations::empty(),
                io: Some(Binding::Location {
                    location,
                    interpolation: None,
                    sampling: None,
                    blend_src: None,
                    per_primitive: false,
                    per_view: false,
                    component: None,
                    invariant: false,
                    patch: false,
                }),
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                immediate_bank: None,
                block: None,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
            },
            at,
        );
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        Ok(())
    }

    fn private(
        &mut self,
        symbol: SymbolId,
        name: String,
        declarator: &'a Node<InitDeclarator>,
        at: Span,
    ) -> Result<()> {
        let analysis = self.analysis;
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let ty = &variable.ty;
        let ir = if ty.outer_size() == Some(GlslArraySize::Unsized) {
            let mut sized = ty.clone();
            let size = self
                .implicit_sizes
                .get(&symbol)
                .copied()
                .unwrap_or(1)
                .max(1);
            sized.set_outer_size(GlslArraySize::Sized(size));
            self.variable_ir_type(&sized, &variable.qualifiers, at)?
        } else {
            self.variable_ir_type(ty, &variable.qualifiers, at)?
        };
        let mut init = None;
        let mut runtime = None;
        if let Some(ref initializer) = declarator.initializer {
            if rglsl_sema::analyze::is_null_initializer(&initializer.node) {
                init = Some(
                    self.module
                        .global_expressions
                        .append(crate::Expression::ZeroValue(ir), at),
                );
            }
            let constant = match initializer.node {
                Initializer::Expression(ref expression) if self.object => analysis
                    .expression(expression.id)
                    .filter(|info| {
                        info.is_constant
                            && !info.is_specialization
                            && !info.ty.contains_reference(&analysis.types)
                    })
                    .and_then(|info| Some((info.ty.clone(), info.value.clone()?))),
                Initializer::Expression(_) | Initializer::List(_) => None,
            };
            let converted = constant.and_then(|(from, value)| {
                if from == *ty {
                    return Some(value.values);
                }
                let target = ty.base_scalar()?;
                (from.same_shape(ty) && from.base_scalar().is_some())
                    .then(|| value.values.iter().map(|v| v.convert(target)).collect())
            });
            match converted {
                Some(values) => init = Some(self.global_constant(ty, &values, at)?),
                None if init.is_some() => {}
                None => runtime = Some(initializer),
            }
        }
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(name),
                space: AddressSpace::Private,
                binding: None,
                ty: ir,
                init,
                memory_decorations: MemoryDecorations::empty(),
                io: None,
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
                block: None,
            },
            at,
        );
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        if let Some(initializer) = runtime {
            self.initializers.push(Initialization {
                global: handle,
                symbol,
                initializer,
            });
        }
        Ok(())
    }

    fn interface_variable(&mut self, symbol: SymbolId, name: String, at: Span) -> Result<()> {
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let qualifiers = &variable.qualifiers;
        let input = qualifiers.storage == Storage::In;
        let per_vertex = self.is_per_vertex_io(qualifiers);
        if qualifiers.invariant && input {
            return Err(semantic("invariant can only apply to an output", at));
        }
        if input && xfb::has_xfb(qualifiers) {
            return Err(semantic(
                "xfb layout qualifier can only be used on an output",
                at,
            ));
        }
        let mut declared = variable.ty.clone();
        if declared.outer_size() == Some(GlslArraySize::Unsized) {
            let size = self.implicit_sizes.get(&symbol).copied().ok_or_else(|| {
                unsupported(
                    "stage inputs and outputs without a size or a constant index",
                    at,
                )
            })?;
            declared.set_outer_size(GlslArraySize::Sized(size));
        }
        let ty = self.ir_type(&declared, at)?;
        let element = match (per_vertex, &self.module.types[ty].inner) {
            (true, &TypeInner::Array { base, .. }) => base,
            _ => ty,
        };
        let element = match (qualifiers.per_view, &self.module.types[element].inner) {
            (true, &TypeInner::Array { base, .. }) => base,
            _ => element,
        };
        let per_primitive = self.per_primitive_binding(qualifiers);
        if qualifiers
            .spirv_decorations
            .iter()
            .any(|decoration| decoration.decoration == crate::proc::SPIRV_DECORATION_BUILT_IN)
        {
            let handle = self.module.global_variables.append(
                GlobalVariable {
                    name: Some(name.clone()),
                    space: if input {
                        AddressSpace::Input
                    } else {
                        AddressSpace::Output
                    },
                    binding: None,
                    ty,
                    init: None,
                    memory_decorations: MemoryDecorations::empty(),
                    io: None,
                    xfb: None,
                    input_attachment_index: None,
                    heap_offset: None,
                    tile_attachment: false,
                    spirv_decorations: Vec::new(),
                    relaxed_precision: false,
                    immediate_bank: None,
                    block: None,
                },
                at,
            );
            self.interface.push(handle);
            self.globals.insert(symbol, GlobalRef::Variable(handle));
            if input {
                self.inputs.insert(name);
            } else {
                self.outputs.insert(name, handle);
            }
            return Ok(());
        }
        let automatic_location = qualifiers.layout_entry("location").is_none();
        let location = match qualifiers.layout_entry("location").and_then(|e| e.value) {
            Some(location) => u32::try_from(location).map_err(|_| internal(at))?,
            None if self.options.auto_map_locations => {
                let count = location_count(&self.module, element);
                self.auto_location(usize::from(!input), count)
            }
            None => {
                return Err(semantic(
                    "SPIR-V requires a location for user inputs and outputs",
                    at,
                ))
            }
        };
        let mut interpolation = match qualifiers.per_vertex {
            Some(per_vertex) => Some(per_vertex_interpolation(
                per_vertex,
                qualifiers.interpolation,
            )),
            None => qualifiers.interpolation.map(interpolation_of),
        };
        let mut sampling = if qualifiers.sample {
            Some(Sampling::Sample)
        } else if qualifiers.centroid {
            Some(Sampling::Centroid)
        } else {
            None
        };
        if interpolation.is_none() && contains_float(&self.module.types, ty) {
            interpolation = Some(Interpolation::Perspective);
            sampling.get_or_insert(Sampling::Center);
        }
        let component = match qualifiers.layout_entry("component").and_then(|e| e.value) {
            Some(component) => Some(u32::try_from(component).map_err(|_| internal(at))?),
            None => None,
        };
        let blend_src = match qualifiers.layout_entry("index").and_then(|e| e.value) {
            Some(index) => Some(u32::try_from(index).map_err(|_| internal(at))?),
            None => None,
        };
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(name.clone()),
                space: if input {
                    AddressSpace::Input
                } else {
                    AddressSpace::Output
                },
                binding: None,
                ty,
                init: None,
                memory_decorations: MemoryDecorations::empty(),
                io: Some(Binding::Location {
                    location,
                    interpolation,
                    sampling,
                    blend_src,
                    per_primitive,
                    component,
                    invariant: qualifiers.invariant,
                    patch: qualifiers.patch,
                    per_view: qualifiers.per_view,
                }),
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
                block: None,
            },
            at,
        );
        self.interface.push(handle);
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        if automatic_location {
            self.automatic_locations.push(handle);
        }
        if input {
            self.passthrough(handle, qualifiers);
            self.inputs.insert(name);
            return Ok(());
        }
        self.outputs.insert(name, handle);
        self.output_stream(handle, qualifiers);
        let explicit = xfb::layout_value(qualifiers, "xfb_buffer");
        if explicit.is_none()
            && self.xfb.default_buffer.is_none()
            && xfb::layout_value(qualifiers, "xfb_offset").is_none()
            && xfb::layout_value(qualifiers, "xfb_stride").is_none()
        {
            self.xfb.pending.push(handle);
            return Ok(());
        }
        let buffer = explicit.or(self.xfb_default_buffer());
        if let Some(buffer) = buffer {
            let offset = xfb::layout_value(qualifiers, "xfb_offset");
            if let Some(stride) = xfb::layout_value(qualifiers, "xfb_stride") {
                self.xfb_stride(buffer, stride, at)?;
            }
            if let Some(offset) = offset {
                self.xfb_capture(buffer, offset, ty, at)?;
            }
            self.xfb_global(handle, buffer, offset);
        }
        Ok(())
    }

    fn binding(
        &mut self,
        qualifiers: &Qualifiers,
        at: Span,
    ) -> Result<(Option<ResourceBinding>, Option<Option<u32>>)> {
        let value = |name: &str| -> Result<Option<u32>> {
            match qualifiers.layout_entry(name).and_then(|e| e.value) {
                Some(value) => u32::try_from(value).map(Some).map_err(|_| internal(at)),
                None => Ok(None),
            }
        };
        let binding = value("binding")?;
        let set = value("set")?.or(self.options.resource_set);
        match binding {
            Some(binding) => Ok((
                Some(ResourceBinding {
                    group: set.unwrap_or(0),
                    binding,
                }),
                None,
            )),
            None if self.options.auto_map_bindings => Ok((None, Some(set))),
            None if self
                .analysis
                .extensions
                .contains(super::heap::HEAP_EXTENSION) =>
            {
                Ok((None, None))
            }
            None => Err(semantic(
                "uniform/buffer blocks and opaque uniforms require layout(binding=X)",
                at,
            )),
        }
    }

    fn resource(&mut self, symbol: SymbolId, name: String, at: Span) -> Result<()> {
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let qualifiers = &variable.qualifiers;
        let ty = &variable.ty;
        let opaque = match ty.kind {
            TypeKind::Opaque(opaque) => opaque,
            TypeKind::Tensor {
                scalar: element,
                rank,
            } => {
                let inner = TypeInner::Tensor {
                    scalar: super::types::scalar(element),
                    rank: self.tensor_rank(rank, at)?,
                };
                return self.handle_global(symbol, name, inner, None, at);
            }
            TypeKind::Spirv(id) => {
                let inner = self.spirv_type(id, at)?;
                return self.handle_global(symbol, name, inner, None, at);
            }
            TypeKind::Struct(_) if ty.contains_opaque(&self.analysis.types) => {
                return Err(internal(at))
            }
            _ => {
                return Err(semantic(
                    "non-opaque uniforms outside a block are not allowed when targeting Vulkan",
                    at,
                ))
            }
        };
        let inner = if opaque.kind == OpaqueKind::Image {
            let format = qualifiers
                .layout
                .iter()
                .rev()
                .find_map(|entry| image_format(&entry.name))
                .unwrap_or_else(|| unknown_format(opaque.sampled));
            TypeInner::Image {
                dim: image_dimension(opaque),
                arrayed: opaque.arrayed,
                class: ImageClass::Storage {
                    format,
                    access: image_access(qualifiers),
                    multi: opaque.multisample,
                },
            }
        } else {
            self.opaque_inner(
                opaque,
                self.depth.contains(&symbol),
                self.comparison.contains(&symbol),
                at,
            )?
        };
        self.handle_global(symbol, name, inner, Some(opaque), at)
    }

    fn handle_global(
        &mut self,
        symbol: SymbolId,
        name: String,
        inner: TypeInner,
        opaque: Option<rglsl_sema::types::Opaque>,
        at: Span,
    ) -> Result<()> {
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let qualifiers = &variable.qualifiers;
        let ty = &variable.ty;
        let mut handle_ty = self.insert_type(inner);
        match *ty.dimensions() {
            [] => {}
            [size @ GlslArraySize::Sized(_)] => {
                let size = self.array_size(size, at)?;
                handle_ty = self.insert_type(TypeInner::BindingArray {
                    base: handle_ty,
                    size,
                });
            }
            [GlslArraySize::Unsized] => {
                let size = self.unsized_binding_array(symbol, at)?;
                handle_ty = self.insert_type(TypeInner::BindingArray {
                    base: handle_ty,
                    size,
                });
            }
            _ => {
                return Err(unsupported(
                    "runtime-sized arrays and arrays of arrays of opaque types",
                    at,
                ))
            }
        }
        let (binding, unbound) = self.binding(qualifiers, at)?;
        let input_attachment_index = match qualifiers
            .layout_entry("input_attachment_index")
            .and_then(|entry| entry.value)
        {
            Some(index) if opaque.is_some_and(|opaque| opaque.kind == OpaqueKind::SubpassInput) => {
                Some(u32::try_from(index).map_err(|_| internal(at))?)
            }
            _ => None,
        };
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(name),
                space: AddressSpace::Handle,
                binding,
                ty: handle_ty,
                init: None,
                memory_decorations: memory(qualifiers) | tensor_access(qualifiers, ty),
                io: None,
                xfb: None,
                input_attachment_index,
                heap_offset: None,
                tile_attachment: qualifiers
                    .layout
                    .iter()
                    .any(|entry| entry.name.eq_ignore_ascii_case("tile_attachmentQCOM")),
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
                block: None,
            },
            at,
        );
        if let Some(set) = unbound {
            self.unbound.push((handle, set));
        }
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        Ok(())
    }

    fn block(
        &mut self,
        declaration: &'a Declaration,
        structure: &'a BlockStructure,
        instance: Option<&'a Spanned<BlockInstance>>,
    ) -> Result<()> {
        let at = self.at(structure.name.span);
        if structure.name.node == "gl_PerVertex" {
            if storage_of(Some(&structure.qualifier)) == Some(StorageQualifier::In)
                && layout_names(Some(&structure.qualifier)).contains(&"passthrough")
            {
                return self.passthrough_per_vertex(structure, at);
            }
            if instance.is_some() {
                return match self.analysis.declarations.get(&declaration.id) {
                    Some(&symbol) if self.is_per_vertex_array(symbol) => {
                        self.global_ref(symbol, at).map(|_| ())
                    }
                    _ => Ok(()),
                };
            }
            if storage_of(Some(&structure.qualifier)) == Some(StorageQualifier::Out) {
                self.per_vertex_redeclared = true;
                self.per_vertex_xfb(structure, at)?;
            }
            return Ok(());
        }
        let analysis = self.analysis;
        let Some(&symbol) = analysis.declarations.get(&declaration.id) else {
            return Ok(());
        };
        if super::mesh::MESH_BLOCKS.contains(&structure.name.node.as_str())
            && self.is_per_vertex_array(symbol)
        {
            return self.global_ref(symbol, at).map(|_| ());
        }
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let TypeKind::Block(id) = variable.ty.kind else {
            return Err(internal(at));
        };
        let block = analysis.types.block(id).ok_or_else(|| internal(at))?;
        let qualifiers = &block.qualifiers;
        let instance_name =
            instance.map_or_else(String::new, |instance| instance.name.node.clone());
        let buffer = match block.storage {
            BlockStorage::Uniform => false,
            BlockStorage::Buffer => true,
            BlockStorage::In | BlockStorage::Out => {
                let name = instance.map(|instance| instance.name.node.clone());
                return self.interface_block(symbol, id, name, at);
            }
            BlockStorage::ResourceHeap | BlockStorage::SamplerHeap => {
                return self.structured_heap(
                    symbol,
                    id,
                    instance_name,
                    Some(&structure.qualifier),
                    at,
                );
            }
            BlockStorage::RayPayload
            | BlockStorage::RayPayloadIn
            | BlockStorage::HitAttribute
            | BlockStorage::CallableData
            | BlockStorage::CallableDataIn
            | BlockStorage::HitObjectAttributeNv
            | BlockStorage::HitObjectAttributeExt => {
                return self.ray_block(symbol, id, instance_name, at);
            }
        };
        let shader_record = rglsl_sema::analyze::is_shader_record(qualifiers);
        let push_constant = qualifiers.has_layout("push_constant");
        if !push_constant && self.is_heap_view(&variable.qualifiers) {
            return self.heap_buffer_array(
                symbol,
                instance_name,
                id,
                Some(&structure.qualifier),
                at,
            );
        }
        let (packing, row_major) = if shader_record {
            let explicit = qualifiers.layout.iter().any(|entry| {
                matches!(
                    entry.name.as_str(),
                    "std140" | "std430" | "scalar" | "shared" | "packed"
                )
            });
            let (packing, row_major) = self.block_packing(qualifiers, buffer, true);
            (if explicit { packing } else { Packing::Std430 }, row_major)
        } else {
            self.block_packing(qualifiers, buffer, push_constant)
        };
        let mut ty = self.block_struct(id, packing, row_major, at)?;
        match *variable.ty.dimensions() {
            [] => {}
            [size] => {
                let size = match size {
                    GlslArraySize::Sized(_) => self.array_size(size, at)?,
                    GlslArraySize::Unsized => self.unsized_binding_array(symbol, at)?,
                    GlslArraySize::Specialized(_) => self.array_size(size, at)?,
                };
                ty = self.insert_type(TypeInner::BindingArray { base: ty, size });
            }
            _ => return Err(unsupported("arrays of arrays of blocks", at)),
        }
        let mut decorations = memory(qualifiers);
        if push_constant || shader_record {
            decorations.remove(MemoryDecorations::RESTRICT);
        }
        if !buffer || push_constant || shader_record {
            if qualifiers.readonly {
                decorations |= MemoryDecorations::NON_WRITABLE;
            }
            if qualifiers.writeonly {
                decorations |= MemoryDecorations::NON_READABLE;
            }
        }
        let space = if push_constant {
            AddressSpace::Immediate
        } else if shader_record {
            AddressSpace::ShaderRecord
        } else if buffer {
            AddressSpace::Storage {
                access: storage_access(qualifiers),
            }
        } else {
            AddressSpace::Uniform
        };
        let (binding, unbound) = if push_constant || shader_record {
            (None, None)
        } else {
            self.binding(qualifiers, at)?
        };
        if block
            .members
            .iter()
            .any(|member| member.qualifiers.has_layout("member_offset"))
        {
            return Err(unsupported(
                "the `member_offset` layout qualifier on a block member",
                at,
            ));
        }
        let layout_value = |name| {
            qualifiers
                .layout_entry(name)
                .and_then(|entry| entry.value)
                .and_then(|value| u32::try_from(value).ok())
        };
        let immediate_bank = push_constant
            .then(|| crate::ImmediateBank {
                bank: layout_value("bank"),
                member_offset: layout_value("member_offset"),
            })
            .filter(|bank| *bank != crate::ImmediateBank::default());
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(instance_name),
                space,
                binding,
                ty,
                init: None,
                memory_decorations: decorations,
                io: None,
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank,
                block: shader_record.then_some(if buffer {
                    crate::BlockDeclaration::Buffer
                } else {
                    crate::BlockDeclaration::Uniform
                }),
            },
            at,
        );
        if let Some(set) = unbound {
            self.unbound.push((handle, set));
        }
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        Ok(())
    }

    pub(super) fn block_packing(
        &self,
        qualifiers: &Qualifiers,
        buffer: bool,
        push_constant: bool,
    ) -> (Packing, bool) {
        let defaults = if buffer {
            self.buffer_defaults
        } else {
            self.uniform_defaults
        };
        let mut packing = None;
        let mut row_major = None;
        for entry in &qualifiers.layout {
            match entry.name.as_str() {
                "std140" | "shared" | "packed" => packing = Some(Packing::Std140),
                "std430" => packing = Some(Packing::Std430),
                "scalar" => packing = Some(Packing::Scalar),
                "row_major" => row_major = Some(true),
                "column_major" => row_major = Some(false),
                _ => {}
            }
        }
        let packing = packing
            .or(defaults.packing)
            .unwrap_or(if buffer || push_constant {
                Packing::Std430
            } else {
                Packing::Std140
            });
        (packing, row_major.or(defaults.row_major).unwrap_or(false))
    }

    fn interface_block(
        &mut self,
        symbol: SymbolId,
        id: BlockId,
        name: Option<String>,
        at: Span,
    ) -> Result<()> {
        let analysis = self.analysis;
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let block = analysis.types.block(id).ok_or_else(|| internal(at))?;
        let input = block.storage == BlockStorage::In;
        let outer = &block.qualifiers;
        let patch = outer.patch || block.members.iter().any(|member| member.qualifiers.patch);
        let per_vertex = self.is_per_vertex_io(outer) && !patch;
        if outer.invariant {
            return Err(semantic(
                "cannot use invariant qualifier on an interface block",
                at,
            ));
        }
        let explicit = |qualifiers: &Qualifiers, name: &str| -> Result<Option<u32>> {
            match qualifiers.layout_entry(name).and_then(|entry| entry.value) {
                Some(value) => u32::try_from(value).map(Some).map_err(|_| internal(at)),
                None => Ok(None),
            }
        };
        let block_location = explicit(outer, "location")?;
        if input
            && (xfb::has_xfb(outer) || block.members.iter().any(|m| xfb::has_xfb(&m.qualifiers)))
        {
            return Err(semantic(
                "xfb layout qualifier can only be used on an output",
                at,
            ));
        }
        let xfb_buffer = if input {
            None
        } else {
            xfb::layout_value(outer, "xfb_buffer").or(self.xfb_default_buffer())
        };
        let mut declared = variable.ty.clone();
        if declared.outer_size() == Some(GlslArraySize::Unsized) {
            let size = self.implicit_sizes.get(&symbol).copied().ok_or_else(|| {
                unsupported(
                    "stage inputs and outputs without a size or a constant index",
                    at,
                )
            })?;
            declared.set_outer_size(GlslArraySize::Sized(size));
        }
        let block_dimensions = if per_vertex {
            declared.dimensions().get(1..).unwrap_or_default()
        } else {
            declared.dimensions()
        };
        let arrayed = !block_dimensions.is_empty();
        let mut members = Vec::with_capacity(block.members.len());
        let mut offset = 0_u32;
        let mut alignment = Alignment::ONE;
        let mut member_locations = Vec::with_capacity(block.members.len());
        for (index, member) in (0_u32..).zip(&block.members) {
            let qualifiers = &member.qualifiers;
            let mut member_ty = member.ty.clone();
            if member_ty.outer_size() == Some(GlslArraySize::Unsized) {
                let size = self.member_sizes.get(&(id, index)).copied().unwrap_or(1);
                member_ty.set_outer_size(GlslArraySize::Sized(size.max(1)));
            }
            if qualifiers.invariant && input {
                return Err(semantic("invariant can only apply to an output", at));
            }
            if let Some(buffer) = xfb::layout_value(qualifiers, "xfb_buffer") {
                if xfb_buffer != Some(buffer) {
                    return Err(semantic(
                        "xfb_buffer: member cannot contradict block (or what block inherited from global)",
                        at,
                    ));
                }
            }
            let ty = self.ir_type(&member_ty, at)?;
            self.layouter
                .update(self.module.to_ctx())
                .map_err(|_| internal(at))?;
            let layout = self.layouter[ty];
            offset = layout.alignment.round_up(offset);
            alignment = layout.alignment.max(alignment);
            let mut interpolation = qualifiers
                .interpolation
                .or(outer.interpolation)
                .map(interpolation_of);
            let mut sampling = if qualifiers.sample || outer.sample {
                Some(Sampling::Sample)
            } else if qualifiers.centroid || outer.centroid {
                Some(Sampling::Centroid)
            } else {
                None
            };
            if interpolation.is_none() && contains_float(&self.module.types, ty) {
                interpolation = Some(Interpolation::Perspective);
                sampling.get_or_insert(Sampling::Center);
            }
            let component = explicit(qualifiers, "component")?;
            member_locations.push(explicit(qualifiers, "location")?);
            members.push(crate::StructMember {
                name: Some(member.name.clone()),
                ty,
                binding: Some(Binding::Location {
                    location: 0,
                    interpolation,
                    sampling,
                    blend_src: None,
                    per_primitive: self.per_primitive_binding(qualifiers),
                    component,
                    invariant: !input && (qualifiers.invariant || self.invariant_all),
                    patch,
                    per_view: qualifiers.per_view,
                }),
                offset,
                matrix_layout: None,
                xfb_offset: None,
                heap: None,
                memory_decorations: MemoryDecorations::empty(),
                relaxed_precision: false,
            });
            offset = offset.saturating_add(layout.size);
        }
        if let Some(buffer) = xfb_buffer {
            let explicit: Vec<(Handle<crate::Type>, Option<u32>)> = members
                .iter()
                .zip(&block.members)
                .map(|(member, declared)| {
                    (
                        member.ty,
                        xfb::layout_value(&declared.qualifiers, "xfb_offset"),
                    )
                })
                .collect();
            let offsets =
                self.xfb_member_offsets(xfb::layout_value(outer, "xfb_offset"), &explicit, at)?;
            for ((member, declared), offset) in members.iter_mut().zip(&block.members).zip(offsets)
            {
                if let Some(stride) = xfb::layout_value(&declared.qualifiers, "xfb_stride") {
                    self.xfb_stride(buffer, stride, at)?;
                }
                if let Some(offset) = offset {
                    self.xfb_capture(buffer, offset, member.ty, at)?;
                }
                member.xfb_offset = offset;
            }
            if let Some(stride) = xfb::layout_value(outer, "xfb_stride") {
                self.xfb_stride(buffer, stride, at)?;
            }
        }
        let member_located = member_locations.iter().any(Option::is_some);
        let per_block = members
            .iter()
            .map(|member| self.member_location_count(member))
            .fold(0, u32::saturating_add);
        let elements = block_dimensions
            .iter()
            .map(|size| match *size {
                GlslArraySize::Sized(size) => size,
                _ => 1,
            })
            .fold(1, u32::saturating_mul);
        let total = per_block.saturating_mul(elements);
        let slot = usize::from(!input);
        let automatic_location = !member_located && block_location.is_none();
        let io = if member_located {
            if arrayed {
                return Err(semantic(
                    "cannot use in a block array where new locations are needed for each block element",
                    at,
                ));
            }
            if block_location.is_none() && member_locations.iter().any(Option::is_none) {
                return Err(semantic(
                    "either the block needs a location, or all members need a location, or no members have a location",
                    at,
                ));
            }
            let mut next = block_location;
            for (member, explicit) in members.iter_mut().zip(&member_locations) {
                let location = explicit.or(next).ok_or_else(|| internal(at))?;
                if let Some(Binding::Location {
                    location: ref mut slot,
                    ..
                }) = member.binding
                {
                    *slot = location;
                }
                next = Some(location.saturating_add(self.member_location_count(member)));
            }
            if self.options.auto_map_locations {
                self.auto_location(slot, total);
            }
            None
        } else {
            let start = match block_location {
                Some(location) => location,
                None if self.options.auto_map_locations => self.auto_location(slot, total),
                None => {
                    return Err(semantic(
                        "SPIR-V requires a location for user inputs and outputs",
                        at,
                    ))
                }
            };
            if members.iter().any(|member| {
                matches!(
                    member.binding,
                    Some(Binding::Location {
                        component: Some(_),
                        ..
                    })
                )
            }) {
                return Err(semantic(
                    "a block member with a component needs a location",
                    at,
                ));
            }
            let mut next = start;
            for member in &mut members {
                if let Some(Binding::Location {
                    ref mut location, ..
                }) = member.binding
                {
                    *location = next;
                }
                next = next.saturating_add(self.member_location_count(member));
            }
            Some(Binding::Location {
                location: start,
                interpolation: outer
                    .per_vertex
                    .map(|per_vertex| per_vertex_interpolation(per_vertex, outer.interpolation)),
                sampling: None,
                blend_src: None,
                per_primitive: false,
                component: None,
                invariant: false,
                patch: false,
                per_view: false,
            })
        };
        let structure = self.module.types.insert(
            crate::Type {
                name: Some(block.name.clone()),
                inner: TypeInner::Struct {
                    members,
                    span: alignment.round_up(offset),
                },
            },
            at,
        );
        let ty = self.wrap_arrays(structure, declared.dimensions(), at)?;
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name,
                space: if input {
                    AddressSpace::Input
                } else {
                    AddressSpace::Output
                },
                binding: None,
                ty,
                init: None,
                memory_decorations: MemoryDecorations::empty(),
                io,
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
                block: None,
            },
            at,
        );
        self.interface.push(handle);
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        if automatic_location {
            self.automatic_locations.push(handle);
        }
        if outer.per_task {
            self.task_memory.push(handle);
        }
        if input {
            self.passthrough(handle, outer);
        } else {
            self.output_stream(handle, outer);
        }
        if let Some(buffer) = xfb_buffer {
            self.xfb_global(handle, buffer, None);
        }
        if !input {
            for member in &block.members {
                self.block_outputs.insert(member.name.clone());
            }
        }
        Ok(())
    }

    pub(super) fn is_per_vertex_member(&self, symbol: SymbolId) -> bool {
        let Some(&SymbolKind::BlockMember { instance, .. }) =
            self.symbol(symbol).map(|symbol| &symbol.kind)
        else {
            return false;
        };
        let Some(variable) = self.variable(instance) else {
            return false;
        };
        let TypeKind::Block(id) = variable.ty.kind else {
            return false;
        };
        variable.origin == Origin::BuiltIn
            && !variable.ty.is_array()
            && self.analysis.types.block(id).is_some_and(|block| {
                block.name == "gl_PerVertex" && block.storage == BlockStorage::Out
            })
            && self.stage_map(|stage| {
                matches!(
                    stage,
                    crate::ShaderStage::Vertex
                        | crate::ShaderStage::TessEvaluation
                        | crate::ShaderStage::Geometry
                )
            })
    }

    pub(super) fn per_vertex_member(
        &self,
        symbol: SymbolId,
    ) -> Option<(Handle<GlobalVariable>, u32)> {
        let (global, ref members) = *self.per_vertex.as_ref()?;
        if !self.is_per_vertex_member(symbol) {
            return None;
        }
        let name = &self.symbol(symbol)?.name;
        let index = members.iter().position(|member| member == name)?;
        Some((global, u32::try_from(index).ok()?))
    }

    fn builtin_per_vertex(&self) -> Option<&'a rglsl_sema::types::BlockType> {
        self.builtin_name("gl_Position");
        let analysis = self.analysis;
        analysis
            .symbols
            .iter()
            .filter_map(|symbol| match symbol.kind {
                SymbolKind::Variable(ref variable)
                    if variable.origin == Origin::BuiltIn && !variable.ty.is_array() =>
                {
                    match variable.ty.kind {
                        TypeKind::Block(id) => analysis.types.block(id),
                        _ => None,
                    }
                }
                _ => None,
            })
            .find(|block| block.name == "gl_PerVertex" && block.storage == BlockStorage::Out)
    }

    fn declarator_size(
        &self,
        array: Option<&Spanned<rglsl_ast::ast::ArraySpecifier>>,
    ) -> Option<u32> {
        array
            .iter()
            .flat_map(|array| &array.dimensions)
            .find_map(|dimension| match dimension.node {
                rglsl_ast::ast::ArrayDimension::Sized(ref size) => self
                    .analysis
                    .expression(size.id)
                    .and_then(|info| info.value.as_ref())
                    .and_then(rglsl_sema::constant::Constant::scalar_i64)
                    .and_then(|size| u32::try_from(size).ok()),
                rglsl_ast::ast::ArrayDimension::Unsized => None,
            })
    }

    fn per_vertex_xfb(&mut self, structure: &'a BlockStructure, at: Span) -> Result<()> {
        let outer = Some(&structure.qualifier);
        let Some(buffer) =
            xfb::ast_layout_value(self, outer, "xfb_buffer").or(self.xfb_default_buffer())
        else {
            return Ok(());
        };
        let block = self
            .builtin_per_vertex()
            .ok_or_else(|| internal(Span::UNDEFINED))?;
        let mut declared = Vec::new();
        for member in &structure.members {
            let qualifier = member.ty.qualifier.as_ref();
            let offset = xfb::ast_layout_value(self, qualifier, "xfb_offset");
            let stride = xfb::ast_layout_value(self, qualifier, "xfb_stride");
            if xfb::ast_layout_value(self, qualifier, "xfb_buffer")
                .is_some_and(|member_buffer| member_buffer != buffer)
            {
                return Err(semantic(
                    "xfb_buffer: member cannot contradict block (or what block inherited from global)",
                    at,
                ));
            }
            for declarator in &member.declarators {
                let name = declarator.name.node.clone();
                let Some((_, builtin)) = block.member(&name) else {
                    continue;
                };
                let mut glsl = builtin.ty.clone();
                if glsl.outer_size() == Some(GlslArraySize::Unsized) {
                    if let Some(size) = self.declarator_size(declarator.array.as_ref()) {
                        glsl.set_outer_size(GlslArraySize::Sized(size));
                    }
                }
                let ty = self.ir_type(&glsl, at)?;
                declared.push((name, ty, offset, stride));
            }
        }
        let explicit: Vec<(Handle<crate::Type>, Option<u32>)> = declared
            .iter()
            .map(|&(_, ty, offset, _)| (ty, offset))
            .collect();
        let offsets = self.xfb_member_offsets(
            xfb::ast_layout_value(self, outer, "xfb_offset"),
            &explicit,
            at,
        )?;
        let mut per_vertex = xfb::PerVertexXfb {
            buffer,
            offsets: alloc::collections::BTreeMap::new(),
        };
        for ((name, ty, _, stride), offset) in declared.into_iter().zip(offsets) {
            let Some(offset) = offset else {
                continue;
            };
            if let Some(stride) = stride {
                self.xfb_stride(buffer, stride, at)?;
            }
            self.xfb_capture(buffer, offset, ty, at)?;
            per_vertex.offsets.insert(name, offset);
        }
        self.xfb.per_vertex = Some(per_vertex);
        Ok(())
    }

    pub(super) fn declare_per_vertex(&mut self) -> Result<()> {
        if (self.per_vertex_used.is_empty() && !self.per_vertex_redeclared)
            || !self.stage_map(|stage| {
                matches!(
                    stage,
                    crate::ShaderStage::Vertex
                        | crate::ShaderStage::TessEvaluation
                        | crate::ShaderStage::Geometry
                )
            })
        {
            return Ok(());
        }
        self.builtin_name("gl_Position");
        let block = self
            .builtin_per_vertex()
            .ok_or_else(|| internal(Span::UNDEFINED))?;
        let mut requested: Vec<(String, Span)> = Vec::new();
        self.invariant.retain(|&(ref name, at)| {
            let per_vertex = PER_VERTEX.contains(&name.as_str());
            if per_vertex {
                requested.push((name.clone(), at));
            }
            !per_vertex
        });
        let mut members = Vec::new();
        let mut names = Vec::new();
        let mut offset = 0_u32;
        let mut alignment = Alignment::ONE;
        for name in PER_VERTEX {
            let Some((_, member)) = block.member(name) else {
                continue;
            };
            let at = requested
                .iter()
                .find(|&&(ref requested, _)| requested == name)
                .map_or(Span::UNDEFINED, |&(_, at)| at);
            let used = self.per_vertex_used.contains(name);
            let invariant = member.qualifiers.invariant
                || self.invariant_all
                || requested
                    .iter()
                    .any(|&(ref requested, _)| requested == name);
            let builtin = match name {
                "gl_Position" => BuiltIn::Position { invariant },
                _ => {
                    if invariant && used {
                        return Err(unsupported(
                            "invariant on built-in outputs other than gl_Position",
                            at,
                        ));
                    }
                    builtin_of(name).ok_or_else(|| internal(at))?
                }
            };
            let ty = if super::prepass::CLIP_DISTANCES.contains(&name) {
                let size = match member.ty.outer_size() {
                    Some(GlslArraySize::Sized(size)) => Some(size),
                    _ => None,
                }
                .or_else(|| self.builtin_sizes.get(name).copied())
                .or((!used).then_some(1))
                .ok_or_else(|| {
                    unsupported(format!("`{name}` without a size or a constant index"), at)
                })?;
                let element = GlslType::scalar(Scalar::Float);
                self.ir_type(&element.array_of(GlslArraySize::Sized(size)), at)?
            } else {
                self.ir_type(&member.ty, at)?
            };
            self.layouter
                .update(self.module.to_ctx())
                .map_err(|_| internal(at))?;
            let layout = self.layouter[ty];
            offset = layout.alignment.round_up(offset);
            alignment = layout.alignment.max(alignment);
            let xfb_offset = self
                .xfb
                .per_vertex
                .as_ref()
                .and_then(|per_vertex| per_vertex.offsets.get(name).copied());
            members.push(crate::StructMember {
                name: Some(String::from(name)),
                ty,
                binding: Some(Binding::BuiltIn(builtin)),
                offset,
                matrix_layout: None,
                xfb_offset,
                heap: None,
                memory_decorations: MemoryDecorations::empty(),
                relaxed_precision: false,
            });
            offset = offset.saturating_add(layout.size);
            names.push(String::from(name));
        }
        if members.is_empty() {
            return Ok(());
        }
        let ty = self.module.types.insert(
            crate::Type {
                name: Some(String::from("gl_PerVertex")),
                inner: TypeInner::Struct {
                    members,
                    span: alignment.round_up(offset),
                },
            },
            Span::UNDEFINED,
        );
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: None,
                space: AddressSpace::Output,
                binding: None,
                ty,
                init: None,
                memory_decorations: MemoryDecorations::empty(),
                io: None,
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
                block: None,
            },
            match (self.debug.is_some(), self.per_vertex_first_use) {
                (true, Some(first)) => Span::new(first, first),
                _ => Span::UNDEFINED,
            },
        );
        self.interface.push(handle);
        self.per_vertex = Some((handle, names));
        if self.xfb_default_buffer().is_some() {
            let buffer = self
                .xfb
                .per_vertex
                .as_ref()
                .map_or(0, |per_vertex| per_vertex.buffer);
            self.xfb_global(handle, buffer, None);
        }
        Ok(())
    }

    fn builtin_redeclaration(
        &mut self,
        symbol: SymbolId,
        list: &'a InitDeclaratorList,
        declarator: &'a Node<InitDeclarator>,
        at: Span,
    ) -> Result<()> {
        let name = self
            .symbol(symbol)
            .map(|symbol| symbol.name.clone())
            .ok_or_else(|| internal(at))?;
        let size = self.declarator_size(declarator.array.as_ref());
        if let Some(size) = size {
            self.builtin_sizes.insert(name.clone(), size);
        }
        let qualifier = list.ty.qualifier.as_ref();
        if has_qualifier(qualifier, |q| matches!(q, SingleTypeQualifier::Invariant)) {
            self.invariant.push((name.clone(), at));
        }
        for layout in layout_names(qualifier) {
            match (layout, name.as_str()) {
                ("viewport_relative", "gl_Layer") => {
                    self.layer_layout.viewport_relative = true;
                    self.layer_layout.redeclared = Some(symbol);
                    continue;
                }
                ("secondary_view_offset", "gl_Layer") => {
                    self.layer_layout.secondary_view_offset =
                        xfb::ast_layout_signed(self, qualifier, "secondary_view_offset")
                            .and_then(|value| i32::try_from(value).ok());
                    self.layer_layout.redeclared = Some(symbol);
                    continue;
                }
                ("override_coverage", "gl_SampleMask") => {
                    self.override_coverage = true;
                    continue;
                }
                ("origin_upper_left", "gl_FragCoord") => continue,
                ("pixel_center_integer", "gl_FragCoord") => {
                    return Err(semantic(
                        "`pixel_center_integer` is not allowed in Vulkan: the PixelCenterInteger execution mode must not be used",
                        at,
                    ))
                }
                _ => {}
            }
            let depth = match layout {
                "depth_any" => None,
                "depth_greater" => Some(ConservativeDepth::GreaterEqual),
                "depth_less" => Some(ConservativeDepth::LessEqual),
                "depth_unchanged" => Some(ConservativeDepth::Unchanged),
                other => {
                    return Err(unsupported(
                        format!("the layout qualifier `{other}` on `{name}`"),
                        at,
                    ))
                }
            };
            if name != "gl_FragDepth" {
                return Err(unsupported(
                    format!("depth layout qualifiers on `{name}`"),
                    at,
                ));
            }
            self.conservative_depth = depth;
        }
        Ok(())
    }

    pub(super) fn finish_interface(&mut self) {
        let invariant = core::mem::take(&mut self.invariant);
        for (name, at) in invariant {
            let result = self.make_invariant(&name, at);
            self.report(result);
        }
        if self.invariant_all {
            let builtins: Vec<(String, Handle<GlobalVariable>)> = self
                .builtins
                .iter()
                .map(|(name, handle)| (name.clone(), *handle))
                .collect();
            for (name, handle) in builtins {
                if self.module.global_variables[handle].space != AddressSpace::Output {
                    continue;
                }
                let result = self.make_invariant(&name, Span::UNDEFINED);
                self.report(result);
            }
            let outputs: Vec<Handle<GlobalVariable>> = self.outputs.values().copied().collect();
            for handle in outputs {
                if let Some(Binding::Location {
                    ref mut invariant, ..
                }) = self.module.global_variables.get_mut(handle).io
                {
                    *invariant = true;
                }
            }
        }
        let fragment = self.analysis.fragment;
        if !self.object
            && fragment.post_depth_coverage
            && !(self.early_fragment_tests || fragment.early_fragment_tests)
        {
            self.errors.push(semantic(
                "post_depth_coverage requires early_fragment_tests",
                Span::UNDEFINED,
            ));
        }
        self.check_shared_layouts();
        self.finish_xfb();
        self.assign_bindings();
    }

    fn check_shared_layouts(&mut self) {
        fn collect(
            types: &crate::UniqueArena<crate::Type>,
            ty: Handle<crate::Type>,
            found: &mut alloc::collections::BTreeSet<Handle<crate::Type>>,
        ) {
            let mut pending = alloc::vec![ty];
            while let Some(ty) = pending.pop() {
                match types[ty].inner {
                    TypeInner::Struct { ref members, .. } => {
                        if found.insert(ty) {
                            pending.extend(members.iter().rev().map(|member| member.ty));
                        }
                    }
                    TypeInner::Array { base, .. } | TypeInner::BindingArray { base, .. } => {
                        pending.push(base);
                    }
                    _ => {}
                }
            }
        }
        let mut laid_out = alloc::collections::BTreeSet::new();
        let mut interface = alloc::collections::BTreeSet::new();
        for (_, global) in self.module.global_variables.iter() {
            match global.space {
                AddressSpace::Uniform | AddressSpace::Storage { .. } | AddressSpace::Immediate => {
                    collect(&self.module.types, global.ty, &mut laid_out);
                }
                AddressSpace::Input | AddressSpace::Output => {
                    collect(&self.module.types, global.ty, &mut interface);
                }
                _ => {}
            }
        }
        if let Some(&shared) = laid_out.intersection(&interface).next() {
            let at = self.module.types.get_span(shared);
            self.errors.push(unsupported(
                "a structure used both in a block and in a stage input or output",
                at,
            ));
        }
    }

    fn make_invariant(&mut self, name: &str, at: Span) -> Result<()> {
        if let Some(&handle) = self.outputs.get(name) {
            if let Some(Binding::Location {
                ref mut invariant, ..
            }) = self.module.global_variables.get_mut(handle).io
            {
                *invariant = true;
            }
            return Ok(());
        }
        if self.inputs.contains(name) {
            return Err(semantic("invariant can only apply to an output", at));
        }
        if self.block_outputs.contains(name) {
            return Err(unsupported(
                "invariant on a member of an output block outside the block",
                at,
            ));
        }
        let Some(&handle) = self.builtins.get(name) else {
            return Ok(());
        };
        let global = self.module.global_variables.get_mut(handle);
        match global.io {
            Some(Binding::BuiltIn(BuiltIn::Position { ref mut invariant }))
                if global.space == AddressSpace::Output =>
            {
                *invariant = true;
                Ok(())
            }
            _ if global.space == AddressSpace::Output => Err(unsupported(
                "invariant on built-in outputs other than gl_Position",
                at,
            )),
            _ => Err(semantic("invariant can only apply to an output", at)),
        }
    }

    fn assign_bindings(&mut self) {
        self.automatic_bindings.clone_from(&self.unbound);
        let mut unbound = core::mem::take(&mut self.unbound);
        let shifts = &self.options.binding_shifts;
        shifts.shift_explicit(
            &mut self.module,
            &unbound.iter().map(|&(handle, _)| handle).collect(),
        );
        if unbound.is_empty() {
            return;
        }
        unbound.sort_by_key(|&(_, set)| set.is_none());
        let mut live = crate::compact::live_global_variables(&self.module);
        let functions = self
            .module
            .functions
            .iter()
            .map(|(_, function)| function)
            .chain(self.module.entry_points.iter().map(|entry| &entry.function));
        for function in functions {
            for (_, expression) in function.expressions.iter() {
                if let crate::Expression::GlobalVariable(global) = *expression {
                    live.insert(global);
                }
            }
        }
        let mut taken: alloc::collections::BTreeMap<u32, alloc::collections::BTreeSet<u32>> =
            alloc::collections::BTreeMap::new();
        for (_, global) in self.module.global_variables.iter() {
            if let Some(ref binding) = global.binding {
                taken
                    .entry(binding.group)
                    .or_default()
                    .insert(binding.binding);
            }
        }
        for (handle, set) in unbound {
            let group = set.unwrap_or(0);
            let binding = if live.contains(handle) {
                let base =
                    shifts.base_of(&self.module, &self.module.global_variables[handle], group);
                let used = taken.entry(group).or_default();
                let free = crate::proc::free_binding(used, base);
                used.insert(free);
                free
            } else {
                0
            };
            self.module.global_variables.get_mut(handle).binding =
                Some(ResourceBinding { group, binding });
        }
    }
}

impl<'b, 'a> super::function::LowererCx<'b, 'a> {
    pub(super) async fn global_ref(self, symbol: SymbolId, at: Span) -> Result<GlobalRef> {
        if let Some(found) = self.with(|this| this.globals.get(&symbol).copied())? {
            return Ok(found);
        }
        if let Some((name, span)) = self.with(|this| this.deferred_private.remove(&symbol))? {
            let variable =
                self.with(|this| this.variable(symbol).ok_or_else(|| internal(at)))??;
            let (ty, qualifiers) = (variable.ty.clone(), variable.qualifiers.clone());
            let ty = {
                let frame = self
                    .clone()
                    .variable_ir_type(ty.clone(), qualifiers.clone(), span);
                let result = self.nest(frame).await;
                result
            }?;
            let global = self.with(|this| this.ray_query_global(name, ty, span))?;
            let found = GlobalRef::Variable(global);
            self.with(|this| this.globals.insert(symbol, found))?;
            return Ok(found);
        }
        if self.with(|this| this.has_local_size_ids())?
            && self.with(|this| this.is_work_group_size(symbol))?
        {
            let handle = self.with(|this| this.work_group_size_override(at))??;
            self.with(|this| this.globals.insert(symbol, GlobalRef::Override(handle)))?;
            return Ok(GlobalRef::Override(handle));
        }
        let analysis = self.with(|this| this.analysis)?;
        let record = self.with(|this| this.symbol(symbol).ok_or_else(|| internal(at)))??;
        let (ty, output, value, volatile) = match record.kind {
            SymbolKind::Variable(ref variable) => {
                if variable.origin != Origin::BuiltIn {
                    return Err(internal(at));
                }
                if let Some(handle) = {
                    let frame = self.clone().builtin_override(symbol, variable, at);
                    let result = self.nest(frame).await;
                    result
                }? {
                    return Ok(handle);
                }
                if self.with(|this| this.is_per_vertex_array(symbol))? {
                    return {
                        let frame = self.clone().per_vertex_array(symbol, at);
                        let result = self.nest(frame).await;
                        result
                    };
                }
                (
                    variable.ty.clone(),
                    variable.qualifiers.storage == Storage::Out,
                    variable.value.as_ref(),
                    variable.qualifiers.volatile,
                )
            }
            SymbolKind::BlockMember { instance, index } => {
                let instance =
                    self.with(|this| this.variable(instance).ok_or_else(|| internal(at)))??;
                let TypeKind::Block(block) = instance.ty.kind else {
                    return Err(internal(at));
                };
                let block = analysis.types.block(block).ok_or_else(|| internal(at))?;
                let member = block
                    .members
                    .get(usize::try_from(index).map_err(|_| internal(at))?)
                    .ok_or_else(|| internal(at))?;
                (
                    member.ty.clone(),
                    block.storage == BlockStorage::Out,
                    None,
                    false,
                )
            }
            SymbolKind::Struct(_)
            | SymbolKind::Reference(_)
            | SymbolKind::BufferType(_)
            | SymbolKind::BlockName => return Err(internal(at)),
        };
        let name = record.name.clone();
        let found = match value {
            Some(value) => {
                let ir = {
                    let frame = self.clone().ir_type(ty.clone(), at);
                    let result = self.nest(frame).await;
                    result
                }?;
                let init = {
                    let frame = self
                        .clone()
                        .global_constant(ty.clone(), value.values.to_vec(), at);
                    let result = self.nest(frame).await;
                    result
                }?;
                let handle = self.with(|this| {
                    this.module.constants.append(
                        crate::Constant {
                            name: Some(name),
                            ty: ir,
                            init,
                        },
                        at,
                    )
                })?;
                GlobalRef::Constant(handle)
            }
            None => GlobalRef::Variable({
                let frame = self.clone().builtin_variable(
                    String::from(&name),
                    ty.clone(),
                    output,
                    volatile,
                    at,
                );
                let result = self.nest(frame).await;
                result
            }?),
        };
        self.with(|this| this.globals.insert(symbol, found))?;
        Ok(found)
    }

    async fn builtin_variable(
        self,
        name: String,
        ty: GlslType,
        output: bool,
        volatile: bool,
        at: Span,
    ) -> Result<Handle<GlobalVariable>> {
        let name = name.as_str();
        let ty = &ty;
        let (builtin, key) = match super::ray::ray_builtin(name) {
            Some((builtin, key)) => (builtin, key),
            None => (
                builtin_of(name)
                    .ok_or_else(|| unsupported(format!("the built-in variable `{name}`"), at))?,
                name,
            ),
        };
        if let Some(handle) = self.with(|this| this.builtins.get(key).copied())? {
            return Ok(handle);
        }
        let builtin = match builtin {
            BuiltIn::Layer { .. } => BuiltIn::Layer {
                viewport_relative: self.with(|this| this.layer_layout.viewport_relative)?,
                secondary_view_offset: self.with(|this| this.layer_layout.secondary_view_offset)?,
            },
            BuiltIn::SampleMask { .. } if output => BuiltIn::SampleMask {
                override_coverage: self.with(|this| this.override_coverage)?,
            },
            other => other,
        };
        let ir = if super::prepass::IMPLICITLY_SIZED.contains(&name) {
            let size = self.with(|this| {
                this.builtin_sizes
                    .get(name)
                    .copied()
                    .or(match ty.outer_size() {
                        Some(GlslArraySize::Sized(size)) => Some(size),
                        _ => None,
                    })
                    .ok_or_else(|| {
                        unsupported(format!("`{name}` without a size or a constant index"), at)
                    })
            })??;
            let element = ty.element_type().ok_or_else(|| internal(at))?;
            let sized = element.array_of(GlslArraySize::Sized(size));
            {
                let frame = self.clone().ir_type(sized.clone(), at);
                let result = self.nest(frame).await;
                result
            }?
        } else if let BuiltIn::ShaderBallot(ShaderBallot::Mask(_)) = builtin {
            {
                let frame = self
                    .clone()
                    .ir_type((GlslType::vector(Scalar::Uint, 4)).clone(), at);
                let result = self.nest(frame).await;
                result
            }?
        } else {
            {
                let frame = self
                    .clone()
                    .ray_builtin_type(String::from(name), ty.clone(), at);
                let result = self.nest(frame).await;
                result
            }?
        };
        let memory_decorations = if volatile {
            MemoryDecorations::VOLATILE
        } else {
            self.with(|this| this.ray_builtin_decorations(builtin))?
        };
        let handle = self.with(|this| {
            this.module.global_variables.append(
                GlobalVariable {
                    name: Some(String::from(super::ray::ray_builtin_name(name, key))),
                    space: if output {
                        AddressSpace::Output
                    } else {
                        AddressSpace::Input
                    },
                    binding: None,
                    ty: ir,
                    init: None,
                    memory_decorations,
                    io: Some(Binding::BuiltIn(builtin)),
                    xfb: None,
                    input_attachment_index: None,
                    heap_offset: None,
                    tile_attachment: false,
                    spirv_decorations: Vec::new(),
                    relaxed_precision: false,
                    immediate_bank: None,
                    block: None,
                },
                at,
            )
        })?;
        self.with(|this| this.interface.push(handle))?;
        self.with(|this| this.builtins.insert(String::from(key), handle))?;
        Ok(handle)
    }
}

pub(super) fn location_count(module: &crate::Module, ty: Handle<crate::Type>) -> u32 {
    enum Task {
        Visit(Handle<crate::Type>),
        Scale(u32),
        Sum(usize),
    }
    const fn vector_locations(size: crate::VectorSize, scalar: crate::Scalar) -> u32 {
        match (size, scalar.width) {
            (crate::VectorSize::Tri | crate::VectorSize::Quad, 8) => 2,
            _ => 1,
        }
    }
    let types = &module.types;
    let mut tasks = alloc::vec![Task::Visit(ty)];
    let mut counts: Vec<u32> = Vec::new();
    while let Some(task) = tasks.pop() {
        match task {
            Task::Visit(ty) => match types[ty].inner {
                TypeInner::Vector { size, scalar } => counts.push(vector_locations(size, scalar)),
                TypeInner::Matrix {
                    columns,
                    rows,
                    scalar,
                } => counts.push((columns as u32).saturating_mul(vector_locations(rows, scalar))),
                TypeInner::Array { base, size, .. } => match size.resolve(module.to_ctx()) {
                    Ok(crate::proc::IndexableLength::Known(length)) => {
                        tasks.push(Task::Scale(length));
                        tasks.push(Task::Visit(base));
                    }
                    _ => counts.push(1),
                },
                TypeInner::Struct { ref members, .. } => {
                    tasks.push(Task::Sum(members.len()));
                    tasks.extend(members.iter().rev().map(|member| Task::Visit(member.ty)));
                }
                _ => counts.push(1),
            },
            Task::Scale(length) => {
                let count = counts.pop().unwrap_or(1);
                counts.push(length.saturating_mul(count));
            }
            Task::Sum(members) => {
                let start = counts.len().saturating_sub(members);
                let sum = counts.drain(start..).fold(0, u32::saturating_add);
                counts.push(sum);
            }
        }
    }
    counts.pop().unwrap_or(1)
}

fn contains_float(types: &crate::UniqueArena<crate::Type>, ty: Handle<crate::Type>) -> bool {
    let mut pending = alloc::vec![ty];
    while let Some(ty) = pending.pop() {
        match types[ty].inner {
            TypeInner::Scalar(scalar)
            | TypeInner::Vector { scalar, .. }
            | TypeInner::Matrix { scalar, .. } => {
                if scalar.kind == crate::ScalarKind::Float {
                    return true;
                }
            }
            TypeInner::Array { base, .. } => pending.push(base),
            TypeInner::Struct { ref members, .. } => {
                pending.extend(members.iter().rev().map(|member| member.ty));
            }
            _ => {}
        }
    }
    false
}
