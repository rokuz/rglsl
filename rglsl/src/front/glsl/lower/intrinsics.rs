use alloc::{collections::BTreeMap, string::String, vec::Vec};

use rglsl_ast::ast::NodeId;
use rglsl_ast::ast::{
    DeclarationKind, Expression as AstExpression, ExternalDeclaration, SpirvExecutionModeKind,
};
use rglsl_sema::spirv::{
    value_word, SpirvDecorationOperands as SemaDecorationOperands,
    SpirvExecutionModeOperands as SemaModeOperands, SpirvIdOperand, SpirvTypeId,
    SpirvTypeParameter,
};
use rglsl_sema::types::{Type as GlslType, TypeKind};
use rglsl_sema::FunctionId;

use super::function::FunctionLowerer;
use super::{internal, unsupported, GlobalRef, Lowerer, Result};
use crate::{
    Expression, Handle, Span, SpirvDecoration, SpirvDecorationOperands, SpirvExecutionMode,
    SpirvExecutionModeOperands, SpirvId, SpirvInstruction, SpirvOperand, SpirvRequirements,
    SpirvTypeOperand, Statement, TypeInner, VectorSize,
};

const OP_TYPE_VECTOR: u32 = 23;
const OPENCL_STD: &str = "OpenCL.std";
const OPENCL_MEMORY: core::ops::RangeInclusive<u32> = 171..=185;

