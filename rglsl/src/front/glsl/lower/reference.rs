use alloc::vec::Vec;

use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::scope::Qualifiers;
use rglsl_sema::types::{BlockId, Scalar as GlslScalar, Type as GlslType};

use super::expression::{Chain, Place};
use super::function::FunctionLowerer;
use super::{internal, Lowerer, Result};
use crate::{
    AddressSpace, BinaryOperator, Expression, Handle, Literal, PointerQualifiers, ScalarKind, Span,
    StorageAccess, Type, TypeInner,
};

pub(super) fn pointer_qualifiers(qualifiers: &Qualifiers) -> PointerQualifiers {
    let mut result = PointerQualifiers::empty();
    if qualifiers.restrict {
        result |= PointerQualifiers::RESTRICT;
    }
    if qualifiers.coherent {
        result |= PointerQualifiers::COHERENT;
    }
    if qualifiers.volatile {
        result |= PointerQualifiers::VOLATILE;
    }
    for (present, flag) in [
        (
            qualifiers.device_coherent,
            PointerQualifiers::DEVICE_COHERENT,
        ),
        (
            qualifiers.queue_family_coherent,
            PointerQualifiers::QUEUE_FAMILY_COHERENT,
        ),
        (
            qualifiers.workgroup_coherent,
            PointerQualifiers::WORKGROUP_COHERENT,
        ),
        (
            qualifiers.subgroup_coherent,
            PointerQualifiers::SUBGROUP_COHERENT,
        ),
        (
            qualifiers.shader_call_coherent,
            PointerQualifiers::SHADER_CALL_COHERENT,
        ),
        (qualifiers.nonprivate, PointerQualifiers::NONPRIVATE),
    ] {
        if present {
            result |= flag;
        }
    }
    result
}

fn block_access(qualifiers: &Qualifiers) -> StorageAccess {
    if qualifiers.readonly {
        StorageAccess::LOAD
    } else if qualifiers.writeonly {
        StorageAccess::STORE
    } else {
        StorageAccess::LOAD | StorageAccess::STORE
    }
}

