use std::env;
use std::process::ExitCode;

use rglsl_sema::scope::{Direction, SymbolKind};
use rglsl_sema::{Builtins, ResourceLimits, Stage};

fn main() -> ExitCode {
    let arguments: Vec<String> = env::args().collect();
    let version = arguments.get(1).and_then(|version| version.parse().ok());
    let stage = arguments
        .get(2)
        .and_then(|stage| Stage::from_extension(stage));
    let (Some(version), Some(stage)) = (version, stage) else {
        eprintln!("usage: dump <450|460> <vert|tesc|tese|geom|frag|comp|...>");
        return ExitCode::FAILURE;
    };
    let builtins = Builtins::new(version, stage, &ResourceLimits::default());
    for function in builtins.functions() {
        let parameters: Vec<String> = function
            .parameters
            .iter()
            .map(|parameter| {
                let direction = match parameter.direction {
                    Direction::In => "in",
                    Direction::Out => "out",
                    Direction::Inout => "inout",
                };
                format!("{direction} {}", parameter.ty.display(builtins.types()))
            })
            .collect();
        println!(
            "function|{}|{}|{}",
            function.return_type.display(builtins.types()),
            function.name,
            parameters.join(",")
        );
    }
    for (name, id) in builtins.variables() {
        let Some(symbol) = builtins.symbols().get(id.index() as usize) else {
            continue;
        };
        let kind = match &symbol.kind {
            SymbolKind::Variable(variable) => {
                format!("{}", variable.ty.display(builtins.types()))
            }
            _ => String::from("member"),
        };
        println!("variable|{kind}|{name}");
    }
    ExitCode::SUCCESS
}