impl Lowerer<'_> {
    pub(super) fn spirv_requirements(&mut self) {
        let requirements = &self.analysis.spirv_requirements;
        self.module.spirv_requirements = SpirvRequirements {
            extensions: requirements.extensions.iter().cloned().collect(),
            capabilities: requirements.capabilities.iter().copied().collect(),
        };
    }

    pub(super) fn spirv_type(&mut self, id: SpirvTypeId, span: Span) -> Result<TypeInner> {
        let analysis = self.analysis;
        let ty = analysis.types.spirv(id).ok_or_else(|| internal(span))?;
        if !ty.instruction.set.is_empty() {
            return Err(unsupported("`spirv_type` with an instruction set", span));
        }
        let opcode = ty
            .instruction
            .id
            .ok_or_else(|| unsupported("`spirv_type` without an `id`", span))?;
        if let Some(scalar) = ty.scalar() {
            return Ok(TypeInner::Scalar(super::types::scalar(scalar)));
        }
        let mut operands = Vec::with_capacity(ty.parameters.len());
        for parameter in &ty.parameters {
            match *parameter {
                SpirvTypeParameter::Literal(ref words) => {
                    operands.extend(words.iter().map(|&word| SpirvTypeOperand::Literal(word)));
                }
                SpirvTypeParameter::Constant(_) => {
                    return Err(unsupported(
                        "`spirv_type` parameters that are named constants",
                        span,
                    ))
                }
                SpirvTypeParameter::Type(ref parameter) => {
                    let handle = self.ir_type(parameter, span)?;
                    operands.push(SpirvTypeOperand::Type(handle));
                }
            }
        }
        if opcode == OP_TYPE_VECTOR {
            if let [SpirvTypeOperand::Type(base), SpirvTypeOperand::Literal(count)] = operands[..] {
                let size = match count {
                    2 => Some(VectorSize::Bi),
                    3 => Some(VectorSize::Tri),
                    4 => Some(VectorSize::Quad),
                    _ => None,
                };
                if let (Some(size), &TypeInner::Scalar(scalar)) =
                    (size, &self.module.types[base].inner)
                {
                    return Ok(TypeInner::Vector { size, scalar });
                }
            }
        }
        Ok(TypeInner::Spirv { opcode, operands })
    }

    fn spirv_constant(&mut self, node: NodeId, span: Span) -> Result<Handle<Expression>> {
        let analysis = self.analysis;
        let info = analysis.expression(node).ok_or_else(|| internal(span))?;
        let value = info.value.as_ref().ok_or_else(|| internal(span))?;
        let ty = info.ty.clone();
        self.global_constant(&ty, &value.values, span)
    }

    fn spirv_global_ref(&mut self, global: GlobalRef, span: Span) -> SpirvId {
        match global {
            GlobalRef::Variable(handle) => SpirvId::Global(handle),
            GlobalRef::Constant(handle) => SpirvId::Constant(
                self.module
                    .global_expressions
                    .append(Expression::Constant(handle), span),
            ),
            GlobalRef::Override(handle) => SpirvId::Constant(
                self.module
                    .global_expressions
                    .append(Expression::Override(handle), span),
            ),
        }
    }

    pub(super) fn spirv_decorations(&mut self) -> Result<()> {
        let analysis = self.analysis;
        let decorated: Vec<(Handle<crate::GlobalVariable>, &rglsl_sema::scope::Variable)> = self
            .globals
            .iter()
            .filter_map(|(&symbol, &global)| match global {
                GlobalRef::Variable(handle) => {
                    let variable = analysis.symbol(symbol)?.variable()?;
                    (!variable.qualifiers.spirv_decorations.is_empty())
                        .then_some((handle, variable))
                }
                GlobalRef::Constant(_) | GlobalRef::Override(_) => None,
            })
            .collect();
        for (handle, variable) in decorated {
            let span = self.module.global_variables.get_span(handle);
            let mut decorations = Vec::new();
            for decoration in &variable.qualifiers.spirv_decorations {
                let operands = match decoration.operands {
                    SemaDecorationOperands::Literals(ref literals) => {
                        SpirvDecorationOperands::Literals(literals.clone())
                    }
                    SemaDecorationOperands::Strings(ref strings) => {
                        SpirvDecorationOperands::Strings(strings.clone())
                    }
                    SemaDecorationOperands::Ids(ref ids) => {
                        let mut lowered = Vec::with_capacity(ids.len());
                        for &id in ids {
                            lowered.push(match id {
                                SpirvIdOperand::Constant(node) => {
                                    SpirvId::Constant(self.spirv_constant(node, span)?)
                                }
                                SpirvIdOperand::Symbol(symbol) => {
                                    let global = self.global_ref(symbol, span)?;
                                    self.spirv_global_ref(global, span)
                                }
                            });
                        }
                        SpirvDecorationOperands::Ids(lowered)
                    }
                };
                decorations.push(SpirvDecoration {
                    decoration: decoration.decoration,
                    operands,
                });
            }
            self.module.global_variables[handle].spirv_decorations = decorations;
        }
        Ok(())
    }

    pub(super) fn spirv_execution_modes(&mut self, span: Span) -> Result<Vec<SpirvExecutionMode>> {
        let analysis = self.analysis;
        let mut operands_by_node: BTreeMap<NodeId, &AstExpression> = BTreeMap::new();
        for declaration in &self.unit.external_declarations {
            let ExternalDeclaration::Declaration(ref declaration) = *declaration else {
                continue;
            };
            if let DeclarationKind::SpirvExecutionMode(ref mode) = declaration.kind {
                if mode.kind == SpirvExecutionModeKind::Id {
                    for operand in &mode.operands {
                        operands_by_node.insert(operand.id, operand);
                    }
                }
            }
        }
        let mut modes = Vec::new();
        for (&mode, operands) in &analysis.spirv_execution_modes {
            let operands = match *operands {
                SemaModeOperands::Literals(ref literals) => {
                    SpirvExecutionModeOperands::Literals(literals.clone())
                }
                SemaModeOperands::Ids(ref ids) => {
                    let mut lowered = Vec::with_capacity(ids.len());
                    for node in ids {
                        let expression = operands_by_node
                            .get(node)
                            .copied()
                            .ok_or_else(|| internal(span))?;
                        lowered.push(self.spirv_mode_operand(expression)?);
                    }
                    SpirvExecutionModeOperands::Ids(lowered)
                }
            };
            modes.push(SpirvExecutionMode { mode, operands });
        }
        Ok(modes)
    }

    fn spirv_mode_operand(&mut self, expression: &AstExpression) -> Result<Handle<Expression>> {
        let analysis = self.analysis;
        let span = self.at(expression.span);
        let info = analysis
            .expression(expression.id)
            .ok_or_else(|| internal(span))?;
        if !info.is_specialization {
            return self.spirv_constant(expression.id, span);
        }
        let symbol = match super::prepass::strip(expression).kind {
            rglsl_ast::ast::ExpressionKind::Variable(_) => analysis
                .references
                .get(&super::prepass::strip(expression).id),
            _ => None,
        };
        if let Some(&symbol) = symbol {
            let global = self.global_ref(symbol, span)?;
            if let SpirvId::Constant(handle) = self.spirv_global_ref(global, span) {
                return Ok(handle);
            }
        }
        let handle = self.specialization(expression, None, span)?;
        Ok(self
            .module
            .global_expressions
            .append(Expression::Override(handle), span))
    }
}

