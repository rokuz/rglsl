use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::types::Opaque;

use super::function::FunctionLowerer;
use super::types::scalar;
use super::{internal, unsupported, Result};
use crate::{
    AtomicFunction, AtomicLocation, Expression, Handle, MemoryDecorations, MemoryOrder,
    MemoryScope, MemorySemantics, NonUniform, PredeclaredType, Span, Statement, Texel, TypeInner,
};

pub(super) const fn atomic_function(name: &str) -> Option<AtomicFunction> {
    Some(match name.as_bytes() {
        b"atomicAdd" | b"imageAtomicAdd" => AtomicFunction::Add,
        b"atomicMin" | b"imageAtomicMin" => AtomicFunction::Min,
        b"atomicMax" | b"imageAtomicMax" => AtomicFunction::Max,
        b"atomicAnd" | b"imageAtomicAnd" => AtomicFunction::And,
        b"atomicOr" | b"imageAtomicOr" => AtomicFunction::InclusiveOr,
        b"atomicXor" | b"imageAtomicXor" => AtomicFunction::ExclusiveOr,
        b"atomicExchange" | b"imageAtomicExchange" => AtomicFunction::Exchange { compare: None },
        _ => return None,
    })
}

const fn operand_count(name: &str) -> usize {
    match name.as_bytes() {
        b"atomicLoad" | b"imageAtomicLoad" => 0,
        b"atomicCompSwap" | b"imageAtomicCompSwap" => 2,
        _ => 1,
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
            [ref scope, ref storage, ref semantics, ref storage_unequal, ref semantics_unequal] => {
                Ok(MemoryOrder {
                    scope: self.scope_argument(scope, at)?,
                    semantics: self.semantics_arguments(storage, semantics, at)?,
                    unequal: self.semantics_arguments(storage_unequal, semantics_unequal, at)?,
                })
            }
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

    pub(super) fn atomic(
        &mut self,
        name: &str,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let (memory, rest) = arguments.split_first().ok_or_else(|| internal(at))?;
        let memory_ty = self.info(memory)?.ty.clone();
        let element = memory_ty.scalar_type().ok_or_else(|| internal(at))?;
        let element = scalar(element);
        let place = self.place(memory)?;
        let count = operand_count(name).min(rest.len());
        let (values, scope) = rest.split_at(count);
        let mut operands = alloc::vec::Vec::with_capacity(values.len());
        for argument in values {
            let (value, ty) = self.typed(argument)?;
            operands.push(self.convert(value, &ty, &memory_ty, at)?);
        }
        let order = if scope.is_empty() {
            None
        } else {
            Some(self.memory_order(scope, at)?)
        };
        let pointer = place.pointer;
        match (name, order, operands.as_slice()) {
            ("atomicLoad", Some(order), &[]) => {
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
            ("atomicStore", Some(order), &[value]) => {
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
            _ => {}
        }
        let (fun, value, comparison) = match (atomic_function(name), operands.as_slice()) {
            (Some(fun), &[value]) => (fun, value, false),
            (None, &[compare, value]) if name == "atomicCompSwap" => (
                AtomicFunction::Exchange {
                    compare: Some(compare),
                },
                value,
                true,
            ),
            _ => return Err(internal(at)),
        };
        let ty = if comparison {
            self.lw.module.generate_predeclared_type(
                PredeclaredType::AtomicCompareExchangeWeakResult(element),
            )
        } else {
            self.lw.insert_type(TypeInner::Scalar(element))
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
        name: &str,
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
        let (coordinate, ty) = self.typed(coordinate_argument)?;
        let size = ty.component_count().ok_or_else(|| internal(at))?;
        let (coordinate, array_index) =
            self.split_storage_coordinate(coordinate, size, opaque, at)?;
        let mut rest = arguments.get(2..).ok_or_else(|| internal(at))?;
        let sample = if opaque.multisample {
            let (sample, tail) = rest.split_first().ok_or_else(|| internal(at))?;
            rest = tail;
            Some(self.rvalue(sample)?)
        } else {
            None
        };
        let count = operand_count(name).min(rest.len());
        let (values, scope) = rest.split_at(count);
        let mut operands = alloc::vec::Vec::with_capacity(values.len());
        for argument in values {
            operands.push(self.rvalue(argument)?);
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
        let element = rglsl_sema::types::Type::scalar(opaque.sampled.scalar());
        let element = element.scalar_type().ok_or_else(|| internal(at))?;
        let ty = self.lw.insert_type(TypeInner::Scalar(scalar(element)));
        let result = Expression::AtomicResult {
            ty,
            comparison: false,
        };
        match (name, operands.as_slice()) {
            ("imageAtomicLoad", &[]) => Ok(Some(self.push_with_result(
                result,
                |result| Statement::AtomicLoad {
                    location: AtomicLocation::Texel(texel),
                    order,
                    result,
                },
                at,
            ))),
            ("imageAtomicStore", &[value]) => {
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
                let (fun, value) = match (atomic_function(name), operands.as_slice()) {
                    (Some(fun), &[value]) => (fun, value),
                    (None, &[compare, value]) if name == "imageAtomicCompSwap" => (
                        AtomicFunction::Exchange {
                            compare: Some(compare),
                        },
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

    pub(super) fn barrier(
        &mut self,
        name: &str,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<()> {
        let all = MemorySemantics::ACQUIRE_RELEASE;
        let statement = match (name, arguments) {
            ("barrier", &[]) if self.lw.analysis.stage == rglsl_sema::Stage::TessControl => {
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
            ("barrier", &[]) => Statement::ControlBarrier(crate::Barrier::WORK_GROUP),
            ("memoryBarrier", &[]) => Statement::ScopedBarrier {
                execution: None,
                memory: self.default_scope(),
                semantics: ALL_MEMORY | all,
            },
            ("memoryBarrierBuffer", &[]) => Statement::ScopedBarrier {
                execution: None,
                memory: self.default_scope(),
                semantics: MemorySemantics::UNIFORM_MEMORY | all,
            },
            ("memoryBarrierShared", &[]) => Statement::ScopedBarrier {
                execution: None,
                memory: self.default_scope(),
                semantics: MemorySemantics::WORKGROUP_MEMORY | all,
            },
            ("memoryBarrierImage", &[]) => Statement::ScopedBarrier {
                execution: None,
                memory: self.default_scope(),
                semantics: MemorySemantics::IMAGE_MEMORY | all,
            },
            ("groupMemoryBarrier", &[]) => Statement::ScopedBarrier {
                execution: None,
                memory: MemoryScope::Workgroup,
                semantics: ALL_MEMORY | all,
            },
            ("memoryBarrier", &[ref memory, ref storage, ref semantics]) => {
                Statement::ScopedBarrier {
                    execution: None,
                    memory: self.scope_argument(memory, at)?,
                    semantics: self.semantics_arguments(storage, semantics, at)?,
                }
            }
            ("controlBarrier", &[ref execution, ref memory, ref storage, ref semantics]) => {
                Statement::ScopedBarrier {
                    execution: Some(self.scope_argument(execution, at)?),
                    memory: self.scope_argument(memory, at)?,
                    semantics: self.semantics_arguments(storage, semantics, at)?,
                }
            }
            _ => return Err(internal(at)),
        };
        self.push(statement, at);
        Ok(())
    }
}
