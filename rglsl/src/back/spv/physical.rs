use alloc::vec::Vec;

use spirv::Op;

use super::{Block, BlockContext, Error, Instruction};
use crate::{arena::Handle, AddressSpace, Expression, PointerQualifiers, TypeInner};

fn physical_qualifiers(
    types: &crate::UniqueArena<crate::Type>,
    ty: Handle<crate::Type>,
) -> Option<PointerQualifiers> {
    match types[ty].inner {
        TypeInner::Pointer {
            space: AddressSpace::PhysicalStorage { qualifiers, .. },
            ..
        } => Some(qualifiers),
        TypeInner::Array { base, .. } => physical_qualifiers(types, base),
        TypeInner::Struct { ref members, .. } => members
            .iter()
            .any(|member| physical_qualifiers(types, member.ty).is_some())
            .then_some(PointerQualifiers::empty()),
        _ => None,
    }
}

pub(super) fn global_qualifiers(decorations: crate::MemoryDecorations) -> PointerQualifiers {
    use crate::MemoryDecorations as Md;
    [
        (Md::COHERENT, PointerQualifiers::COHERENT),
        (Md::VOLATILE, PointerQualifiers::VOLATILE),
        (Md::DEVICE_COHERENT, PointerQualifiers::DEVICE_COHERENT),
        (
            Md::QUEUE_FAMILY_COHERENT,
            PointerQualifiers::QUEUE_FAMILY_COHERENT,
        ),
        (
            Md::WORKGROUP_COHERENT,
            PointerQualifiers::WORKGROUP_COHERENT,
        ),
        (Md::SUBGROUP_COHERENT, PointerQualifiers::SUBGROUP_COHERENT),
        (
            Md::SHADER_CALL_COHERENT,
            PointerQualifiers::SHADER_CALL_COHERENT,
        ),
        (Md::NONPRIVATE, PointerQualifiers::NONPRIVATE),
        (Md::NONTEMPORAL, PointerQualifiers::NONTEMPORAL),
    ]
    .into_iter()
    .filter(|&(decoration, _)| decorations.contains(decoration))
    .fold(PointerQualifiers::empty(), |all, (_, qualifier)| {
        all | qualifier
    })
}

impl super::Writer {
    pub(super) const fn device_scope(&self) -> spirv::Scope {
        if self.vulkan_memory_model {
            spirv::Scope::QueueFamily
        } else {
            spirv::Scope::Device
        }
    }

    pub(super) fn decorate_pointer_variable(
        &mut self,
        types: &crate::UniqueArena<crate::Type>,
        ty: Handle<crate::Type>,
        id: super::Word,
    ) {
        let Some(qualifiers) = physical_qualifiers(types, ty) else {
            return;
        };
        if qualifiers.contains(PointerQualifiers::RESTRICT) {
            self.decorate(id, spirv::Decoration::Restrict, &[]);
            self.decorate(id, spirv::Decoration::RestrictPointer, &[]);
        } else {
            self.decorate(id, spirv::Decoration::AliasedPointer, &[]);
        }
    }

    pub(super) fn decorate_pointer_parameter(
        &mut self,
        types: &crate::UniqueArena<crate::Type>,
        ty: Handle<crate::Type>,
        id: super::Word,
    ) {
        let TypeInner::Pointer {
            space: AddressSpace::PhysicalStorage { qualifiers, .. },
            ..
        } = types[ty].inner
        else {
            return;
        };
        if qualifiers.contains(PointerQualifiers::RESTRICT) {
            self.decorate(id, spirv::Decoration::Restrict, &[]);
        } else {
            self.decorate(id, spirv::Decoration::Aliased, &[]);
        }
    }
}

impl super::Writer {
    pub(super) fn contains_physical_type(&self, id: super::Word) -> bool {
        if self.physical_type_ids.contains(&id) {
            return true;
        }
        if let Some((&laid, _)) = self
            .plain_types
            .iter()
            .find(|&(&laid, &plain)| plain == id && laid != id)
        {
            return self.contains_physical_type(laid);
        }
        match self
            .composite_types
            .get(&id)
            .map(|composite| &composite.shape)
        {
            Some(&super::plain_types::CompositeShape::Array { element, .. }) => {
                self.contains_physical_type(element)
            }
            Some(&super::plain_types::CompositeShape::Struct { ref members, .. }) => members
                .iter()
                .any(|member| self.contains_physical_type(*member)),
            None => false,
        }
    }
}

