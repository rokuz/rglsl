//! An [`OverloadSet`] represented as a vector of rules.
//!
//! [`OverloadSet`]: crate::proc::overloads::OverloadSet

use crate::common::{DiagnosticDebug, ForDebugWithTypes};
use crate::ir;
use crate::proc::overloads::Rule;
use crate::proc::overloads::one_bits_iter::OneBitsIter;
use crate::proc::overloads::rule::Conclusion;
use crate::proc::{GlobalCtx, TypeResolution};

use alloc::vec::Vec;
use core::fmt;

#[derive(Clone, Copy)]
pub(in crate::proc::overloads) enum MathType {
    Scalar(ir::Scalar),
    Vector {
        size: ir::VectorSize,
        scalar: ir::Scalar,
    },
    Matrix {
        columns: ir::VectorSize,
        rows: ir::VectorSize,
        scalar: ir::Scalar,
    },
}

impl MathType {
    pub(in crate::proc::overloads) const fn to_inner(self) -> ir::TypeInner {
        match self {
            Self::Scalar(scalar) => ir::TypeInner::Scalar(scalar),
            Self::Vector { size, scalar } => ir::TypeInner::Vector { size, scalar },
            Self::Matrix {
                columns,
                rows,
                scalar,
            } => ir::TypeInner::Matrix {
                columns,
                rows,
                scalar,
            },
        }
    }
}

#[derive(Clone, Copy)]
pub(in crate::proc::overloads) struct StaticRule {
    pub arity: u8,
    pub arguments: [MathType; 4],
    pub conclusion: MathType,
}

impl StaticRule {
    pub(in crate::proc::overloads) const EMPTY: Self = Self {
        arity: 0,
        arguments: [MathType::Scalar(ir::Scalar::BOOL); 4],
        conclusion: MathType::Scalar(ir::Scalar::BOOL),
    };

    pub(in crate::proc::overloads) const fn new<const N: usize>(
        args: [MathType; N],
        conclusion: MathType,
    ) -> Self {
        let mut arguments = [MathType::Scalar(ir::Scalar::BOOL); 4];
        let mut i = 0;
        while i < N {
            arguments[i] = args[i];
            i += 1;
        }
        Self {
            arity: N as u8,
            arguments,
            conclusion,
        }
    }

    const fn argument(&self, index: usize) -> Option<MathType> {
        if index < self.arity as usize {
            Some(self.arguments[index])
        } else {
            None
        }
    }

    fn to_rule(self) -> Rule {
        let mut arguments = arrayvec::ArrayVec::new();
        let mut i = 0;
        let len = self.arity as usize;
        while i < len {
            arguments.push(TypeResolution::Value(self.arguments[i].to_inner()));
            i += 1;
        }
        Rule {
            arguments,
            conclusion: Conclusion::Value(self.conclusion.to_inner()),
        }
    }
}

#[derive(Clone, Copy)]
pub(in crate::proc::overloads) struct List {
    members: u64,
    rules: &'static [StaticRule],
}

impl List {
    pub(in crate::proc::overloads) const fn from_static(rules: &'static [StaticRule]) -> List {
        List {
            members: len_to_full_mask(rules.len()),
            rules,
        }
    }

    fn members(&self) -> impl Iterator<Item = (u64, &StaticRule)> {
        OneBitsIter::new(self.members).map(|mask| {
            let index = mask.trailing_zeros() as usize;
            (mask, &self.rules[index])
        })
    }

    fn filter<F>(&self, mut pred: F) -> List
    where
        F: FnMut(&StaticRule) -> bool,
    {
        let mut filtered_members = 0;
        for (mask, rule) in self.members() {
            if pred(rule) {
                filtered_members |= mask;
            }
        }

        List {
            members: filtered_members,
            rules: self.rules,
        }
    }
}

impl crate::proc::overloads::OverloadSet for List {
    fn is_empty(&self) -> bool {
        self.members == 0
    }

    fn min_arguments(&self) -> Option<usize> {
        self.members().fold(None, |best, (_, rule)| {
            let len = rule.arity as usize;
            Some(match best {
                Some(best) => core::cmp::max(best, len),
                None => len,
            })
        })
    }

    fn max_arguments(&self) -> Option<usize> {
        self.members().fold(None, |n, (_, rule)| {
            core::cmp::max(n, Some(rule.arity as usize))
        })
    }

    fn arg(&self, i: usize, arg_ty: &ir::TypeInner, types: &crate::UniqueArena<ir::Type>) -> Self {
        log::debug!("arg {i} of type {:?}", arg_ty.for_debug(types));
        self.filter(|rule| {
            if log::log_enabled!(log::Level::Debug) {
                let full_rule = rule.to_rule();
                log::debug!("    considering rule {:?}", full_rule.for_debug(types));
                match rule.argument(i) {
                    Some(rule_ty) => {
                        let inner = rule_ty.to_inner();
                        if arg_ty.non_struct_equivalent(&inner, types) {
                            log::debug!("    types are equivalent");
                        } else {
                            log::debug!("    no conversion possible");
                        }
                    }
                    None => {
                        log::debug!("    argument index {i} out of bounds");
                    }
                }
            }
            rule.argument(i).is_some_and(|rule_ty| {
                let inner = rule_ty.to_inner();
                arg_ty.non_struct_equivalent(&inner, types)
            })
        })
    }

    fn most_preferred(&self) -> Option<Rule> {
        let (_, rule) = self.members().next()?;
        Some(rule.to_rule())
    }

    fn overload_list(&self, _gctx: &GlobalCtx<'_>) -> Vec<Rule> {
        self.members().map(|(_, rule)| rule.to_rule()).collect()
    }

    fn allowed_args(&self, i: usize, _gctx: &GlobalCtx<'_>) -> Vec<TypeResolution> {
        self.members()
            .filter_map(|(_, rule)| {
                rule.argument(i)
                    .map(|ty| TypeResolution::Value(ty.to_inner()))
            })
            .collect()
    }

    fn for_debug(&self, types: &crate::UniqueArena<ir::Type>) -> impl fmt::Debug {
        DiagnosticDebug((self, types))
    }
}

const fn len_to_full_mask(n: usize) -> u64 {
    match 1_u64.checked_shl(n as u32) {
        Some(bit) => bit - 1,
        None => u64::MAX,
    }
}

impl ForDebugWithTypes for &List {}

impl fmt::Debug for DiagnosticDebug<(&List, &crate::UniqueArena<ir::Type>)> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let (list, types) = self.0;
        let rules: Vec<Rule> = list.members().map(|(_, rule)| rule.to_rule()).collect();

        f.debug_list()
            .entries(rules.iter().map(|rule| rule.for_debug(types)))
            .finish()
    }
}
