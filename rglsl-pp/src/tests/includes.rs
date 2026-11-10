use alloc::format;
use alloc::string::String;
use alloc::vec::Vec;

use super::{code, errors, lex, line_of, warnings};
use crate::{
    preprocess, DiagnosticKind, FileId, IncludeKind, Includer, Limits, MemoryIncluder, Options,
    Preprocessed,
};

fn run_files(files: &[(&str, &str)], include_dirs: &[&str], options: &Options) -> Preprocessed {
    let mut includer = MemoryIncluder::with_include_dirs(include_dirs.iter().copied());
    let mut root = None;
    for (name, source) in files {
        let file = includer.add_file(name, source);
        root.get_or_insert((file, *source));
    }
    let (root, source) = root.unwrap_or((FileId(0), ""));
    preprocess(source, root, options, &mut includer)
}

fn run_tree(files: &[(&str, &str)]) -> Preprocessed {
    run_files(files, &[], &Options::default())
}

fn no_errors(result: &Preprocessed) {
    assert!(
        errors(result).is_empty(),
        "{:?}\n{}",
        result.diagnostics,
        result.text
    );
}

#[test]
fn includes_work_without_the_extension() {
    let result = run_tree(&[
        (
            "main.frag",
            "#version 450\n#include \"common.h\"\nint b = COMMON;\n",
        ),
        ("common.h", "#define COMMON 7\nint a;\n"),
    ]);
    no_errors(&result);
    assert_eq!(code(&result.text), lex("int a; int b = 7;"));
    let with_extension = run_tree(&[
        (
            "main.frag",
            "#version 450\n#extension GL_GOOGLE_include_directive : require\n#include \"common.h\"\n",
        ),
        ("common.h", "int a;\n"),
    ]);
    no_errors(&with_extension);
    assert_eq!(code(&with_extension.text), lex("int a;"));
}

#[test]
fn quoted_includes_search_the_including_directory_first() {
    let files = [
        (
            "shaders/main.frag",
            "#version 450\n#include \"common.h\"\n#include <common.h>\n#include \"sub/x.h\"\n#include \"only_lib.h\"\n",
        ),
        ("shaders/common.h", "int local_common;\n"),
        ("lib/common.h", "int lib_common;\n"),
        ("lib/only_lib.h", "int only_lib;\n"),
        ("shaders/sub/x.h", "#include \"y.h\"\n#include \"common.h\"\n"),
        ("shaders/sub/y.h", "int sub_y;\n"),
    ];
    let result = run_files(&files, &["lib"], &Options::default());
    no_errors(&result);
    assert_eq!(
        code(&result.text),
        lex("int local_common; int lib_common; int sub_y; int local_common; int only_lib;")
    );
}

#[test]
fn system_includes_ignore_the_including_directory() {
    let result = run_files(
        &[
            ("shaders/main.frag", "#version 450\n#include <local.h>\n"),
            ("shaders/local.h", "int local;\n"),
        ],
        &["lib"],
        &Options::default(),
    );
    assert!(matches!(
        errors(&result).first(),
        Some(DiagnosticKind::IncludeFailed { .. })
    ));
}

#[test]
fn missing_includes_are_errors() {
    let result = run_tree(&[(
        "main.frag",
        "#version 450\n#include \"nothere.h\"\nint after;\n",
    )]);
    let first = result.errors().next().cloned();
    assert!(
        matches!(&first, Some(diagnostic) if diagnostic.line == 2 && matches!(&diagnostic.kind, DiagnosticKind::IncludeFailed { name, message } if name == "for header name: nothere.h" && message == "Could not process include directive"))
    );
    let skipped = run_tree(&[(
        "main.frag",
        "#version 450\n#if 0\n#include \"nothere.h\"\n#endif\nint z;\n",
    )]);
    no_errors(&skipped);
}

#[test]
fn include_syntax_errors() {
    let cases = [
        ("#include a.h\n", "IncludeWithoutHeaderName"),
        ("#include \"a.h\" junk\n", "IncludeExtraContent"),
        ("#include \"a.h\"", "IncludeMissingNewline"),
        ("#include \"a.h", "IncludeWithoutHeaderName"),
    ];
    for (body, expected) in cases {
        let source = format!("#version 450\n{body}");
        let result = run_tree(&[("main.frag", &source), ("a.h", "int a;\n")]);
        let first = errors(&result)
            .first()
            .map(|kind| format!("{kind:?}"))
            .unwrap_or_default();
        assert!(first.starts_with(expected), "{body}: {first}");
    }
}

