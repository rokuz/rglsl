use alloc::{string::String, vec::Vec};

use rglsl_ast::ast::{Expression as AstExpression, Spanned, TypeQualifier};
use rglsl_sema::scope::{Origin, Qualifiers, Storage};
use rglsl_sema::types::{
    ArraySize as GlslArraySize, BlockStorage, Scalar, Type as GlslType, TypeKind,
};
use rglsl_sema::SymbolId;

use super::function::FunctionLowerer;
use super::{internal, semantic, unsupported, xfb, GlobalRef, Lowerer, Result};
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
            ..crate::object::StageLayout::default()
        }
    }
}

const PASSTHROUGH_EXTENSION: &str = "GL_NV_geometry_shader_passthrough";

const fn input_primitive(name: &str) -> Option<GeometryInputPrimitive> {
    Some(match name.as_bytes() {
        b"points" => GeometryInputPrimitive::Points,
        b"lines" => GeometryInputPrimitive::Lines,
        b"lines_adjacency" => GeometryInputPrimitive::LinesAdjacency,
        b"triangles" => GeometryInputPrimitive::Triangles,
        b"triangles_adjacency" => GeometryInputPrimitive::TrianglesAdjacency,
        _ => return None,
    })
}

const fn output_primitive(name: &str) -> Option<GeometryOutputPrimitive> {
    Some(match name.as_bytes() {
        b"points" => GeometryOutputPrimitive::Points,
        b"line_strip" => GeometryOutputPrimitive::LineStrip,
        b"triangle_strip" => GeometryOutputPrimitive::TriangleStrip,
        _ => return None,
    })
}

const fn tessellation_primitive(name: &str) -> Option<TessellationPrimitive> {
    Some(match name.as_bytes() {
        b"triangles" => TessellationPrimitive::Triangles,
        b"quads" => TessellationPrimitive::Quads,
        b"isolines" => TessellationPrimitive::Isolines,
        _ => return None,
    })
}

const fn spacing(name: &str) -> Option<TessellationSpacing> {
    Some(match name.as_bytes() {
        b"equal_spacing" => TessellationSpacing::Equal,
        b"fractional_even_spacing" => TessellationSpacing::FractionalEven,
        b"fractional_odd_spacing" => TessellationSpacing::FractionalOdd,
        _ => return None,
    })
}

const fn vertex_order(name: &str) -> Option<TessellationVertexOrder> {
    Some(match name.as_bytes() {
        b"cw" => TessellationVertexOrder::Cw,
        b"ccw" => TessellationVertexOrder::Ccw,
        _ => return None,
    })
}

fn per_vertex_builtin(name: &str, invariant: bool) -> Option<BuiltIn> {
    Some(match name {
        "gl_Position" => BuiltIn::Position { invariant },
        "gl_PointSize" => BuiltIn::PointSize,
        "gl_ClipDistance" => BuiltIn::ClipDistances,
        "gl_CullDistance" => BuiltIn::CullDistance,
        "gl_ViewportMask" => BuiltIn::ViewportMaskNV,
        "gl_SecondaryPositionNV" => BuiltIn::SecondaryPositionNV,
        "gl_SecondaryViewportMaskNV" => BuiltIn::SecondaryViewportMaskNV,
        "gl_PositionPerViewNV" => BuiltIn::PositionPerViewNV,
        "gl_ViewportMaskPerViewNV" => BuiltIn::ViewportMaskPerViewNV,
        _ => return None,
    })
}

impl<'a> Lowerer<'a> {
    pub(super) fn stage_input_layout(&mut self, names: &[String]) {
        let stage = self.options.stage;
        for name in names {
            let name = name.to_ascii_lowercase();
            match stage {
                ShaderStage::Geometry => {
                    if let Some(primitive) = input_primitive(&name) {
                        self.stage_layout.input_primitive.get_or_insert(primitive);
                    }
                }
                ShaderStage::TessEvaluation => {
                    if let Some(primitive) = tessellation_primitive(&name) {
                        self.stage_layout.primitive.get_or_insert(primitive);
                    }
                    if let Some(spacing) = spacing(&name) {
                        self.stage_layout.spacing.get_or_insert(spacing);
                    }
                    if let Some(order) = vertex_order(&name) {
                        self.stage_layout.vertex_order.get_or_insert(order);
                    }
                    if name == "point_mode" {
                        self.stage_layout.point_mode = true;
                    }
                }
                _ => {}
            }
        }
    }

