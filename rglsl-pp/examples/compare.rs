use std::collections::BTreeMap;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::sync::Mutex;

use rglsl_pp::{
    find_version, preprocess, Define, FileSystemIncluder, Options, Phase, Preprocessed, Profile,
    Severity, Stage,
};

const STAGES: [&str; 14] = [
    "vert", "tesc", "tese", "geom", "frag", "comp", "mesh", "task", "rgen", "rint", "rahit",
    "rchit", "rmiss", "rcall",
];

const OPERATORS: [&str; 46] = [
    "<<=", ">>=", "+=", "-=", "*=", "/=", "%=", ">>", "<<", "&=", "|=", "^=", "&&", "||", "^^",
    "==", "!=", ">=", "<=", "--", "++", "::", "~", "!", "%", "^", "&", "*", "(", ")", "-", "+",
    "=", "|", ",", ".", "<", ">", "/", "?", ";", ":", "[", "]", "{", "}",
];

#[derive(Clone, Debug, PartialEq, Eq)]
struct Lexeme {
    text: String,
    line: i64,
}

#[derive(Debug)]
struct Outcome {
    name: String,
    token_equal: bool,
    line_equal: bool,
    error_agreement: bool,
    both_failed: bool,
    glslang_ok: bool,
    cause: Option<String>,
    detail: String,
}

struct Arguments {
    glslang: PathBuf,
    tests: PathBuf,
    filter: Option<String>,
    examples: usize,
}

fn parse_arguments() -> Arguments {
    let manifest = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    let mut arguments = Arguments {
        glslang: std::env::var_os("RGLSL_GLSLANG").map_or_else(
            || manifest.join("../target/oracles/bin/glslang"),
            PathBuf::from,
        ),
        tests: std::env::var_os("GLSLANG_TEST_DIR")
            .map_or_else(|| manifest.join("../../glslang/Test"), PathBuf::from),
        filter: None,
        examples: usize::MAX,
    };
    let mut iterator = std::env::args().skip(1);
    while let Some(argument) = iterator.next() {
        match argument.as_str() {
            "--glslang" => {
                if let Some(value) = iterator.next() {
                    arguments.glslang = PathBuf::from(value);
                }
            }
            "--tests" => {
                if let Some(value) = iterator.next() {
                    arguments.tests = PathBuf::from(value);
                }
            }
            "--filter" => arguments.filter = iterator.next(),
            "--examples" => {
                if let Some(value) = iterator.next() {
                    arguments.examples = value.parse().unwrap_or(usize::MAX);
                }
            }
            other => eprintln!("ignoring argument {other}"),
        }
    }
    arguments
}

fn is_es(number: u32, profile: Option<Profile>) -> bool {
    profile == Some(Profile::Es) || matches!(number, 100 | 300 | 310 | 320)
}

fn corpus(tests: &Path, filter: Option<&str>) -> Vec<String> {
    let mut names = Vec::new();
    let Ok(entries) = std::fs::read_dir(tests) else {
        return names;
    };
    for entry in entries.flatten() {
        let path = entry.path();
        if !path.is_file() {
            continue;
        }
        let Some(extension) = path.extension().and_then(|extension| extension.to_str()) else {
            continue;
        };
        if !STAGES.contains(&extension) {
            continue;
        }
        let Some(name) = path.file_name().and_then(|name| name.to_str()) else {
            continue;
        };
        if filter.is_some_and(|filter| !name.contains(filter)) {
            continue;
        }
        let Ok(bytes) = std::fs::read(&path) else {
            continue;
        };
        let source = String::from_utf8_lossy(&bytes);
        match find_version(&source) {
            Some(version) if !is_es(version.number, version.profile) => names.push(name.to_owned()),
            _ => {}
        }
    }
    names.sort();
    names
}

fn extra_include_dirs(name: &str) -> Vec<&'static str> {
    match name {
        "include.system.vert" => vec!["inc2"],
        _ => Vec::new(),
    }
}

