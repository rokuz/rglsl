use alloc::string::String;

use rglsl_types::extension::Extension;

use crate::options::Options;
use crate::version::Version;

const PROFILE: [&str; 2] = ["GL_core_profile", "GL_FRAGMENT_PRECISION_HIGH"];

pub(crate) fn macros(
    version: &Version,
    options: &Options,
) -> impl Iterator<Item = (&'static str, u32)> {
    Extension::predefined_at(version.number)
        .map(Extension::name)
        .chain(PROFILE)
        .map(|name| (name, 1))
        .chain(
            options
                .vulkan_client_version
                .map(|vulkan| ("VULKAN", vulkan)),
        )
        .chain(
            options
                .stage
                .map(|stage| (crate::options::macro_name(stage), 1)),
        )
}

pub(crate) fn user_defines(options: &Options) -> String {
    let mut text = String::new();
    for user in &options.defines {
        text.push_str("#define ");
        text.push_str(&user.name);
        if let Some(value) = &user.value {
            text.push(' ');
            text.push_str(value);
        }
        text.push('\n');
    }
    text
}