impl FunctionLowerer<'_, '_> {
    pub(super) fn spirv_call(
        &mut self,
        id: FunctionId,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let analysis = self.lw.analysis;
        let function = analysis.function(id).ok_or_else(|| internal(at))?;
        let spirv = function
            .spirv_instruction
            .as_ref()
            .ok_or_else(|| internal(at))?;
        let opcode = spirv
            .id
            .ok_or_else(|| unsupported("`spirv_instruction` without an `id`", at))?;
        if spirv.set == OPENCL_STD && OPENCL_MEMORY.contains(&opcode) {
            return Err(unsupported(
                "OpenCL.std memory instructions, which need a physical addressing model",
                at,
            ));
        }
        let instruction = SpirvInstruction {
            set: (!spirv.set.is_empty()).then(|| String::from(spirv.set.as_str())),
            opcode,
        };
        let mut operands = Vec::with_capacity(arguments.len());
        for (argument, parameter) in arguments.iter().zip(&function.parameters) {
            if parameter.qualifiers.spirv_literal {
                let info = self.info(argument)?;
                let value = info
                    .value
                    .as_ref()
                    .and_then(|value| value.first())
                    .ok_or_else(|| internal(at))?;
                let value = match parameter.ty.base_scalar() {
                    Some(scalar) => value.convert(scalar),
                    None => value,
                };
                let word = value_word(&value).ok_or_else(|| internal(at))?;
                operands.push(SpirvOperand::Literal(word));
            } else if parameter.qualifiers.spirv_by_reference {
                let place = self.place(argument)?;
                if place.boolean || place.spilled {
                    return Err(unsupported(
                        "this argument of a `spirv_by_reference` parameter",
                        at,
                    ));
                }
                let pointer = match place.swizzle {
                    None => place.pointer,
                    Some(ref components) => match components[..] {
                        [index] => self.add(
                            Expression::AccessIndex {
                                base: place.pointer,
                                index,
                            },
                            at,
                        )?,
                        _ => {
                            return Err(unsupported(
                                "a swizzle as the argument of a `spirv_by_reference` parameter",
                                at,
                            ))
                        }
                    },
                };
                operands.push(SpirvOperand::Pointer(pointer));
            } else {
                operands.push(SpirvOperand::Value(self.rvalue(argument)?));
            }
        }
        let result = if function.return_type.is_void() {
            None
        } else {
            Some(self.spirv_result_type(&function.return_type, at)?)
        };
        match result {
            Some(ty) => Ok(Some(self.push_with_result(
                Expression::SpirvInstructionResult { ty },
                |result| Statement::SpirvInstruction {
                    instruction,
                    operands,
                    result: Some(result),
                },
                at,
            ))),
            None => {
                let emitted = self.emitter.finish(&self.expressions);
                self.block.extend(emitted);
                self.block.push(
                    Statement::SpirvInstruction {
                        instruction,
                        operands,
                        result: None,
                    },
                    at,
                );
                self.emitter.start(&self.expressions);
                Ok(None)
            }
        }
    }

    fn spirv_result_type(&mut self, ty: &GlslType, at: Span) -> Result<Handle<crate::Type>> {
        if matches!(ty.kind, TypeKind::Spirv(_)) || !ty.is_opaque() {
            return self.lw.ir_type(ty, at);
        }
        Err(unsupported("opaque results of `spirv_instruction`", at))
    }
}
