use std::collections::BTreeMap;
use std::fmt::Write as _;

use anyhow::{Context, Result, bail};

use super::cpp::Symbols;
use super::grammar::Grammar;

pub enum Lookup {
    Instruction,
    Enumerant(&'static str),
}

pub struct Section {
    pub module: &'static str,
    pub grammar: &'static str,
    pub lookup: Lookup,
    pub glslang: &'static str,
    pub names: &'static [&'static str],
}

pub const CORE: &str = "spirv.core";

pub const SECTIONS: &[Section] = &[
    Section {
        module: "op",
        grammar: CORE,
        lookup: Lookup::Instruction,
        glslang: "Op::",
        names: &[
            "OpAbortKHR",
            "OpBitcastExtractEXT",
            "OpConstantDataKHR",
            "OpCooperativeMatrixGetCoordinateEXT",
            "OpExtInstWithForwardRefsKHR",
            "OpImageGatherQCOM",
        ],
    },
    Section {
        module: "capability",
        grammar: CORE,
        lookup: Lookup::Enumerant("Capability"),
        glslang: "Capability::",
        names: &[
            "AbortKHR",
            "BitcastExtractEXT",
            "ConstantDataKHR",
            "CooperativeMatrixConversionsEXT",
            "CooperativeMatrixDecodeVectorNV",
            "CooperativeMatrixGetCoordinateEXT",
            "Float4EXT",
            "Float6EXT",
            "Float8UnsignedE8M0EXT",
            "ImageGatherExtendedModesQCOM",
            "ImageGatherLinearQCOM",
            "MXInt8EXT",
            "RayTracingOpacityMicromapExecutionModeKHR",
        ],
    },
    Section {
        module: "decoration",
        grammar: CORE,
        lookup: Lookup::Enumerant("Decoration"),
        glslang: "Decoration::",
        names: &["CooperativeMatrixTransposeEXT", "UTFEncodedKHR"],
    },
    Section {
        module: "execution_mode",
        grammar: CORE,
        lookup: Lookup::Enumerant("ExecutionMode"),
        glslang: "ExecutionMode::",
        names: &["OpacityMicromapIdKHR"],
    },
    Section {
        module: "fp_encoding",
        grammar: CORE,
        lookup: Lookup::Enumerant("FPEncoding"),
        glslang: "FPEncoding::",
        names: &[
            "Float4E2M1EXT",
            "Float6E2M3EXT",
            "Float6E3M2EXT",
            "Float8UnsignedE8M0EXT",
            "MXInt8EXT",
        ],
    },
    Section {
        module: "loop_control",
        grammar: CORE,
        lookup: Lookup::Enumerant("LoopControl"),
        glslang: "LoopControlMask::",
        names: &["MultipleWaitQueuesQCOM"],
    },
    Section {
        module: "tensor_addressing_operands",
        grammar: CORE,
        lookup: Lookup::Enumerant("TensorAddressingOperands"),
        glslang: "TensorAddressingOperandsMask::",
        names: &["DecodeVectorFunc"],
    },
    Section {
        module: "shader_debug_info",
        grammar: "extinst.nonsemantic.shader.debuginfo.100",
        lookup: Lookup::Instruction,
        glslang: "NonSemanticShaderDebugInfo",
        names: &[
            "DebugInfoNone",
            "DebugCompilationUnit",
            "DebugTypeBasic",
            "DebugTypePointer",
            "DebugTypeArray",
            "DebugTypeVector",
            "DebugTypeFunction",
            "DebugTypeComposite",
            "DebugTypeMember",
            "DebugGlobalVariable",
            "DebugFunction",
            "DebugLexicalBlock",
            "DebugScope",
            "DebugNoScope",
            "DebugLocalVariable",
            "DebugDeclare",
            "DebugValue",
            "DebugExpression",
            "DebugSource",
            "DebugFunctionDefinition",
            "DebugSourceContinued",
            "DebugLine",
            "DebugEntryPoint",
            "DebugTypeMatrix",
            "DebugTypeCooperativeMatrixKHR",
        ],
    },
    Section {
        module: "debug_info_flags",
        grammar: "extinst.nonsemantic.shader.debuginfo.100",
        lookup: Lookup::Enumerant("DebugInfoFlags"),
        glslang: "NonSemanticShaderDebugInfo",
        names: &["FlagIsPublic", "FlagIsLocal", "FlagIsDefinition"],
    },
    Section {
        module: "debug_base_type_attribute_encoding",
        grammar: "extinst.nonsemantic.shader.debuginfo.100",
        lookup: Lookup::Enumerant("DebugBaseTypeAttributeEncoding"),
        glslang: "NonSemanticShaderDebugInfo",
        names: &["Boolean", "Float", "Signed", "Unsigned"],
    },
    Section {
        module: "debug_composite_type",
        grammar: "extinst.nonsemantic.shader.debuginfo.100",
        lookup: Lookup::Enumerant("DebugCompositeType"),
        glslang: "NonSemanticShaderDebugInfo",
        names: &["Structure"],
    },
    Section {
        module: "amd_gcn_shader",
        grammar: "extinst.spv-amd-gcn-shader",
        lookup: Lookup::Instruction,
        glslang: "",
        names: &["CubeFaceIndexAMD", "CubeFaceCoordAMD", "TimeAMD"],
    },
    Section {
        module: "amd_shader_explicit_vertex_parameter",
        grammar: "extinst.spv-amd-shader-explicit-vertex-parameter",
        lookup: Lookup::Instruction,
        glslang: "",
        names: &["InterpolateAtVertexAMD"],
    },
    Section {
        module: "amd_shader_ballot",
        grammar: "extinst.spv-amd-shader-ballot",
        lookup: Lookup::Instruction,
        glslang: "",
        names: &[
            "SwizzleInvocationsAMD",
            "SwizzleInvocationsMaskedAMD",
            "WriteInvocationAMD",
            "MbcntAMD",
        ],
    },
    Section {
        module: "amd_shader_trinary_minmax",
        grammar: "extinst.spv-amd-shader-trinary-minmax",
        lookup: Lookup::Instruction,
        glslang: "",
        names: &[
            "FMin3AMD", "UMin3AMD", "SMin3AMD", "FMax3AMD", "UMax3AMD", "SMax3AMD", "FMid3AMD",
            "UMid3AMD", "SMid3AMD",
        ],
    },
    Section {
        module: "debug_printf",
        grammar: "extinst.nonsemantic.debugprintf",
        lookup: Lookup::Instruction,
        glslang: "",
        names: &["DebugPrintf"],
    },
];

