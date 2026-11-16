use std::collections::VecDeque;
use std::fs;
use std::io::{BufRead, BufReader};
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};

use anyhow::{Context, Result, bail};
use hashbrown::{HashMap, HashSet};

const ALLOWLIST: &str = "xtask/recursion-allowed.toml";
const SANCTIONED: &str = "rglsl_types::stack::recurse";
const SHOWN_MEMBERS: usize = 40;

pub struct Options {
    pub build: bool,
    pub verbose: bool,
}

pub fn run(root: &Path, options: &Options) -> Result<i32> {
    let target = root.join("target").join("xtask").join("recursion");
    let listing = target.join("ll-files.txt");
    let (files, crates) = if options.build {
        let built = build(root, &target)?;
        let text = built
            .0
            .iter()
            .map(|path| path.display().to_string())
            .chain(built.1.iter().map(|name| format!("crate {name}")))
            .collect::<Vec<_>>()
            .join("\n");
        fs::write(&listing, text).with_context(|| format!("cannot write {}", listing.display()))?;
        built
    } else {
        read_listing(&listing)?
    };
    let allowlist = Allowlist::read(&root.join(ALLOWLIST))?;
    let graph = Graph::parse(&files)?;
    let names: Vec<String> = graph.symbols.iter().map(|s| demangle(s)).collect();
    let workspace: Vec<bool> = names.iter().map(|n| mentions(n, &crates)).collect();
    let sanctioned: Vec<bool> = names.iter().map(|n| n.starts_with(SANCTIONED)).collect();
    let all = cycles(&graph.edges, &vec![false; names.len()]);
    let residual = cycles(&graph.edges, &sanctioned);
    let workspace_cycle = |cycle: &&Vec<usize>| cycle.iter().any(|&n| workspace[n]);
    let all_count = all.iter().filter(workspace_cycle).count();
    let residual: Vec<&Vec<usize>> = residual.iter().filter(workspace_cycle).collect();
    println!(
        "{} .ll files, {} functions, {} edges; {} workspace cycles, {} without {}",
        files.len(),
        names.len(),
        graph.edges.iter().map(Vec::len).sum::<usize>(),
        all_count,
        residual.len(),
        SANCTIONED,
    );
    let mut used = vec![0_usize; allowlist.entries.len()];
    let mut failures = 0;
    for cycle in residual {
        let members: Vec<&str> = {
            let mut members: Vec<&str> = cycle
                .iter()
                .filter(|&&n| workspace[n])
                .map(|&n| names[n].as_str())
                .collect();
            members.sort_unstable();
            members.dedup();
            members
        };
        match allowlist.covering(&members) {
            Some(index) => {
                if let Some(count) = used.get_mut(index) {
                    *count += 1;
                }
                if options.verbose {
                    let entry = &allowlist.entries[index];
                    println!("allowed ({}): {}", entry.name, members.join(", "));
                }
            }
            None => {
                failures += 1;
                println!("\nrecursion: a cycle of {} functions", cycle.len());
                for member in members.iter().take(SHOWN_MEMBERS) {
                    println!("    {member}");
                }
                if members.len() > SHOWN_MEMBERS {
                    println!("    ... and {} more", members.len() - SHOWN_MEMBERS);
                }
                println!("  for example:");
                let start = cycle
                    .iter()
                    .copied()
                    .filter(|&n| workspace[n])
                    .min()
                    .or_else(|| cycle.first().copied());
                for step in start
                    .map(|start| witness(&graph.edges, cycle, start))
                    .unwrap_or_default()
                {
                    println!("    -> {}", names[step]);
                }
            }
        }
    }
    println!("\nallowlist ({ALLOWLIST}):");
    for (entry, count) in allowlist.entries.iter().zip(&used) {
        println!(
            "  {:>4} cycles  {}: {} (bound: {})",
            count, entry.name, entry.reason, entry.bound
        );
        if *count == 0 {
            failures += 1;
            println!("        no cycle matches this entry any more: remove it");
        }
    }
    if failures > 0 {
        println!("\n{failures} problem(s)");
        return Ok(1);
    }
    println!("\nno recursion outside stack::recurse and the allowlist");
    Ok(0)
}

