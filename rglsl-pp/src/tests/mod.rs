mod conditionals;
mod directives;
mod includes;
mod lexing;
mod macros;
mod robustness;
mod source_map;

use alloc::rc::Rc;
use alloc::string::String;
use alloc::vec::Vec;

use crate::lexer::{Events, FileInput, Role, ScanContext};
use crate::token::Kind;
use crate::{preprocess, DiagnosticKind, FileId, MemoryIncluder, Options, Preprocessed, Severity};

pub(crate) fn run(source: &str) -> Preprocessed {
    run_with(source, &Options::default())
}

pub(crate) fn run_with(source: &str, options: &Options) -> Preprocessed {
    let mut includer = MemoryIncluder::new();
    let root = includer.add_file("main.frag", source);
    preprocess(source, root, options, &mut includer)
}

pub(crate) fn lex(text: &str) -> Vec<String> {
    let context = ScanContext {
        continuation_allowed: true,
        if_depth: 1,
        disable_escapes: false,
    };
    let mut events = Events::new();
    let mut input = FileInput::new(FileId(0), Rc::from(text), Role::Root, 0);
    let mut words = Vec::new();
    loop {
        let token = input.scan(&context, &mut events);
        match token.kind {
            Kind::End => break,
            Kind::Newline => {}
            _ => {
                let mut word = String::new();
                token.spelling(&mut word);
                words.push(word);
            }
        }
    }
    words
}

pub(crate) fn code(text: &str) -> Vec<String> {
    let body: Vec<&str> = text
        .lines()
        .filter(|line| !line.trim_start().starts_with('#'))
        .collect();
    lex(&body.join("\n"))
}

pub(crate) fn expect_code(source: &str, expected: &str) {
    let result = run(source);
    assert!(
        result.errors().next().is_none(),
        "unexpected errors {:?} for\n{source}\noutput:\n{}",
        result.diagnostics,
        result.text
    );
    assert_eq!(
        code(&result.text),
        lex(expected),
        "output:\n{}",
        result.text
    );
}

pub(crate) fn errors(result: &Preprocessed) -> Vec<DiagnosticKind> {
    result
        .diagnostics
        .iter()
        .filter(|diagnostic| diagnostic.severity() == Severity::Error)
        .map(|diagnostic| diagnostic.kind.clone())
        .collect()
}

pub(crate) fn warnings(result: &Preprocessed) -> Vec<DiagnosticKind> {
    result
        .diagnostics
        .iter()
        .filter(|diagnostic| diagnostic.severity() == Severity::Warning)
        .map(|diagnostic| diagnostic.kind.clone())
        .collect()
}

pub(crate) fn first_error(source: &str) -> (DiagnosticKind, u32) {
    let result = run(source);
    let first = result
        .errors()
        .next()
        .map(|diagnostic| (diagnostic.kind.clone(), diagnostic.line));
    match first {
        Some(first) => first,
        None => panic!("expected an error for\n{source}\noutput:\n{}", result.text),
    }
}

pub(crate) fn line_of(result: &Preprocessed, needle: &str) -> u32 {
    let offset = match result.text.find(needle) {
        Some(offset) => offset,
        None => panic!("`{needle}` not in output:\n{}", result.text),
    };
    result.source_map.line(offset).1
}
