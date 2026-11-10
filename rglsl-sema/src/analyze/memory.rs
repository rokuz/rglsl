use alloc::string::String;

use rglsl_ast::Span;

use super::{Analyzer, Operand};
use crate::diagnostic::DiagnosticKind;
use crate::types::{Scalar, Type};

const ACQUIRE: i64 = 0x2;
const RELEASE: i64 = 0x4;
const ACQUIRE_RELEASE: i64 = 0x8;
const MAKE_AVAILABLE: i64 = 0x2000;
const MAKE_VISIBLE: i64 = 0x4000;
const VOLATILE: i64 = 0x8000;
const ORDER: i64 = ACQUIRE | RELEASE | ACQUIRE_RELEASE;
const SEMANTICS: i64 = ORDER | MAKE_AVAILABLE | MAKE_VISIBLE | VOLATILE;
const STORAGE: i64 = 0x40 | 0x100 | 0x800 | 0x1000;

const SCOPE_EXTENSION: &str = "GL_KHR_memory_scope_semantics";
const INT64_ATOMICS: [&str; 2] = ["GL_NV_shader_atomic_int64", "GL_EXT_shader_atomic_int64"];

#[derive(Clone, Copy, PartialEq, Eq)]
enum Kind {
    Modify,
    CompareSwap,
    Load,
    Store,
    ControlBarrier,
    MemoryBarrier,
}

#[derive(Clone, Copy)]
struct Shape {
    kind: Kind,
    first_constant: usize,
    storage: usize,
}

fn image_shape(name: &str, multisample: bool) -> Option<Shape> {
    let offset = usize::from(multisample);
    let (kind, first_constant) = match name {
        "imageAtomicLoad" => (Kind::Load, 2),
        "imageAtomicStore" => (Kind::Store, 3),
        "imageAtomicCompSwap" => (Kind::CompareSwap, 4),
        "imageAtomicAdd"
        | "imageAtomicMin"
        | "imageAtomicMax"
        | "imageAtomicAnd"
        | "imageAtomicOr"
        | "imageAtomicXor"
        | "imageAtomicExchange" => (Kind::Modify, 3),
        _ => return None,
    };
    Some(Shape {
        kind,
        first_constant: first_constant + offset,
        storage: first_constant + offset + 1,
    })
}

fn shape(name: &str) -> Option<Shape> {
    let (kind, first_constant, storage) = match name {
        "atomicLoad" => (Kind::Load, 1, 2),
        "atomicStore" => (Kind::Store, 2, 3),
        "atomicCompSwap" => (Kind::CompareSwap, 3, 4),
        "atomicAdd" | "atomicMin" | "atomicMax" | "atomicAnd" | "atomicOr" | "atomicXor"
        | "atomicExchange" => (Kind::Modify, 2, 3),
        "controlBarrier" => (Kind::ControlBarrier, 0, 2),
        "memoryBarrier" => (Kind::MemoryBarrier, 0, 1),
        _ => return None,
    };
    Some(Shape {
        kind,
        first_constant,
        storage,
    })
}

const fn is_int64(ty: &Type) -> bool {
    matches!(ty.base_scalar(), Some(Scalar::Int64 | Scalar::Uint64)) && !ty.is_array()
}