fn read_listing(listing: &Path) -> Result<(Vec<PathBuf>, Vec<String>)> {
    let text = fs::read_to_string(listing).with_context(|| {
        format!(
            "cannot read {}: run `cargo xtask recursion` without --no-build first",
            listing.display()
        )
    })?;
    let mut files = Vec::new();
    let mut crates = Vec::new();
    for line in text.lines() {
        match line.strip_prefix("crate ") {
            Some(name) => crates.push(name.to_string()),
            None => files.push(PathBuf::from(line)),
        }
    }
    Ok((files, crates))
}

fn build(root: &Path, target: &Path) -> Result<(Vec<PathBuf>, Vec<String>)> {
    let cargo = std::env::var("CARGO").unwrap_or_else(|_| String::from("cargo"));
    let mut child = Command::new(cargo)
        .current_dir(root)
        .args([
            "build",
            "--workspace",
            "--all-features",
            "--exclude",
            "rglsl-libfuzzer",
            "--lib",
            "--bins",
            "--message-format=json-render-diagnostics",
        ])
        .env("CARGO_TARGET_DIR", target)
        .env(
            "RUSTFLAGS",
            "--emit=llvm-ir,link -C opt-level=0 -C codegen-units=1 -C debuginfo=0",
        )
        .env_remove("CARGO_ENCODED_RUSTFLAGS")
        .stdout(Stdio::piped())
        .stderr(Stdio::inherit())
        .spawn()
        .context("cannot start cargo")?;
    let stdout = child.stdout.take().context("cargo has no stdout")?;
    let mut files = Vec::new();
    let mut crates = Vec::new();
    let mut executables = Vec::new();
    for line in BufReader::new(stdout).lines() {
        let line = line?;
        let Ok(message) = serde_json::from_str::<serde_json::Value>(&line) else {
            continue;
        };
        if message.get("reason").and_then(serde_json::Value::as_str) != Some("compiler-artifact") {
            continue;
        }
        let kinds: Vec<&str> = message
            .pointer("/target/kind")
            .and_then(serde_json::Value::as_array)
            .map(|kinds| kinds.iter().filter_map(serde_json::Value::as_str).collect())
            .unwrap_or_default();
        if kinds
            .iter()
            .any(|&kind| kind == "proc-macro" || kind == "custom-build")
        {
            continue;
        }
        let local = message
            .get("package_id")
            .and_then(serde_json::Value::as_str)
            .is_some_and(|id| id.starts_with("path+file://"));
        if local
            && let Some(name) = message
                .pointer("/target/name")
                .and_then(serde_json::Value::as_str)
        {
            crates.push(name.replace('-', "_"));
        }
        if let Some(executable) = message
            .get("executable")
            .and_then(serde_json::Value::as_str)
        {
            executables.push(PathBuf::from(executable));
            continue;
        }
        for filename in message
            .get("filenames")
            .and_then(serde_json::Value::as_array)
            .into_iter()
            .flatten()
            .filter_map(serde_json::Value::as_str)
        {
            let path = Path::new(filename);
            let (Some(directory), Some(stem)) = (
                path.parent(),
                path.file_stem().and_then(|stem| stem.to_str()),
            ) else {
                continue;
            };
            let stem = stem.strip_prefix("lib").unwrap_or(stem);
            let ll = directory.join(format!("{stem}.ll"));
            if ll.is_file() && !files.contains(&ll) {
                files.push(ll);
            }
        }
    }
    let status = child.wait()?;
    if !status.success() {
        bail!("cargo build for the recursion audit failed");
    }
    let deps = target.join("debug").join("deps");
    for executable in executables {
        files.push(executable_ll(&deps, &executable)?);
    }
    crates.sort_unstable();
    crates.dedup();
    Ok((files, crates))
}

