use alloc::{string::String, vec::Vec};

#[cfg(feature = "deserialize")]
use serde::Deserialize;
#[cfg(feature = "serialize")]
use serde::Serialize;

pub use rglsl_pp::SpanLocation;

use crate::Span;

#[derive(Clone, Default)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(
    any(feature = "serialize", feature = "deserialize"),
    serde(transparent)
)]
pub struct SpanSources {
    units: Vec<SpanUnit>,
}

#[derive(Clone)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
struct SpanUnit {
    base: u32,
    name: Option<String>,
    map: rglsl_pp::SpanMap,
}

impl core::fmt::Debug for SpanSources {
    fn fmt(&self, formatter: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        formatter.write_str("SpanSources")
    }
}

impl SpanSources {
    pub fn new(map: rglsl_pp::SpanMap) -> Self {
        let units = if map.is_empty() {
            Vec::new()
        } else {
            Vec::from([SpanUnit {
                base: 0,
                name: None,
                map,
            }])
        };
        Self { units }
    }

    pub const fn is_empty(&self) -> bool {
        self.units.is_empty()
    }

    pub fn length(&self) -> u32 {
        self.units
            .last()
            .map_or(0, |unit| unit.base.saturating_add(unit.map.length()))
    }

    pub fn append(&mut self, other: Self, base: u32, name: Option<&str>) {
        self.units
            .extend(other.units.into_iter().map(|unit| SpanUnit {
                base: unit.base.saturating_add(base),
                name: unit.name.or_else(|| name.map(String::from)),
                map: unit.map,
            }));
    }

    pub fn locate(&self, span: Span) -> Option<SpanLocation<'_>> {
        let offset = u32::try_from(span.to_range()?.start).ok()?;
        let index = self
            .units
            .partition_point(|unit| unit.base <= offset)
            .checked_sub(1)?;
        let unit = self.units.get(index)?;
        let inside = usize::try_from(offset.saturating_sub(unit.base)).ok()?;
        let location = unit.map.locate(inside)?;
        Some(SpanLocation {
            file: if location.included {
                location.file
            } else {
                location.file.or(unit.name.as_deref())
            },
            ..location
        })
    }
}