impl Lowerer<'_> {
    fn reference_space(
        &self,
        block: BlockId,
        span: Span,
    ) -> Result<(AddressSpace, PointerQualifiers)> {
        let declared = self
            .analysis
            .types
            .block(block)
            .ok_or_else(|| internal(span))?;
        let layout = declared.reference.ok_or_else(|| internal(span))?;
        let qualifiers = pointer_qualifiers(&declared.qualifiers) - PointerQualifiers::RESTRICT;
        Ok((
            AddressSpace::PhysicalStorage {
                alignment: layout.alignment,
                access: block_access(&declared.qualifiers),
                qualifiers,
            },
            qualifiers,
        ))
    }

    pub(super) fn reference_type(&mut self, block: BlockId, span: Span) -> Result<Handle<Type>> {
        let (space, qualifiers) = self.reference_space(block, span)?;
        if let Some(&handle) = self.references.get(&(block, qualifiers)) {
            return Ok(handle);
        }
        if self.references_in_progress.contains(&block) {
            let name = self
                .analysis
                .types
                .block(block)
                .map(|declared| declared.name.clone());
            let placeholder = self.module.types.insert(
                Type {
                    name,
                    inner: TypeInner::Struct {
                        members: Vec::new(),
                        span: 0,
                    },
                },
                span,
            );
            let pointer = self.insert_type(TypeInner::Pointer {
                base: placeholder,
                space,
            });
            self.references.insert((block, qualifiers), pointer);
            return Ok(pointer);
        }
        let layout = self
            .analysis
            .types
            .block(block)
            .and_then(|declared| declared.reference)
            .ok_or_else(|| internal(span))?;
        self.references_in_progress.insert(block);
        let structure = self.block_struct_with_end(block, layout.packing, layout.row_major, span);
        self.references_in_progress.remove(&block);
        let (structure, end) = structure?;
        if layout.size.is_some_and(|size| size != end) {
            return Err(internal(span));
        }
        let resolved = Type {
            name: None,
            inner: TypeInner::Pointer {
                base: structure,
                space,
            },
        };
        match self.references.get(&(block, qualifiers)).copied() {
            Some(pointer) => {
                if self.module.types.get(&resolved).is_some() {
                    return Err(internal(span));
                }
                self.module.types.replace(pointer, resolved);
                Ok(pointer)
            }
            None => {
                let pointer = self.module.types.insert(resolved, span);
                self.references.insert((block, qualifiers), pointer);
                Ok(pointer)
            }
        }
    }

    pub(super) fn qualified_reference_type(
        &mut self,
        block: BlockId,
        extra: PointerQualifiers,
        span: Span,
    ) -> Result<Handle<Type>> {
        let plain = self.reference_type(block, span)?;
        let (space, qualifiers) = self.reference_space(block, span)?;
        let qualifiers = qualifiers | extra;
        if let Some(&handle) = self.references.get(&(block, qualifiers)) {
            return Ok(handle);
        }
        let TypeInner::Pointer { base, .. } = self.module.types[plain].inner else {
            return Err(internal(span));
        };
        let AddressSpace::PhysicalStorage {
            alignment, access, ..
        } = space
        else {
            return Err(internal(span));
        };
        let handle = self.insert_type(TypeInner::Pointer {
            base,
            space: AddressSpace::PhysicalStorage {
                alignment,
                access,
                qualifiers,
            },
        });
        self.references.insert((block, qualifiers), handle);
        self.qualified_references.insert(handle, plain);
        Ok(handle)
    }

    pub(super) fn variable_ir_type(
        &mut self,
        ty: &GlslType,
        qualifiers: &Qualifiers,
        span: Span,
    ) -> Result<Handle<Type>> {
        let extra = pointer_qualifiers(qualifiers);
        match ty.as_reference() {
            Some(block) if !extra.is_empty() => self.qualified_reference_type(block, extra, span),
            _ => self.ir_type(ty, span),
        }
    }

    pub(super) fn reference_element_size(&self, block: BlockId, span: Span) -> Result<u64> {
        self.analysis
            .types
            .block(block)
            .and_then(|declared| declared.reference)
            .and_then(|layout| layout.element_size())
            .map(u64::from)
            .ok_or_else(|| internal(span))
    }
}

impl FunctionLowerer<'_, '_> {
    fn reference_value(
        &mut self,
        expression: &AstExpression,
        at: Span,
    ) -> Result<Handle<Expression>> {
        match self.chain(expression)? {
            Chain::Place(place) => self.load(&place, at),
            Chain::Value(value) => Ok(value),
        }
    }

    pub(super) fn reference_member(
        &mut self,
        base: &AstExpression,
        block: BlockId,
        index: u32,
        at: Span,
    ) -> Result<Chain> {
        let value = self.reference_value(base, at)?;
        let mut pointer = self.add(Expression::AccessIndex { base: value, index }, at)?;
        let boolean = self.lw.block_bools.contains(&(block, index));
        let reference = self.lw.reference_type(block, at)?;
        if let TypeInner::Pointer { base: pointee, .. } = self.lw.module.types[reference].inner {
            self.physical_bases.insert(value, pointee);
            if let Some(requalified) = self.member_requalification(block, pointee, index, at)? {
                pointer = self.add(
                    Expression::PhysicalPointer {
                        value: pointer,
                        ty: requalified,
                    },
                    at,
                )?;
            }
        }
        Ok(Chain::Place(Place {
            pointer,
            swizzle: None,
            boolean,
            non_uniform: false,
            spilled: false,
        }))
    }