fn executable_ll(deps: &Path, executable: &Path) -> Result<PathBuf> {
    let name = executable
        .file_stem()
        .and_then(|stem| stem.to_str())
        .context("an executable without a name")?;
    let wanted = fs::metadata(executable)
        .with_context(|| format!("cannot read {}", executable.display()))?;
    let prefix = format!("{}-", name.replace('-', "_"));
    for entry in fs::read_dir(deps)? {
        let path = entry?.path();
        let Some(file) = path.file_name().and_then(|file| file.to_str()) else {
            continue;
        };
        if !file.starts_with(&prefix) || path.extension().is_some() {
            continue;
        }
        let metadata = fs::metadata(&path)?;
        if metadata.len() == wanted.len() && metadata.modified()? == wanted.modified()? {
            let ll = path.with_extension("ll");
            if ll.is_file() {
                return Ok(ll);
            }
        }
    }
    bail!("no LLVM IR for {}", executable.display())
}

fn mentions(name: &str, crates: &[String]) -> bool {
    crates.iter().any(|krate| {
        name.match_indices(krate.as_str()).any(|(at, _)| {
            let before = name[..at].chars().next_back();
            let after = &name[at + krate.len()..];
            after.starts_with("::") && before.is_none_or(|c| !(c.is_alphanumeric() || c == '_'))
        })
    })
}

struct Graph {
    symbols: Vec<String>,
    edges: Vec<Vec<usize>>,
}

#[derive(Default)]
struct Interner {
    ids: HashMap<String, usize>,
    symbols: Vec<String>,
}

impl Interner {
    fn id(&mut self, symbol: &str) -> usize {
        if let Some(&id) = self.ids.get(symbol) {
            return id;
        }
        let id = self.symbols.len();
        self.symbols.push(symbol.to_string());
        self.ids.insert(symbol.to_string(), id);
        id
    }
}

impl Graph {
    fn parse(files: &[PathBuf]) -> Result<Self> {
        let mut interner = Interner::default();
        let mut defined: HashSet<usize> = HashSet::new();
        let mut calls: HashMap<usize, HashSet<usize>> = HashMap::new();
        let mut taken: HashMap<usize, HashSet<usize>> = HashMap::new();
        for path in files {
            let file =
                fs::File::open(path).with_context(|| format!("cannot open {}", path.display()))?;
            let mut globals: HashMap<usize, Vec<usize>> = HashMap::new();
            let mut references: HashMap<usize, HashSet<usize>> = HashMap::new();
            let mut current = None;
            for line in BufReader::new(file).split(b'\n') {
                let line = line?;
                let line = String::from_utf8_lossy(&line);
                if line.starts_with('@') {
                    if let Some((name, end)) = symbol(&line, 0)
                        && line[end..].starts_with(" = ")
                    {
                        let id = interner.id(name);
                        let refs = all_symbols(&line[end..]).map(|r| interner.id(r)).collect();
                        globals.insert(id, refs);
                    }
                    continue;
                }
                if line.starts_with("define") {
                    current = line
                        .find('@')
                        .and_then(|at| symbol(&line, at))
                        .filter(|&(_, end)| line[end..].starts_with('('))
                        .map(|(name, _)| interner.id(name));
                    if let Some(id) = current {
                        defined.insert(id);
                        calls.entry(id).or_default();
                        references.entry(id).or_default();
                    }
                    continue;
                }
                let Some(function) = current else {
                    continue;
                };
                if line.starts_with('}') {
                    current = None;
                    continue;
                }
                let rest = match callee(&line) {
                    Some((name, end)) => {
                        let id = interner.id(name);
                        calls.entry(function).or_default().insert(id);
                        &line[end..]
                    }
                    None => &line[..],
                };
                let refs: Vec<usize> = all_symbols(rest).map(|r| interner.id(r)).collect();
                references.entry(function).or_default().extend(refs);
            }
            for (function, refs) in references {
                let out = taken.entry(function).or_default();
                let mut seen = HashSet::new();
                let mut work: Vec<usize> = refs.into_iter().collect();
                while let Some(reference) = work.pop() {
                    if !seen.insert(reference) {
                        continue;
                    }
                    match globals.get(&reference) {
                        Some(inner) => work.extend(inner.iter().copied()),
                        None => {
                            out.insert(reference);
                        }
                    }
                }
            }
        }
        let symbols = interner.symbols;
        let mut edges = vec![Vec::new(); symbols.len()];
        for (&function, targets) in &calls {
            let mut out: Vec<usize> = targets
                .iter()
                .copied()
                .filter(|target| defined.contains(target))
                .collect();
            if let Some(refs) = taken.get(&function) {
                out.extend(
                    refs.iter()
                        .copied()
                        .filter(|&target| target != function && defined.contains(&target)),
                );
            }
            out.sort_unstable();
            out.dedup();
            edges[function] = out;
        }
        Ok(Self { symbols, edges })
    }
}

