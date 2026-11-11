use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::{
    Expression, ExpressionKind, NumericKind, Spanned, SpirvDecorate, SpirvDecorateKind,
    SpirvExecutionMode, SpirvExecutionModeKind, SpirvInstructionQualifier, SpirvRequirement,
    SpirvStorageClass, SpirvTypeParameter, SpirvTypeSpecifier,
};
use rglsl_ast::Span;

use super::expression::literal;
use super::Analyzer;
use crate::constant::Value;
use crate::diagnostic::DiagnosticKind;
use crate::scope::{Storage, SymbolKind};
use crate::spirv::{
    string_words, value_word, SpirvDecoration, SpirvDecorationOperands, SpirvExecutionModeOperands,
    SpirvIdOperand, SpirvInstruction, SpirvType, SpirvTypeParameter as TypeParameter,
};
use crate::types::{Type, TypeKind};

const STORAGE_CLASS_WORKGROUP: u32 = 4;
const STORAGE_CLASS_CALLABLE_DATA: u32 = 5328;
const STORAGE_CLASS_INCOMING_CALLABLE_DATA: u32 = 5329;
const STORAGE_CLASS_RAY_PAYLOAD: u32 = 5338;
const STORAGE_CLASS_HIT_ATTRIBUTE: u32 = 5339;
const STORAGE_CLASS_INCOMING_RAY_PAYLOAD: u32 = 5342;
const STORAGE_CLASS_TASK_PAYLOAD: u32 = 5402;

pub const fn spirv_storage(class: u32) -> Storage {
    match class {
        STORAGE_CLASS_WORKGROUP => Storage::Shared,
        STORAGE_CLASS_CALLABLE_DATA => Storage::CallableData,
        STORAGE_CLASS_INCOMING_CALLABLE_DATA => Storage::CallableDataIn,
        STORAGE_CLASS_RAY_PAYLOAD => Storage::RayPayload,
        STORAGE_CLASS_HIT_ATTRIBUTE => Storage::HitAttribute,
        STORAGE_CLASS_INCOMING_RAY_PAYLOAD => Storage::RayPayloadIn,
        STORAGE_CLASS_TASK_PAYLOAD => Storage::TaskPayloadShared,
        _ => Storage::None,
    }
}

fn intrinsic(subject: &str, reason: &'static str) -> DiagnosticKind {
    DiagnosticKind::SpirvIntrinsic {
        subject: String::from(subject),
        reason,
    }
}

fn unparenthesized(expression: &Expression) -> &Expression {
    match expression.kind {
        ExpressionKind::Parenthesized(ref inner) => unparenthesized(inner),
        _ => expression,
    }
}

fn literal_words(expression: &Expression) -> Option<Vec<u32>> {
    match unparenthesized(expression).kind {
        ExpressionKind::String(ref text) => Some(string_words(text)),
        ExpressionKind::Bool(value) => Some(alloc::vec![u32::from(value)]),
        ExpressionKind::Number(ref number) => {
            let operand = literal(number)?;
            let value = operand.value?.values.into_iter().next()?;
            Some(alloc::vec![value_word(&value)?])
        }
        _ => None,
    }
}

fn integer(expression: &Expression) -> Option<u32> {
    match expression.kind {
        ExpressionKind::Number(ref number) if number.kind == NumericKind::Int => {
            literal_words(expression)?.first().copied()
        }
        _ => None,
    }
}