fn lex(text: &str, glslang: bool, set_next_line: bool) -> Vec<(Lexeme, usize)> {
    let mut lexemes = Vec::new();
    let mut logical: i64 = 1;
    let mut line_offset = 0usize;
    for line in text.split('\n') {
        let offset = line_offset;
        line_offset += line.len() + 1;
        let trimmed = line.trim_start();
        if trimmed.starts_with('#') {
            let compact: String = trimmed
                .chars()
                .filter(|character| !character.is_whitespace())
                .collect();
            if glslang && compact.starts_with("#line") {
                let number: i64 = trimmed
                    .trim_start_matches('#')
                    .trim_start()
                    .trim_start_matches("line")
                    .split_whitespace()
                    .next()
                    .and_then(|number| number.parse().ok())
                    .unwrap_or(0);
                logical = if set_next_line { number } else { number + 1 };
                continue;
            }
            let position = offset + (line.len() - trimmed.len());
            lexemes.push((
                Lexeme {
                    text: compact,
                    line: logical,
                },
                position,
            ));
            logical += 1;
            continue;
        }
        for (text, position) in split_tokens(line) {
            lexemes.push((
                Lexeme {
                    text,
                    line: logical,
                },
                offset + position,
            ));
        }
        logical += 1;
    }
    lexemes
}

fn split_tokens(line: &str) -> Vec<(String, usize)> {
    let characters: Vec<(usize, char)> = line.char_indices().collect();
    let byte_at = |index: usize| characters.get(index).map_or(line.len(), |(byte, _)| *byte);
    let mut tokens = Vec::new();
    let mut index = 0;
    while let Some(&(_, character)) = characters.get(index) {
        if character.is_whitespace() {
            index += 1;
            continue;
        }
        let start = index;
        let rest = &line[byte_at(index)..];
        if rest.starts_with("<bad token>") {
            tokens.push(("<bad token>".to_owned(), byte_at(start)));
            index += "<bad token>".len();
            continue;
        }
        if !glsl_char(character) {
            tokens.push(("<bad token>".to_owned(), byte_at(start)));
            index += 1;
            continue;
        }
        let char_at = |index: usize| characters.get(index).map(|(_, character)| *character);
        if character.is_ascii_alphabetic() || character == '_' {
            while char_at(index)
                .is_some_and(|character| character.is_ascii_alphanumeric() || character == '_')
            {
                index += 1;
            }
        } else if character.is_ascii_digit()
            || (character == '.' && char_at(index + 1).is_some_and(|next| next.is_ascii_digit()))
        {
            let hexadecimal = character == '0' && matches!(char_at(index + 1), Some('x' | 'X'));
            index += 1;
            while let Some(next) = char_at(index) {
                let exponent_sign = !hexadecimal
                    && matches!(next, '+' | '-')
                    && matches!(char_at(index - 1), Some('e' | 'E'));
                if next.is_ascii_alphanumeric() || next == '_' || next == '.' || exponent_sign {
                    index += 1;
                } else {
                    break;
                }
            }
        } else if character == '"' {
            index += 1;
            while let Some(next) = char_at(index) {
                index += 1;
                if next == '\\' {
                    index += 1;
                } else if next == '"' {
                    break;
                }
            }
        } else if let Some(op) = OPERATORS.iter().find(|op| rest.starts_with(**op)) {
            index += op.len();
        } else {
            index += 1;
        }
        let text = line[byte_at(start)..byte_at(index.min(characters.len()))].to_owned();
        tokens.push((text, byte_at(start)));
    }
    tokens
}

fn glsl_char(character: char) -> bool {
    character.is_ascii_alphanumeric() || "_.\"~!%^&*()-+=|,<>/?;:[]{}#\\".contains(character)
}

fn our_lexemes(result: &Preprocessed) -> Vec<Lexeme> {
    lex(&result.text, false, true)
        .into_iter()
        .map(|(mut lexeme, offset)| {
            lexeme.line = i64::from(result.source_map.line(offset).1);
            lexeme
        })
        .collect()
}

