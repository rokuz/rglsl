use std::collections::VecDeque;
use std::fs;
use std::io::{BufRead, BufReader};
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};

use anyhow::{Context, Result, bail};
use hashbrown::{HashMap, HashSet};

const ALLOWLIST: &str = "xtask/recursion-allowed.toml";
const SANCTIONED: &str = "rglsl_types::stack::recurse";
const GUARDS: [&str; 3] = [SANCTIONED, "stacker::maybe_grow", "stacker::grow"];
const GUARD_DEPTH: usize = 3;
const DROP_GLUE: &str = "core::ptr::drop_in_place<";
const DROP_IMPL: &str = " as core::ops::drop::Drop>::drop";
const DROP_IMPL_FOR: &str = "<impl core::ops::drop::Drop for ";
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
    let guarded = guarded_drops(&names, &graph.edges);
    let removed: Vec<bool> = sanctioned
        .iter()
        .zip(&guarded)
        .map(|(&sanctioned, &guarded)| sanctioned || guarded)
        .collect();
    let all = cycles(&graph.edges, &vec![false; names.len()]);
    let residual = cycles(&graph.edges, &removed);
    let workspace_cycle = |cycle: &&Vec<usize>| cycle.iter().any(|&n| workspace[n]);
    let all_count = all.iter().filter(workspace_cycle).count();
    let residual: Vec<&Vec<usize>> = residual.iter().filter(workspace_cycle).collect();
    println!(
        "{} .ll files, {} functions, {} edges; {} workspace cycles, {} without {} and guarded drops",
        files.len(),
        names.len(),
        graph.edges.iter().map(Vec::len).sum::<usize>(),
        all_count,
        residual.len(),
        SANCTIONED,
    );
    if options.verbose {
        let mut types: Vec<&str> = names
            .iter()
            .zip(&guarded)
            .filter(|&(_, &guarded)| guarded)
            .filter_map(|(name, _)| drop_glue_type(name))
            .filter(|ty| mentions(ty, &crates))
            .collect();
        types.sort_unstable();
        types.dedup();
        for ty in types {
            println!("guarded drop: {ty}");
        }
    }
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
            None if members.iter().all(|member| is_drop_glue(member)) => {
                failures += 1;
                let mut types: Vec<&str> = members
                    .iter()
                    .filter_map(|member| drop_glue_type(member))
                    .filter(|ty| starts_with_crate(ty, &crates))
                    .collect();
                types.dedup();
                println!(
                    "\nrecursion: drop glue of recursive types without a guarded Drop: {}",
                    types.join(", ")
                );
                println!(
                    "  give one of them a Drop impl that moves the nested values out and drops \
                     them inside {SANCTIONED}"
                );
                for member in members.iter().take(SHOWN_MEMBERS) {
                    println!("    {member}");
                }
                if members.len() > SHOWN_MEMBERS {
                    println!("    ... and {} more", members.len() - SHOWN_MEMBERS);
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

fn starts_with_crate(name: &str, crates: &[String]) -> bool {
    crates.iter().any(|krate| {
        name.strip_prefix(krate.as_str())
            .is_some_and(|rest| rest.starts_with("::"))
    })
}

fn drop_glue_type(name: &str) -> Option<&str> {
    name.strip_prefix(DROP_GLUE)?.strip_suffix('>')
}

fn drop_impl_type(name: &str) -> Option<&str> {
    if let Some(ty) = name
        .strip_prefix('<')
        .and_then(|rest| rest.strip_suffix(DROP_IMPL))
    {
        return Some(ty);
    }
    let at = name.find(DROP_IMPL_FOR)?;
    name[at + DROP_IMPL_FOR.len()..].strip_suffix(">::drop")
}

fn is_drop_glue(name: &str) -> bool {
    drop_glue_type(name).is_some() || drop_impl_type(name).is_some()
}

fn base_path(ty: &str) -> &str {
    ty.find('<').map_or(ty, |at| &ty[..at])
}

fn guarded_drops(names: &[String], edges: &[Vec<usize>]) -> Vec<bool> {
    let guard = |node: usize| GUARDS.iter().any(|guard| names[node].starts_with(guard));
    let reaches_guard = |start: usize| {
        let mut seen: HashSet<usize> = [start].into_iter().collect();
        let mut frontier = vec![start];
        for _ in 0..GUARD_DEPTH {
            let mut next = Vec::new();
            for node in frontier {
                for &target in &edges[node] {
                    if guard(target) {
                        return true;
                    }
                    if drop_glue_type(&names[target]).is_none() && seen.insert(target) {
                        next.push(target);
                    }
                }
            }
            frontier = next;
        }
        false
    };
    names
        .iter()
        .enumerate()
        .map(|(node, name)| {
            drop_glue_type(name).is_some_and(|ty| {
                edges[node].iter().any(|&target| {
                    drop_impl_type(&names[target])
                        .is_some_and(|implemented| base_path(implemented) == base_path(ty))
                        && reaches_guard(target)
                })
            })
        })
        .collect()
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
            if let Some(pattern) = members.iter().find(|pattern| {
                [DROP_GLUE, DROP_IMPL, DROP_IMPL_FOR]
                    .iter()
                    .any(|every| every.contains(pattern.as_str()))
            }) {
                bail!(
                    "{name}: `{pattern}` matches the drop glue of every type; name the types, \
                     or give a recursive type a Drop impl through {SANCTIONED}"
                );
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

#[cfg(test)]
mod tests {
    use super::{Allowlist, drop_glue_type, drop_impl_type, guarded_drops, is_drop_glue};

    fn graph(names: &[&str], edges: &[(usize, usize)]) -> (Vec<String>, Vec<Vec<usize>>) {
        let mut out = vec![Vec::new(); names.len()];
        for &(from, to) in edges {
            out[from].push(to);
        }
        (names.iter().map(|name| name.to_string()).collect(), out)
    }

    #[test]
    fn drop_glue_names() {
        assert_eq!(
            drop_glue_type("core::ptr::drop_in_place<alloc::vec::Vec<rglsl::ir::Statement>>"),
            Some("alloc::vec::Vec<rglsl::ir::Statement>")
        );
        assert_eq!(
            drop_impl_type("<rglsl::ir::block::Block as core::ops::drop::Drop>::drop"),
            Some("rglsl::ir::block::Block")
        );
        assert!(is_drop_glue(
            "<alloc::vec::Vec<T,A> as core::ops::drop::Drop>::drop"
        ));
        assert!(!is_drop_glue(
            "<rglsl::ir::block::Block as core::ops::drop::Drop>::drop::{{closure}}"
        ));
        assert!(!is_drop_glue("rglsl::ir::block::Block::drop"));
    }

    #[test]
    fn a_drop_impl_through_recurse_guards_its_drop_glue() {
        let (names, edges) = graph(
            &[
                "core::ptr::drop_in_place<rglsl::ir::block::Block>",
                "<rglsl::ir::block::Block as core::ops::drop::Drop>::drop",
                "core::mem::take",
                "rglsl_types::stack::recurse",
                "core::ptr::drop_in_place<alloc::vec::Vec<rglsl::ir::Statement>>",
                "core::ptr::drop_in_place<rglsl::ir::Statement>",
            ],
            &[(0, 1), (0, 4), (1, 2), (1, 3), (4, 5), (5, 0)],
        );
        assert_eq!(
            guarded_drops(&names, &edges),
            [true, false, false, false, false, false]
        );
    }

    #[test]
    fn a_drop_impl_reaches_the_guard_within_a_few_calls() {
        let (names, edges) = graph(
            &[
                "core::ptr::drop_in_place<a::Tree<u32>>",
                "<a::Tree<T> as core::ops::drop::Drop>::drop",
                "a::Tree<T>::take_children",
                "stacker::maybe_grow",
            ],
            &[(0, 1), (1, 2), (2, 3)],
        );
        assert_eq!(guarded_drops(&names, &edges), [true, false, false, false]);
    }

    #[test]
    fn other_drops_do_not_guard() {
        let (names, edges) = graph(
            &[
                "core::ptr::drop_in_place<a::List>",
                "<a::List as core::ops::drop::Drop>::drop",
                "core::ptr::drop_in_place<a::Other>",
                "<a::Other as core::ops::drop::Drop>::drop",
                "rglsl_types::stack::recurse",
                "core::ptr::drop_in_place<alloc::boxed::Box<a::List>>",
                "<alloc::boxed::Box<T,A> as core::ops::drop::Drop>::drop",
                "a::far",
                "a::farther",
                "a::farthest",
            ],
            &[
                (0, 1),
                (1, 2),
                (2, 3),
                (3, 4),
                (0, 5),
                (5, 6),
                (5, 0),
                (6, 7),
                (7, 8),
                (8, 9),
                (9, 4),
            ],
        );
        assert_eq!(
            guarded_drops(&names, &edges),
            [
                false, false, true, false, false, false, false, false, false, false
            ]
        );
    }

    #[test]
    fn the_allowlist_rejects_patterns_of_every_drop() -> anyhow::Result<()> {
        let directory =
            std::env::temp_dir().join(format!("rglsl-recursion-{}", std::process::id()));
        std::fs::create_dir_all(&directory)?;
        let path = directory.join("allowed.toml");
        for (pattern, accepted) in [
            ("core::ptr::drop_in_place<", false),
            ("as core::ops::drop::Drop>::drop", false),
            ("impl core::ops::drop::Drop for", false),
            ("core::ptr::drop_in_place<a::List>", true),
            ("a::List", true),
        ] {
            std::fs::write(
                &path,
                format!("[entry]\nfunctions = [\"{pattern}\"]\nreason = \"r\"\nbound = \"1\"\n"),
            )?;
            assert_eq!(Allowlist::read(&path).is_ok(), accepted, "{pattern}");
        }
        std::fs::remove_dir_all(&directory)?;
        Ok(())
    }
}
