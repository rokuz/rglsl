#![expect(non_upper_case_globals, reason = "the names of the SPIR-V grammar")]

use spirv::Word;

pub(super) mod op {
    use super::Word;

    pub(in crate::back::spv) const AbortKHR: Word = 5121;
    pub(in crate::back::spv) const BitcastExtractEXT: Word = 4195;
    pub(in crate::back::spv) const ConstantDataKHR: Word = 5147;
    pub(in crate::back::spv) const CooperativeMatrixGetCoordinateEXT: Word = 5363;
    pub(in crate::back::spv) const ExtInstWithForwardRefsKHR: Word = 4433;
    pub(in crate::back::spv) const ImageGatherQCOM: Word = 4545;
}

pub(super) mod capability {
    use super::Word;

    pub(in crate::back::spv) const AbortKHR: Word = 5120;
    pub(in crate::back::spv) const BitcastExtractEXT: Word = 4232;
    pub(in crate::back::spv) const ConstantDataKHR: Word = 5146;
    pub(in crate::back::spv) const CooperativeMatrixConversionsEXT: Word = 5429;
    pub(in crate::back::spv) const CooperativeMatrixDecodeVectorNV: Word = 5447;
    pub(in crate::back::spv) const CooperativeMatrixGetCoordinateEXT: Word = 5438;
    pub(in crate::back::spv) const Float4EXT: Word = 4229;
    pub(in crate::back::spv) const Float6EXT: Word = 4228;
    pub(in crate::back::spv) const Float8UnsignedE8M0EXT: Word = 4230;
    pub(in crate::back::spv) const ImageGatherExtendedModesQCOM: Word = 4544;
    pub(in crate::back::spv) const ImageGatherLinearQCOM: Word = 4543;
    pub(in crate::back::spv) const MXInt8EXT: Word = 4231;
    pub(in crate::back::spv) const RayTracingOpacityMicromapExecutionModeKHR: Word = 6032;
}

pub(super) mod decoration {
    use super::Word;

    pub(in crate::back::spv) const CooperativeMatrixTransposeEXT: Word = 5440;
    pub(in crate::back::spv) const UTFEncodedKHR: Word = 5145;
}

pub(super) mod execution_mode {
    use super::Word;

    pub(in crate::back::spv) const OpacityMicromapIdKHR: Word = 6031;
}

pub(super) mod fp_encoding {
    use super::Word;

    pub(in crate::back::spv) const Float4E2M1EXT: Word = 4225;
    pub(in crate::back::spv) const Float6E2M3EXT: Word = 4223;
    pub(in crate::back::spv) const Float6E3M2EXT: Word = 4224;
    pub(in crate::back::spv) const Float8UnsignedE8M0EXT: Word = 4226;
    pub(in crate::back::spv) const MXInt8EXT: Word = 4227;
}

pub(super) mod loop_control {
    use super::Word;

    pub(in crate::back::spv) const MultipleWaitQueuesQCOM: Word = 268435456;
}

pub(super) mod tensor_addressing_operands {
    use super::Word;

    pub(in crate::back::spv) const DecodeVectorFunc: Word = 4;
}

pub(super) mod shader_debug_info {
    use super::Word;

    pub(in crate::back::spv) const DebugInfoNone: Word = 0;
    pub(in crate::back::spv) const DebugCompilationUnit: Word = 1;
    pub(in crate::back::spv) const DebugTypeBasic: Word = 2;
    pub(in crate::back::spv) const DebugTypePointer: Word = 3;
    pub(in crate::back::spv) const DebugTypeArray: Word = 5;
    pub(in crate::back::spv) const DebugTypeVector: Word = 6;
    pub(in crate::back::spv) const DebugTypeFunction: Word = 8;
    pub(in crate::back::spv) const DebugTypeComposite: Word = 10;
    pub(in crate::back::spv) const DebugTypeMember: Word = 11;
    pub(in crate::back::spv) const DebugGlobalVariable: Word = 18;
    pub(in crate::back::spv) const DebugFunction: Word = 20;
    pub(in crate::back::spv) const DebugLexicalBlock: Word = 21;
    pub(in crate::back::spv) const DebugScope: Word = 23;
    pub(in crate::back::spv) const DebugNoScope: Word = 24;
    pub(in crate::back::spv) const DebugInlinedAt: Word = 25;
    pub(in crate::back::spv) const DebugLocalVariable: Word = 26;
    pub(in crate::back::spv) const DebugDeclare: Word = 28;
    pub(in crate::back::spv) const DebugValue: Word = 29;
    pub(in crate::back::spv) const DebugExpression: Word = 31;
    pub(in crate::back::spv) const DebugSource: Word = 35;
    pub(in crate::back::spv) const DebugFunctionDefinition: Word = 101;
    pub(in crate::back::spv) const DebugSourceContinued: Word = 102;
    pub(in crate::back::spv) const DebugLine: Word = 103;
    pub(in crate::back::spv) const DebugEntryPoint: Word = 107;
    pub(in crate::back::spv) const DebugTypeMatrix: Word = 108;
    pub(in crate::back::spv) const DebugTypeCooperativeMatrixKHR: Word = 110;
}

pub(super) mod debug_info_flags {
    use super::Word;

    pub(in crate::back::spv) const FlagIsPublic: Word = 3;
    pub(in crate::back::spv) const FlagIsLocal: Word = 4;
    pub(in crate::back::spv) const FlagIsDefinition: Word = 8;
}

pub(super) mod debug_base_type_attribute_encoding {
    use super::Word;

    pub(in crate::back::spv) const Boolean: Word = 2;
    pub(in crate::back::spv) const Float: Word = 3;
    pub(in crate::back::spv) const Signed: Word = 4;
    pub(in crate::back::spv) const Unsigned: Word = 6;
}

pub(super) mod debug_composite_type {
    use super::Word;

    pub(in crate::back::spv) const Structure: Word = 1;
}

pub(super) mod amd_gcn_shader {
    use super::Word;

    pub(in crate::back::spv) const CubeFaceIndexAMD: Word = 1;
    pub(in crate::back::spv) const CubeFaceCoordAMD: Word = 2;
    pub(in crate::back::spv) const TimeAMD: Word = 3;
}

pub(super) mod amd_shader_explicit_vertex_parameter {
    use super::Word;

    pub(in crate::back::spv) const InterpolateAtVertexAMD: Word = 1;
}

pub(super) mod amd_shader_ballot {
    use super::Word;

    pub(in crate::back::spv) const SwizzleInvocationsAMD: Word = 1;
    pub(in crate::back::spv) const SwizzleInvocationsMaskedAMD: Word = 2;
    pub(in crate::back::spv) const WriteInvocationAMD: Word = 3;
    pub(in crate::back::spv) const MbcntAMD: Word = 4;
}

pub(super) mod amd_shader_trinary_minmax {
    use super::Word;

    pub(in crate::back::spv) const FMin3AMD: Word = 1;
    pub(in crate::back::spv) const UMin3AMD: Word = 2;
    pub(in crate::back::spv) const SMin3AMD: Word = 3;
    pub(in crate::back::spv) const FMax3AMD: Word = 4;
    pub(in crate::back::spv) const UMax3AMD: Word = 5;
    pub(in crate::back::spv) const SMax3AMD: Word = 6;
    pub(in crate::back::spv) const FMid3AMD: Word = 7;
    pub(in crate::back::spv) const UMid3AMD: Word = 8;
    pub(in crate::back::spv) const SMid3AMD: Word = 9;
}

pub(super) mod debug_printf {
    use super::Word;

    pub(in crate::back::spv) const DebugPrintf: Word = 1;
}