fn first_glslang_error(output: &str) -> Option<(Option<i64>, String)> {
    for line in output.lines() {
        let Some(rest) = line.strip_prefix("ERROR: ") else {
            continue;
        };
        if rest.contains("compilation errors.") {
            continue;
        }
        let mut parts = rest.splitn(3, ':');
        let first = parts.next().unwrap_or("");
        let second = parts.next().unwrap_or("");
        let message = parts.next().unwrap_or("").trim().to_owned();
        if let Ok(number) = second.trim().parse::<i64>() {
            return Some((Some(number), message));
        }
        let _ = first;
        return Some((None, rest.to_owned()));
    }
    None
}

fn normalize_message(message: &str) -> String {
    let mut parts = message.split(':');
    let token = parts.next().unwrap_or("").trim();
    let reason = parts.next().unwrap_or("").trim();
    format!("{token} : {reason}")
}

fn token_class(text: &str) -> &'static str {
    if text.starts_with('#') {
        "directive"
    } else if text.starts_with('"') {
        "string"
    } else if text.starts_with(|character: char| character.is_ascii_digit() || character == '.')
        && text.len() > 1
    {
        "number"
    } else if text
        .starts_with(|character: char| character.is_ascii_alphabetic() || character == '_')
    {
        "identifier"
    } else {
        "operator"
    }
}