impl Analyzer<'_> {
    fn require_any_extension(&mut self, span: Span, names: &[&'static str], what: &str) -> bool {
        match self.extensions.request(names) {
            rglsl_ast::extensions::Request::Enabled => true,
            rglsl_ast::extensions::Request::Warned(extension) => {
                self.warnings.push(crate::diagnostic::Diagnostic {
                    span,
                    kind: DiagnosticKind::ExtensionWarned {
                        extension,
                        feature: String::from(what),
                    },
                });
                true
            }
            rglsl_ast::extensions::Request::Missing => {
                let mut extensions = String::new();
                for (index, name) in names.iter().enumerate() {
                    if index > 0 {
                        extensions.push_str(", ");
                    }
                    extensions.push_str(name);
                }
                self.error(
                    span,
                    DiagnosticKind::ExtensionRequired {
                        feature: String::from(what),
                        extensions,
                    },
                );
                false
            }
        }
    }

    pub(crate) fn memory_scope_checks(
        &mut self,
        span: Span,
        name: &str,
        operands: &[Operand],
    ) -> bool {
        let first = operands.first();
        let multisample = first
            .and_then(|operand| operand.ty.as_opaque())
            .is_some_and(|opaque| opaque.multisample);
        let (shape, scoped) = if name.starts_with("imageAtomic") {
            let Some(shape) = image_shape(name, multisample) else {
                return true;
            };
            let limit = if multisample { 5 } else { 4 };
            (shape, operands.len() > limit)
        } else {
            let Some(shape) = shape(name) else {
                return true;
            };
            let scoped = match shape.kind {
                Kind::ControlBarrier | Kind::MemoryBarrier => !operands.is_empty(),
                Kind::Modify | Kind::CompareSwap | Kind::Load | Kind::Store => operands.len() > 3,
            };
            (shape, scoped)
        };
        let mut valid = true;
        if shape.kind == Kind::ControlBarrier {
            valid &= self.require_extension(span, SCOPE_EXTENSION, name);
        }
        if !scoped {
            if !name.starts_with("imageAtomic")
                && matches!(shape.kind, Kind::Modify | Kind::CompareSwap)
                && first.is_some_and(|operand| is_int64(&operand.ty))
            {
                valid &= self.require_any_extension(span, &INT64_ATOMICS, name);
            }
            return valid;
        }
        valid &= self.require_extension(span, SCOPE_EXTENSION, name);
        valid && self.memory_semantics_check(span, name, shape, operands)
    }

    fn memory_semantics_check(
        &mut self,
        span: Span,
        name: &str,
        shape: Shape,
        operands: &[Operand],
    ) -> bool {
        let mut failed = false;
        let mut report = |analyzer: &mut Self, reason: &'static str| {
            analyzer.error(
                span,
                DiagnosticKind::InvalidBuiltinCall {
                    name: String::from(name),
                    reason,
                },
            );
            failed = true;
        };
        let constant = operands
            .iter()
            .skip(shape.first_constant)
            .all(|operand| operand.constant && !operand.specialization && operand.value.is_some());
        if !constant {
            report(self, "argument must be a compile-time constant");
            return false;
        }
        let value = |index: usize| {
            operands
                .get(index)
                .and_then(|operand| operand.value.as_ref())
                .and_then(crate::constant::Constant::scalar_i64)
                .unwrap_or(0)
        };
        let storage = value(shape.storage);
        let semantics = value(shape.storage + 1);
        let (storage2, semantics2) = if shape.kind == Kind::CompareSwap {
            (value(shape.storage + 2), value(shape.storage + 3))
        } else {
            (0, 0)
        };
        let multiple = |semantics: i64| {
            let order = semantics & ORDER;
            order != 0 && order & (order - 1) != 0
        };
        if (semantics | semantics2) & !SEMANTICS != 0 {
            report(self, "Invalid semantics value");
        }
        if (storage | storage2) & !STORAGE != 0 {
            report(self, "Invalid storage class semantics value");
        }
        if multiple(semantics) || multiple(semantics2) {
            report(
                self,
                "Semantics must not include multiple of gl_SemanticsRelease, gl_SemanticsAcquire, or gl_SemanticsAcquireRelease",
            );
        }
        if (semantics & ORDER != 0 && storage == 0) || (semantics2 & ORDER != 0 && storage2 == 0) {
            report(
                self,
                "Storage class semantics must not be zero when used with gl_SemanticsRelease, gl_SemanticsAcquire, or gl_SemanticsAcquireRelease",
            );
        }
        if (storage != 0 && semantics & ORDER == 0) || (storage2 != 0 && semantics2 & ORDER == 0) {
            report(
                self,
                "Semantics must be gl_SemanticsRelease, gl_SemanticsAcquire, or gl_SemanticsAcquireRelease when used with non-zero storage class semantics",
            );
        }
        let available = |semantics: i64| {
            semantics & MAKE_AVAILABLE != 0 && semantics & (RELEASE | ACQUIRE_RELEASE) == 0
        };
        if available(semantics) || available(semantics2) {
            report(
                self,
                "gl_SemanticsMakeAvailable requires gl_SemanticsRelease or gl_SemanticsAcquireRelease",
            );
        }
        let visible = |semantics: i64| {
            semantics & MAKE_VISIBLE != 0 && semantics & (ACQUIRE | ACQUIRE_RELEASE) == 0
        };
        if visible(semantics) || visible(semantics2) {
            report(
                self,
                "gl_SemanticsMakeVisible requires gl_SemanticsAcquire or gl_SemanticsAcquireRelease",
            );
        }
        if shape.kind == Kind::Store && semantics & ACQUIRE != 0 {
            report(
                self,
                "gl_SemanticsAcquire must not be used with (image) atomic store",
            );
        }
        if shape.kind == Kind::Load && semantics & RELEASE != 0 {
            report(
                self,
                "gl_SemanticsRelease must not be used with (image) atomic load",
            );
        }
        if matches!(shape.kind, Kind::Load | Kind::Store) && semantics & ACQUIRE_RELEASE != 0 {
            report(
                self,
                "gl_SemanticsAcquireRelease must not be used with (image) atomic load/store",
            );
        }
        if shape.kind == Kind::MemoryBarrier && semantics & ORDER == 0 {
            report(
                self,
                "Semantics must include exactly one of gl_SemanticsRelease, gl_SemanticsAcquire, or gl_SemanticsAcquireRelease when used with memoryBarrier",
            );
        }
        if matches!(shape.kind, Kind::MemoryBarrier | Kind::ControlBarrier)
            && semantics & VOLATILE != 0
        {
            report(
                self,
                "gl_SemanticsVolatile must not be used with memoryBarrier or controlBarrier",
            );
        }
        if shape.kind == Kind::CompareSwap {
            if semantics2 & (RELEASE | ACQUIRE_RELEASE) != 0 {
                report(
                    self,
                    "semUnequal must not be gl_SemanticsRelease or gl_SemanticsAcquireRelease",
                );
            }
            if semantics2 & ACQUIRE != 0 && semantics & (ACQUIRE | ACQUIRE_RELEASE) == 0 {
                report(
                    self,
                    "semUnequal must not be gl_SemanticsAcquire unless semEqual is gl_SemanticsAcquire or gl_SemanticsAcquireRelease",
                );
            }
            if semantics2 & MAKE_VISIBLE != 0 && semantics & MAKE_VISIBLE == 0 {
                report(
                    self,
                    "semUnequal must not include gl_SemanticsMakeVisible unless semEqual also includes gl_SemanticsMakeVisible",
                );
            }
            if storage2 & !storage != 0 {
                report(
                    self,
                    "semStorageUnequal must not include any option that is not present in semStorageEqual",
                );
            }
            if (semantics ^ semantics2) & VOLATILE != 0 {
                report(
                    self,
                    "semEqual and semUnequal must either both include gl_SemanticsVolatile or neither",
                );
            }
        }
        !failed
    }
}