    fn member_requalification(
        &mut self,
        block: BlockId,
        pointee: Handle<Type>,
        index: u32,
        at: Span,
    ) -> Result<Option<Handle<Type>>> {
        let declared = self
            .lw
            .analysis
            .types
            .block(block)
            .ok_or_else(|| internal(at))?;
        let member = declared
            .members
            .get(usize::try_from(index).map_err(|_| internal(at))?)
            .ok_or_else(|| internal(at))?;
        let block_qualifiers = pointer_qualifiers(&declared.qualifiers);
        let member_qualifiers =
            pointer_qualifiers(&member.qualifiers) - PointerQualifiers::RESTRICT;
        if member_qualifiers.difference(block_qualifiers).is_empty() {
            return Ok(None);
        }
        let TypeInner::Struct { ref members, .. } = self.lw.module.types[pointee].inner else {
            return Err(internal(at));
        };
        let member_ty = members
            .get(usize::try_from(index).map_err(|_| internal(at))?)
            .map(|member| member.ty)
            .ok_or_else(|| internal(at))?;
        let reference = self.lw.reference_type(block, at)?;
        let TypeInner::Pointer {
            space:
                AddressSpace::PhysicalStorage {
                    alignment,
                    access,
                    qualifiers,
                },
            ..
        } = self.lw.module.types[reference].inner
        else {
            return Err(internal(at));
        };
        Ok(Some(self.lw.insert_type(TypeInner::Pointer {
            base: member_ty,
            space: AddressSpace::PhysicalStorage {
                alignment,
                access,
                qualifiers: qualifiers | member_qualifiers,
            },
        })))
    }

    fn index_offset(
        &mut self,
        index: Handle<Expression>,
        index_ty: &GlslType,
        size: u64,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let source = index_ty.base_scalar().ok_or_else(|| internal(at))?;
        let constant = match self.expressions[index] {
            Expression::Literal(Literal::I32(value)) => Some(i64::from(value)),
            Expression::Literal(Literal::U32(value)) => Some(i64::from(value)),
            Expression::Literal(Literal::I64(value)) => Some(value),
            Expression::Literal(Literal::U64(value)) => Some(value as i64),
            Expression::Literal(Literal::I16(value)) => Some(i64::from(value)),
            Expression::Literal(Literal::U16(value)) => Some(i64::from(value)),
            Expression::Literal(Literal::I8(value)) => Some(i64::from(value)),
            Expression::Literal(Literal::U8(value)) => Some(i64::from(value)),
            _ => None,
        };
        if let Some(value) = constant {
            let offset = value.wrapping_mul(size as i64) as u64;
            return self.literal(Literal::U64(offset), at);
        }
        let wide = if source.is_signed() {
            let signed = if source == GlslScalar::Int64 {
                index
            } else {
                self.add(
                    Expression::As {
                        expr: index,
                        kind: ScalarKind::Sint,
                        convert: Some(8),
                    },
                    at,
                )?
            };
            self.add(
                Expression::As {
                    expr: signed,
                    kind: ScalarKind::Uint,
                    convert: None,
                },
                at,
            )?
        } else if source == GlslScalar::Uint64 {
            index
        } else {
            self.add(
                Expression::As {
                    expr: index,
                    kind: ScalarKind::Uint,
                    convert: Some(8),
                },
                at,
            )?
        };
        let size = self.literal(Literal::U64(size), at)?;
        self.add(
            Expression::Binary {
                op: BinaryOperator::Multiply,
                left: wide,
                right: size,
            },
            at,
        )
    }

    pub(super) fn reference_offset(
        &mut self,
        reference: (Handle<Expression>, &GlslType),
        index: (Handle<Expression>, &GlslType),
        subtract: bool,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let block = reference.1.as_reference().ok_or_else(|| internal(at))?;
        let size = self.lw.reference_element_size(block, at)?;
        let ty = self.lw.reference_type(block, at)?;
        let address = self.add(
            Expression::PhysicalAddress {
                pointer: reference.0,
                split: false,
            },
            at,
        )?;
        let offset = self.index_offset(index.0, index.1, size, at)?;
        let op = if subtract {
            BinaryOperator::Subtract
        } else {
            BinaryOperator::Add
        };
        let sum = self.add(
            Expression::Binary {
                op,
                left: address,
                right: offset,
            },
            at,
        )?;
        self.add(Expression::PhysicalPointer { value: sum, ty }, at)
    }