fn symbol(line: &str, at: usize) -> Option<(&str, usize)> {
    let rest = line.get(at..)?.strip_prefix('@')?;
    let start = at + 1;
    if let Some(quoted) = rest.strip_prefix('"') {
        let mut escaped = false;
        for (offset, c) in quoted.char_indices() {
            match c {
                '\\' if !escaped => escaped = true,
                '"' if !escaped => {
                    return Some((&quoted[..offset], start + 1 + offset + 1));
                }
                _ => escaped = false,
            }
        }
        return None;
    }
    let length = rest
        .find(|c: char| !(c.is_ascii_alphanumeric() || matches!(c, '_' | '.' | '$' | '-')))
        .unwrap_or(rest.len());
    (length > 0).then(|| (&rest[..length], start + length))
}

fn all_symbols(text: &str) -> impl Iterator<Item = &str> {
    text.match_indices('@')
        .filter_map(move |(at, _)| symbol(text, at).map(|(name, _)| name))
}

fn callee(line: &str) -> Option<(&str, usize)> {
    for keyword in ["call ", "invoke "] {
        for (at, _) in line.match_indices(keyword) {
            if at > 0 && !line[..at].ends_with(' ') {
                continue;
            }
            let Some(sign) = line[at..].find('@') else {
                continue;
            };
            if let Some((name, end)) = symbol(line, at + sign)
                && line[end..].starts_with('(')
            {
                return Some((name, end));
            }
        }
    }
    None
}

fn cycles(edges: &[Vec<usize>], removed: &[bool]) -> Vec<Vec<usize>> {
    const UNVISITED: usize = usize::MAX;
    let count = edges.len();
    let mut index = vec![UNVISITED; count];
    let mut low = vec![0; count];
    let mut on_stack = vec![false; count];
    let mut stack = Vec::new();
    let mut found = Vec::new();
    let mut counter = 0;
    let usable = |node: usize| !removed.get(node).copied().unwrap_or(true);
    for root in 0..count {
        if index[root] != UNVISITED || !usable(root) {
            continue;
        }
        let mut work = vec![(root, 0_usize)];
        index[root] = counter;
        low[root] = counter;
        counter += 1;
        stack.push(root);
        on_stack[root] = true;
        while let Some(&mut (node, ref mut next)) = work.last_mut() {
            if let Some(&target) = edges[node].get(*next) {
                *next += 1;
                if !usable(target) {
                    continue;
                }
                if index[target] == UNVISITED {
                    index[target] = counter;
                    low[target] = counter;
                    counter += 1;
                    stack.push(target);
                    on_stack[target] = true;
                    work.push((target, 0));
                } else if on_stack[target] {
                    low[node] = low[node].min(index[target]);
                }
                continue;
            }
            work.pop();
            if let Some(&(parent, _)) = work.last() {
                low[parent] = low[parent].min(low[node]);
            }
            if low[node] == index[node] {
                let mut component = Vec::new();
                while let Some(member) = stack.pop() {
                    on_stack[member] = false;
                    component.push(member);
                    if member == node {
                        break;
                    }
                }
                let recursive = component.len() > 1 || edges[node].contains(&node);
                if recursive {
                    found.push(component);
                }
            }
        }
    }
    found
}

fn witness(edges: &[Vec<usize>], cycle: &[usize], start: usize) -> Vec<usize> {
    let members: HashSet<usize> = cycle.iter().copied().collect();
    let mut previous: HashMap<usize, usize> = HashMap::new();
    let mut queue = VecDeque::from([start]);
    while let Some(node) = queue.pop_front() {
        for &target in &edges[node] {
            if !members.contains(&target) {
                continue;
            }
            if target == start {
                let mut path = vec![start];
                let mut at = node;
                while at != start {
                    path.push(at);
                    at = previous.get(&at).copied().unwrap_or(start);
                }
                path.push(start);
                path.reverse();
                return path;
            }
            if let hashbrown::hash_map::Entry::Vacant(slot) = previous.entry(target) {
                slot.insert(node);
                queue.push_back(target);
            }
        }
    }
    vec![start]
}

