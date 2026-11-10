use std::env;
use std::fs;
use std::path::Path;
use std::process::ExitCode;

use rglsl_sema::{analyze, Options, Stage};

fn main() -> ExitCode {
    let mut status = ExitCode::SUCCESS;
    for file in env::args().skip(1) {
        let path = Path::new(&file);
        let stage = path
            .extension()
            .and_then(|extension| extension.to_str())
            .and_then(Stage::from_extension);
        let (Ok(source), Some(stage)) = (fs::read_to_string(path), stage) else {
            eprintln!("{file}: cannot read the file or tell its stage from the extension");
            status = ExitCode::FAILURE;
            continue;
        };
        let unit = match rglsl_ast::parse(&source) {
            Ok(unit) => unit,
            Err(error) => {
                println!("{file}:{}: parse error: {error}", error.position.line);
                continue;
            }
        };
        let analysis = analyze(&unit, &Options::new(stage));
        for diagnostic in &analysis.diagnostics {
            println!(
                "{file}:{}: {:?}: {}",
                diagnostic.line(&source),
                diagnostic.kind,
                diagnostic.kind
            );
        }
    }
    status
}
