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
    pub(super) fn variable_ir_type(
        &mut self,
        ty: &GlslType,
        qualifiers: &Qualifiers,
        span: Span,
    ) -> Result<Handle<Type>> {
        super::function::lowerer_on_heap!(self, |cx| cx.variable_ir_type(
            ty.clone(),
            qualifiers.clone(),
            span
        ))
    }

    pub(super) fn reference_type(&mut self, block: BlockId, span: Span) -> Result<Handle<Type>> {
        super::function::lowerer_on_heap!(self, |cx| cx.reference_type(block, span))
    }

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

#[allow(clippy::await_holding_refcell_ref)]
impl<'b, 'a> super::function::LowererCx<'b, 'a> {
    pub(super) async fn reference_type(self, block: BlockId, span: Span) -> Result<Handle<Type>> {
        let mut this = self.lowerer();
        let (space, qualifiers) = this.reference_space(block, span)?;
        if let Some(&handle) = this.references.get(&(block, qualifiers)) {
            return Ok(handle);
        }
        if this.references_in_progress.contains(&block) {
            let name = this
                .analysis
                .types
                .block(block)
                .map(|declared| declared.name.clone());
            let placeholder = this.module.types.insert(
                Type {
                    name,
                    inner: TypeInner::Struct {
                        members: Vec::new(),
                        span: 0,
                    },
                },
                span,
            );
            let pointer = this.insert_type(TypeInner::Pointer {
                base: placeholder,
                space,
            });
            this.references.insert((block, qualifiers), pointer);
            return Ok(pointer);
        }
        let layout = this
            .analysis
            .types
            .block(block)
            .and_then(|declared| declared.reference)
            .ok_or_else(|| internal(span))?;
        this.references_in_progress.insert(block);
        let structure = {
            let frame = self
                .clone()
                .block_struct(block, layout.packing, layout.row_major, span);
            drop(this);
            let result = self.nest(frame).await;
            this = self.lowerer();
            result
        };
        this.references_in_progress.remove(&block);
        let structure = structure?;
        let resolved = Type {
            name: None,
            inner: TypeInner::Pointer {
                base: structure,
                space,
            },
        };
        match this.references.get(&(block, qualifiers)).copied() {
            Some(pointer) => {
                if this.module.types.get(&resolved).is_some() {
                    return Err(internal(span));
                }
                this.module
                    .types
                    .replace(pointer, resolved)
                    .map_err(|_| internal(span))?;
                Ok(pointer)
            }
            None => {
                let pointer = this.module.types.insert(resolved, span);
                this.references.insert((block, qualifiers), pointer);
                Ok(pointer)
            }
        }
    }

    pub(super) async fn qualified_reference_type(
        self,
        block: BlockId,
        extra: PointerQualifiers,
        span: Span,
    ) -> Result<Handle<Type>> {
        let mut this = self.lowerer();
        let plain = {
            let frame = self.clone().reference_type(block, span);
            drop(this);
            let result = self.nest(frame).await;
            this = self.lowerer();
            result
        }?;
        let (space, qualifiers) = this.reference_space(block, span)?;
        let qualifiers = qualifiers | extra;
        if let Some(&handle) = this.references.get(&(block, qualifiers)) {
            return Ok(handle);
        }
        let TypeInner::Pointer { base, .. } = this.module.types[plain].inner else {
            return Err(internal(span));
        };
        let AddressSpace::PhysicalStorage {
            alignment, access, ..
        } = space
        else {
            return Err(internal(span));
        };
        let handle = this.insert_type(TypeInner::Pointer {
            base,
            space: AddressSpace::PhysicalStorage {
                alignment,
                access,
                qualifiers,
            },
        });
        this.references.insert((block, qualifiers), handle);
        this.qualified_references.insert(handle, plain);
        Ok(handle)
    }

    pub(super) async fn variable_ir_type(
        self,
        ty: GlslType,
        qualifiers: Qualifiers,
        span: Span,
    ) -> Result<Handle<Type>> {
        let ty = &ty;
        let qualifiers = &qualifiers;
        let this = self.lowerer();
        let extra = pointer_qualifiers(qualifiers);
        match ty.as_reference() {
            Some(block) if !extra.is_empty() => {
                let frame = self.clone().qualified_reference_type(block, extra, span);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            _ => {
                let frame = self.clone().ir_type(ty.clone(), span);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
        }
    }
}

impl FunctionLowerer<'_, '_> {
    fn physical_root(&self, pointer: Handle<Expression>) -> bool {
        let mut current = pointer;
        loop {
            match self.expressions[current] {
                Expression::Access { base, .. } | Expression::AccessIndex { base, .. } => {
                    if self.physical_bases.contains_key(&base) {
                        return true;
                    }
                    current = base;
                }
                Expression::PhysicalPointer { value, .. } => current = value,
                _ => return false,
            }
        }
    }

    pub(super) fn reference_member(
        &mut self,
        chain: Chain,
        block: BlockId,
        index: u32,
        at: Span,
    ) -> Result<Chain> {
        let value = match chain {
            Chain::Place(place) => self.load(&place, at)?,
            Chain::Value(value) => value,
        };
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

#[allow(clippy::await_holding_refcell_ref)]
impl<'b, 'l, 'a> super::function::Cx<'b, 'l, 'a> {
    pub(super) async fn reference_construct(
        self,
        ty: &'b GlslType,
        argument: &'b AstExpression,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let mut this = self.lowerer();
        let (value, from) = {
            let frame = self.clone().typed(argument);
            drop(this);
            let result = self.nest(frame).await;
            this = self.lowerer();
            result
        }?;
        if let Some(block) = ty.as_reference() {
            let target = this.lw.reference_type(block, at)?;
            return this.add(Expression::PhysicalPointer { value, ty: target }, at);
        }
        if !from.is_reference() {
            return Err(internal(at));
        }
        let split = !ty.is_scalar();
        this.add(
            Expression::PhysicalAddress {
                pointer: value,
                split,
            },
            at,
        )
    }
}