struct Entry {
    name: String,
    members: Vec<String>,
    reason: String,
    bound: String,
}

struct Allowlist {
    entries: Vec<Entry>,
}

impl Allowlist {
    fn read(path: &Path) -> Result<Self> {
        let text =
            fs::read_to_string(path).with_context(|| format!("cannot read {}", path.display()))?;
        let table: toml::Table = text
            .parse()
            .with_context(|| format!("cannot parse {}", path.display()))?;
        let mut entries = Vec::new();
        for (name, value) in &table {
            let entry = value
                .as_table()
                .with_context(|| format!("{name}: an entry must be a table"))?;
            let text = |key: &str| -> Result<String> {
                entry
                    .get(key)
                    .and_then(toml::Value::as_str)
                    .map(String::from)
                    .with_context(|| format!("{name}: `{key}` is missing"))
            };
            let members = entry
                .get("functions")
                .and_then(toml::Value::as_array)
                .with_context(|| format!("{name}: `functions` is missing"))?
                .iter()
                .map(|member| {
                    member
                        .as_str()
                        .map(String::from)
                        .with_context(|| format!("{name}: `functions` must be strings"))
                })
                .collect::<Result<Vec<_>>>()?;
            if members.is_empty() {
                bail!("{name}: `functions` is empty");
            }
            entries.push(Entry {
                name: name.clone(),
                members,
                reason: text("reason")?,
                bound: text("bound")?,
            });
        }
        Ok(Self { entries })
    }

    fn covering(&self, members: &[&str]) -> Option<usize> {
        self.entries.iter().position(|entry| {
            members.iter().all(|member| {
                entry
                    .members
                    .iter()
                    .any(|pattern| member.contains(pattern.as_str()))
            })
        })
    }
}

fn demangle(symbol: &str) -> String {
    let Some(body) = symbol
        .strip_prefix("_ZN")
        .and_then(|rest| rest.strip_suffix('E'))
    else {
        return symbol.to_string();
    };
    let mut parts = Vec::new();
    let mut rest = body;
    while !rest.is_empty() {
        let digits = rest
            .find(|c: char| !c.is_ascii_digit())
            .unwrap_or(rest.len());
        let Ok(length) = rest[..digits].parse::<usize>() else {
            return symbol.to_string();
        };
        let Some(part) = rest.get(digits..digits + length) else {
            return symbol.to_string();
        };
        parts.push(part);
        rest = &rest[digits + length..];
    }
    if parts.last().is_some_and(|last| {
        last.len() == 17
            && last.starts_with('h')
            && last[1..].chars().all(|c| c.is_ascii_hexdigit())
    }) {
        parts.pop();
    }
    parts
        .iter()
        .map(|part| {
            unescape(
                part.strip_prefix('_')
                    .filter(|p| p.starts_with('$'))
                    .unwrap_or(part),
            )
        })
        .collect::<Vec<_>>()
        .join("::")
}

fn unescape(part: &str) -> String {
    const ESCAPES: [(&str, &str); 9] = [
        ("$SP$", "@"),
        ("$BP$", "*"),
        ("$RF$", "&"),
        ("$LT$", "<"),
        ("$GT$", ">"),
        ("$LP$", "("),
        ("$RP$", ")"),
        ("$C$", ","),
        ("..", "::"),
    ];
    let mut out = String::with_capacity(part.len());
    let mut rest = part;
    'scan: while !rest.is_empty() {
        for (from, to) in ESCAPES {
            if let Some(after) = rest.strip_prefix(from) {
                out.push_str(to);
                rest = after;
                continue 'scan;
            }
        }
        if let Some(after) = rest.strip_prefix("$u")
            && let Some(end) = after.find('$')
            && let Ok(code) = u32::from_str_radix(&after[..end], 16)
            && let Some(c) = char::from_u32(code)
        {
            out.push(c);
            rest = &after[end + 1..];
            continue;
        }
        let mut chars = rest.chars();
        if let Some(c) = chars.next() {
            out.push(c);
        }
        rest = chars.as_str();
    }
    out
}