pub fn generate(grammars: &BTreeMap<&str, Grammar>, symbols: &Symbols) -> Result<String> {
    let mut out = String::new();
    out.push_str(
        "#![expect(non_upper_case_globals, reason = \"the names of the SPIR-V grammar\")]\n\n\
         use spirv::Word;\n",
    );
    for section in SECTIONS {
        let grammar = grammars
            .get(section.grammar)
            .with_context(|| format!("the grammar {} is not loaded", section.grammar))?;
        writeln!(
            out,
            "\npub(super) mod {} {{\nuse super::Word;\n",
            section.module
        )?;
        for name in section.names {
            let found = match section.lookup {
                Lookup::Instruction => grammar.instruction(name).map(|i| i.opcode),
                Lookup::Enumerant(kind) => grammar.enumerant(kind, name),
            };
            let glslang = format!("{}{name}", section.glslang);
            let Some(value) = found.or_else(|| symbols.find(&glslang)) else {
                bail!(
                    "neither SPIRV-Headers ({}) nor glslang's headers define `{name}`",
                    section.grammar
                );
            };
            let constant = match section.lookup {
                Lookup::Instruction => name.strip_prefix("Op").unwrap_or(name),
                Lookup::Enumerant(_) => name,
            };
            writeln!(
                out,
                "pub(in crate::back::spv) const {constant}: Word = {value};"
            )?;
        }
        out.push_str("}\n");
    }
    Ok(out)
}
