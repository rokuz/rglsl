use alloc::string::String;

use rglsl_ast::Span;
use rglsl_ast::ast::ExtensionBehavior;
use rglsl_ast::extensions::{ExtensionIssue, Feature, Request};
use rglsl_types::extension::{Extension, Vulkan};

use super::Analyzer;
use crate::diagnostic::{Diagnostic, DiagnosticKind};
use crate::scope::Storage;
use crate::types::{NumericFeatures, Scalar, Type, TypeKind};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum SmallKind {
    Float16,
    Int16,
    Int8,
}

impl SmallKind {
    const ALL: [Self; 3] = [Self::Float16, Self::Int16, Self::Int8];

    const fn feature(self) -> Feature {
        match self {
            Self::Float16 => Feature::Float16Arithmetic,
            Self::Int16 => Feature::Int16Arithmetic,
            Self::Int8 => Feature::Int8Arithmetic,
        }
    }

    const fn matches(self, scalar: Scalar) -> bool {
        match self {
            Self::Float16 => matches!(scalar, Scalar::Float16),
            Self::Int16 => matches!(scalar, Scalar::Int16 | Scalar::Uint16),
            Self::Int8 => matches!(scalar, Scalar::Int8 | Scalar::Uint8),
        }
    }

    const fn name(self) -> &'static str {
        match self {
            Self::Float16 => "float16",
            Self::Int16 => "(u)int16",
            Self::Int8 => "(u)int8",
        }
    }
}

impl Analyzer<'_> {
    pub(crate) fn extension_directive(
        &mut self,
        span: Span,
        name: &str,
        behavior: ExtensionBehavior,
    ) {
        if let Some(extension) = Extension::from_name(name) {
            self.check_extension(span, extension, behavior);
        }
        for issue in self.extensions.apply(name, behavior) {
            let error = issue.is_error();
            let kind = match issue {
                ExtensionIssue::UnknownRequired(name) | ExtensionIssue::Unknown(name) => {
                    DiagnosticKind::UnsupportedExtension(name)
                }
                ExtensionIssue::AllEnabled(behavior) => {
                    DiagnosticKind::AllExtensionsEnabled(behavior.keyword())
                }
            };
            if error {
                self.error(span, kind);
            } else {
                self.warnings.push(Diagnostic { span, kind });
            }
        }
    }

    fn check_extension(&mut self, span: Span, extension: Extension, behavior: ExtensionBehavior) {
        let info = extension.info();
        if !info.stages.is_all() {
            self.stage_check(span, |stage| {
                (!info.allowed_in(stage)).then(|| DiagnosticKind::ExtensionStage {
                    extension,
                    stage: stage.name(),
                })
            });
        }
        for &other in info.conflicts {
            if self.extensions.is_on(other) {
                self.error(
                    span,
                    DiagnosticKind::ConflictingExtensions(extension, other),
                );
            }
        }
        let enabling = matches!(
            behavior,
            ExtensionBehavior::Require | ExtensionBehavior::Enable
        );
        if enabling
            && let (Some(needed), Some(target)) = (info.minimum_spirv, self.options.spirv_version)
            && target < needed
        {
            self.error(span, DiagnosticKind::ExtensionSpirvVersion(extension));
        }
        match info.vulkan {
            Vulkan::Supported => {}
            Vulkan::Unsupported(reason) => {
                if behavior != ExtensionBehavior::Disable {
                    self.error(
                        span,
                        DiagnosticKind::ExtensionNotInVulkan {
                            name: extension,
                            reason,
                        },
                    );
                }
            }
            Vulkan::WithoutSpirv => {
                self.error(span, DiagnosticKind::ExtensionWithoutSpirv(extension));
            }
        }
    }

    pub(crate) fn numeric_features(&self) -> NumericFeatures {
        NumericFeatures {
            explicit_arithmetic: self.extensions.explicit_arithmetic(),
            half_float: self.extensions.is_on(Extension::AmdGpuShaderHalfFloat),
            int16: self.extensions.is_on(Extension::AmdGpuShaderInt16),
        }
    }

    pub(crate) fn explicit_types(&self) -> bool {
        self.extensions.explicit_arithmetic()
    }

    pub(crate) fn converts(&self, from: &Type, to: &Type) -> bool {
        from.converts_with(to, self.numeric_features())
    }

    pub(crate) fn extension_enabled(&self, extension: Extension) -> bool {
        self.extensions.is_on(extension)
    }

    pub(crate) fn require_feature(&mut self, span: Span, feature: Feature, what: &str) -> bool {
        self.require_extensions(span, feature.extensions(), what)
    }

    pub(crate) fn require_extension(
        &mut self,
        span: Span,
        extension: Extension,
        what: &str,
    ) -> bool {
        self.require_extensions(span, &[extension], what)
    }

    pub(crate) fn require_extensions(
        &mut self,
        span: Span,
        extensions: &[Extension],
        what: &str,
    ) -> bool {
        match self.extensions.request(extensions) {
            Request::Enabled => true,
            Request::Warned(extension) => {
                self.warnings.push(Diagnostic {
                    span,
                    kind: DiagnosticKind::ExtensionWarned {
                        extension,
                        feature: String::from(what),
                    },
                });
                true
            }
            Request::Missing => {
                self.error(
                    span,
                    DiagnosticKind::ExtensionRequired {
                        feature: String::from(what),
                        extensions: extensions.to_vec(),
                    },
                );
                false
            }
        }
    }

    fn contains_small(&self, ty: &Type, kind: SmallKind) -> bool {
        match ty.kind {
            TypeKind::Struct(id) => self.types.structure(id).is_some_and(|structure| {
                structure.scalars.iter().any(|scalar| kind.matches(*scalar))
            }),
            TypeKind::Block(_) => false,
            TypeKind::CooperativeMatrix(matrix) if matrix.spirv_element => false,
            TypeKind::Tensor { scalar, .. } => kind.matches(scalar),
            _ => ty.base_scalar().is_some_and(|scalar| kind.matches(scalar)),
        }
    }

    pub(crate) fn small_arithmetic_allowed(&self, types: &[&Type]) -> bool {
        SmallKind::ALL.iter().all(|kind| {
            !types.iter().any(|ty| self.contains_small(ty, *kind))
                || self.extensions.any_on(kind.feature().extensions())
        })
    }

    pub(crate) fn require_small_arithmetic(
        &mut self,
        span: Span,
        ty: &Type,
        operation: &str,
        reason: &str,
    ) -> bool {
        let mut allowed = true;
        for kind in SmallKind::ALL {
            if self.contains_small(ty, kind) {
                let what = alloc::format!("{operation}: {}", reason.replace("{}", kind.name()));
                allowed &= self.require_feature(span, kind.feature(), &what);
            }
        }
        allowed
    }

    pub(crate) fn storage_small_check(&mut self, span: Span, ty: &Type, storage: Storage) {
        if matches!(storage, Storage::Uniform | Storage::Buffer) {
            return;
        }
        self.require_small_arithmetic(
            span,
            ty,
            "qualifier",
            "{} types can only be in uniform block or buffer storage",
        );
    }

    pub(crate) fn assignment_small_check(&mut self, span: Span, ty: &Type, operation: &str) {
        let aggregate = ty.is_array() || matches!(ty.kind, TypeKind::Struct(_));
        if aggregate {
            self.require_small_arithmetic(
                span,
                ty,
                operation,
                "can't use with aggregates containing {}",
            );
        }
    }
}
