use alloc::{string::String, vec::Vec};
use rglsl_sema::scope::QualifierFlags;
use rglsl_types::extension::Extension;
use rglsl_types::stack::recurse;

use rglsl_ast::ast::{Expression as AstExpression, Spanned, TypeQualifier};
use rglsl_sema::builtins::kind::Primitive;
use rglsl_sema::builtins::variables::{self, BuiltinVariable};
use rglsl_sema::scope::{Origin, Qualifiers, Storage};
use rglsl_sema::types::{
    ArraySize as GlslArraySize, BlockStorage, Scalar, Type as GlslType, TypeKind,
};
use rglsl_sema::{LayoutId, SymbolId};

use super::function::FunctionLowerer;
use super::{GlobalRef, Lowerer, Result, internal, semantic, unsupported, xfb};
use crate::proc::Alignment;
use crate::{
    AddressSpace, Binding, BuiltIn, GeometryInfo, GeometryInputPrimitive, GeometryOutputPrimitive,
    GlobalVariable, Handle, MemoryDecorations, ShaderStage, Span, Statement, TessellationInfo,
    TessellationPrimitive, TessellationSpacing, TessellationVertexOrder, TypeInner,
};

#[derive(Debug, Default)]
pub(super) struct StageLayout {
    input_primitive: Option<GeometryInputPrimitive>,
    output_primitive: Option<GeometryOutputPrimitive>,
    pub(super) vertices: Option<u32>,
    pub(super) primitives: Option<u32>,
    pub(super) mesh_topology: Option<crate::MeshOutputTopology>,
    invocations: Option<u32>,
    primitive: Option<TessellationPrimitive>,
    spacing: Option<TessellationSpacing>,
    vertex_order: Option<TessellationVertexOrder>,
    point_mode: bool,
    stream: u32,
    multi_stream: bool,
    streams: Vec<(Handle<GlobalVariable>, u32)>,
    passthrough: Vec<Handle<GlobalVariable>>,
}

impl StageLayout {
    pub(super) fn record(&self) -> crate::object::StageLayout {
        crate::object::StageLayout {
            input_primitive: self.input_primitive,
            output_primitive: self.output_primitive,
            vertices: self.vertices,
            primitives: self.primitives,
            invocations: self.invocations,
            tessellation_primitive: self.primitive,
            spacing: self.spacing,
            vertex_order: self.vertex_order,
            point_mode: self.point_mode,
            mesh_topology: self.mesh_topology,
            multi_stream: self.multi_stream,
            streams: self.streams.clone(),
            passthrough: self.passthrough.clone(),
            ..crate::object::StageLayout::default()
        }
    }
}

const fn input_primitive(id: LayoutId) -> Option<GeometryInputPrimitive> {
    Some(match id {
        LayoutId::Points => GeometryInputPrimitive::Points,
        LayoutId::Lines => GeometryInputPrimitive::Lines,
        LayoutId::LinesAdjacency => GeometryInputPrimitive::LinesAdjacency,
        LayoutId::Triangles => GeometryInputPrimitive::Triangles,
        LayoutId::TrianglesAdjacency => GeometryInputPrimitive::TrianglesAdjacency,
        _ => return None,
    })
}

const fn output_primitive(id: LayoutId) -> Option<GeometryOutputPrimitive> {
    Some(match id {
        LayoutId::Points => GeometryOutputPrimitive::Points,
        LayoutId::LineStrip => GeometryOutputPrimitive::LineStrip,
        LayoutId::TriangleStrip => GeometryOutputPrimitive::TriangleStrip,
        _ => return None,
    })
}

const fn tessellation_primitive(id: LayoutId) -> Option<TessellationPrimitive> {
    Some(match id {
        LayoutId::Triangles => TessellationPrimitive::Triangles,
        LayoutId::Quads => TessellationPrimitive::Quads,
        LayoutId::Isolines => TessellationPrimitive::Isolines,
        _ => return None,
    })
}

const fn spacing(id: LayoutId) -> Option<TessellationSpacing> {
    Some(match id {
        LayoutId::EqualSpacing => TessellationSpacing::Equal,
        LayoutId::FractionalEvenSpacing => TessellationSpacing::FractionalEven,
        LayoutId::FractionalOddSpacing => TessellationSpacing::FractionalOdd,
        _ => return None,
    })
}

const fn vertex_order(id: LayoutId) -> Option<TessellationVertexOrder> {
    Some(match id {
        LayoutId::Cw => TessellationVertexOrder::Cw,
        LayoutId::Ccw => TessellationVertexOrder::Ccw,
        _ => return None,
    })
}

