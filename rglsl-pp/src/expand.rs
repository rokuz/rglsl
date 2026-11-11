use alloc::format;
use alloc::rc::Rc;
use alloc::string::String;
use alloc::vec::Vec;

use crate::diagnostic::DiagnosticKind;
use crate::preprocessor::{Input, MacroInput, Preprocessor, Scanned, TokenInput, CPP_STYLE_LINE};
use crate::token::{operator, At, Kind, Token, MAX_TOKEN_LENGTH};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum Expand {
    NotStarted,
    Error,
    Started,
    Undef,
}

const PASTE_LEFT: [&str; 18] = [
    "=", "!", "-", "~", "+", "*", "/", "%", "<", ">", "|", "^", "&", ">>", "<<", "&&", "||", "^^",
];

fn empty_stream() -> Rc<[Token]> {
    Rc::from(Vec::new())
}

const fn continues_paste(kind: Kind) -> bool {
    matches!(
        kind,
        Kind::IntConst | Kind::Number | Kind::String | Kind::Identifier
    )
}

fn paste_name(token: &Token) -> String {
    match token.kind {
        Kind::Identifier | Kind::IntConst | Kind::Number | Kind::String => {
            String::from(&*token.text)
        }
        _ => String::new(),
    }
}

fn atom_name(token: &Token) -> String {
    match token.kind {
        Kind::Op(op) => String::from(op),
        _ => String::from("<bad token>"),
    }
}

#[derive(Debug)]
struct FoundMacro {
    name: Rc<str>,
    params: Rc<[Rc<str>]>,
    body: Rc<[Token]>,
    function_like: bool,
}

