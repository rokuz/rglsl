use std::collections::BTreeMap;
use std::fmt::Write as _;

use super::batch::Trace;

pub const RESET_LIMIT: usize = 10;
pub const RESET_WINDOW_MS: u64 = 5 * 60 * 1000;
pub const RESET_MERGE_MS: u64 = 5_000;
pub const EVENT_SLACK_MS: u64 = 3_000;
pub const EVENT_LATE_MS: u64 = 30_000;
pub const WATCHED_BATCH: usize = 64;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct ResetSource {
    pub provider: &'static str,
    pub ids: &'static [u32],
}

pub const RESET_SOURCES: [ResetSource; 4] = [
    ResetSource {
        provider: "nvlddmkm",
        ids: &[13, 153],
    },
    ResetSource {
        provider: "amdkmdag",
        ids: &[],
    },
    ResetSource {
        provider: "amduw23g",
        ids: &[],
    },
    ResetSource {
        provider: "Display",
        ids: &[4101],
    },
];

pub const DRIVER_MODULES: [&str; 12] = [
    "nvoglv",
    "nvgpucomp",
    "nvvk",
    "nvwgf2um",
    "amdvlk",
    "amdxc",
    "amdenc",
    "atiumd",
    "atidxx",
    "igvk",
    "igc",
    "ig9icd",
];

pub const CRASHING_APP: &str = "amber.exe";

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum DriverEvent {
    Reset {
        at_ms: u64,
        provider: String,
        id: u32,
    },
    Crash {
        at_ms: u64,
        app: String,
        module: String,
        pid: Option<u32>,
        code: String,
    },
}

impl DriverEvent {
    pub const fn at_ms(&self) -> u64 {
        match self {
            Self::Reset { at_ms, .. } | Self::Crash { at_ms, .. } => *at_ms,
        }
    }

    pub fn describe(&self) -> String {
        match self {
            Self::Reset {
                at_ms,
                provider,
                id,
            } => {
                format!("{provider} event {id} at {at_ms} ms")
            }
            Self::Crash {
                at_ms,
                app,
                module,
                code,
                ..
            } => format!("{app} faulted in {module} ({code}) at {at_ms} ms"),
        }
    }
}

pub fn is_reset(provider: &str, id: u32) -> bool {
    RESET_SOURCES.iter().any(|source| {
        source.provider.eq_ignore_ascii_case(provider)
            && (source.ids.is_empty() || source.ids.contains(&id))
    })
}

pub fn is_driver_module(module: &str) -> bool {
    let module = module.to_ascii_lowercase();
    let name = module.rsplit(['\\', '/']).next().unwrap_or_default();
    DRIVER_MODULES.iter().any(|prefix| name.starts_with(prefix))
}

pub fn query_script(since_ms: u64) -> String {
    let providers: Vec<String> = RESET_SOURCES
        .iter()
        .map(|source| format!("'{}'", source.provider))
        .collect();
    let mut script = String::new();
    let _ = writeln!(script, "$ErrorActionPreference = 'SilentlyContinue'");
    let _ = writeln!(
        script,
        "$since = [DateTimeOffset]::FromUnixTimeMilliseconds({since_ms}).LocalDateTime"
    );
    let _ = writeln!(
        script,
        "foreach ($provider in @({})) {{ Get-WinEvent -FilterHashtable @{{ LogName = 'System'; ProviderName = $provider; StartTime = $since; Level = 1, 2, 3 }} -ErrorAction SilentlyContinue | ForEach-Object {{ \"reset`t{{0}}`t{{1}}`t{{2}}\" -f @(([DateTimeOffset]$_.TimeCreated).ToUnixTimeMilliseconds(), $_.ProviderName, $_.Id) }} }}",
        providers.join(", ")
    );
    let _ = writeln!(
        script,
        "Get-WinEvent -FilterHashtable @{{ LogName = 'Application'; ProviderName = 'Application Error'; Id = 1000; StartTime = $since }} -ErrorAction SilentlyContinue | ForEach-Object {{ $p = $_.Properties; \"crash`t{{0}}`t{{1}}`t{{2}}`t{{3}}`t{{4}}\" -f @(([DateTimeOffset]$_.TimeCreated).ToUnixTimeMilliseconds(), $p[0].Value, $p[3].Value, $p[8].Value, $p[6].Value) }}"
    );
    script
}

fn parse_pid(text: &str) -> Option<u32> {
    let text = text.trim();
    match text.strip_prefix("0x").or_else(|| text.strip_prefix("0X")) {
        Some(hex) => u32::from_str_radix(hex, 16).ok(),
        None => text.parse().ok(),
    }
}