#[test]
fn line_and_file_inside_included_files() {
    let result = run_tree(&[
        (
            "main.frag",
            "#version 450\nint before = __LINE__;\n#include \"a.h\"\nint after = __LINE__;\nint file = __FILE__;\n",
        ),
        (
            "a.h",
            "int fromA = __LINE__;\nint fileA = __FILE__;\n#include \"sub/b.h\"\nint afterB = __LINE__;\n",
        ),
        (
            "sub/b.h",
            "#line 40\nint inB = __LINE__;\nint fileB = __FILE__;\n#include \"c.h\"\n",
        ),
        ("sub/c.h", "int inC = __LINE__;"),
    ]);
    no_errors(&result);
    assert_eq!(
        code(&result.text),
        lex("int before = 2; int fromA = 1; int fileA = \"./a.h\"; int inB = 40; int fileB = \"./sub/b.h\"; int inC = 1; int afterB = 4; int after = 4; int file = 0;")
    );
    assert_eq!(line_of(&result, "int inB"), 40);
    assert_eq!(line_of(&result, "int afterB"), 4);
    assert_eq!(line_of(&result, "int after ="), 4);
}

#[test]
fn line_directive_with_name_inside_an_include() {
    let result = run_tree(&[
        (
            "main.frag",
            "#version 450\n#include \"withline.h\"\nint back = __LINE__;\n",
        ),
        (
            "withline.h",
            "#line 1000 \"renamed.glsl\"\nint r = __LINE__;\nint rf = __FILE__;\n",
        ),
    ]);
    no_errors(&result);
    assert_eq!(
        code(&result.text),
        lex("int r = 1000; int rf = \"renamed.glsl\"; int back = 3;")
    );
}

#[test]
fn version_inside_an_include_is_an_error() {
    let result = run_tree(&[
        ("main.frag", "#version 450\n#include \"v.h\"\nint after;\n"),
        ("v.h", "#version 450\nint inside;\n"),
    ]);
    assert_eq!(
        errors(&result),
        [
            DiagnosticKind::VersionNotFirst,
            DiagnosticKind::BadProfile,
            DiagnosticKind::VersionExtraTokens
        ]
    );
    let lines: Vec<u32> = result.errors().map(|diagnostic| diagnostic.line).collect();
    assert_eq!(lines, [1, 3, 3]);
}

#[test]
fn an_error_ends_only_the_included_file() {
    let result = run_tree(&[
        (
            "main.frag",
            "#version 450\n#include \"bad.h\"\nint after;\n",
        ),
        ("bad.h", "int first;\n#error stop\nint never;\n"),
    ]);
    assert!(matches!(
        errors(&result).first(),
        Some(DiagnosticKind::ErrorDirective { .. })
    ));
    assert_eq!(code(&result.text), lex("int first; int after;"));
}

#[test]
fn empty_and_unterminated_files() {
    let result = run_tree(&[
        (
            "main.frag",
            "#version 450\n#include \"empty.h\"\n#include \"noeol.h\"\nint y = __LINE__;\n",
        ),
        ("empty.h", ""),
        ("noeol.h", "int last = 1;"),
    ]);
    no_errors(&result);
    assert_eq!(code(&result.text), lex("int last = 1; int y = 4;"));
}

#[test]
fn include_guards_stop_mutual_recursion() {
    let result = run_tree(&[
        (
            "main.frag",
            "#version 450\n#include \"guard.h\"\n#include \"guard.h\"\nint done;\n",
        ),
        (
            "guard.h",
            "#ifndef GUARD_H\n#define GUARD_H\n#include \"guard2.h\"\nint guard1;\n#endif\n",
        ),
        (
            "guard2.h",
            "#ifndef GUARD2_H\n#define GUARD2_H\n#include \"guard.h\"\nint guard2;\n#endif\n",
        ),
    ]);
    no_errors(&result);
    assert_eq!(code(&result.text), lex("int guard2; int guard1; int done;"));
}

#[test]
fn unguarded_recursion_is_reported() {
    let result = run_tree(&[
        ("main.frag", "#version 450\n#include \"a.h\"\nint after;\n"),
        ("a.h", "int a;\n#include \"b.h\"\n"),
        ("b.h", "int b;\n#include \"a.h\"\n"),
    ]);
    assert!(matches!(
        errors(&result).first(),
        Some(DiagnosticKind::RecursiveInclude { name }) if name == "a.h" || name == "b.h"
    ));
    assert!(code(&result.text).ends_with(&lex("int after;")));
}