    pub(super) fn reference_difference(
        &mut self,
        left: (Handle<Expression>, &GlslType),
        right: Handle<Expression>,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let block = left.1.as_reference().ok_or_else(|| internal(at))?;
        let size = self.lw.reference_element_size(block, at)?;
        let mut signed = Vec::with_capacity(2);
        for pointer in [left.0, right] {
            let address = self.add(
                Expression::PhysicalAddress {
                    pointer,
                    split: false,
                },
                at,
            )?;
            signed.push(self.add(
                Expression::As {
                    expr: address,
                    kind: ScalarKind::Sint,
                    convert: None,
                },
                at,
            )?);
        }
        let (Some(&first), Some(&second)) = (signed.first(), signed.get(1)) else {
            return Err(internal(at));
        };
        let difference = self.add(
            Expression::Binary {
                op: BinaryOperator::Subtract,
                left: first,
                right: second,
            },
            at,
        )?;
        let size = i64::try_from(size).map_err(|_| internal(at))?;
        let size = self.literal(Literal::I64(size), at)?;
        self.add(
            Expression::Binary {
                op: BinaryOperator::Divide,
                left: difference,
                right: size,
            },
            at,
        )
    }

    pub(super) fn reference_construct(
        &mut self,
        ty: &GlslType,
        argument: &AstExpression,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let (value, from) = self.typed(argument)?;
        if let Some(block) = ty.as_reference() {
            let target = self.lw.reference_type(block, at)?;
            return self.add(Expression::PhysicalPointer { value, ty: target }, at);
        }
        if !from.is_reference() {
            return Err(internal(at));
        }
        let split = !ty.is_scalar();
        self.add(
            Expression::PhysicalAddress {
                pointer: value,
                split,
            },
            at,
        )
    }

    fn physical_root(&self, pointer: Handle<Expression>) -> bool {
        match self.expressions[pointer] {
            Expression::Access { base, .. } | Expression::AccessIndex { base, .. } => {
                self.physical_bases.contains_key(&base) || self.physical_root(base)
            }
            Expression::PhysicalPointer { value, .. } => self.physical_root(value),
            _ => false,
        }
    }

    pub(super) fn full_physical_swizzle(
        &self,
        pointer: Handle<Expression>,
        components: &[u32],
    ) -> Option<[crate::SwizzleComponent; 4]> {
        if !self.physical_root(pointer) {
            return None;
        }
        let pointee = self.buffer_pointee(pointer)?;
        let TypeInner::Vector { size, .. } = self.lw.module.types[pointee].inner else {
            return None;
        };
        if components.len() != size as usize {
            return None;
        }
        let mut pattern = [crate::SwizzleComponent::X; 4];
        for (position, &component) in components.iter().enumerate() {
            let slot = pattern.get_mut(usize::try_from(component).ok()?)?;
            *slot = match position {
                0 => crate::SwizzleComponent::X,
                1 => crate::SwizzleComponent::Y,
                2 => crate::SwizzleComponent::Z,
                _ => crate::SwizzleComponent::W,
            };
        }
        Some(pattern)
    }

    pub(super) fn requalify_to(
        &mut self,
        value: Handle<Expression>,
        ty: Handle<Type>,
        at: Span,
    ) -> Result<Handle<Expression>> {
        if !self.lw.qualified_references.contains_key(&ty) {
            return Ok(value);
        }
        self.add(Expression::PhysicalPointer { value, ty }, at)
    }

    fn variable_type(&self, pointer: Handle<Expression>) -> Option<Handle<Type>> {
        match self.expressions[pointer] {
            Expression::LocalVariable(local) => Some(self.locals[local].ty),
            Expression::GlobalVariable(global) => Some(self.lw.module.global_variables[global].ty),
            _ => None,
        }
    }

    pub(super) fn store_qualified(
        &mut self,
        pointer: Handle<Expression>,
        value: Handle<Expression>,
        at: Span,
    ) -> Result<Handle<Expression>> {
        match self.variable_type(pointer) {
            Some(ty) => self.requalify_to(value, ty, at),
            None => Ok(value),
        }
    }

    pub(super) fn unqualify(
        &mut self,
        value: Handle<Expression>,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let ty = match self.expressions[value] {
            Expression::Load { pointer } => self.variable_type(pointer),
            Expression::FunctionArgument(index) => usize::try_from(index)
                .ok()
                .and_then(|index| self.argument_types.get(index).copied()),
            _ => None,
        };
        match ty.and_then(|ty| self.lw.qualified_references.get(&ty).copied()) {
            Some(plain) => self.add(Expression::PhysicalPointer { value, ty: plain }, at),
            None => Ok(value),
        }
    }
}