fn compare_file(arguments: &Arguments, name: &str) -> Outcome {
    let source_bytes = std::fs::read(name).unwrap_or_default();
    let source = String::from_utf8_lossy(&source_bytes).into_owned();
    let extension = name.rsplit('.').next().unwrap_or("");
    let stage = Stage::from_extension(extension);
    let include_dirs = extra_include_dirs(name);
    let mut command = Command::new(&arguments.glslang);
    command.arg("-E");
    for directory in &include_dirs {
        command.arg(format!("-I{directory}"));
    }
    command.arg(name);
    let reference = command.output();
    let mut options = Options {
        vulkan_client_version: None,
        gl_spirv: false,
        stage,
        source_name: Some(name.to_owned()),
        ..Options::default()
    };
    options
        .defines
        .push(Define::new("GL_ARB_bindless_texture", Some("1")));
    let mut includer = FileSystemIncluder::new(include_dirs.iter().copied());
    let root = includer.add_root(name);
    let result = preprocess(&source, root, &options, &mut includer);
    let set_next_line = result.version.is_es() || result.version.number >= 330;
    let ours_error = result.diagnostics.iter().find(|diagnostic| {
        diagnostic.severity() == Severity::Error && diagnostic.kind.phase() == Phase::Preprocessor
    });
    let mut outcome = Outcome {
        name: name.to_owned(),
        token_equal: false,
        line_equal: false,
        error_agreement: false,
        both_failed: false,
        glslang_ok: false,
        cause: None,
        detail: String::new(),
    };
    let Ok(reference) = reference else {
        outcome.cause = Some("glslang could not be run".to_owned());
        return outcome;
    };
    let stdout = String::from_utf8_lossy(&reference.stdout).into_owned();
    let stderr = String::from_utf8_lossy(&reference.stderr).into_owned();
    let glslang_failed = !reference.status.success();
    outcome.glslang_ok = !glslang_failed;
    let glslang_error = if glslang_failed {
        first_glslang_error(&stderr).or_else(|| first_glslang_error(&stdout))
    } else {
        None
    };
    let compiler_error = result.diagnostics.iter().find(|diagnostic| {
        diagnostic.severity() == Severity::Error && diagnostic.kind.phase() == Phase::Compiler
    });
    match (glslang_failed, ours_error) {
        (false, None) => outcome.error_agreement = true,
        (true, Some(ours)) => {
            outcome.error_agreement = true;
            outcome.both_failed = true;
            let reference_line = glslang_error.as_ref().and_then(|(line, _)| *line);
            outcome.token_equal = true;
            outcome.line_equal = true;
            if reference_line.is_some_and(|line| line != i64::from(ours.line)) {
                outcome.line_equal = false;
                outcome.cause = Some("error reported on a different line".to_owned());
                outcome.detail = format!(
                    "glslang line {:?}: {}; ours line {}: {}",
                    reference_line,
                    glslang_error
                        .as_ref()
                        .map_or("", |(_, message)| message.as_str()),
                    ours.line,
                    ours.kind
                );
            }
            return outcome;
        }
        (true, None) => {
            let message = glslang_error
                .as_ref()
                .map_or_else(|| "no message".to_owned(), |(_, message)| message.clone());
            let by_design = message.contains("'#include' : required extension not requested");
            outcome.cause = Some(if by_design {
                "by design: #include without the extension directive is accepted".to_owned()
            } else {
                format!(
                    "only glslang reports an error: {}",
                    normalize_message(&message)
                )
            });
            outcome.detail = format!("glslang: {message}");
            return outcome;
        }
        (false, Some(ours)) => {
            let kind = format!("{:?}", ours.kind);
            let variant = kind.split([' ', '{', '(']).next().unwrap_or("").to_owned();
            outcome.cause = Some(format!("only rglsl-pp reports an error: {variant}"));
            outcome.detail = format!("line {}: {}", ours.line, ours.kind);
            return outcome;
        }
    }
    let theirs: Vec<Lexeme> = lex(&stdout, true, set_next_line)
        .into_iter()
        .map(|(lexeme, _)| lexeme)
        .collect();
    let ours = our_lexemes(&result);
    let mismatch = theirs
        .iter()
        .zip(ours.iter())
        .position(|(theirs, ours)| theirs.text != ours.text);
    let length_mismatch = theirs.len() != ours.len();
    if mismatch.is_none() && !length_mismatch {
        outcome.token_equal = true;
        let line_mismatch = theirs
            .iter()
            .zip(ours.iter())
            .position(|(theirs, ours)| theirs.line != ours.line);
        match line_mismatch {
            None => outcome.line_equal = true,
            Some(index) => {
                let (theirs, ours) = (&theirs[index], &ours[index]);
                outcome.cause = Some(format!(
                    "line mismatch on {} token",
                    token_class(&theirs.text)
                ));
                outcome.detail = format!(
                    "token #{index} `{}`: glslang line {}, ours line {}",
                    theirs.text, theirs.line, ours.line
                );
            }
        }
        return outcome;
    }
    let index = mismatch.unwrap_or(theirs.len().min(ours.len()));
    if let Some(compiler_error) = compiler_error {
        let kind = format!("{:?}", compiler_error.kind);
        let variant = kind.split([' ', '{', '(']).next().unwrap_or("").to_owned();
        outcome.cause = Some(format!(
            "rglsl-pp stops at an error glslang -E suppresses: {variant}"
        ));
        outcome.detail = format!("line {}: {}", compiler_error.line, compiler_error.kind);
        return outcome;
    }
    let their_token = theirs.get(index);
    let our_token = ours.get(index);
    let context = |lexemes: &[Lexeme]| -> String {
        lexemes
            .iter()
            .skip(index.saturating_sub(3))
            .take(7)
            .map(|lexeme| lexeme.text.as_str())
            .collect::<Vec<_>>()
            .join(" ")
    };
    let cause = match (their_token, our_token) {
        (Some(theirs), Some(ours)) => {
            format!(
                "token mismatch: {} vs {}",
                token_class(&ours.text),
                token_class(&theirs.text)
            )
        }
        (Some(_), None) => "rglsl-pp output is shorter".to_owned(),
        (None, Some(_)) => "rglsl-pp output is longer".to_owned(),
        (None, None) => "token count differs".to_owned(),
    };
    outcome.cause = Some(cause);
    outcome.detail = format!(
        "token #{index} at glslang line {}: glslang `{}` / ours `{}`",
        their_token.map_or(0, |lexeme| lexeme.line),
        context(&theirs),
        context(&ours)
    );
    outcome
}

