use std::error::Error;
use std::fs;
use std::path::PathBuf;

const STAGES: &[&str] = &[
    "vert", "tesc", "tese", "geom", "frag", "comp", "mesh", "task", "rgen", "rint", "rahit",
    "rchit", "rmiss", "rcall",
];

fn main() -> Result<(), Box<dyn Error>> {
    let mut arguments = std::env::args_os().skip(1);
    let (Some(input), Some(output)) = (arguments.next(), arguments.next()) else {
        return Err("usage: print <input directory> <output directory>".into());
    };
    let (input, output) = (PathBuf::from(input), PathBuf::from(output));
    fs::create_dir_all(&output)?;
    let mut shaders: Vec<PathBuf> = fs::read_dir(&input)?
        .collect::<Result<Vec<_>, _>>()?
        .into_iter()
        .map(|entry| entry.path())
        .filter(|path| {
            path.extension()
                .and_then(|extension| extension.to_str())
                .is_some_and(|extension| STAGES.contains(&extension))
        })
        .collect();
    shaders.sort();
    for shader in shaders {
        let Some(name) = shader.file_name() else {
            continue;
        };
        let source = fs::read_to_string(&shader)?;
        match rglsl_fuzz::parse(&source) {
            Ok(unit) => fs::write(output.join(name), rglsl_fuzz::print(&unit))?,
            Err(error) => eprintln!("{}: {error}", shader.display()),
        }
    }
    Ok(())
}
