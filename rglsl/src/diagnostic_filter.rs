//! [`DiagnosticFilter`]s and supporting functionality.

use alloc::boxed::Box;

use crate::{Arena, Handle};

#[cfg(feature = "arbitrary")]
use arbitrary::Arbitrary;
#[cfg(feature = "deserialize")]
use serde::Deserialize;
#[cfg(feature = "serialize")]
use serde::Serialize;

/// A severity set on a [`DiagnosticFilter`].
///
/// <https://www.w3.org/TR/WGSL/#diagnostic-severity>
#[derive(Clone, Copy, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum Severity {
    Off,
    Info,
    Warning,
    Error,
}

impl Severity {
    /// Checks whether this severity is [`Self::Error`].
    ///
    /// rglsl does not yet support diagnostic items at lesser severities than
    /// [`Severity::Error`]. When this is implemented, this method should be deleted, and the
    /// severity should be used directly for reporting diagnostics.
    pub(crate) fn report_diag<E>(
        self,
        err: E,
        log_handler: impl FnOnce(E, log::Level),
    ) -> Result<(), E> {
        let log_level = match self {
            Severity::Off => return Ok(()),

            // NOTE: These severities are not yet reported.
            Severity::Info => log::Level::Info,
            Severity::Warning => log::Level::Warn,

            Severity::Error => return Err(err),
        };
        log_handler(err, log_level);
        Ok(())
    }
}

/// A filterable triggering rule in a [`DiagnosticFilter`].
///
/// <https://www.w3.org/TR/WGSL/#filterable-triggering-rules>
#[derive(Clone, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum FilterableTriggeringRule {
    Standard(StandardFilterableTriggeringRule),
    Unknown(Box<str>),
    User(Box<[Box<str>; 2]>),
}

/// A filterable triggering rule in a [`DiagnosticFilter`].
///
/// <https://www.w3.org/TR/WGSL/#filterable-triggering-rules>
#[derive(Clone, Copy, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum StandardFilterableTriggeringRule {
    DerivativeUniformity,
}

impl StandardFilterableTriggeringRule {
    /// The default severity associated with this triggering rule.
    ///
    /// See <https://www.w3.org/TR/WGSL/#filterable-triggering-rules> for a table of default
    /// severities.
    pub(crate) const fn default_severity(self) -> Severity {
        match self {
            Self::DerivativeUniformity => Severity::Error,
        }
    }
}

/// A filtering rule that modifies how diagnostics are emitted for shaders.
///
/// <https://www.w3.org/TR/WGSL/#diagnostic-filter>
#[derive(Clone, Debug)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct DiagnosticFilter {
    pub new_severity: Severity,
    pub triggering_rule: FilterableTriggeringRule,
}

/// Represents a single parent-linking node in a tree of [`DiagnosticFilter`]s backed by a
/// [`crate::Arena`].
///
/// A single element of a _tree_ of diagnostic filter rules stored in
/// [`crate::Module::diagnostic_filters`]. When nodes are built by a front-end, module-applicable
/// filter rules are chained together in runs based on parse site.  For instance, given the
/// following:
///
/// - Module-applicable rules `a` and `b`.
/// - Rules `c` and `d`, applicable to an entry point called `c_and_d_func`.
/// - Rule `e`, applicable to an entry point called `e_func`.
///
/// The tree would be represented as follows:
///
/// ```text
/// a <- b
///      ^
///      |- c <- d
///      |
///      \- e
/// ```
///
/// ...where:
///
/// - `d` is the first leaf consulted by validation in `c_and_d_func`.
/// - `e` is the first leaf consulted by validation in `e_func`.
#[derive(Clone, Debug)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct DiagnosticFilterNode {
    pub inner: DiagnosticFilter,
    pub parent: Option<Handle<DiagnosticFilterNode>>,
}

impl DiagnosticFilterNode {
    /// Finds the most specific filter rule applicable to `triggering_rule` from the chain of
    /// diagnostic filter rules in `arena`, starting with `node`, and returns its severity. If none
    /// is found, return the value of [`StandardFilterableTriggeringRule::default_severity`].
    ///
    /// When `triggering_rule` is not applicable to this node, its parent is consulted recursively.
    pub(crate) fn search(
        node: Option<Handle<Self>>,
        arena: &Arena<Self>,
        triggering_rule: StandardFilterableTriggeringRule,
    ) -> Severity {
        let mut next = node;
        while let Some(handle) = next {
            let node = &arena[handle];
            let &Self { ref inner, parent } = node;
            let &DiagnosticFilter {
                triggering_rule: ref rule,
                new_severity,
            } = inner;

            if rule == &FilterableTriggeringRule::Standard(triggering_rule) {
                return new_severity;
            }

            next = parent;
        }
        triggering_rule.default_severity()
    }
}
