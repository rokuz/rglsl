use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::builtins::kind::{AtomicOperation, Barrier, MemoryBarrier, SplitPhase};
use rglsl_sema::types::{Opaque, TypeKind};
use rglsl_types::stack::recurse;

use super::function::FunctionLowerer;
use super::types::{scalar, vector_size};
use super::{Result, internal, unsupported};
use crate::{
    AtomicFunction, AtomicLocation, Expression, Handle, MemoryDecorations, MemoryOrder,
    MemoryScope, MemorySemantics, NonUniform, PredeclaredType, Span, Statement, Texel, TypeInner,
};

const fn read_modify_write(operation: AtomicOperation) -> Option<AtomicFunction> {
    Some(match operation {
        AtomicOperation::Add => AtomicFunction::Add,
        AtomicOperation::Min => AtomicFunction::Min,
        AtomicOperation::Max => AtomicFunction::Max,
        AtomicOperation::And => AtomicFunction::And,
        AtomicOperation::Or => AtomicFunction::InclusiveOr,
        AtomicOperation::Xor => AtomicFunction::ExclusiveOr,
        AtomicOperation::Exchange => AtomicFunction::Exchange { compare: None },
        AtomicOperation::CompareSwap | AtomicOperation::Load | AtomicOperation::Store => {
            return None;
        }
    })
}

const fn atomic_operands(operation: AtomicOperation) -> usize {
    match operation {
        AtomicOperation::Load => 0,
        AtomicOperation::CompareSwap => 2,
        AtomicOperation::Add
        | AtomicOperation::Min
        | AtomicOperation::Max
        | AtomicOperation::And
        | AtomicOperation::Or
        | AtomicOperation::Xor
        | AtomicOperation::Exchange
        | AtomicOperation::Store => 1,
    }
}

const fn memory_scope(value: i64) -> Option<MemoryScope> {
    Some(match value {
        0 => MemoryScope::CrossDevice,
        1 => MemoryScope::Device,
        2 => MemoryScope::Workgroup,
        3 => MemoryScope::Subgroup,
        4 => MemoryScope::Invocation,
        5 => MemoryScope::QueueFamily,
        6 => MemoryScope::ShaderCall,
        _ => return None,
    })
}

const ALL_MEMORY: MemorySemantics = MemorySemantics::UNIFORM_MEMORY
    .union(MemorySemantics::WORKGROUP_MEMORY)
    .union(MemorySemantics::ATOMIC_COUNTER_MEMORY)
    .union(MemorySemantics::IMAGE_MEMORY);

impl FunctionLowerer<'_, '_> {
    fn constant_argument(&self, argument: &AstExpression, at: Span) -> Result<i64> {
        self.info(argument)?
            .value
            .as_ref()
            .and_then(rglsl_sema::constant::Constant::scalar_i64)
            .ok_or_else(|| internal(at))
    }

    fn scope_argument(&self, argument: &AstExpression, at: Span) -> Result<MemoryScope> {
        let value = self.constant_argument(argument, at)?;
        memory_scope(value).ok_or_else(|| unsupported(alloc::format!("memory scope {value}"), at))
    }

    fn semantics_arguments(
        &self,
        storage: &AstExpression,
        semantics: &AstExpression,
        at: Span,
    ) -> Result<MemorySemantics> {
        let bits = self.constant_argument(storage, at)? | self.constant_argument(semantics, at)?;
        u32::try_from(bits)
            .ok()
            .and_then(MemorySemantics::from_bits)
            .ok_or_else(|| internal(at))
    }

    fn memory_order(&self, arguments: &[AstExpression], at: Span) -> Result<MemoryOrder> {
        match *arguments {
            [ref scope, ref storage, ref semantics] => {
                let semantics = self.semantics_arguments(storage, semantics, at)?;
                Ok(MemoryOrder {
                    scope: self.scope_argument(scope, at)?,
                    semantics,
                    unequal: semantics,
                })
            }
            [
                ref scope,
                ref storage,
                ref semantics,
                ref storage_unequal,
                ref semantics_unequal,
            ] => Ok(MemoryOrder {
                scope: self.scope_argument(scope, at)?,
                semantics: self.semantics_arguments(storage, semantics, at)?,
                unequal: self.semantics_arguments(storage_unequal, semantics_unequal, at)?,
            }),
            _ => Err(internal(at)),
        }
    }