fn main() {
    let arguments = parse_arguments();
    let tests = match arguments.tests.canonicalize() {
        Ok(tests) => tests,
        Err(error) => {
            eprintln!("cannot open {}: {error}", arguments.tests.display());
            std::process::exit(2);
        }
    };
    let arguments = Arguments {
        glslang: arguments
            .glslang
            .canonicalize()
            .unwrap_or_else(|_| arguments.glslang.clone()),
        tests: tests.clone(),
        ..arguments
    };
    if let Err(error) = std::env::set_current_dir(&tests) {
        eprintln!("cannot enter {}: {error}", tests.display());
        std::process::exit(2);
    }
    let names = corpus(&tests, arguments.filter.as_deref());
    let next = Mutex::new(0usize);
    let outcomes = Mutex::new(Vec::new());
    let workers = std::thread::available_parallelism().map_or(4, std::num::NonZero::get);
    std::thread::scope(|scope| {
        for _ in 0..workers {
            scope.spawn(|| loop {
                let index = {
                    let mut next = next
                        .lock()
                        .unwrap_or_else(std::sync::PoisonError::into_inner);
                    let index = *next;
                    *next += 1;
                    index
                };
                let Some(name) = names.get(index) else {
                    break;
                };
                let outcome = compare_file(&arguments, name);
                outcomes
                    .lock()
                    .unwrap_or_else(std::sync::PoisonError::into_inner)
                    .push(outcome);
            });
        }
    });
    let mut outcomes = outcomes
        .into_inner()
        .unwrap_or_else(std::sync::PoisonError::into_inner);
    outcomes.sort_by(|left, right| left.name.cmp(&right.name));
    let total = outcomes.len();
    let token_equal = outcomes
        .iter()
        .filter(|outcome| outcome.token_equal)
        .count();
    let line_equal = outcomes.iter().filter(|outcome| outcome.line_equal).count();
    let agreement = outcomes
        .iter()
        .filter(|outcome| outcome.error_agreement)
        .count();
    let both_failed = outcomes
        .iter()
        .filter(|outcome| outcome.both_failed)
        .count();
    let percent = |count: usize| {
        if total == 0 {
            0.0
        } else {
            100.0 * count as f64 / total as f64
        }
    };
    let mut groups: BTreeMap<String, Vec<&Outcome>> = BTreeMap::new();
    for outcome in &outcomes {
        if let Some(cause) = &outcome.cause {
            groups.entry(cause.clone()).or_default().push(outcome);
        }
    }
    let mut groups: Vec<_> = groups.into_iter().collect();
    groups.sort_by(|left, right| right.1.len().cmp(&left.1.len()).then(left.0.cmp(&right.0)));
    for (cause, members) in &groups {
        println!("== {cause} ({})", members.len());
        for outcome in members.iter().take(arguments.examples) {
            println!("   {}: {}", outcome.name, outcome.detail);
        }
    }
    println!();
    let accepted: Vec<&Outcome> = outcomes
        .iter()
        .filter(|outcome| outcome.glslang_ok)
        .collect();
    let accepted_tokens = accepted
        .iter()
        .filter(|outcome| outcome.token_equal)
        .count();
    let accepted_lines = accepted.iter().filter(|outcome| outcome.line_equal).count();
    let same_error_line = outcomes
        .iter()
        .filter(|outcome| outcome.both_failed && outcome.line_equal)
        .count();
    println!("files compared:   {total}");
    println!(
        "token-equal:      {token_equal} ({:.2} %); glslang -E succeeds on {}, token-equal there: {accepted_tokens}",
        percent(token_equal),
        accepted.len()
    );
    println!(
        "line-equal:       {line_equal} ({:.2} %); line-equal where glslang -E succeeds: {accepted_lines}",
        percent(line_equal)
    );
    println!(
        "error agreement:  {agreement} ({:.2} %); both report an error in {both_failed}, on the same first line in {same_error_line}",
        percent(agreement)
    );
}