#[test]
fn include_depth_is_limited() {
    let mut files: Vec<(String, String)> = Vec::new();
    files.push((
        String::from("main.frag"),
        String::from("#version 450\n#include \"f0.h\"\n"),
    ));
    for index in 0..10 {
        files.push((
            format!("f{index}.h"),
            format!("int f{index};\n#include \"f{}.h\"\n", index + 1),
        ));
    }
    files.push((String::from("f10.h"), String::from("int bottom;\n")));
    let borrowed: Vec<(&str, &str)> = files
        .iter()
        .map(|(name, source)| (name.as_str(), source.as_str()))
        .collect();
    let deep = run_files(&borrowed, &[], &Options::default());
    no_errors(&deep);
    assert_eq!(code(&deep.text).len(), 33);
    let limited = Options {
        limits: Limits {
            max_include_depth: 5,
            ..Limits::default()
        },
        ..Options::default()
    };
    let shallow = run_files(&borrowed, &[], &limited);
    assert!(matches!(
        errors(&shallow).first(),
        Some(DiagnosticKind::IncludeTooDeep { name }) if name == "f5.h"
    ));
}

#[test]
fn pragma_once_is_not_implemented_like_glslang() {
    let result = run_tree(&[
        (
            "main.frag",
            "#version 450\n#include \"once.h\"\n#include \"once.h\"\n",
        ),
        ("once.h", "#pragma once\nint twice;\n"),
    ]);
    no_errors(&result);
    assert_eq!(code(&result.text), lex("int twice; int twice;"));
    assert_eq!(
        warnings(&result),
        [
            DiagnosticKind::PragmaOnceNotImplemented,
            DiagnosticKind::PragmaOnceNotImplemented
        ]
    );
}

#[test]
fn source_map_knows_included_files() {
    let mut includer = MemoryIncluder::new();
    let main_source = "#version 450\n#include \"inc/a.h\"\nint main_token;\n";
    let header = "// header\nint header_token;\n";
    let root = includer.add_file("main.frag", main_source);
    let header_id = includer.add_file("inc/a.h", header);
    let result = preprocess(main_source, root, &Options::default(), &mut includer);
    no_errors(&result);
    let offset = result.text.find("header_token").unwrap_or(0);
    let location = result.source_map.locate(offset);
    assert_eq!(location.file, header_id);
    let start = usize::try_from(location.offset).unwrap_or(0);
    assert_eq!(header.get(start..start + 12), Some("header_token"));
    assert_eq!(result.source_map.line(offset), (header_id, 2));
    assert_eq!(result.source_map.file_name(header_id), Some("./inc/a.h"));
    let offset = result.text.find("main_token").unwrap_or(0);
    assert_eq!(result.source_map.line(offset), (root, 3));
}

struct Recording {
    calls: Vec<(String, IncludeKind, FileId, usize)>,
}

impl Includer for Recording {
    fn include(
        &mut self,
        requested: &str,
        kind: IncludeKind,
        from: FileId,
        depth: usize,
    ) -> Result<crate::IncludedFile, crate::IncludeError> {
        self.calls
            .push((String::from(requested), kind, from, depth));
        let next = u32::try_from(self.calls.len()).unwrap_or(0);
        let source = if depth < 2 {
            String::from("#include <deeper.h>\n")
        } else {
            String::new()
        };
        Ok(crate::IncludedFile {
            file: FileId(100 + next),
            name: format!("virtual{next}"),
            source,
        })
    }
}

#[test]
fn includer_receives_kind_origin_and_depth() {
    let mut includer = Recording { calls: Vec::new() };
    let source = "#version 450\n#include \"first.h\"\n";
    let result = preprocess(source, FileId(7), &Options::default(), &mut includer);
    no_errors(&result);
    assert_eq!(
        includer.calls,
        [
            (String::from("first.h"), IncludeKind::Local, FileId(7), 1),
            (
                String::from("deeper.h"),
                IncludeKind::System,
                FileId(101),
                2
            ),
        ]
    );
}

#[cfg(feature = "std")]
#[test]
fn file_system_includer_resolves_relative_paths() {
    use crate::FileSystemIncluder;
    let base = std::env::temp_dir().join(format!("rglsl-pp-test-{}", std::process::id()));
    let shaders = base.join("shaders");
    let lib = base.join("lib");
    let created = std::fs::create_dir_all(&shaders).and_then(|()| std::fs::create_dir_all(&lib));
    assert!(created.is_ok());
    let main = shaders.join("main.frag");
    let source = "#version 450\n#include \"local.h\"\n#include <lib.h>\n";
    let writes = [
        std::fs::write(&main, source),
        std::fs::write(shaders.join("local.h"), "int local;\n"),
        std::fs::write(lib.join("lib.h"), "int from_lib;\n"),
    ];
    assert!(writes.iter().all(Result::is_ok));
    let mut includer = FileSystemIncluder::new([&lib]);
    let root = includer.add_root(&main);
    let result = preprocess(source, root, &Options::default(), &mut includer);
    let _ = std::fs::remove_dir_all(&base);
    no_errors(&result);
    assert_eq!(code(&result.text), lex("int local; int from_lib;"));
}
