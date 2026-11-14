use rglsl_types::extension::Extension;

pub(crate) fn variable_extension(name: &str) -> Option<Extension> {
    Some(match name {
        "gl_SubgroupSize" | "gl_SubgroupInvocationID" | "gl_NumSubgroups" | "gl_SubgroupID" => {
            Extension::KhrShaderSubgroupBasic
        }
        "gl_SubgroupEqMask" | "gl_SubgroupGeMask" | "gl_SubgroupGtMask" | "gl_SubgroupLeMask"
        | "gl_SubgroupLtMask" => Extension::KhrShaderSubgroupBallot,
        "gl_SubGroupSizeARB"
        | "gl_SubGroupInvocationARB"
        | "gl_SubGroupEqMaskARB"
        | "gl_SubGroupGeMaskARB"
        | "gl_SubGroupGtMaskARB"
        | "gl_SubGroupLeMaskARB"
        | "gl_SubGroupLtMaskARB" => Extension::ArbShaderBallot,
        "gl_WarpsPerSMNV" | "gl_SMCountNV" | "gl_WarpIDNV" | "gl_SMIDNV" => {
            Extension::NvShaderSmBuiltins
        }
        "gl_CoreIDARM" | "gl_CoreCountARM" | "gl_CoreMaxIDARM" | "gl_WarpIDARM"
        | "gl_WarpMaxIDARM" => Extension::ArmShaderCoreBuiltins,
        _ => return None,
    })
}