pub(super) const fn with_invariant(builtin: BuiltIn, invariant: bool) -> BuiltIn {
    match builtin {
        BuiltIn::Position { .. } => BuiltIn::Position { invariant },
        other => other,
    }
}

impl<'a> Lowerer<'a> {
    pub(super) fn stage_input_layout(&mut self, ids: &[LayoutId]) {
        let relevant = |stage: ShaderStage| {
            ids.iter().copied().any(|id| match stage {
                ShaderStage::Geometry => input_primitive(id).is_some(),
                ShaderStage::TessEvaluation => {
                    tessellation_primitive(id).is_some()
                        || spacing(id).is_some()
                        || vertex_order(id).is_some()
                        || id == LayoutId::PointMode
                }
                _ => false,
            })
        };
        let Some(stage) = self.stage_map(|stage| relevant(stage).then_some(stage)) else {
            return;
        };
        for &id in ids {
            match stage {
                ShaderStage::Geometry => {
                    if let Some(primitive) = input_primitive(id) {
                        self.stage_layout.input_primitive.get_or_insert(primitive);
                    }
                }
                ShaderStage::TessEvaluation => {
                    if let Some(primitive) = tessellation_primitive(id) {
                        self.stage_layout.primitive.get_or_insert(primitive);
                    }
                    if let Some(spacing) = spacing(id) {
                        self.stage_layout.spacing.get_or_insert(spacing);
                    }
                    if let Some(order) = vertex_order(id) {
                        self.stage_layout.vertex_order.get_or_insert(order);
                    }
                    if id == LayoutId::PointMode {
                        self.stage_layout.point_mode = true;
                    }
                }
                _ => {}
            }
        }
    }

    pub(super) fn stage_input_values(&mut self, qualifier: &'a Spanned<TypeQualifier>) {
        if self.stage_is(ShaderStage::Geometry)
            && let Some(invocations) =
                xfb::ast_layout_value(self, Some(qualifier), LayoutId::Invocations)
        {
            self.stage_layout.invocations.get_or_insert(invocations);
        }
    }

    pub(super) fn stage_output_layout(
        &mut self,
        ids: &[LayoutId],
        qualifier: &'a Spanned<TypeQualifier>,
    ) {
        let relevant = ids.iter().copied().any(|id| {
            output_primitive(id).is_some()
                || super::mesh::mesh_topology(id).is_some()
                || matches!(
                    id,
                    LayoutId::MaxVertices
                        | LayoutId::Stream
                        | LayoutId::Vertices
                        | LayoutId::MaxPrimitives
                )
        });
        if !relevant {
            return;
        }
        match self.stage() {
            ShaderStage::Geometry => {
                for &id in ids {
                    if let Some(primitive) = output_primitive(id) {
                        self.stage_layout.output_primitive.get_or_insert(primitive);
                    }
                }
                if let Some(vertices) =
                    xfb::ast_layout_value(self, Some(qualifier), LayoutId::MaxVertices)
                {
                    self.stage_layout.vertices.get_or_insert(vertices);
                }
                if let Some(stream) = xfb::ast_layout_value(self, Some(qualifier), LayoutId::Stream)
                {
                    self.stage_layout.stream = stream;
                    if stream > 0 {
                        self.stage_layout.multi_stream = true;
                    }
                }
            }
            ShaderStage::TessControl => {
                if let Some(vertices) =
                    xfb::ast_layout_value(self, Some(qualifier), LayoutId::Vertices)
                {
                    self.stage_layout.vertices.get_or_insert(vertices);
                }
            }
            ShaderStage::Mesh => {
                for &id in ids {
                    if let Some(topology) = super::mesh::mesh_topology(id) {
                        self.stage_layout.mesh_topology.get_or_insert(topology);
                    }
                }
                if let Some(vertices) =
                    xfb::ast_layout_value(self, Some(qualifier), LayoutId::MaxVertices)
                {
                    self.stage_layout.vertices.get_or_insert(vertices);
                }
                if let Some(primitives) =
                    xfb::ast_layout_value(self, Some(qualifier), LayoutId::MaxPrimitives)
                {
                    self.stage_layout.primitives.get_or_insert(primitives);
                }
            }
            _ => {}
        }
    }

