use alloc::format;
use alloc::rc::Rc;
use alloc::string::String;
use alloc::vec::Vec;

use crate::diagnostic::{DiagnosticKind, Redefinition};
use crate::include::{IncludeKind, IncludedFile};
use crate::lexer::{FileInput, Role};
use crate::preprocessor::{
    Input, Macro, Preprocessor, CPP_STYLE_LINE, SPIRV_INTRINSICS, TRACKED_EXTENSIONS,
};
use crate::source_map::SourceInfo;
use crate::token::{At, Kind, Token};

pub(crate) enum Skip {
    Token(Token),
    Elif,
}

impl Preprocessor<'_> {
    pub(crate) fn directive(&mut self) -> Token {
        let mut token = self.scan();
        if token.kind == Kind::Identifier {
            let name = token.text.clone();
            token = match &*name {
                "define" => self.define(),
                "else" => self.top_else(token),
                "elif" => self.top_elif(token),
                "endif" => self.top_endif(token),
                "if" => self.handle_if(),
                "ifdef" => self.ifdef(true),
                "ifndef" => self.ifdef(false),
                "line" => self.line(),
                "include" => self.include(token.at),
                "pragma" => self.pragma(token.at),
                "undef" => self.undef(),
                "error" => self.error_directive(),
                "version" => self.version_directive(),
                "extension" => self.extension(token.at),
                _ => {
                    let name = Some(String::from(&*name));
                    self.report(DiagnosticKind::InvalidDirective { name }, token.at);
                    token
                }
            };
        } else if !token.kind.ends_line() {
            self.report(DiagnosticKind::InvalidDirective { name: None }, token.at);
        }
        while !token.kind.ends_line() {
            token = self.scan();
        }
        token
    }

    fn reserved_check(&mut self, name: &str, directive: &'static str, at: At) {
        let spirv = self.extension_on(SPIRV_INTRINSICS);
        if name.starts_with("GL_") && !spirv {
            let name = String::from(name);
            self.report(DiagnosticKind::ReservedGlPrefix { name, directive }, at);
        } else if name == "defined" {
            self.report(DiagnosticKind::DefinedRedefined { directive }, at);
        } else if name.contains("__") && !spirv {
            let predefined = matches!(name, "__LINE__" | "__FILE__" | "__VERSION__");
            if self.is_es() && self.version.number >= 300 && predefined {
                let name = String::from(name);
                self.report(DiagnosticKind::PredefinedRedefined { name, directive }, at);
            } else if self.is_es() && self.version.number < 300 {
                let name = String::from(name);
                self.report(
                    DiagnosticKind::ReservedDoubleUnderscoreEs { name, directive },
                    at,
                );
            } else {
                let name = String::from(name);
                self.report(
                    DiagnosticKind::ReservedDoubleUnderscore { name, directive },
                    at,
                );
            }
        }
    }

    fn require_version_130(&mut self, feature: &'static str, at: At) {
        if !self.is_es() && self.version.number < 130 {
            self.report(
                DiagnosticKind::FeatureRequiresVersion {
                    feature,
                    version: 130,
                },
                at,
            );
        }
    }

    fn define(&mut self) -> Token {
        let name_token = self.scan();
        if name_token.kind != Kind::Identifier {
            self.report(
                DiagnosticKind::MissingMacroName {
                    directive: "#define",
                },
                name_token.at,
            );
            return name_token;
        }
        if self.source_number(name_token.at.source) >= 0 {
            self.reserved_check(&name_token.text, "#define", name_token.at);
        }
        let name = String::from(&*name_token.text);
        let define_at = name_token.at;
        let mut params: Vec<Rc<str>> = Vec::new();
        let mut function_like = false;
        let mut token = self.scan();
        if token.kind.is_op("(") && !token.space {
            function_like = true;
            loop {
                token = self.scan();
                if params.is_empty() && token.kind.is_op(")") {
                    break;
                }
                if token.kind != Kind::Identifier {
                    self.report(DiagnosticKind::BadMacroParameter, token.at);
                    return token;
                }
                if params.contains(&token.text) {
                    self.report(DiagnosticKind::DuplicateMacroParameter, token.at);
                } else {
                    params.push(token.text.clone());
                }
                token = self.scan();
                if !token.kind.is_op(",") {
                    break;
                }
            }
            if !token.kind.is_op(")") {
                self.report(DiagnosticKind::MissingParenthesis, token.at);
                return token;
            }
            token = self.scan();
        } else if !token.kind.ends_line() && !token.space {
            self.report(DiagnosticKind::MissingSpaceAfterMacroName, token.at);
            return token;
        }
        let mut body: Vec<Token> = Vec::new();
        let mut pending = 0usize;
        while !token.kind.ends_line() {
            if token.kind.is_op("#") {
                pending += 1;
            } else if pending == 0 {
                body.push(token);
            } else if pending == 1 {
                self.require_version_130("stringify (#)", token.at);
                let is_param = token.kind == Kind::Identifier && params.contains(&token.text);
                if !is_param {
                    self.report(DiagnosticKind::StringifyWithoutParameter, token.at);
                    return token;
                }
                body.push(Token::new(Kind::StringifyPush, token.at));
                let at = token.at;
                body.push(token);
                body.push(Token::new(Kind::StringifyPop, at));
                pending = 0;
            } else if pending.is_multiple_of(2) {
                self.require_version_130("token pasting (##)", token.at);
                for _ in 0..pending / 2 {
                    body.push(Token::new(Kind::Paste, At::default()));
                }
                body.push(token);
                pending = 0;
            } else {
                self.report(DiagnosticKind::PasteStringifyMix, token.at);
                return token;
            }
            token = self.scan();
        }
        if pending != 0 {
            self.report(DiagnosticKind::IncompletePaste, token.at);
        }
        let definition = Macro {
            params: Rc::from(params),
            body: Rc::from(body),
            function_like,
            busy: false,
            undef: false,
        };
        let watched = !self.in_preamble();
        if let Some(how) = self
            .macros
            .lookup(&name, watched)
            .and_then(|existing| redefinition(existing, &definition))
        {
            let name = name.clone();
            self.report(DiagnosticKind::MacroRedefined { name, how }, define_at);
        }
        self.record_macro(&name);
        self.macros.insert(name, definition, watched);
        Token::new(Kind::Newline, token.at)
    }

    fn undef(&mut self) -> Token {
        let token = self.scan();
        if token.kind != Kind::Identifier {
            self.report(
                DiagnosticKind::MissingMacroName {
                    directive: "#undef",
                },
                token.at,
            );
            return token;
        }
        self.reserved_check(&token.text, "#undef", token.at);
        self.record_macro(&token.text);
        if let Some(definition) = self.macros.get_mut(&token.text) {
            definition.undef = true;
        }
        let token = self.scan();
        if token.kind != Kind::Newline {
            self.report(DiagnosticKind::UndefExtraTokens, token.at);
        }
        token
    }

    fn extra_token_check(&mut self, directive: &'static str, mut token: Token) -> Token {
        if !token.kind.ends_line() {
            self.report(DiagnosticKind::ExtraTokens { directive }, token.at);
            while !token.kind.ends_line() {
                token = self.scan();
            }
        }
        token
    }

    fn top_else(&mut self, keyword: Token) -> Token {
        if self.else_seen(self.else_tracker) {
            self.report(DiagnosticKind::ElseAfterElse, keyword.at);
        }
        self.set_else_seen(self.else_tracker, true);
        if self.if_depth == 0 {
            self.report(
                DiagnosticKind::Mismatched { directive: "#else" },
                keyword.at,
            );
        }
        let next = self.scan();
        self.extra_token_check("#else", next);
        self.skip_then_continue(false)
    }

    fn top_elif(&mut self, keyword: Token) -> Token {
        if self.if_depth == 0 {
            self.report(
                DiagnosticKind::Mismatched { directive: "#elif" },
                keyword.at,
            );
        }
        if self.else_seen(self.else_tracker) {
            self.report(DiagnosticKind::ElifAfterElse, keyword.at);
        }
        let mut token = self.scan();
        while !token.kind.ends_line() {
            token = self.scan();
        }
        self.skip_then_continue(false)
    }

    fn top_endif(&mut self, keyword: Token) -> Token {
        if self.if_depth == 0 {
            self.report(
                DiagnosticKind::Mismatched {
                    directive: "#endif",
                },
                keyword.at,
            );
        } else {
            if self.else_tracker >= 0 {
                self.set_else_seen(self.else_tracker, false);
            }
            self.else_tracker -= 1;
            self.if_depth -= 1;
        }
        let next = self.scan();
        self.extra_token_check("#endif", next)
    }

    fn skip_then_continue(&mut self, match_else: bool) -> Token {
        match self.skip_group(match_else) {
            Skip::Token(token) => token,
            Skip::Elif => self.handle_if(),
        }
    }

    fn nesting_error(&mut self, directive: &'static str, at: At) -> Token {
        self.report(DiagnosticKind::NestingTooDeep { directive }, at);
        self.aborted = true;
        Token::new(Kind::End, at)
    }

    pub(crate) fn handle_if(&mut self) -> Token {
        loop {
            let token = self.scan();
            if self.nesting_exceeded() {
                return self.nesting_error("#if", token.at);
            }
            self.else_tracker += 1;
            self.if_depth += 1;
            let (value, error, token) = self.evaluate(token);
            let token = self.extra_token_check("#if", token);
            if value != 0 || error {
                return token;
            }
            match self.skip_group(true) {
                Skip::Token(token) => return token,
                Skip::Elif => {}
            }
        }
    }

    fn ifdef(&mut self, defined: bool) -> Token {
        let mut token = self.scan();
        let directive = if defined { "#ifdef" } else { "#ifndef" };
        if self.nesting_exceeded() {
            return self.nesting_error(directive, token.at);
        }
        self.else_tracker += 1;
        self.if_depth += 1;
        if token.kind != Kind::Identifier {
            self.report(DiagnosticKind::MissingMacroName { directive }, token.at);
            return token;
        }
        let is_defined = self
            .macros
            .get(&token.text)
            .is_some_and(|definition| !definition.undef);
        token = self.scan();
        if token.kind != Kind::Newline {
            self.report(DiagnosticKind::IfdefExtraTokens, token.at);
            while !token.kind.ends_line() {
                token = self.scan();
            }
        }
        if is_defined != defined {
            token = self.skip_then_continue(true);
        }
        token
    }

    pub(crate) fn skip_group(&mut self, match_else: bool) -> Skip {
        let mut depth = 0usize;
        let mut token = self.scan();
        while token.kind != Kind::End {
            if !token.kind.is_op("#") {
                while !token.kind.ends_line() {
                    token = self.scan();
                }
                if token.kind == Kind::End {
                    return Skip::Token(token);
                }
                token = self.scan();
                continue;
            }
            token = self.scan();
            if token.kind != Kind::Identifier {
                continue;
            }
            let name = token.text.clone();
            match &*name {
                "if" | "ifdef" | "ifndef" => {
                    depth += 1;
                    if self.nesting_exceeded() {
                        return Skip::Token(self.nesting_error("#if/#ifdef/#ifndef", token.at));
                    }
                    self.if_depth += 1;
                    self.else_tracker += 1;
                }
                "endif" => {
                    let next = self.scan();
                    token = self.extra_token_check("#endif", next);
                    if self.else_tracker >= 0 {
                        self.set_else_seen(self.else_tracker, false);
                    }
                    self.else_tracker -= 1;
                    if depth == 0 {
                        if self.if_depth > 0 {
                            self.if_depth -= 1;
                        }
                        break;
                    }
                    depth -= 1;
                    if self.if_depth > 0 {
                        self.if_depth -= 1;
                    }
                }
                "else" if match_else && depth == 0 => {
                    self.set_else_seen(self.else_tracker, true);
                    let next = self.scan();
                    token = self.extra_token_check("#else", next);
                    break;
                }
                "elif" if match_else && depth == 0 => {
                    if self.else_seen(self.else_tracker) {
                        self.report(DiagnosticKind::ElifAfterElse, token.at);
                    }
                    if self.if_depth > 0 {
                        self.if_depth -= 1;
                        self.set_else_seen(self.else_tracker, false);
                        self.else_tracker -= 1;
                    }
                    return Skip::Elif;
                }
                "else" => {
                    if self.else_seen(self.else_tracker) {
                        self.report(DiagnosticKind::ElseAfterElse, token.at);
                    } else {
                        self.set_else_seen(self.else_tracker, true);
                    }
                    let next = self.scan();
                    token = self.extra_token_check("#else", next);
                }
                "elif" => {
                    if self.else_seen(self.else_tracker) {
                        self.report(DiagnosticKind::ElifAfterElse, token.at);
                    }
                }
                _ => {}
            }
        }
        Skip::Token(token)
    }

    fn line(&mut self) -> Token {
        let mut token = self.scan();
        let directive_at = token.at;
        if token.kind == Kind::Newline {
            self.report(DiagnosticKind::LineWithoutNumber, token.at);
            return token;
        }
        self.disable_escapes = true;
        let (line_value, line_error, next) = self.evaluate(token);
        token = next;
        self.disable_escapes = false;
        if !line_error {
            let mut line = i64::from(line_value);
            if token.kind == Kind::Newline {
                line += 1;
            }
            if self.should_set_next_line() {
                line -= 1;
            }
            if let Some(file) = self.innermost_file_mut() {
                file.set_line(line);
            }
            if token.kind != Kind::Newline {
                if token.kind == Kind::String {
                    if !self.extension_on(CPP_STYLE_LINE) && !self.in_included_file() {
                        self.report(
                            DiagnosticKind::ExtensionRequired {
                                feature: "filename-based #line",
                                extension: "GL_GOOGLE_cpp_style_line_directive",
                            },
                            directive_at,
                        );
                    }
                    let name = Some(String::from(&*token.text));
                    self.set_current_source(None, name);
                    token = self.scan();
                } else {
                    let (number, error, next) = self.evaluate(token);
                    token = next;
                    if !error {
                        self.set_current_source(Some(i64::from(number)), None);
                    }
                }
            }
        }
        self.extra_token_check("#line", token)
    }

    fn set_current_source(&mut self, number: Option<i64>, name: Option<String>) {
        let current = self.current_at().source;
        let number = number.unwrap_or_else(|| self.source_number(current));
        let index = u32::try_from(self.sources.len()).unwrap_or(u32::MAX);
        self.sources.push(SourceInfo { number, name });
        if let Some(file) = self.innermost_file_mut() {
            file.source = index;
        }
    }

    fn include(&mut self, directive_at: At) -> Token {
        let context = self.scan_context();
        let mut header = None;
        let mut token = None;
        if let Some(Input::File(file)) = self.inputs.last_mut() {
            if let Some(delimiter @ ('<' | '"')) = file.skip_blanks(&context, &mut self.events) {
                file.consume_char(&context, &mut self.events);
                let closing = if delimiter == '<' { '>' } else { '"' };
                let kind = if delimiter == '<' {
                    IncludeKind::System
                } else {
                    IncludeKind::Local
                };
                header = file
                    .header_name(closing, &context, &mut self.events)
                    .map(|(name, too_long)| (name, too_long, kind));
            }
        }
        self.flush_events();
        if header.is_none() {
            token = Some(self.scan());
        }
        let Some((name, too_long, kind)) = header else {
            self.report(DiagnosticKind::IncludeWithoutHeaderName, directive_at);
            return token.unwrap_or_else(|| self.end_token());
        };
        if too_long {
            self.report(DiagnosticKind::HeaderNameTooLong, directive_at);
        }
        let token = self.scan();
        if token.kind != Kind::Newline {
            let header = name;
            if token.kind == Kind::End {
                self.report(
                    DiagnosticKind::IncludeMissingNewline { name: header },
                    token.at,
                );
            } else {
                self.report(
                    DiagnosticKind::IncludeExtraContent { name: header },
                    token.at,
                );
            }
            return token;
        }
        let from = self.innermost_file().map_or(self.root, |file| file.file);
        let depth = self.include_stack.len() + 1;
        match self.includer.include(&name, kind, from, depth) {
            Ok(included) => self.enter_include(included, name, directive_at),
            Err(error) => {
                let message = error.message;
                let name = format!("for header name: {name}");
                self.report(
                    DiagnosticKind::IncludeFailed { name, message },
                    directive_at,
                );
            }
        }
        token
    }

    fn enter_include(&mut self, included: IncludedFile, requested: String, at: At) {
        if self.includes_itself(included.file) {
            let name = requested;
            self.report(DiagnosticKind::RecursiveInclude { name }, at);
            return;
        }
        self.files.insert(included.file, included.name.clone());
        if self.included_once.contains(&included.file) || included.source.is_empty() {
            return;
        }
        let number = self.source_number(self.current_at().source);
        let index = u32::try_from(self.sources.len()).unwrap_or(u32::MAX);
        self.sources.push(SourceInfo {
            number,
            name: Some(included.name),
        });
        self.enter_include_stack(included.file);
        self.push_file(FileInput::new(
            included.file,
            Rc::from(included.source.as_str()),
            Role::Included,
            index,
        ));
    }

    fn pragma(&mut self, at: At) -> Token {
        let mut words: Vec<String> = Vec::new();
        let mut token = self.scan();
        while !token.kind.ends_line() {
            let mut word = String::new();
            token.spelling(&mut word);
            words.push(word);
            token = self.scan();
        }
        if token.kind == Kind::End {
            self.report(DiagnosticKind::PragmaWithoutNewline, at);
            return token;
        }
        if let [once] = words.as_slice() {
            if once == "once" {
                let file = self.innermost_file().map_or(self.root, |file| file.file);
                self.included_once.insert(file);
                return token;
            }
        }
        let mut text = String::from("#pragma");
        for word in &words {
            text.push(' ');
            text.push_str(word);
        }
        if !self.in_preamble() {
            self.output.directive(&text, at);
        }
        token
    }

    fn error_directive(&mut self) -> Token {
        self.disable_escapes = true;
        let mut token = self.scan();
        self.disable_escapes = false;
        let at = token.at;
        let mut message = String::new();
        while !token.kind.ends_line() {
            message.push_str(&token.name());
            message.push(' ');
            token = self.scan();
        }
        self.report(DiagnosticKind::ErrorDirective { message }, at);
        Token::new(Kind::Newline, token.at)
    }

    fn version_directive(&mut self) -> Token {
        let mut token = self.scan();
        if self.version_will_be_error || self.version_seen {
            self.report(DiagnosticKind::VersionNotFirst, token.at);
        }
        self.version_seen = true;
        if token.kind == Kind::Newline {
            self.report(DiagnosticKind::VersionWithoutNumber, token.at);
            return token;
        }
        if token.kind != Kind::IntConst {
            self.report(DiagnosticKind::VersionWithoutNumber, token.at);
        }
        let digits: String = token
            .text
            .chars()
            .take_while(char::is_ascii_digit)
            .collect();
        let number: i64 = digits.parse().unwrap_or(0);
        let at = token.at;
        token = self.scan();
        if token.kind == Kind::Newline {
            self.output.directive(&format!("#version {number}"), at);
            return token;
        }
        let profile = token.name();
        if !matches!(profile.as_str(), "core" | "compatibility" | "es") {
            self.report(DiagnosticKind::BadProfile, token.at);
        }
        self.output
            .directive(&format!("#version {number} {profile}"), at);
        token = self.scan();
        if token.kind != Kind::Newline {
            self.report(DiagnosticKind::VersionExtraTokens, token.at);
        }
        token
    }

    fn extension(&mut self, at: At) -> Token {
        let mut token = self.scan();
        if token.kind == Kind::Newline {
            self.report(DiagnosticKind::ExtensionNameMissing, token.at);
            return token;
        }
        if token.kind != Kind::Identifier {
            self.report(DiagnosticKind::ExtensionNameExpected, token.at);
        }
        let name = token.name();
        token = self.scan();
        if !token.kind.is_op(":") {
            self.report(DiagnosticKind::ExtensionColonMissing, token.at);
            return token;
        }
        token = self.scan();
        if token.kind != Kind::Identifier {
            self.report(DiagnosticKind::ExtensionBehaviorMissing, token.at);
            return token;
        }
        let behavior = String::from(&*token.text);
        self.update_extension(&name, &behavior, at);
        if !self.in_preamble() {
            self.output
                .directive(&format!("#extension {name} : {behavior}"), at);
        }
        token = self.scan();
        if token.kind != Kind::Newline {
            self.report(DiagnosticKind::ExtensionExtraTokens, token.at);
        }
        token
    }

    fn update_extension(&mut self, name: &str, behavior: &str, at: At) {
        let on = match behavior {
            "require" | "enable" | "warn" => true,
            "disable" => false,
            _ => {
                let behavior = String::from(behavior);
                self.report(DiagnosticKind::ExtensionBehaviorUnknown { behavior }, at);
                return;
            }
        };
        self.record_extensions();
        if name == "all" {
            if matches!(behavior, "require" | "enable") {
                self.report(DiagnosticKind::ExtensionAllEnabled, at);
            } else {
                self.extensions = [on; crate::preprocessor::TRACKED_EXTENSIONS.len()];
            }
        } else if let Some(index) = TRACKED_EXTENSIONS.iter().position(|known| *known == name) {
            if let Some(slot) = self.extensions.get_mut(index) {
                *slot = on;
            }
        }
        if matches!(
            name,
            "GL_GOOGLE_include_directive" | "GL_ARB_shading_language_include"
        ) {
            if let Some(slot) = self.extensions.get_mut(CPP_STYLE_LINE) {
                *slot = on;
            }
        }
    }
}

fn redefinition(existing: &Macro, definition: &Macro) -> Option<Redefinition> {
    if existing.undef {
        return None;
    }
    if existing.function_like != definition.function_like {
        return Some(Redefinition::FunctionLikeVersusObjectLike);
    }
    if existing.params.len() != definition.params.len() {
        return Some(Redefinition::ParameterCount);
    }
    if existing.params != definition.params {
        return Some(Redefinition::ParameterNames);
    }
    let mut old = existing.body.iter();
    let mut new = definition.body.iter();
    let mut first = true;
    loop {
        match (old.next(), new.next()) {
            (None, None) => return None,
            (Some(old), Some(new)) => {
                let mut new = new.clone();
                if first {
                    new.space = old.space;
                    first = false;
                }
                if !old.same_replacement(&new) {
                    return Some(Redefinition::Substitution);
                }
            }
            _ => return Some(Redefinition::Substitution),
        }
    }
}
