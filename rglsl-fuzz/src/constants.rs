pub const GLF_COLOR: &str = "_GLF_color";
pub const GLF_FRAGCOORD: &str = "_GLF_FragCoord";
pub const GLF_FRAGDEPTH: &str = "_GLF_FragDepth";
pub const GLF_POS: &str = "_GLF_pos";
pub const GLF_OUT_VAR_BACKUP_PREFIX: &str = "_GLF_outVarBackup";
pub const LIVE_PREFIX: &str = "GLF_live";
pub const DEAD_PREFIX: &str = "GLF_dead";
pub const SPLIT_LOOP_COUNTER_PREFIX: &str = "_GLF_SPLIT_LOOP_COUNTER";
pub const STRUCTIFICATION_FIELD_PREFIX: &str = "_f";
pub const STRUCTIFICATION_STRUCT_PREFIX: &str = "_GLF_struct_";
pub const GLF_STRUCT_REPLACEMENT: &str = "_GLF_struct_replacement_";

pub const GLF_DEAD: &str = "_GLF_DEAD";
pub const GLF_ZERO: &str = "_GLF_ZERO";
pub const GLF_ONE: &str = "_GLF_ONE";
pub const GLF_FALSE: &str = "_GLF_FALSE";
pub const GLF_TRUE: &str = "_GLF_TRUE";
pub const GLF_FUZZED: &str = "_GLF_FUZZED";
pub const GLF_WRAPPED_LOOP: &str = "_GLF_WRAPPED_LOOP";
pub const GLF_WRAPPED_IF_TRUE: &str = "_GLF_WRAPPED_IF_TRUE";
pub const GLF_WRAPPED_IF_FALSE: &str = "_GLF_WRAPPED_IF_FALSE";
pub const GLF_IDENTITY: &str = "_GLF_IDENTITY";
pub const GLF_SWITCH: &str = "_GLF_SWITCH";
pub const GLF_MAKE_IN_BOUNDS_INT: &str = "_GLF_MAKE_IN_BOUNDS_INT";
pub const GLF_MAKE_IN_BOUNDS_UINT: &str = "_GLF_MAKE_IN_BOUNDS_UINT";

pub const INJECTED_LOOP_COUNTER: &str = "_injected_loop_counter";
pub const INJECTION_SWITCH: &str = "injectionSwitch";
pub const OUTLINED_FUNCTION_PREFIX: &str = "_GLF_outlined_";
pub const GL_FRAG_COORD: &str = "gl_FragCoord";

pub const GLF_GLOBAL_LOOP_COUNT: &str = "_GLF_global_loop_count";
pub const GLF_GLOBAL_LOOP_BOUND: &str = "_GLF_global_loop_bound";
pub const GLOBAL_LOOP_BOUNDS: [u32; 4] = [100, 1_000, 10_000, 100_000];

pub const END_OF_GENERATED_HEADER: &str = "// END OF GENERATED HEADER";
pub const MAX_GENERATED_EXPRESSIONS_FOR_ARRAY_CONSTRUCTOR: u32 = 20;

pub fn is_donated_name(name: &str) -> bool {
    name.starts_with(LIVE_PREFIX) || name.starts_with(DEAD_PREFIX)
}
