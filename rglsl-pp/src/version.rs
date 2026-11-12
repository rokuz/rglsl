use alloc::vec::Vec;

use crate::options::{Options, Stage};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Profile {
    Core,
    Compatibility,
    Es,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct VersionDirective {
    pub number: u32,
    pub profile: Option<Profile>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct Version {
    pub number: u32,
    pub profile: Option<Profile>,
    pub directive: Option<VersionDirective>,
}

impl Version {
    pub fn is_es(&self) -> bool {
        self.profile == Some(Profile::Es)
    }
}

pub(crate) struct ScannedVersion {
    pub(crate) directive: Option<VersionDirective>,
    pub(crate) not_first: bool,
    pub(crate) not_first_token: bool,
}

struct Raw<'a> {
    bytes: &'a [u8],
    pos: usize,
}

impl Raw<'_> {
    fn peek(&self) -> Option<u8> {
        self.bytes.get(self.pos).copied()
    }

    fn get(&mut self) -> Option<u8> {
        let byte = self.peek()?;
        self.pos += 1;
        Some(byte)
    }

    fn consume_whitespace(&mut self, found_non_space_tab: &mut bool) {
        while let Some(byte @ (b' ' | b'\t' | b'\r' | b'\n')) = self.peek() {
            if matches!(byte, b'\r' | b'\n') {
                *found_non_space_tab = true;
            }
            self.pos += 1;
        }
    }

    fn consume_comment(&mut self) -> bool {
        if self.peek() != Some(b'/') {
            return false;
        }
        self.pos += 1;
        match self.peek() {
            Some(b'/') => {
                self.pos += 1;
                let mut byte = self.get();
                loop {
                    while byte.is_some_and(|byte| !matches!(byte, b'\\' | b'\r' | b'\n')) {
                        byte = self.get();
                    }
                    if matches!(byte, None | Some(b'\r' | b'\n')) {
                        while matches!(byte, Some(b'\r' | b'\n')) {
                            byte = self.get();
                        }
                        break;
                    }
                    byte = self.get();
                    if byte == Some(b'\r') && self.peek() == Some(b'\n') {
                        self.pos += 1;
                    }
                    byte = self.get();
                }
                if byte.is_some() {
                    self.pos -= 1;
                }
                true
            }
            Some(b'*') => {
                self.pos += 1;
                let mut byte = self.get();
                loop {
                    while byte.is_some_and(|byte| byte != b'*') {
                        byte = self.get();
                    }
                    if byte == Some(b'*') {
                        byte = self.get();
                        if byte == Some(b'/') {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                true
            }
            _ => {
                self.pos -= 1;
                false
            }
        }
    }

    fn consume_whitespace_comment(&mut self, found_non_space_tab: &mut bool) {
        loop {
            self.consume_whitespace(found_non_space_tab);
            if self.peek() != Some(b'/') {
                return;
            }
            *found_non_space_tab = true;
            if !self.consume_comment() {
                return;
            }
        }
    }
}

pub(crate) fn scan_version(source: &str) -> ScannedVersion {
    let mut raw = Raw {
        bytes: source.as_bytes(),
        pos: 0,
    };
    let mut not_first = false;
    let mut not_first_token = false;
    let mut found_non_space_tab = false;
    let mut in_middle = false;
    loop {
        if in_middle {
            not_first_token = true;
            if !matches!(raw.peek(), Some(b'\n' | b'\r')) {
                while raw.get().is_some_and(|byte| !matches!(byte, b'\n' | b'\r')) {}
            }
            while matches!(raw.peek(), Some(b'\n' | b'\r')) {
                raw.pos += 1;
            }
            if raw.peek().is_none() {
                return ScannedVersion {
                    directive: None,
                    not_first: true,
                    not_first_token,
                };
            }
        }
        in_middle = true;
        raw.consume_whitespace_comment(&mut found_non_space_tab);
        if found_non_space_tab {
            not_first = true;
        }
        if raw.get() != Some(b'#') {
            not_first = true;
            continue;
        }
        let mut byte = raw.get();
        while matches!(byte, Some(b' ' | b'\t')) {
            byte = raw.get();
        }
        let mut keyword_matches = byte == Some(b'v');
        for expected in *b"ersion" {
            if keyword_matches && raw.get() != Some(expected) {
                keyword_matches = false;
            }
        }
        if !keyword_matches {
            not_first = true;
            continue;
        }
        byte = raw.get();
        while matches!(byte, Some(b' ' | b'\t')) {
            byte = raw.get();
        }
        let mut number: u64 = 0;
        while let Some(digit @ b'0'..=b'9') = byte {
            if number <= u64::from(i32::MAX.unsigned_abs()) {
                number = number * 10 + u64::from(digit - b'0');
            }
            byte = raw.get();
        }
        let number =
            u32::try_from(number.min(u64::from(i32::MAX.unsigned_abs()))).unwrap_or(u32::MAX);
        if number == 0 {
            not_first = true;
            continue;
        }
        while matches!(byte, Some(b' ' | b'\t')) {
            byte = raw.get();
        }
        let mut profile_text = Vec::new();
        while profile_text.len() < 13 {
            match byte {
                None | Some(b' ' | b'\t' | b'\n' | b'\r') => break,
                Some(character) => {
                    profile_text.push(character);
                    byte = raw.get();
                }
            }
        }
        if !matches!(byte, None | Some(b' ' | b'\t' | b'\n' | b'\r')) {
            not_first = true;
            continue;
        }
        let profile = match profile_text.as_slice() {
            b"es" => Some(Profile::Es),
            b"core" => Some(Profile::Core),
            b"compatibility" => Some(Profile::Compatibility),
            _ => None,
        };
        return ScannedVersion {
            directive: Some(VersionDirective { number, profile }),
            not_first,
            not_first_token,
        };
    }
}

pub fn find_version(source: &str) -> Option<VersionDirective> {
    scan_version(source).directive
}

pub fn version_check(source: &str, options: &Options) -> (Version, Vec<&'static str>) {
    let scanned = scan_version(source.strip_prefix('\u{feff}').unwrap_or(source));
    let mut errors = Vec::new();
    let version = deduce(&scanned, options, &mut errors);
    (version, errors)
}

pub(crate) fn deduce(
    scanned: &ScannedVersion,
    options: &Options,
    errors: &mut Vec<&'static str>,
) -> Version {
    let mut number = scanned
        .directive
        .map_or(options.default_version, |directive| directive.number);
    let written = scanned.directive.and_then(|directive| directive.profile);
    let mut profile = match written {
        None => match number {
            300 | 310 | 320 => {
                errors.push(
                    "#version: versions 300, 310, and 320 require specifying the 'es' profile",
                );
                Some(Profile::Es)
            }
            100 => Some(Profile::Es),
            150.. => Some(Profile::Core),
            _ => None,
        },
        Some(written) => {
            if number < 150 {
                errors.push("#version: versions before 150 do not allow a profile token");
                if number == 100 {
                    Some(Profile::Es)
                } else {
                    None
                }
            } else if matches!(number, 300 | 310 | 320) {
                if written != Profile::Es {
                    errors.push("#version: versions 300, 310, and 320 support only the es profile");
                }
                Some(Profile::Es)
            } else if written == Profile::Es {
                errors.push("#version: only version 300, 310, and 320 support the es profile");
                if number >= 150 {
                    Some(Profile::Core)
                } else {
                    None
                }
            } else {
                Some(written)
            }
        }
    };
    let es = |profile: Option<Profile>| profile == Some(Profile::Es);
    if !matches!(
        number,
        100 | 300
            | 310
            | 320
            | 110
            | 120
            | 130
            | 140
            | 150
            | 330
            | 400
            | 410
            | 420
            | 430
            | 440
            | 450
            | 460
    ) {
        errors.push("version not supported");
        if es(profile) {
            number = 310;
        } else {
            number = 450;
            profile = Some(Profile::Core);
        }
    }
    match options.stage {
        Some(Stage::Geometry | Stage::TessControl | Stage::TessEvaluation) => {
            if (es(profile) && number < 310) || (!es(profile) && number < 150) {
                let geometry = options.stage == Some(Stage::Geometry);
                errors.push(if geometry {
                    "#version: geometry shaders require es profile with version 310 or non-es profile with version 150 or above"
                } else {
                    "#version: tessellation shaders require es profile with version 310 or non-es profile with version 150 or above"
                });
                number = match (es(profile), geometry) {
                    (true, _) => 310,
                    (false, true) => 150,
                    (false, false) => 400,
                };
                if es(profile) || profile.is_none() {
                    profile = Some(Profile::Core);
                }
            }
        }
        Some(Stage::Compute) => {
            if (es(profile) && number < 310) || (!es(profile) && number < 420) {
                errors.push("#version: compute shaders require es profile with version 310 or above, or non-es profile with version 420 or above");
                number = if es(profile) { 310 } else { 420 };
            }
        }
        Some(
            Stage::RayGeneration
            | Stage::Intersection
            | Stage::AnyHit
            | Stage::ClosestHit
            | Stage::Miss
            | Stage::Callable,
        ) => {
            if es(profile) || number < 460 {
                errors.push("#version: ray tracing shaders require non-es profile with version 460 or above");
                number = 460;
            }
        }
        Some(Stage::Mesh | Stage::Task) => {
            if (es(profile) && number < 320) || (!es(profile) && number < 450) {
                errors.push("#version: mesh/task shaders require es profile with version 320 or above, or non-es profile with version 450 or above");
                number = if es(profile) { 320 } else { 450 };
            }
        }
        Some(Stage::Vertex | Stage::Fragment) | None => {}
    }
    if es(profile) && number >= 300 && scanned.not_first {
        errors.push("#version: statement must appear first in es-profile shader; before comments or newlines");
    }
    let spirv = options.vulkan_client_version.is_some() || options.gl_spirv;
    if spirv {
        match profile {
            Some(Profile::Es) => {
                if number < 310 {
                    errors.push("#version: ES shaders for SPIR-V require version 310 or higher");
                    number = 310;
                }
            }
            Some(Profile::Compatibility) => {
                errors.push(
                    "#version: compilation for SPIR-V does not support the compatibility profile",
                );
            }
            Some(Profile::Core) | None => {
                if options.vulkan_client_version.is_some() && number < 140 {
                    errors.push(
                        "#version: Desktop shaders for Vulkan SPIR-V require version 140 or higher",
                    );
                    number = 140;
                }
                if options.gl_spirv && number < 330 {
                    errors.push(
                        "#version: Desktop shaders for OpenGL SPIR-V require version 330 or higher",
                    );
                    number = 330;
                }
            }
        }
    }
    Version {
        number,
        profile,
        directive: scanned.directive,
    }
}
