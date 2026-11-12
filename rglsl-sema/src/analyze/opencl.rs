use alloc::format;
use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::Span;
use rspirv::dr::Operand;
use rspirv::grammar::{ext_inst_table, OperandKind, INSTRUCTION_TABLE};
use rspirv::spirv::{
    AccessQualifier, BuiltIn, Capability, Decoration, ExecutionMode, StorageClass,
};

use super::Analyzer;
use crate::diagnostic::DiagnosticKind;

const OPENCL_ONLY: &str = "it is OpenCL-only";
const PHYSICAL_ADDRESSING: &str = "Vulkan has no physical addressing";
const OPENCL_STD: &str = "OpenCL.std";
const OPENCL_PRINTF: u32 = 184;
const OPENCL_PHYSICAL_MEMORY: [core::ops::RangeInclusive<u32>; 2] = [171..=181, 185..=185];

fn capability_reason(capability: Capability) -> Option<&'static str> {
    let mut pending = alloc::vec![capability];
    let mut seen = Vec::new();
    while let Some(current) = pending.pop() {
        if seen.contains(&current) {
            continue;
        }
        seen.push(current);
        match current {
            Capability::Kernel => return Some(OPENCL_ONLY),
            Capability::Addresses => return Some(PHYSICAL_ADDRESSING),
            _ => pending.extend(Operand::Capability(current).required_capabilities()),
        }
    }
    None
}

fn requirement_reason(alternatives: &[Capability]) -> Option<&'static str> {
    let mut reasons = alternatives
        .iter()
        .map(|&capability| capability_reason(capability));
    let first = reasons.next()??;
    reasons.all(|reason| reason.is_some()).then_some(first)
}

fn operand_reason(operand: &Operand) -> Option<&'static str> {
    match *operand {
        Operand::StorageClass(StorageClass::CrossWorkgroup) => Some(OPENCL_ONLY),
        _ => requirement_reason(&operand.required_capabilities()),
    }
}

const fn not_supported(subject: String, reason: &'static str) -> DiagnosticKind {
    DiagnosticKind::NotSupportedInVulkan { subject, reason }
}

impl Analyzer<'_> {
    fn opencl_operand(&mut self, span: Span, subject: &str, operand: Operand) {
        if let Some(reason) = operand_reason(&operand) {
            self.target_limit(
                span,
                not_supported(format!("{subject} `{operand}`"), reason),
            );
        }
    }

    pub(crate) fn opencl_capability(&mut self, span: Span, value: u32) {
        if let Some(capability) = Capability::from_u32(value) {
            if let Some(reason) = capability_reason(capability) {
                self.target_limit(
                    span,
                    not_supported(format!("capability `{capability:?}`"), reason),
                );
            }
        }
    }

    pub(crate) fn opencl_storage_class(&mut self, span: Span, value: u32) {
        if let Some(class) = StorageClass::from_u32(value) {
            self.opencl_operand(span, "storage class", Operand::StorageClass(class));
        }
    }

    pub(crate) fn opencl_execution_mode(&mut self, span: Span, value: u32) {
        if let Some(mode) = ExecutionMode::from_u32(value) {
            self.opencl_operand(span, "execution mode", Operand::ExecutionMode(mode));
        }
    }

    pub(crate) fn opencl_decoration(&mut self, span: Span, value: u32, first_literal: Option<u32>) {
        let Some(decoration) = Decoration::from_u32(value) else {
            return;
        };
        self.opencl_operand(span, "decoration", Operand::Decoration(decoration));
        if decoration == Decoration::BuiltIn {
            if let Some(builtin) = first_literal.and_then(BuiltIn::from_u32) {
                self.opencl_operand(span, "built-in", Operand::BuiltIn(builtin));
            }
        }
    }

    pub(crate) fn opencl_instruction(&mut self, span: Span, set: &str, opcode: u32) {
        if set.is_empty() {
            if let Some(instruction) = INSTRUCTION_TABLE.lookup_opcode(opcode) {
                if let Some(reason) = requirement_reason(instruction.capabilities) {
                    self.target_limit(
                        span,
                        not_supported(format!("instruction `Op{}`", instruction.opname), reason),
                    );
                }
            }
            return;
        }
        if set != OPENCL_STD {
            return;
        }
        if opcode != OPENCL_PRINTF
            && !OPENCL_PHYSICAL_MEMORY
                .iter()
                .any(|range| range.contains(&opcode))
        {
            return;
        }
        let name = ext_inst_table(set)
            .and_then(|table| table.lookup_opcode(opcode))
            .map_or_else(
                || format!("{opcode}"),
                |instruction| String::from(instruction.opname),
            );
        self.target_limit(span, DiagnosticKind::UnsupportedOpenClInstruction(name));
    }

    pub(crate) fn opencl_type_operand(
        &mut self,
        span: Span,
        opcode: u32,
        index: usize,
        value: u32,
    ) {
        let Some(instruction) = INSTRUCTION_TABLE.lookup_opcode(opcode) else {
            return;
        };
        let kind = instruction
            .operands
            .iter()
            .filter(|operand| operand.kind != OperandKind::IdResult)
            .nth(index)
            .map(|operand| operand.kind);
        match kind {
            Some(OperandKind::StorageClass) => self.opencl_storage_class(span, value),
            Some(OperandKind::AccessQualifier) => {
                if let Some(access) = AccessQualifier::from_u32(value) {
                    self.opencl_operand(span, "access qualifier", Operand::AccessQualifier(access));
                }
            }
            _ => {}
        }
    }
}