    pub(super) fn output_stream(
        &mut self,
        handle: Handle<GlobalVariable>,
        qualifiers: &Qualifiers,
    ) {
        if !self.library && !self.stage_is(ShaderStage::Geometry) {
            return;
        }
        let stream = xfb::layout_value(qualifiers, LayoutId::Stream);
        if stream.is_some_and(|stream| stream > 0) {
            self.stage_layout.multi_stream = true;
        }
        let stream = stream.unwrap_or(self.stage_layout.stream);
        self.stage_layout.streams.push((handle, stream));
    }

    pub(super) fn is_per_vertex_io(&self, qualifiers: &Qualifiers) -> bool {
        if qualifiers.flags.contains(QualifierFlags::PATCH) {
            return false;
        }
        let storage = qualifiers.storage;
        if storage == Storage::In && qualifiers.per_vertex.is_some() {
            return true;
        }
        let per_task = qualifiers.flags.contains(QualifierFlags::PER_TASK);
        self.stage_map(|stage| match storage {
            Storage::In => stage.has_arrayed_io(),
            Storage::Out => {
                matches!(stage, ShaderStage::TessControl)
                    || (matches!(stage, ShaderStage::Mesh) && !per_task)
            }
            _ => false,
        })
    }

    pub(super) fn passthrough_defaults(&mut self) {
        if !self
            .analysis
            .extensions
            .contains(Extension::NvGeometryShaderPassthrough)
            || !self.stage_is(ShaderStage::Geometry)
        {
            return;
        }
        let layout = &mut self.stage_layout;
        let defaults = match layout.input_primitive {
            Some(GeometryInputPrimitive::Points) => Some((GeometryOutputPrimitive::Points, 1)),
            Some(GeometryInputPrimitive::Lines) => Some((GeometryOutputPrimitive::LineStrip, 2)),
            Some(GeometryInputPrimitive::Triangles) => {
                Some((GeometryOutputPrimitive::TriangleStrip, 3))
            }
            Some(
                GeometryInputPrimitive::LinesAdjacency | GeometryInputPrimitive::TrianglesAdjacency,
            )
            | None => None,
        };
        if let Some((output, vertices)) = defaults {
            layout.output_primitive.get_or_insert(output);
            layout.vertices.get_or_insert(vertices);
        }
    }

    pub(super) fn passthrough(&mut self, handle: Handle<GlobalVariable>, qualifiers: &Qualifiers) {
        if self.stage_is(ShaderStage::Geometry) && qualifiers.has_layout(LayoutId::Passthrough) {
            self.stage_layout.passthrough.push(handle);
        }
    }