    const fn default_scope(&self) -> MemoryScope {
        if self.lw.analysis.vulkan_memory_model {
            MemoryScope::QueueFamily
        } else {
            MemoryScope::Device
        }
    }

    fn image_is_volatile(&self, image: Handle<Expression>) -> bool {
        let global = match self.expressions[image] {
            Expression::GlobalVariable(handle) => Some(handle),
            Expression::Access { base, .. } | Expression::AccessIndex { base, .. } => {
                match self.expressions[base] {
                    Expression::GlobalVariable(handle) => Some(handle),
                    _ => None,
                }
            }
            _ => None,
        };
        global.is_some_and(|handle| {
            self.lw.module.global_variables[handle]
                .memory_decorations
                .contains(MemoryDecorations::VOLATILE)
        })
    }

    pub(super) fn push_with_result(
        &mut self,
        result: Expression,
        statement: impl FnOnce(Handle<Expression>) -> Statement,
        at: Span,
    ) -> Handle<Expression> {
        let emitted = self.emitter.finish(&self.expressions);
        self.block.extend(emitted);
        let handle = self.unemitted(result, at);
        self.block.push(statement(handle), at);
        self.emitter.start(&self.expressions);
        handle
    }

    pub(super) fn barrier(
        &mut self,
        barrier: Barrier,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<()> {
        let all = MemorySemantics::ACQUIRE_RELEASE;
        let statement = match (barrier, arguments) {
            (Barrier::Execution, &[]) if self.lw.stage_is(crate::ShaderStage::TessControl) => {
                if self.lw.analysis.vulkan_memory_model {
                    Statement::ScopedBarrier {
                        execution: Some(MemoryScope::Workgroup),
                        memory: MemoryScope::Workgroup,
                        semantics: MemorySemantics::OUTPUT_MEMORY | all,
                    }
                } else {
                    Statement::ScopedBarrier {
                        execution: Some(MemoryScope::Workgroup),
                        memory: MemoryScope::Invocation,
                        semantics: MemorySemantics::empty(),
                    }
                }
            }
            (Barrier::Execution, &[]) => Statement::ControlBarrier(crate::Barrier::WORK_GROUP),
            (Barrier::Memory(memory), &[]) => {
                let (scope, semantics) = match memory {
                    MemoryBarrier::All => (self.default_scope(), ALL_MEMORY),
                    MemoryBarrier::Buffer => {
                        (self.default_scope(), MemorySemantics::UNIFORM_MEMORY)
                    }
                    MemoryBarrier::Shared => {
                        (self.default_scope(), MemorySemantics::WORKGROUP_MEMORY)
                    }
                    MemoryBarrier::Image => (self.default_scope(), MemorySemantics::IMAGE_MEMORY),
                    MemoryBarrier::Workgroup => (MemoryScope::Workgroup, ALL_MEMORY),
                };
                Statement::ScopedBarrier {
                    execution: None,
                    memory: scope,
                    semantics: semantics | all,
                }
            }
            (Barrier::ScopedMemory, &[ref memory, ref storage, ref semantics]) => {
                Statement::ScopedBarrier {
                    execution: None,
                    memory: self.scope_argument(memory, at)?,
                    semantics: self.semantics_arguments(storage, semantics, at)?,
                }
            }
            (Barrier::Split { phase, scoped }, arguments) => {
                let phase = match phase {
                    SplitPhase::Arrive => crate::BarrierPhase::Arrive,
                    SplitPhase::Wait => crate::BarrierPhase::Wait,
                };
                let (execution, memory, semantics) = match (scoped, arguments) {
                    (false, &[]) => (
                        MemoryScope::Workgroup,
                        MemoryScope::Workgroup,
                        MemorySemantics::WORKGROUP_MEMORY
                            | match phase {
                                crate::BarrierPhase::Arrive => MemorySemantics::RELEASE,
                                crate::BarrierPhase::Wait => MemorySemantics::ACQUIRE,
                            },
                    ),
                    (true, &[ref execution, ref memory, ref storage, ref semantics]) => (
                        self.scope_argument(execution, at)?,
                        self.scope_argument(memory, at)?,
                        self.semantics_arguments(storage, semantics, at)?,
                    ),
                    (false | true, _) => return Err(internal(at)),
                };
                Statement::SplitBarrier {
                    phase,
                    execution,
                    memory,
                    semantics,
                }
            }
            (Barrier::ScopedControl, &[ref execution, ref memory, ref storage, ref semantics]) => {
                Statement::ScopedBarrier {
                    execution: Some(self.scope_argument(execution, at)?),
                    memory: self.scope_argument(memory, at)?,
                    semantics: self.semantics_arguments(storage, semantics, at)?,
                }
            }
            (
                Barrier::Execution
                | Barrier::Memory(_)
                | Barrier::ScopedMemory
                | Barrier::ScopedControl,
                _,
            ) => return Err(internal(at)),
        };
        self.push(statement, at);
        Ok(())
    }

    pub(super) fn atomic(
        &mut self,
        operation: AtomicOperation,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let (memory, rest) = arguments.split_first().ok_or_else(|| internal(at))?;
        let memory_ty = self.info(memory)?.ty.clone();
        let element = memory_ty.scalar_type().ok_or_else(|| internal(at))?;
        let element = scalar(element);
        let value_inner = match memory_ty.kind {
            TypeKind::Vector { size, .. } if !memory_ty.is_array() => TypeInner::Vector {
                size: vector_size(size).ok_or_else(|| internal(at))?,
                scalar: element,
            },
            _ => TypeInner::Scalar(element),
        };
        let place = recurse(|| self.place(memory))?;
        let count = atomic_operands(operation).min(rest.len());
        let (values, scope) = rest.split_at(count);
        let mut operands = alloc::vec::Vec::with_capacity(values.len());
        for argument in values {
            let (value, ty) = recurse(|| self.typed(argument))?;
            operands.push(self.convert(value, &ty, &memory_ty, at)?);
        }
        let order = if scope.is_empty() {
            None
        } else {
            Some(self.memory_order(scope, at)?)
        };
        let pointer = place.pointer;
        let (fun, value, comparison) = match (operation, order, operands.as_slice()) {
            (AtomicOperation::Load, Some(order), &[]) => {
                let ty = self.lw.insert_type(TypeInner::Scalar(element));
                let result = self.push_with_result(
                    Expression::AtomicResult {
                        ty,
                        comparison: false,
                    },
                    |result| Statement::AtomicLoad {
                        location: AtomicLocation::Pointer(pointer),
                        order,
                        result,
                    },
                    at,
                );
                return Ok(Some(result));
            }
            (AtomicOperation::Store, Some(order), &[value]) => {
                self.push(
                    Statement::AtomicStore {
                        location: AtomicLocation::Pointer(pointer),
                        value,
                        order,
                    },
                    at,
                );
                return Ok(None);
            }
            (AtomicOperation::CompareSwap, _, &[compare, value]) => (
                AtomicFunction::Exchange {
                    compare: Some(compare),
                },
                value,
                true,
            ),
            (
                operation @ (AtomicOperation::Add
                | AtomicOperation::Min
                | AtomicOperation::Max
                | AtomicOperation::And
                | AtomicOperation::Or
                | AtomicOperation::Xor
                | AtomicOperation::Exchange),
                _,
                &[value],
            ) => (
                read_modify_write(operation).ok_or_else(|| internal(at))?,
                value,
                false,
            ),
            (
                AtomicOperation::Add
                | AtomicOperation::Min
                | AtomicOperation::Max
                | AtomicOperation::And
                | AtomicOperation::Or
                | AtomicOperation::Xor
                | AtomicOperation::Exchange
                | AtomicOperation::CompareSwap
                | AtomicOperation::Load
                | AtomicOperation::Store,
                _,
                _,
            ) => return Err(internal(at)),
        };
        let ty = if comparison {
            self.lw.module.generate_predeclared_type(
                PredeclaredType::AtomicCompareExchangeWeakResult(element),
            )
        } else {
            self.lw.insert_type(value_inner)
        };
        let result = self.push_with_result(
            Expression::AtomicResult { ty, comparison },
            |result| Statement::Atomic {
                pointer,
                fun,
                value,
                result: Some(result),
                order,
            },
            at,
        );
        if comparison {
            self.add(
                Expression::AccessIndex {
                    base: result,
                    index: 0,
                },
                at,
            )
            .map(Some)
        } else {
            Ok(Some(result))
        }
    }

    pub(super) fn image_atomic(
        &mut self,
        operation: AtomicOperation,
        image: Handle<Expression>,
        opaque: Opaque,
        non_uniform: bool,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        if non_uniform {
            self.mark(image, NonUniform::VALUE);
        }
        let coordinate_argument = arguments.get(1).ok_or_else(|| internal(at))?;
        let (coordinate, ty) = recurse(|| self.typed(coordinate_argument))?;
        let size = ty.component_count().ok_or_else(|| internal(at))?;
        let (coordinate, array_index) =
            self.split_storage_coordinate(coordinate, size, opaque, at)?;
        let mut rest = arguments.get(2..).ok_or_else(|| internal(at))?;
        let sample = if opaque.multisample {
            let (sample, tail) = rest.split_first().ok_or_else(|| internal(at))?;
            rest = tail;
            Some(recurse(|| self.rvalue(sample))?)
        } else {
            None
        };
        let count = atomic_operands(operation).min(rest.len());
        let (values, scope) = rest.split_at(count);
        let mut operands = alloc::vec::Vec::with_capacity(values.len());
        let mut value_ty = None;
        for argument in values {
            let (value, ty) = recurse(|| self.typed(argument))?;
            if value_ty.is_none() {
                value_ty = Some(ty);
            }
            operands.push(value);
        }
        let order = if scope.is_empty() {
            let semantics = if self.lw.analysis.vulkan_memory_model && self.image_is_volatile(image)
            {
                MemorySemantics::VOLATILE
            } else {
                MemorySemantics::empty()
            };
            MemoryOrder {
                scope: self.default_scope(),
                semantics,
                unequal: semantics,
            }
        } else {
            self.memory_order(scope, at)?
        };
        let texel = Texel {
            image,
            coordinate,
            array_index,
            sample,
        };
        let value_inner = match value_ty {
            Some(value_ty) => match value_ty.kind {
                TypeKind::Vector { size, .. } if !value_ty.is_array() => TypeInner::Vector {
                    size: vector_size(size).ok_or_else(|| internal(at))?,
                    scalar: scalar(value_ty.scalar_type().ok_or_else(|| internal(at))?),
                },
                _ => TypeInner::Scalar(scalar(value_ty.scalar_type().ok_or_else(|| internal(at))?)),
            },
            None => {
                let element = rglsl_sema::types::Type::scalar(opaque.sampled.scalar());
                let element = element.scalar_type().ok_or_else(|| internal(at))?;
                TypeInner::Scalar(scalar(element))
            }
        };
        let ty = self.lw.insert_type(value_inner);
        let result = Expression::AtomicResult {
            ty,
            comparison: false,
        };
        match (operation, operands.as_slice()) {
            (AtomicOperation::Load, &[]) => Ok(Some(self.push_with_result(
                result,
                |result| Statement::AtomicLoad {
                    location: AtomicLocation::Texel(texel),
                    order,
                    result,
                },
                at,
            ))),
            (AtomicOperation::Store, &[value]) => {
                self.push(
                    Statement::AtomicStore {
                        location: AtomicLocation::Texel(texel),
                        value,
                        order,
                    },
                    at,
                );
                Ok(None)
            }
            _ => {
                let (fun, value) = match (operation, operands.as_slice()) {
                    (AtomicOperation::CompareSwap, &[compare, value]) => (
                        AtomicFunction::Exchange {
                            compare: Some(compare),
                        },
                        value,
                    ),
                    (operation, &[value]) => (
                        read_modify_write(operation).ok_or_else(|| internal(at))?,
                        value,
                    ),
                    _ => return Err(internal(at)),
                };
                Ok(Some(self.push_with_result(
                    result,
                    |result| Statement::ImageAtomic {
                        image,
                        coordinate,
                        array_index,
                        fun,
                        value,
                        sample,
                        result: Some(result),
                        order: Some(order),
                    },
                    at,
                )))
            }
        }
    }
}
