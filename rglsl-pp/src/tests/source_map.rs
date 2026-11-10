use super::{errors, run};
use crate::lexer::{Events, FileInput, Role, ScanContext};
use crate::token::Kind;
use crate::{FileId, Preprocessed};

fn tokens_with_offsets(text: &str) -> alloc::vec::Vec<(alloc::string::String, usize)> {
    let context = ScanContext {
        continuation_allowed: true,
        if_depth: 1,
        disable_escapes: false,
    };
    let mut events = Events::new();
    let mut input = FileInput::new(FileId(0), alloc::rc::Rc::from(text), Role::Root, 0);
    let mut tokens = alloc::vec::Vec::new();
    loop {
        let token = input.scan(&context, &mut events);
        match token.kind {
            Kind::End => break,
            Kind::Newline => {}
            _ => {
                let mut word = alloc::string::String::new();
                token.spelling(&mut word);
                tokens.push((word, usize::try_from(token.at.offset).unwrap_or(0)));
            }
        }
    }
    tokens
}

fn located_text<'a>(
    result: &Preprocessed,
    source: &'a str,
    offset: usize,
    length: usize,
) -> &'a str {
    let location = result.source_map.locate(offset);
    let start = usize::try_from(location.offset).unwrap_or(0);
    source.get(start..start + length).unwrap_or("")
}

fn find(text: &str, needle: &str) -> usize {
    match text.find(needle) {
        Some(offset) => offset,
        None => panic!("`{needle}` not found in\n{text}"),
    }
}

#[test]
fn tokens_without_macros_map_back_to_their_text() {
    let source = "#version 450\n// comment\nlayout(location = 0) out vec4 color;\n\n#extension GL_EXT_foo : enable\n/* block */ void main() {\n    color = vec4(1.0, 0.5e2, 0x1F, 0);\n#if 1\n    float x = color.x * 2.0;\n#endif\n}\n";
    let result = run(source);
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    for (word, offset) in tokens_with_offsets(&result.text) {
        let line_start = result
            .text
            .get(..offset)
            .unwrap_or("")
            .rfind('\n')
            .map_or(0, |index| index + 1);
        if result
            .text
            .get(line_start..)
            .is_some_and(|line| line.starts_with('#'))
        {
            continue;
        }
        assert_eq!(located_text(&result, source, offset, word.len()), word);
        if word.len() > 2 {
            let inner = located_text(&result, source, offset + 1, word.len() - 1);
            assert_eq!(inner, word.get(1..).unwrap_or(""));
        }
        let (file, line) = result.source_map.line(offset);
        assert_eq!(file, FileId(0));
        let location = result.source_map.locate(offset);
        let start = usize::try_from(location.offset).unwrap_or(0);
        let physical = source.get(..start).unwrap_or("").matches('\n').count() + 1;
        assert_eq!(usize::try_from(line).unwrap_or(0), physical, "{word}");
    }
}

#[test]
fn output_lines_match_input_lines_without_includes() {
    let source =
        "#version 450\n#define TWO 2\n\nint a = TWO;\n#ifdef TWO\n  int b;\n#endif\nint c;\n";
    let result = run(source);
    for (index, line) in result.text.lines().enumerate() {
        let trimmed = line.trim();
        if trimmed.is_empty() || trimmed.starts_with('#') {
            continue;
        }
        let input = source.lines().nth(index).unwrap_or("");
        let first = trimmed.split(' ').next().unwrap_or("");
        assert!(
            input.trim_start().starts_with(first),
            "{index}: {line} vs {input}"
        );
    }
}

#[test]
fn expansions_map_to_the_invocation_and_arguments_to_themselves() {
    let source = "#version 450\n#define ADD(a, b) ((a) + (b))\nint x = ADD(left, right);\n";
    let result = run(source);
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    let invocation = find(source, "ADD(left");
    let plus = find(&result.text, "+");
    let location = result.source_map.locate(plus);
    assert_eq!(usize::try_from(location.offset).unwrap_or(0), invocation);
    let left = find(&result.text, "left");
    assert_eq!(located_text(&result, source, left, 4), "left");
    let right = find(&result.text, "right");
    assert_eq!(located_text(&result, source, right + 2, 3), "ght");
}

#[test]
fn nested_expansions_map_to_the_outermost_invocation() {
    let source = "#version 450\n#define INNER 42\n#define OUTER INNER + 1\nint x = OUTER;\n";
    let result = run(source);
    let offset = find(&result.text, "42");
    let location = result.source_map.locate(offset);
    assert_eq!(
        usize::try_from(location.offset).unwrap_or(0),
        find(source, "OUTER;")
    );
}

#[test]
fn expansion_lines_follow_glslang() {
    let source = "#version 450\n#define F(x) x\nint w = F(\n 1\n) + F\n\n(2);\n";
    let result = run(source);
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    let one = find(&result.text, "1");
    assert_eq!(result.source_map.line(one).1, 5);
    assert_eq!(located_text(&result, source, one, 1), "1");
    let two = find(&result.text, "2");
    assert_eq!(result.source_map.line(two).1, 7);
}

#[test]
fn line_directives_change_lines_but_not_locations() {
    let source = "#version 450\n#line 100\nint a;\n";
    let result = run(source);
    let offset = find(&result.text, "int a");
    assert_eq!(result.source_map.line(offset), (FileId(0), 100));
    assert_eq!(located_text(&result, source, offset, 5), "int a");
}

#[test]
fn offsets_outside_tokens_are_clamped() {
    let source = "#version 450\nint a;\n";
    let result = run(source);
    let end = result.text.len() + 10;
    let location = result.source_map.locate(end);
    assert_eq!(location.file, FileId(0));
    let _ = result.source_map.line(0);
    let _ = result.source_map.presumed(end);
    let empty = run("");
    assert_eq!(empty.source_map.locate(3).offset, 0);
    assert_eq!(empty.source_map.line(3), (FileId(0), 1));
}