    pub(super) fn passthrough_per_vertex(
        &mut self,
        structure: &rglsl_ast::ast::BlockStructure,
        at: Span,
    ) -> Result<()> {
        self.builtin_name("gl_in");
        let analysis = self.analysis;
        let block = analysis
            .symbols
            .iter()
            .filter(|symbol| symbol.name == "gl_in")
            .filter_map(|symbol| match symbol.kind {
                rglsl_sema::scope::SymbolKind::Variable(ref variable)
                    if variable.origin == Origin::BuiltIn =>
                {
                    match variable.ty.kind {
                        TypeKind::Block(id) => analysis.types.block(id),
                        _ => None,
                    }
                }
                _ => None,
            })
            .next()
            .ok_or_else(|| internal(at))?;
        let mut members = Vec::new();
        let mut offset = 0_u32;
        let mut alignment = Alignment::ONE;
        for declaration in &structure.members {
            for declarator in &declaration.node.declarators {
                let name = &declarator.node.name.node;
                let (_, member) = block
                    .member(name)
                    .ok_or_else(|| unsupported(format_member(name), at))?;
                let builtin = variables::member(&block.name, name)
                    .and_then(BuiltinVariable::builtin)
                    .ok_or_else(|| unsupported(format_member(name), at))?;
                let ty = if variables::clip_or_cull_distance(name) {
                    let size = match member.ty.outer_size() {
                        Some(GlslArraySize::Sized(size)) => size,
                        _ => 1,
                    };
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
                members.push(crate::StructMember {
                    name: Some(name.clone()),
                    ty,
                    binding: Some(Binding::BuiltIn(builtin)),
                    offset,
                    matrix_layout: None,
                    xfb_offset: None,
                    heap: None,
                    memory_decorations: MemoryDecorations::empty(),
                    relaxed_precision: false,
                });
                offset = offset.saturating_add(layout.size);
            }
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
                space: AddressSpace::Input,
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
        self.stage_layout.passthrough.push(handle);
        Ok(())
    }

    fn layout_missing(&self) -> bool {
        match self.stage() {
            ShaderStage::Geometry => self.stage_layout.input_primitive.is_none(),
            ShaderStage::TessControl => self.stage_layout.vertices.is_none(),
            ShaderStage::Mesh => {
                self.stage_layout.vertices.is_none()
                    || self.stage_layout.primitives.is_none()
                    || self.stage_layout.mesh_topology.is_none()
            }
            _ => false,
        }
    }

    pub(super) fn check_stage_layout(&mut self) {
        let layout = &self.stage_layout;
        let missing: &[(bool, &str)] = match self.stage() {
            ShaderStage::Geometry => &[
                (
                    layout.input_primitive.is_none(),
                    "At least one shader must specify an input layout primitive",
                ),
                (
                    layout.output_primitive.is_none(),
                    "At least one shader must specify an output layout primitive",
                ),
                (
                    layout.vertices.is_none(),
                    "At least one shader must specify a layout(max_vertices = value)",
                ),
            ],
            ShaderStage::TessControl => &[(
                layout.vertices.is_none(),
                "At least one shader must specify an output layout(vertices=...)",
            )],
            ShaderStage::TessEvaluation => &[(
                layout.primitive.is_none(),
                "At least one shader must specify an input layout primitive",
            )],
            ShaderStage::Mesh => &[
                (
                    layout.vertices.is_none(),
                    "At least one shader must specify a layout(max_vertices = value)",
                ),
                (
                    layout.primitives.is_none(),
                    "At least one shader must specify a layout(max_primitives = value)",
                ),
                (
                    layout.mesh_topology.is_none(),
                    "At least one shader must specify an output layout primitive",
                ),
            ],
            _ => &[],
        };
        let errors: Vec<_> = missing
            .iter()
            .filter(|&&(missing, _)| missing)
            .map(|&(_, message)| semantic(message, Span::UNDEFINED))
            .collect();
        self.errors.extend(errors);
    }

    pub(super) fn stage_info(&self) -> (Option<GeometryInfo>, Option<TessellationInfo>) {
        let layout = &self.stage_layout;
        match self.stage() {
            ShaderStage::Geometry => {
                let geometry = match (layout.input_primitive, layout.output_primitive) {
                    (Some(input), Some(output)) => Some(GeometryInfo {
                        input,
                        output,
                        max_vertices: layout.vertices.unwrap_or(0),
                        invocations: layout.invocations.unwrap_or(1),
                        streams: if layout.multi_stream {
                            self.interface
                                .iter()
                                .filter(|&&handle| {
                                    self.module.global_variables[handle].space
                                        == AddressSpace::Output
                                })
                                .map(|&handle| {
                                    let stream = layout
                                        .streams
                                        .iter()
                                        .find(|&&(declared, _)| declared == handle)
                                        .map_or(0, |&(_, stream)| stream);
                                    (handle, stream)
                                })
                                .collect()
                        } else {
                            Vec::new()
                        },
                        passthrough: layout.passthrough.clone(),
                    }),
                    _ => None,
                };
                (geometry, None)
            }
            ShaderStage::TessControl => (
                None,
                Some(TessellationInfo {
                    output_vertices: layout.vertices,
                    ..TessellationInfo::default()
                }),
            ),
            ShaderStage::TessEvaluation => (
                None,
                Some(TessellationInfo {
                    output_vertices: None,
                    primitive: layout.primitive,
                    spacing: Some(layout.spacing.unwrap_or(TessellationSpacing::Equal)),
                    vertex_order: Some(layout.vertex_order.unwrap_or(TessellationVertexOrder::Ccw)),
                    point_mode: layout.point_mode,
                }),
            ),
            _ => (None, None),
        }
    }

    pub(super) fn is_per_vertex_array(&self, symbol: SymbolId) -> bool {
        let Some(variable) = self.variable(symbol) else {
            return false;
        };
        let TypeKind::Block(id) = variable.ty.kind else {
            return false;
        };
        variable.origin == Origin::BuiltIn
            && variable.ty.is_array()
            && self
                .analysis
                .types
                .block(id)
                .is_some_and(|block| variables::blocks_named(&block.name).next().is_some())
    }
}

impl FunctionLowerer<'_, '_> {
    pub(super) fn per_vertex_array(&mut self, symbol: SymbolId, at: Span) -> Result<GlobalRef> {
        let analysis = self.lw.analysis;
        let record = self.lw.symbol(symbol).ok_or_else(|| internal(at))?;
        let variable = self.lw.variable(symbol).ok_or_else(|| internal(at))?;
        let TypeKind::Block(id) = variable.ty.kind else {
            return Err(internal(at));
        };
        let block = analysis.types.block(id).ok_or_else(|| internal(at))?;
        let input = block.storage == BlockStorage::In;
        let size = match variable.ty.outer_size() {
            Some(GlslArraySize::Sized(size)) => size,
            _ if self.lw.layout_missing() => 1,
            _ => {
                return Err(semantic(
                    format_size_error(&record.name, self.lw.stage()),
                    at,
                ));
            }
        };
        let mut members = Vec::with_capacity(block.members.len());
        let mut offset = 0_u32;
        let mut alignment = Alignment::ONE;
        for (index, member) in block.members.iter().enumerate() {
            let index = u32::try_from(index).map_err(|_| internal(at))?;
            let row = variables::member(&block.name, &member.name)
                .ok_or_else(|| unsupported(format_member(&member.name), at))?;
            if !row.requires_one_of.is_empty()
                && !analysis.extensions.contains_any(row.requires_one_of)
            {
                continue;
            }
            let position = u32::try_from(members.len()).map_err(|_| internal(at))?;
            if position != index {
                self.lw.member_indices.insert((id, index), position);
            }
            let builtin = with_invariant(
                row.builtin()
                    .ok_or_else(|| unsupported(format_member(&member.name), at))?,
                member.qualifiers.flags.contains(QualifierFlags::INVARIANT)
                    || (!input && self.lw.invariant_all),
            );
            let mut sized = member.ty.clone();
            for (depth, size) in member.ty.dimensions().iter().enumerate() {
                if *size == GlslArraySize::Unsized {
                    let used = if depth == 0 {
                        self.lw.member_sizes.get(&(id, index)).copied()
                    } else {
                        self.lw
                            .member_dimension_sizes
                            .get(&(id, index, depth))
                            .copied()
                    };
                    sized.set_dimension(depth, GlslArraySize::Sized(used.unwrap_or(1)));
                }
            }
            let ty = recurse(|| self.ir_type(&sized, at))?;
            self.lw
                .layouter
                .update(self.lw.module.to_ctx())
                .map_err(|_| internal(at))?;
            let layout = self.lw.layouter[ty];
            offset = layout.alignment.round_up(offset);
            alignment = layout.alignment.max(alignment);
            members.push(crate::StructMember {
                name: Some(member.name.clone()),
                ty,
                binding: Some(Binding::BuiltIn(builtin)),
                offset,
                matrix_layout: None,
                xfb_offset: None,
                heap: None,
                memory_decorations: MemoryDecorations::empty(),
                relaxed_precision: false,
            });
            offset = offset.saturating_add(layout.size);
        }
        let structure = self.lw.module.types.insert(
            crate::Type {
                name: Some(block.name.clone()),
                inner: TypeInner::Struct {
                    members,
                    span: alignment.round_up(offset),
                },
            },
            Span::UNDEFINED,
        );
        let ty = recurse(|| self.wrap_arrays(structure, &([GlslArraySize::Sized(size)]), at))?;
        let handle = self.lw.module.global_variables.append(
            GlobalVariable {
                name: Some(record.name.clone()),
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
        self.lw.interface.push(handle);
        let found = GlobalRef::Variable(handle);
        self.lw.globals.insert(symbol, found);
        Ok(found)
    }

    pub(super) fn primitive_statement(
        &mut self,
        primitive: Primitive,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<()> {
        let stream = match *arguments {
            [] => None,
            [ref stream] => Some(self.constant_index(stream).ok_or_else(|| {
                semantic("the stream must be a constant integral expression", at)
            })?),
            _ => return Err(internal(at)),
        };
        if stream.is_some() {
            self.lw.stage_layout.multi_stream = true;
        }
        let statement = match primitive {
            Primitive::Emit => Statement::EmitVertex { stream },
            Primitive::End => Statement::EndPrimitive { stream },
        };
        self.push(statement, at);
        Ok(())
    }
}

fn format_size_error(name: &str, stage: ShaderStage) -> String {
    let what = match stage {
        ShaderStage::Geometry => "the input primitive",
        ShaderStage::TessControl => "layout(vertices = N)",
        _ => "its declaration",
    };
    alloc::format!("the size of `{name}` is not known: declare {what}")
}

fn format_member(name: &str) -> String {
    alloc::format!("the built-in block member `{name}`")
}
