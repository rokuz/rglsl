mod args;
mod compile;
mod output;
mod usage;

use args::{Exit, EXIT_USAGE};

fn main() {
    let mut arguments = std::env::args();
    let executable = arguments.next().unwrap_or_else(|| String::from("rglsl"));
    let code = match args::parse(arguments.collect()).and_then(|options| compile::run(&options)) {
        Ok(code) => code,
        Err(exit) => {
            report(&executable, exit);
            EXIT_USAGE
        }
    };
    std::process::exit(code);
}

fn report(executable: &str, exit: Exit) {
    match exit {
        Exit::Usage => output::stdout(usage::USAGE),
        Exit::Printed(text) => output::stdout(&text),
        Exit::Error { detail, message } => match detail {
            Some(detail) => {
                output::err!("{executable}: Error: {detail}: {message} (use -h for usage)");
            }
            None => output::err!("{executable}: Error: {message} (use -h for usage)"),
        },
    }
}