pub fn parse_events(text: &str) -> Vec<DriverEvent> {
    let mut events = Vec::new();
    for line in text.lines() {
        let fields: Vec<&str> = line.trim_end_matches('\r').split('\t').collect();
        match fields.as_slice() {
            ["reset", at, provider, id] => {
                let (Ok(at_ms), Ok(id)) = (at.trim().parse(), id.trim().parse()) else {
                    continue;
                };
                if is_reset(provider.trim(), id) {
                    events.push(DriverEvent::Reset {
                        at_ms,
                        provider: provider.trim().to_string(),
                        id,
                    });
                }
            }
            ["crash", at, app, module, pid, code] => {
                let Ok(at_ms) = at.trim().parse() else {
                    continue;
                };
                if !app.trim().eq_ignore_ascii_case(CRASHING_APP) {
                    continue;
                }
                events.push(DriverEvent::Crash {
                    at_ms,
                    app: app.trim().to_string(),
                    module: module.trim().to_string(),
                    pid: parse_pid(pid),
                    code: code.trim().to_string(),
                });
            }
            _ => {}
        }
    }
    events.sort_by_key(DriverEvent::at_ms);
    events.dedup();
    events
}

fn jobs_at(at_ms: u64, traces: &[Trace], eligible: impl Fn(&Trace) -> bool) -> Vec<usize> {
    let ran = |trace: &&Trace| trace.ran() && eligible(trace);
    let during: Vec<usize> = traces
        .iter()
        .enumerate()
        .filter(|(_, trace)| ran(trace))
        .filter(|(_, trace)| {
            trace.start_ms.saturating_sub(EVENT_SLACK_MS) <= at_ms
                && at_ms <= trace.end_ms.saturating_add(EVENT_SLACK_MS)
        })
        .map(|(index, _)| index)
        .collect();
    if !during.is_empty() {
        return during;
    }
    traces
        .iter()
        .enumerate()
        .filter(|(_, trace)| ran(trace))
        .filter(|(_, trace)| trace.end_ms <= at_ms && at_ms - trace.end_ms <= EVENT_LATE_MS)
        .max_by_key(|(_, trace)| trace.end_ms)
        .map(|(index, _)| vec![index])
        .unwrap_or_default()
}

pub fn resets_by_job(events: &[DriverEvent], traces: &[Trace]) -> BTreeMap<usize, Vec<String>> {
    let mut jobs: BTreeMap<usize, Vec<String>> = BTreeMap::new();
    for event in events {
        if let DriverEvent::Reset { at_ms, .. } = event {
            for index in jobs_at(*at_ms, traces, |_| true) {
                jobs.entry(index).or_default().push(event.describe());
            }
        }
    }
    jobs
}

pub fn crashes_by_job(events: &[DriverEvent], traces: &[Trace]) -> BTreeMap<usize, String> {
    let mut jobs = BTreeMap::new();
    let crashed = |trace: &Trace| trace.ending.is_some_and(super::batch::Ending::crashed);
    for event in events {
        let DriverEvent::Crash {
            at_ms, module, pid, ..
        } = event
        else {
            continue;
        };
        let by_pid: Vec<usize> = pid
            .map(|pid| {
                traces
                    .iter()
                    .enumerate()
                    .filter(|(_, trace)| trace.pid == Some(pid) && crashed(trace))
                    .map(|(index, _)| index)
                    .collect()
            })
            .unwrap_or_default();
        let matched = if by_pid.is_empty() && pid.is_none() {
            jobs_at(*at_ms, traces, crashed)
        } else {
            by_pid
        };
        for index in matched {
            jobs.entry(index).or_insert_with(|| module.clone());
        }
    }
    jobs
}

#[derive(Debug, Clone, Default)]
pub struct ResetHistory {
    resets: Vec<u64>,
}

impl ResetHistory {
    pub fn record(&mut self, events: &[DriverEvent]) -> usize {
        let mut added = 0;
        for event in events {
            let DriverEvent::Reset { at_ms, .. } = event else {
                continue;
            };
            let known = self
                .resets
                .iter()
                .any(|seen| seen.abs_diff(*at_ms) <= RESET_MERGE_MS);
            if !known {
                self.resets.push(*at_ms);
                added += 1;
            }
        }
        self.resets.sort_unstable();
        added
    }

    pub fn len(&self) -> usize {
        self.resets.len()
    }