enum Step {
    Constant(u32),
    Dynamic,
}

const fn lowest_bit(value: u32) -> u32 {
    value & value.wrapping_neg()
}

impl BlockContext<'_> {
    fn physical_space(&self, expression: Handle<Expression>) -> Option<AddressSpace> {
        match *self.fun_info[expression]
            .ty
            .inner_with(&self.ir_module.types)
        {
            TypeInner::Pointer { space, .. } | TypeInner::ValuePointer { space, .. } => {
                matches!(space, AddressSpace::PhysicalStorage { .. }).then_some(space)
            }
            _ => None,
        }
    }

    fn pointer_alignment(&self, ty: Handle<crate::Type>) -> Option<u32> {
        match self.ir_module.types[ty].inner {
            TypeInner::Pointer {
                space: AddressSpace::PhysicalStorage { alignment, .. },
                ..
            } => Some(alignment),
            _ => None,
        }
    }

    fn innermost_pointer_alignment(&self, ty: Handle<crate::Type>) -> Option<u32> {
        let mut current = ty;
        while let TypeInner::Array { base, .. } = self.ir_module.types[current].inner {
            current = base;
        }
        if current == ty {
            return None;
        }
        self.pointer_alignment(current)
    }

    fn requalifies(&self, value: Handle<Expression>, ty: Handle<crate::Type>) -> bool {
        let types = &self.ir_module.types;
        let TypeInner::Pointer { base: target, .. } = types[ty].inner else {
            return false;
        };
        let same = match *self.fun_info[value].ty.inner_with(types) {
            TypeInner::Pointer {
                base,
                space: AddressSpace::PhysicalStorage { .. },
            } => base == target,
            TypeInner::ValuePointer {
                size,
                scalar,
                space: AddressSpace::PhysicalStorage { .. },
            } => match types[target].inner {
                TypeInner::Scalar(other) => size.is_none() && other == scalar,
                TypeInner::Vector {
                    size: other_size,
                    scalar: other,
                } => size == Some(other_size) && other == scalar,
                _ => false,
            },
            _ => false,
        };
        same && !matches!(
            self.ir_function.expressions[value],
            Expression::Load { .. } | Expression::FunctionArgument(_) | Expression::CallResult(_)
        )
    }

    pub(super) fn physical_alignment(
        &self,
        pointer: Handle<Expression>,
        component: bool,
    ) -> Option<u32> {
        let AddressSpace::PhysicalStorage { .. } = self.physical_space(pointer)? else {
            return None;
        };
        let expressions = &self.ir_function.expressions;
        let mut steps = Vec::new();
        let mut current = pointer;
        loop {
            match expressions[current] {
                Expression::AccessIndex { base, index } if self.physical_space(base).is_some() => {
                    steps.push(Step::Constant(index));
                    current = base;
                }
                Expression::Access { base, .. } if self.physical_space(base).is_some() => {
                    steps.push(Step::Dynamic);
                    current = base;
                }
                Expression::PhysicalPointer { value, ty } if self.requalifies(value, ty) => {
                    current = value;
                }
                _ => break,
            }
        }
        let (mut ty, mut accumulated) =
            match *self.fun_info[current].ty.inner_with(&self.ir_module.types) {
                TypeInner::Pointer {
                    base,
                    space: AddressSpace::PhysicalStorage { alignment, .. },
                } => (base, alignment),
                _ => return None,
            };
        let types = &self.ir_module.types;
        let mut scalar_component = None;
        let mut first_member = false;
        for step in steps.iter().rev() {
            match types[ty].inner {
                TypeInner::Struct { ref members, .. } => {
                    let Step::Constant(index) = *step else {
                        return None;
                    };
                    let member = members.get(usize::try_from(index).ok()?)?;
                    accumulated |= member.offset;
                    if member.offset == 0 {
                        first_member = true;
                    }
                    let mut inner = member.ty;
                    while let TypeInner::Array { base, .. } = types[inner].inner {
                        inner = base;
                    }
                    if let TypeInner::Matrix { .. } = types[inner].inner {
                        if let Some(layout) = member.matrix_layout {
                            accumulated |= layout.stride;
                        }
                    }
                    ty = member.ty;
                }
                TypeInner::Array { base, stride, .. } => {
                    accumulated |= stride;
                    if let Some(alignment) = self.innermost_pointer_alignment(ty) {
                        accumulated |= alignment;
                    }
                    ty = base;
                }
                TypeInner::Matrix { scalar, .. } => {
                    scalar_component = Some(scalar);
                    break;
                }
                TypeInner::Vector { scalar, .. } => {
                    accumulated |= u32::from(scalar.width);
                    return Some(lowest_bit(accumulated).max(1));
                }
                _ => return None,
            }
        }
        if let Some(scalar) = scalar_component {
            let pointee_is_scalar = matches!(
                *self.fun_info[pointer].ty.inner_with(types),
                TypeInner::ValuePointer { size: None, .. }
            );
            if pointee_is_scalar {
                accumulated |= u32::from(scalar.width);
            }
            return Some(lowest_bit(accumulated).max(1));
        }
        if self.pointer_alignment(ty).is_some() {
            return Some(8);
        }
        if let Some(alignment) = self.innermost_pointer_alignment(ty) {
            accumulated |= alignment;
        }
        if component {
            if let TypeInner::Vector { scalar, .. } = types[ty].inner {
                accumulated |= u32::from(scalar.width);
            }
        }
        let alignment = lowest_bit(accumulated);
        if alignment == 0 && first_member {
            return Some(16);
        }
        Some(alignment.max(1))
    }

    fn root_qualifiers(
        &self,
        pointer: Handle<Expression>,
    ) -> (PointerQualifiers, Option<AddressSpace>) {
        let mut current = pointer;
        let mut members = PointerQualifiers::empty();
        loop {
            match self.ir_function.expressions[current] {
                Expression::AccessIndex { base, index }
                    if self.physical_space(current).is_none() =>
                {
                    members |= self.member_qualifiers(base, index);
                    current = base;
                }
                Expression::Access { base, .. } if self.physical_space(current).is_none() => {
                    current = base;
                }
                Expression::GlobalVariable(handle) => {
                    let global = &self.ir_module.global_variables[handle];
                    let mut qualifiers = global_qualifiers(global.memory_decorations) | members;
                    if global.space == AddressSpace::WorkGroup {
                        qualifiers |= PointerQualifiers::WORKGROUP_COHERENT;
                    }
                    return (qualifiers, Some(global.space));
                }
                Expression::LocalVariable(handle) => {
                    let ty = self.ir_function.local_variables[handle].ty;
                    let qualifiers = match self.ir_module.types[ty].inner {
                        TypeInner::Pointer {
                            space: AddressSpace::PhysicalStorage { qualifiers, .. },
                            ..
                        } => qualifiers & PointerQualifiers::VOLATILE,
                        _ => PointerQualifiers::empty(),
                    };
                    return (qualifiers, Some(AddressSpace::Function));
                }
                _ => return (PointerQualifiers::empty(), None),
            }
        }
    }

    fn member_qualifiers(&self, base: Handle<Expression>, index: u32) -> PointerQualifiers {
        let types = &self.ir_module.types;
        let pointee = match *self.fun_info[base].ty.inner_with(types) {
            TypeInner::Pointer { base, .. } => base,
            _ => return PointerQualifiers::empty(),
        };
        match types[pointee].inner {
            TypeInner::Struct { ref members, .. } => usize::try_from(index)
                .ok()
                .and_then(|index| members.get(index))
                .map_or(PointerQualifiers::empty(), |member| {
                    global_qualifiers(member.memory_decorations)
                }),
            _ => PointerQualifiers::empty(),
        }
    }

    fn coherent_scope(&mut self, qualifiers: PointerQualifiers) -> spirv::Scope {
        if qualifiers.intersects(PointerQualifiers::VOLATILE | PointerQualifiers::COHERENT) {
            spirv::Scope::QueueFamily
        } else if qualifiers.contains(PointerQualifiers::DEVICE_COHERENT) {
            self.writer
                .capabilities_used
                .insert(spirv::Capability::VulkanMemoryModelDeviceScope);
            spirv::Scope::Device
        } else if qualifiers.contains(PointerQualifiers::QUEUE_FAMILY_COHERENT) {
            spirv::Scope::QueueFamily
        } else if qualifiers.contains(PointerQualifiers::WORKGROUP_COHERENT) {
            spirv::Scope::Workgroup
        } else if qualifiers.contains(PointerQualifiers::SUBGROUP_COHERENT) {
            spirv::Scope::Subgroup
        } else {
            spirv::Scope::ShaderCallKHR
        }
    }

    pub(super) fn texel_memory(
        &mut self,
        image: Handle<Expression>,
        store: bool,
    ) -> (spirv::ImageOperands, Option<super::Word>) {
        if !self.writer.vulkan_memory_model {
            return (spirv::ImageOperands::empty(), None);
        }
        let global = match self.ir_function.expressions[image] {
            Expression::GlobalVariable(handle) => Some(handle),
            Expression::Access { base, .. } | Expression::AccessIndex { base, .. } => {
                match self.ir_function.expressions[base] {
                    Expression::GlobalVariable(handle) => Some(handle),
                    _ => None,
                }
            }
            _ => None,
        };
        let Some(global) = global else {
            return (spirv::ImageOperands::empty(), None);
        };
        let qualifiers =
            global_qualifiers(self.ir_module.global_variables[global].memory_decorations);
        let volatile = qualifiers.contains(PointerQualifiers::VOLATILE);
        let coherent = qualifiers.intersects(
            PointerQualifiers::COHERENT
                | PointerQualifiers::DEVICE_COHERENT
                | PointerQualifiers::QUEUE_FAMILY_COHERENT
                | PointerQualifiers::WORKGROUP_COHERENT
                | PointerQualifiers::SUBGROUP_COHERENT
                | PointerQualifiers::SHADER_CALL_COHERENT,
        );
        let mut mask = spirv::ImageOperands::empty();
        let mut scope = None;
        if volatile || coherent {
            mask |= if store {
                spirv::ImageOperands::MAKE_TEXEL_AVAILABLE
            } else {
                spirv::ImageOperands::MAKE_TEXEL_VISIBLE
            };
            let coherent_scope = self.coherent_scope(qualifiers);
            scope = Some(self.get_index_constant(coherent_scope as u32));
        }
        if volatile || coherent || qualifiers.contains(PointerQualifiers::NONPRIVATE) {
            mask |= spirv::ImageOperands::NON_PRIVATE_TEXEL;
        }
        if volatile {
            mask |= spirv::ImageOperands::VOLATILE_TEXEL;
        }
        if qualifiers.contains(PointerQualifiers::NONTEMPORAL)
            && self.writer.lang_version() >= (1, 6)
        {
            mask |= spirv::ImageOperands::NONTEMPORAL;
        }
        (mask, scope)
    }

    pub(super) fn memory_access(
        &mut self,
        pointer: Handle<Expression>,
        component: bool,
        store: bool,
    ) -> Vec<u32> {
        let alignment = self.physical_alignment(pointer, component);
        let (qualifiers, space) = match self.physical_space(pointer) {
            Some(AddressSpace::PhysicalStorage { qualifiers, .. }) => (
                qualifiers,
                Some(AddressSpace::PhysicalStorage {
                    alignment: 0,
                    access: crate::StorageAccess::empty(),
                    qualifiers,
                }),
            ),
            _ => self.root_qualifiers(pointer),
        };
        let mut operands = Vec::new();
        let mut mask = spirv::MemoryAccess::empty();
        let mut scope = None;
        if self.writer.vulkan_memory_model {
            let coherent = PointerQualifiers::COHERENT
                | PointerQualifiers::DEVICE_COHERENT
                | PointerQualifiers::QUEUE_FAMILY_COHERENT
                | PointerQualifiers::WORKGROUP_COHERENT
                | PointerQualifiers::SUBGROUP_COHERENT
                | PointerQualifiers::SHADER_CALL_COHERENT;
            let volatile = qualifiers.contains(PointerQualifiers::VOLATILE);
            let any_coherent = qualifiers.intersects(coherent);
            let visible = matches!(
                space,
                Some(
                    AddressSpace::Uniform
                        | AddressSpace::WorkGroup
                        | AddressSpace::Storage { .. }
                        | AddressSpace::PhysicalStorage { .. }
                )
            );
            if visible && (volatile || any_coherent) {
                mask |= if store {
                    spirv::MemoryAccess::MAKE_POINTER_AVAILABLE
                } else {
                    spirv::MemoryAccess::MAKE_POINTER_VISIBLE
                };
                scope = Some(self.coherent_scope(qualifiers));
            }
            if visible
                && (volatile || any_coherent || qualifiers.contains(PointerQualifiers::NONPRIVATE))
            {
                mask |= spirv::MemoryAccess::NON_PRIVATE_POINTER;
            }
            if volatile {
                mask |= spirv::MemoryAccess::VOLATILE;
            }
            if visible && qualifiers.contains(PointerQualifiers::NONTEMPORAL) {
                mask |= spirv::MemoryAccess::NONTEMPORAL;
            }
        }
        if alignment.is_some() {
            mask |= spirv::MemoryAccess::ALIGNED;
        }
        if mask.is_empty() {
            return operands;
        }
        operands.push(mask.bits());
        if let Some(alignment) = alignment {
            operands.push(alignment);
        }
        if let Some(scope) = scope {
            operands.push(self.get_index_constant(scope as u32));
        }
        operands
    }

    pub(super) fn glsl_atomic_semantics(
        &mut self,
        pointer: Handle<Expression>,
    ) -> Option<(spirv::MemorySemantics, spirv::Scope)> {
        let scalar = match *self.fun_info[pointer].ty.inner_with(&self.ir_module.types) {
            TypeInner::Pointer { base, .. } => match self.ir_module.types[base].inner {
                TypeInner::Scalar(scalar) => scalar,
                _ => return None,
            },
            TypeInner::ValuePointer {
                size: None, scalar, ..
            } => scalar,
            _ => return None,
        };
        if scalar.width == 8 && scalar.kind != crate::ScalarKind::Float {
            self.writer
                .capabilities_used
                .insert(spirv::Capability::Int64Atomics);
        }
        let qualifiers = match self.physical_space(pointer) {
            Some(AddressSpace::PhysicalStorage { qualifiers, .. }) => qualifiers,
            _ => self.root_qualifiers(pointer).0,
        };
        let semantics = if self.writer.vulkan_memory_model
            && qualifiers.contains(PointerQualifiers::VOLATILE)
        {
            spirv::MemorySemantics::VOLATILE
        } else {
            spirv::MemorySemantics::empty()
        };
        Some((semantics, self.writer.device_scope()))
    }

    pub(super) fn loaded_by_swizzle(&self, load: Handle<Expression>) -> bool {
        let Expression::Load { pointer } = self.ir_function.expressions[load] else {
            return false;
        };
        if !matches!(
            self.physical_space(pointer),
            Some(AddressSpace::PhysicalStorage { .. })
        ) {
            return false;
        }
        self.ir_function
            .expressions
            .iter()
            .any(|(_, expression)| matches!(*expression, Expression::Swizzle { vector, .. } if vector == load))
    }

    pub(super) fn write_physical_pointer(
        &mut self,
        value: Handle<Expression>,
        result_type_id: u32,
        block: &mut Block,
    ) -> Result<u32, Error> {
        let value_id = self.cached.get(value)?;
        let op = match *self.fun_info[value].ty.inner_with(&self.ir_module.types) {
            TypeInner::Scalar(_) => Op::ConvertUToPtr,
            TypeInner::Vector { .. } => Op::Bitcast,
            _ => {
                let value_type_id = self.get_expression_type_id(&self.fun_info[value].ty)?;
                if value_type_id == result_type_id {
                    return Ok(value_id);
                }
                Op::Bitcast
            }
        };
        let id = self.gen_id();
        block
            .body
            .push(Instruction::unary(op, result_type_id, id, value_id));
        Ok(id)
    }

    pub(super) fn write_physical_address(
        &mut self,
        pointer: Handle<Expression>,
        split: bool,
        result_type_id: u32,
        block: &mut Block,
    ) -> Result<u32, Error> {
        let pointer_id = self.cached.get(pointer)?;
        let op = if split {
            Op::Bitcast
        } else {
            Op::ConvertPtrToU
        };
        let id = self.gen_id();
        block
            .body
            .push(Instruction::unary(op, result_type_id, id, pointer_id));
        Ok(id)
    }
}