impl Analyzer<'_> {
    pub(crate) fn spirv_requirements(&mut self, requirements: &[Spanned<SpirvRequirement>]) {
        let mut extensions = false;
        let mut capabilities = false;
        for requirement in requirements {
            let name = requirement.name.node.as_str();
            let strings: Option<Vec<String>> = requirement
                .values
                .iter()
                .map(|value| match value.kind {
                    ExpressionKind::String(ref text) => Some(text.clone()),
                    _ => None,
                })
                .collect();
            let integers: Option<Vec<u32>> = requirement.values.iter().map(integer).collect();
            match name {
                "extensions" => match strings {
                    Some(_) if extensions => {
                        self.error(
                            requirement.span,
                            intrinsic(name, "too many SPIR-V requirements"),
                        );
                    }
                    Some(strings) => {
                        extensions = true;
                        self.spirv_requirements.extensions.extend(strings);
                    }
                    None => self.error(
                        requirement.span,
                        intrinsic(name, "requires a list of extension name strings"),
                    ),
                },
                "capabilities" => match integers {
                    Some(_) if capabilities => {
                        self.error(
                            requirement.span,
                            intrinsic(name, "too many SPIR-V requirements"),
                        );
                    }
                    Some(integers) => {
                        capabilities = true;
                        self.spirv_requirements.capabilities.extend(integers);
                    }
                    None => self.error(
                        requirement.span,
                        intrinsic(name, "requires a list of integer capabilities"),
                    ),
                },
                _ => self.error(
                    requirement.span,
                    intrinsic(name, "unknown SPIR-V requirement"),
                ),
            }
        }
    }

    pub(crate) fn spirv_instruction(
        &mut self,
        qualifiers: &[Spanned<SpirvInstructionQualifier>],
    ) -> SpirvInstruction {
        let mut instruction = SpirvInstruction {
            set: String::new(),
            id: None,
        };
        for qualifier in qualifiers {
            let name = qualifier.name.node.as_str();
            match (name, &qualifier.value.kind) {
                ("set", ExpressionKind::String(text)) => {
                    if !instruction.set.is_empty() {
                        self.error(
                            qualifier.span,
                            intrinsic(
                                "spirv_instruction",
                                "too many SPIR-V instruction qualifiers",
                            ),
                        );
                    } else {
                        instruction.set.clone_from(text);
                    }
                }
                ("id", ExpressionKind::Number(_)) => {
                    if instruction.id.is_some() {
                        self.error(
                            qualifier.span,
                            intrinsic(
                                "spirv_instruction",
                                "too many SPIR-V instruction qualifiers",
                            ),
                        );
                    } else {
                        instruction.id = integer(&qualifier.value);
                    }
                }
                _ => self.error(
                    qualifier.span,
                    intrinsic(name, "unknown SPIR-V instruction qualifier"),
                ),
            }
        }
        instruction
    }

    pub(crate) fn spirv_execution_mode(&mut self, mode: &Spanned<SpirvExecutionMode>) {
        if !self.scopes.is_global() {
            self.error(
                mode.span,
                intrinsic(
                    "SPIR-V execution mode qualifier",
                    "not allowed in nested scope",
                ),
            );
        }
        self.spirv_requirements(&mode.requirements);
        let Some(id) = integer(&mode.mode) else {
            return;
        };
        let operands = match mode.kind {
            SpirvExecutionModeKind::Literal => SpirvExecutionModeOperands::Literals(
                mode.operands
                    .iter()
                    .filter_map(literal_words)
                    .flatten()
                    .collect(),
            ),
            SpirvExecutionModeKind::Id => {
                let mut ids = Vec::new();
                for operand in &mode.operands {
                    if self.spirv_constant_operand(operand) {
                        ids.push(operand.id);
                    }
                }
                SpirvExecutionModeOperands::Ids(ids)
            }
        };
        self.spirv_execution_modes.insert(id, operands);
    }

    fn spirv_constant_operand(&mut self, expression: &Expression) -> bool {
        let operand = self.expression(expression);
        if operand.ty.is_error() {
            return false;
        }
        if !operand.constant {
            self.error(
                expression.span,
                intrinsic("", "constant expression required"),
            );
            return false;
        }
        if !Self::spirv_scalar_type(&operand.ty) {
            let shown = self.show(&operand.ty);
            self.error(expression.span, intrinsic(&shown, "this type not allowed"));
            return false;
        }
        true
    }

    const fn spirv_scalar_type(ty: &Type) -> bool {
        ty.is_string()
            || matches!(
                ty.scalar_type(),
                Some(
                    crate::types::Scalar::Float
                        | crate::types::Scalar::Int
                        | crate::types::Scalar::Uint
                        | crate::types::Scalar::Bool
                )
            ) && ty.is_scalar()
    }

    pub(crate) fn spirv_storage_class(
        &mut self,
        span: Span,
        class: &SpirvStorageClass,
    ) -> Option<u32> {
        if !self.scopes.is_global() {
            self.error(
                span,
                intrinsic("spirv_storage_class", "not allowed in nested scope"),
            );
        }
        self.spirv_requirements(&class.requirements);
        integer(&class.class)
    }

    pub(crate) fn spirv_decorate(&mut self, decorate: &SpirvDecorate) -> Option<SpirvDecoration> {
        self.spirv_requirements(&decorate.requirements);
        let decoration = integer(&decorate.decoration)?;
        let operands = match decorate.kind {
            SpirvDecorateKind::Literal => SpirvDecorationOperands::Literals(
                decorate
                    .operands
                    .iter()
                    .filter_map(literal_words)
                    .flatten()
                    .collect(),
            ),
            SpirvDecorateKind::String => SpirvDecorationOperands::Strings(
                decorate
                    .operands
                    .iter()
                    .filter_map(|operand| match operand.kind {
                        ExpressionKind::String(ref text) => Some(text.clone()),
                        _ => None,
                    })
                    .collect(),
            ),
            SpirvDecorateKind::Id => {
                let mut ids = Vec::new();
                for operand in &decorate.operands {
                    if let Some(id) = self.spirv_id_operand(operand) {
                        ids.push(id);
                    }
                }
                SpirvDecorationOperands::Ids(ids)
            }
        };
        Some(SpirvDecoration {
            decoration,
            operands,
        })
    }

    fn spirv_id_operand(&mut self, expression: &Expression) -> Option<SpirvIdOperand> {
        let operand = self.expression(expression);
        if operand.ty.is_error() {
            return None;
        }
        if operand.constant && !operand.specialization && operand.value.is_some() {
            return Some(SpirvIdOperand::Constant(expression.id));
        }
        let symbol = self.references.get(&expression.id).copied();
        match symbol
            .and_then(|id| self.symbol(id))
            .map(|symbol| &symbol.kind)
        {
            Some(SymbolKind::Variable(_)) => symbol.map(SpirvIdOperand::Symbol),
            _ => {
                self.error(
                    expression.span,
                    intrinsic(
                        "",
                        "only allow constants or variables which are not elements of a composite",
                    ),
                );
                None
            }
        }
    }

    pub(crate) fn spirv_type_specifier(&mut self, specifier: &SpirvTypeSpecifier) -> Type {
        self.spirv_requirements(&specifier.requirements);
        let instruction = self.spirv_instruction(&specifier.instruction);
        let mut parameters = Vec::new();
        for parameter in &specifier.parameters {
            match parameter {
                SpirvTypeParameter::Type(ty) => {
                    parameters.push(TypeParameter::Type(self.type_specifier(ty)));
                }
                SpirvTypeParameter::Constant(expression) => {
                    if let Some(parameter) = self.spirv_type_constant(expression) {
                        parameters.push(parameter);
                    }
                }
            }
        }
        match self.types.add_spirv(SpirvType {
            instruction,
            parameters,
        }) {
            Some(id) => Type::new(TypeKind::Spirv(id)),
            None => Type::ERROR,
        }
    }

    fn spirv_type_constant(&mut self, expression: &Expression) -> Option<TypeParameter> {
        let operand = self.expression(expression);
        if operand.ty.is_error() {
            return None;
        }
        if !operand.constant {
            self.error(
                expression.span,
                intrinsic("", "constant expression required"),
            );
            return None;
        }
        if let Some(words) = literal_words(expression) {
            return Some(TypeParameter::Literal(words));
        }
        let value = operand
            .value
            .as_ref()
            .filter(|_| !operand.specialization)
            .and_then(|value| value.values.first());
        let Some(value) = value else {
            self.error(
                expression.span,
                intrinsic("spirv_type", "expected a non-specialization constant"),
            );
            return None;
        };
        let allowed = operand.ty.is_scalar()
            && matches!(
                value,
                Value::Bool(_) | Value::Int(_) | Value::Uint(_) | Value::Float(_)
            );
        match value_word(value).filter(|_| allowed) {
            Some(word) => Some(TypeParameter::Constant(alloc::vec![word])),
            None => {
                let shown = self.show(&operand.ty);
                self.error(expression.span, intrinsic(&shown, "this type not allowed"));
                None
            }
        }
    }
}