    pub fn exceeded(&self) -> Option<String> {
        self.resets.iter().enumerate().find_map(|(first, start)| {
            let count = self
                .resets
                .get(first..)
                .unwrap_or_default()
                .iter()
                .take_while(|at| **at - start <= RESET_WINDOW_MS)
                .count();
            (count > RESET_LIMIT).then(|| {
                format!(
                    "{count} driver resets within {} minutes (limit {RESET_LIMIT})",
                    RESET_WINDOW_MS / 60_000
                )
            })
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::exec::batch::Ending;

    fn trace(start_ms: u64, end_ms: u64, pid: u32, ending: Ending) -> Trace {
        Trace {
            start_ms,
            end_ms,
            pid: Some(pid),
            ending: Some(ending),
            tail: String::new(),
        }
    }

    fn reset(at_ms: u64) -> DriverEvent {
        DriverEvent::Reset {
            at_ms,
            provider: "nvlddmkm".into(),
            id: 153,
        }
    }

    #[test]
    fn parses_reset_and_crash_events() {
        let text = "reset\t1000\tnvlddmkm\t153\r\nreset\t1001\tnvlddmkm\t14\nreset\t1002\tDisplay\t4101\nreset\t1003\tamdkmdag\t62\ncrash\t1500\tamber.exe\tamdvlk64.dll\t0x1a2c\tc0000005\ncrash\t1600\tnotepad.exe\tntdll.dll\t0x10\tc0000005\ngarbage\n";
        let events = parse_events(text);
        assert_eq!(events.len(), 4);
        assert_eq!(events.first(), Some(&reset(1000)));
        assert!(events.iter().any(|event| matches!(
            event,
            DriverEvent::Reset { provider, id: 4101, .. } if provider == "Display"
        )));
        assert!(events.iter().any(|event| matches!(
            event,
            DriverEvent::Reset { provider, .. } if provider == "amdkmdag"
        )));
        assert!(events.iter().any(|event| matches!(
            event,
            DriverEvent::Crash { pid: Some(0x1a2c), module, .. } if module == "amdvlk64.dll"
        )));
    }

    #[test]
    fn the_query_has_one_statement_per_line_and_no_bypass() {
        let script = query_script(1234);
        assert!(script.contains("FromUnixTimeMilliseconds(1234)"));
        assert!(script.contains("'nvlddmkm', 'amdkmdag', 'amduw23g', 'Display'"));
        assert_eq!(script.lines().count(), 4);
        assert!(!script.to_ascii_lowercase().contains("bypass"));
        assert!(!script.to_ascii_lowercase().contains("executionpolicy"));
    }

    #[test]
    fn maps_events_to_the_jobs_running_at_that_time() {
        let traces = [
            trace(1_000, 2_000, 1, Ending::Exited(0)),
            trace(1_500, 9_000, 2, Ending::Exited(1)),
            trace(20_000, 21_000, 3, Ending::Exited(0)),
            Trace::default(),
        ];
        let jobs = resets_by_job(&[reset(1_800)], &traces);
        assert_eq!(jobs.keys().copied().collect::<Vec<_>>(), [0, 1]);
        let jobs = resets_by_job(&[reset(8_000)], &traces);
        assert_eq!(jobs.keys().copied().collect::<Vec<_>>(), [1]);
        let jobs = resets_by_job(&[reset(11_500)], &traces);
        assert_eq!(jobs.keys().copied().collect::<Vec<_>>(), [1]);
        let jobs = resets_by_job(&[reset(21_000 + EVENT_LATE_MS + 1)], &traces);
        assert!(jobs.is_empty());
        let jobs = resets_by_job(&[reset(500)], &[Trace::default()]);
        assert!(jobs.is_empty());
    }

    #[test]
    fn maps_application_crashes_by_process_id() {
        let traces = [
            trace(1_000, 2_000, 7, Ending::Exited(0xC000_0005)),
            trace(1_000, 2_000, 8, Ending::Exited(0xC000_0005)),
            trace(1_000, 2_000, 9, Ending::Exited(0)),
        ];
        let crash = |pid: Option<u32>, module: &str| DriverEvent::Crash {
            at_ms: 1_900,
            app: CRASHING_APP.into(),
            module: module.into(),
            pid,
            code: "c0000005".into(),
        };
        let jobs = crashes_by_job(&[crash(Some(8), "amdvlk64.dll")], &traces);
        assert_eq!(jobs.get(&1).map(String::as_str), Some("amdvlk64.dll"));
        assert_eq!(jobs.len(), 1);
        assert!(crashes_by_job(&[crash(Some(9), "amdvlk64.dll")], &traces).is_empty());
        assert_eq!(crashes_by_job(&[crash(None, "x.dll")], &traces).len(), 2);
        assert!(is_driver_module(
            "C:\\Windows\\System32\\DriverStore\\amdvlk64.dll"
        ));
        assert!(is_driver_module("nvoglv64.dll"));
        assert!(!is_driver_module("amber.exe"));
        assert!(!is_driver_module("ucrtbase.dll"));
    }

    #[test]
    fn stops_after_too_many_resets_in_the_window() {
        let mut history = ResetHistory::default();
        let spaced: Vec<DriverEvent> = (0..=RESET_LIMIT as u64)
            .map(|i| reset(i * (RESET_MERGE_MS + 1_000)))
            .collect();
        let (first, last) = spaced.split_at(RESET_LIMIT);
        assert_eq!(history.record(first), RESET_LIMIT);
        assert_eq!(history.exceeded(), None);
        assert_eq!(history.record(first), 0);
        assert_eq!(history.record(&[reset(100)]), 0);
        assert_eq!(history.exceeded(), None);
        assert_eq!(history.record(last), 1);
        assert!(history.exceeded().is_some());

        let mut slow = ResetHistory::default();
        let apart: Vec<DriverEvent> = (0..=RESET_LIMIT as u64)
            .map(|i| reset(i * (RESET_WINDOW_MS / RESET_LIMIT as u64 + 1)))
            .collect();
        slow.record(&apart);
        assert_eq!(slow.len(), RESET_LIMIT + 1);
        assert_eq!(slow.exceeded(), None);
    }
}