    pub(super) fn stage_input_values(&mut self, qualifier: &'a Spanned<TypeQualifier>) {
        if self.options.stage == ShaderStage::Geometry {
            if let Some(invocations) = xfb::ast_layout_value(self, Some(qualifier), "invocations") {
                self.stage_layout.invocations.get_or_insert(invocations);
            }
        }
    }

    pub(super) fn stage_output_layout(
        &mut self,
        names: &[String],
        qualifier: &'a Spanned<TypeQualifier>,
    ) {
        match self.options.stage {
            ShaderStage::Geometry => {
                for name in names {
                    if let Some(primitive) = output_primitive(&name.to_ascii_lowercase()) {
                        self.stage_layout.output_primitive.get_or_insert(primitive);
                    }
                }
                if let Some(vertices) = xfb::ast_layout_value(self, Some(qualifier), "max_vertices")
                {
                    self.stage_layout.vertices.get_or_insert(vertices);
                }
                if let Some(stream) = xfb::ast_layout_value(self, Some(qualifier), "stream") {
                    self.stage_layout.stream = stream;
                    if stream > 0 {
                        self.stage_layout.multi_stream = true;
                    }
                }
            }
            ShaderStage::TessControl => {
                if let Some(vertices) = xfb::ast_layout_value(self, Some(qualifier), "vertices") {
                    self.stage_layout.vertices.get_or_insert(vertices);
                }
            }
            ShaderStage::Mesh => {
                for name in names {
                    if let Some(topology) = super::mesh::mesh_topology(&name.to_ascii_lowercase()) {
                        self.stage_layout.mesh_topology.get_or_insert(topology);
                    }
                }
                if let Some(vertices) = xfb::ast_layout_value(self, Some(qualifier), "max_vertices")
                {
                    self.stage_layout.vertices.get_or_insert(vertices);
                }
                if let Some(primitives) =
                    xfb::ast_layout_value(self, Some(qualifier), "max_primitives")
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
        if self.options.stage != ShaderStage::Geometry {
            return;
        }
        let stream = xfb::layout_value(qualifiers, "stream");
        if stream.is_some_and(|stream| stream > 0) {
            self.stage_layout.multi_stream = true;
        }
        let stream = stream.unwrap_or(self.stage_layout.stream);
        self.stage_layout.streams.push((handle, stream));
    }

    pub(super) const fn is_per_vertex_io(&self, qualifiers: &Qualifiers) -> bool {
        let stage = self.options.stage;
        if qualifiers.patch {
            return false;
        }
        match qualifiers.storage {
            Storage::In => stage.has_arrayed_io(),
            Storage::Out => {
                matches!(stage, ShaderStage::TessControl)
                    || (matches!(stage, ShaderStage::Mesh) && !qualifiers.per_task)
            }
            _ => false,
        }
    }

    pub(super) fn passthrough_defaults(&mut self) {
        if self.options.stage != ShaderStage::Geometry
            || !self.analysis.extensions.contains(PASSTHROUGH_EXTENSION)
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
        if self.options.stage == ShaderStage::Geometry && qualifiers.has_layout("passthrough") {
            self.stage_layout.passthrough.push(handle);
        }
    }

    pub(super) fn passthrough_per_vertex(
        &mut self,
        structure: &rglsl_ast::ast::BlockStructure,
        at: Span,
    ) -> Result<()> {
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
            for declarator in &declaration.declarators {
                let name = &declarator.name.node;
                let (_, member) = block
                    .member(name)
                    .ok_or_else(|| unsupported(format_member(name), at))?;
                let builtin = per_vertex_builtin(name, false)
                    .ok_or_else(|| unsupported(format_member(name), at))?;
                let ty = if super::prepass::CLIP_DISTANCES.contains(&name.as_str()) {
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
            },
            at,
        );
        self.interface.push(handle);
        self.stage_layout.passthrough.push(handle);
        Ok(())
    }

    const fn layout_missing(&self) -> bool {
        match self.options.stage {
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
        let missing: &[(bool, &str)] = match self.options.stage {
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
        match self.options.stage {
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
            && self.analysis.types.block(id).is_some_and(|block| {
                block.name == "gl_PerVertex"
                    || super::mesh::MESH_BLOCKS.contains(&block.name.as_str())
            })
    }

    pub(super) fn per_vertex_array(&mut self, symbol: SymbolId, at: Span) -> Result<GlobalRef> {
        let analysis = self.analysis;
        let record = self.symbol(symbol).ok_or_else(|| internal(at))?;
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let TypeKind::Block(id) = variable.ty.kind else {
            return Err(internal(at));
        };
        let block = analysis.types.block(id).ok_or_else(|| internal(at))?;
        let input = block.storage == BlockStorage::In;
        let size = match variable.ty.outer_size() {
            Some(GlslArraySize::Sized(size)) => size,
            _ if self.layout_missing() => 1,
            _ => {
                return Err(semantic(
                    format_size_error(&record.name, self.options.stage),
                    at,
                ))
            }
        };
        let mut members = Vec::with_capacity(block.members.len());
        let mut offset = 0_u32;
        let mut alignment = Alignment::ONE;
        let shading_rate = self
            .analysis
            .extensions
            .contains("GL_EXT_fragment_shading_rate");
        for (index, member) in block.members.iter().enumerate() {
            let index = u32::try_from(index).map_err(|_| internal(at))?;
            let requested = if self.options.stage == ShaderStage::Mesh {
                member.name != "gl_PrimitiveShadingRateEXT" || shading_rate
            } else {
                rglsl_sema::builtins::view_extension(&member.name)
                    .is_none_or(|extension| analysis.extensions.contains(extension))
            };
            if !requested {
                continue;
            }
            let position = u32::try_from(members.len()).map_err(|_| internal(at))?;
            if position != index {
                self.member_indices.insert((id, index), position);
            }
            let builtin = per_vertex_builtin(
                &member.name,
                member.qualifiers.invariant || (!input && self.invariant_all),
            )
            .or_else(|| match member.name.as_str() {
                "gl_PrimitiveID" => Some(BuiltIn::PrimitiveIndex),
                "gl_Layer" => Some(BuiltIn::Layer {
                    viewport_relative: false,
                    secondary_view_offset: None,
                }),
                "gl_ViewportIndex" => Some(BuiltIn::ViewportIndex),
                name => super::mesh::mesh_builtin(name),
            })
            .ok_or_else(|| unsupported(format_member(&member.name), at))?;
            let mut sized = member.ty.clone();
            for (depth, size) in sized.array.iter_mut().enumerate() {
                if *size == GlslArraySize::Unsized {
                    let used = if depth == 0 {
                        self.member_sizes.get(&(id, index)).copied()
                    } else {
                        self.member_dimension_sizes
                            .get(&(id, index, depth))
                            .copied()
                    };
                    *size = GlslArraySize::Sized(used.unwrap_or(1));
                }
            }
            let ty = self.ir_type(&sized, at)?;
            self.layouter
                .update(self.module.to_ctx())
                .map_err(|_| internal(at))?;
            let layout = self.layouter[ty];
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
                relaxed_precision: false,
            });
            offset = offset.saturating_add(layout.size);
        }
        let structure = self.module.types.insert(
            crate::Type {
                name: Some(block.name.clone()),
                inner: TypeInner::Struct {
                    members,
                    span: alignment.round_up(offset),
                },
            },
            Span::UNDEFINED,
        );
        let ty = self.wrap_arrays(structure, &[GlslArraySize::Sized(size)], at)?;
        let handle = self.module.global_variables.append(
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
            },
            at,
        );
        self.interface.push(handle);
        let found = GlobalRef::Variable(handle);
        self.globals.insert(symbol, found);
        Ok(found)
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

impl FunctionLowerer<'_, '_> {
    pub(super) fn primitive_statement(
        &mut self,
        name: &str,
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
        let statement = match name {
            "EmitVertex" | "EmitStreamVertex" => Statement::EmitVertex { stream },
            "EndPrimitive" | "EndStreamPrimitive" => Statement::EndPrimitive { stream },
            _ => return Err(internal(at)),
        };
        self.push(statement, at);
        Ok(())
    }
}