impl Preprocessor<'_> {
    pub(crate) fn scan_macro(&mut self, index: usize, current: At) -> Scanned {
        let Some(Input::Macro(input)) = self.inputs.get_mut(index) else {
            return Scanned::Token(Token::new(Kind::End, current));
        };
        let Some(mut token) = input.body.get(input.pos).cloned() else {
            let name = input.name.clone();
            if let Some(definition) = self.macros.get_mut(&*name) {
                definition.busy = false;
            }
            return Scanned::Token(Token::new(Kind::End, current));
        };
        input.pos += 1;
        let mut pasting = false;
        if input.postpaste {
            pasting = true;
            input.postpaste = false;
        }
        if input.prepaste {
            input.prepaste = false;
            input.postpaste = true;
        }
        if input
            .body
            .get(input.pos)
            .is_some_and(|next| next.kind == Kind::Paste)
        {
            input.prepaste = true;
            pasting = true;
        }
        if token.kind == Kind::Identifier {
            if let Some(parameter) = input
                .params
                .iter()
                .rposition(|parameter| **parameter == *token.text)
            {
                let expanded = input.expanded.get(parameter).cloned().flatten();
                let pre_expanded = expanded.is_some() && !pasting;
                let stream = match expanded {
                    Some(expanded) if !pasting => expanded,
                    _ => input
                        .args
                        .get(parameter)
                        .cloned()
                        .unwrap_or_else(empty_stream),
                };
                let last_pastes = input.prepaste;
                self.inputs.push(Input::Tokens(TokenInput {
                    tokens: stream,
                    pos: 0,
                    last_pastes,
                    pre_expanded,
                }));
                return Scanned::Retry;
            }
        }
        let (file, offset) = input.origin;
        token.at = At {
            file,
            offset,
            exact: 0,
            ..current
        };
        token.fully_expanded = false;
        Scanned::Token(token)
    }

    fn peek_pasting(&self) -> bool {
        match self.inputs.last() {
            Some(Input::Macro(input)) => input.prepaste,
            Some(Input::Tokens(input)) => {
                input
                    .tokens
                    .get(input.pos)
                    .is_some_and(|next| next.kind == Kind::Paste)
                    || (input.last_pastes && input.pos >= input.tokens.len())
            }
            _ => false,
        }
    }

    fn peek_continued_pasting(&self, result: Kind) -> bool {
        if result != Kind::Identifier {
            return false;
        }
        let next = match self.inputs.last() {
            Some(Input::Macro(input)) => input.body.get(input.pos),
            Some(Input::Tokens(input)) => input.tokens.get(input.pos),
            _ => None,
        };
        next.is_some_and(|next| !next.space && continues_paste(next.kind))
    }

    fn end_of_replacement_list(&self) -> bool {
        match self.inputs.last() {
            None => true,
            Some(Input::Macro(input)) => input.pos >= input.body.len(),
            Some(_) => false,
        }
    }

    pub(crate) fn is_macro_input(&self) -> bool {
        matches!(self.inputs.last(), Some(Input::Macro(_)))
    }

    pub(crate) fn paste(&mut self, mut token: Token) -> Token {
        if token.kind == Kind::Paste {
            self.report(DiagnosticKind::PasteAtStart, token.at);
            return self.scan();
        }
        let mut result = token.kind;
        while self.peek_pasting() {
            self.scan();
            if self.end_of_replacement_list() {
                self.report(DiagnosticKind::PasteAtEndOfReplacement, token.at);
                break;
            }
            loop {
                let pasted = self.scan();
                if pasted.kind == Kind::Marker {
                    self.report(DiagnosticKind::PasteAtEndOfArgument, token.at);
                    token.kind = result;
                    return token;
                }
                let (left, right) = match result {
                    Kind::Identifier => (String::from(&*token.text), paste_name(&pasted)),
                    Kind::Op(op) if PASTE_LEFT.contains(&op) => {
                        (String::from(op), atom_name(&pasted))
                    }
                    _ => {
                        self.report(DiagnosticKind::PasteNotSupported, token.at);
                        token.kind = result;
                        return token;
                    }
                };
                if left.len() + right.len() > MAX_TOKEN_LENGTH {
                    self.report(DiagnosticKind::PasteTooLong, token.at);
                    token.kind = result;
                    return token;
                }
                let combined = format!("{left}{right}");
                if result == Kind::Identifier {
                    token.text = Rc::from(combined.as_str());
                } else {
                    match operator(&combined) {
                        Some(op) => result = Kind::Op(op),
                        None => self.report(DiagnosticKind::PasteInvalid, token.at),
                    }
                }
                token.at.exact = 0;
                if !self.peek_continued_pasting(result) {
                    break;
                }
            }
        }
        token.kind = result;
        token
    }

    pub(crate) fn macro_expand(
        &mut self,
        token: &mut Token,
        expand_undef: bool,
        newline_ok: bool,
    ) -> Expand {
        token.space = false;
        if self.expand_depth >= self.options.limits.max_macro_expansion_depth {
            let name = String::from(&*token.text);
            self.report(DiagnosticKind::ExpansionTooDeep { name }, token.at);
            return Expand::NotStarted;
        }
        self.expand_depth += 1;
        let result = self.macro_expand_inner(token, expand_undef, newline_ok);
        self.expand_depth -= 1;
        result
    }

    fn unget_number(&mut self, token: &Token, text: &str, value: i64) {
        let mut number = token.clone();
        number.kind = Kind::IntConst;
        number.text = Rc::from(text);
        number.value = value;
        number.at.exact = 0;
        self.inputs.push(Input::Ungot(Some(number)));
    }

    fn macro_expand_inner(
        &mut self,
        token: &mut Token,
        expand_undef: bool,
        newline_ok: bool,
    ) -> Expand {
        if token.fully_expanded {
            return Expand::NotStarted;
        }
        if let Some(expand) = self.builtin_macro(token) {
            return expand;
        }
        match self.lookup_macro(token, expand_undef) {
            Ok(found) => self.start_macro(token.at, found, newline_ok),
            Err(expand) => expand,
        }
    }

    fn builtin_macro(&mut self, token: &Token) -> Option<Expand> {
        match &*token.text {
            "__LINE__" => {
                let line = if token.value == 0 {
                    self.current_at().line
                } else {
                    token.value
                };
                self.unget_number(token, &format!("{line}"), line);
                Some(Expand::Started)
            }
            "__FILE__" => {
                let current = self.current_at();
                if self.source_name(current.source).is_some()
                    && !self.extension_on(CPP_STYLE_LINE)
                    && !self.in_included_file()
                {
                    self.report(
                        DiagnosticKind::ExtensionRequired {
                            feature: "filename-based __FILE__",
                            extension: "GL_GOOGLE_cpp_style_line_directive",
                        },
                        token.at,
                    );
                }
                let number = self.source_number(current.source);
                let text = match self.source_name(token.at.source) {
                    Some(name) => format!("\"{name}\""),
                    None => format!("{}", self.source_number(token.at.source)),
                };
                self.unget_number(token, &text, number);
                Some(Expand::Started)
            }
            "__VERSION__" => {
                let number = self.version.number;
                self.unget_number(token, &format!("{number}"), i64::from(number));
                Some(Expand::Started)
            }
            _ => None,
        }
    }

    fn lookup_macro(
        &mut self,
        token: &mut Token,
        expand_undef: bool,
    ) -> Result<FoundMacro, Expand> {
        let name: Rc<str> = token.text.clone();
        let definition = match self.macros.get_mut(&*name) {
            Some(definition) if definition.busy => {
                token.fully_expanded = true;
                return Err(Expand::NotStarted);
            }
            Some(definition) if !definition.undef => definition,
            _ => {
                if !expand_undef {
                    return Err(Expand::NotStarted);
                }
                self.inputs.push(Input::Zero(false));
                return Err(Expand::Undef);
            }
        };
        let params = definition.params.clone();
        let body = definition.body.clone();
        let function_like = definition.function_like;
        Ok(FoundMacro {
            name,
            params,
            body,
            function_like,
        })
    }

    fn start_macro(&mut self, at: At, found: FoundMacro, newline_ok: bool) -> Expand {
        let FoundMacro {
            name,
            params,
            body,
            function_like,
        } = found;
        let mut args: Vec<Rc<[Token]>> = Vec::new();
        let mut expanded: Vec<Option<Rc<[Token]>>> = Vec::new();
        if function_like {
            match self.macro_arguments(&name, params.len(), at, newline_ok) {
                Ok(collected) => args = collected,
                Err(expand) => return expand,
            }
            for arg in &args {
                expanded.push(self.prescan(arg.clone(), newline_ok));
            }
        }
        self.push_macro(MacroInput {
            name,
            body,
            pos: 0,
            params,
            args,
            expanded,
            prepaste: false,
            postpaste: false,
            origin: (at.file, at.offset),
        });
        Expand::Started
    }

    fn macro_arguments(
        &mut self,
        name: &str,
        count: usize,
        at: At,
        newline_ok: bool,
    ) -> Result<Vec<Rc<[Token]>>, Expand> {
        let mut paren = self.scan();
        if newline_ok {
            while paren.kind == Kind::Newline {
                paren = self.scan();
            }
        }
        if !paren.kind.is_op("(") {
            self.inputs.push(Input::Ungot(Some(paren)));
            return Err(Expand::NotStarted);
        }
        match self.collect_arguments(name, count, at, newline_ok) {
            Some(collected) => Ok(collected.into_iter().map(Rc::from).collect()),
            None => Err(Expand::Error),
        }
    }

    fn push_macro(&mut self, input: MacroInput) {
        let name = input.name.clone();
        self.inputs.push(Input::Macro(input));
        if let Some(definition) = self.macros.get_mut(&*name) {
            definition.busy = true;
        }
    }

    fn collect_arguments(
        &mut self,
        name: &str,
        count: usize,
        at: At,
        newline_ok: bool,
    ) -> Option<Vec<Vec<Token>>> {
        let mut args: Vec<Vec<Token>> = (0..count).map(|_| Vec::new()).collect();
        let mut arg = 0usize;
        let mut recorded = false;
        let mut token;
        loop {
            let mut nest = 0usize;
            loop {
                token = self.scan();
                match token.kind {
                    Kind::End | Kind::Marker => {
                        let name = String::from(name);
                        self.report(DiagnosticKind::MacroEndOfInput { name }, at);
                        return None;
                    }
                    Kind::Newline => {
                        if !newline_ok {
                            let name = String::from(name);
                            self.report(DiagnosticKind::MacroEndOfLine { name }, at);
                            return None;
                        }
                        continue;
                    }
                    Kind::Op("#") => {
                        let name = String::from(name);
                        self.report(DiagnosticKind::MacroUnexpectedHash { name }, token.at);
                        return None;
                    }
                    _ => {}
                }
                if count == 0 && !token.kind.is_op(")") {
                    break;
                }
                if nest == 0 && (token.kind.is_op(",") || token.kind.is_op(")")) {
                    break;
                }
                if token.kind.is_op("(") {
                    nest += 1;
                } else if nest > 0 && token.kind.is_op(")") {
                    nest -= 1;
                }
                if token.is_identifier("__LINE__") {
                    token.value = self.current_at().line;
                }
                if let Some(current) = args.get_mut(arg) {
                    current.push(token);
                }
                recorded = true;
            }
            if token.kind.is_op(")") {
                if count == 1 && !recorded {
                    break;
                }
                arg += 1;
                break;
            }
            arg += 1;
            if arg >= count {
                break;
            }
        }
        if arg < count {
            let name = String::from(name);
            self.report(DiagnosticKind::TooFewArguments { name }, at);
        } else if !token.kind.is_op(")") {
            let mut depth = 0isize;
            while token.kind != Kind::End && (depth > 0 || !token.kind.is_op(")")) {
                if token.kind.is_op(")") || token.kind.is_op("}") {
                    depth -= 1;
                }
                token = self.scan();
                if token.kind.is_op("(") || token.kind.is_op("{") {
                    depth += 1;
                }
            }
            let name = String::from(name);
            if token.kind == Kind::End {
                self.report(DiagnosticKind::MacroEndOfInput { name }, at);
                return None;
            }
            self.report(DiagnosticKind::TooManyArguments { name }, at);
        }
        Some(args)
    }

    fn prescan(&mut self, arg: Rc<[Token]>, newline_ok: bool) -> Option<Rc<[Token]>> {
        self.inputs.push(Input::Marker(false));
        self.inputs.push(Input::Tokens(TokenInput {
            tokens: arg,
            pos: 0,
            last_pastes: false,
            pre_expanded: false,
        }));
        let mut expanded = Vec::new();
        let mut token;
        loop {
            token = self.scan();
            if matches!(token.kind, Kind::Marker | Kind::End) {
                break;
            }
            token = self.paste(token);
            if token.kind == Kind::Identifier {
                match self.macro_expand(&mut token, false, newline_ok) {
                    Expand::NotStarted => {}
                    Expand::Error => loop {
                        token = self.scan();
                        if matches!(token.kind, Kind::Marker | Kind::End) {
                            break;
                        }
                    },
                    Expand::Started | Expand::Undef => continue,
                }
            }
            if matches!(token.kind, Kind::Marker | Kind::End) {
                break;
            }
            expanded.push(token);
        }
        if token.kind == Kind::Marker {
            Some(Rc::from(expanded))
        } else {
            None
        }
    }
}
